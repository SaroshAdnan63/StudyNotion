const Category=require("../models/Category");

//create Category
exports.createCategory=async(req,res)=>{
    try{
//fetch data
const {name, description}=req.body;
//validation
if(!name ||!description){
    return res.status(400).json({
        success:false,
        message:"All feilds are required",
    });
}
//create entry in database
const CategoryDetails=await Category.create({
    name:name,
    description:description,
});
console.log(CategoryDetails);
//return res
return res.status(200).json({
    success:true,
    message:"Tag Created Succesfully",
});
}


catch(error){
    return res.status(500).json({
    success:false,
    message:error.message,
    })
    }
}
//show All Category
exports.showAllCategory=async(req,res)=>{
   try{
 const allCategory=await Category.find({},{name:true,description:true});
    return res.status(200).json({
        success:true,
        message:"All tags return successfully",
        data:allCategory,
    });
 
   }
catch(error){
    return res.status(400).json({
    succcess:false,
    message:error.message,
    });
}
}
//categoryPageDetails
exports.categoryPageDetails=async(req,res)=>{
    try{
  //get category id
  const {categoryId}=req.body
  //fetch courses according to categoryid
  const selectedCategory=await Category.findById(categoryId).populate("courses")
                                          .exec();
  //validation
  if(!selectedCategory){
    return res.status(401).json({
        success:false,
        message:" Selected Category Course not available",
    });
  }
  //get courses for diffrent category
  const differentCategories=await Category.find({
    _id:{$ne:categoryId},
  }).populate("courses")
  .exec();

  //get top selling courses
   return res.status(200).json({
    success:true,
    message:"Category Page details fetch successfully",
    data:{
        differentCategories,
        selectedCategory,
    }
   })

    }catch(error){
        return res.status(400).json({
        succcess:false,
        message:error.message,
         });
    }
}
