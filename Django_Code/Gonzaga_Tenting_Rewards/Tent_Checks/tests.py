from django.test import TestCase

# Create your tests here.

from django.test import TestCase, Client
from rest_framework.test import  force_authenticate, APIClient
from . import models
from Api import models as Api_models
import threading
import json

# Create your tests here.
client = APIClient()

def confirmUserOutsideOfAPI(email):
    user = Api_models.UserProfile.objects.get(email=email)
    user.is_confirmed = True
    user.save()

class TestTentCheckView(TestCase):
    """Test the tent check view"""

    def setUp(self):
        Api_models.UserProfile.objects.create_user(email="cvillagomez@zagmail.gonzaga.edu", name="Carlos Villagomez",
                                               phone_number="971-400-8724", student_id=79849078, password=123,
                                               graduation_year=2019)
        Api_models.UserProfile.objects.create_user(email="azenoni@zagmail.gonzaga.edu", name="Andrew Zenoni",
                                               phone_number="223-234-1223", student_id=7984407, password=123,
                                               graduation_year=2019)
        Api_models.UserProfile.objects.create_user(email="skopczynski@zagmail.gonzaga.edu", name="Scott Kopczynski",
                                               phone_number="912-440-8214", student_id=71249078, password=123,
                                               graduation_year=2019)
        Api_models.UserProfile.objects.create_user(email="mcarter@zagmail.gonzaga.edu", name="Matt Carter",
                                               phone_number="954-432-8732", student_id=79834078, password=123,
                                               graduation_year=2019)
        Api_models.UserProfile.objects.create_user(email="tester1@zagmail.gonzaga.edu", name="Shawn Bowers",
                                               phone_number="954-454-8434", student_id=79815078, password=123,
                                               graduation_year=2019)
        Api_models.UserProfile.objects.create_user(email="tester2@zagmail.gonzaga.edu", name="David Schroeder",
                                               phone_number="924-435-8231", student_id=79844248, password=123,
                                               graduation_year=2019)

        confirmUserOutsideOfAPI("cvillagomez@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("azenoni@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("skopczynski@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("mcarter@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester1@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester2@zagmail.gonzaga.edu")

        """Accesses users' profile information with email"""
        tenter1 = Api_models.UserProfile.objects.get(email="cvillagomez@zagmail.gonzaga.edu")
        tenter2 = Api_models.UserProfile.objects.get(email="azenoni@zagmail.gonzaga.edu")
        tenter3 = Api_models.UserProfile.objects.get(email="skopczynski@zagmail.gonzaga.edu")
        tenter4 = Api_models.UserProfile.objects.get(email="mcarter@zagmail.gonzaga.edu")
        tenter5 = Api_models.UserProfile.objects.get(email="tester1@zagmail.gonzaga.edu")
        tenter6 = Api_models.UserProfile.objects.get(email="tester2@zagmail.gonzaga.edu")

        """Creates a new tent group object and passes in data"""
        Api_models.TentGroup.objects.create(tenter_1=tenter1, tenter_2=tenter2, tenter_3=tenter3, tenter_4=tenter4,
                                        tenter_5=tenter5, tenter_6=tenter6,
                                        tent_pin=1111, qr_code_str="ONE")
        tent = Api_models.TentGroup.objects.get(tenter_1=tenter1)
        models.Tent_Check.objects.create(tent_id=tent)

    def test_tent_list(self):
        """See if the list of tents is returned properly"""

        user = Api_models.UserProfile.objects.get(email="tester1@zagmail.gonzaga.edu")
        client.force_authenticate(user=user)
        request = client.get('/api/tent-checks/')

        data = request.data[0]
        assert(data['tent_id'] == 1)
        assert(data['waiver_check'] == False)
        assert(data['setup_check'] == False)
        assert(data['tent_check_1'] == False)
        assert(data['tent_check_2'] == False)
        assert(data['tent_check_3'] == False)
        assert(data['tent_check_4'] == False)
        assert(data['final_check'] == False)

    def test_tent_creation(self):
        """Test the creation of a tent-check via api"""

        Api_models.UserProfile.objects.create_superuser(email="admin@zagmail.gonzaga.edu",
                                                    name="admin admin",
                                                    phone_number="5555555555",
                                                    student_id=1,
                                                    graduation_year=2020,
                                                    password="adminPassword"
                                                    )

        confirmUserOutsideOfAPI("admin@zagmail.gonzaga.edu")

        user = Api_models.UserProfile.objects.get(email="admin@zagmail.gonzaga.edu")

        tent = Api_models.TentGroup.objects.create(tenter_1=user, tent_pin=12333, qr_code_str="TWO")

        data = {
            "tent_id": tent.id,
        }
        client.force_authenticate(user=user)
        response = client.post('/api/tent-checks/', data=data)
        print(response.content)


    def test_model_creation(self):
        """Test the creation of a tent check model"""
        user = Api_models.UserProfile.objects.get(email="tester1@zagmail.gonzaga.edu")
        tent = Api_models.TentGroup.objects.create(tenter_1=user, tent_pin=123123, qr_code_str="THREE")

        tent_check = models.Tent_Check.objects.create(tent_id=tent.id)
