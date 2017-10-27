#!/usr/bin/env bash

# Start nltk-bridge
python ./nltk-bridge/NltkRPC.py &
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start nltk-bridge: $status"
  exit $status
fi

# Start tracker app
cd ./tracking/
node tracker.js