import React, { useState } from 'react'
import Navbar from '../components/ui/common/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '../constant'
import { toast } from "sonner"
import { setLoading } from '../redux/authSlice'
import { useNavigate } from 'react-router-dom'


const companyArr = [];

export default function PostJobs() {
    const { allCompany } = useSelector((store) => store.company);
    const { loading } = useSelector((store) => store.auth)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    // console.log(allCompany)

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: 0,
        position: 0,
        companyId: ""
    });


    const changeHandler = ((e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    })


    const selectChangeHandler = (e) => {
        const selectedCompany = e.target.value
        // console.log(selectedCompany)
        setInput({ ...input, companyId: selectedCompany });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input)
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs")

            }

            console.log(res)

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }finally{
            dispatch(setLoading(false))
        }

    }


    return (
        <div>
            <Navbar />
            <div className='max-w-[500px] flex justify-center items-center gap-6 my-5 mx-auto'>

                <form className='p-8 w-full border border-gray-200 shadow-lg rounded-md' onSubmit={submitHandler}>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className='w-full'>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                onChange={changeHandler}
                                value={input.title}
                                className=" focus-visible:ring-offset-0 focus-visible:ring-0 " />
                        </div>

                        <div className='w-full'>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                onChange={changeHandler}
                                value={input.description}
                                className=" focus-visible:ring-offset-0 focus-visible:ring-0 " />
                        </div>

                        <div className='w-full'>
                            <Label>Requirement</Label>
                            <Input
                                type="text"
                                name="requirements"
                                onChange={changeHandler}
                                value={input.requirements}
                                className=" focus-visible:ring-offset-0 focus-visible:ring-0 " />
                        </div>

                        <div className='w-full'>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                onChange={changeHandler}
                                value={input?.salary}
                                className=" focus-visible:ring-offset-0 focus-visible:ring-0 " />
                        </div>

                        <div className='w-full'>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                onChange={changeHandler}
                                value={input.location}
                                className=" focus-visible:ring-offset-0 focus-visible:ring-0 " />
                        </div>

                        <div className='w-full'>
                            <Label>JobType</Label>
                            <Input
                                type="text"
                                name="jobType"
                                onChange={changeHandler}
                                value={input.jobType}
                                className=" focus-visible:ring-offset-0 focus-visible:ring-0 " />
                        </div>

                        <div className='w-full'>
                            <Label>experience</Label>
                            <Input
                                type="number"
                                name="experience"
                                onChange={changeHandler}
                                value={input?.experience}
                                className=" focus-visible:ring-offset-0 focus-visible:ring-0 " />
                        </div>

                        <div className='w-full'>
                            <Label>Position</Label>
                            <Input
                                type="number"
                                name="position"
                                onChange={changeHandler}
                                value={input.position}
                                className=" focus-visible:ring-offset-0 focus-visible:ring-0 " />
                        </div>
                        {
                            // allCompany.length > 0 && (
                            //     <div className='border border-gray-200 rounded-md w-full p-2 group'>
                            //         <div className='flex justify-center items-center'>
                            //             <label htmlFor="dropdown" className="text-sm font-medium text-gray-700 px-5">Company:</label>

                            //             <select id="dropdown" value={input.company} onChange={selectChangeHandler}>
                            //                 {/* Placeholder option, no company selected */}
                            //                 <option value="" disabled>Select a company</option>

                            //                 {/* Map through companies */}
                            //                 {allCompany.map((e, i) => {
                            //                     return <option key={i} value={e._id}>{e.name}</option>
                            //                 })}
                            //             </select>
                            //         </div>
                            //     </div>
                            // )
                            allCompany.length > 0 && (
                                <div className='border border-gray-200 rounded-md w-full p-2 group col-span-2'>
                                    <div className='flex justify-center items-center'>
                                        <label htmlFor="dropdown" className="text-md font-medium text-gray-700 px-5">Select a Company:</label>

                                        <select
                                            id="dropdown"
                                            value={input.companyId}
                                            onChange={selectChangeHandler}
                                            className="hover:cursor-pointer"
                                        >
                                            <option value="" disabled >Company List</option>
                                            {
                                                allCompany.map((company) => (
                                                    <option key={company._id} value={company._id}>
                                                        {company.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            )

                            
                        }


                    </div>



                    {
                        loading ? (
                            <Button className="w-full mt-3">Please Wait</Button>
                        ) : allCompany.length === 0 ? (
                            <p className='text-xs text-red-600 font-bold my-3 text-center'>
                                *Register a company first, before posting a job
                            </p>
                        ) : (
                            <Button type="submit" className="w-full mt-3">Post New Job</Button>
                        )

                    }
                </form>



            </div>
        </div>
    )
}
