import { set } from "mongoose";
import { setLoading } from "../../frontend/src/redux/authSlice.js";
import Job from "../models/jobmodel.js";

export const postJob=async(req,res)=>{
    try {
        const  {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId=req.id;


        console.log(title,description,requirements,salary,location,jobType,experience,position,companyId)

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        const job=await Job.create({
            title,
            description,
            requirements:requirements.split(','),
            salary:Number(salary),
            location,
            jobType,
            experience,
            position,
            company:companyId,
            createdBy:userId
        })

        return res.status(201).json({
            message:"New Job Created successfully",
            success:true,
            job
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } }, // Case-insensitive regex for title
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        // Check if no jobs found
        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        // Success response
        return res.status(200).json({
            message: "Jobs fetched successfully",
            jobs,
            success: true
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};



export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });

        if(!job){
            return res.status(404).json({
                message:"Jobs not Found. ",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}


export const getAdmidJobs=async(req,res)=>{
    try {
        
        const adminId=req.id;
        const jobs = await Job.find({createdBy:adminId}).sort({ createdAt: -1 }).populate({
            path:"company",
            options:{sort:{createdAt:-1}}
        })

        if(!jobs){
            return res.status(404).json({

                message:"Jobs are not found",
                success:false
            })
        }
        
        return res.status(200).json({
            message:"Jobs by admin fetched successfully",
            jobs
        })
    } catch (error) {
        console.log(error)
    }
}