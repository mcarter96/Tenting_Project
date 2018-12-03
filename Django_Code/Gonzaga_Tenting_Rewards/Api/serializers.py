# This file lays out the different serializers used for our api

# Imports
from rest_framework import serializers

from django.core.validators import RegexValidator
from Helper_Functions import remove_data, user_functions

from . import models

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

class TentSerializer(serializers.ModelSerializer):
    """A serializer for our tent objects."""

    class Meta:
        model = models.TentGroup
        fields = ('id', 'tenter_1', 'tenter_2', 'tenter_3', 'tenter_4', 'tenter_5', 'tenter_6', 'tent_pin', 'qr_code_str')

        # Defines extra parameters on the certain fields

    def create(self, validated_data):
        """
        Create and return a new `TentSerializer` instance, given the validated data.
        """

        # tenter1 = user_functions.getUserID(validated_data['tenter_1'])
        # tenter2 = user_functions.getUserID(validated_data['tenter_2'])
        # tenter3 = user_functions.getUserID(validated_data['tenter_3'])
        # tenter4 = user_functions.getUserID(validated_data['tenter_4'])
        # tenter5 = user_functions.getUserID(validated_data['tenter_5'])
        # tenter6 = user_functions.getUserID(validated_data['tenter_6'])



        user = models.TentGroup(
            tenter_1=validated_data['tenter_1'],
            tenter_2=validated_data['tenter_2'],
            tenter_3=validated_data['tenter_3'],
            tenter_4=validated_data['tenter_4'],
            tenter_5=validated_data['tenter_5'],
            tenter_6=validated_data['tenter_6'],
            tent_pin=validated_data['tent_pin'],
            qr_code_str=validated_data['qr_code_str'],
        )

        user.save()

        return user
        # return TentSerializer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.tenter_1 = validated_data.get('tenter_1', instance.tenter_1)
        instance.tenter_2 = validated_data.get('tenter_2', instance.tenter_2)
        instance.tenter_3 = validated_data.get('tenter_3', instance.tenter_3)
        instance.tenter_4 = validated_data.get('tenter_4', instance.tenter_4)
        instance.tenter_5 = validated_data.get('tenter_5', instance.tenter_5)
        instance.tenter_6 = validated_data.get('tenter_6', instance.tenter_6)
        instance.tent_pin = validated_data.get('tent_pin', instance.tent_pin)
        instance.qr_code_str = validated_data.get('qr_code_str', instance.qr_code_str)
        instance.save()
        return instance