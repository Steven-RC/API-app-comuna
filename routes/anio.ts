import { Router } from "express";
import { crearAnio, obtenerAnios} from "../controllers/anio";

const router = Router();

router.post('/crear', crearAnio)
router.get('/obtener', obtenerAnios)

export default router;
