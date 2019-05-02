//npm modules
const express = require('express');
// create the server
const app = express();
const uuid = require('uuid/v4');
const session = require('express-session');
//const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
// add the routers for CRUD of tasks, users
require('./routes/task.routes.js')(app);
app.set('view engine', 'pug');
// Don't think the below is needed
//require('./routes/user.routes.js')(app);


// configuring the db --NOTE: MAY NEED TO JUST USE THE STRING HERE B/C OF PULLING FROM UI
const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

/* Need to change the connect to DB to when the user logs in. Also need to change it so the connection string pulls username & pwd from the login page



// this is a dummy user (array containing one user object) used for testing instead of pulling from a database below using e.g. DB.findById()
const users = [
    {id: '2f24vvg', email: 'test@test.com', password: 'password'}
]
 */

// connecting to db
function connectToDB(username, password) {
    mongoose.connect(`mongodb + srv://${username}:${password}@hyperion-kovej.mongodb.net/test?retryWrites=true`, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to database.");
    }).catch(err => {
        console.log('Could not connect to database. Exiting now...', err);
        process.exit();
    });
}




// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false })); // use body-parser middleware to parse urls
app.use(bodyParser.json()); // use body-parser middleware to parse JSON


// app.use(passport.initialize());
// app.use(passport.session());


app.get('/', (req, res) => {
    console.log('Inside the homepage callback function....');
    console.log(req.sessionID);   
    return res.redirect(`/login`);
});

// create the login GET and POST routes
app.get('/login', (req, res) => {
    console.log('Inside the GET /login callback function...');
    console.log(req.sessionID);
    res.render('login');
});

app.post('/loginSubmit', (req, res) => {
     let username = req.body.username;
     let password = req.body.password;
    console.log(`inside login post callback. username: ${username}, password: ${password}`);
    // trying to connect instead of using this method
    //task.findOne({ username: username, password: password });
    connectToDB(username, password);
});

// route that requires authentication
app.get('/authrequired', (req, res) => {
    console.log(`Inside the GET /authrequired callback`);
    console.log(`User authenticated? ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
        res.send(`you hit the authentication endpoint\n`);
    } else {
        res.redirect('/');
    }
});


app.listen(3000, () => {
    console.log('listening at localhost:3000');
});

