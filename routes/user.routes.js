module.exports = (app) => {
    const users = require('../controllers/task.controller.js');
    
    // retrieve all users
    app.get('/task', users.findAll);

    //retrieve a single user with userId
    app.get('/task/:taskId', users.findOne);

    //update a user with userId
    app.put('/task/:taskId', users.update);
}