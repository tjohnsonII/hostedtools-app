#!/bin/bash

cd /home/tim2/hostedtools-app/frontend  # Correct frontend directory

npm install --save-dev react-scripts
npm install xlsx
npm install papaparse
npm run build

if [ -f /var/www/html/index.html ]; then
    sudo rm /var/www/html/index.html   # remove default page
fi
sudo cp -r /home/tim2/hostedtools-app/frontend/build/* /var/www/html/  # copy new build files
sudo chown -R www-data:www-data /var/www/html  # ensure correct permissions