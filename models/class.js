const mongoose=require("mongoose");
const userModel = require('./userModel');

const classesSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    standard:String,
    students:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    }
})

module.exports = mongoose.model('classes', classesSchema);