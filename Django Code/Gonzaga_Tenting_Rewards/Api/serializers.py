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

# TODO: Create class TentSerializer
class TentSerializer(serializers.ModelSerializer):
    """A serializer for our tent objects."""
    tenter_1 = serializers.IntegerField(read_only=True)
    tenter_2 = serializers.IntegerField(required=False)
    tenter_3 = serializers.IntegerField(required=False)
    tenter_4 = serializers.IntegerField(required=False)
    tenter_5 = serializers.IntegerField(required=False)
    tenter_6 = serializers.IntegerField(required=False)
    tent_pin = serializers.IntegerField(read_only=True)
    qr_code_str = serializers.CharField(read_only=True)

    def create(self, validated_data):
        """
        Create and return a new `TentSerializer` instance, given the validated data.
        """
        return TentSerializer.objects.create(**validated_data)

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

