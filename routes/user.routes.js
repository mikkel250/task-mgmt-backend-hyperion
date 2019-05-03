module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    
    // retrieve all users
    app.get('/user', users.findAll);

    //retrieve a single user with userId
    app.get('/user/:userId', users.findOne);

    // get currently logged in user
    //NOTE: NEED TO ADD/CHANGE THE CONTROLLER TO PULL BY USERNAME OR SOMETHING
    app.get('/user/current', users.findOne);

    //update a user with userId
    app.put('/user/:userId', users.update);

    // app.post('/loginSubmit', connectToDB(username, password));

}