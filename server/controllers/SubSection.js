const Section=require("../models/Section");
const SubSection=require("../models/SubSection");
const {uploadImageToCloudinary}=require("../utils/imageUploader");
require('dotenv').config();
//create subSection
exports.createSubSection=async(req,res)=>{
    try{
        //fetch data from body
    const{title,timeDuration,sectionId,description,}=req.body;
       //fetch video 
    const video=req.files?.video;
    console.log(video)


  



       //validation
    if(!sectionId ||!timeDuration ||!title ||!description){
        return res.status(400).json({
            success:false,
            message:"Missing Properties of section",
        });
    }
       //upload video to cloudinary
     const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
       //create
    const subSectionDetails=await SubSection.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
       videoUrl:uploadDetails.secure_url,

    });
       //push subsection in section 
    const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
        {
       $push:{
        subSection:subSectionDetails._id,
       },
    },
    {new:true},
)
       //return res
     return res.status(200).json({
        success:true,
        message:"SubSection Created Successfully",
        updatedSection,
     });

    }catch(error){
      console.error("Error in createSubSection:", error);
     return res.status(500).json({
        success:false,
        message:"Problem in creating Subsection",
        error:message.error
     });
    }
}

//update subSection
exports.updateSubSection=async(req,res)=>{
   try{
      const{sectionId,subSectionId,title, description}=req.body;
      const subSection=await SubSection.findByIdAndDelete({subSectionId});
      if(!subSection){
         return res.status(400).json({
            success:false,
            message:"Sub Section not found",
         });
      }
      const updatedSubSection=await SubSection.findById(subSectionId).populate("subSection");
      return res.status(200).json({
         success:true,
         message:"Sub Section updated successfully",
         data:updatedSubSection,
      });
   }
   catch(error){
   return res.status(500).json({
      success:false,
      message:"Problem in updating sub section",
   });
   }

}

//delete subSection
exports.deleteSubSection=async(req,res)=>{
   try{
   const{sectionId}=req.params;
  const subSection= await SubSection.findByIdAndDelete(sectionId);
  if (!subSection) {
   return res
     .status(404)
     .json({ success: false, message: "SubSection not found" })
 }
 const updatedSection = await Section.findById(sectionId).populate(
   "subSection"
 )
   return res.status(200).json({
      success:true,
      message:"SubSection deleted successfully",
      data:updatedSection,
   });
   }catch(error){
      return res.status(500).json({
         success:false,
         message:"Problem in deleting sub section",
      });
   }
 

}