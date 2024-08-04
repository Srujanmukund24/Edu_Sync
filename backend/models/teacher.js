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
        divID: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Division',
            // required: true
        },
        subject: {
            type: String,
            // required: true
        }
    }], 
    batch: [{
        batchID: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Batch',
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
    },
    user_type: {
        type: String,
        default: 'teacher', 
        enum: ['admin', 'student', 'teacher']
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
