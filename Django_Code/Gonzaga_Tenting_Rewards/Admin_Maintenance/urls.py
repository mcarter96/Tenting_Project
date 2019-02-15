# This file lays out the different urls that can be accessible

# Imports
from django.conf.urls import url
from django.conf.urls import include


from . import views


# Define the different urls that can be accessed
urlpatterns = [
    url(r'^remove-tents/', views.RemoveAllTents.as_view()),
    url(r'^remove-users/', views.RemoveExtraneousUsers.as_view()),
    url('^remove-games/', views.RemoveCurrentGame.as_view()),
]
