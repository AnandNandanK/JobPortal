import React, { useEffect } from 'react'
import Navbar from './common/Navbar'
import HearoSection from '../Home/HearoSection'
import CategoryCrousel from '../Home/categoryCrousel'
import LatestJobs from '../Home/LatestJobs'
import Footer from '../Home/Footer'
import useGetAlljobs from '../../hooks/useGetAlljobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '../../redux/jobSlice'


export default function Home() {
  useGetAlljobs();

  const {user}=useSelector((store)=>store.auth);
  const navigate=useNavigate();
  const dispatch = useDispatch();


  // useEffect(() => {
  //     console.log("Component unmounting, resetting search query");
  //     dispatch(setSearchQuery("")); // Reset query when component unmounts
  // }, [dispatch]);


  useEffect(()=>{
    // console.log('user role',user?.role)
    if (user?.role==="recruiter") {
      navigate("/admin/companies")
    }
  })


  return (
    <div className='max-w-[1100px] mx-auto px-3 overflow-y-hidden'>
      <Navbar />
      <HearoSection/>
      <CategoryCrousel />
      <LatestJobs/>
      <Footer/>
    </div>
  )
}
