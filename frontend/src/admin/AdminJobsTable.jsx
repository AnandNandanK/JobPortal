import React, { useEffect, useState } from 'react'
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Ellipsis, Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';


export default function AdminJobsTable() {
    // useGetAllAdminJobs(); //no need to call here

    const {allAdminJobs,searchJobByText} = useSelector((store) => store.job);

    console.log("allAdminJobs",allAdminJobs)

    const navigate=useNavigate()

    const [filterJob,setFilterJob]=useState(allAdminJobs);

    useEffect(()=>{
        // console.log("called UseEffect")
        const filteredJobs=allAdminJobs.filter((allCompany)=>{
            if (!searchJobByText) {
                return true;
            }
            return allCompany?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || allCompany?.title.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJob(filteredJobs);
    },[searchJobByText,allAdminJobs])


    // console.log("filterJob",filterJob);

    // console.log("Filter Company",filterCompany);
    // console.log("getCompanyByText",getCompanyByText)
    // console.log("singleCompany",singleCompany);
    // console.log("allCompany", allCompany);

    return (
        <div className='mt-5'>
            <Table>
                <TableCaption>A list of your recent Posted Jobss</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                {
                        filterJob?.map((e, i) => {
                            return (
                                <TableBody key={e._id}>
                                    <TableRow>
                                    
                                        <TableCell>{e?.company?.name}</TableCell>
                                        <TableCell>{e.title}</TableCell>
                                        <TableCell>{e.createdAt.split("T")[0]}</TableCell>
    
                                        <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger><Ellipsis /></PopoverTrigger>
                                                <PopoverContent className="flex flex-col gap-3 w-40 "  > 
                                                    <div className='flex gap-3 items-center hover:cursor-pointer' onClick={()=>navigate(`/admin/jobs/${e._id}`)}>
                                                    <Pencil  className='w-4'/>
                                                    <span>Edit</span>
                                                    </div>

                                                    <div className='flex gap-3 items-center hover:cursor-pointer' onClick={()=>navigate(`/admin/jobs/${e._id}/applicants`)}>
                                                        <Eye className='w-4'></Eye>
                                                        <span>Applicants</span>
                                                    </div>
                                                </PopoverContent>
                                                
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        })
                }
            </Table>
        </div>
    )
}
