import React, { useEffect } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {setAllJobs} from "../redux/jobSlice.js"
import { COMPANY_API_END_POINT } from '../constant';
import { setSingleCompany } from '../redux/companySlice.js';



 function useGetCompanyById(companyId) {
    // console.log("company Id inside useGetCompany Hook",companyId);
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchCompany= async()=>{
            try {
                const res=await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{
                    withCredentials:true
                });
                dispatch(setSingleCompany(res.data.company));

                console.log('PRINTING RES FROM USE_GET_ALL_JOBS',res);

                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
 
            } catch (error) {
                console.log(error)
            }
        }
        fetchCompany();
    },[companyId,dispatch])
    
}


export default useGetCompanyById;