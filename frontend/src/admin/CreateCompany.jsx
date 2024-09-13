import React, { useState } from 'react'
import Navbar from '../components/ui/common/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice.js'
import { toast } from "sonner"


export default function CreateCompany() {

    const [companyName,setCompanyName]=useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const registerNewCompnay=async()=>{
        try {
            const res=await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })

           
            console.log("PRINTING RES..",res.data.message);

            if (res?.data?.success) {

                toast.success(res?.data?.message)
                dispatch(setSingleCompany(res?.data?.company));
                const companyId=res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);

            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            
        }
    }

  return (
    <div>
        <Navbar></Navbar>
        <div className='max-w-[800px] mx-auto mt-5 px-3 overflow-y-hidden'>
            <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-500'>what would you like to give your company name? </p>

            </div>
            
            <Label className="text-bold">Company Name</Label>
            <Input
            type="text"
            className="my-2"
            placeholder="jobHunt, Microsoft etc"
            onChange={(e)=>setCompanyName(e.target.value)}
            ></Input>

            <div className='flex gap-4 my-10 items-center'>
                <Button variant="outline" onClick={()=>navigate("/admin/companies")}>Cancel</Button>
                <Button onClick={registerNewCompnay}>Continue</Button>
            </div>

        </div>
    </div>
  )
}
