import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,useLocation} from 'react-router-dom'

function OpenRoute({ children }) {
    const { token } = useSelector((state) => state.auth)
    const location = useLocation();
    const currentPath = location.pathname;

    if (currentPath === "/verify-email") {
      return children;
  }
  
    if (!token) {
      return children
    } else {
      return <Navigate to="/dashboard/my-profile" />
    }
  }
  

export default OpenRoute
