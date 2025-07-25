#!/bin/bash

# Start the TypeScript Node.js proxy server
echo "Starting TypeScript Node.js proxy server..."
cd /home/tim2/hostedtools-app/backend  # Correct backend directory
npm install  # Ensure dependencies are installed
npm run build  # Build the backend
npm start  # Start the backend server
npm test  # Run backend tests
