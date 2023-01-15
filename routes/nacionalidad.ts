import { Router } from "express";
import { crearNacionalidad, getNacionalidades } from '../controllers/nacionalidad';

const router = Router();

router.post('/crear', crearNacionalidad)
router.get('/listar', getNacionalidades)



export default router;
