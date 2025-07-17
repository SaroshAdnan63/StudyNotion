const express=require("express");
const router=express.Router();
const{capturePayment,verifySignature,sendPaymentSuccessEmail}=require("../controllers/Payments");
const { auth,isAdmin,isStudent } = require("../middlewares/auth");
router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifySignature",auth,isStudent,verifySignature);
router.post("/sendPaymentSuccessEmail",auth,isAdmin,sendPaymentSuccessEmail);

module.exports=router;