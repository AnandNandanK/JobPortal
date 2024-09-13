import React, { useEffect } from 'react'
import LatestJobCards from './LatestJobCards'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../../redux/jobSlice';

export default function LatestJobs() {

  const {allJobs}=useSelector(store=>store.job)
  const dispatch = useDispatch();
  // console.log("All Jobs",allJobs)
  
//   useEffect(()=>{
//     return ()=>{
//         dispatch(setSearchQuery("")); /// now project is woking fine 
//     }
// },[])

  return (
    <div className='mx-auto my-20 '>
        <h1 className='text-4xl font-bold text-center lg:text-left'><span className='text-[#6a38c2]'> Latest & Top</span> Job Openings</h1>

        <div className='grid grid-cols-1 grid-rows-2 gap-4 mt-5 lg:grid-cols-3'>
            {
                allJobs?.length <=0?(<span>JOB NOT FOUND</span>): allJobs?.slice(0,6).map((job,i)=>{
                   return  <LatestJobCards key={i} job={job}/>
                })
            }
        </div>
        
    </div>
  )
}
