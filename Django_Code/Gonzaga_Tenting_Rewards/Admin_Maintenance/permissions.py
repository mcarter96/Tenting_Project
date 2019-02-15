# This file allows for custom permissions to be created

# Imports
from rest_framework import permissions
from Api import models

# Define custom permissions here

class AdminOnlyPermission(permissions.BasePermission):

    def has_permission(self, request, view):

        if request.user.id is None:
            return False

        try:
            user = models.UserProfile.objects.get(id=request.user.id)
            if user.is_staff and user.is_confirmed:
                return True
            else:
                return False
        except:
            return False
