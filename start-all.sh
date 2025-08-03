#!/bin/bash
# Start backend
cd "$(dirname "$0")/backend"
npm install
nohup npm start > backend.log 2>&1 &

# Start frontend
cd ../frontend
npm install
nohup npm start > frontend.log 2>&1 &

echo "Backend and frontend started. Logs: backend/backend.log, frontend/frontend.log"
