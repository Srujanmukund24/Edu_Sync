const mongoose = require('mongoose');

const mentorshipGroupSchema = new mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher',
        required: true
    },
    std_ids: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student',
    }],
    type: {
        type: String,
        required: true
    },
    group_id:{
        type:String,
        required:true
    }
});

const MentorshipGroup = mongoose.model('MentorshipGroup', mentorshipGroupSchema);

module.exports = MentorshipGroup;

