import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighLightText from './HighLightText'
import CTAButton from '../../../Components/core/HomePage/Button';
import { FaArrowRight } from "react-icons/fa6";
const InstructorSection = () => {
  return (
    <div className='mt-16'>
       <div className=' flex flex-row gap-2 items-center'>
       <div className='lg:w-[50%]'>
         <img className='shadow-white shadow-[-20px_-20px_0_0]' src={Instructor} alt="Instructor"/>
       </div>


       <div className='lg:w-[50%] flex flex-col'>
         <div className=' text-4xl font-semibold lg:w-[50%]'>
          Become an 
          <HighLightText text={" Instructor"}/>
         </div>

         <p className="font-medium text-[16px] text-justify w-[80%] text-richblack-300">
         Instructors from around the world teach millions of students on
         StudyNotion. We provide the tools and skills to teach what you
         love.
         </p>

         <div className='w-fit mt-10 '>
         <CTAButton active={true} linkto={"/signup"}>
            <div className=' flex  gap-3 items-center '>
            Start Learning Today
            <FaArrowRight/>
            </div>
          </CTAButton>
         </div>


        




       </div>




       </div>
    </div>
  )
}

export default InstructorSection


