import React, { useEffect, useState } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getValues}) => {
    const[requirement,setRequirement]=useState("")
    const[requirementList,setRequirementList]=useState([])

    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length>0
        })
    },[])

    useEffect(()=>{
    setValue(name,requirementList)
    },[requirementList])


    const handleAddRequirement=()=>{
     if(requirement){
        setRequirementList([...requirementList,requirement])
        setRequirement("")
     }
    }
    const handleRemoveRequirement=(index)=>{
   const updatedRequirementList=[...requirementList]
   updatedRequirementList.splice(index,1)
   setRequirementList(updatedRequirementList)

    }

  return (
    <div className='text-richblack-5'>
      <label htmlFor={name}>{label}<sup className='text-pink-200'>*</sup></label>
      <div>
        <input
        type="text"
        id={name}
        value={requirement}
        onChange={(e)=>setRequirement(e.target.value)}
        className='w-full bg-richblack-500 p-4 rounded-md'
        />
        <button
        type="button"
        onClick={handleAddRequirement}
        className='font-semibold text-yellow-50 mt-2'
        >
        Add
        </button>
      </div>

     {
        requirementList.length>0 &&(
            <ul>
                {
                    requirementList.map((requirement,index)=>(
                     <li key={index} className='flex flex-col space-y-1'>
                        <span>{requirement}</span>
                        <button
                        type="button"
                        onClick={()=>handleRemoveRequirement(index)}
                        className='text-xs text-pure-greys-300'
                        >
                        clear
                        </button>
                     </li>
                    ))
                }
            </ul>
        )
     }

    {
        errors[name] &&(
        <span>
        {label} is required
        </span>
        )
    }




    </div>
  )
}

export default RequirementField

