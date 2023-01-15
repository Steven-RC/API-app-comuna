import { Router } from "express";
import { crearPersona } from '../controllers/personas';

const router = Router();

router.post('/crear', crearPersona)

export default router;