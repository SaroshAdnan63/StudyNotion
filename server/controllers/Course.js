const Course=require("../models/Course");
const User=require("../models/User");
const Category=require("../models/Category")
const{uploadImageToCloudinary}=require("../utils/imageUploader");
require('dotenv').config();

exports.createCourse=async(req,res)=>{
    try{
    //fetch data
    
  let{courseName,courseDescription,whatYouWillLearn,price,status,tags,category}=req.body;
   //get thumbnail
  // const thumbnail=req.files.thumbnailImage;
   //validation
   if(!courseName ||!courseDescription ||!whatYouWillLearn ||!price ||!tags ||!category ){
    return res.status(401).json({
        success:false,
        message:"All feilds are required",
    });
   }
   if (!status) status = "Draft";
   //check for instructor
   const userId=req.user.id;
   const instructorDetails=await User.findById(userId);
   if(!instructorDetails){
    return res.status(404).json({
        success:false,
        message:"Instructor not found",
    });

   }
   // check tag detail valid or not
   const categoryDetails=await Category.findById(category)
   if(!categoryDetails){
    return res.status(404).json({
        success:false,
        message:"Category details not found",
    });
   }

   //upload image to cloudinary
  //  const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
  //create entry for new course


 
  


  const newCourse=await Course.create({
    courseName,
    courseDescription,
    instructor:instructorDetails._id,
    whatYouWillLearn:whatYouWillLearn,
    price,
    // tags,
    category:categoryDetails._id,
    // thumbnail:thumbnailImage.secure_url,
    // status:status,
    instructions:instructions,
   
  });

    //add the new course in instructor course list

    await User.findByIdAndUpdate({_id:instructorDetails._id},
                 {
                    $push:{
                   courses:newCourse._id,
                    }
                 },
                 {new:true},
    );

    return res.status(200).json({
        success:true,
        message:"Course Created Successfully",
        data:newCourse,
    });

    }
   catch(error){
   return res.status(500).json({
    success:false,
    message:"Problem in creating course please try again later",
    error:error.message,
   });
}
}

//getAll courses
exports.showAllCourses=async(req,res)=>{
  try{
  const allCourses=await Course.find({},{courseName:true,
                                        courseDescription:true,
                                        instructor:true,
                                        ratingAndReviews:true,
                                        studentsEnrolled:true,
                                        price:true,
                                        tags:true}).populate("instructor")
                                        .exex();

     return res.status(200).json({
        success:true,
        message:"Data for all courses fetch successfully",
        data:allCourses,
     });



  }catch(error){
   return res.status(500).json({
    success:false,
    message:"Failed in showing all courses",
    error:error.message,
   })
  }
}

exports.editCourse=async(req,res)=>{
  try{
  const {courseId}=req.body;
  const updates=req.body;
  const course = await Course.findById(courseId)

  if (!course) {
    return res.status(404).json({ error: "Course not found" })
  }
  //if thumbnail image is found update it
  if(req.files){
    console.log("thumbnail update")
    const thumbnail = req.files.thumbnailImage
    const thumbnailImage=await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    course.thumbnail = thumbnailImage.secure_url
  }
  for (const key in updates) {
    if (updates.hasOwnProperty(key)) {
      if (key === "tag" || key === "instructions") {
        course[key] = JSON.parse(updates[key])
      } else {
        course[key] = updates[key]
      }
    }
  }
  await course.save()

  const updatedCourse = await Course.findOne({
    _id: courseId,
  })
  .populate({
    path: "instructor",
    populate: {
      path: "additionalDetails",
    },
  })
  .populate("category")
  .populate("ratingAndReviews")
  .populate({
    path: "courseContent",
    populate: {
      path: "subSection",
    },
  })
  .exec()
  res.json({
    success: true,
    message: "Course updated successfully",
    data: updatedCourse,
  })

  }catch(error){
 return res.status(500).json({
  success:false,
  message:"Can not update the course please try again",
  error: error.message,
 })
  }
}
//getCourseDetails
exports.getCourseDetails=async(req,res)=>{
  try{
    //fetch id
 const {courseId}=req.body;
 //fetch course
 const courseDetails=await Course.find({_id:courseId})
                   .populate(
                    {
                   path:"instructor",
                   populate:{
                   path:"additionalDetails",
                   }
                   }
                  )
                  .populate("category")
                  //.populate("ratingAndReviews")
                  .populate({
                    path:"courseContent",
                    populate:{
                      path:"subSection",
                    },
                  })
                  .exec();

    //validation
    if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`Could not find course with ${courseId}`,
      });
    }
  //return res
  return res.status(200).json({
    success:true,
    message:"Course details fetch successfully",
    data:courseDetails
  });
  }catch(error){
   return res.status(500).json({
    success:false,
    message:error.message,
   });
  }
}
//delete course
exports.deleteCourse=async(req,res)=>{
  try{
  
      const {courseId}=req.body;
      const course=await Course.findById(courseId);
      if(!course){
          return res.status(403).json({
              success:false,
              message:"course not found",
          });
      }
      //delete the course
      await Course.findByIdAndDelete(courseId);
      return res.status(200).json({
          success:true,
          message:"Course deleted successfully",
      })
  }catch(error){
  console.log(error);
  return res.status(500).json({
      success:false,
      message:"Something went wrong in deleting course",
      error:error.message,
  });
  }
}