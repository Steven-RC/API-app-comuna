import { Router } from "express";
import { crearAnio } from "../controllers/anio";

const router = Router();

router.post('/crear', crearAnio)

export default router;
