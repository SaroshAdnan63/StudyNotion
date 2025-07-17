import { toast } from "react-hot-toast"
import {apiConnector} from '../apiconnector'
import { courseEndPoints, endpoints } from "../apis"


const{
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
}=courseEndPoints

export const addCourseDetails=async(data,token)=>{
    let result = null
    const toastId = toast.loading("Loading...")
    try{
   const response=await apiConnector("POST",CREATE_COURSE_API,data,{
    "Content-Type": "multipart/form-data",
    Authorisation: `Bearer ${token}`,
   })
   console.log("CREATE COURSE API RESPONSE............", response)
   if (!response?.data?.success) {
    throw new Error("Could Not Add Course Details")
  }
   toast.success("Course Details Added Successfully")
   result = response?.data?.data
    }catch(error){
    toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editCourseDetails=async(data,token)=>{
    let result=null
    const toastId=toast.loading("Loading....")
    try{
  const response=await apiConnector("POST",EDIT_COURSE_API,data,{
    "Content-Type": "multipart/form-data",
    Authorisation: `Bearer ${token}`,
  })
  console.log("Edit course response.......",response);
  if (!response?.data?.success) {
  throw new Error("Could Not Update Course Details")
  }
  toast.success("Course Details updated Edited Succesfully")
  result=response?.data?.data
    }catch(error){
    toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}

export const fetchCourseCategories=async()=>{
    let result = []
    try{
 const response=await apiConnector("POST",COURSE_CATEGORIES_API)
 console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
  if(!response?.data?.success) {
    throw new Error("Could Not Fetch Course Categories")
  }
  result=response?.data?.data
  }catch(error){
  toast.error(error.message);
    }
    return result
}

// export const createSection=async(data,token)=>{

//    let result = null
//   const toastId = toast.loading("Loading...")
// try{

//    console.log("Data sent to createSection:", data);



// const response=await apiConnector("POST",CREATE_SECTION_API,data,{
//    Authorization: `Bearer ${token}`,
//   "Content-Type": "application/json"

// })
// console.log("CREATE SECTION API RESPONSE............", response)

// if(!response?.data?.success){
//   throw new Error("Could Not Create Section")
// }
// toast.success("Course Section Created")
//  result = response?.data?.updatedCourse
//  console.log("Result from createSection:", result) 
// }catch(error){
//   console.log("CREATE SUB-SECTION API ERROR............", error)
//   toast.error(error.message)
// }
// toast.dismiss(toastId)
// return result
// }


export const createSection = async(data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    // Ensure data has the correct structure with courseId
    if (!data.courseId) {
      throw new Error("Missing courseId in request data")
    }

    console.log("Data sent to createSection:", data);

    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    )
    
    console.log("CREATE SECTION API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    
    toast.success("Course Section Created")
    result = response?.data?.updatedCourse
    console.log("Result from createSection:", result) 
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message || "Failed to create section")
  }
  
  toast.dismiss(toastId)
  return result
}












export const updateSection=async(data,token)=>{
  let result = null
  const toastId = toast.loading("Loading...")
  try{ 
    const response=await apiConnector("POST", UPDATE_SECTION_API,data,{
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  }catch(error){
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSection=async(data,token)=>{
  const result=null;
  const toastId=toast.loading("Loading...");
  try{
  const response=await apiConnector("POST",DELETE_SECTION_API,data,{
    Authorization: `Bearer ${token}`,
  })
  console.log("DELETE SECTION API RESPONSE............", response)
  if (!response?.data?.success) {
    throw new Error("Could Not Delete Section")
  }
  toast.success("Course Section Deleted")
  result = response?.data?.data
  }catch(error){
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId);
  return result
}

export const deleteSubSection=async(data,token)=>{
const result=null;
const toastId=toast.loading("Loading.....");
try{
  const response=await apiConnector("POST",DELETE_SUBSECTION_API,data,{
    Authorization: `Bearer ${token}`,
  })
  console.log("DELETE SUB-SECTION API RESPONSE............", response)
  if (!response?.data?.success) {
    throw new Error("Could Not Delete Lecture")
  }
  toast.success("Lecture Deleted")
  result = response?.data?.data
}catch(error){
  console.log("DELETE SUBSECTION API ERROR............", error)
  toast.error(error.message)
}
toast.dismiss(toastId);
  return result
}