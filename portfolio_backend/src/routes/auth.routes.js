const express=require('express');
const authController=require("../controllers/auth.controller");
const router=express.Router();
const {verifyAdmin}=require('../middlewares/auth.middleware');

router.post('/register',verifyAdmin,authController.register);

router.post('/login',authController.login);

router.post('/logout',verifyAdmin,authController.logout);

router.get('/verify', verifyAdmin, (req, res) => {
    res.status(200).json({ isAuthenticated: true });
});

module.exports=router;