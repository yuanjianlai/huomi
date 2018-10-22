from django.http import HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
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


def login(request):
    data = json.loads(request.body)
    username = data.get('username', '')
    pwd = data.get('password', '')
    user = auth.authenticate(username=username, password=pwd)
    if user and user.is_active:
        auth.login(request, user)
        return HttpResponse("login.success")
    else:
        return HttpResponse("login.failed.not_found")


def validate_registration(request):
    #TODO: add logic to validate registration request.
    return True


def register(request):
    if request.method == 'POST':
        if not validate_registration(request):
            return JsonResponse({
                "success": False,
                "reason": "validation_error",
                "field": "testField"
            })
        data = json.loads(request.body)
        username = data.get('username', '')
        pwd = data.get('password', '')
        firstName = data.get('firstName', '')
        lastName = data.get('lastName', '')
        email = data.get('email', None)
        city = data.get('city', '')
        isTrainer = data.get('isTrainer', False)
        try:
            user = get_user_model().objects.get(username=username)
            return JsonResponse({"success": False, "reason": "user_exists"})
        except get_user_model().DoesNotExist:
            user = get_user_model().objects.create_user(
                username=username,
                password=pwd,
                first_name=firstName,
                last_name=lastName,
                email=email,
                city=city,
                is_trainer=isTrainer)
            user.save()
            auth.login(request, user)
            return JsonResponse({"success": True})


def logout(request):
    auth.logout(request)
    return redirect("/login/", None)
