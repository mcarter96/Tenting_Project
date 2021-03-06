"""
This file allows us to remove data from the database based on the task
the admin wants to perform
"""

import datetime
from User_Profile import models as Api_models
from Tents import models as tent_models
from Game import models as game_models

def removeAllTents():
    """Remove all data from the tent table"""

    tents = tent_models.TentGroup.objects.all()
    for i in tents:
        i.delete()

def removeExtraneousUsers():
    """Remove all users who had a graduation date over a year ago"""

    # Get the current year and go back one
    year = datetime.datetime.now().year - 5
    users = Api_models.UserProfile.objects.all().filter(graduation_year__lt=year)

    # Go through each user and delete if their grad year was before the current year -1
    for i in users:
        if i.graduation_year <= year:
            i.delete()


def removeAllGames():
    """Delete all the games that were created"""

    games = game_models.Game.objects.all()
    for i in games:
        i.delete()
