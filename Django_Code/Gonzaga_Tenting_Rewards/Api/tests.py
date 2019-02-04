from django.test import TestCase
from rest_framework.test import  APIClient
from . import models
import threading
import json

# Create your tests here.
client = APIClient()

def confirmUserOutsideOfAPI(email):
    user = models.UserProfile.objects.get(email=email)
    user.is_confirmed = True
    user.save()

def binary_to_dict(the_binary):
    d = json.loads(the_binary.decode('utf-8'))
    return d

class TestCreateSingleUser(TestCase):

    def setUp(self):
        """Any setup that is required for this test"""
        models.UserProfile.objects.create_user(email="test@zagmail.gonzaga.edu",
                                               name="test case",
                                               phone_number="555-555-5555",
                                               student_id=123,
                                               password="somePassword",
                                               graduation_year=2018)
        confirmUserOutsideOfAPI("test@zagmail.gonzaga.edu")


    def test_object_was_created(self):
        """Object was successfully created in database"""

        tmp = models.UserProfile.objects.get(email="test@zagmail.gonzaga.edu")
        self.assertEqual(tmp.student_id, 123)
        self.assertEqual(tmp.phone_number, "555-555-5555")
        self.assertEqual(tmp.name, "test case")
        assert(tmp.password != None)
        # print("Test 1")

    def test_create_user_api(self):
        """Test to see if the POST request to the API works"""
        data = '{"name": "Tester", "email": "test1@zagmail.gonzaga.edu", "phone_number": "234-234-2345", "student_id": 8292, "password": "somePassword", "graduation_year": 2200}'
        request = client.post('/api/profile/',
                              data=data,
                              content_type="application/json")
        assert(request.status_code == 201)
        # user = models.UserProfile.objects.get(email="test@zagmail.gonzaga.edu")
        # client.force_authenticate(user=user)
        # request = client.get('/api/profile/')
        # results = request.data[0]
        # assert(len(request.data) == 2)
        # assert(request.data[1]['name'] == "Tester")

    def test_api_response(self):
        """Make sure the api retrieves a non admin user"""
        user = models.UserProfile.objects.get(email="test@zagmail.gonzaga.edu")
        client.force_authenticate(user=user)

        request = client.get('/api/profile/')
        results = request.data[0]
        assert(results['email'] == "test@zagmail.gonzaga.edu")
        assert(results['name'] == 'test case')
        assert(results['url'] == "http://testserver/api/profile/1")

class TestGetProfileObjects(TestCase):
    """Test the list function of the UserProfile View"""

    def setUp(self):
        models.UserProfile.objects.create_user(email="test@zagmail.gonzaga.edu",
                                               name="test case",
                                               phone_number="555-555-5555",
                                               student_id=123,
                                               password="somePassword",
                                               graduation_year=2018)
        confirmUserOutsideOfAPI("test@zagmail.gonzaga.edu")

    def test_get_permission(self):
        """Test that a user without permissions cannot access the API"""

        client.force_authenticate(user=None)
        response = client.get('/api/profile/')
        data = binary_to_dict(response.content)
        assert(data['detail'] == "Authentication credentials were not provided.")


class TestUserProfileModel(TestCase):
    """Test the User Profile Model"""

    def testCreation(self):
        user = models.UserProfile.objects.create(name="Testing", email="test@zagmail.gonzaga.edu",
                                  phone_number="1231231234",
                                  student_id=21,
                                  graduation_year=20,
                                  password="testPassword")
        assert(isinstance(user, models.UserProfile))
        assert(user.name == "Testing")
        assert(user.get_full_name() == "Testing")
        assert(user.get_student_id() == 21)
        assert(user.get_phone_number() == "1231231234")
        assert(str(user) == "test@zagmail.gonzaga.edu")

class TestCreateAdminUser(TestCase):
    """Test that an admin user was successfully created"""

    def setUp(self):
        """Perfrom any setup regarding this test"""

        models.UserProfile.objects.create_superuser(email="admin@zagmail.gonzaga.edu",
                                                    name="admin admin",
                                                    phone_number="5555555555",
                                                    student_id=1,
                                                    graduation_year=2020,
                                                    password="adminPassword"
                                                    )

        confirmUserOutsideOfAPI("admin@zagmail.gonzaga.edu")

    def test_object_was_created(self):
        """Super user was successfully created"""

        tmp = models.UserProfile.objects.get(email="admin@zagmail.gonzaga.edu")
        self.assertEqual(tmp.name, "admin admin")
        self.assertEqual(tmp.email, "admin@zagmail.gonzaga.edu")
        self.assertEqual(tmp.is_superuser, True)
        assert(tmp.password != None)
        # print("Test 3")

    def test_api_response(self):
        """See if the API was able to return our admin object"""

        user = models.UserProfile.objects.get(email="admin@zagmail.gonzaga.edu")
        client.force_authenticate(user=user)
        request = client.get('/api/profile/')
        assert(request.data == [])

