from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.core.validators import RegexValidator
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

        user = self.create_user(email, name, -1, -1, password=password, superUser=True)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Represents a user profile inside our system"""
    email_regex = RegexValidator(regex=r'^\w{3,15}@zagmail.gonzaga.edu',
                                 message="Email address must be a zagmail email address")
    email = models.EmailField(max_length=255, unique=True, validators=[email_regex])
    name = models.CharField(max_length=255)
    student_id = models.IntegerField(default=-1, unique=True)
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

