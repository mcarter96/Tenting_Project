# This file allows for custom permissions to be created

# Imports
from rest_framework import permissions

# Define custom permissions here

class UpdateOwnProfile(permissions.BasePermission):
    """Allow users to edit their own profile."""

    def has_object_permission(self, request, view, obj):
        """Check user is trying to edit their own profile."""

        # If the method is part of the SAFE_METHODS in the permissions class from rest_framework (ie request
        # is either GET, OPTIONS, or HEAD)
        # if request.method in permissions.SAFE_METHODS:
        #     return True

        if request.user.id == None:
            return False

        # If the object that is being requested has the same id as the user that is making the request
        return obj.id == request.user.id

