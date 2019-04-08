from django.test import TestCase
from rest_framework.test import  APIClient

import json
from User_Profile import models as api_models
# Create your tests here.

def confirmUserOutsideOfAPI(email):
    user = api_models.UserProfile.objects.get(email=email)
    user.is_confirmed = True
    user.save()

def binary_to_dict(the_binary):
    d = json.loads(the_binary.decode('utf-8'))
    return d

client = APIClient()


class TestGameObject(TestCase):
    """Test the game view of the Game Object"""

    def setUp(self):
        """Perform any setup for test cases"""

        api_models.UserProfile.objects.create_superuser(email="admin@zagmail.gonzaga.edu",
                                                    name="admin admin",
                                                    phone_number="5555555555",
                                                    student_id=1,
                                                    graduation_year=2020,
                                                    password="adminPassword"
                                                    )

        confirmUserOutsideOfAPI("admin@zagmail.gonzaga.edu")

    def test_game_creation(self):
        """Create a game through the API"""

        parameters = {
                     "game_start": "2019-02-07T05:00:00Z",
                     "tenting_start": "2019-02-09T07:08:00Z",
                     "game_name": "Testing Game",
                     }
        user = api_models.UserProfile.objects.get(email="admin@zagmail.gonzaga.edu")
        client.force_authenticate(user=user)
        response = client.post('/api/games/', data=parameters)
        assert(response.data['id'] == 1)
        assert(response.data['game_name'] == "Testing Game")
        assert(response.data['game_start'] == "2019-02-07T05:00:00Z")
        assert(response.data['tenting_start'] == "2019-02-09T07:08:00Z")