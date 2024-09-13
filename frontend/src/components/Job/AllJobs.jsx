import React from 'react'
import { Button } from "@/components/ui/button"
import { FaRegBookmark } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom';


export default function AllJobs({jobs}) {

// console.log(jobs)

    const navigate = useNavigate();
    const daysAgofunction = (mongoDbtime) => { //mongoDB created At time
        const createdAt = new Date(mongoDbtime);
        const currentTime = new Date();
        const timeDiffecrence = currentTime - createdAt;
        return Math.floor(timeDiffecrence / (1000 * 24 * 60 * 60))
    }

    return (
        <div className='p-5 rounded-md shadow-lg bg-white border border-gray-200 z-0'>
            <div className="flex items-center justify-between">
                <p className='text-sm text-gray-500 '>{daysAgofunction(jobs?.createdAt) === 0 ? "Today" : `${daysAgofunction(jobs?.createdAt)} day ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><FaRegBookmark /></Button>

            </div>


            <div className='flex items-center gap-2 my-2 '>
                <Button className="p-6 " variant="outline" size="icon">
                    <Avatar className="">
                        <AvatarImage src={jobs?.company?.logo} className=""></AvatarImage>
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-md text-lg '>{jobs?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{jobs?.location}</p>
                </div>
            </div>

            <div className=''>
                <h1 className='font-semibold text-lg my-2 '>{jobs?.title}</h1>
                <p className='text-sm text-gray-600'>{jobs?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 '>
                <Badge className="text-blue-700 font-bold text-center " variant="ghost">{jobs?.position} Position</Badge>
                <Badge className="text-[#f83002] font-bold text-center" variant="ghost">{jobs?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold text-center" variant="ghost">{jobs?.salary}</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button className=" " variant="outline" onClick={() => navigate(`/description/${jobs?._id}`)}>Details</Button>
                <Button className="bg-[#7209b7] text-white" >save For Leter</Button>
            </div>
        </div>
    )
}
