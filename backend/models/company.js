import mongoose, { model }  from "mongoose";

const companySchema=mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        
    },

    website:{
        type:String,
    },
    
    mobile:{
        type:Number,
        
    },

    location:{
        type:String,
    },

    logo:{
        type:String,
     
    },

    userId:{
        type:mongoose.Schema.ObjectId,
        required:true
    }

},{timestamps:true})

const Company= mongoose.model("Company",companySchema)
export default Company