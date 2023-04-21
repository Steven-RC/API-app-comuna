import { obtenerUsuario,  cambiarEstado ,createUsuario, 
    actualizarContrasena,obtenerPerRoles, obtenerUsuarios,
    obtenerRol,actualizarUsuario,resetearContrasena,getUserById } from '../controllers/usuarios';
import { Router } from "express";



const router = Router();

router.post('/obtener', obtenerUsuario)
router.post('/crear', createUsuario)
router.post('/reset', actualizarContrasena)
router.post('/deshabilitar', cambiarEstado)
router.get('/obtenerPerRoles', obtenerPerRoles)
router.get('/obtenerUsuarios', obtenerUsuarios)
router.get('/obtenerRol/:id', obtenerRol)
router.patch('/actualizarUsuario', actualizarUsuario)
router.post('/resetearContrasena', resetearContrasena)
router.post('/getUserById', getUserById)



 
export default router;

