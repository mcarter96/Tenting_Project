# Gonzaga-Tenting-Rewards

## To Start The Server On tenting-rewards@gonzaga.edu 
1. ssh into the server (tenting-rewards.gonzaga.edu) (Use putty on Windows)
2. Navigate to the following directory: `/home/source_code/Gonzaga-Tenting-Rewards`
3. Run the runserver.sh script: `./runserver.sh`

 > This will open up a virtual environment and install any necessary components into the virtual environment required for the server to run
4. Type in your password when prompted
5. The server should now be running and you can interact with it via mobile app or web url

## To start server on local machine
1. Navigate to where manage.py is stored (should be in the directory `.../Gonzaga-Tenting-Rewards/Django_Code/Gonzaga_Tenting_Rewards`)
2. Make sure you have all libraries installed (pip install -r requirements.txt)
    > We used python3 for development so you need to make sure you are working with it. May need to type pip3 instead of pip
3. Run the server on local machine with the following command: `python manage.py runserver`

## To update database with model changes
```
python manage.py makemigrations
python manage.py migrate
```

## To run the test suite for backend code
```
python manage.py test
```
If you want to view the coverage for each individual file, run the following
```
coverage html
```

## Urls for the Api
* .../api/profile
* .../api/login
* .../api/tent
* .../api/games
* .../api/forgot_password
* .../api/tent-checks
* .../api/remove-tents
* .../api/remove-users
* .../api/remove-games
* ../api/confirm-email