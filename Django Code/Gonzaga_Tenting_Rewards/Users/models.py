from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager

# Create your models here.

class UserProfileManager(BaseUserManager):
    """Helps Django work with our custom user model."""

    def create_user(self, email, name, phone_number, student_id, password=None, superUser=False):
        """Creates a new user profile object."""

        if not phone_number and not superUser:
            raise ValueError('Users must have a phone number')

        if not student_id and not superUser:
            raise ValueError('Users must have a student id')

        if not email:
            raise ValueError('Users must have an email address.')

        email = self.normalize_email(email)
        if not superUser:
            user = self.model(email=email, name=name, phone_number=phone_number, student_id=student_id)
        else:
            user = self.model(email=email, name=name)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):
        """Creates and saves a new superuser with given details."""

        user = self.create_user(email, name, password, -1, -1, superUser=True)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Represents a user profile inside our system"""

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    student_id = models.IntegerField(default=-1, unique=True)
    phone_number = models.IntegerField(default=-1, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        """Used to get a users full name."""

        return self.name

    def get_student_id(self):
        """Used to get a users student id."""

        return self.student_id

    def get_phone_number(self):
        """Used to get a users phone number"""

        return self.phone_number

    def __str__(self):
        """Django uses this when it needs to convert the object to a string"""

        return self.email

