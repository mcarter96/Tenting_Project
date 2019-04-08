# This file lays out the different urls that can be accessible

# Imports
from django.conf.urls import url
from django.conf.urls import include

from rest_framework.routers import SimpleRouter

from . import views

# Define the router and add necessary views to the router that the api can access
router = SimpleRouter()
router.register('tent', views.TentViewSet, base_name='tent')

# Define the different urls that can be accessed
urlpatterns = [
    url(r'', include(router.urls)),
    url('^', include('django.contrib.auth.urls')),
]
