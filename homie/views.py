from django.http import HttpResponseRedirect
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
import json


def login_view(request):
    data = json.loads(request.body)
    username = data.get('username', '')
    pwd = data.get('password','')
    usr = auth.authenticate(username=username, password = pwd)
    if usr is not None and usr.is_active:
        auth.login(request, usr)
        return HttpResponse("login.success")
    else:
        return HttpResponse("login.failed.not_found")

def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username', '')
        pwd = data.get('password','')
        try:
            user = User.objects.get(username=username)
            return HttpResponseRedirect("/")
        except models.User.DoesNotExist:
            user = User.objects.create_user(username=username, password=pwd)
            user.save()
            auth.login(request, user)
            return HttpResponseRedirect("/")
