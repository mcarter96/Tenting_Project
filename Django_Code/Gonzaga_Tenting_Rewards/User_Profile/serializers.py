# This file lays out the different serializers used for our api

# Imports
from rest_framework import serializers

from django.core.validators import RegexValidator
from Helper_Functions import remove_data, user_functions

from . import models
from Tent_Checks import models as Tent_Checks_Models
# Define serializers here

class UserProfileSerializer(serializers.ModelSerializer):
    """A serializer for our user profile objects."""

    class Meta:
        model = models.UserProfile
        # This id field (first field) relates to the unique identifier, not the student id
        fields = ('id', 'email', 'name', 'password', 'student_id', 'phone_number', 'is_staff', 'graduation_year')

        # Defines extra parameters on the certain fields
        extra_kwargs = {'password': {'write_only': True},
                        'is_staff': {'read_only': True},
                        'graduation_year': {'required': True,
                                            },
                        'phone_number': {'required': True,
                                         'allow_blank': False
                                         },
                        'student_id': {'required': True,
                                       },
                        }

    def create(self, validated_data):
        """Create and return a new user"""

        # Remove extraneous users from the database
        remove_data.removeExtraneousUsers()

        # Setup a user model
        user = models.UserProfile(
            email=validated_data['email'],
            name=validated_data['name'],
            student_id = validated_data['student_id'],
            phone_number = validated_data['phone_number'],
            graduation_year = validated_data['graduation_year'],
        )

        # Set the password for the user
        user.set_password(validated_data['password'])

        # Save the user in the database
        user.save()

        # Return the user
        return user



