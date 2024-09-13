import express from "express";
import  { isAuthenticated } from "../middleware/auth.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.js";

const router=express.Router();

router.get('/apply/:id',isAuthenticated,applyJob );
router.get('/get',isAuthenticated, getAppliedJobs);
router.get('/:id/applicants',isAuthenticated,getApplicants);
router.put('/status/:id/update',isAuthenticated,updateStatus );


export default router;