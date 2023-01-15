import { Router } from "express";
import { resetPassword } from "../controllers/ressetPassword";

const router = Router();

router.post('/reset', resetPassword)
 
export default router;