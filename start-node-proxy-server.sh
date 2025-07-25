#!/bin/bash

# Start the TypeScript Node.js proxy server
echo "Starting TypeScript Node.js proxy server..."
cd /home/tim2/typscript_node_proxy  
npm start
npm run build
npm test
