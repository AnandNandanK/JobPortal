import Application from "../models/application.js";
import Job from "../models/jobmodel.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "JOb is is required.",
                success: false
            })
        }


  const existingApplication = await Application.findOne({ job: jobId, applicant: userId })

        if (existingApplication) {
            return res.status(400).json({
                message: "YOu have already applied for jobs",
                success: false
            })
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message: "Job Applied Successfully",
            success: true

        })
    } catch (error) {
        console.log(error)
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 })
            .populate({
                path:"job", 
                options:{sort:{createdAt:-1}},
                populate:({
                    path:"company",
                    options:{sort:{createdAt:-1}}
                })
            })

            if(!application){
                return res.status(404).json({
                    message:"Application is not fetched",
                    success:false
                })
            }

            return res.status(200).json({
                message:"Application fethced Successfully",
                application,
                success:true
            })
    } catch (error) {
        console.log(error)
    }
}


//Admin dekhega kitne user ne apply kiya hai 
export const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        console.log(jobId);

        const job= await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })
         
        if(!job){
            return res.status(404).json({
                message:"job Not Found",
                success:false
            })
        };

        return res.status(200).json({
            job,
            success:true
        });

    } catch (error) {
        console.log(error)
    }
}


export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        console.log(status,applicationId)

        if(!status){
            return res.status(400).json({
                message:"status is required",
                sucess:false
            })
        }
        
        //FINDING THE APPLICATION BY APPLICATION ID
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Aplicatin not found.",
                success:false
            })
        }

        application.status=status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Application Updated successfully",
            application,
            success:true

        })
    } catch (error) {
        console.log(error)
    }
}