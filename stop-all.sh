#!/bin/bash
# Kill backend (port 5000) and frontend (port 3000) only

# Find and kill backend (port 5000)
BE_PID=$(lsof -ti:5000)
if [ -n "$BE_PID" ]; then
  kill $BE_PID
  echo "Stopped backend (port 5000, PID $BE_PID)"
fi

# Find and kill frontend (port 3000)
FE_PID=$(lsof -ti:3000)
if [ -n "$FE_PID" ]; then
  kill $FE_PID
  echo "Stopped frontend (port 3000, PID $FE_PID)"
fi
