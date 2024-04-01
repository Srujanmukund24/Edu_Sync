const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    regid: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    attendance: {
        type: String,
        default:0
        // required: true
    },
    ccapproved: {
        type: Boolean,
        default:false
        // required: true
    },
    password: {
        type:String,
        required:true
    },
    user_type: {
        type: String,
        default: 'student', 
        enum: ['admin', 'student', 'teacher']
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
