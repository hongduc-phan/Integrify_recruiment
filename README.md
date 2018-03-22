This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
When you run the program in the first time, while it verifies on `localStorage` whether it has data ( participants)  or not.
if not, it will generate automatically predefined 20 participants.   

## You can visit the live site with this [link](https://hongduc-phan.github.io/Integrify_recruiment/index.html)

## Development

Make sure you install node_module when first clone the project then go to the project.
Recommended to use `yarn` over `npm`;
 
 ``npm install``
 
 or with yarn
 
 ``yarn install``
 
To run the project in development follow these step run each terminal with

#### Terminal 1 Watch SCSS compile to CSS

``npm run watch-css``

or with yarn

``yarn run watch-css``

#### Terminal 2 Build the project and run in local host

``npm run start``

or with yarn

``yarn run start``

## Production

Build the project by running the command 

``npm run build``

or with yarn

``yarn run build``

We got the build folder in the project root. Upload the files in build folder to your server (Heroku, AWS...)
