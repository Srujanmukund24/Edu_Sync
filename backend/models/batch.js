const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    TGID: {
        type: String,
        required: true
    }
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
