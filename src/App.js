import React from 'react'
import {Route,Routes} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './Components/common/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import OpenRoute from './Components/core/Auth/OpenRoute'
import PasswordUpdate from './pages/PasswordUpdate'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Myprofile from './Components/core/Dashboard/Myprofile'
import PrivateRoute from './Components/core/Auth/PrivateRoute'
import Error from './pages/Error'
import EnrolledCourses from './Components/core/Dashboard/EnrolledCourses'
import Cart from './Components/core/Dashboard/Cart'
import Contact from './pages/Contact';
import AddCourse from './Components/core/Dashboard/AddCourse';

import {ACCOUNT_TYPE} from './utils/constants'

const App = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route> 
    <Route path="forgot-password" element={
      <OpenRoute>
      <ForgotPassword/>
      </OpenRoute>}>
      </Route> 

      <Route path="update-password" element={
      <OpenRoute>
      <PasswordUpdate/>
      </OpenRoute>}>
      </Route> 


      <Route path="/verify-email" element={
      <OpenRoute>
       <VerifyEmail/>
      </OpenRoute>
    }/>
      
     

    <Route path="/about"
    element={<About/>}
    />

   <Route
    path="/dashboard"
   element={
    <PrivateRoute>
     <Dashboard/>
    </PrivateRoute>
   }
   >
   <Route path="my-profile" element={<Myprofile/>}/>
  

   {
    user?.accountType==ACCOUNT_TYPE.STUDENT &&(
     
      <>
      <Route path="enrolled-courses"element={<EnrolledCourses/>}/>
      <Route path="cart" element={<Cart/>}/>
     </>

  )
   }

{
    user?.accountType==ACCOUNT_TYPE.INSTRUCTOR &&(
      <>
       <Route path="add-course" element={<AddCourse/>}/>
      </>
  )
   }





  


   

  
 
   </Route>
   <Route path="/contact" element={<Contact/>}/>

   
  
   <Route path="*" element={<Error/>}/>


    </Routes>
    </div>
  )
}

export default App


