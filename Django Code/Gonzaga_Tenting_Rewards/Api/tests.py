from django.test import TestCase, Client
from rest_framework.test import APIRequestFactory
from . import models

# Create your tests here.
client = Client()
class TestCreateSingleUser(TestCase):

    def setUp(self):
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
        request = client.get('/api/profile/')
        assert(request.data['count'] == 1)
        results = request.data['results'][0]
        assert(results['email'] == "test@zagmail.gonzaga.edu")
        assert(results['name'] == 'test case')
        assert(results['student_id'] == 123)
        assert(results['phone_number'] == '555-555-5555')
        assert(results['is_staff'] == False)

class TestCreateAdminUser(TestCase):

    def setUp(self):
        models.UserProfile.objects.create_superuser("admin@zagmail.gonzaga.edu",
                                                    "admin admin",
                                                    "somePassword")