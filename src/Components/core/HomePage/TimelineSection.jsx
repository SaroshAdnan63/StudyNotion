import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline=[
  {
    Logo:Logo1,
    heading:"Leadership",
    Description:"Fully comitted to success company"

  },
  {
    Logo:Logo2,
    heading:"Responsibility",
    Description:"Students  will alway our top Priority"

  },
  {
    Logo:Logo3,
    heading:"Flexibility",
    Description:"Ability to switch is an important skill"

  },
  {
    Logo:Logo4,
    heading:"Ability to solve Problem",
    Description:"Code your way to solve Problem"

  },
]
const TimelineSection = () => {
  return (
    <div>
      <div className='flex felx-row gap-15 items-center'>

        <div className='w-[45%] gap-5 flex flex-col'>
          {
            timeline.map((element, index)=>{
              return(
              <div className='flex flex-row gap-6' key={index}>

                <div className='w-[50px] h-[50px] flex items-center bg-white'>
                  <img src={element.Logo}/>
                </div>

                <div className='font-semibold text-[18px]'>
                <h2> {element.heading}</h2> 
                <p className='text-base'>{element.Description}</p>
                </div>


              </div>
              )
            })
          }
        </div>


        <div className='relative shadow-blue-200'>
         <img className='shadow-white object-cover h-fit' src={timelineImage} alt="timelineImage"/>

        <div className='absolute bg-caribbeangreen-500 flex flex-row text-white uppercase py-7
        left-[50%] translate-x-[-50%] translate-y-[-50%]'>

        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
          <p className='text-3xl font-bold'>10</p>
          <p className='bg-caribbeangreen-300 tetxt-sm'>Years of Experience</p>
        </div>



        <div className='flex gap-5 items-center px-7'>
        <p className='text-3xl font-bold'>250</p>
        <p className='bg-caribbeangreen-300 tetxt-sm'>Types  of Courses</p>

        </div>

        </div>




        </div>







      </div>
    </div>
  )
}

export default TimelineSection

