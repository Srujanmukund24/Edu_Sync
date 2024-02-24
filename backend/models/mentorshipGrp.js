const mongoose = require('mongoose');

const mentorshipGroupSchema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true
    },
    std_ids: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const MentorshipGroup = mongoose.model('MentorshipGroup', mentorshipGroupSchema);

module.exports = MentorshipGroup;

