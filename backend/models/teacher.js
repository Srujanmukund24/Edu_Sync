const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
    division: [{
        name: {
            type: String,
            // required: true
        },
        subject: {
            type: String,
            // required: true
        }
    }],
    batch: [{
        name: {
            type: String,
            // required: true
        },
        subject: {
            type: String,
            // required: true
        }
    }],
    password: {
        type:String,
        required:true
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
