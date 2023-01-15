import { Router } from "express";
import { crearBarrio,obtenerBarrios } from '../controllers/barrios';


const router = Router();

router.post('/crear', crearBarrio)
router.get('/obtener', obtenerBarrios)


export default router;