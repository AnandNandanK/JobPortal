import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Ellipsis, Check, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../constant';
import { toast } from 'sonner';



export default function ApplicantsTable() {

    const { applicants } = useSelector((store) => store.application);
    console.log("Applicants", applicants);

    const shortListingStatus = ['Accepted','Rejected']

    const statusHandler = async(status,id)=>{
        try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
            console.log(res)
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            // toast.error(error.message)
            console.log(error)

        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent Applied user</TableCaption>
                <TableHeader>

                    <TableRow>
                        <TableHead className="w-[100px]">FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>

                </TableHeader>

                <TableBody>
                    {
                      !applicants?<p>NO applicants found</p>:  applicants.map((e, i) => {
                           return <TableRow key={i}>
                                <TableCell className="font-medium">{e.applicant.fullname}</TableCell>
                                <TableCell>{e?.applicant?.email}</TableCell>
                                <TableCell>{e?.applicant?.phoneNumber}</TableCell>
                                <TableCell><a href={e?.applicant?.profile?.resume} target='blank'>{e?.applicant?.profile?.resume?<p className="text-blue-500 hover:underline font-semibold">{e?.applicant?.fullname} Resume</p>:"No Resume Found"}</a></TableCell>
                                <TableCell>{e?.applicant?.createdAt.split("T")[0]}</TableCell>{/* [0] in split("T")[0] is associated with the split method.*/}
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger><Ellipsis /></PopoverTrigger>
                                        <PopoverContent className="w-32 flex flex-col gap-3">
                                            {
                                                shortListingStatus.map((elem, i) => {
                                                    return (
                                                        <p onClick={()=>statusHandler(elem,e?._id)} className='flex gap-3 hover:cursor-pointer items-center font-semibold' key={i}>{elem}
                                                            <span>{elem == "Accepted" ? <Check className="text-green-400 text-sm" /> : <X className='text-red-600 text-sm' />}</span>
                                                        </p>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
