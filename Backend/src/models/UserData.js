const mongoose = require('mongoose');

const Schema = mongoose.Schema;

UserSchema = new Schema({
    email: String,
    password: String
});

var UserData = mongoose.model('user', UserSchema);

module.exports = UserData;