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
    mob: {
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
        required: true
    },
    ccapproved: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
