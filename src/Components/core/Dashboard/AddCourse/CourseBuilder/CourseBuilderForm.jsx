
import React, { useEffect,useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import Iconbtn from '../../../../common/Iconbtn'
import NestedView from './NestedView'
import{setStep,setCourse,setEditCourse} from '../../../../../slices/courseSlice'
import {createSection ,updateSection} from '../../../../../services/operations/courseDetailApi'

// const CourseBuilderForm = () => {

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm()



//   const { course } = useSelector((state) => state.course)
//   const { token } = useSelector((state) => state.auth)
//   const [loading, setLoading] = useState(false)
//   const [editSectionName, setEditSectionName] = useState(null)
//   const dispatch = useDispatch()

//   const cancelEdit=()=>{
//     setEditSectionName(null)
//     setValue("sectionName","")
    
//   }
 
  

//   const goBack=()=>{
//    dispatch(setStep(1))
//    dispatch(setEditCourse(true))
//   }
//   const goToNext=()=>{
//     if (course?.courseContent.length === 0) {
//       toast.error("Please add atleast one section")
//       return
//     }
//     if(
//     course.courseContent.some((section)=>section.subSection.length === 0)
//     ){
//       toast.error("Please add atleast one lecture in each section")
//       return
//     }
//     dispatch(setStep(3))
//   }
   
//    const onSubmit = async (data) => {
//     // console.log(data)
//     setLoading(true)

//     let result

//     if (editSectionName) {
//       result = await updateSection(
//         {
//           sectionName: data.sectionName,
//           sectionId: editSectionName,
//           courseId: course._id,
//         },
//         token
//       )
//       // console.log("edit", result)
//     } else {
//       result = await createSection(
//         {
//           sectionName: data.sectionName,
//           courseId: course._id,
//         },
//         token
//       )
//     }
//     if (result) {
//       // console.log("section result", result)
//       dispatch(setCourse(result))
//       setEditSectionName(null)
//       setValue("sectionName", "")
//     }
//     setLoading(false)
//   }

  
//   const handleChangeEditSectionName = (sectionId, sectionName) => {
//     if (editSectionName === sectionId) {
//       cancelEdit()
//       return
//     }
//     setEditSectionName(sectionId)
//     setValue("sectionName", sectionName)
//   }

//   return (
//     <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
//     <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div className="flex flex-col space-y-2">
//         <label className="text-sm text-richblack-5" htmlFor="sectionName">
//         Section Name <sup className="text-pink-200">*</sup>
//         </label>
//         <input
//         type="text"
//         id="sectionName"
//         disabled={loading}
//         placeholder=" Add a section to build your course "
//         {...register("sectionName",{required:true})}
//         className="form-style w-full bg-richblack-500 rounded-md p-2 text-white"
//         />
//         {
//         errors.sectionName &&(
//         <span>Section Name is required<sup className='ml-2 text-xs text-pink-200'>* </sup></span>
//         )
//         }
//       </div>
      
//      <div className='flex items-end gap-x-4'>
//       <Iconbtn
//         type="submit"
//         disabled={loading}
//         text={editSectionName ? "Edit Section Name" : "Create Section"}
//         outline={true}
//       >
//      <IoAddCircleOutline size={20} className="text-yellow-50" />
//       </Iconbtn>
//       {
//         editSectionName &&(
//           <button
//           type="button"
//           onClick={cancelEdit}
//           className="text-sm text-richblack-300 underline"
//           >
//           Cancel Edit
//           </button>
//         )
//       }
//      </div>
//     </form>

//     {
//       course?.courseContent.length>0 &&(
//         <NestedView/>
//       )
//     }

//      {/* Next Prev Button */}
//      <div className='flex justify-end gap-x-3'>
//      <button
//       className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//       onClick={goBack}
//     >
//     Back
//      </button>
//      <Iconbtn
//      disabled={loading}
//      text="Next"
//      onClick={goToNext}
//      >
//     <MdNavigateNext />
//     </Iconbtn>
//      </div>
//     </div>
//   )
// }

const CourseBuilderForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()



  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()

  const cancelEdit=()=>{
    setEditSectionName(null)
    setValue("sectionName","")
    
  }
  const goBack=()=>{
   dispatch(setStep(1))
   dispatch(setEditCourse(true))
  }
  const goToNext=()=>{
    if (course?.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if(
    course.courseContent.some((section)=>section.subSection.length === 0)
    ){
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }
  const onSubmit=async(data)=>{
   
   setLoading(true)
   //we are editing section name
   if (!course?._id ) {
    toast.error("Course ID is missing. Please reload the page.");
    setLoading(false);
    return;
  }

   let result;
   if(editSectionName){
    result=await updateSection({
      sectionName: data.sectionName,
      sectionId: editSectionName,
      courseId: course._id,
    }, 
    token
   )
  }
  else{
     result=await createSection({
      sectionName: data.sectionName,
      courseId: course._id,
     },
     token
    )
   }

  //updates values
  if(result){
    console.log("Updated course after createSection:", result) 
    dispatch(setCourse(result))
    setEditSectionName(null)
    setValue("sectionName", "")
  }
  console.log("Updated course after createSection:", result)
  setLoading(false)
  }
  
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
    <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="sectionName">
        Section Name <sup className="text-pink-200">*</sup>
        </label>
        <input
        type="text"
        id="sectionName"
        disabled={loading}
        placeholder=" Add a section to build your course "
        {...register("sectionName",{required:true})}
        className="form-style w-full bg-richblack-500 rounded-md p-2 text-white"
        />
        {
        errors.sectionName &&(
        <span>Section Name is required<sup className='ml-2 text-xs text-pink-200'>* </sup></span>
        )
        }
      </div>
      
     <div className='flex items-end gap-x-4'>
      <Iconbtn
        type="submit"
        disabled={loading}
        text={editSectionName ? "Edit Section Name" : "Create Section"}
        outline={true}
      >
     <IoAddCircleOutline size={20} className="text-yellow-50" />
      </Iconbtn>
      {
        editSectionName &&(
          <button
          type="button"
          onClick={cancelEdit}
          className="text-sm text-richblack-300 underline"
          >
          Cancel Edit
          </button>
        )
      }
     </div>
    </form>

    {
      course?.courseContent.length>0 &&(
        <NestedView/>
      )
    }

     {/* Next Prev Button */}
     <div className='flex justify-end gap-x-3'>
     <button
      className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
      onClick={goBack}
    >
    Back
     </button>
     <Iconbtn
     disabled={loading}
     text="Next"
     onClick={goToNext}
     >
    <MdNavigateNext />
    </Iconbtn>
     </div>
    </div>
  )
}






export default CourseBuilderForm;
