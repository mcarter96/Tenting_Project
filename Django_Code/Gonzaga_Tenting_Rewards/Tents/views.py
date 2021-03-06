from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication

from . import serializers
from . import models

# Create your views here.
class TentViewSet(viewsets.ModelViewSet):
    """Handles creating and updating of tent groups"""

    # What serializer to use
    serializer_class = serializers.TentSerializer

    # What to bounce queries against
    queryset = models.TentGroup.objects.all()

    # What to use for authentication
    authentication_classes = (TokenAuthentication,)