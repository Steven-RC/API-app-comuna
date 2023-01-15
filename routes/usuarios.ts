import { Router } from "express";
import { obtenerUsuario,cambiarEstado ,crearUsuario, actualizarContrasena } from '../controllers/usuarios';

const router = Router();

router.post('/obtener', obtenerUsuario)
router.post('/crear', crearUsuario)
router.post('/reset', actualizarContrasena)
router.post('/deshabilitar', cambiarEstado)


export default router;
