const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const batch = mongoose.Schema({
    batch:String
});

module.exports = mongoose.model('batch', batch);