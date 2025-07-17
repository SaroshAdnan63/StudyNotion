const express=require("express");
const router=express.Router();

const{createCourse,showAllCourses,editCourse, deleteCourse,getCourseDetails}=require("../controllers/Course");
const{createCategory,showAllCategory,categoryPageDetails}=require("../controllers/category");
const{createSection,updateSection,deleteSection}=require("../controllers/Section");
const{createSubSection,updateSubSection,deleteSubSection}=require("../controllers/SubSection");
const{createRating,getAverageRating,getAllRating}=require("../controllers/RatingAndReview");
const{auth,isStudent,isAdmin,isInstructor}=require("../middlewares/auth");

//course routes
router.post("/createCourse",auth,isInstructor,createCourse);
router.delete("/deleteCourse",deleteCourse);
router.get("/showAllCourses",showAllCourses);
router.get("/getCourseDetails",getCourseDetails);
router.post("/editCourse",auth,isInstructor,editCourse)

//course category routes
router.post("/createCategory",auth,isAdmin,createCategory);
router.post("/categoryPageDetails",categoryPageDetails);
router.get("/showAllCategory",showAllCategory);

//course section routes
router.post("/createSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);

//course subsection routes
router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

//ratingAndReview routes
router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",auth,isStudent,getAverageRating);
router.get("/getAllRating",auth,isStudent,getAllRating);

module.exports=router;