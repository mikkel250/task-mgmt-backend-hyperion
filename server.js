//npm modules
const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
require('./routes/routes.js')(app);


// configuring the db
const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

/* Need to change the connect to DB to when the user logs in. Also need to change it so the connection string pulls username & pwd from the login page
// connecting to db
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database.");
}).catch(err => {
    console.log('Could not connect to database. Exiting now...', err);
    process.exit();
});


// this is a dummy user (array containing one user object) used for testing instead of pulling from a database below using e.g. DB.findById()
const users = [
    {id: '2f24vvg', email: 'test@test.com', password: 'password'}
]
 */

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' },  // passport uses a username field for the local strategy and this is an alias to use email instead
    (email, password, done) => {
        axios.get(`http://localhost:5000/users?email=${email}`)
            .then(res => {
                const user = res.data[0];
                if (!user) {
                    return done(null, false, { message: 'Invalid credentials\n' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Invalid password.' });
                }
                return done(null, user);
            })
            .catch(error => done(error));
        console.log(`Inside the local strategy callback...`)
        // here is where you would make the call to the database
        // to find the user based on their username and password
        // for now we're going to pretend we found it and it was user[0] (above, axios is used)
    }
));

// tell passport how to serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {    
    axios.get(`http://localhost:5000/users/${id}`)
        .then(res => done(null, res.data))
    .catch(error => done(error, false))
});

// create the server
const app = express();

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false })); // use body-parser middleware to parse urls
app.use(bodyParser.json()); // use body-parser middleware to parse JSON
app.use(session({
    genid: (req) => {
        console.log("Inside the session middleware genid function...");
        console.log(`Request object sessionID from client: ${req.sessionID}`);
        return uuid() //use UUIDs for session IDs
    },
    store: new FileStore(),  // use the session-file-store to save session info
    secret: 'keyboard cat', // change this to a randomly generated string pulled from an environmental variable for production/live server
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    console.log('Inside the homepage callback function....');
    console.log(req.sessionID);
    res.render('index');
});

// create the login GET and POST routes
app.get('/login', (req, res) => {
    console.log('Inside the GET /login callback function...');
    console.log(req.sessionID);
    res.send('You got the login page!\n');
});

app.post('/login', (req, res, next) => {
    console.log("Inside the POST /login callback function");
    passport.authenticate('local', (err, user, info) => {
        console.log(`Inside the passport.authenticate() callback.`);
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user: ${JSON.stringify(req.user)}`);
        if (info) { return res.send(info.message) }
        if (err) { return next(err) }
        if (!user) { return res.redirect(`/login`); }
        req.login(user, (err) => {
            console.log(`Inside the req.login() callback`);
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user: ${JSON.stringify(req.user)}`);
            if (err) { return next(err) }
            return res.redirect(`/authrequired`);
        });
    })(req, res, next);
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

