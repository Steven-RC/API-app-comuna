import { Router } from "express";
import { crearCuota, obtenerCuotas,actualizarCuota, obtenerCuotasComunero,
        obtenerCuotasDeudaComunero} from '../controllers/cuotas';

const router = Router();

router.post('/crear', crearCuota)
router.get('/obtener', obtenerCuotas)
router.patch('/actualizar', actualizarCuota)
router.post('/obtenerComunero', obtenerCuotasComunero)
router.post('/obtenerDeudaComunero', obtenerCuotasDeudaComunero)
 
export default router;
