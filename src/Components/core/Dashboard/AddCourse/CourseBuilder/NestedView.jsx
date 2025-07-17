import React from 'react'
import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import{deleteSection,deleteSubSecton} from'../../../../../services/operations/courseDetailApi'
import { setCourse } from '../../../../../slices/courseSlice'
import ConfirmationModal from '../../../../common/ConfirmationModal'

const NestedView = ({handleChangeEditSectionName}) => {
  const {course}=useSelector((state)=>state.course);
  const {token}=useSelector((state)=>state.auth);
  const dispatch = useDispatch()
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal,setConfirmationModal]=useState(null)
  return (
    <>
    <div className='rounded-lg bg-richblack-700 p-6 px-8' id="nestedViewContainer">
    {course?.courseContent?.map((section)=>(
      <details  key={section._id} open>
        <summary  className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
          <div className="flex items-center gap-x-3">
          <RxDropdownMenu/>
          <p className="font-semibold text-richblack-50">
          {section.sectionName}
          </p>
          </div>

          <div className='flex items-center gap-x-3'>
          <button onClick={()=>handleChangeEditSectionName(
              section._id,
              section.sectionName
          )}>
          <MdEdit className="text-xl text-richblack-300" />

          </button>

          <RiDeleteBin6Line className="text-xl text-richblack-300" />
          <button
          onClick={()=>setConfirmationModal({
          text1: "Delete this Section?",
          text2: "All the lectures in this section will be deleted",
          btn1Text: "Delete",
          btn2Text: "Cancel",
          // btn1handler:()=>handleDeleteSection(section._id),
          btn2handler:()=>setConfirmationModal(null),
          
          })}
          >
          </button>
          <span className="font-medium text-richblack-300">|</span>
          </div>
          
        </summary>
      </details>
    ))}
    </div>
    </>
  
  )
}

export default NestedView



