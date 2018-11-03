# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.core.serializers import serialize, deserialize
from homie_user.models import Profile


# Create your views here.
@login_required
def profileView(request):
    user = auth.get_user(request)
    return render(request, 'homie_user/profile.html')


def profileData(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        objs = deserialize('json', json.dumps(data.get("profile", None)))
        succeed = False
        status = 204
        for obj in objs:
            obj.save()
            succeed = True
            status = 200
            # only one profile should be saved
            break
        return JsonResponse({}, status=status)
    if request.method == 'GET':
        try:
            username = request.user
            user = get_user_model().objects.get(username=username)
        except get_user_model().DoesNotExist:
            return JsonResponse({}, status=403)
        profile = None
        status = 200
        try:
            profile = Profile.objects.get(user_id=user.id)
        except Profile.DoesNotExist:
            profile = Profile(user_id=user.id)
            profile.save()
            status = 201
        return JsonResponse({
            "profile": serialize('json', [profile])
        },
                            status=status)
