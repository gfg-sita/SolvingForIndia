#!/bin/bash
apt-get update
apt-get install -y nodejs npm
apt-get install -y git
git clone https://github.com/gfg-sita/SolvingForIndia.git
cd [REPO_NAME]
npm install
node src/app.js
