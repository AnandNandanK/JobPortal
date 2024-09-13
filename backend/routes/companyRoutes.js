import express from "express";
import { register, login, updateProfile, logout } from "../controller/userController.js";
import  { isAuthenticated } from "../middleware/auth.js";
import { registerCompany,getCompanyById,getCompany,updateCompany } from "../controller/companyController.js";
import { singleUpload } from "../middleware/multer.js";

const router=express.Router();

router.post('/register',isAuthenticated, registerCompany);
router.get('/get',isAuthenticated, getCompany);
router.get('/get/:id',isAuthenticated, getCompanyById);
router.put('/update/:id',isAuthenticated,singleUpload,updateCompany);


export default router;