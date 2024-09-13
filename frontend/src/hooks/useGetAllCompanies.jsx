import React, { useEffect } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { setAllJobs } from '../redux/jobSlice.js'
import { COMPANY_API_END_POINT } from '../constant';
import { setAllCompany } from '../redux/companySlice.js';



 function useGetAllCompanies() {
    // console.log("company Id inside useGetCompany Hook",companyId);
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchAllCompany= async()=>{
            try {
                const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{
                    withCredentials:true
                });

                dispatch(setAllCompany(res.data.companies));
                // console.log('useGetAllCompanies',res);

                // if(res.data.success){
                //     dispatch(setAllJobs(res.data.jobs))
                // }
 
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllCompany();
    },[])
    
}


export default useGetAllCompanies;