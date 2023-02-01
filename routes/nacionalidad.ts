import { Router } from "express";
import { crearNacionalidad, getNacionalidades,actualizarNacionalidad } from '../controllers/nacionalidad';

const router = Router();

router.post('/crear', crearNacionalidad)
router.get('/obtener', getNacionalidades)
router.patch('/actualizar', actualizarNacionalidad)



export default router;

