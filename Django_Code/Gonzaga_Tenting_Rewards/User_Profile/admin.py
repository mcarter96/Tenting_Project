# This file is where to register the models with the django admin
from django.contrib import admin

from . import models

# Register your models here.
admin.site.register(models.UserProfile)
