#!/bin/bash

set -e

sudo apt-get install -y git vim build-essential

cd ~

# for 0.10.25... but it might change underfoot, so best avoided
# sudo apt-get install -y nodejs

# for downloading latest binary (0.10.35)
#wget http://nodejs.org/dist/v0.10.35/node-v0.10.35-linux-x86.tar.gz
#tar -zxf node-v0.10.35-linux-x86.tar.gz
#cd node-v0.10.35-linux-x86
#sudo cp -r bin include lib share /usr/local/

# for compiling latest from source
#wget http://nodejs.org/dist/v0.10.35/node-v0.10.35.tar.gz
#tar -zxf node-v0.10.35.tar.gz
#cd node-v0.10.35
#./configure
#make
#sudo make install

#IO.js, an alternative fork
wget https://iojs.org/dist/v1.0.2/iojs-v1.0.2-linux-x86.tar.gz
tar -zxf iojs-v1.0.2-linux-x86.tar.gz
cd iojs-v1.0.2-linux-ia32
sudo cp -r bin include lib share /usr/local/


# update npm if needed
sudo npm install npm -g
sudo npm install -g jasmine

# install all npm modules the app requires
su - vagrant -c "cd /vagrant; npm install"

