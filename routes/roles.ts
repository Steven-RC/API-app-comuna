import { Router } from "express";
import { crearRol } from '../controllers/roles';

const router = Router();

router.post('/crear', crearRol)


export default router;