module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // create new note
    app.post('/task', notes.create);

    // retrieve all notes
    app.get('/task', notes.findAll);

    //retrieve a single note with noteId
    app.get('/task/:taskId', notes.findOne);

    //update a note with noteId
    app.put('/task/:taskId', notes.update);

    //delete note with nodeId
    app.delete('/task/:taskId', notes.delete);
}