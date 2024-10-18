#!/bin/bash

# Services to start
services=("service_01" "service_02")

# Loop through services and start each one in a new terminal tab
for service in "${services[@]}"; do
    gnome-terminal --tab --title="$service" -- bash -c "cd $service && npm start; exec bash"
done
