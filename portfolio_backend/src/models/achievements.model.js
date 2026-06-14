const mongoose=require("mongoose");

const achievementsSchema=new mongoose.Schema({
    heading:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})

const achievementModel=mongoose.model("achievement",achievementsSchema);

module.exports=achievementModel;