import { Router } from "express";
import { crearAsociacion, obtenerAsociaciones,actualizarAsociacion } from '../controllers/asociaciones';

const router = Router();

router.post('/crear', crearAsociacion)
router.get('/obtener', obtenerAsociaciones)
router.patch('/actualizar', actualizarAsociacion)


export default router;