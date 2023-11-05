const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String, // 'admin' or 'user'
    dob:String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
