import React from 'react'
import signupImg from '../assets/Images/signup.webp'
import Template from '../Components/core/Auth/Template'


const Signup = () => {
  return (
    <div>
      <Template
      title="Join the millions to code with StudyNotion with free"
      description1="Build skills from today, tomorrow,and beyond"
      desciption2="Educate to future-proof your career"
      image={signupImg}
      formType="signup"
      />
    </div>
  )
}

export default Signup
