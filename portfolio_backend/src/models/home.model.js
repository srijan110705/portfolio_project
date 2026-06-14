const mongoose=require('mongoose');

const homePageSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    imageId:{
        type:String
    },
    email: String,
    github: String,
    mobile: String,
    linkedin: String
})

const homePageModel=mongoose.model("homePage",homePageSchema);

module.exports=homePageModel;