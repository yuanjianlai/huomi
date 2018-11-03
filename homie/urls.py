"""homie URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.static import serve
from django.conf import settings
from django.views.generic import TemplateView
from homie.views import homeView, loginView, registerView, feedView
from homie.views import register, login, logout
from homie_user.views import profileData, profileView
from djng.views.upload import FileUploadView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', homeView),
    url(r'^register/', TemplateView.as_view(template_name='index.html')),
    url(r'^login/', loginView),
    url(r'^profile/', profileView),
    url(r'^feed/', feedView),
    url(r'^account/login/', login),
    url(r'^account/register/', register),
    url(r'^account/logout/$', logout),
    url(r'^data/profile/$', profileData)
]

if settings.DEBUG:
    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT,
        })
    ]
