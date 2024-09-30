import React, { useEffect, useState } from 'react'
import Navbar from '../components/ui/Navbar'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs'
import { useDispatch, useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import { setSearchJobByText } from '../redux/jobSlice'


export default function AdminJobs() {
  useGetAllAdminJobs()
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  // console.log(input)
  // dispatch(setCompanyByText(input));

  useEffect(()=>{
  dispatch(setSearchJobByText(input));
  },[input])
  // const {searchJobByText} = useSelector((store) => store.job);
  // console.log("serchJobByText",searchJobByText);

  return (
    <div className='max-w-[1100px] mx-auto px-3 overflow-y-hidden'>
      <Navbar />

      <div className='mt-5 flex justify-between items-center'>
        <Input
          className="w-fit"
          placeholder="    Filter by Name and Role"
          onChange={(e)=>setInput(e.target.value)}
          />
        <Button onClick={() => navigate("/admin/job/create")}>New Jobs</Button>
      </div>
      <AdminJobsTable/>
      
    </div>
  )
}
