import React from 'react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {ACCOUNT_TYPE} from '../../../utils/constants'
import Tab from '../../common/Tab'
import { sendOtp } from '../../../services/operations/authApi'
import { setSignupData } from "../../../slices/authSlice"

const SignupForm = () => {
   
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { firstName, lastName, email, password, confirmPassword } = formData

    const handleOnChange=(e)=>{
      setFormData((prevData)=>({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }

  //   const handleOnSubmit=async(e)=>{
  //     e.preventDefault();
  //     if (password !== confirmPassword) {
  //       toast.error("Passwords Do Not Match")
  //       return;
  //     }
  //     const signupData = {
  //       ...formData,
  //       accountType,
  //     }

  //   dispatch(setSignupData(signupData))
  //   // Send OTP to user for verification
  //   await dispatch(sendOtp(formData.email,navigate))
  // //   const success = await dispatch(sendOtp(formData.email));
  // //   console.log("OTP Dispatch Success?", success);
  // //   if (success) {
  // // navigate("/verify-email");

  //  // Reset
  //  setFormData({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // })
  // setAccountType(ACCOUNT_TYPE.STUDENT)
  
  // }
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
  
    const signupData = {
      ...formData,
      accountType,
    };
  
    dispatch(setSignupData(signupData));
    
    try {
      const response = await dispatch(sendOtp(formData.email));
      navigate("/verify-email");
      if (response.success) {
        // Navigate to the verify-email page
        // window.location.href = "/verify-email";
         navigate("/verify-email");
        console.log("Navigating to verify-email page");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

   const tabData=[
    {
      id:1,
      tabName:"Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id:2,
      tabName:"Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
   ]

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
      {/* form */}
      <form  
      onSubmit={handleOnSubmit}  className='flex w-full flex-col gap-y-4'>
      <div className='flex gap-x-4'>
      <label>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
      First Name <sup className="text-pink-200">*</sup>
      </p>
      <input
      required
      type="text"
      name="firstName"
      value={firstName}
      onChange={handleOnChange}
      placeholder=' Enter first name '
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className='w-full rounded-[0.3rem] bg-richblack-800 text-richblack-5 p-[12px]'
      />
      </label>

     <label>
      <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
      LastName<sup className='text-pink-200'>*</sup>
      </p>
      <input
      required
      type="text"
      name="lastName"
      value={lastName}
      onChange={handleOnChange}
      placeholder=' Enter Last name '
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className='w-full rounded-[0.3rem] bg-richblack-800 text-richblack-5 p-[12px]'
      />
     </label>
      </div>

     <label className='w-full '>
      <p className="mb-1 mt-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">
      Email address <sup className='text-pink-200'>*</sup>
      </p>
      <input
      required
      type="text"
      name="email"
      onChange={handleOnChange}
      value={email}
      placeholder=' Enter email address'
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className='w-full rounded-[0.5rem] p-[12px] bg-richblack-800 text-richblack-5'
      />
     </label>

     <div className='flex gap-x-4'>
      <label className='relative'>
      <p className="mb-1 mt-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">
      Create Password <sup className="text-pink-200">*</sup>
      </p>
      <input
      required
      type={showPassword ? "text" : "password"}
      name="password"
      value={password}
      onChange={handleOnChange}
      placeholder=' Enter password '
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className='w-full rounded-[0.3rem] bg-richblack-800 text-richblack-5 p-[12px]'
      />
      <span
      onClick={()=>setShowPassword((prev)=>!prev)}
      className='absolute right-3 top-[38px] z-[10] cursor-pointer mt-2'
      >
        {
          showPassword ?(
           
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          ):(
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          )
        }
      </span>
      </label>

     <label className='relative'>
      <p className='mb-1 mt-2 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
      Confirm Password <sup className='text-pink-200'>*</sup>
      </p>
      <input
      required
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      value={confirmPassword}
      onChange={handleOnChange}
      placeholder=' Confirm Password '
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className='w-full rounded-[0.3rem] bg-richblack-800 text-richblack-5 p-[12px]'
      />

     <span
     onClick={()=>setShowConfirmPassword((prev)=>!prev)}
      className="absolute right-3 top-[38px] z-[10] mt-2 cursor-pointer">
          {
        showConfirmPassword ?(
           
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          ):(
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          )
        
      }

     </span>
     </label>
      </div>

     <button type="submit"
       className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'
     >
      Create Account
     </button>
     </form>
    </div>
  )
}

export default SignupForm
