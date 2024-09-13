import React, { useState } from 'react'
import Navbar from './ui/Navbar.jsx';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '../redux/jobSlice.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../constant';
import { toast } from 'sonner';



export default function JobDescription() {

    const {singleJob}=useSelector((state)=>state.job)
    const {user}=useSelector((state)=>state.auth)


    const isInitiallyApplied = singleJob?.applications?.some((applications)=>applications.applicant===user?._id) || false ; //UI ME DELAY NA HO TURANT KE TURANT CHANGE HO JAYE USI PAGE OPEN KARTE HI ALREADY APPLY DIKHE WARNA PAHLE APPLY NOW DIKHEGA FIR KUCH SECCOND BAAD ALREADY APPLY DIKHEGA

    const [isApplied,setIsApplied] = useState(isInitiallyApplied);
    
    const params=useParams();
    const jobId=params.id;

    const dispatch=useDispatch();
    

    const applyJobHandler=async()=>{
        try {
            const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{
                withCredentials:true 
            })

            console.log("PRINGING RES",res)

            if (res.data.success) {
                setIsApplied(true);
                const updateSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob)); // this will help us to get real time UI
                toast.success(res.data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }


    useEffect(()=>{ // YE JAB CALL HOGA JAB YE WALA PAGE OPEN HOGA 
        const fetchSingleJob= async()=>{
            try {
                const res=await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{
                    withCredentials:true
                });

                console.log('PRINTING RES FROM fetchSingleJob',res.data.job.applications);

                if(res.data.success){
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(applications=>applications.applicant===user?._id));

                    // console.log("All applicant",res.data.job.applications.some(applications=>applications.applicant));

                    // console.log("userID",user._id);
                    // console.log("isApplied",isApplied)
                }

                console.log("Single Job",singleJob)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob();
    },[jobId,dispatch,user?.id])

    return (
        <div>
            <Navbar />
            <div className='max-w-[1100px] mx-auto mt-5 px-3'>
                <div className='flex justify-between items-center'>
                <div >
                    <h1 className='font-bold text-lg'>{}</h1>
                    <div className='flex items-center gap-2 mt-4 '>
                        <Badge className={"text-blue-700 font-bold"} variant="ghost">{singleJob?.position} Position</Badge>
                        <Badge className={"text-[#f83002] font-bold"} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">{singleJob?.salary}L</Badge>
                    </div>
                </div>

                <Button 
                    onClick={isApplied?null:applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg hidden md:block lg:block ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}>
                        {
                            isApplied ? "Already Applied" : "Apply Now"
                        }
                </Button>
                </div>

                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
                
                <div className='my-4'>
                    <h1 className='font-bold my-1 '>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1 '>Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1 '>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1 '>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
                    <h1 className='font-bold my-1 '>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                    <h1 className='font-bold my-1 '>Total Application:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1 '>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>

                <div className='flex justify-center items-center'>
                <Button 
                    onClick={isApplied?null:applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg lg:hidden md:hidden  block ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}>
                        {
                            isApplied ? "Already Applied" : "Apply Now"
                        }
                </Button>

                </div>

                
                
                    
            </div>

            

        </div>
    )
}