class TestLoginFeature(TestCase):
    """Test that the user can receive a token when logging in"""

    def setUp(self):
        """Setup a user that will be able to login"""

        models.UserProfile.objects.create_user(email="test@zagmail.gonzaga.edu",
                                               name="test",
                                               phone_number="111-111-1111",
                                               student_id=123,
                                               password="testPassword1",
                                               graduation_year=2018)
        confirmUserOutsideOfAPI("test@zagmail.gonzaga.edu")

    def test_login(self):
        """See if the user can login with proper credentials"""

        request = client.post("/api/login/",
                              data="{\"username\": \"test@zagmail.gonzaga.edu\", \"password\": \"testPassword1\"}",
                              content_type="application/json")
        assert(request.data['token'] != None)
        token = request.data['token']
        client.force_authenticate(user=None)
        client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        request = client.get('/api/profile/')
        assert(request.data != [])

        # print("Test 5")

    def test_false_password_login(self):
        """Make sure the user can only login with correct password"""

        request = client.post("/api/login/",
                              data="{\"username\": \"test@zagmail.gonzaga.edu\", \"password\": \"wrongPassword1\"}",
                              content_type="application/json")

        assert(request.data['non_field_errors'] != None)
        # print("Test 6")

    def test_false_username_login(self):
        """Make sure the user can only login with the correct username and password"""

        request = client.post("/api/login/",
                              data="{\"username\": \"wrong@zagmail.gonzaga.edu\", \"password\": \"testPassword1\"}",
                              content_type="application/json")

        assert(request.data['non_field_errors'] != None)
        # print("Test 7")

