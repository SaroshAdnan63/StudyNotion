const express=require("express");
const router=express.Router();
const { auth } = require("../middlewares/auth");
const{updateProfile,deleteAccount,getAllUserDetails,getEnrolledCourses}=require("../controllers/Profile");
router.put("/updateProfile",auth,updateProfile);
router.delete("/deleteAccount",auth,deleteAccount);
router.get("/getAllUserDetails",auth,getAllUserDetails);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
module.exports=router;