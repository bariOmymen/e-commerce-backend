

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type: String, required : true},
    password : {type: String, required : true},
    isAdmin : {type:Boolean, required : true, default : false},
    email : {type : String, required : true, unique : true}
}, {Timestamps : true});


const User = mongoose.model('User', userSchema);
module.exports = User