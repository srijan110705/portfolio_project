const jwt=require("jsonwebtoken");
const {uploadAchievement,uploadHomePage,deleteImageFromCloud,uploadCertificates}=require("../services/storage.service");
const acheivementModel=require("../models/achievements.model");
const homePageModel=require('../models/home.model');
const educationModel=require('../models/education.model');
const projectModel=require("../models/project.model");
const skillModel=require("../models/skill.model");
const positionModel=require('../models/position.model');

async function addAchievement(req,res){
    const {heading,description}=req.body;
    const file=req.file;

    const image=await uploadAchievement(file.buffer.toString('base64'));

    const achievement=await acheivementModel.create({
        heading,
        description,
        image:image.url
    })

    res.status(201).json({
        message:"Achievement added successfully",
        achievement:{
            id:achievement._id,
            heading,
            description,
            image:image.url
        }
    })

}

async function removeAchievement(req,res){
    const id=req.params.id;

    await acheivementModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message:"Achievement deleted successfully"
    })
}

async function getAllAchievements(req,res){
    const achievements=await acheivementModel.find();

    res.status(200).json({
        message:"Fetched achievements successfully",
        achievements:achievements
    })
}

async function editHomePage(req, res) {
    // Add the new fields to destructuring
    const { title, content, email, github, mobile, linkedin } = req.body;
    const file = req.file;

    const oldHome = await homePageModel.findOne({});

    if (oldHome && oldHome.imageId && file) {
        await deleteImageFromCloud(oldHome.imageId);
    }

    // Only upload if a new file is provided
    let result = oldHome ? { url: oldHome.image, fileId: oldHome.imageId } : { url: "", fileId: "" };
    if (file) {
        result = await uploadHomePage(file.buffer.toString('base64'));
    }

    const home = await homePageModel.findOneAndReplace(
        {},
        {
            title,
            content,
            image: result.url,
            imageId: result.fileId,
            email,    // Add these
            github,
            mobile,
            linkedin
        },
        { returnDocument: 'after', upsert: true }
    );

    return res.status(200).json({
        message: "HomePage updated successfully",
        home
    });
}

async function getHomePage(req,res){
    const homePage=await homePageModel.find();

    res.status(200).json({
        message:"Home page fetched",
        homePage:homePage
    })
}

async function addEducation(req,res){
    const {institute,degree,duration,score,content}=req.body;

    const uploadResults=await uploadCertificates(req.files);

    const resultUrls=uploadResults.map(result=>result.url);

    const education=await educationModel.create({
        institute,
        degree,
        duration,
        score,
        content,
        proofs:resultUrls
    });

    return res.status(200).json({
        message:"Education added successfully",
        education
    });
}

async function getEducationDetails(req,res){
    const studies=await educationModel.find();

    res.status(200).json({
        message:"Fetched achievements successfully",
        studies:studies
    })
}

async function removeEducation(req,res){
    const id=req.params.id;

    await educationModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message:"Education deleted successfully"
    })
}

async function addProject(req,res){
    const {title,description,link}=req.body;
    
    const project=await projectModel.create({
        title,
        description,
        link
    })

    return res.status(200).json({
        message:"Project added successfully",
        project:project
    })
}

async function getAllProjects(req,res){
    const projects=await projectModel.find();

    res.status(200).json({
        message:"Project fetched",
        projects:projects
    })
}

async function removeProject(req,res){
    const id=req.params.id;

    await projectModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message:"Project deleted successfully"
    })
}

async function addSkill(req,res){
    const {title,description}=req.body;

    const skill=await skillModel.create({
        title,
        description
    })

    return res.status(200).json({
        message:"Skill added successfully",
        skill
    })
}

async function getAllSkills(req,res){
    const skills=await skillModel.find();

    res.status(200).json({
        message:"Project fetched",
        skills:skills
    })
}

async function removeSkill(req,res){
    const id=req.params.id;

    await skillModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message:"Skill deleted successfully"
    })
}

async function addPosition(req,res){
    const {title,description,duration}=req.body;

    const position=await positionModel.create({
        title,
        description,
        duration
    })

    return res.status(200).json({
        message:"Position added successfully",
        position
    })
}

async function getAllPositions(req,res){
    const positions=await positionModel.find();

    res.status(200).json({
        message:"Positions fetched",
        positions:positions
    })
}

async function removePosition(req,res){
    const id=req.params.id;

    await positionModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message:"Position deleted successfully"
    })
}

module.exports={addAchievement,
    removeAchievement,
    getAllAchievements,
    editHomePage,
    getHomePage,
    addEducation,
    getEducationDetails,
    removeEducation,
    addProject,
    getAllProjects,
    removeProject,
    addSkill,
    getAllSkills,
    removeSkill,
    addPosition,
    getAllPositions,
    removePosition
};