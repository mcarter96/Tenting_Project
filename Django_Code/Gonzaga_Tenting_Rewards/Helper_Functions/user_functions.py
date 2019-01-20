"""
This file provides various user functions that interact with the database
to allow us to find other values based on the information that we know
"""

import sqlite3
import os
from Api import models

# Get the base path of the project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Get the path of the database (will change when not sqlite)
path = BASE_DIR + "/db.sqlite3"


def getUserID(email):
    """Get the user id of the passed in email (this is the unique identifier)"""

    try:
        user = models.UserProfile.objects.get(email=email)
        return user.id
    except:
        return None

def getUserEmail(id):
    """Retrive the user email given the user id"""
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
    """Retrive the tent id the user belongs to if they are apart of one"""

    # Establish a connection to the database
    connection = sqlite3.connect(path)
    crsr = connection.cursor()

    # Generate the sql command to execute
    sql_command = "SELECT id FROM Api_tentgroup WHERE " \
                  "tenter_1_id=\"" + str(userId) + "\"" \
                    "OR tenter_2_id= \"" + str(userId) + "\" " \
                    "OR tenter_3_id= \"" + str(userId) + "\" " \
                    "OR tenter_4_id= \"" + str(userId) + "\" " \
                    "OR tenter_5_id= \"" + str(userId) + "\" " \
                    "OR tenter_6_id= \"" + str(userId) + "\";"

    # Execute the sql command
    crsr.execute(sql_command)

    # Get the response from the database
    resp = crsr.fetchall()

    # Close the connection to the database
    connection.close()


    # Grab the first response (should only be one)
    for i in resp:
        # If they are not an admin return False, otherwise return True
        return i[0]
