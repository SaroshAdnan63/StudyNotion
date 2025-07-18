import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Iconbtn from '../../../common/Iconbtn'

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse=()=>{
     const courses=cart.map((course) => course._id)
     console.log("couses buy...",courses)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
    <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
    <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {total}"</p>
    <Iconbtn
    text="Buy now"
    onClick
    />
    </div>
  )
}

export default RenderTotalAmount
