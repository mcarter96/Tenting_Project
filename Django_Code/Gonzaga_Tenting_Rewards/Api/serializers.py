# This file lays out the different serializers used for our api

# Imports
from rest_framework import serializers
from django.core.validators import RegexValidator

from . import models

# Define serializers here

class UserProfileSerializer(serializers.ModelSerializer):
    """A serializer for our user profile objects."""

    class Meta:
        model = models.UserProfile
        fields = ('email', 'name', 'password', 'student_id', 'phone_number', 'is_staff')
        # Defines extra parameters on the certain fields
        extra_kwargs = {'password': {'write_only': True}, 'is_staff': {'read_only': True}}

    def create(self, validated_data):
        """Create and return a new user"""

        user = models.UserProfile(
            email=validated_data['email'],
            name=validated_data['name'],
            student_id = validated_data['student_id'],
            phone_number = validated_data['phone_number'],
        )

        user.set_password(validated_data['password'])

        user.save()

        return user


