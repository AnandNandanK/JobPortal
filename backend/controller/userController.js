
import User from "../models/usermodel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../config/dataURI.js";
import cloudinary from "../config/cloudinary.js"


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        const file = req.file;

        console.log(fullname, email, phoneNumber, password, role, file)
        // Check if any field is missing

        if (!fullname || !email || !phoneNumber || !password || !role || !file) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User is already registered with this email",
                success: false
            });
        }

        //get file URI
        const fileUri = getDataUri(file);

        // Upload the file to Cloudinary
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const registerUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        });

        return res.status(201).json({
            message: "User registered successfully",
            registerUser,
            success: true

        });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};



export const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", "", { expireIn: 0 }).json({
            message: "LogOut Successfully",
            success: true

        })

    } catch (error) {
        console.log(error)
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const file = req.file;

        // if (!file) {
        //     return res.status(400).json({
        //         message: "No file uploaded.",
        //         success: false
        //     });
        // }

        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        console.log("File URI:", fileUri);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        console.log("CLOUDE RESPONSE......", cloudResponse)

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // middleware authentication
        // console.log(req)
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        console.log("FILE ",file)
        // updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // resume comes later here...
       
            if (cloudResponse) {
                user.profile.resume = cloudResponse?.secure_url // save the cloudinary url
                user.profile.resumeOriginalname = file?.originalname // Save the original file name
            }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
      console.log(error)
    }
}