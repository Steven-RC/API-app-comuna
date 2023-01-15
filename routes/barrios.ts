import { Router } from "express";
import { crearBarrio,obtenerBarrios,eliminarBarrio } from '../controllers/barrios';


const router = Router();

router.post('/crear', crearBarrio)
router.get('/obtener', obtenerBarrios)
router.delete('/eliminar/:id', eliminarBarrio)



export default router;