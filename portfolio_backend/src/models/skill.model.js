const mongoose=require('mongoose');

const skillSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:[{
        type:String,
    }]
})

const skillModel=mongoose.model("skills",skillSchema);

module.exports=skillModel;