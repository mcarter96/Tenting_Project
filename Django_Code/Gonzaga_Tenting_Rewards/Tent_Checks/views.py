from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from . import models
from . import serializers
from . import permissions
from Helper_Functions import user_functions

# Create your views here.
class TentCheckViewSet(viewsets.ModelViewSet):
    """Logic to assign tents to a game"""

    serializer_class = serializers.TentCheckSerializer

    queryset = models.Tent_Check.objects.all()

    permission_classes = (permissions.InteractWithTentChecks,)

    def list(self, request, *args, **kwargs):
        """Function runs whenever retrieving a specific tent object"""
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        for tents in serializer.data:
            tent = user_functions.getTenterInformation(tents['tent_id'])
            if tent is not None:
                for key in tent.keys():
                    if tent[key] is not None:
                        tents[key + '_student_id'] = tent[key].get_student_id()
                    else:
                        tents[key + '_student_id'] = None
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """Create a game"""

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)