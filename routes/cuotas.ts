import { Router } from "express";
import { crearCuota, obtenerCuotas,actualizarCuota, obtenerCuotasComunero} from '../controllers/cuotas';

const router = Router();

router.post('/crear', crearCuota)
router.get('/obtener', obtenerCuotas)
router.patch('/actualizar', actualizarCuota)
router.post('/obtenerComunero', obtenerCuotasComunero)
 
export default router;
