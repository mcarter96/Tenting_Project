# This file allows for custom permissions to be created

# Imports
from rest_framework import permissions
from Api import models

# Define custom permissions here

class UpdateOwnProfile(permissions.BasePermission):
    """Allow users to edit their own profile."""

    def has_permission(self, request, view):
        if request.user.id == None:
            return False


        user = models.UserProfile.objects.get(id=request.user.id)
        if user.is_confirmed:
            return True
        else:
            return False

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

class InteractWithGameData(permissions.BasePermission):
    """Determine if the user can interact with the Game Data object"""

    def has_permission(self, request, view):
        """Determine what data the user requesting this data can view and interact with"""

        user = request.user.id
        try:
            user = models.UserProfile.objects.get(id=user)
        except:
            return False
        if user.is_staff:
            return True
        else:
            if request.method in permissions.SAFE_METHODS:
                return True
            return False
