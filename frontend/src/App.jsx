import { useState } from 'react'
import Home from './components/ui/Home'
import LoginPage from './components/Auth/LoginPage'
import SignPage from './components/Auth/SignupPage'
import Jobs from './components/Jobs'
import Profile from './components/profile'
import JobDescription from './components/JobDescription'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Browse from './components/Browse'
import Companies from './admin/Companies'
import CreateCompany from './admin/CreateCompany'
import CompanySetup from './admin/CompanySetup'
import AdminJobs from './admin/adminJobs'
import PostJobs from './admin/PostJobs'
import Applicants from './admin/Applicants'
import ProtectedRoute from './admin/protectedRoute'

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Home/>,
    },

    {
      path: "/login",
      element:<LoginPage/>,
    },

    {
      path: "/signup",
      element:<SignPage/>,
    },

    {
      path: "/jobs",
      element:<Jobs/>,
    },

    {
      path:"description/:id",
      element:<JobDescription/>
    },

    {
      path: "/browse",
      element:<Browse/>,
    },
    {
      path: "/profile",
      element:<Profile/>,
    },

    //NOW FOR ADMIN 

    {
      path:"/admin/companies",
      element:<ProtectedRoute><Companies/></ProtectedRoute>
    },

    {
      path:"/admin/companies/create",
      element:<ProtectedRoute><CreateCompany/></ProtectedRoute>
    },
    
    {
      path:"/admin/companies/:id",
      element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
    },
    {
      path:"/admin/jobs",
      element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
    },
    {
      path:"/admin/job/create",
      element:<ProtectedRoute><PostJobs/></ProtectedRoute>
    },
    {
      path:"/admin/jobs/:id/applicants",
      element:<ProtectedRoute><Applicants/></ProtectedRoute>
    },

  ]);
  
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
