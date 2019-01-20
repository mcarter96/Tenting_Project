# This file lays out the different urls that can be accessible

# Imports
from django.conf.urls import url
from django.conf.urls import include

from rest_framework.routers import DefaultRouter

from . import views

# Define the router and add necessary views to the router that the api can access
router = DefaultRouter()
router.register('profile', views.UserProfileViewSet)
router.register('login', views.LoginViewSet, base_name='login')
router.register('tent', views.TentViewSet, base_name='tent')
router.register('games', views.GamesViewSet, base_name='games')

# Define the different urls that can be accessed
urlpatterns = [
    url(r'', include(router.urls)),
    url(r'^confirm-email/', views.ConfirmEmail.as_view()),
]
