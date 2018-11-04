from django.http import HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

import json


def homeView(request):
    user = auth.get_user(request)
    if user and user.is_active:
        if user.is_authenticated:
            return redirect('/feed/', None)
        else:
            return redirect('/login/', None)
    else:
        return render(request, 'home.html', None)


def loginView(request):
    user = auth.get_user(request)
    if user and user.is_active and user.is_authenticated:
        return redirect('/feed/', None)
    else:
        return render(request, 'login.html', None)


def registerView(request):
    user = auth.get_user(request)
    if user and user.is_active and user.is_authenticated:
        return redirect('/feed/', None)
    else:
        return render(request, 'home.html', None)


@login_required
def feedView(request):
    user = auth.get_user(request)
    return render(request, 'feed.html', None)


def login(request):
    data = json.loads(request.body)
    username = data.get('username', '')
    pwd = data.get('password', '')
    user = auth.authenticate(username=username, password=pwd)
    if user and user.is_active:
        auth.login(request, user)
        return JsonResponse(
            {},
            status=202  # Accepted
        )
    else:
        return JsonResponse(
            {
                error: "user_not_found"
            },
            status=404  # Not Found
        )


def validate_registration(request):
    #TODO: add logic to validate registration request.
    return True


def register(request):
    if request.method == 'POST':
        if not validate_registration(request):
            return JsonResponse(
                {
                    error: "validation_error",
                },
                status=422  #Unprocessable Entity
            )
        data = json.loads(request.body)
        username = data.get('username', '')
        pwd = data.get('password', '')
        firstName = data.get('firstName', '')
        lastName = data.get('lastName', '')
        email = data.get('email', None)
        isTrainer = data.get('isTrainer', False)
        try:
            user = get_user_model().objects.get(username=username)
            return JsonResponse(
                {
                    error: "user_exists"
                },
                status=409  # Conflict
            )
        except get_user_model().DoesNotExist:
            user = get_user_model().objects.create_user(
                username=username,
                password=pwd,
                first_name=firstName,
                last_name=lastName,
                email=email,
                is_trainer=isTrainer)
            user.save()
            auth.login(request, user)
            return JsonResponse(
                {},
                status=201  # Created
            )


@login_required
def logout(request):
    auth.logout(request)
    return redirect("/login/", None)
