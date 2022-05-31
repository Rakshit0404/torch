const mongoose=require("mongoose");
const userModel = require('./userModel');

const classesSchema = new mongoose.Schema({
    teacher:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    standard:String,
    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }]
})

module.exports = mongoose.model('classes', classesSchema);