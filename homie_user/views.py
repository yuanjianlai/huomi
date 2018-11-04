# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from homie_user.models import Profile
from homie.utils import SerializeModelsToJsonMap, DeserializeModelsFromRequest


# Create your views here.
@login_required
def profileView(request):
    user = auth.get_user(request)
    return render(request, 'homie_user/profile.html')


@login_required
def profileData(request):
    if request.method == 'POST':
        models_map = DeserializeModelsFromRequest(request)
        succeed = False
        status = 204
        if models_map and models_map['profile'] and len(
                models_map['profile']) == 1:
            models_map['profile'][0].save()
            return JsonResponse({}, status=status)
        return JsonResponse({}, status=403)
    if request.method == 'GET':
        profile = None
        status = 200
        try:
            profile = Profile.objects.get(user__username=request.user)
        except Profile.DoesNotExist:
            username = request.user
            user = get_user_model().objects.get(username=username)
            profile = Profile(user=user)
            profile.save()
            status = 201
        return JsonResponse(
            SerializeModelsToJsonMap(profile=[profile]), status=status)
