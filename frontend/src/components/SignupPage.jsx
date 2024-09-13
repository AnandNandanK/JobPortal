import React, { useEffect, useState } from 'react';
import Navbar from './ui/common/Navbar';
import axios from "axios";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import {USER_API_END_POINT} from "../constant.js"
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { setLoading } from '../redux/authSlice.js';
import { Input } from "@/components/ui/input"

import { useDispatch, useSelector } from 'react-redux';


export default function SignupPage() {
    const dispatch=useDispatch();

    const {user}=useSelector((store)=>store.auth)

    const loading=useSelector((state)=>{return state.auth.loading})
    console.log("Loading state in SignupPage:", loading);

    const navigate=useNavigate();


    const [inputField, setInputField] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const changeHandler = (e) => {
        setInputField({ ...inputField, [e.target.name]: e.target.value });
    }

    const fileHandler = (e) => {
        setInputField({ ...inputField, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname",inputField.fullname)
        formData.append("email",inputField.email)
        formData.append("phoneNumber",inputField.phoneNumber)
        formData.append("password",inputField.password)
        formData.append("role",inputField.role);
        
        if (inputField.file) {
            formData.append('file',inputField.file)
        }

        // console.log(formData)
        
        // for (const key in inputField) {
        //     formData.append(key, inputField[key]);
        // }
        // console.log(...formData)

        console.log([...formData]);
        
        try {
            dispatch(setLoading(true))

            const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            console.log("Printing Res",res)

            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
            console.log(res.data.success);

        } catch (error) {
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            console.error(error);
            console.log("Loading state in SignupPage:", loading);
        }finally{
            dispatch(setLoading(false))
            console.log("Loading state in SignupPage:", loading);
            
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        };
    },[]);

    return (
        <div className='max-w-[1100px] mx-auto px-3 overflow-y-hidden'>
            <Navbar />
            <div className='lg:max-w-[1100px] flex items-center justify-center mx-auto'>
                <form onSubmit={submitHandler} className='lg:w-[50%] border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                    <div className='flex flex-col gap-1'>
                        <label className="font-semibold">Full Name</label>
                        <input
                            type='text'
                            placeholder='    Enter your full name'
                            className='border rounded-sm h-8'
                            value={inputField.fullname}
                            name='fullname'
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='flex flex-col gap-1 mt-2'>
                        <label className="font-semibold">Email</label>
                        <input
                            type='text'
                            placeholder='    Enter your email address'
                            className='border rounded-sm h-8'
                            value={inputField.email}
                            name='email'
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='flex flex-col gap-1 mt-3'>
                        <label className="    font-semibold">Phone Number</label>
                        <input
                            type='text'
                            placeholder='    Enter your phone number'
                            className='border rounded-sm h-8'
                            value={inputField.phoneNumber}
                            name='phoneNumber'
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='flex flex-col gap-1 mt-3 mb-3'>
                        <label className="font-semibold">Password</label>
                        <input
                            type='password'
                            placeholder='    Enter your password'
                            className='border rounded-sm h-8'
                            value={inputField.password}
                            name='password'
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='flex items-center justify-between flex-col gap-3'> 

                        <RadioGroup className="flex gap-5 items-center">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    className="cursor-pointer"
                                    value="student"
                                    checked={inputField.role === "student"}
                                    onChange={changeHandler}
                                />
                                <Label htmlFor="role-student">Student</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    checked={inputField.role === "recruiter"}
                                    onChange={changeHandler}
                                />
                                <Label htmlFor="role-recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-3'>
                            <Label>Profile_Photo</Label>
                            <Input
                                accept="image/*"
                                type='file'
                                className="cursor-pointer border rounded-sm "
                                onChange={fileHandler}
                            />
                        </div>
                    </div>

                    {
                    loading?<Button className="w-full my-4"><Loader2 className='mr-2 h-4 animate-spin my-4'></Loader2>Please wait</Button>:<Button type="submit" className="w-full my-4">SignUp</Button>}
                    <span className="text-blue-600 text-sm hover:cursor-pointer">
                        Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}
