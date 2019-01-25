from rest_framework import serializers

from django.core.validators import RegexValidator
from Helper_Functions import remove_data, user_functions

from . import models

class TentCheckSerializer(serializers.ModelSerializer):
    """Serializes a response for adding tents to games"""

    class Meta:
        model = models.Tent_Check
        fields = ('id','tent_id', 'waiver_check', 'setup_check', 'tent_check_1', 'tent_check_2', 'tent_check_3',
                  'tent_check_4', 'final_check')

    def create(self, validated_data):
        tent_check = models.Tent_Check()
        tent_check.save()

        return tent_check
