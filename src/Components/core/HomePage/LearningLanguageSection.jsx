import React from 'react'
import HighLightText from './HighLightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from '../HomePage/Button'; 

const LearningLanguageSection = () => {
  return (
    <div className='mt-[150px] mb-32'>
      <div className='flex flex-col gap-5 items-center '>
       <div className='text-4xl font-semibold text-center'>
        Your Swiss knife for
        <HighLightText text={" Learning any language"}/>
       </div>
        
        <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
        Using spin making learning multiple languages easy.
        with 20+ languages voice-over,progress tracking,custom schedule and more.   
        </div>

        <div className='flex flex-row  items-center  mt-5'>
          <img className='object-contain -mr-32' src={know_your_progress} alt="Know your progress" />
          <img className='object-contain' src={compare_with_others} alt="Compare with others" />
          <img className='object-contain -ml-36' src={plan_your_lessons} alt="Plan your lessons" />

        </div>

      <div className='w-fit '>
      <CTAButton active={true} linkto={"/signup"}>
      Learn More
      </CTAButton>

      </div>   
      


      </div>
    </div>
  )
}

export default LearningLanguageSection
