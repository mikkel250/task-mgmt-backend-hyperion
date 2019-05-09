const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
    title: String,
    content: String,
    creator: String,
    owner: String,
    due_date: Date,
    done: {
        type: Boolean
    },
},
    {
        timestamps: true,
    },
    {
        collection: 'tasks'
    }
);

module.exports = mongoose.model('Task', TaskSchema);