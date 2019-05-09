module.exports = (app) => {
    const task = require('../controllers/task.controller.js');

    // Render page to allow users to create new task -- MAYBE BEST TO LEAVE THIS FILE AS CRUD AND RENDER IN APP.JS
   // app.get('/task/new', render('new'));

    // create new task
    app.post('/task', task.create);

    // retrieve all task
    app.get('/task', task.findAll);

    // retrieve completed tasks
    app.get('/task/completed', task.findAllCompleted);

    // retrieve incomplete tasks
    app.get('/task/incomplete', task.findAllIncomplete);

    // find by due date
    app.post('/task/due', task.findAllByDate);

    // find by overdue
    app.get('task/overdue', task.findAllOverdue);

    //retrieve a single task with taskId
    app.get('/task/:taskId', task.findOne);

    //update a task with taskId
    app.put('/task/:taskId', task.update);

    //delete task with nodeId
    app.delete('/task/:taskId', task.delete);

    app.get('/filter', task.filter);

}