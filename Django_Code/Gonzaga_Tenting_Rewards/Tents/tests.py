from django.test import TestCase
from rest_framework.test import  APIClient
from . import models
import json

from User_Profile import models as api_models

# Create your tests here.
client = APIClient()

def confirmUserOutsideOfAPI(email):
    user = api_models.UserProfile.objects.get(email=email)
    user.is_confirmed = True
    user.save()

def binary_to_dict(the_binary):
    d = json.loads(the_binary.decode('utf-8'))
    return d


class TestCreateTentGroup(TestCase):
    def setUp(self):
        """Setup a tenting group of 6 user profiles"""
        api_models.UserProfile.objects.create_user(email = "cvillagomez@zagmail.gonzaga.edu", name = "Carlos Villagomez",
                                               phone_number = "971-400-8724", student_id = 79849078, password = 123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email = "azenoni@zagmail.gonzaga.edu", name = "Andrew Zenoni",
                                               phone_number = "223-234-1223", student_id = 7984407, password = 123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email = "skopczynski@zagmail.gonzaga.edu", name = "Scott Kopczynski",
                                               phone_number = "912-440-8214", student_id = 71249078, password = 123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email = "mcarter@zagmail.gonzaga.edu", name = "Matt Carter",
                                               phone_number = "954-432-8732", student_id = 79834078, password = 123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email = "tester1@zagmail.gonzaga.edu", name = "Shawn Bowers",
                                               phone_number = "954-454-8434", student_id = 79815078, password = 123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email = "tester2@zagmail.gonzaga.edu", name = "David Schroeder",
                                               phone_number = "924-435-8231", student_id = 79844248, password = 123,
                                               graduation_year=2019)

        confirmUserOutsideOfAPI("cvillagomez@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("azenoni@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("skopczynski@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("mcarter@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester1@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester2@zagmail.gonzaga.edu")

        """Accesses users' profile information with email"""
        tenter1 = api_models.UserProfile.objects.get(email="cvillagomez@zagmail.gonzaga.edu")
        tenter2 = api_models.UserProfile.objects.get(email="azenoni@zagmail.gonzaga.edu")
        tenter3 = api_models.UserProfile.objects.get(email="skopczynski@zagmail.gonzaga.edu")
        tenter4 = api_models.UserProfile.objects.get(email="mcarter@zagmail.gonzaga.edu")
        tenter5 = api_models.UserProfile.objects.get(email="tester1@zagmail.gonzaga.edu")
        tenter6 = api_models.UserProfile.objects.get(email="tester2@zagmail.gonzaga.edu")

        """Creates a new tent group object and passes in data"""
        models.TentGroup.objects.create(tenter_1=tenter1, tenter_2=tenter2, tenter_3=tenter3, tenter_4=tenter4,
                                        tenter_5=tenter5, tenter_6=tenter6,
                                        tent_pin=1111, qr_code_str="ONE")

    def test_object_was_created(self):
        """Object was successfully created in database"""

        tmp = models.TentGroup.objects.get(tenter_1 = "1")
        self.assertEqual(tmp.tenter_2.email, "azenoni@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tenter_3.email, "skopczynski@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tenter_4.email, "mcarter@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tenter_5.email, "tester1@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tenter_6.email, "tester2@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tent_pin, 1111)
        self.assertEqual(tmp.qr_code_str, "ONE")
        # print("Test 8")


class TestTentGroupModel(TestCase):

    def test_object_creation(self):
        api_models.UserProfile.objects.create_user(email="cvillagomez@zagmail.gonzaga.edu", name="Carlos Villagomez",
                                               phone_number="971-400-8724", student_id=79849078, password=123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email="azenoni@zagmail.gonzaga.edu", name="Andrew Zenoni",
                                               phone_number="223-234-1223", student_id=7984407, password=123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email="skopczynski@zagmail.gonzaga.edu", name="Scott Kopczynski",
                                               phone_number="912-440-8214", student_id=71249078, password=123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email="mcarter@zagmail.gonzaga.edu", name="Matt Carter",
                                               phone_number="954-432-8732", student_id=79834078, password=123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email="tester1@zagmail.gonzaga.edu", name="Shawn Bowers",
                                               phone_number="954-454-8434", student_id=79815078, password=123,
                                               graduation_year=2019)
        api_models.UserProfile.objects.create_user(email="tester2@zagmail.gonzaga.edu", name="David Schroeder",
                                               phone_number="924-435-8231", student_id=79844248, password=123,
                                               graduation_year=2019)

        confirmUserOutsideOfAPI("cvillagomez@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("azenoni@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("skopczynski@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("mcarter@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester1@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester2@zagmail.gonzaga.edu")

        """Accesses users' profile information with email"""
        tenter1 = api_models.UserProfile.objects.get(email="cvillagomez@zagmail.gonzaga.edu")
        tenter2 = api_models.UserProfile.objects.get(email="azenoni@zagmail.gonzaga.edu")
        tenter3 = api_models.UserProfile.objects.get(email="skopczynski@zagmail.gonzaga.edu")
        tenter4 = api_models.UserProfile.objects.get(email="mcarter@zagmail.gonzaga.edu")
        tenter5 = api_models.UserProfile.objects.get(email="tester1@zagmail.gonzaga.edu")
        tenter6 = api_models.UserProfile.objects.get(email="tester2@zagmail.gonzaga.edu")

        tent = models.TentGroup.create_tent_group(models.TentGroup.objects, tenter1, tenter2,
                                                  tenter3, tenter4, tenter5, tenter6, 1111, "ONE")
        # tent = models.TentGroup.objects.create(tenter_1=tenter1, tenter_2=tenter2, tenter_3=tenter3, tenter_4=tenter4,
        #                                 tenter_5=tenter5, tenter_6=tenter6,
        #                                 tent_pin=1111, qr_code_str="ONE")

        assert(tent.get_tenter_1() == tenter1)
        assert(tent.get_tenter_2() == tenter2)
        assert(tent.get_tenter_3() == tenter3)
        assert(tent.get_tenter_4() == tenter4)
        assert(tent.get_tenter_5() == tenter5)
        assert(tent.get_tenter_6() == tenter6)
        assert(tent.get_qr_code_str() == "ONE")