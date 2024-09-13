import React, { useEffect } from 'react'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../constant';
import {useDispatch} from 'react-redux'
import {setAllAppliedJobs, setAllJobs} from "../redux/jobSlice.js"

export default function useGetAppliedJobs() {
    const dispatch=useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs= async()=>{
            try {
                const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{
                    withCredentials:true
                });

                // console.log('',res);

                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application))
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchAppliedJobs();
    },[])
}
