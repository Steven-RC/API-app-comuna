import { obtenerUsuario, obtenerPersona, cambiarEstado ,crearUsuario, actualizarContrasena } from '../controllers/usuarios';
import { Router } from "express";

const router = Router();

router.post('/obtener', obtenerUsuario)
router.post('/crear', crearUsuario)
router.post('/reset', actualizarContrasena)
router.post('/deshabilitar', cambiarEstado)


export default router;

