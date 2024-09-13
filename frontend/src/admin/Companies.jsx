import React, { useEffect, useState } from 'react'
import Navbar from '../components/ui/common/Navbar'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/useGetAllCompanies';
import { setCompanyByText } from '../redux/companySlice'
import { useDispatch } from 'react-redux'


export default function Companies() {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  // console.log(input)

  // dispatch(setCompanyByText(input));


  useEffect(()=>{
  dispatch(setCompanyByText(input));
  },[input])

  return (
    <div className='max-w-[1100px] mx-auto px-3 overflow-y-hidden'>
      <Navbar />

      <div className='mt-5 flex justify-between items-center'>
        <Input
          className="w-fit"
          placeholder="    filter by name"
          onChange={(e)=>setInput(e.target.value)}
          />
        <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
      </div>

      <CompaniesTable />
    </div>
  )
}
