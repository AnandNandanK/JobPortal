import React, { useEffect } from 'react'
import Navbar from '../components/ui/Navbar.jsx'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {setApplicants} from "../redux/applicationSlice.js"

export default function Applicants() {
    const params=useParams()
    const dispatch=useDispatch();

    const { applicants } = useSelector((store) => store.application)

    
    useEffect(()=>{
       const fetchAllApplicants=async()=>{
        try {
            const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{
                withCredentials:true
            });

            // console.log(res.data.job.applications)
            
            // for (const element of applicants) {
            //     console.log(element.applicant)
            // }

            if (res.data.success) {
                dispatch(setApplicants(res.data.job.applications));
            }
        } catch (error) {
            
        }
       }
       fetchAllApplicants();
    },[params.id,dispatch])

  return (
    <div>
        <Navbar/>
        <div className='max-w-[1100px] mx-auto px-3 overflow-y-hidden'>  
            <h1 className='font-bold text-xl my-3'>Applicants ({applicants?.length})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}
