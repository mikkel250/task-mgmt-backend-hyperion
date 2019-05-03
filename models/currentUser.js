var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var currentUserSchema = new Schema({
    username: String
});

module.exports = mongoose.model('currentUserModel', currentUserSchema);