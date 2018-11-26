"""
This file allows us to remove data from the database based on the task
the admin wants to perform
"""

import sqlite3
import os
import datetime

# Get the default directory name for the project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Go to the database in the directory
path = BASE_DIR + "/db.sqlite3"

# TODO: Finish function once table has been added
def removeAllTents():
    """Remove all data from the tent table"""

    connection = sqlite3.connect(path)
    crsr = connection.cursor()

    # SQL command to create a table in the database
    # sql_command = "SELECT id FROM Api_userprofile WHERE email=\"" + email + "\";"
    # crsr.execute(sql_command)

# TODO: Becomes a little more compicated becuase does not remove from tent table either, need to figure this out
def removeExtraneousUsers():
    """Remove all users who had a graduation date over a year ago"""

    # Connect to the database
    connection = sqlite3.connect(path)
    crsr = connection.cursor()

    # Get the current year and go back one
    year = datetime.datetime.now().year - 1

    # Delete all user who graduated two years ago (before last year)
    # sql_command = "DELETE FROM Api_userprofile WHERE graduation_year < " + str(year) + ";"

    # Execute the command
    # crsr.execute(sql_command)

    # Commit and close the changes
    connection.commit()
    connection.close()
