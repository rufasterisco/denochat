#!/bin/bash

# Determine the operating system
OS=$(uname)

# Function to get Wi-Fi IP on Linux
get_linux_wifi_ip() {
  # Attempt to find the Wi-Fi interface that starts with "wlan" or "wlp"
  for iface in $(ip -o -4 addr show | awk '{print $2}'); do
    if [[ $iface == wlan* ]] || [[ $iface == wlp* ]]; then
      ip -o -4 addr show $iface | awk '{print $4}' | cut -d/ -f1
      return 0
    fi
  done
}

# Function to get Wi-Fi IP on macOS
get_mac_wifi_ip() {
  # The default Wi-Fi interface is usually "en0" or "en1"
  ipconfig getifaddr en0 || ipconfig getifaddr en1
}

# Find out the Wi-Fi IP based on the operating system
if [ "$OS" == "Linux" ]; then
  IP=$(get_linux_wifi_ip)
elif [ "$OS" == "Darwin" ]; then
  IP=$(get_mac_wifi_ip)
fi

# Display the IP
if [ -n "$IP" ]; then
  echo "Your Wi-Fi IP address is: $IP"
  export DENOCHAT_IP=$IP
else
  echo "Could not find the Wi-Fi IP address."
fi

export GIT_REVISION=$(git rev-parse HEAD)
docker-compose up --build
