from django.test import TestCase, Client
from . import models

# Create your tests here.
client = Client()
class TestCreateSingleUser(TestCase):

    def setUp(self):
        """Any setup that is required for this test"""
        models.UserProfile.objects.create_user(email="test@zagmail.gonzaga.edu",
                                               name="test case",
                                               phone_number="555-555-5555",
                                               student_id=123,
                                               password="somePassword",
                                               graduation_year=2018)

    def test_object_was_created(self):
        """Object was successfully created in database"""

        tmp = models.UserProfile.objects.get(email="test@zagmail.gonzaga.edu")
        self.assertEqual(tmp.student_id, 123)
        self.assertEqual(tmp.phone_number, "555-555-5555")
        self.assertEqual(tmp.name, "test case")
        assert(tmp.password != None)
        # print("Test 1")

    def test_api_response(self):
        """Make sure the api retrieves a non admin user"""
        request = client.get('/api/profile/')
        results = request.data[0]
        assert(results['email'] == "test@zagmail.gonzaga.edu")
        assert(results['name'] == 'test case')
        assert(results['url'] == "http://testserver/api/profile/1")
        # print("test 2")

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

        request = client.get('/api/profile/')
        results = request.data[0]
        assert(results['email'] == "admin@zagmail.gonzaga.edu")
        # print("Test 4")

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

    def test_login(self):
        """See if the user can login with proper credentials"""

        request = client.post("/api/login/",
                              data="{\"username\": \"test@zagmail.gonzaga.edu\", \"password\": \"testPassword1\"}",
                              content_type="application/json")
        assert(request.data['token'] != None)
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
        models.UserProfile.objects.create_user(email = "cvillagomez@zagmail.gonzaga.edu", name = "Carlos Villagomez", phone_number = "971-400-8724", student_id = 79849078, password = 123, graduation_year=2019)
        models.UserProfile.objects.create_user(email = "azenoni@zagmail.gonzaga.edu", name = "Andrew Zenoni", phone_number = "223-234-1223", student_id = 7984407, password = 123, graduation_year=2019)
        models.UserProfile.objects.create_user(email = "skopczynski@zagmail.gonzaga.edu", name = "Scott Kopczynski", phone_number = "912-440-8214", student_id = 71249078, password = 123, graduation_year=2019)
        models.UserProfile.objects.create_user(email = "mcarter@zagmail.gonzaga.edu", name = "Matt Carter", phone_number = "954-432-8732", student_id = 79834078, password = 123, graduation_year=2019)
        models.UserProfile.objects.create_user(email = "bowers@zagmail.gonzaga.edu", name = "Shawn Bowers", phone_number = "954-454-8434", student_id = 79815078, password = 123, graduation_year=2019)
        models.UserProfile.objects.create_user(email = "schroeder@zagmail.gonzaga.edu", name = "David Schroeder", phone_number = "924-435-8231", student_id = 79844248, password = 123, graduation_year=2019)

        """Accesses users' profile information with email"""
        tenter1 = models.UserProfile.objects.get(email="cvillagomez@zagmail.gonzaga.edu")
        tenter2 = models.UserProfile.objects.get(email="azenoni@zagmail.gonzaga.edu")
        tenter3 = models.UserProfile.objects.get(email="skopczynski@zagmail.gonzaga.edu")
        tenter4 = models.UserProfile.objects.get(email="mcarter@zagmail.gonzaga.edu")
        tenter5 = models.UserProfile.objects.get(email="bowers@zagmail.gonzaga.edu")
        tenter6 = models.UserProfile.objects.get(email="schroeder@zagmail.gonzaga.edu")

        """Creates a new tent group object and passes in data"""
        models.TentGroup.objects.create(tenter_1=tenter1, tenter_2=tenter2, tenter_3=tenter3, tenter_4=tenter4, tenter_5=tenter5, tenter_6=tenter6,
                                        tent_pin=1111, qr_code_str="ONE")
    def test_object_was_created(self):
        """Object was successfully created in database"""

        tmp = models.TentGroup.objects.get(tenter_1 = "1")
        self.assertEqual(tmp.tenter_2.email, "azenoni@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tenter_3.email, "skopczynski@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tenter_4.email, "mcarter@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tenter_5.email, "bowers@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tenter_6.email, "schroeder@zagmail.gonzaga.edu")
        self.assertEqual(tmp.tent_pin, 1111)
        self.assertEqual(tmp.qr_code_str, "ONE")
        # print("Test 8")

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
        models.UserProfile.objects.create_user(email="bowers@zagmail.gonzaga.edu", name="Shawn Bowers",
                                               phone_number="954-454-8434", student_id=79815078, password=123,
                                               graduation_year=2019)
        models.UserProfile.objects.create_user(email="schroeder@zagmail.gonzaga.edu", name="David Schroeder",
                                               phone_number="924-435-8231", student_id=79844248, password=123,
                                               graduation_year=2019)

    def test_load_on_profile(self):
        """Test the load on the profile api page"""
        for i in range(1001):
            request = client.get('/api/profile/')
            results = request.data[0]
            assert (results['email'] != None)
        # print("Tested 1000 get requests to /api/profile/")

