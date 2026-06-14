const mongoose=require('mongoose');

const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    link:{
        type:String
    }
})

const projectModel=mongoose.model("project",projectSchema);

module.exports=projectModel;