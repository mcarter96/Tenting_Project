from rest_framework import serializers
from django.core.validators import RegexValidator

from . import models

class UserProfileSerializer(serializers.ModelSerializer):
    """A serializer for our user profile objects."""

    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'name', 'password', 'student_id', 'phone_number', 'is_staff')
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
class TestUserSerializer(serializers.Serializer):
    """Serializes a name field for testing our APIView."""

    email_regex = RegexValidator(regex=r'^\w{3,15}@zagmail.gonzaga.edu',
                                 message="Email address must be a zagmail email address")
    email = serializers.EmailField(max_length=255, validators=[email_regex])
    name = serializers.CharField(max_length=255)
    student_id = serializers.IntegerField(default=-1)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{3,3}?-?\d{3,3}?-?\d{4,4}$',
                                 message="Phone number must be entered in the format: '+999-999-9999'")
    phone_number = serializers.CharField(validators=[phone_regex], max_length=17,
                                    default=-1)  # validators should be a list
    is_active = serializers.BooleanField(default=True)
    is_staff = serializers.BooleanField(default=False)
