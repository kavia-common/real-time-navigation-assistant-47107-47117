#!/bin/bash
cd /home/kavia/workspace/code-generation/real-time-navigation-assistant-47107-47117/navigation_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

