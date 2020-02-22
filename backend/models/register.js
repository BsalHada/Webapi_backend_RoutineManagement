const mongoose = require('mongoose');
const register = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:String,
    fullname:String,
    image:{
        type:String,
        default:""
    },
    token:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:0
    }
});

module.exports = mongoose.model('user', register);