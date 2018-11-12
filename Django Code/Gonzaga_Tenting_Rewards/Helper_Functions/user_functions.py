"""
This file provides various user functions that interact with the database
to allow us to find other values based on the information that we know
"""

import sqlite3
import os

# Get the base path of the project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Get the path of the database (will change when not sqlite)
path = BASE_DIR + "/db.sqlite3"


def getUserID(email):
    """Get the user id of the passed in email"""

    # Establish a connection with the database
    connection = sqlite3.connect(path)
    crsr = connection.cursor()

    # SQL command to create a table in the database
    sql_command = "SELECT id FROM Api_userprofile WHERE email=\"" + email + "\";"
    crsr.execute(sql_command)

    # Get the response from the database
    resp = crsr.fetchall()

    # Close the connection
    connection.close()

    # Grab the first item in the response (should only be one)
    for i in resp:
        return i[0]

    # If there was no response then return None
    return None

def getUserEmail(id):
    """Retrive the user email given the user id"""

    # Establish a connection to the database
    connection = sqlite3.connect(path)
    crsr = connection.cursor()

    # Generate the command to be executed
    sql_command = "SELECT email FROM Api_userprofile WHERE id=\"" + str(id) + "\";"

    # Execute the command
    crsr.execute(sql_command)

    # Ge the response from the database
    resp = crsr.fetchall()

    # Close the connection
    connection.close()

    # Grab the first item in the response (should only be one)
    for i in resp:
        return i[0]

    # If there was no response then return None
    return None

def getIfAdmin(id):
    """Retrieve whether the passed in user id is an admin"""

    # Establish a connection to the database
    connection = sqlite3.connect(path)
    crsr = connection.cursor()

    # Generate the sql command to execute
    sql_command = "SELECT is_staff FROM Api_userprofile WHERE id=\"" + str(id) + "\";"

    # Execute the sql command
    crsr.execute(sql_command)

    # Get the response from the database
    resp = crsr.fetchall()

    # Close the connection to the database
    connection.close()

    # Grab the first response (should only be one)
    for i in resp:
        # If they are not an admin return False, otherwise return True
        if i[0] == 0:
            return False
        return True
