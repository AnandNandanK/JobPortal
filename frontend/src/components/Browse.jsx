
import Navbar from './ui/common/Navbar'
import React, { useEffect } from 'react'
import AllJobs from './Job/AllJobs'
import { useSelector,useDispatch } from 'react-redux'
import useGetAlljobs from '../hooks/useGetAlljobs'
import { setSearchQuery } from '../redux/jobSlice'
import { motion } from "framer-motion"
// const randomJobs = [1, 2,3,5,6,7]

export default function Browse() {
  useGetAlljobs();
  const {allJobs}=useSelector((store)=>store.job)
  // console.log(allJobs)
     const dispatch = useDispatch();

    useEffect(()=>{
        return ()=>{
            dispatch(setSearchQuery(""));
        }
    },[])
    
    
  return (
    <div className='max-w-[1100px] mx-auto px-3 overflow-y-hidden'>
      <Navbar />

      <div className='max-w-[1100px] mx-auto mt-5 px-2'>
        <h1 className='font-bold text-xl my-10'>
          Search Result ({allJobs.length})
        </h1>

        <div className='grid lg:grid-cols-3 gap-4 mt-3 grid-cols-1 md:grid-cols-2'>
          {
            allJobs.length <= 0 ? <p className='col-span-3 text-center'>Jobs not Found</p>:
            allJobs.map((jobs, i) => {
              return (
                <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}

                >
                  <AllJobs key={i} jobs={jobs} />
                </motion.div>
                
              )
            })
          }

        </div>

      </div>
    </div>

  )
}
