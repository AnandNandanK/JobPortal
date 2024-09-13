import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CiSearch } from "react-icons/ci";
import { useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { setSearchQuery } from '../../redux/jobSlice';



export default function HearoSection() {
  const [ query, setQuery] = useState();
  const navigate=useNavigate()
  const dispatch=useDispatch()

  // console.log(query);
  
  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse")
  }


  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium m-auto'> No 1 job Hunt Website</span>
        <h1 className='text-5xl font-bold mt-4'>Search, Apply & <br /> Get Your <span className="text-[#6a38c2]">Dream Jobs</span></h1>
        <p>Job seekers can easily find and apply for jobs, manage their applications, and view detailed information about each position. JobHut helps both job seekers and employers efficiently connect and achieve their career goals.</p>

        <div className='flex w-[70%] lg:w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 m-auto'>
          <input type="text"
            placeholder=' Find Your Dream Jobs'
            className='outline-none border-none w-full'
            // value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button className=" rounded-r-full bg-[#6a38c2]" onClick={searchJobHandler}>
            <CiSearch className='text-white text-2xl' />
          </Button>
        </div>
      </div>

    </div>
  )
}
