import express from "express";
import { register, login, updateProfile, logout } from "../controller/userController.js";
import  { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";

const router=express.Router();

router.post('/register',singleUpload,register);
router.post('/login',login);
router.get('/logout',logout);

router.put('/profile/update',isAuthenticated,singleUpload,updateProfile);


export default router;