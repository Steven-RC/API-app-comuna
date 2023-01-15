import { Router } from "express";
import { crearComunero, getComuneros } from '../controllers/comuneros';

const router = Router();

router.post('/crear', crearComunero);
router.get('/obtener', getComuneros);

export default router;

