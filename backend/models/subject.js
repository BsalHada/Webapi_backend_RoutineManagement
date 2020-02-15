const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subject = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    subject:String
});

module.exports = mongoose.model('subject', subject);

