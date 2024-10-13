const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, // Convert email to lowercase to ensure case insensitivity
        trim: true // Remove leading and trailing spaces
    },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);