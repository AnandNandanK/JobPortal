import Company from "../models/company.js";
import getDataUri from "../config/dataURI.js";
import cloudinary from "../config/cloudinary.js"

export const registerCompany=async(req,res)=>{
        try {
            const {companyName}=req.body;
            if(!companyName){

                return res.status(400).json({
                    messagge:"Company name is required. ",
                    success:false
                })
            }

            let company=await Company.findOne({name:companyName})

            if(company){
                return res.status(400).json({
                    message:" Compnay name Should be Unique"
                })
            };

            // console.log(req);
            
            // if (req.role!="recruiter") {
            //     return res.status(400).json({
            //         message:"Lggined user is not a reccruiter "
            //     })
            // }

            company= await Company.create({
                name:companyName,
                userId:req.id
            })

            return res.status(201).json({
                message:"Company registered successfully",
                company,
                success:true
            })

        } catch (error) {
            console.log(error)
        }
}

export const getCompany=async(req,res)=>{
        try {
            const userId=req.id; //logged in user
            const companies = await Company.find({userId})

            if(!companies){
                return res.status(404).json({
                    messagge:"Companies not found.",
                    success:false
                })
            }
            return res.status(200).json({
                message:"Company fetched successfully",
                companies,
                success:true
            })
        } catch (error) {
            console.log(error)
        }
}

export const getCompanyById = async (req,res)=>{
    try {
        const companyId=req.params.id;
        const company = await Company.findById(companyId);

        if(!company){
            return res.status(404).json({
                message:"Compnay not found.",
                success:false
            })
        }

        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}


export const updateCompany = async (req,res)=>{
    try {
        const {name,description,website,location}=req.body;
        const file=req.file;
        //cloudinary

        // console.log("website name",website);
        

       if (file) {
         // cloudinary ayega idhar
         const fileUri = getDataUri(file);
         // console.log("fileURI",fileUri);
         const cloudResponse = await cloudinary.uploader.upload(fileUri?.content);
         var logo=cloudResponse?.secure_url;
       }

        const updateData={name,description,website,location,logo};

        const company= await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});

        console.log("Printing Company..",company)

        if(!company){
            return res.status(404).json({
                message:"Company Not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Company Updated Successfull",
            success:true,
            company
        })
    } catch (error) {
        console.log(error)
    }
}