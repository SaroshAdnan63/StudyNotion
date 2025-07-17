const{instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const crypto=require('crypto');
const mailSender=require=require("../utils/mailSender");
const {courseEnrollment}=require("../mail/templates/courseEnrollmentEmail");

//capture the payment and initiate order
exports.capturePayment=async(req,res)=>{
    try{
    //getId
  const{userId}=req.user.id;
  const{course_id}=req.body;

  
  //validation of courseId
 if(!course_id){
    return res.status(400).json({
        success:false,
        message:"please provide valid course id ",
    });
 }

  //validation of Course
  let course;
  try{
  course=await Course.findById(course_id);
  if(!course){
    return res.status(400).json({
        success:false,
        message:"Course Details not found",
    });
  }
   //user already paid 
  const uid=new mongoose.Schema.Types.ObjectId(uid); 
  if(course.studentsEnrolled.includes(uid)){
    return res.status(200).json({
        success:false,
        message:"User Already Paid",
    });
  }
  }catch(error){
  return res.status(500).json({
    success:false,
    message:error.message,
  });
  }

  //order create
  const amount=course.price;
  const currency= "INR";

  const options={
    amount:amount*100,
    currency,
    receipt:Math.random(Date.now()).toString(),
    notes:{
     courseId:course_id,
      userId,
    }
  };

  try{
   //initaite payment
   const paymentResponse=await instance.orders.create(options) ;
   console.log(paymentResponse);
    //return res
    return res.status(200).json({
      success:true,
      courseName:course.courseName,
      courseDescription:course.courseDescription,
      thumbnail:course.thumbnail,
      orderId:paymentResponse.id,
      currency:paymentResponse.currency,
      amount:paymentResponse.amount,
      message:"Payment Done successfully",
    });
  }catch(error){
   return res.status(401).json({
    success:false,
    message:"Could not initiate Orders",
   });
  }
    }catch(error){
    return res.status(500).json({
    success:false,
    message:error.message,
    });
    }
}

//verify signature
exports.verifySignature=async(req,res)=>{
  const webhookSecret="123456";
  const signature=req.headers["x-razorpay-signature"];

  const shasum=crypto.createHmac("sha-256",webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest=shasum.digest("hex");
  if(signature===digest){
    console.log("Payment is authorised");

    const {courseId,userId}=req.body.payload.payment.entity.notes;
    try{
    //find the course and enroll in course
    const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},
      {
        $push:{
          studentsEnrolled:userId
        }
      },
      {new:true},
    );
    if(!enrolledCourse){
      return res.status(400).json({
        success:false,
        message:"course not found",
      });
    }
    //find the student and update course list
    const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{
      $push:{
        courses:courseId,
      }
    },
    {new:true},


  );

  console.log(enrolledStudent);
  //mail send to student for successfull enrollement
  const emailResponse=await mailSender(
    enrolledStudent.email,
    "Congratulation from  Codehelp ",
    "Congratulation You are onboarded into Codehelp Course",
    );
    return res.status(200).json({
      success:false,
      message:" Enrollement Mail Send Succesfully"
    });
    }
  catch(error){
   console.log(error);
   return res.status(500).json({
    success:false,
    message:error.message,
   });
  }
  }
  else{
    return res.status(400).json({
     success:false,
     message:"Invalid Request",
    });
  }
}
//sendPaymnet success email
exports.sendPaymentSuccessEmail=async(req,res)=>{ 
  const{orderId,paymentId,amount}=req.body;
  const userId=req.user.id;
  if(!orderId||!paymentId ||!amount ||!userId){
      return res.status(403).json({
          success:false,
          message:"Please Provide All the details",
  })
  }
  try{
  const enrolledStudents=await User.findById(userId);
  await mailSender(
      enrolledStudents.email,
      "Payment Received",
      paymentSuccessEmail(
          `${enrolledStudents.firstName} ${enrolledStudents.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
  
  )
  }
  catch(error){
  console.log(error);
  return res.status(400).json({
      success:false,
      message:"Something went wrong in sending payment mail",
  })
  }
  }