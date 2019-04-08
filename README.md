# Gonzaga-Tenting-Rewards

## To Start The Server On tenting-rewards.gonzaga.edu 
1. ssh into the server (tenting-rewards.gonzaga.edu) (Use putty on Windows)
2. Navigate to the following directory: `/home/source_code/Gonzaga-Tenting-Rewards`
3. Run the runserver.sh script: `sudo ./runserver.sh`

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
* .../api/forgot-password
    - Simple POST request with a key of 'email' and the values of the user whoever wants to reset their password. [Ex: {'email': 'test@zagmail.gonzaga.edu}]
* .../api/tent-checks?params
    - Parameters for tent-checks are as follows (for multiple parameters seperate w/ &):
    ```
    missing_check=waiver_check,tent_check_1
    ```
    > The values can be any sort of tent check field seperated by commas. No limit on number of values that can be passed in. Will return all tents that have not completed the passed in checks
    ```
    done_tents=True
    ```
    > This returns all tents that have every field marked as true for their tent check object. If set to anything but true the field will not filter any responses and return all tents like normal
    ```
    completed_check=waiver_check,tent_check_1
    ```
    > This field is like the missing check field in that you can input as many tents as you want and it will filter the tents into which ones have completed the appropriate checks that the user is requesting.
* .../api/remove-tents
    - Simple POST request will delete all tents in the database
* .../api/remove-users
    - Simple POST request will delete all users in the database
* .../api/remove-games
    - Simple POST request will delete all games in the database
* ../api/confirm-email?id=[id]&confirmation_id=[confirmation_id]
    - Sending a get request to the confirm email url with the appropriate fields will allow a user to confirm their email
    
## To setup Apache for Backend Server to expose permanently
1. Run the following commands
    ```
    sudo apt-get update
    sudo apt-get install python3-pip apache2 libapache2-mod-wsgi-py3
    ```
2. Run the following command, then add the following text:

    `sudo nano /etc/apache2/sites-available/000-default.conf`
    ```
    <VirtualHost *:80>
        ServerName tenting-rewards.gonzaga.edu
        DocumentRoot /var/www/html
        ServerAdmin tenting.rewards@gmail.com
        Redirect permanent / https://tenting-rewards.gonzaga.edu/
    </VirtualHost>

    <VirtualHost _default_:443>
         # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerName tenting-rewards.gonzaga.edu
        ServerAdmin tenting.rewards@gmail.com
        DocumentRoot /var/www/html
        Alias /static/ /home/source_code/Gonzaga-Tenting-Rewards/Django_Code/Gonzaga_Tenting_Rewards/static_media/

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf

         <Directory /home/source_code/Gonzaga-Tenting-Rewards/Django_Code/Gonzaga_Tenting_Rewards/static_media>
                Require all granted
        </Directory>

        <Directory /home/source_code/Gonzaga-Tenting-Rewards/Django_Code/Gonzaga_Tenting_Rewards/Gonzaga_Tenting_Rewards>
                <Files wsgi.py>
                        Require all granted
                </Files>
        </Directory>

        SSLEngine on
        SSLCertificateFile /etc/letsencrypt/live/tenting-rewards.gonzaga.edu/cert.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/tenting-rewards.gonzaga.edu/privkey.pem
        SSLCertificateChainFile /etc/letsencrypt/live/tenting-rewards.gonzaga.edu/fullchain.pem

        WSGIDaemonProcess Gonzaga_Tenting_Rewards python-path=/home/source_code/Gonzaga-Tenting-Rewards/Django_Code/Gonzaga_Tenting_Rewards python-home=/home/source_code/virtualenv
        WSGIProcessGroup Gonzaga_Tenting_Rewards
        WSGIScriptAlias / /home/source_code/Gonzaga-Tenting-Rewards/Django_Code/Gonzaga_Tenting_Rewards/Gonzaga_Tenting_Rewards/wsgi.py
        WSGIPassAuthorization On

    </VirtualHost>
    ```

3. Restart the apache service

    `sudo service apache2 restart`

## For setting up MariaDB
1. Run the following commands

    ```
    sudo apt-get udate
    sudo apt-get install python3-dev mariadb-server libmariadbclient-dev libssl-dev
    ```
2. To first access the database simply login with:
    ```
    sudo mysql -u root
    ```

3. Create a user in the database by typing the following MySQL command
    ```
    GRANT ALL PRIVILEGES ON *.* TO 'tenting-rewards'@'localhost' IDENTIFIED BY 'tentingRewards';
    ```
4. Create a database
    ```
    CREATE DATABASE tenting_data CHARACTER SET UTF8;
    ```
5. Flush the privileges so changes will take effect
    ```
    FLUSH PRIVILEGES;
    ```
6. Exit MySQL
    ```
    exit
    ```
7. Make sure the settings.py file in our django project contains the following database information
    ```
    ...
    if DEBUG:
    ...
    else:
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': 'tenting_data',
                'USER': 'tenting-rewards',
                'PASSWORD': 'tentingRewards',
                'HOST': 'localhost',
                'PORT': '',
            }
        }
    ...
    ```
8. Migrate the tables into the MySQL database by using the makemigrations and migrate commands above (should only need to use migrate if database instance is correct)
