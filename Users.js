const mongoose = require('mongoose');

const users = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', users);