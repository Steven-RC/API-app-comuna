import { obtenerUsuario,  cambiarEstado ,createUsuario, 
    actualizarContrasena,obtenerPerRoles, obtenerUsuarios,
    actualizarUsuario,resetearContrasena,getUserById } from '../controllers/usuarios';
import { Router } from "express";
import { updateImageUser } from '../controllers/usuarios';
import validarJWT from '../middlewares/validar-jwt';



const router = Router(); 

router.post('/obtener', obtenerUsuario)
router.post('/crear', createUsuario)
router.post('/reset', actualizarContrasena)
router.post('/deshabilitar', cambiarEstado)
router.get('/obtenerPerRoles', obtenerPerRoles)
router.get('/obtenerUsuarios', obtenerUsuarios)
router.patch('/actualizarUsuario', actualizarUsuario)
router.post('/resetearContrasena', resetearContrasena)
router.post('/getUserById', getUserById)
router.patch('/updateimg', validarJWT,updateImageUser)



 
export default router;

