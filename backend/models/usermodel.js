import mongoose from "mongoose";

const userSchema=mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phoneNumber:{
        type:Number,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["student","recruiter"],
        required:true
    },
    
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},  //URL TO RESUME FILE
        resumeOriginalname:{type:String},

        company:{
            type:mongoose.Schema.ObjectId,
            ref:'Company'
        },

        profilePhoto:{
            type:String,
            default:""
        }
    },
    
   
},{timestamps:true}) //The timestamps option in Mongoose is a schema option that, when enabled, automatically adds two fields to your schema:
                        // 1. createdAt: This field stores the timestamp when the document was created.
                        // 2. updatedAt: This field stores the timestamp when the document was last updated.

    const User=mongoose.model("User",userSchema);
    export default User 
