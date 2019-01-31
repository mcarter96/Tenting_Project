from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from . import models
from . import serializers
from . import permissions

# Create your views here.
class TentCheckViewSet(viewsets.ModelViewSet):
    """Logic to assign tents to a game"""

    serializer_class = serializers.TentCheckSerializer

    queryset = models.Tent_Check.objects.all()

    permission_classes = (permissions.InteractWithTentChecks,)

    def create(self, request, *args, **kwargs):
        """Create a game"""

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)