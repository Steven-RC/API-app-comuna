import { Router } from "express";
import { crearRol,obtenerRoles,actualizarRol 
    } from '../controllers/roles';

const router = Router();

router.post('/crear', crearRol)
router.get('/obtener', obtenerRoles)
router.patch('/actualizar', actualizarRol)


export default router;