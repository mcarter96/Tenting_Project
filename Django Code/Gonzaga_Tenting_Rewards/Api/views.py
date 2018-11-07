# This file defines different views that can be accessed from the API

# Imports
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken

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


class LoginViewSet(viewsets.ViewSet):
    """Checks email and password and returns an auth token"""

    # What serializer to use
    serializer_class = AuthTokenSerializer

    # Generate an auth token
    def create(self, request):
        """Use the ObtainAuthToken APIView to validate and create a token."""

        return ObtainAuthToken().post(request)

# TODO: Create a TentViewSet class
class TentViewSet(viewsets.ViewSet):
    """Handles creating, creating and updating profiles"""

    # What serializer to use
    serializer_class = serializers.UserProfileSerializer

    # What to bounce queries against
    queryset = models.UserProfile.objects.all()

    # What to use for authentication
    authentication_classes = (TokenAuthentication,)

