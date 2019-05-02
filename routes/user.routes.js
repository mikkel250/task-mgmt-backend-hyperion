module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    
    // retrieve all users
    app.get('/user', users.findAll);

    //retrieve a single user with userId
    app.get('/user/:userId', users.findOne);

    //update a user with userId
    app.put('/user/:userId', users.update);

    // app.post('/loginSubmit', connectToDB(username, password));

}