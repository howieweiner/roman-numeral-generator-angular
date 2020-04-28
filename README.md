Roman Numeral Generator
=======================

#Overview
This project is a demonstration of a Javascript class that converts integers to Roman numerals and Roman numerals to 
integers.

The conversion class is wrapped as an Angular.js service. An Angular.js directive has also been developed to call this
service.

#App dependencies
This project uses Grunt to build the release and bower to install dependencies. To build the app dependencies, 
please do the following:

1. Ensure that node package manager and bower are installed
1. Install node packages - (sudo) npm install
1. Install bower packages - bower install

#Running the app
To run the app using the local webserver, run:

    grunt
    
This will launch a local web server on port 8000. The app can be accessed at http://localhost:8000/src

#Building the app
To build a distribution for the app, run:

    grunt dist
    
This will build a version of the app with concatenated, minified and timestamped assets. The resulting build will be 
copied into the /dist/ folder. These files should be placed on the webserver

The distribution will only be built if all unit and end-to-end tests pass
    


