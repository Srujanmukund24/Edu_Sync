const mongoose = require('mongoose');

const DivisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    CCID: {
        type: String,
        required: true
    },
    batches: {
        type: [String],
        required: true
    }
});

const Division = mongoose.model('Division', DivisionSchema);

module.exports = Division;
