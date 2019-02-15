# This file allows for custom permissions to be created

# Imports
from rest_framework import permissions
from Api import models as Api_models

# Define custom permissions here

class InteractWithTentChecks(permissions.BasePermission):
    """Determine if the user can interact with the Game Data object"""

    def has_permission(self, request, view):
        """Determine what data the user requesting this data can view and interact with"""

        user = request.user.id
        try:
            user = Api_models.UserProfile.objects.get(id=user)
        except:
            return False
        if user.is_staff:
            return True
        else:
            if request.method in permissions.SAFE_METHODS:
                return True
            return False
