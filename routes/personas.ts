import { Router } from "express";
import { crearPersona, obtenerPersonas,
        actualizarPersona,cambiarEstadoPersona,
        obtenerPersonasRequisitosAprobados} from '../controllers/personas';

const router = Router();

router.post('/crear', crearPersona)
router.get('/obtener', obtenerPersonas)
router.patch('/actualizar', actualizarPersona)
router.patch('/cambiarEstado', cambiarEstadoPersona)
router.get('/obtenerPersonasRequisitosAprobados', obtenerPersonasRequisitosAprobados)

export default router;
