import React, { useEffect } from 'react'
import axios from 'axios'
import {JOB_API_END_POINT } from '../constant';
import {useDispatch, useSelector} from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice.js';


export default function useGetAllAdminJobs() {

    const dispatch=useDispatch()
    const {allAdminJobs} = useSelector(store => store.job)
    // console.log(allAdminJobs)

    useEffect(()=>{
        const fetchAllAdminJobs= async()=>{
            try {
                const res=await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{
                    withCredentials:true
                });

                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
                
                console.log('fetchAllAdminJobs',res);
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllAdminJobs();
    },[])
}
