const express=require("express");
const router=express.Router();

const{sendOTP,signup,login,changePassword}=require("../controllers/Auth");
const{ResetPasswordToken,resetPassword}=require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

router.post("/login",login);
router.post("/signup",signup);
router.post("/sendOTP",sendOTP);
router.post("/changepassword", auth ,changePassword);
router.post("/reset-password-token",ResetPasswordToken);
router.post("/reset-password",resetPassword);




module.exports=router;