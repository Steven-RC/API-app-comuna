import { Router } from "express";
import { crearPersona, obtenerPersonas,
        actualizarPersona,cambiarEstadoPersona,
        obtenerPersonasRequisitosAprobados
        ,buscarComunerosPorCedula} from '../controllers/personas';

const router = Router();

router.post('/crear', crearPersona)
router.get('/obtener', obtenerPersonas)
router.patch('/actualizar', actualizarPersona)
router.patch('/cambiarEstado', cambiarEstadoPersona)
router.get('/obtenerPersonasRequisitosAprobados', obtenerPersonasRequisitosAprobados)
router.post('/buscarComunerosPorCedula', buscarComunerosPorCedula)

export default router;

 