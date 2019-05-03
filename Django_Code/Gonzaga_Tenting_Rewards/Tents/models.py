from django.db import models
from User_Profile import models as api_models
from Game import models as game_models

# Create your models here.

def limit_tenter_choices():
    return {'is_staff': False, 'is_active': True}


class TentGroup(models.Model):
    """Creates a new instance of a tenting group object and assigns up to 6 users to the group"""

    tenter_1 = models.ForeignKey(api_models.UserProfile, related_name='tenter_1', on_delete=models.PROTECT,
                                 limit_choices_to=limit_tenter_choices)
    tenter_2 = models.ForeignKey(api_models.UserProfile, related_name='tenter_2', on_delete=models.SET_NULL,
                                 limit_choices_to=limit_tenter_choices, null=True)
    tenter_3 = models.ForeignKey(api_models.UserProfile, related_name='tenter_3', on_delete=models.SET_NULL,
                                 limit_choices_to=limit_tenter_choices, null=True)
    tenter_4 = models.ForeignKey(api_models.UserProfile, related_name='tenter_4', on_delete=models.SET_NULL,
                                 limit_choices_to=limit_tenter_choices, null=True)
    tenter_5 = models.ForeignKey(api_models.UserProfile, related_name='tenter_5', on_delete=models.SET_NULL,
                                 limit_choices_to=limit_tenter_choices, null=True)
    tenter_6 = models.ForeignKey(api_models.UserProfile, related_name='tenter_6', on_delete=models.SET_NULL,
                                 limit_choices_to=limit_tenter_choices, null=True)
    tent_pin = models.IntegerField()
    qr_code_str = models.CharField(max_length=100)
    game_id = models.ForeignKey(game_models.Game, related_name='game_id', on_delete=models.CASCADE, null=True)
    tent_number = models.IntegerField(null=True)

    def create_tent_group(self, tenter_1, tenter_2, tenter_3, tenter_4, tenter_5, tenter_6, tent_pin, qr_code_str):
        """Creates a new tenting group object."""
        tent_group = self.model(tenter_1=tenter_1, tenter_2=tenter_2, tenter_3=tenter_3, tenter_4=tenter_4,
                                tenter_5=tenter_5, tenter_6=tenter_6, tent_pin=tent_pin, qr_code_str=qr_code_str)

        return tent_group

    def get_tenter_1(self):
        """Used to get tenter 1's email."""

        return self.tenter_1

    def get_tenter_2(self):
        """Used to get tenter 2's email."""

        return self.tenter_2

    def get_tenter_3(self):
        """Used to get tenter 3's email."""

        return self.tenter_3

    def get_tenter_4(self):
        """Used to get tenter 4's email."""

        return self.tenter_4

    def get_tenter_5(self):
        """Used to get tenter 5's email."""

        return self.tenter_5

    def get_tenter_6(self):
        """Used to get tenter 6's email."""

        return self.tenter_6

    def get_qr_code_str(self):
        """Used to get QR code of tent group."""

        return self.qr_code_str
