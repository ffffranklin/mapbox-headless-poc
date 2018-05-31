#!/usr/bin/env bash

echo "Provisioning: started..."
echo "Current user is '$USER'"
echo "Current shell is '$0'"

echo "Provisioning: Installing git and dependencies"
sudo apt-get update -yq
# deps necessary for chrome
# inspiredby https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322921352
sudo apt-get install -yq git gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

echo "Provisioning: Installing node via nvm"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
source $HOME/.nvm/nvm.sh
nvm install v9.11.1
nvm alias default v9.11.1
nvm use v9.11.1

echo "Provisioning: Initializing POC"
cd /vagrant
npm i

echo "Provisioning: Complete."
