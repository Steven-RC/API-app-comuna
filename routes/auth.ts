import { Router } from "express";

import { login, getUsuario, updatePassword } from '../controllers/auth';
import validarJWT from "../middlewares/validar-jwt";


const router = Router();


router.post('/login', login)
//ruta para obtener la informacion del usuario por el token
router.get('/user', validarJWT, getUsuario);

router.patch('/updatepassword', validarJWT,updatePassword);

export default router;