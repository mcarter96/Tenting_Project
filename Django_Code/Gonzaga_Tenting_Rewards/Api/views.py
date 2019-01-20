# This file defines different views that can be accessed from the API

# Imports
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.views import APIView
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

        print(serializer.data)

        user = models.UserProfile.objects.get(id=serializer.data['id'])

        url = reverse_lazy('api-root', request=request)
        print(url)
        url += 'confirm-email/?id=' + str(user.id) + '&confirmation_id=' + str(user.confirmation_id)

        # The following will fail because no email is setup in the project (does not show it fails)
        send_mail("Authenticate Email", # Subject
                  "Please click the following link to authenticate your email \n" + url, # Message
                  'tenting.rewards@gmail.com', # From
                  ['azenoni@zagmail.gonzaga.edu'], # To
                  fail_silently=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        """Query that runs when listing all of the objects (most is taken from actual list function of ModelViewSet)"""

        # What objects to query on
        queryset = self.filter_queryset(self.get_queryset())

        # Determine if there are any query parameters in the URL to filter responses with
        id = self.request.query_params.get('id', None)
        if id is not None:
            queryset = queryset.filter(id=id)

        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(email=email)

        name = self.request.query_params.get('name', None)
        if name is not None:
            queryset = queryset.filter(name=name)

        tent_id = self.request.query_params.get('tent_id', None)
        if tent_id is not None:
            queryset = queryset.filter(tent_id=tent_id)

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

class ConfirmEmail(APIView):

    def get(self, request, format=None):
        try:
            id = self.request.query_params.get('id', None)
            confirmation_id = self.request.query_params.get('confirmation_id', None)
            print(id, confirmation_id)
            if id is not None and confirmation_id is not None:
                user = models.UserProfile.objects.get(id=id, confirmation_id=confirmation_id)
                user.is_active = True
                user.save()
                return Response({'message': 'Email is now confirmed, thank you', 'success': True})
            else:
                #return something that shows there was an error
                return Response({'message': 'Hello! There was an error with id or confirmation id being None'})
        except:
            #return something that shows there was an error
            return Response({'message': 'Hello! An exception was thrown'})

    def post(self, request):
        try:
            id = self.request.query_params.get('id', None)
            confirmation_id = self.request.query_params.get('confirmation_id', None)
            print(id, confirmation_id)
            if id is not None and confirmation_id is not None:
                user = models.UserProfile.objects.get(id=id, confirmation_id=confirmation_id)
                user.is_active = True
                user.save()
            else:
                #return something that shows there was an error
                return Response({'message': 'Hello! There was an error with id or confirmation id being None'})
        except:
            #return something that shows there was an error
            return Response({'message': 'Hello! An exception was thrown'})

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
        is_active = models.UserProfile.objects.get(id=user_id).is_active

        # Return the response with necessary fields
        return Response({'token': token.key, 'is_admin': is_admin, 'tent_id': tent_id, 'is_active': is_active})

class TentViewSet(viewsets.ModelViewSet):
    """Handles creating and updating of tent groups"""

    # What serializer to use
    serializer_class = serializers.TentSerializer

    # What to bounce queries against
    queryset = models.TentGroup.objects.all()

    # What to use for authentication
    authentication_classes = (TokenAuthentication,)

    # Removed to test provided create and update functions, may not for the future but not for current commit
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    #
    # def update(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_202_ACCEPTED, headers=headers)

class GamesViewSet(viewsets.ModelViewSet):
    """Logic to assign tents to a game"""

    serializer_class = serializers.GameSerializer

    queryset = models.Game.objects.all()

    def create(self, request, *args, **kwargs):
        """Create a game"""

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)