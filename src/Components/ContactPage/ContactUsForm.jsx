import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { contactusEndpoint } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import CountryCode from '../../data/countrycode.json'

const ContactUsForm = () => {
const [loading,setLoading]=useState(false);
const {register,
       handleSubmit,
       reset,
       formState: { errors, isSubmitSuccessful },
    }=useForm();

    const contactSubmitForm=async(data)=>{
        console.log("formdata",data)
        try{
        setLoading(true)
        const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API)
        console.log("logging response",response);
        setLoading(false)
        }catch(error){
        console.log("Error",error.message);
        setLoading(false);
        }
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    },[isSubmitSuccessful,reset])
  return (
    <form  className="flex flex-col gap-7"
     onSubmit={handleSubmit(contactSubmitForm)}>
     <div className="flex flex-col gap-5 lg:flex-row">
        {/* firstName */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
         <label  htmlFor="firstname" className="lable-style text-white"> First Name </label>
         <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder=" Enter first name "
          className="form-style text-white h-12 bg-richblack-600 rounded-md"
          {...register("firstname",{required:true})}
          />
            {
            errors.firstname &&(
                <span className='-mt-1 text-[12px] text-yellow-100'>
                Please enter your name.
                </span>
            )
          }
        </div>
        {/* lastname */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
         <label  htmlFor="lastname" className="lable-style text-white"> Last Name </label>
         <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder=" Enter last name "
          className="form-style text-white h-12 bg-richblack-600 rounded-md"
          {...register("lasstname")}
          />
        </div>
        {/* emailaddress */}

     </div>
     <div className="flex flex-col gap-2 lg:w-[48%]">
         <label  htmlFor="email" className="lable-style text-white"> Enter email address </label>
         <input
          type="text"
          name="email"
          id="email"
          placeholder=" Enter email address "
          className="form-style text-white w-96 h-12 bg-richblack-600 rounded-md"
          {...register("email",{required:true})}
          />
            {
            errors.firstname &&(
                <span className='-mt-1 text-[12px] text-yellow-100'>
                Please enter your email.
                </span>
            )
          }
      </div>
       
       {/* phone number */}
      <div className='flex flex-col gap-2'>
      <label  htmlFor='phonenumber' className='text-white'> Phone Number</label>
      <div className='flex  gap-5'>
        {/* dropdown for country code */}
          <div className='flex w-[81px] flex-col gap-2'>
          <select 
          name="dropdown"
          id="dropdown"
          className='form-style text-white h-12 bg-richblack-600 rounded-md'
          {...register("countrycode",{required:true})}
          >
           {
            CountryCode.map((element,index)=>{
              return(
                <option key={index} value={element.code}>
                   {element.code} -{element.country}
                </option>
              )
            })
           }
          </select>
        </div>

        <div className=' flex w-[calc(100%-90px)] flex-col gap-2'>
        <input
        type="number"
        name="phonenumber"
        id="phonenumber"
        className='form-style text-white h-12 bg-richblack-600 rounded-md'
        placeholder=' 12345 67890 '
        {...register("phonenumber",{
        required: {value: true,message: "Please enter your Phone Number.",},
         maxLength: { value: 12, message: "Invalid Phone Number" },
        minLength: { value: 10, message: "Invalid Phone Number" },
        })}
        />
        {
          errors.phoneNo &&
          <span className='-mt-1 text-[12px] text-yellow-100'>
          {errors.phoneNo.message}
          </span>
        }
        </div>
      </div> 
      </div>



       
      {/* message */}
       <div className='flex flex-col gap-2 '>
       <label htmlFor='message' className='lable-style text-white'>
        Message
       </label>
       <textarea
       name="message"
       id="message"
       cols="30"
       rows="7"
      placeholder="Enter your message here"
      className="form-style text-white  bg-richblack-600 rounded-md"
      {...register("message",{required:true})}
      />
      {
        errors.message &&(
        <span className='-mt-1 text-[12px] text-yellow-100'>
        Please enter your Message.
        </span>
        )
      }
      </div>
      {/* button  */}
      <button  disabled={loading} type="submit"
      className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
        ${
          !loading &&
          "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] 
        }`}
      >
      Send Message
      </button>
    </form>
  )
}

export default ContactUsForm
