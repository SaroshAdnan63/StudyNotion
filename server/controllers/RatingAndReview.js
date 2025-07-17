const Course = require("../models/Course");
const RatingAndReview=require("../models/RatingAndReview");
const User=require("../models/User");

//createRating
exports.createRating=async(req,res)=>{
    try{
  //get user id
  const userId=req.user.id;
  //fetch data from req.body
  const {rating, review, courseId}=req.body;
  //check if user is enrolled or not
  const courseDetails=await Course.findOne(
      {_id:courseId,
      studentsEnrolled:{$elemMatch:{$eq:userId}}
  });
  if(!courseDetails){
      return res.status(404).json({
          success:false,
          message:"Student is not  enrolled in course",
      });
  }
  //check if user is already review course or not
  const alreadyReviewed=await RatingAndReview.findOne({
      user:userId,
      course:courseId,
  });
  if(alreadyReviewed){
      return res.status(403).json({
          success:false,
          message:"You Have already reviewed the course",
      });
  }
  //create rating and review
  const ratingReview=await RatingAndReview.create( {
      rating,
      review,
      course:courseId,
      user:userId,
  });
  //update rating  in course
  const updatedCourseDetails= await Course.findByIdAndUpdate({_id:courseId},
      {
      $push:{
        ratingAndReviews:ratingReview._id,
      },
  },
  {new:true}, 
);
console.log(updatedCourseDetails);
return res.status(200).json({
    success:true,
    message:"Rating created successfully",
    ratingReview,
})

   
}
    catch(error){
    return res.status(500).json({
    success:false,
    message:error.message,
    });
    }
   
}
//getaverage rating
exports.getAverageRating=async(req,res)=>{
    try{
    //fetch id
   const courseId=req.body.courseTd;
   //calculate average rating
   const result=await RatingAndReview.aggregate([
    {
        $match:{
           course:new mongoose.Types.ObjectId(courseId),
        },
    },
    {
    $group:{
        _id:null,
        averageRating:{$avg:"$rating"},
    }
    }

   ])
   //return rating
   if(result.length>0){
    return res.status(200).json({
        success:true,
        averageRating:result[0].averageRating,
    })
   }
   //if no rating available
   return res.status(200).json({
    success:false,
    message:"Average rating is 0,not ratings available",
    averageRating:0,
   });

    }
    catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,
    })
    }
}

//getAllrating
exports.getAllRating=async(req,res)=>{
    try{
   const allReview=await RatingAndReview.find({})
                                .sort({rating:"desc"})
                                .populate({
                                path:"User",
                                select:"firstName,lastName,email,image",
                                })
                                .populate({
                                path:"course",
                                select:"courseName",
                                })
                                .exec();
    return res.status(200).json({
        success:true,
        message:"All review fetch successfully",
        data:allReview,
    })
    }catch(error){
        return res.status(500).json({
        success:false,
        message:error.message,
        })
    }
}