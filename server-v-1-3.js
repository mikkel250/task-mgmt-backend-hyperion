//npm modules
const express = require('express');
// create the server
const app = express();
const session = require('express-session');
//const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// temporarily store the username 
var username;

// add the routers for CRUD of tasks, users
require('./routes/task.routes.js')(app);
//require('./routes/user.routes.js')(app);

// set the view engine
app.set('view engine', 'pug');

mongoose.Promise = global.Promise;

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false })); // use body-parser middleware to parse urls
app.use(bodyParser.json()); // use body-parser middleware to parse JSON



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

app.post('/login', (req, res) => {
     username = req.body.username;
     let password = req.body.password;
    console.log(`inside login post callback. username: ${username}, password: ${password}`);
    //trying to connect instead of using this method
   // task.findOne({ username: username, password: password });
    
    mongoose.connect(`mongodb+srv://${username}:${password}@hyperion-kovej.mongodb.net/test?retryWrites=true`, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to database.");
        res.render('index', {name: username})
    }).catch(err => {
        console.log('Could not connect to database. Exiting now...', err);
        process.exit();
    });
   // redirect to a different page just to test
   
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

// testing functionality
app.get('/index', (req, res) => {
    res.render('index');
});



app.listen(3000, () => {
    console.log('listening at localhost:3000');
});

module.exports = app;
module.exports.username = username;