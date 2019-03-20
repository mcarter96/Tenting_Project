from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from . import serializers
from . import models
from . import permissions

# Create your views here.
class GamesViewSet(viewsets.ModelViewSet):
    """Logic to assign tents to a game"""

    serializer_class = serializers.GameSerializer

    queryset = models.Game.objects.all()

    permission_classes = (permissions.InteractWithGameData,)

    def create(self, request, *args, **kwargs):
        """Create a game"""

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)