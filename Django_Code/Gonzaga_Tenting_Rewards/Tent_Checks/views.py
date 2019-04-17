from rest_framework import viewsets, status
from rest_framework.response import Response
from . import models
from . import serializers
from . import permissions
from Helper_Functions import user_functions
from django.db import models as db_models


# Create your views here.
class TentCheckViewSet(viewsets.ModelViewSet):
    """Logic to assign tents to a game"""

    serializer_class = serializers.TentCheckSerializer

    queryset = models.Tent_Check.objects.all()

    permission_classes = (permissions.InteractWithTentChecks,)


    def list(self, request, *args, **kwargs):
        """Function runs whenever retrieving a specific tent object"""
        queryset = self.filter_queryset(self.get_queryset())

        # Determine if there were any query params listed in the url and sort data appropriately

        # See if they want any missing checks
        missing_check = self.request.query_params.get('missing_check')
        if missing_check is not None:
            params = {}
            # Generate a list of all checks they want to complete
            checks = missing_check.split(',')
            for check in checks:
                if check in [field.name for field in models.Tent_Check._meta.fields]:
                    params[check] = False
            # Filter on parameters
            queryset = queryset.filter(**params)

        # Filter to only view tents that have completed all tent checks
        done_tents = self.request.query_params.get('done_tents')
        if done_tents is not None and done_tents == 'True':
            params = {}
            # Grab a list of all the tent check boolean fields (AKA all tent check fields) from the tent check model
            for field in models.Tent_Check._meta.get_fields():
                if type(field) == db_models.BooleanField:
                    params[field.name] = True
            queryset = queryset.filter(**params)

        completed_check = self.request.query_params.get('completed_check')
        if completed_check is not None:
            print(completed_check)
            params = {}
            # Generate a list of all checks they want to complete
            checks = completed_check.split(',')
            for check in checks:
                if check in [field.name for field in models.Tent_Check._meta.fields]:
                    params[check] = True
            # Filter on parameters
            queryset = queryset.filter(**params)


        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        # Grab the student's ids for each tent and display them
        # TODO: Fix issue with multiple db calls
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