const adminModel=require("../models/admin.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

async function register(req,res){
    const {email,password}=req.body;

    const isAccountAlreadyExists=await adminModel.findOne({email})

    if(isAccountAlreadyExists){
        return res.status(409).json({
            message:"Account with these credentials already exist"
        })
    }

    const hash=await bcrypt.hash(password,10);

    const admin=await adminModel.create({
        email,
        password:hash
    })

    const token=jwt.sign({
        id:admin._id
    },process.env.JWT_SECRET)

    res.cookie('token', token, {
  httpOnly: true,
  secure: true,           // Required for HTTPS
  sameSite: 'none',       // Crucial for cross-origin cookies
  maxAge: 3600000 
});

    res.status(201).json({
        message:"New admin registered successfully",
        admin:{
            id:admin._id,
            email:admin.email
        }
    })
}

async function login(req,res){
    const {email,password}=req.body;

    const admin=await adminModel.findOne({email})

    if(!admin){
        return res.status(401).json({
            message:"Invalid|User does not exist"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,admin.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Incorrect Password"
        })
    }

    const token=jwt.sign({
        id:admin._id
    },process.env.JWT_SECRET);

    res.cookie("token", token, {
    httpOnly: true,
    secure: true, // MUST BE TRUE IN PRODUCTION (Requires HTTPS)
    sameSite: "none", // MUST BE 'NONE' FOR CROSS-DOMAIN COOKIES
    maxAge: 3600000
});

    res.status(200).json({
        message:"Admin logged in successfully",
        admin:{
            id:admin.id,
            email:admin.email,
        }
    })

}

async function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true, 
        sameSite: "none"
    });
    
    res.status(200).json({
        message: "Logout successful"
    });
}

module.exports={login,logout,register};
