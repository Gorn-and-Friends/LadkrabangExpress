const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null},
    last_name: { type: String, default: null},
    thai_first_name: { type: String, default: null},
    thai_last_name: { type: String, default: null},
    email: { type: String, default: null },
    username: { type: String, default: null },
    password: { type: String },
    birthdate: { type: Object, default: null},
    token: { type: String },
    ticket: [],
})

module.exports = mongoose.model('user', userSchema);