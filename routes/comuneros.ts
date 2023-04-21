import { Router } from "express";
import { crearComunero, getComuneros,obtenerPersonasComuneros
        ,obtenerPersonasNoComuneros,cambiarEstadoComunero,
        agregarAsociacion,obtenerAsociacion,obtenerPersonasComunerosBarrio
        ,obtenerComunerosAsociacion,obtenerComunero,} from '../controllers/comuneros';

const router = Router();

router.post('/crear', crearComunero);
router.get('/obtener', getComuneros);
router.get('/obtenerComunerosReg', obtenerPersonasComuneros);
router.get('/obtenerNoComunerosReg', obtenerPersonasNoComuneros);
router.patch('/cambiarEstado', cambiarEstadoComunero);
router.patch('/agregarAsociacion', agregarAsociacion);
router.post('/obtenerAsociacion', obtenerAsociacion);
router.post('/obtenerComunerosBarrio', obtenerPersonasComunerosBarrio);
router.post('/obtenerComunerosAsociacion', obtenerComunerosAsociacion);
router.post('/obtenerComunero', obtenerComunero);



 

export default router;


