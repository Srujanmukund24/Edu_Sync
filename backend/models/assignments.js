const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher',
        required: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Subject',
        required: true
    },
    problemstatement: {
        type: String,
        required: true
    },
    uploaded_doc_link: {
        type: String,
        required: true
    },
    isComplete:{
        type:Boolean,
        default:false
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
