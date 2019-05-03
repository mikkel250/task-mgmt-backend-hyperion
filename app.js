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

//NOTE: CAN PUT ALL THE BELOW ROUTING IN THE USER.ROUTES.JS FILE!

// create the login GET and POST routes
app.get('/login', (req, res) => {
    console.log('Inside the GET /login callback function...');
    console.log(req.sessionID);
    res.render('login');
});

//https://stackoverflow.com/questions/41992107/iterate-mongodb-collection-to-pug
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
       // let taskCollection = test.collection('task');
        let taskList = app.get('/task');
        res.render('index', { name: username, taskList: taskList });
    }).catch(err => {
        console.log('Could not connect to database. Exiting now...', err);
        process.exit();
    });
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

// console.log(module.username);
// //console.log(module.app.username);
// console.log(module.exports);
// console.log(module.id);
console.log(username);