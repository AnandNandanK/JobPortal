import React, { useState, useEffect } from 'react';
import Navbar from './common/Navbar';
import axios from "axios";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { USER_API_END_POINT } from "../../constant";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, user } = useSelector((state) => state.auth);

    const [inputFeild, setInputFeild] = useState({
        email: "",
        password: "",
        role: "",
    });

    const changeHandler = (e) => {
        setInputFeild({ ...inputFeild, [e.target.name]: e.target.value });
    };


    
        const submitHandler = async (e) => {
            e.preventDefault();
            try {
                dispatch(setLoading(true));
    
                const res = await axios.post(`${USER_API_END_POINT}/login`, inputFeild, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
    
                console.log("USER LOGGED IN:", res.data);
    
                if (res.data.success) {
                    dispatch(setLoading(false));
                    dispatch(setUser(res.data.user));
                    toast.success(res.data.message);
                    navigate('/');
                }
    
            } catch (error) {
                toast.error(error.response.data.message);
                console.error("Login Error:", error);
            } finally {
                dispatch(setLoading(false));
            }
        };
    


    useEffect(() => {
        if (user) {
            navigate("/")
        };
    },[]);



    return (
        <div>
            <Navbar />
            <div className='max-w-[1100px] flex items-center justify-center mx-auto overflow-y-hidden px-3'>
                <form onSubmit={submitHandler} className='w-[90%] lg:1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='flex flex-col gap-1 mt-2'>
                        <label className="font-semibold">Email</label>
                        <input
                            type='text'
                            placeholder='   Enter your email address'
                            className='border rounded-sm h-10'
                            name='email'
                            value={inputFeild.email}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='flex flex-col gap-1 mt-3 mb-3'>
                        <label className="font-semibold">Password</label>
                        <input
                            type='password'
                            placeholder='    Enter your Password'
                            className='border rounded-sm h-10'
                            name='password'
                            value={inputFeild.password}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex gap-4 items-center">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    checked={inputFeild.role === "student"}
                                    onChange={changeHandler}
                                />
                                <Label htmlFor="option-one">Student</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    checked={inputFeild.role === "recruiter"}
                                    onChange={changeHandler}
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 animate-spin my-4' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Login</Button>
                    )}

                    <span className="text-blue-600 text-sm hover:cursor-pointer">
                        Don’t have an account? <Link to="/signup" className="text-blue-400">Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}
