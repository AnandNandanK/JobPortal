import express from "express";
import  { isAuthenticated } from "../middleware/auth.js";
import { getAdmidJobs, getAllJobs, getJobById, postJob } from "../controller/jobController.js";

const router=express.Router();

router.post("/post",isAuthenticated,postJob);
router.get("/get",isAuthenticated,getAllJobs);
router.get("/getadminjobs",isAuthenticated,getAdmidJobs);
router.get("/get/:id",isAuthenticated,getJobById);

export default router;