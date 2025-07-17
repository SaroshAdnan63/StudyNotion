import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Iconbtn from '../../../common/Iconbtn'


const EditProfile = () => {
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      
    
  return (
    <div>
      
    </div>
  )
}

export default EditProfile
