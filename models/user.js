const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },
    image: {
        type: String
    }
});

var User = mongoose.model('users', UserSchema);

module.exports = User;