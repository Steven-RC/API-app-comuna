import { Router } from "express";
import { obtenerTerrenosComunero } from "../controllers/terrenos";

const router = Router();

router.post('/obtenerTerrenosComunero', obtenerTerrenosComunero);

export default router;