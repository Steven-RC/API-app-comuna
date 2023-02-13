import { obtenerUsuario,  cambiarEstado ,crearUsuario, 
    actualizarContrasena,obtenerPerRoles } from '../controllers/usuarios';
import { Router } from "express";

const router = Router();

router.post('/obtener', obtenerUsuario)
router.post('/crear', crearUsuario)
router.post('/reset', actualizarContrasena)
router.post('/deshabilitar', cambiarEstado)
router.get('/obtenerPerRoles', obtenerPerRoles)


 
export default router;

