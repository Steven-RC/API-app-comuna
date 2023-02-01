import { Router } from "express";
import { crearComunero, getComuneros,obtenerPersonasComunerosBarrio
        ,obtenerPersonasNoComuneros,cambiarEstadoComunero } from '../controllers/comuneros';

const router = Router();

router.post('/crear', crearComunero);
router.get('/obtener', getComuneros);
router.get('/obtenerComunerosReg', obtenerPersonasComunerosBarrio);
router.get('/obtenerNoComunerosReg', obtenerPersonasNoComuneros);
router.patch('/cambiarEstado', cambiarEstadoComunero);


export default router;


