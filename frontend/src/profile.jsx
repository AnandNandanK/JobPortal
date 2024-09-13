import React from 'react'
import Navbar from './components/ui/common/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Contact, Mail, Pen, Pencil } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import AppliedJobTable from './components/AppliedJobTable';
import { useState } from 'react';
import UpdateProfileDialouge from './components/UpdateProfileDialouge';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from './hooks/useGetAppliedJobs';

// const skills=["HTML","CSS","React.js","Node.js","FullStack"]
const resume = true;


export default function profile() {
    useGetAppliedJobs();

    const { user } = useSelector((state) => state.auth);
    console.log("Printing User",user)

    const [open, setOpen] = useState(false);

    // console.log("Printing User",user)

    return (
        <div>
            <Navbar></Navbar>

            <div className='relative px-2 max-w-[1100px] mx-auto'>

                <div className=' bg-white border border-gray-200 rounded-2xl my-5 p-8 '>

                    <div className='flex justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="w-24 h-24">
                                <AvatarImage alt="profile image" src={`${user?.profile?.profilePhoto}`}></AvatarImage>
                            </Avatar>

                            <div>
                                <h1 className='font-medium'>{user?.fullname}</h1>
                                <p>{user?.profile.bio}</p>
                            </div>
                        </div>

                        <Button variant="outline" onClick={() => setOpen(true)}  ><Pen /></Button>
                    </div>


                    <div className='my-5 '>
                        <div className='flex items-center gap-3 my-2'>
                            <Mail></Mail>
                            <span>{user?.email}</span>
                        </div>

                        <div className='flex items-center gap-3 my-2'>
                            <Contact ></Contact>
                            <span>{user?.phoneNumber}</span>
                        </div>

                        <div className='my-4 flex  gap-2'>
                            <h1 className='font-bold'>Skills:</h1>
                            <div className='flex gap-4 flex-wrap'>
                                {

                                    user?.profile.skills.length != 0 ? (
                                        user?.profile.skills.map((e, i) => {
                                            return (
                                                <Badge key={i} >{e}</Badge>
                                            );

                                        })

                                    ) : (
                                        <span>NA</span>
                                    )

                                }
                            </div>
                        </div>

                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            {
                                resume ? <div className='flex gap-3 items-center'>
                                    <h1 className="font-bold text-3 ">Resume: </h1>
                                    <a download={user?.profile?.resumeOriginalname} className="mr-5 text-blue-700 hover:underline" target='blank' href={user?.profile?.resume}>
                                        {user?.profile?.resumeOriginalname
                                        }
                                    </a>

                                </div>
                                    : <span>NA</span>
                            }


                        </div>

                    </div>

                </div>

                <div className='max-w-4xl mx-auto'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    <AppliedJobTable />

                </div>

                <UpdateProfileDialouge open={open} setOpen={setOpen} />

            </div>
        </div>
    )
}
