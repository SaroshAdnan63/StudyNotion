import React from 'react'
import loginImg from '../assets/Images/login.webp'
import Template from '../Components/core/Auth/Template'


const Login = () => {
  return (
    <div>
    <Template
    title="Welcome Back"
    description1="Build skills from today, tomorrow,and beyond"
    desciption2="Educate to future-proof your career"
    image={loginImg}
    formType="login"
    />
    </div>
  )
}

export default Login
