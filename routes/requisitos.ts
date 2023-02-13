import { Router } from "express";
import { crearRequisito, obtenerRequisitos, 
    obtenerRequisitoPersona,actualizarRequisito} from '../controllers/requisitos';

const router = Router();

router.post('/crear', crearRequisito)
router.get('/obtener', obtenerRequisitos)
router.post('/obtenerPersona', obtenerRequisitoPersona)
router.patch('/actualizar', actualizarRequisito)




export default router;
