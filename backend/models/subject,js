const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    std_id: {
        type: String,
        required: true
    },
    subname: {
        type: String,
        required: true
    },
    attendance: {
        type: String,
        required: true
    },
    marks: [{
        test_type: {
            type: String,
            required: true
        },
        marks: {
            type: String,
            required: true
        }
    }],
    sub_ticket_approval: {
        type: String,
        required: true
    }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
