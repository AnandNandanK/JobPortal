import React, { useEffect, useState } from 'react'
import Navbar from '../components/ui/Navbar.jsx';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../constant';
import { toast } from "sonner"
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice.js';
import { Loader2 } from 'lucide-react';
import useGetCompanyById from '../hooks/useGetCompanyById.jsx';





export default function CompanySetup() {
    const params=useParams();
    const companyId=params.id
    useGetCompanyById(companyId);


    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {singleCompany}=useSelector((store)=>store.company)
    const loading=useSelector((store)=>store.auth.loading)

    // console.log("Printing Loading after importing",loading);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    
    

    const changeHandler = ((e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    })

    const changeFileHandler=((e)=>{
        const file=e.target.files?.[0]
        setInput({...input,file})
    })


    const submitHandler=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",input.name)
        formData.append("description",input.description)
        formData.append("website",input.website)
        formData.append("location",input.location)

        if (input?.file) {
            formData.append("file",input?.file)
        }
        // console.log(...formData)


        try { 
            dispatch(setLoading(true));
            const res=await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`,formData,{
                headers:{
                     "Content-Type": "multipart/form-data"
                },
                withCredentials:true
            });
            console.log(res)
            if(res.data.success){
            navigate("/admin/companies")
            console.log("Printing Response",res)
            toast.success(res?.data?.message);
            }
            

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message);
        }finally{
            dispatch(setLoading(false));
        }    
         
    }


    console.log("Printing SIngle Company.....",singleCompany)

    useEffect(()=>{
        setInput({
            name:singleCompany.name|| "",
            description:singleCompany.description|| "",
            website:singleCompany.website|| "",
            location:singleCompany.location|| "",
            file:singleCompany.file|| null
        })
    },[singleCompany])

    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-[1100px] mx-auto px-3 overflow-y-hidden'>

                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={()=>navigate("/admin/companies")} className="flex items-center gap-2 text-gray-500 font-semibold" variant="outline">
                            <ArrowLeft /> Back
                        </Button>
                        <h1 className='font-bold text-xl'>Set UP Company</h1>
                    </div>

                    <div className='flex flex-col gap-5 justify-center border border-gray-100 rounded-md p-5 shadow-md'>
                        <div className='grid grid-cols-2 gap-2 items-center'>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeHandler}
                            />
                       
                        
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeHandler}
                            />
                        
                        
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeHandler}
                            />
                        
                        
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeHandler}
                            />

                            <Label>File</Label>
                            <Input
                                type="file"
                                name="file"
                                // value={input?.file}
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 animate-spin my-4' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Update</Button>
                    )}

                </form>

            </div>
        </div>
    )
}
