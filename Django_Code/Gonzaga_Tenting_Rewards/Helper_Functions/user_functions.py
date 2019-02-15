"""
This file provides various user functions that interact with the database
to allow us to find other values based on the information that we know
"""

from Api import models
from django.db.models import Q

def getUserID(email):
    """Get the user id of the passed in email (this is the unique identifier)"""

    try:
        user = models.UserProfile.objects.get(email=email)
        return user.id
    except:
        return None

def getUserEmail(id):
    """Retrieve the user email given the user id"""
    try:
        user = models.UserProfile.objects.get(id=id)
        return user.email
    except:
        return None

def getIfAdmin(id):
    """Retrieve whether the passed in user id is an admin"""
    try:
        user = models.UserProfile.objects.get(id=id)
        return user.is_staff
    except:
        return None


def getTentID(userId):
    """Retrieve the tent id the user belongs to if they are apart of one"""

    # Attempt to get a tent the user is apart of, if they are not apart of one, an exception is thrown so return None
    try:
        tents = models.TentGroup.objects.get(Q(tenter_1=userId) | Q(tenter_2=userId) | Q(tenter_3=userId) |
                                             Q(tenter_4=userId) | Q(tenter_5=userId) | Q(tenter_6=userId))
        return tents.id
    except:
        return None

def getTenterInformation(tentId):
    try:
        tent = models.TentGroup.objects.get(id=tentId)
        users = {
            'tenter_1': tent.get_tenter_1(),
            'tenter_2': tent.get_tenter_2(),
            'tenter_3': tent.get_tenter_3(),
            'tenter_4': tent.get_tenter_4(),
            'tenter_5': tent.get_tenter_5(),
            'tenter_6': tent.get_tenter_6(),
        }
        return users
    except:
        return None
