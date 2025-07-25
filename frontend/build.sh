#!/bin/bash

npm install
npm run build

sudo rm /var/www/html/index.html   # remove default page
sudo cp -r /home/tim2/hostedtools-app/frontend/build/* /var/www/html/  # copy new build files
sudo chown -R www-data:www-data /var/www/html  # ensure correct permissions