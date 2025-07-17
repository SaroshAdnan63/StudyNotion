import React from 'react'
import { useSelector } from "react-redux"
import frameImg from '../../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'


const Template = ({image,title,description1,description2,formType}) => {
  const { loading } = useSelector((state) => state.auth)
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
      {loading?(
       <div className="spinner"></div>
        ):(
        <div className='w-11/12 items-center max-w-maxContent flex flex-col-reverse gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12'>
         <div className='mx-auto w-11/12 max-w-[450px] md:mx-0'>
          <h1 className='text-[1.875rem] font-semibold text-richblack-5 leading-[2.375rem]'>
          {title}
          </h1>
          <p className='mt-4 text-[1.125rem] leading-[1.625rem]'>
          <span className="text-richblack-100">{description1}</span>{" "}
        <span className=" font-bold italic text-blue-100">{description2}</span>
        </p>
           {formType === "signup" ? <SignupForm /> : <LoginForm />} 
         </div>
         
         <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
           <img
            src={frameImg}
            alt="Pattern"
            hight={504}
            width={558}
            loading="lazy"
           />
           <img/>
           <img
            src={image}
            alt="Students"
            hight={504}
            width={558}
            loading="lazy"
            className='absolute top-4 right-4 z-10'
           />
           <img/>
         </div>
        </div>
        )
      }
    </div>
  )
}

export default Template
