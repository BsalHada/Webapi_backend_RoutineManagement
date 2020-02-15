const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const routine = mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required:true
      },
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
        required:true
      },
      batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "batch",
        required:true
      },
      date:Date
});

module.exports = mongoose.model('routine', routine);