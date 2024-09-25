import React, { useEffect, useState } from 'react';
import Navbar from './ui/Navbar';
import AllJobs from './Job/AllJobs';
import FilterCard from './Job/FilterCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/jobSlice';
import { IoFilterSharp } from "react-icons/io5";
import { motion } from "framer-motion"

export default function Jobs() {

  const [openFilter, setOpenFilter] = useState(false);
  console.log(openFilter)

  // Destructure allJobs and searchQuery from Redux state
  const { allJobs, searchQuery } = useSelector(store => store.job);

  // Initialize filterJobs as an empty array
  const [filterJobs, setFilterJobs] = useState([]);

  // useEffect to filter jobs based on searchQuery
  useEffect(() => {
    console.log("QUERY STRING", searchQuery);
    console.log("All Jobs", allJobs);

    if (searchQuery) {
      // Use a filtered copy of allJobs to update filterJobs
      const filteredData = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilterJobs(filteredData);
    } else {
      // Reset filterJobs to allJobs when searchQuery is cleared
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]); // Effect runs when allJobs or searchQuery changes

  const dispatch = useDispatch();

  // Clear searchQuery when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery("")); // Reset search query when leaving the page
    };
  }, [dispatch]);

  const handleOverlayClick = (e) => {
    // Close the dialog if the click is outside the content area
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };


  return (
    <div className='max-w-[1100px] mx-auto px-3 overflow-y-hidden relative'>
      <Navbar />

      <div className='py-2 font-sans font-bold md:hidden items-center gap-3 hover:cursor-pointer flex' onClick={() => setOpenFilter(!openFilter)}>
        <span><IoFilterSharp /></span>Filter JObs
      </div>

      <div className='flex gap-6 mt-6 relative' >

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          
          onClick={handleOverlayClick}
          className={`w-[20%]  ${openFilter ? "z-30 absolute left-3 top-1 right-0 bottom-0 md:block w-[40%] text-sm" : ("hidden md:block")} `}>
          <FilterCard  />
        </motion.div>



        {
          filterJobs.length <= 0 ? <p className='text-center '>Jobs not Found</p> :

            <div className='flex-1 h-[88vh] overflow-y-auto pb-5 z-0'>
              <div className='grid lg:grid-cols-3 gap-4 sm:grid-cols-2 grid-cols-1 z-0'>

                {
                  filterJobs.map((jobs, i) => {
                    return <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AllJobs jobs={jobs} key={i} />

                    </motion.div>

                  })
                }
              </div>
            </div>
        }
      </div>
    </div>
  );
}
