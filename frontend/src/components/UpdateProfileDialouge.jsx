import React, { useState } from 'react';
import { CircleX } from 'lucide-react';
import { setLoading, setUser } from '../redux/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { USER_API_END_POINT } from "../constant.js"
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';



export default function UpdateProfileDialouge({ open, setOpen }) {

    const { user,loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const handleOverlayClick = (e) => {
        // Close the dialog if the click is outside the content area
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };


    //   console.log("Printing User in UdateProfile Component ",user)

    const [input, setInput] = useState({
        fullname: user?.fullname || '',  //HAMESHA DEFAULT VALUE DE DIYA KARO LIKE '' WARNA WO UNCONTROLLED HO JAYEGA
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills || '',
        file: null // Start with no file selected
    });

    const changeEventHandler = ((e) => {
        e.preventDefault();
        setInput({ ...input, [e.target.name]: e.target.value })
    })

    const submitHandler = (async (e) => {
        e.preventDefault();
        console.log(input);

        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.file) formData.append("file", input.file);

        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }

        // console.log("Printing formData......",[...formData])

        try {

            dispatch(setLoading(true));
             
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            if (res.data.success) {
                dispatch(setUser(res.data.user)) //user wale state ko change karenge 
                toast.success(res.data.message)
            }

            console.log(res)

            

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            dispatch(setLoading(false));
        }
        setOpen(false)

    })

    const fileHandler = ((e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    })


    return (
        <div
            onClick={handleOverlayClick}
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-300 ease-in-out 
        ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100px] pointer-events-none '}`}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg lg:w-[400px] w-11/12">
                <div className='flex justify-between'>
                    <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                    <CircleX onClick={() => setOpen(false)} className="hover:cursor-pointer hover:text-red-600 transition-all duration-400 ease-in-out" />
                </div>


                <form className='flex flex-col justify-center items-center' onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4 '>
                        <div className=' grid grid-cols-4 items-center gap-4 '>

                            <label className='font-bold text-right' htmlFor='name'>Name</label>
                            <input
                                type='text'
                                id='name'
                                className='border border-gray-600 rounded-sm h-8 col-span-3 px-3'
                                name='fullname'
                                onChange={changeEventHandler}
                                value={input.fullname}
                            />
                        </div>



                        <div className=' grid grid-cols-4 items-center gap-4 '>

                            <label className='font-bold text-right' htmlFor='name'>Email</label>
                            <input
                                type='email'
                                id='name'
                                className='border border-gray-600 rounded-sm h-8 col-span-3 px-3'
                                name='email'
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                        </div>



                        <div className=' grid grid-cols-4 items-center gap-4 '>

                            <label className='font-bold text-right' htmlFor='name'>Number</label>
                            <input
                                type='text'
                                id='name'
                                className='border border-gray-600 rounded-sm h-8 col-span-3 px-3'
                                name='phoneNumber'
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                            />
                        </div>



                        <div className=' grid grid-cols-4 items-center gap-4 '>

                            <label className='font-bold text-right' htmlFor='name'>Bio</label>
                            <input
                                type='text'
                                id='bio'
                                className='border border-gray-600 rounded-sm h-8 col-span-3 px-3'
                                name='bio'
                                value={input.bio}
                                onChange={changeEventHandler}
                            />
                        </div>



                        <div className=' grid grid-cols-4 items-center gap-4 '>

                            <label className='font-bold text-right' htmlFor='name'>Skills</label>
                            <input
                                type='text'
                                id='skills'
                                className='border border-gray-600 rounded-sm h-8 col-span-3 px-3'
                                name='skills'
                                value={input.skills}
                                onChange={changeEventHandler}
                            />
                        </div>



                        <div className=' grid grid-cols-4 items-center gap-4'>

                            <label className='font-bold text-right' htmlFor='name'>Resume</label>
                            <input
                                type='file'
                                accept="application/pdf"
                                id='name'
                                className='border rounded-sm  col-span-3 '
                                name='file'
                                onChange={fileHandler}
                                
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-[60%] my-4" disabled>
                            <Loader2 className='mr-2 h-4 animate-spin my-4' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-[60%] my-4">Update</Button>
                    )}





                </form>



            </div>
        </div>
    );
}
