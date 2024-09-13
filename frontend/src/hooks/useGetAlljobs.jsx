import React, { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../constant';
import {useDispatch, useSelector} from 'react-redux'
import {setAllJobs} from "../redux/jobSlice.js"
import { toast } from 'sonner';

export default function useGetAlljobs() {


    const dispatch=useDispatch()
    const {searchQuery}=useSelector((store)=>store.job);
    
    console.log("QUERY STRING BEFOR CALLING ALL JOB FUN......",searchQuery);


    useEffect(()=>{
        const fetchAllJobs= async()=>{

            try {
                const res=await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`,{
                    withCredentials:true
                });

                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }      

                console.log(res)
                
                
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // // Handle case where no jobs are found (404)
                    // dispatch(setAllJobs([])); // Set empty array in Redux
                    console.log(error.response.data.message); // Optional: display 'No jobs found' message
                } else {
                    console.error("An error occurred:", error.message);
                }
            }
        }
        fetchAllJobs();
    },[searchQuery,dispatch])
}
