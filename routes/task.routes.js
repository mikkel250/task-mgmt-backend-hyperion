module.exports = (app) => {
    const tasks = require('../controllers/task.controller.js');

    // Render page to allow users to create new task -- MAYBE BEST TO LEAVE THIS FILE AS CRUD AND RENDER IN APP.JS
   // app.get('/task/new', render('new'));

    // create new task
    app.post('/task', tasks.create);

    // retrieve all tasks
    app.get('/task', tasks.findAll);

    //retrieve a single task with taskId
    app.get('/task/:taskId', tasks.findOne);

    //update a task with taskId
    app.put('/task/:taskId', tasks.update);

    //delete task with nodeId
    app.delete('/task/:taskId', tasks.delete);

    

    // app.post('/loginSubmit', connectToDB(username, password));
}