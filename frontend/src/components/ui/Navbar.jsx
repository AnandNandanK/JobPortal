import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../../constant.js';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from '../../redux/authSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion"


export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    // console.log(open)

    const { user } = useSelector((state) => state.auth);
    // console.log(user.role)
    // console.log("user",user)

    const logoutHandler = async (e) => {
        try {

            console.log("clicked on LOGOUTHANDLER")
            
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })

            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
            
            console.log(res);

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }


    return (
            <div className="flex items-center justify-between h-16 gap-3 relative bg-white px-2 max-w-[1100px] mx-auto">

                <div>
                    <Link to="/">  <h1 className='text-2xl font-bold text-center'>Job
                        <span className="text-[#f83002]">Portal</span>
                    </h1></Link>

                </div>


                <div className=" items-center gap-5 md:flex hidden ">
                    <ul className="flex font-medium gap-5">
                        {
                            user?.role === "recruiter" ? (<>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>) : (<>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/Browse">Browse</Link></li>
                            </>)
                        }

                    </ul>

                    {
                        !user ? (
                            <>
                                <div className='flex gap-2 ml-4'>

                                    <Link to={"/login"}><Button variant="outline" className="">Login</Button> </Link>
                                    <Link to={"/signup"}> <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] ">Signup</Button> </Link>

                                </div>

                            </>

                        ) : (

                            <Popover >
                                <PopoverTrigger asChild>

                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={`${user.profile.profilePhoto}`} alt="@shadcn"></AvatarImage>
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80  mr-5 flex gap-5 items-center">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={`${user.profile.profilePhoto}`} alt="@shadcn"></AvatarImage>
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>

                                        <div className="flex gap-1 mt-3 flex-col">
                                            <div className='flex gap-5'>
                                                <User className=" stroke-[2px] size-[21px]" />
                                                <a className=" hover:underline text-black  hover:cursor-pointer transition-all ease-in-out"><Link to={'/profile'}>View Profile</Link></a>
                                            </div>

                                            <div className='flex gap-5 hover:cursor-pointer' >
                                                <LogOut className=" stroke-[2px] size-[21px]" /><a className=" hover:underline text-black  hover:cursor-pointer transition-all ease-in-out" onClick={logoutHandler}>Logout</a>
                                            </div>

                                        </div>

                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>


                <GiHamburgerMenu className='lg:hidden md:hidden sm:block' onClick={() => setOpen(!open)} />
                {
                    open &&

                    <motion.div
                    
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{opacity:0, x:-100}}
                    transition={{duration:0.3}}
                    
                    className=' bg-white border lg:hidden md:hidden sm:block  border-gray-100 absolute right-0 top-14 rounded-lg shadow-lg gap-2 p-4 z-50 flex flex-col w-64'>
                        {
                            user && 
                            <div className='py-2'>
                                <Link to={'/profile'} className='flex items-center gap-2 flex-col justify-center '>
                                    <img src={user?.profile?.profilePhoto} className='rounded-full size-11 border border-gray-300' />
                                    <p>{user?.email}</p>
                                    {/* <p>{user?.profile?.bio}</p> */}
                            </Link>
                        </div>
                        }

                        <ul className='flex flex-col font-semibold gap-1 pl-1'>
                        {
                            user?.role === "recruiter" ? (<>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>) : (<>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/Browse">Browse</Link></li>
                            </>)
                        }
                            {
                                user && <>
                                   
                                    <li className='flex gap-3 items-center'><Link onClick={logoutHandler}>logout</Link><LogOut className=" stroke-[2px] size-[18px]" /></li>
                                </>
                            }

                            {
                                !user && <>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/signup">Signup</Link></li>
                                </>
                            }

                        </ul>

                    </motion.div>


                }









            </div>

        
    )
}
