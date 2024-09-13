import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function protectedRoute({childrens}) {
    const {user}=useSelector((store)=>store.auth);
    const navigate=useNavigate();
    
    useEffect(()=>{
        if (user==null || user!=="recruiter") {
            navigate("/");
        }
    })
  return (
    <>
        {childrens}
    </>
  )
}
