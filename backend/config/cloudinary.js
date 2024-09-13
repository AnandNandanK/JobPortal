import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
dotenv.config()


        cloudinary.config({
            cloud_name: process.env.CLOUDE_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET

            // cloud_name: CLOUDE_NAME,
            // api_key: CLOUDINARY_API_KEY,
            // api_secret: CLOUDINARY_API_SECRET
        })

export default cloudinary;