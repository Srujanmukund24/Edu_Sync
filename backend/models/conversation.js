const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    chats: [{
        sender: {
            type: String, // Assuming sender can be either 'teacher' or 'student', you can adjust as needed
            required: true
        },
        receiver: {
            type: String, // Assuming receiver can be either 'teacher' or 'student', you can adjust as needed
            required: true
        },
        message: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = Conversation;
