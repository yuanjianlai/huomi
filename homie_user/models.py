# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser


def validate_city(value):
    return True


def validate_address(value):
    return True


class HomieUser(AbstractUser):
    is_trainer = models.BooleanField(default=False)


class Profile(models.Model):
    user = models.OneToOneField(HomieUser)
    GENDER_UNSPECIFIED = 0
    GENDER_MALE = 1
    GENDER_FEMALE = 2
    ALLOWED_GENDER = ((GENDER_UNSPECIFIED, "Unspecified"),
                      (GENDER_MALE, "Male"), (GENDER_FEMALE, "Female"))
    profile_photo = models.ImageField(
        null=True, upload_to="profile_photos/%Y/%m/%D")
    address = models.CharField(
        null=True, max_length=1000, validators=[validate_address])
    gender = models.IntegerField(
        default=GENDER_UNSPECIFIED, choices=ALLOWED_GENDER)
    memo = models.CharField(null=True, max_length=1000)
    city = models.ManyToManyField("City")


class City(models.Model):
    city_name = models.CharField(max_length=30, validators=[validate_city])
