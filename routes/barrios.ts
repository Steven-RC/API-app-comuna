import { Router } from "express";
import { crearBarrio,obtenerBarrios,eliminarBarrio,actualizarBarrio } from '../controllers/barrios';


const router = Router();

router.post('/crear', crearBarrio)
router.get('/obtener', obtenerBarrios)
router.delete('/eliminar/:id', eliminarBarrio)
router.put('/actualizar', actualizarBarrio)


export default router;