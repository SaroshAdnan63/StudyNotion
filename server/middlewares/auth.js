const User=require("../models/User");
const jwt=require("jsonwebtoken");
require('dotenv').config();

//auth

exports.auth=async(req,res,next)=>{
   try{
  //extract token
  const token = req.cookies.token || 
              req.body.token || 
              req.header("Authorization")?.replace("Bearer ", "");

              
   if(!token){
    return res.status(401).json({
        success:false,
        message:"Token is missing",
    });
   }
   //verify token
   try{
   const decode= jwt.verify(token,process.env.JWT_SECRET);
   req.user=decode;
    console.log("Token is valid, decoded payload:", decode);
   }catch(error){
    return res.status(401).json({
        success:false,
        message:"Token is invalid",
    });
   }
   next();
   }catch(error){
    return res.status(401).json({
    success:false,
    message:"Something went wrong while validating the token",
    });
   }
}
//isStudent
exports.isStudent=async(req,res,next)=>{
   try{
   if(req.user.accountType!="Student"){
    return res.status(401).json({
        success:false,
        message:"This is for Student only"
    });
   }
   next();
   }catch(error){
return res.status(500).json({
    success:false,
    message:"User role can not be verified",
});
}
}
//isAdmin
exports.isAdmin=async(req,res,next)=>{
    try{
        console.log("Printing account type",req.user.accountType)
    if(req.user.accountType!="Admin"){
     return res.status(401).json({
         success:false,
         message:"This is for Admin only"
     });
    }
    next();
    }catch(error){
 return res.status(500).json({
     success:false,
     message:"User role can not be verified",
 });
 }
 }

//isInstructor
exports.isInstructor=async(req,res,next)=>{
    try{
    if(req.user.accountType!="Instructor"){
     return res.status(401).json({
         success:false,
         message:"This is for Instructor only"
     });
    }
    next();
    }catch(error){
 return res.status(500).json({
     success:false,
     message:"User role can not be verified",
 });
 }
 }