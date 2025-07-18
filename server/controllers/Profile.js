const Profile=require("../models/Profile");
const User=require("../models/User");

exports.updateProfile=async(req,res)=>{
 try{
    //fetch data
 const{gender,dateOfBirth="",about="",contactNumber}=req.body;
 //fetch userid
 const id=req.user.id;
 //validation
 if(!gender||!id||!contactNumber){
    return res.status(401).json({
        success:false,
        message:"All feilds are required",
    });
 }
 //find profile
 const userDetails=await User.findById(id);
 const profileId=userDetails.additionalDetails;

 const profileDetails=await Profile.findById(profileId);
 //update Profile
 profileDetails.dateOfBirth=dateOfBirth,
 profileDetails.gender=gender,
 profileDetails.about=about,
 profileDetails.contactNumber=contactNumber
 await profileDetails.save();
 return res.status(200).json({
    success:true,
    message:"Profile Updated Successfully",
    profileDetails,
 });
 }
 catch(error){
    return res.status(500).json({
    success:false,
    message:"problem in Updating Profile ",
    error:error.message,
 });
}
}

exports.deleteAccount=async(req,res)=>{
    try {
    //getid
    const id=req.user.id;

    //validation
    const userDetails=await User.findById({_id:id});
    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"User not found",
        });
    }
    //delete profile
    await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

    //delete user
    await User.findByIdAndDelete({_id:id});
    //return response
    return res.status(200).json({
        success:true,
        message:"Profile Deleted Successfully",
    })
    }catch(error){
     return res.status(500).json({
        success:false,
        message:"Problem in deleting Account",
        error:error.message,
     });
    }
}

exports.getAllUserDetails=async(req,res)=>{
   try{
 const id=req.user.id;
 const userDetails=await User.findById(id).populate("additionalDetails").exec();
 return res.status(200).json({
    success:true,
    message:"User data fetched successfully",
    data:userDetails,
    
 });
   }
   catch(error){
   return res.status(500).json({
    succcess:false,
    message:"Failed in getting user details",
    error:error.message,
   })
   }
}

exports.getEnrolledCourses = async (req, res) => {
   try {
     const userId = req.user.id
     let userDetails = await User.findOne({
       _id: userId,
     })
       .populate({
         path: "courses",
         populate: {
           path: "courseContent",
           populate: {
             path: "subSection",
           },
         },
       })
       .exec()
     userDetails = userDetails.toObject()
     var SubsectionLength = 0
     for (var i = 0; i < userDetails.courses.length; i++) {
       let totalDurationInSeconds = 0
       SubsectionLength = 0
       for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
         totalDurationInSeconds += userDetails.courses[i].courseContent[
           j
         ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
         userDetails.courses[i].totalDuration = convertSecondsToDuration(
           totalDurationInSeconds
         )
         SubsectionLength +=
           userDetails.courses[i].courseContent[j].subSection.length
       }
       let courseProgressCount = await CourseProgress.findOne({
         courseID: userDetails.courses[i]._id,
         userId: userId,
       })
       courseProgressCount = courseProgressCount?.completedVideos.length
       if (SubsectionLength === 0) {
         userDetails.courses[i].progressPercentage = 100
       } else {
         // To make it up to 2 decimal point
         const multiplier = Math.pow(10, 2)
         userDetails.courses[i].progressPercentage =
           Math.round(
             (courseProgressCount / SubsectionLength) * 100 * multiplier
           ) / multiplier
       }
     }
 
     if (!userDetails) {
       return res.status(400).json({
         success: false,
         message: `Could not find user with id: ${userDetails}`,
       })
     }
     return res.status(200).json({
       success: true,
       data: userDetails.courses,
     })
   } catch (error) {
     return res.status(500).json({
       success: false,
       message: error.message,
     })
   }
}
 