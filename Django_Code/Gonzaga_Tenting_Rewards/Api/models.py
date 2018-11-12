# This file lays out the different objects that our API view will use
# Django uses this to create tables in the database automatically when using the following commands:
# python manage.py makemigrations
# python manage.py migrate

# Imports
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.core.validators import RegexValidator

# Create your models here.

# This abstracts the BaseUserManager object so we can add custom fields (student_id, phone_number,...)
class UserProfileManager(BaseUserManager):
    """Helps Django work with our custom user model."""

    def create_user(self, email, name, phone_number, student_id, password=None, superUser=False):
        """Creates a new user profile object."""

        # Make sure a phone number was entered
        if not phone_number and not superUser:
            raise ValueError('Api must have a phone number')

        # Make sure a student id was entered
        if not student_id and not superUser:
            raise ValueError('Api must have a student id')

        # Make sure an email was entered
        if not email:
            raise ValueError('Api must have an email address.')

        email = self.normalize_email(email)

        # If the request was not a super user
        if not superUser:
            user = self.model(email=email, name=name, phone_number=phone_number, student_id=student_id)
        else: # If the request is a super user, leave out phone_number and student_id
            user = self.model(email=email, name=name)

        # allow django to set and store the password securely
        user.set_password(password)
        user.save(using=self._db)

        return user

    # Creates a super user
    def create_superuser(self, email, name, password):
        """Creates and saves a new superuser with given details."""

        user = self.create_user(email, name, -1, -1, password=password, superUser=True)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

# Class that defines a user profile object
class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Represents a user profile inside our system"""

    # Makes sure the email that was passed in is a zagmail email
    email_regex = RegexValidator(regex=r'^\w{3,15}@zagmail.gonzaga.edu',
                                 message="Email address must be a zagmail email address")
    email = models.EmailField(max_length=255, unique=True, validators=[email_regex])
    name = models.CharField(max_length=255)
    student_id = models.IntegerField(default=-1, unique=True)

    # Make sure the phone number entered follows the format of a phone number
    phone_regex = RegexValidator(regex=r'^\+?1?\d{3,3}?-?\d{3,3}?-?\d{4,4}$',
                                 message="Phone number must be entered in the format: '+999-999-9999'")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True, unique=True, default=-1)  # validators should be a list
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'student_id', 'phone_number']

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

