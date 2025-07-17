const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");
exports.ResetPasswordToken=async(req,res)=>{
    try{
    //get email 
    const email=req.body.email;
    //validation 
    const user=await User.findOne({email:email});
    if(!user){
    return res.status(401).json({
        success:false,
        message:"Your email is not registered with us",
    });
    }
    //generate token
    const token=crypto.randomUUID();
    
    //update user by adding token and expiration time
    const updatedDetails=await User.findOneAndUpdate({email:email},
    {
    token,
    reserPasswordExpires:Date.now()+5*60*1000,
    },
   {new:true},
);

    //create url
    const url=`http://localhost:3000/update-password/${token}`
    //send mail
    await  mailSender(email,"Password Reset link",`Password reset link ${url}`);

    return res.json({
        success:true,
        message:" Reset mail  send succesfully please check and reset password"
    });

}
catch(error){
    console.log(error);
    return res.status(500).json({
    success:false,
    message:" Problem in reseting password",
        })
    }
}
//reset password

exports.resetPassword=async(req,res)=>{
    try{
     //fetch data
     const{password,confirmPassword,token}=req.body;
    //validation
    if(password !=confirmPassword){
        return res.status(401).json({
            success:false,
            message:"Password and confirm password not matches",
        });
    }
    //get user details from database
    const userDetails=await User.findOne({token:token});
    if(!userDetails){
        return res.json({
            success:false,
            message:"Invalid Token",
        });
    }
    if(userDetails.resetPasswordExpires<Date.now()){
         return res.json({
            success:false,
            message:"Token is expired ",
         });
    }
 const hashedPassword= await bcrypt.hash(password,10);
 //update password
 await User.findOneAndUpdate(
    {token:token},
    {password:hashedPassword },
    {new:true},
);
return res.status(200).json({
    success:true,
    message:"Password reset successfully",
});
}catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:"Something went wrong in reseting your password try again",
});
}
}
    






  