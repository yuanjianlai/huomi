# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser


def validate_city(value):
    return True


class HomieUser(AbstractUser):
    SHANGHAI = "SH"
    BEIJING = "BJ"
    HANGZHOU = "HZ"
    SHENZHEN = "SZ"
    ALLOWED_CITY = ((SHANGHAI, "ShangHai"), (BEIJING, "Beijing"),
                    (HANGZHOU, "HangZhou"), (SHENZHEN, "ShenZhen"))
    city = models.CharField(
        max_length=30, validators=[validate_city], choices=ALLOWED_CITY)
    is_trainer = models.BooleanField(default=False)


# Create your models here.
