const express=require('express');
const editController=require("../controllers/edit.controller");
const multer=require("multer");
const {verifyAdmin}=require('../middlewares/auth.middleware');

const upload=multer({
    storage:multer.memoryStorage()
});

const router=express.Router();

router.post("/upload_achievement",verifyAdmin,upload.single('image'),editController.addAchievement);

router.delete("/delete_achievement/:id",verifyAdmin,editController.removeAchievement);

router.get("/view_achievement",editController.getAllAchievements);

router.post("/edit_homepage",verifyAdmin,upload.single('image'),editController.editHomePage);

router.get("/get_HomePage",editController.getHomePage);

router.post("/add_edu",verifyAdmin,upload.array("proofs",10),editController.addEducation);

router.get("/get_educationDetails",editController.getEducationDetails)

router.delete("/delete_education/:id", verifyAdmin, editController.removeEducation);

router.post("/add_project",verifyAdmin,editController.addProject);

router.get("/view_projects",editController.getAllProjects);

router.delete("/delete_project/:id", verifyAdmin, editController.removeProject);

router.post("/add_skill",verifyAdmin,editController.addSkill);

router.get("/get_skills",editController.getAllSkills);

router.delete("/delete_skill/:id", verifyAdmin, editController.removeSkill);

router.post("/add_position",verifyAdmin,editController.addPosition);

router.get("/get_positions",editController.getAllPositions);

router.delete("/delete_position/:id",verifyAdmin,editController.removePosition);

module.exports=router;