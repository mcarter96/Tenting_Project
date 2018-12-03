# This file defines different views that can be accessed from the API

# Imports
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.reverse import reverse_lazy
from Helper_Functions import user_functions
from rest_framework import status
from django.core.mail import send_mail

from . import serializers
from . import models
from . import permissions

# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    """Handles creating, creating and updating profiles"""

    # What serializer to use
    serializer_class = serializers.UserProfileSerializer

    # What to bounce queries against
    queryset = models.UserProfile.objects.all()

    # What to use for authentication
    authentication_classes = (TokenAuthentication,)

    # What permissions to use for this object
    permission_classes = (permissions.UpdateOwnProfile,)

    # What filters can be used and which fields can be searched on
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

    generic_fields = ('id','name', 'email', 'url', 'tent_id')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # The following will fail because no email is setup in the project (does not show it fails)
        send_mail("Authenticate Email", # Subject
                  "Please click the following link to authenticate your email", # Message
                  'andrew@zenoni.com', # From
                  ['azenoni@zagmail.gonzaga.edu'], # To
                  fail_silently=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        """Query that runs when listing all of the objects (most is taken from actual list function of ModelViewSet)"""

        # What objects to query on
        queryset = self.filter_queryset(self.get_queryset())

        # Determines if django is using paginations
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            # Generate the base url of the application
            tmp = reverse_lazy('api-root', request=request)
            # Only return the generic fields when listing all user profiles
            for dicts in serializer.data:
                dicts['url'] = tmp + "profile/" + str(dicts['id'])
                dicts['tent_id'] = user_functions.getTentID(dicts['id'])
                dicts_copy = dicts.copy()
                for i in dicts_copy:
                    if i not in self.generic_fields:
                        del dicts[i]


            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        tmp = reverse_lazy('api-root', request=request)

        # Only return the generic fields when listing all user profiles
        for dicts in serializer.data:
            dicts['url'] = tmp + "profile/" + str(dicts['id'])
            dicts['tent_id'] = user_functions.getTentID(dicts['id'])
            dicts_copy = dicts.copy()
            for i in dicts_copy:
                if i not in self.generic_fields:
                    del dicts[i]

        return Response(serializer.data)


class LoginViewSet(viewsets.ViewSet):
    """Checks email and password and returns an auth token"""

    # What serializer to use
    serializer_class = AuthTokenSerializer

    # Generate an auth token
    def create(self, request):
        """Use the ObtainAuthToken APIView to validate and create a token."""

        # The following code is mostly grabbed from the authtoken
        # implementation provided by django (ObtainAuthToken().post(request))
        # It has been modified to include additional values in the response
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        # Find out specific data about the user
        user_id = user_functions.getUserID(serializer.validated_data['username'])
        is_admin = user_functions.getIfAdmin(user_id)
        tent_id = user_functions.getTentID(user_id)


        # Return the response with necessary fields
        return Response({'token': token.key, 'is_admin': is_admin, 'tent_id': tent_id})

class TentViewSet(viewsets.ModelViewSet):
    """Handles creating and updating of tent groups"""

    # What serializer to use
    serializer_class = serializers.TentSerializer

    # What to bounce queries against
    queryset = models.TentGroup.objects.all()

    # What to use for authentication
    authentication_classes = (TokenAuthentication,)


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

