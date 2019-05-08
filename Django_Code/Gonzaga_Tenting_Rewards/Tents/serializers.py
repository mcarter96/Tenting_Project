from rest_framework import serializers
from django.db import transaction

from . import models
from Tent_Checks import models as Tent_Checks_Models

class TentSerializer(serializers.ModelSerializer):
    """A serializer for our tent objects."""

    class Meta:
        model = models.TentGroup
        fields = ('id', 'tenter_1', 'tenter_2', 'tenter_3', 'tenter_4', 'tenter_5', 'tenter_6', 'tent_pin',
                  'qr_code_str', 'game_id', 'tent_number')

        # Defines extra parameters on the certain fields

    def create(self, validated_data):
        """
        Create and return a new `TentSerializer` instance, given the validated data.
        """

        tent = models.TentGroup(
            tenter_1=validated_data['tenter_1'],
            tenter_2=validated_data['tenter_2'],
            tenter_3=validated_data['tenter_3'],
            tenter_4=validated_data['tenter_4'],
            tenter_5=validated_data['tenter_5'],
            tenter_6=validated_data['tenter_6'],
            tent_pin=validated_data['tent_pin'],
            qr_code_str=validated_data['qr_code_str'],
            game_id=validated_data['game_id'],
            tent_number=None,
        )


        tent.save()
        tent_check = Tent_Checks_Models.Tent_Check(tent_id=tent)
        tent_check.save()

        return tent
        # return TentSerializer.objects.create(**validated_data)

    @transaction.atomic
    def update(self, instance, validated_data):
        """
        Update and return an existing `TentingGroup` instance, given the validated data.
        """
        instance.id = validated_data.get('id', instance.id)
        instance.tenter_1 = validated_data.get('tenter_1', instance.tenter_1)
        instance.tenter_2 = validated_data.get('tenter_2', instance.tenter_2)
        instance.tenter_3 = validated_data.get('tenter_3', instance.tenter_3)
        instance.tenter_4 = validated_data.get('tenter_4', instance.tenter_4)
        instance.tenter_5 = validated_data.get('tenter_5', instance.tenter_5)
        instance.tenter_6 = validated_data.get('tenter_6', instance.tenter_6)
        instance.tent_pin = validated_data.get('tent_pin', instance.tent_pin)
        instance.qr_code_str = validated_data.get('qr_code_str', instance.qr_code_str)
        instance.game_id = validated_data.get('game_id', instance.game_id)
        if validated_data.get('game_id', instance.game_id) is not None and instance.tent_number is None:
            current_game_id = validated_data.get('game_id', instance.game_id)
            instance.tent_number = models.TentGroup.objects.all().filter(game_id=current_game_id).count() + 1
        instance.save()
        return instance