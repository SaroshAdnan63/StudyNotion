
import React from 'react'
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from '../../../services/operations/authApi'


const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    })

   const [showPassword,setShowPassword]=useState(false);
   const {email,password}=formData;


   const handleOnChange=(e)=>{
    setFormData((prevData)=>({
        ...prevData,
        [e.target.name]:e.target.value,
    }))
   }

   const handleOnSubmit=(e)=>{
     e.preventDefault()
     dispatch(login(email,password,navigate))
   }


  return (
    <div>
      <form
       onSubmit={handleOnSubmit}
       className='mt-6 w-full flex flex-col gap-y-4'
       >
     <label className='w-full'>
         <p className=' mt-2 mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
          Email adress <sup className='text-pink-200'>*</sup>
         </p>
         <input
         required
         type="text"
         name="email"
         value={email}
         onChange={handleOnChange}
         placeholder='Enter email address'
         style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
         />
     </label>

     <label className='relative'>
     <p className=' mt-2 mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
        Password <sup className='text-pink-200'>*</sup>
      </p>
      <input
         required
         type={showPassword ? "text" : "password"}
         value={password}
         name="password"
         onChange={handleOnChange}
         placeholder='Enter Password'
         style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className='w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 p-[12px]'
         />
         <span
          onClick={()=>setShowPassword((prev)=>!prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer mt-2"
          >
            {
                showPassword?(
                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ):(
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )
            }
         </span>
         <Link to="/forgot-password">
         <p className='mt-1 ml-auto max-w-max text-xs text-blue-100'>
            Forgot password
         </p>
         </Link>
     </label>
     <button
     type="submit"
     className='mt-6 rounded-[8px] bg-yellow-50 px-[12px] py-[8px] font-medium text-richblack-900'
     >
        Sign In
     </button>
      </form>
    </div>
  )
}

export default LoginForm
