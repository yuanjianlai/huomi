from django.http import HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
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


def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username', '')
        pwd = data.get('password', '')
        try:
            user = User.objects.get(username=username)
            return HttpResponse("register.failed.user_exists")
        except User.DoesNotExist:
            user = User.objects.create_user(username=username, password=pwd)
            user.save()
            auth.login(request, user)
            return HttpResponse("register.success")


def logout(request):
    auth.logout(request)
    return redirect("/login/", None)
