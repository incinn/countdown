#!/bin/bash
green="\e[0;92m"
bold="\e[1m"
reset="\e[0m"

echo -e "${green}Pulling latest changes...${reset}\n"
git pull origin main
echo -e "\n${green}Installing dependencies...${reset}\n"
npm ci
echo -e "\n${green}Building project...${reset}\n"
npx gulp build
echo -e "\n${green}Cleaning up...${reset}\n"
npx gulp clean
echo -e "\n${green}${bold}Done.${reset}"
