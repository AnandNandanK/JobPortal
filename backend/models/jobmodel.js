import mongoose  from "mongoose";


const jobSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    requirements:[{
        type:String
    }],

    location:{
        type:String,
        required:true
    },

    salary:{
        type:Number,
        required:true
    },

    jobType:{
        type:String,
        required:true
    },

    position:{
        type:Number,
        required:true
    },

    company:{
        type:mongoose.Schema.ObjectId,
        ref:"Company",
        required:true
    },

    experience:{
        type:Number,
        required:true
    },

    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },

    applications:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Application"
        }
    ]

},{timestamps:true})

const Job=mongoose.model("Job",jobSchema);

export default Job;