# This is a shell to run backend on our development server

# Go the the users home directory
cd ~

# Activate a virutal environment
source env/bin/activate > /dev/null

# Check to see if the virtual environment was installed
if [ $? -eq 0 ]; then
    echo "Activated Virtual Environtment 'env'"
    echo;
else
    # If there was no virtual environment, create one 
    python3 -m virtualenv env --python=python3
    source env/bin/activate --python=python3
    
fi
# Go to the source code and make sure the requirements are installed
cd /home/source_code/Gonzaga-Tenting-Rewards/Django_Code/Gonzaga_Tenting_Rewards
pip3 install -r requirements.txt

# If the requirements werented installed, display a warning to the user
if [ $1 -eq 0 ]; then
    echo "Components successfully installed"
    echo;
else
    # Display warning
    echo "Error installing components. May not behave as expected"
    echo;
fi

# Go to the source code to run the server
cd /home/source_code/Gonzaga-Tenting-Rewards/Django_Code/Gonzaga_Tenting_Rewards

# Run the server as an administrator so you can see it on port 80
sudo python3 manage.py runserver 0.0.0.0:80