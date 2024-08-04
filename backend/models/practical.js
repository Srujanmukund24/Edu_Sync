const mongoose = require('mongoose');

const practicalSchema = new mongoose.Schema({
   practicalName:{
    type:String,
    required:true
   },
   year:{
    type:String,
    required:true
   }
});

const Practical = mongoose.model('Practical', practicalSchema);

module.exports = Practical;
