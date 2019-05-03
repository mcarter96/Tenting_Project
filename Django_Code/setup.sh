# This file is meant to be run once after initial setup.
# DONT RUN THIS FILE TWICE

# Go to home folder
cd ~;

# Install the virtual environment
pip3 install virtualenv;

# Setup a virtual environment
python3 -m virtualenv env;

# Activate the virtual environment
source env/bin/activate;

# Go to the source code
cd /vagrant/Gonzaga_Tenting_Rewards;

# Install all required packages
pip install -r requirements.txt;

