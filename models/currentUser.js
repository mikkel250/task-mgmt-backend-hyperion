var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var currentUserSchema = new Schema({
    username: String,
    tag: String
});

module.exports = mongoose.model('currentUserModel', currentUserSchema);