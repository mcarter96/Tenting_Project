# This file lays out the different urls that can be accessible

# Imports
from django.conf.urls import url
from django.conf.urls import include

from rest_framework.routers import DefaultRouter

from . import views

# Define the router and add necessary views to the router that the api can access
router = DefaultRouter()

router.register('tent-checks', views.TentCheckViewSet, base_name='tent-checks')

# Define the different urls that can be accessed
urlpatterns = [
    url(r'', include(router.urls)),
]
