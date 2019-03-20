# This file allows for custom permissions to be created

# Imports
from rest_framework import permissions
from User_Profile import models

# Define custom permissions here

class UpdateOwnProfile(permissions.BasePermission):
    """Allow users to edit their own profile."""

    def has_permission(self, request, view):
        """Determine if the requesting user can perform certain actions on the User Profile object."""
        if request.method == 'POST':
            return True

        if request.user.id == None:
            return False


        user = models.UserProfile.objects.get(id=request.user.id)
        if user.is_confirmed:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        """Check user is trying to edit their own profile, admins can modify all aspects of a User Profile"""

        if request.user.id == None:
            return False

        user = models.UserProfile.objects.get(id=request.user.id)
        if user.is_staff:
            return True

        # If the object that is being requested has the same id as the user that is making the request
        return obj.id == request.user.id
