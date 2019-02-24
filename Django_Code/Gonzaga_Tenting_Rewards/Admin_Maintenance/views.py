from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.reverse import reverse_lazy
from Helper_Functions import user_functions, remove_data
from rest_framework import status
from django.core.mail import send_mail
from Gonzaga_Tenting_Rewards import settings

from . import permissions


# Create your views here.
class RemoveAllTents(APIView):

    permission_classes = (permissions.AdminOnlyPermission,)

    def post(self, request):
        remove_data.removeAllTents()
        return Response({"message": "All tents have been deleted", "success": True})

class RemoveExtraneousUsers(APIView):

    permission_classes = (permissions.AdminOnlyPermission,)

    def post(self, request):
        remove_data.removeExtraneousUsers()
        return Response({"message" : "All users who were created 6 years ago have been deleted", "success": True})

class RemoveCurrentGame(APIView):

    permission_classes = (permissions.AdminOnlyPermission,)

    def post(self, request):
        remove_data.removeAllGames()
        return Response({"message" : "All games have been deleted", "success": True})