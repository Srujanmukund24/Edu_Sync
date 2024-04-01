const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        default: 'admin', 
        enum: ['admin', 'student', 'teacher']
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
