const jwt=require('jsonwebtoken');
const adminModel=require("../models/admin.model");


async function verifyAdmin(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorised"
        })
    }

    let decoded;

    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET);
        const admin=await adminModel.findById(decoded.id)
        if(!admin){
            return res.status(401).json({
                message:"Invalid|User does not exist"
            })
        }
        
        req.admin=admin;

        next();
    }catch(err){
        console.log("JWT Error:", err.message); // DEBUG LOG
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports={verifyAdmin};