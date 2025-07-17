import React from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import HighLightText from './HighLightText';
import { useState } from 'react';

const tabsName=[
    "Free",
    "New to Coding",
    "Most Popular",
    "Skills Path",
    "Career Path",
]


const ExploreMore = () => {

  const [currentTab,setCurrentTab]=useState(tabsName[0]);
  const [courses,setCourses]=useState(HomePageExplore[0].courses);
  const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

  const setMyCards=(value)=>{
   setCurrentTab(value);
   const result=HomePageExplore.filter((course)=>course.tag===value);
   setCourses(result[0].courses);
   setCurrentCard(result[0].courses[0].heading);
  }




  return (
    <div>

     <div className=' text-4xl font-semibold text-center'>
      Unlock the
      <HighLightText text={" Power of Code"}/>
     </div>

     <p className='text-center text-richblack-300 text-sm  mt-3'>
      Learn to Build anything you can imagine
     </p>
    
     <div className='flex flex-row rounded-full bg-richblack-800 mb-5 mt-5 border-richblack-300'>
      {
        tabsName.map((element,index)=>{
          return (
            <div className={`text-[16px] items-center gap-2 ${currentTab===element ?"bg-richblack-900 text-richblack-5 font-medium" 
            :"text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:ring-richblack-900 hover:text-richblack-5 px-20 py-3`} 
            key={index}
            onClick={setMyCards}
             >
              {element}
            </div>
          )
        })
      }

     </div>

      <div className='lg:h-[150px]'>
      {/*course card ka group*/}
      <div className='absolute flex flex-row gap-10 justify-between w-full'>
        {
          
        }
      </div>
      </div>

     

    </div>
  )
}

export default ExploreMore
