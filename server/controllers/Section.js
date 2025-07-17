const Section=require("../models/Section");
const Course=require("../models/Course");

//create section
exports.createSection=async(req,res)=>{
  try{
 const{sectionName,courseId}=req.body;

 if(!sectionName ||!courseId){
    return res.status(400).json({
        success:false,
        message:"Missing properties",
    });
 }
 //createSection
 const newSection=await Section.create({sectionName});

   const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();



   return res.status(200).json({
    success:true,
    message:"Section Created Successfully",
    data:updatedCourse,
   })


}
catch(error){
    return res.status(500).json({
        success:false,
        message:"problem in creating section ",
        error:error.message,
       })

    }
}

//update section
exports.updateSection=async(req,res)=>{
    try{
  const{sectionName,sectionId,courseId}=req.body;
  if(!sectionName ||!sectionId){
    return res.status(403).json({
      success:false,
      message:"Missing Properties",

    });
  }

  //update data
  const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

  const course=await Course.findById(courseId)
  .populate({
    path:"courseContent",
    populate:{
      path:"subSection",
    },
  })
  .exec();
  //return res
  return res.status(200).json({
    success:true,
    message:"Section Updated Succesfully",
    data:course,
  });
}
    catch(error){
      return res.status(500).json({
        success:false,
        message:"problem in Updating section ",
        error:error.message,
       })
    }
}
//delete section
exports.deleteSection=async(req ,res)=>{
  try{
const {sectionId}=req.params
await Section.findByIdAndDelete(sectionId);

return res.status(200).json({
  success:true,
  message:"Section Deleted successfully",
})

  }catch(error){
    return res.status(500).json({
      success:false,
      message:"problem in Updating section ",
      error:error.message,
     })
  }
}