//send otp
const User=require("../models/User");
const OTP=require("../models/Otp");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile = require("../models/Profile");
const jwt=require("jsonwebtoken");
const mailSender=require("../utils/mailSender")
const {passwordUpdated}=require("../mail/templates/passwordUpdate")
require("dotenv").config();

exports.sendOTP = async (req, res) => {
    try {
      const { email } = req.body
  
      // Check if user is already present
      // Find user with provided email
      const checkUserPresent = await User.findOne({ email })
      // to be used in case of signup
  
      // If user found with provided email
      if (checkUserPresent) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is Already Registered`,
        })
      }
  
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
      const result = await OTP.findOne({ otp: otp })
      console.log("Result is Generate OTP Func")
      console.log("OTP", otp)
      console.log("Result", result)
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        })
      }
      const otpPayload = { email, otp }
      const otpBody = await OTP.create(otpPayload)
      console.log("OTP Body", otpBody)
      res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, error: error.message })
    }
}


exports.signup=async(req,res)=>{
    try{
        //fetch data from req
        const{firstName,lastName,password,email,confirmPassword,contactNumber,accountType,otp}=req.body;
        if(!firstName ||! lastName ||!password ||!email ||!confirmPassword ||!otp){
            return res.status(401).json({
                success:false,
                message:"All feilds are required",
            })
        }
        //match password
        if(password !==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm password must be same Please try again"
            });
        }
        //check user is  already existed or not
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User Already existed",
            });
        }
        //find most recent otp in db
        const  recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        //validate otp
        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP not found",
            });
        }else if(otp !==recentOtp[0].otp){
            return res.status(403).json({
                success:false,
                message:"Invalid OTP",
            })
        }
    const hashedPassword=await bcrypt.hash(password,10);
    //create entry in database

    const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    })
    const user=await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        contactNumber,
        accountType,
        additionalDetails:profileDetails._id,
        image:""

    });

    return res.status(200).json({
        success:true,
        message:"User is registered Successfully",
        user,
    });

    }catch(error){
    console.error("Signup Error:", error);
    return res.status(403).json({
        success:false,
        error:error.message,
        message:"User Can not be registered Please Try again",
    });
    }
 
}

exports.login=async(req,res)=>{
    try{
    //get data 
 const{email,password}=req.body;
 // validation
 if(!email||!password){
    return res.status(401).json({
        success:false,
        message:"All feilds are required please enter all details",
    })
 }
 //check user exits or not
 const user=await User.findOne({email});
 if(!user){
    return res.status(401).json({
        success:false,
        message:" User is not registered Please signup first",
    })
 }

 if(await bcrypt.compare(password,user.password)){
    const payload={
        email:user.email,
        id:user._id,
        accountType:user.accountType,
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"24h",
    });
    user.token=token;
    user.password=undefined;

    //generate cookie
    const options={
        expires: new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true,
    }
    res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        message:"User logged in Succesfully",
    })
 }
 else{
    //password not match
    return res.status(401).json({
        success:false,
        message:"Password not match",
    });
 }
}
catch(error){
    return res.status(500).json({
    success:false,
    message:"Login Failure please try again",
    })
    }
}

exports.changePassword=async(req,res)=>{
    try{
        const userDetails=await User.findById(req.user.id);

        const{oldPassword,newPassword,confirmPassword}=req.body;
        const ispasswordMatch=await bcrypt.compare(
            oldPassword,
            userDetails.password
        )
        if(!ispasswordMatch){
            return res.status(401).json({
                success:false,
                message:"Password not match",
            });
        }
//update password in database
const encryptedPassword=await bcrypt.hash(password,10);
const updatePassword=await User.findByIdAndUpdate(req.user.id,
    {
        password:encryptedPassword
    },
    {new:true},
)
//send notification mail

try {
    const emailResponse = await mailSender(
        updatePassword.email,
      "Password for your account has been updated",
      passwordUpdated(
        updatePassword.email,
        `Password updated successfully for ${updatePassword.firstName} ${updatePassword.lastName}`
      )
    )
    console.log("Email sent successfully:", emailResponse.response)
  } catch (error) {
    // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while sending email:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while sending email",
      error: error.message,
    })
  }

  // Return success response
  return res.status(200).json({ 
    success: true, 
    message: "Password updated successfully" ,
})
}catch(error){
        console.error("Error occurred while updating password:", error)
         return res.status(500).json({
          success: false,
          message: "Error occurred while updating password",
          error: error.message,
        })
    }
}