const mongoose = require('mongoose');

const DivisionSchema = new mongoose.Schema({
    division: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    CCID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher',
        required: true
    },
    batches: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Batch',
    }]
});

const Division = mongoose.model('Division', DivisionSchema);

module.exports = Division;
