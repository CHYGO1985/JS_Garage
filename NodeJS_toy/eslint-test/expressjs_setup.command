#! /bin/bash

# This is a script to install necessary dependancies 
# to run the .command file
# 1) go to the folder, run chmod u+x ~/Desktop/xxx.command to get permission
# 2) then double click the .command file to run

# **** to add the project directory where the dependancy should be installed
# add cd ...

cd /Users/jingjiejiang/Documents/My_Project/JS_Garage/NodeJS_toy/eslint-test

# init directory
npm i -y
sleep 5s

# express
npm i --save express
sleep 5s

# babel
npm install --save-dev @babel/cli @babel/core @babel/preset-env

# eslint
npm i --save-dev eslint
sleep 5s

# nodemon
npm i --save-dev nodemon
sleep 5ss

# winston
npm i --save winston
sleep 5s

# morgan
npm i --save morgan
sleep 5s

# mocha
npm i --save mocha
sleep 50s

# chai
npm i --save chai
sleep 50s

# sinon
npm i --save sinon
sleep 5s

# init express-generator
npx express-generator
sleep 53

# create .gitignore file
touch .gitignore
echo "/node_modules" >> .gitignore
echo "package-lock.json" >> .gitignore

# init eslint
npx eslint --init
sleep 5s

# start the app
npm start