import React from 'react'
import{sidebarLinks} from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../../services/operations/authApi'
import { useNavigate } from 'react-router-dom'
import SidebarLink from './SidebarLink'
import ConfirmationModal from '../../common/ConfirmationModal'
import { VscSignOut } from "react-icons/vsc"
import { useState } from 'react'

const Sidebar = () => {
    const{user,laoding:profileLoading}=useSelector((state)=>state.profile);
    const{laoding:authLoading}=useSelector((state)=>state.auth);
    const [confirmationModal,setConfirmationModal]=useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    if (profileLoading || authLoading) {
        return (
          <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
            <div className="spinner"></div>
          </div>
        )
      } 
    

  return (
    <>
    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
       <div className='flecx flex-col gap-4'>
       {
        sidebarLinks.map((link,index)=>{
        //  if(link.type && user.accountType !==link.type) return null;
        if (link.type && (!user || user.accountType !== link.type)) return null;
         return(
          <SidebarLink key={link.id} link={link} iconName={link.icon}/>
         )
        })
       }
       </div>

       <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'/>
       <div className='flex flex-col'>
        <SidebarLink
        link={{ name: " Settings ", path: "/dashboard/settings" }}
        iconName="VscSettingsGear"
        />
        <button
        onClick={()=>{
          setConfirmationModal({
            text1:"Are you sure ?",
            text2:"You will be logged out of your account.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout(navigate)),
            btn2Handler: () => setConfirmationModal(null),
          })
        }}
        className="px-8 py-2 text-sm font-medium text-richblack-300"
        >
       <div className="flex items-center gap-x-2">
       <VscSignOut className="text-lg" />
       <span>Logout</span>
       </div>
      </button>
       </div> 
    </div>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default Sidebar
