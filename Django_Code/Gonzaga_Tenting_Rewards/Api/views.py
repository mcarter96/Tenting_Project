# This file defines different views that can be accessed from the API

# Imports
from django.contrib.auth.forms import PasswordResetForm as password_reset_form
from django.contrib.auth.tokens import default_token_generator as token_generator, default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponseRedirect
from django.contrib.auth import get_user_model as UserModel
from django.template import loader
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
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
from django.core.mail import send_mail, EmailMultiAlternatives
from Gonzaga_Tenting_Rewards import settings

from . import serializers
from . import models
from . import permissions
from django.contrib.auth.forms import PasswordResetForm

# Create your views here.

class UserProfileViewSet(viewsets.ModelViewSet):
    """Handles creating, creating and updating profiles"""

    # What serializer to use
    serializer_class = serializers.UserProfileSerializer

    # What to bounce queries against
    queryset = models.UserProfile.objects.all().filter(is_staff=False)

    # What to use for authentication
    authentication_classes = (TokenAuthentication,)

    # What permissions to use for this object
    permission_classes = (permissions.UpdateOwnProfile,)

    # What filters can be used and which fields can be searched on
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'email',)

    generic_fields = ('id','name', 'email', 'url', 'tent_id')

    def create(self, request, *args, **kwargs):
        """Creates a new UserProfile"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # grab the user that is signing up
        user = models.UserProfile.objects.get(id=serializer.data['id'])

        # generate the url required for them to complete the registration process
        url = reverse_lazy('api-root', request=request)
        url += 'confirm-email/?id=' + str(user.id) + '&confirmation_id=' + str(user.confirmation_id)

        # determine who to send the email to, depending on deployement state
        if settings.DEBUG:
            to_email = "tenting.rewards@gmail.com"
        else:
            to_email = user.email

        # The following will fail because no email is setup in the project (does not show it fails)
        send_mail("Authenticate Email", # Subject
                  "Below is a unique identifier for your account in order to finish confirming your account and to" +
                  " have access to the Tenting Rewards application. Please attempt to login to the application via " +
                  "the app then paste the token in the provided text box to confirm your account.\n\n\n\n" +
                  str(user.confirmation_id), # Message
                  'Gonzaga Tenting Rewards', # From
                  [to_email], # To
                  fail_silently=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        """Query that runs when listing all of the objects (most is taken from actual list function of ModelViewSet)"""

        # What objects to query on
        queryset = self.filter_queryset(self.get_queryset())
        # queryset.filter(is_staff=True)

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
    """Class to allow email confirmations"""

    def get(self, request, format=None):
        """Get request for the email confirmation"""
        try:
            id = self.request.query_params.get('id', None)
            confirmation_id = self.request.query_params.get('confirmation_id', None)
            if id is not None and confirmation_id is not None:
                user = models.UserProfile.objects.get(id=id, confirmation_id=confirmation_id)
                user.is_confirmed = True
                user.save()
                return Response({'message': 'Email is now confirmed', 'success': True})
            else:
                #return something that shows there was an error
                return Response({'message': 'Invalid id or confirmation id', 'success': False,
                                 'status': status.HTTP_400_BAD_REQUEST})
        except:
            #return something that shows there was an error
            return Response({'message': 'User was not found', 'success': False, 'status': status.HTTP_404_NOT_FOUND})

    def post(self, request):
        """Post request for email confirmation, might use depending on design choices"""
        try:
            id = self.request.query_params.get('id', None)
            confirmation_id = self.request.query_params.get('confirmation_id', None)
            if id is not None and confirmation_id is not None:
                user = models.UserProfile.objects.get(id=id, confirmation_id=confirmation_id)
                user.is_confirmed = True
                user.save()
                return Response({'message': 'Email is now confirmed', 'success': True})
            else:
                return Response({'message': 'There was an error with id or confirmation id being None',
                                 'success': False})
        except:
            return Response({'message': 'An exception was thrown', 'success': False})

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
        is_confirmed = models.UserProfile.objects.get(id=user_id).is_confirmed

        # Return the response with necessary fields based on confirmation
        if is_confirmed:
            return Response({'token': token.key, 'is_admin': is_admin, 'tent_id': tent_id,
                             'is_confirmed': is_confirmed, 'status': status.HTTP_202_ACCEPTED})
        else:
            return Response({'is_confirmed': is_confirmed, 'message': 'This user is not confirmed yet',
                             'status': status.HTTP_401_UNAUTHORIZED})

class TentViewSet(viewsets.ModelViewSet):
    """Handles creating and updating of tent groups"""

    # What serializer to use
    serializer_class = serializers.TentSerializer

    # What to bounce queries against
    queryset = models.TentGroup.objects.all()

    # What to use for authentication
    authentication_classes = (TokenAuthentication,)


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

class PasswordReset(APIView):
    """Password reset feature for user profile"""

    cleaned_data = {"email":"tenting.rewards@gmail.com"}
    def post(self, request):

        self.cleaned_data = request.data

        try:
            models.UserProfile.objects.get(email = self.cleaned_data["email"])
            self.save(self, use_https=False, from_email="Gonzaga Tenting Rewards", request=request)
            return Response({"message": "Password Reset!"})
        except:
            return Response("User does not exist")

    def send_mail(self, subject_template_name, email_template_name,
                  context, from_email, to_email, html_email_template_name=None):
        """
        Send a django.core.mail.EmailMultiAlternatives to `to_email`.
        """
        subject = loader.render_to_string(subject_template_name, context)
        # Email subject *must not* contain newlines
        subject = ''.join(subject.splitlines())
        body = loader.render_to_string(email_template_name, context)



        email_message = EmailMultiAlternatives(subject, body, from_email, [to_email])
        if html_email_template_name is not None:
            html_email = loader.render_to_string(html_email_template_name, context)
            email_message.attach_alternative(html_email, 'text/html')

        email_message.send()

    def get_users(self, email):
        """Given an email, return matching user(s) who should receive a reset.

        This allows subclasses to more easily customize the default policies
        that prevent inactive users and users with unusable passwords from
        resetting their password.
        """
        active_users = models.UserProfile.objects.get(email=email)
        return [active_users]

    def save(self, domain_override=None,
             subject_template_name='registration/password_reset_subject.txt',
             email_template_name='registration/password_reset_email.html',
             use_https=False, token_generator=default_token_generator,
             from_email=None, request=None, html_email_template_name=None,
             extra_email_context=None):
        """
        Generate a one-use only link for resetting password and send it to the
        user.
        """
        email = self.cleaned_data["email"]
        for user in self.get_users(email):
            if not domain_override:
                current_site = get_current_site(request)
                site_name = current_site.name
                domain = current_site.domain
            else:
                # site_name = domain = domain_override
                current_site = get_current_site(request)
                site_name = current_site.name
                domain = current_site.domain
            if settings.DEBUG:
                email = "tenting.rewards@gmail.com"
            context = {
                'email': email,
                'domain': domain,
                'site_name': site_name,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)).decode(),
                'user': user,
                'token': token_generator.make_token(user),
                'protocol': 'https' if use_https else 'http',
            }


            if extra_email_context is not None:
                context.update(extra_email_context)
            self.send_mail(
                subject_template_name, email_template_name, context, from_email,
                email, html_email_template_name=html_email_template_name,
            )