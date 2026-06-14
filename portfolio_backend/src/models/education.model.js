const mongoose=require('mongoose');

const educationSchema=new mongoose.Schema({
    institute:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    content:{
        type:String
    },
    proofs:[{
        type:String
    }]
})

const educationModel=mongoose.model("education",educationSchema);

module.exports=educationModel;