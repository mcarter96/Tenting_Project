from django.db import models
from Api import models as Api_models

# Create your models here.
class Tent_Check(models.Model):
    """Create a game for admins to assign tents for"""

    tent_id = models.ForeignKey(Api_models.TentGroup, on_delete=models.CASCADE)
    waiver_check = models.BooleanField(default=False)
    setup_check = models.BooleanField(default=False)
    tent_check_1 = models.BooleanField(default=False)
    tent_check_2 = models.BooleanField(default=False)
    tent_check_3 = models.BooleanField(default=False)
    tent_check_4 = models.BooleanField(default=False)
    final_check = models.BooleanField(default=False)

    def create_tent(self):
        tent_check = self.model()
        return tent_check

    def get_tent_id(self):
        return self.tent_id

    def get_waiver_check(self):
        return self.waiver_check

    def get_setup_check(self):
        return self.setup_check

    def get_tent_check_1(self):
        return self.tent_check_1

    def get_tent_check_2(self):
        return self.tent_check_2

    def get_tent_check_3(self):
        return self.tent_check_3

    def get_tent_check_4(self):
        return self.tent_check_4

    def get_final_check(self):
        return self.final_check