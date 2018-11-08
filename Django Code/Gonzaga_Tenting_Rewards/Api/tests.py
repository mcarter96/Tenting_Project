from django.test import TestCase, Client
from rest_framework.test import APIRequestFactory
from . import models

# Create your tests here.
client = Client()
class TestCreateSingleUser(TestCase):

    def setUp(self):
        """Any setup that is required for this test"""
        models.UserProfile.objects.create_user("test@zagmail.gonzaga.edu",
                                              "test case", "555-555-5555", 123, "somePassword")

    def test_object_was_created(self):
        """Object was successfully created in database"""

        tmp = models.UserProfile.objects.get(email="test@zagmail.gonzaga.edu")
        self.assertEqual(tmp.student_id, 123)
        self.assertEqual(tmp.phone_number, "555-555-5555")
        self.assertEqual(tmp.name, "test case")
        assert(tmp.password != None)

    def test_api_response(self):
        """Make sure the api retrieves a non admin user"""
        request = client.get('/api/profile/')
        assert(request.data['count'] == 1)
        results = request.data['results'][0]
        assert(results['email'] == "test@zagmail.gonzaga.edu")
        assert(results['name'] == 'test case')
        assert(results['student_id'] == 123)
        assert(results['phone_number'] == '555-555-5555')
        assert(results['is_staff'] == False)

class TestCreateAdminUser(TestCase):
    """Test that an admin user was successfully created"""

    def setUp(self):
        """Perfrom any setup regarding this test"""

        models.UserProfile.objects.create_superuser("admin@zagmail.gonzaga.edu",
                                                    "admin admin",
                                                    "somePassword")

    def test_object_was_created(self):
        """Super user was successfully created"""

        tmp = models.UserProfile.objects.get(email="admin@zagmail.gonzaga.edu")
        self.assertEqual(tmp.name, "admin admin")
        self.assertEqual(tmp.email, "admin@zagmail.gonzaga.edu")
        self.assertEqual(tmp.is_superuser, True)
        assert(tmp.password != None)

    def test_api_response(self):
        """See if the API was able to return our admin object"""

        request = client.get('/api/profile/')
        # print(request.data)
        assert(request.data['count'] == 1)
        results = request.data['results'][0]
        assert(results['email'] == "admin@zagmail.gonzaga.edu")

class TestLoginFeature(TestCase):
    """Test that the user can receive a token when logging in"""

    def setUp(self):
        """Setup a user that will be able to login"""

        models.UserProfile.objects.create_user("test@zagmail.gonzaga.edu", "test", "111-111-1111", 123, "testPassword1")

    def test_login(self):
        """See if the user can login with proper credentials"""

        request = client.post("/api/login/",
                              data="{\"username\": \"test@zagmail.gonzaga.edu\", \"password\": \"testPassword1\"}",
                              content_type="application/json")
        assert(request.data['token'] != None)

    def test_false_password_login(self):
        """Make sure the user can only login with correct password"""

        request = client.post("/api/login/",
                              data="{\"username\": \"test@zagmail.gonzaga.edu\", \"password\": \"wrongPassword1\"}",
                              content_type="application/json")

        assert(request.data['non_field_errors'] != None)

    def test_false_username_login(self):
        """Make sure the user can only login with the correct username and password"""

        request = client.post("/api/login/",
                              data="{\"username\": \"wrong@zagmail.gonzaga.edu\", \"password\": \"testPassword1\"}",
                              content_type="application/json")

        assert (request.data['non_field_errors'] != None)