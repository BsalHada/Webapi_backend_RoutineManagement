const mongoose = require('mongoose');
const rooms = mongoose.Schema({
   
        room:String
});

module.exports =mongoose.model('room', rooms);