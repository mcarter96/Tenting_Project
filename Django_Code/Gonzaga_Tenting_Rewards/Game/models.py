from django.db import models

# Create your models here.
class Game(models.Model):
    """Create a game for admins to assign tents for"""

    game_start = models.DateTimeField()
    tenting_start = models.DateTimeField()
    game_name = models.CharField(max_length=20)

    def create_game(self, game_start, tenting_start, game_name):
        game = self.model(game_start=game_start, tenting_start=tenting_start, game_name=game_name)
        return game

    def get_game_start(self):
        return self.game_start

    def get_tenting_start(self):
        return self.tenting_start

    def get_game_name(self):
        return self.game_name