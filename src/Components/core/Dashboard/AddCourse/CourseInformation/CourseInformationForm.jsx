import React from 'react'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import Iconbtn from '../../../../common/Iconbtn'
import ChipInput from './ChipInput'
import Upload from '../Upload'
import {setCourse,setStep} from'../../../../../slices/courseSlice'
import { editCourseDetails ,fetchCourseCategories,addCourseDetails} from '../../../../../services/operations/courseDetailApi'
import RequirementField from './RequirementField'
const CourseInformationForm = () => {

    const {register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}}=useForm();
        const dispatch = useDispatch();
        const {token}=useSelector((state)=>state.auth)
        const{course,editCourse}=useSelector((state)=>state.course)
        const [loading, setLoading] = useState(false)
        const [courseCategories, setCourseCategories] = useState([])

        useEffect(()=>{
        const getCategories=async()=>{
            setLoading(true);
            const categories=await fetchCourseCategories()
            if (categories.length > 0) {
            setCourseCategories(categories)
            }
            setLoading(false)
        }

        if(editCourse && course !== null){
        setValue("courseTitle",course.courseName);
        setValue("courseShortDesc",course.courseDescription);
        setValue("coursePrice",course.price);
        setValue("courseTags",course.tag);
        setValue("courseBenefits",course.whatYouWillLearn);
        setValue("courseCategory",course.category);
        setValue("courseRequirements",course.instructions);
        setValue("courseImage",course.thumbnail);
        }
        getCategories()
        },[])

       const isFormUpdated=()=>{
        const currentValues = getValues()
        if(
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
              course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ){
            return true
          }
          return false
       }

        const onSubmit=async(data)=>{

        if(editCourse){
        if(isFormUpdated()){
            const currentValues = getValues()
            const formData = new FormData()

            formData.append("courseId",course._id)
            if(currentValues.courseTitle!==course.courseName){
            formData.append("courseName", data.courseTitle)
            }
            if(currentValues.courseShortDesc!==course.courseDescription){
            formData.append("courseDescription", data.courseShortDesc)
            }
            if(currentValues.coursePrice!==course.price){
            formData.append("price", data.coursePrice)
            }
            if (currentValues.courseTags.toString() !== course.tag.toString()) {
            formData.append("tag", JSON.stringify(data.courseTags))
            }
            if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.courseBenefits)
              }
              if (currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory)
              }
              if (
                currentValues.courseRequirements.toString() !==
                course.instructions.toString()
              ){
                formData.append(
                  "instructions",
                  JSON.stringify(data.courseRequirements)
                )
              }
              if (currentValues.courseImage !== course.thumbnail) {
                formData.append("thumbnailImage", data.courseImage)
              }
              setLoading(true)
              const result = await editCourseDetails(formData, token)
              setLoading(false)
              if (result) {
                dispatch(setStep(2))
                dispatch(setCourse(result))
              }else{
                toast.error("No changes made to the form")
              }
            return
        }

        }
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        // formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        // formData.append("thumbnailImage", data.courseImage)
        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
        setLoading(false)
        
  
    }
  return (
   <form onSubmit={handleSubmit(onSubmit)}
    className="space-y-8 rounded-md border-[3<px] border-richblack-700 bg-richblack-800 p-6"
   >
    {/* courseTitle */}
    <div className='flex flex-col space-y-2'>
    <label className="text-sm text-richblack-5" htmlFor="courseTitle">
    Course Title <sup className="text-pink-200">*</sup>
    </label>
    <input
    id="courseTitle"
    placeholder="  Enter Course Title "
    {...register("courseTitle",{required:true})}
    className="form-style w-full bg-richblack-500 rounded-md text-richblack-5 p-3"
    />
    {
        errors.courseTitle &&(
        <span className="ml-2 text-xs tracking-wide text-pink-200">
        Course title is required
        </span>
        )
    }
    </div>
    {/* courseDescription */}
    <div className='flex flex-col space-y-2'>
    <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
    Course Short Description  <sup className="text-pink-200">*</sup>
    </label>
    <textarea
          id="courseShortDesc"
          placeholder="  Enter Description  "
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full bg-richblack-500 text-richblack-5 rounded-md"
        />
    {
        errors.courseTitle &&(
        <span className="ml-2 text-xs tracking-wide text-pink-200">
        Course ShortDescription is required
        </span>
        )
    }
    </div>
     {/* coursePrice */}
    <div className='flex flex-col space-y-2'>
    <label className="text-sm text-richblack-5" htmlFor="coursePrice">
    Course Price <sup className="text-pink-200">*</sup>
    </label>
    
    <input
    id="coursePrice"
    placeholder="  Enter Course Price "
    {...register("coursePrice",{required:true, valueAsNumber: true,
        pattern: {
        value: /^(0|[1-9]\d*)(\.\d+)?$/,
        },})}
    className="form-style w-full bg-richblack-500 rounded-md text-richblack-5 p-3"
    />
     
    {
        errors.courseTitle &&(
        <span className="ml-2 text-xs tracking-wide text-pink-200">
        Course Price is required
        </span>
        )
    }
    </div>
     {/* courseCategory */}
    <div className='flex flex-col space-y-2'>
    <label className="text-sm text-richblack-5" htmlFor="courseCategory">
    Course Category <sup className="text-pink-200">*</sup>
    </label>
    <select
    {...register("courseCategory",{required:true})}
    defaultValue=""
    id="courseCategory"
    className="form-style w-full text-richblack-5 bg-richblack-500 p-4 rounded-md"
    > 
    <option value="" disabled>Choose a Category</option>
    {
        !loading &&
        courseCategories.map((category,index)=>(
        <option key={index} value={category?._id}>
        {category?.name}
        </option>
        ))
        
    }
    </select>
    {
        errors.courseCategory &&(
        <span className="ml-2 text-xs tracking-wide text-pink-200">
        Course Category is required
        </span>
        )
    }
    </div> 
    
    {/* create custom input for tags */}
   
   <ChipInput
   label="Tags"
   name="courseTags"
   placeholder="Enter Tags and press Enter"
   register={register}
   errors={errors}
   setValue={setValue}
   getValues={getValues}
   />
   
  <Upload
    name="courseImage"
    label="Course Thumbnail"
    register={register}
    setValue={setValue}
    errors={errors}
    editData={editCourse ? course?.thumbnail : null}
  />



    {/* BenefitsOfCourse */}
    <div className='flex flex-col space-y-2'>
    <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
    Benefits of the course <sup className="text-pink-200">*</sup>
    </label>
    <textarea
    id="courseBenefits"
    placeholder='  Enter Benefits of Course  '
    {...register("courseBenefits",{required:true})}
     className="form-style resize-x-none min-h-[130px] bg-richblack-500 w-full rounded-md"
    />
    {
    errors.courseBenefits &&(
    <span className="ml-2 text-xs tracking-wide text-pink-200">
    Benefits of the course is required
    </span>
    )
    }
    </div>

     <RequirementField
     name="courseRequirements"
     label="Requirements/Instructions"
     register={register}
     errors={errors}
     setValue={setValue}
     getValues={getValues}
     />
    {/* nextButton */}
    <div className="flex justify-end gap-x-2">
    {
        editCourse &&(
        <button
        disabled={loading}
        onClick={()=>dispatch(setStep(2))}
        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
        Continue Wihout Saving
        </button>
        )
    }
    <Iconbtn
     disabled={loading}
     text={!editCourse ? "Next" : "Save Changes"}
    >
    <MdNavigateNext />
    </Iconbtn>
    </div>
   </form>
  )
}

export default CourseInformationForm



