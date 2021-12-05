#!/bin/bash
echo "Pulling latest changes..."
git pull origin main
echo "Installing dependencies..."
npm ci
echo "Building project..."
npx gulp build
echo "Cleaning up..."
npx gulp clean
echo "Done."
