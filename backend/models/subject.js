const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
   subjectName: {
      type: String,
      required: true
   },
   year: {
      type: String,
      required: true
   }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
