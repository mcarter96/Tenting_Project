from rest_framework import serializers


from . import models


class GameSerializer(serializers.ModelSerializer):
    """Serializes a response for adding tents to games"""

    class Meta:
        model = models.Game
        fields = ('id','game_start', 'tenting_start', 'game_name')

    def create(self, validated_data):
        game = models.Game(game_name=validated_data['game_name'],
                           game_start=validated_data['game_start'],
                           tenting_start=validated_data['tenting_start'])
        game.save()

        return game