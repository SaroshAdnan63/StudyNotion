const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");

const OtpSchema=new mongoose.Schema({
 email:{
    type:String,
    required:true,

 },
 otp:{
    type:String,
    required:true,
 },
 createdAt:{
    type:Date,
    default:Date.now(),
    expires:300,
 },
});

//send Verification mail
async function sendVerificationMail(email,otp){
    try{
 const mailResponse =await mailSender(email,"Verification Email From StudyNotion",otp);
  console.log("Email send Succesfully :",mailResponse);
 
    }catch(error){
    console.log("Problem in sending Verification mail");
    throw error;
    }
}

OtpSchema.pre("save",async function(next){
   try{
    await sendVerificationMail(this.email,this.otp);
    next();
   }catch(error){
      console.log("Error sending verification mail:", error);
      next(error);
   }
})

module.exports=mongoose.model("OTP",OtpSchema);