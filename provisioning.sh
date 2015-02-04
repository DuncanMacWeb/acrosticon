#!/bin/bash

set -e

sudo apt-get install -y git vim build-essential

cd ~

# for 0.10.25... but it might change underfoot, so best avoided
# sudo apt-get install -y nodejs

# for compiling latest from source
#wget http://nodejs.org/dist/v0.10.36/node-v0.10.36.tar.gz
#tar -zxf node-v0.10.36.tar.gz
#cd node-v0.10.36
#./configure
#make
#sudo make install

#IO.js, an alternative fork
#wget https://iojs.org/dist/v1.1.0/iojs-v1.1.0-linux-x86.tar.gz
#tar -zxf iojs-v1.1.0-linux-x86.tar.gz
#cd iojs-v1.1.0-linux-ia32
#sudo cp -r bin include lib share /usr/local/

# for downloading latest binary (0.10.36)
wget http://nodejs.org/dist/v0.10.36/node-v0.10.36-linux-x86.tar.gz
tar -zxf node-v0.10.36-linux-x86.tar.gz
cd node-v0.10.36-linux-x86
sudo cp -r bin include lib share /usr/local/


# update npm if needed
sudo npm install npm -g
sudo npm install -g jasmine
sudo npm install -g gulp
sudo npm install -g 6to5
# jadum is a jade fork that plays well with taunus
sudo npm install -g jadum

# install all npm modules the app requires
su - vagrant -c "cd /vagrant; npm install"

# if you get an npm error 404 while trying to execute 'node-gyp rebuild',
# this IO.js bug might be relevant:
# https://github.com/iojs/io.js/issues/433
# This repo is supposed to be a fix:
# https://github.com/rvagg/pangyp
#sudo npm install -g pangyp
#cd /usr/local/lib/node_modules/
#sudo rm node-gyp
#sudo ln -s pangyp node-gyp
#npm install --save --verbose taunus
# .. now comes up with compile errors :-(
# -> IO.js and taunus don't work together for now

