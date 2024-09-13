import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux';


  

export default function AppliedJobTable() {
    const {allAppliedJob} = useSelector((state) => state.job);
    console.log("All APPLIED JOB...",allAppliedJob);

  return (
    <div>
        <Table>
            <TableCaption>A list of applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJob?.map((data,i)=>{
                       return (
                        <TableRow key={i}>
                        <TableCell>{data?.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{data?.job?.title}</TableCell>
                        <TableCell>{data?.job?.company?.name}</TableCell>
                        <TableCell className="text-right"><Badge className={`${data?.status==="rejected"?"bg-red-500":data.status==="pending"?"bg-gray-300":"bg-green-500"}`}>{data?.status}</Badge></TableCell>
                    </TableRow>
                       )
                    })
                }
            </TableBody>
        </Table>
    </div>
  )
}
