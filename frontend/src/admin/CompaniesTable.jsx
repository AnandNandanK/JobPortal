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




export default function CompaniesTable() {
    const {allCompany, getCompanyByText} = useSelector((store) => store.company);
    const navigate=useNavigate()

    const [filterCompany,setFilterCompany]=useState(allCompany);



    useEffect(()=>{
        console.log("called UseEffect")
        const filteredCompany=allCompany.filter((company)=>{
            if (!getCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(getCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany);
    },[getCompanyByText,allCompany])

    // console.log("Filter Company",filterCompany);

    // console.log("getCompanyByText",getCompanyByText)
    // console.log("singleCompany",singleCompany);
    // console.log("allCompany", allCompany);

    return (
        <div className='mt-5'>
            <Table>
                <TableCaption>A list of your recent Registered Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                {
                        filterCompany.map((e, i) => {
                            return (
                                <TableBody key={e._id}>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <Avatar>
                                                <AvatarImage src={e.logo} />
                                            </Avatar>
                                        </TableCell>
    
                                        <TableCell>{e.name}</TableCell>
                                        <TableCell>{e.createdAt.split("T")[0]}</TableCell>
    
                                        <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger><Ellipsis /></PopoverTrigger>
                                                <PopoverContent className="flex gap-3 w-40 items-center hover:cursor-pointer" onClick={()=>navigate(`/admin/companies/${e._id}`)} > 
                                                    <Pencil />
                                                    <span>Edit</span>
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
