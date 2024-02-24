const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true
    },
    student_id: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    problemstatement: {
        type: String,
        required: true
    },
    uploaded_doc_link: {
        type: String,
        required: true
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
