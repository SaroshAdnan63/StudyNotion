import { toast } from "react-hot-toast"
import { setLoading,setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { logout } from "./authApi"
import { profileEndpoints } from "../apis"

const { GET_USER_DETAILS_API, 
       GET_USER_ENROLLED_COURSES_API,
       GET_INSTRUCTOR_DATA_API } = profileEndpoints


export async function  getUserEnrolledCourses(token,navigate){
    return async (dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try{
  const response=await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,null,{
    Authorisation: `Bearer ${token}`,
  })
  console.log("GET_USER_DETAILS API RESPONSE............", response);
  if(!response.data.success){
    throw new Error(response.data.message);
  }
  const userImage = response.data.data.image
  ? response.data.data.image
  :`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
   dispatch(setUser({ ...response.data.data, image: userImage }))
  
    }catch(error){
  
    console.log("GET_USER_DETAILS API ERROR............", error)
    toast.error("Could Not Get User Details") 
    }   
    toast.dismiss(toastId)
    dispatch(setLoading(false))
    }
}