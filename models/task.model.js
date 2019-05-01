const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: String,
    content: String,
    creator: ,
    owner: 
}, {
        timestamps: true
    });

module.exports = mongoose.model('Task', TaskSchema);