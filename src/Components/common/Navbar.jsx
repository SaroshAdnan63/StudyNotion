import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import  ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { AiOutlineMenu } from "react-icons/ai"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ACCOUNT_TYPE } from '../../utils/constants';

const Navbar = () => {
   const {token}=useSelector((state)=>state.auth);
   const {user}=useSelector((state)=>state.profile);
   const {totalItems}=useSelector((state)=>state.cart);

   const[sublinks,setSublinks]=useState([]);
   const [loading, setLoading] = useState(false)
   
    
  useEffect(() => {
    if (!token) return; 
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API,)
        setSublinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories......", error)
      }
      setLoading(false)
    })()
  }, [])



  const location=useLocation();
  const matchRoute=(route)=>{
   return matchPath({path:route},location.pathname);
  }

  return (
    <div className='flex h-12 items-center justify-between border-b-[1px] border-b-richblack-700 '>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between ml-12 '>
      {/*image*/}
      <Link to="/"> 
      <img alt="Logo" src={logo} width={160} height={32} loading='lazy'/>
     </Link>

     {/*NavLinks*/}
     <nav className="hidden md:block">
        <ul className=' flex gap-x-6 text-richblack-25'>
             {
                NavbarLinks.map((link,index)=>{
                 return <li key={index} className="relative group">
                  {
                    link.title==="Catalog"? (
                      <div className={` relative flex flex-row items-center gap-2 group ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}>
                        <p>{link.title}</p>
                         <MdOutlineKeyboardArrowDown />

                         <div className='absolute left-1/2 top-full z-[9999] -translate-x-1/2 mt-2
                          invisible opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
                          flex flex-col p-4 rounded-md bg-richblack-5 text-richblack-900 shadow-lg lg:w-[300px]'>

                            <div className='absolute left-[50%] top-0 -z-10  translate-x-[80%] translate-y-[-40%]  h-6 w-6 rotate-45 rounded bg-richblack-5'>
                            </div>
{loading ? (
          <p className="text-center">Loading...</p>
        ) : sublinks?.length > 0 ? (
          sublinks.map((sublink, i) => (
            <Link 
              to={`/catalog/${sublink.name.split(" ").join("_").toLowerCase()}`}
              className='rounded-lg bg-transparent py-2 px-4 hover:bg-richblack-50'
              key={i}
            >
              <p>{sublink.name}</p>
            </Link>
          ))
        ) : (
          <p className="text-center">No Categories Found</p>
        )}










                         </div>
                      </div>
                    ):(
                      
                        <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}`}>
                        {link.title}
                        </p>
                        </Link>
                    )
                  }
                  </li>
                })
             }
        </ul>
     </nav>


     {/* login/signup/dashboard */}

     <div className='flex gap-x-10 items-center '>
        {
            user && user?.accountType !==ACCOUNT_TYPE.INSTRUCTOR &&(
                <Link to="/dashboard/cart" className='relative text-white'>
                <FaShoppingCart />
                {
                    totalItems>0 &&(
                    <span>
                    {totalItems}
                    </span>
                    )}
                </Link>
            )}
                {
                  token===null &&(
                  <Link to={"/login"}>
                  <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                    Log in
                  </button>
                  </Link>
                  ) 
                }
                 {
                  token===null &&(
                  <Link to="/signup">
                  <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                  Sign up
                  </button>
                  </Link>
                  )
                }
                {
                  token!==null && <ProfileDropDown/>
                }
     </div>

     <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
    </div>
    </div>
  )
}

export default Navbar
 