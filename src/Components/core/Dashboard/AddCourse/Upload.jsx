import React from 'react'
import { useEffect, useRef, useState } from "react"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

const Upload = ({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = null,
    editData = null,
}) => {
    const { course } = useSelector((state) => state.course)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
    )
    const inputRef = useRef(null)

   

  return (
    <div className='flex flex-col space-y-2'>
        <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div className={`flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500
      `}>

      </div>

    </div>
  )
}

export default Upload
