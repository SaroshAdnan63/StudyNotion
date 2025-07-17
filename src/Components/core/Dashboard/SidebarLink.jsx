import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({link,iconName}) => {
    const Icon=Icons[iconName];
    const location=useLocation();
    const dispatch=useDispatch();

   const matchRoute=(route)=>{
     return matchPath({path:route},location.pathname) 
   }





  return (
    <NavLink
    to={link.path}
    className={`relative px-8 py-2 text-sm font-medium hover:text-yellow-400 hover:scale-110 text-richblack-50  transition-all duration-300`}
    >
    {/* <span className={`absolute left-0 top-0 h-full w-[0.15rem]  bg-richblack-50 ${matchRoute(link.path)?"opacity-100":"opacity-0"} `}>
    </span> */}
    <div  className="flex items-center gap-x-4">
         {/* Icon Goes Here */}
         <Icon className="text-lg ml-2" />
        <span>{link.name}</span>
    </div>
    </NavLink>
  )
}

export default SidebarLink

// ${matchRoute(link.path)?  "bg-yellow-800 text-yellow-50":"bg-opacity-0 text-richblack-300"}