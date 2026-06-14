const mongoose=require('mongoose');

const positionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:String
    }
})

const positionModel=mongoose.model("position",positionSchema);

module.exports=positionModel;