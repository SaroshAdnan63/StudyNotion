import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighLightText from '../Components/core/HomePage/HighLightText';
import CTAButton from '../Components/core/HomePage/Button'; 
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../Components/core/HomePage/CodeBlocks';
import TimelineSection from '../Components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../Components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../Components/core/HomePage/InstructorSection';
import Footer from '../Components/common/Footer';
import ExploreMore from '../Components/core/HomePage/ExploreMore';
const Home = () => {
  return (
    <div>
    {/*section 1*/}

    <div className='mt-16 p-1 relative max-w-maxContent mx-auto gap-8 flex flex-col w-11/12 items-center text-white justify-between'>

        <Link to={"/signup"}>

        <div className=' group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
         transition-all duration-200 hover:scale-95 w-fit '>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] 
            transition-all duration-200 group-hover:bg-richblack-800'>
             <p>Become an Instructor</p>
             <FaArrowRight/>
            </div>
        </div>


        </Link>

     <div className='text-center text-4xl font-semibold mt-7'>
        Empower Your Future with 
        <HighLightText text={" Coding Skills "}/>
     </div>

     <div className="mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className='mt-8 flex flex-col gap-7  '>
          <CTAButton active={true} linkto={"/signup"}>
         <div>
          Learn More
         </div>
         </CTAButton>

         <CTAButton active={false} linkto={"/login"}>
         <div>
          Book a Demo
         </div>
         </CTAButton>
          

         <div className='shadow-blue-200 mx-3 my-12'>
          <video className='shadow-[20px_20px_rgba(255,255,255)]'
          muted autoPlay loop>
          <source src={Banner} type="video/mp4"/>

          </video>
         </div>
        
        {/*code section 1*/}


        <div>
        <CodeBlocks
        position={"lg:flex-row"}
        heading={
          <div className='text-4xl font-semibold'>
          Unlock Your 
          <HighLightText text={" Coding Potential "}/>
          With our online Courses
          </div>
        }
        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
        ctabtn1={{
          btnText: "Try it Yourself",
          link: "/signup",
          active: true,
        }}
        ctabtn2={{
          btnText: "Learn More",
          link: "/login",
          active: false,
        }}
        codeColor={"text-yellow-25"}
        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
        backgroundGradient={<div className="codeblock1 absolute"></div>}
        




        />
        </div>

       {/*code section 2*/}

        <div>
        <CodeBlocks
        position={"lg:flex-row-reverse"}
        heading={
          <div className='text-4xl font-semibold'>
          Unlock Your 
          <HighLightText text={" Coding Potential "}/>
          With our online Courses
          </div>
        }
        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
        ctabtn1={{
          btnText: "Try it Yourself",
          link: "/signup",
          active: true,
        }}
        ctabtn2={{
          btnText: "Learn More",
          link: "/login",
          active: false,
        }}
        codeColor={"text-yellow-25"}
        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
        backgroundGradient={<div className="codeblock1 absolute"></div>}
        




        />
        </div>

        <ExploreMore/>
   
        </div>




    </div>


    {/*section 2*/}

    <div className='bg-pure-greys-5 text-richblack-700'>
      <div className='homepage_bg h-[310px]'>
      <div className='w-11/12 max-w-maxContent flex items-center justify-between  flex-col gap-5 mx-auto'>
         <div className='h-[150px]'></div>
        <div className=' flex flex-row gap-7 text-white '>

        <CTAButton active={true} linkto={"/signup"}>
        <div className='flex gap-3 items-center'>
        Explore full Catlog 
        <FaArrowRight/>
        </div>
        </CTAButton>
       
       <CTAButton active={false} linkto={"/signup"}>
        <div>
        Learn More
        </div>
       </CTAButton>



        </div>
      </div>
      </div>


      <div className='mx-auto w-11/12 max-w-maxContent justify-between gap-7 flex flex-col items-center'>

       <div className='flex flex-row gap-5 mt-10 mb-[95px]'>
        <div className='font-semibold text-4xl w-[45%] '>
        Gets the Skills you need for a
        <HighLightText text={" Job that is in Demand"}/>
        </div>

        <div className='flex flex-col gap-10 w-[40%] items-start'>
            <div className='text-[16px]]'>
            Modern StudyNotion is the dictates of its own terms.Today to be a good competitive 
            specialist require more than proffesional skills
            </div>
            <CTAButton active={true} linkto={"/signup"}>
             <div>
              Learn More
             </div>
            </CTAButton>
       </div>
       </div>
       <TimelineSection/>
       <LearningLanguageSection/>

      </div>

  
    </div>

    {/*section 3*/}
   <div className='w-11/12 mx-auto items-center max-w-maxContent flex flex-col 
   justify-between gap-8 bg-richblack-900 text-white'>
    
    <InstructorSection/>
    
    <h2 className=' mt-10 text-center font-semibold text-4xl'>review from Other Learners</h2>





   </div>

    {/*Footer*/}
    
    <Footer/>
    </div>
  )
}

export default Home
