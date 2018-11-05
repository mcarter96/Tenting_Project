from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated
from collections import OrderedDict



from . import serializers
from . import models
from . import permissions

# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    """Handles creating, creating and updating prfiles"""

    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)


class LoginViewSet(viewsets.ViewSet):
    """Checks email and password and returns an auth token"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        """Use the ObtainAuthToken APIView to validate and create a token."""

        return ObtainAuthToken().post(request)

class UserAPIView(APIView):

    serializer_class = serializers.UserProfileSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (permissions.UpdateOwnProfile,)

    def get(self, request, format=None):
        """Return a list of users in the database"""

        user_detail = OrderedDict({'status': 200, 'results': []})
        for user in models.UserProfile.objects.all():
            tmp = {'name': user.name, 'email': user.email,
                   'phone number': user.phone_number, 'studentd id': user.student_id}
            user_detail['results'].append(tmp)
        return Response(user_detail)

    def post(self, request):

        serializer = serializers.TestUserSerializer(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get('name')
            email = serializer.data.get('email')
            phone_number = serializer.get('phone_number')
            student_id = serializer.get('student_id')
            return Response({'name': name, 'email': email, 'phone number': phone_number, 'student id': student_id})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



