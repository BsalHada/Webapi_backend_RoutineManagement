const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teacher = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    phone:String,
    email:String,
    address:String 
});

module.exports=mongoose.model('teacher', teacher);
