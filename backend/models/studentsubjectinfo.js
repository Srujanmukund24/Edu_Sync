const mongoose = require('mongoose');

const studentSubjectInfoSchema = new mongoose.Schema({
    std_id: {
        type: mongoose.Schema.Types.ObjectId, // Assuming std_id is referencing the Student model
        ref: 'Student', // Name of the referenced model
        required: true
    },
    teacher_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher',
        required: true
    },
    subname: {
        type: String,
        required: true
    },
    attendance: {
        type: String,
        // required: true
    },
    marks: [{
        test_type: {
            type: String,
            // required: true
        },
        marks: {
            type: String,
            // required: true
        }
    }],
    sub_ticket_approval: {
        type: Boolean,
        default:false
    }
});

const StudentSubjectInfo = mongoose.model('studnetSubjectInfoSchema', studentSubjectInfoSchema);

module.exports = StudentSubjectInfo;