class TestCreateTentGroup(TestCase):
    def setUp(self):
        """Setup a tenting group of 6 user profiles"""
        models.UserProfile.objects.create_user(email = "cvillagomez@zagmail.gonzaga.edu", name = "Carlos Villagomez",
                                               phone_number = "971-400-8724", student_id = 79849078, password = 123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email = "azenoni@zagmail.gonzaga.edu", name = "Andrew Zenoni",
                                               phone_number = "223-234-1223", student_id = 7984407, password = 123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email = "skopczynski@zagmail.gonzaga.edu", name = "Scott Kopczynski",
                                               phone_number = "912-440-8214", student_id = 71249078, password = 123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email = "mcarter@zagmail.gonzaga.edu", name = "Matt Carter",
                                               phone_number = "954-432-8732", student_id = 79834078, password = 123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email = "tester1@zagmail.gonzaga.edu", name = "Shawn Bowers",
                                               phone_number = "954-454-8434", student_id = 79815078, password = 123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email = "tester2@zagmail.gonzaga.edu", name = "David Schroeder",
                                               phone_number = "924-435-8231", student_id = 79844248, password = 123,
                                               graduation_year=2019)

        confirmUserOutsideOfAPI("cvillagomez@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("azenoni@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("skopczynski@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("mcarter@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester1@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester2@zagmail.gonzaga.edu")

        """Accesses users' profile information with email"""
        tenter1 = models.UserProfile.objects.get(email="cvillagomez@zagmail.gonzaga.edu")
        tenter2 = models.UserProfile.objects.get(email="azenoni@zagmail.gonzaga.edu")
        tenter3 = models.UserProfile.objects.get(email="skopczynski@zagmail.gonzaga.edu")
        tenter4 = models.UserProfile.objects.get(email="mcarter@zagmail.gonzaga.edu")
        tenter5 = models.UserProfile.objects.get(email="tester1@zagmail.gonzaga.edu")
        tenter6 = models.UserProfile.objects.get(email="tester2@zagmail.gonzaga.edu")

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
        models.UserProfile.objects.create_user(email="cvillagomez@zagmail.gonzaga.edu", name="Carlos Villagomez",
                                               phone_number="971-400-8724", student_id=79849078, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="azenoni@zagmail.gonzaga.edu", name="Andrew Zenoni",
                                               phone_number="223-234-1223", student_id=7984407, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="skopczynski@zagmail.gonzaga.edu", name="Scott Kopczynski",
                                               phone_number="912-440-8214", student_id=71249078, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="mcarter@zagmail.gonzaga.edu", name="Matt Carter",
                                               phone_number="954-432-8732", student_id=79834078, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="tester1@zagmail.gonzaga.edu", name="Shawn Bowers",
                                               phone_number="954-454-8434", student_id=79815078, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="tester2@zagmail.gonzaga.edu", name="David Schroeder",
                                               phone_number="924-435-8231", student_id=79844248, password=123,
                                               graduation_year=2019)

        confirmUserOutsideOfAPI("cvillagomez@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("azenoni@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("skopczynski@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("mcarter@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester1@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester2@zagmail.gonzaga.edu")

        """Accesses users' profile information with email"""
        tenter1 = models.UserProfile.objects.get(email="cvillagomez@zagmail.gonzaga.edu")
        tenter2 = models.UserProfile.objects.get(email="azenoni@zagmail.gonzaga.edu")
        tenter3 = models.UserProfile.objects.get(email="skopczynski@zagmail.gonzaga.edu")
        tenter4 = models.UserProfile.objects.get(email="mcarter@zagmail.gonzaga.edu")
        tenter5 = models.UserProfile.objects.get(email="tester1@zagmail.gonzaga.edu")
        tenter6 = models.UserProfile.objects.get(email="tester2@zagmail.gonzaga.edu")

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

class TestLoadOnProfile(TestCase):

    def setUp(self):
        """Setup a tenting group of 6 user profiles"""
        models.UserProfile.objects.create_user(email="cvillagomez@zagmail.gonzaga.edu", name="Carlos Villagomez",
                                               phone_number="971-400-8724", student_id=79849078, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="azenoni@zagmail.gonzaga.edu", name="Andrew Zenoni",
                                               phone_number="223-234-1223", student_id=7984407, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="skopczynski@zagmail.gonzaga.edu", name="Scott Kopczynski",
                                               phone_number="912-440-8214", student_id=71249078, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="mcarter@zagmail.gonzaga.edu", name="Matt Carter",
                                               phone_number="954-432-8732", student_id=79834078, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="tester1@zagmail.gonzaga.edu", name="Shawn Bowers",
                                               phone_number="954-454-8434", student_id=79815078, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="tester2@zagmail.gonzaga.edu", name="David Schroeder",
                                               phone_number="924-435-8231", student_id=79844248, password=123,
                                               graduation_year=2019)

        confirmUserOutsideOfAPI("cvillagomez@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("azenoni@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("skopczynski@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("mcarter@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester1@zagmail.gonzaga.edu")
        confirmUserOutsideOfAPI("tester2@zagmail.gonzaga.edu")

    def test_load_on_profile(self):
        """Test the load on the profile api page"""
        user = models.UserProfile.objects.get(email="azenoni@zagmail.gonzaga.edu")
        client.force_authenticate(user=user)
        for i in range(100):
            thread = threading.Thread(target=self.test_profile_get())
            thread.start()
        thread.join()
        # print("Tested 1000 get requests to /api/profile/")

    def test_profile_get(self):
        user = models.UserProfile.objects.get(email="azenoni@zagmail.gonzaga.edu")
        client.force_authenticate(user=user)
        for i in range(10):
            request = client.get('/api/profile/')
            results = request.data[0]
            assert (results['email'] != None)

class TestConfirmEmail(TestCase):
    """Test the confirm email function of API"""

    def setUp(self):
        models.UserProfile.objects.create_user(email="test@zagmail.gonzaga.edu",
                                               name="test",
                                               phone_number="111-111-1111",
                                               student_id=123,
                                               password="testPassword1",
                                               graduation_year=2018)

    def test_get_confirm(self):
        user = models.UserProfile.objects.get(email="test@zagmail.gonzaga.edu")
        parameters = "id=" + str(user.id)+ "&confirmation_id=" + str(user.confirmation_id)
        url = '/api/confirm-email/?' + parameters
        response = client.get(url)
        assert(response.data['success'] == True)

    def test_post_confirm(self):
        user = models.UserProfile.objects.get(email="test@zagmail.gonzaga.edu")
        parameters = "id=" + str(user.id) + "&confirmation_id=" + str(user.confirmation_id)
        url = '/api/confirm-email/?' + parameters
        response = client.post(url)
        assert (response.data['success'] == True)

    def test_false_parameters(self):
        user = models.UserProfile.objects.get(email="test@zagmail.gonzaga.edu")
        parameters = "id=" + str(488) + "&confirmation_id=" + str(user.confirmation_id)
        url = '/api/confirm-email/?' + parameters
        response = client.get('/api/confirm-email/?' + parameters)
        assert (response.data['success'] == False)

class TestGameObject(TestCase):
    """Test the game view of the Game Object"""

    def setUp(self):
        """Perform any setup for test cases"""

        models.UserProfile.objects.create_superuser(email="admin@zagmail.gonzaga.edu",
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
        user = models.UserProfile.objects.get(email="admin@zagmail.gonzaga.edu")
        client.force_authenticate(user=user)
        response = client.post('/api/games/', data=parameters)
        assert(response.data['id'] == 1)
        assert(response.data['game_name'] == "Testing Game")
        assert(response.data['game_start'] == "2019-02-07T05:00:00Z")
        assert(response.data['tenting_start'] == "2019-02-09T07:08:00Z")