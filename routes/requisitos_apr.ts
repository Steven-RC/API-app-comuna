import {aprobarRequisito,obtenerRequisitosApr,obtenerPersonasApr} from '../controllers/requisitos_apr';
import { Router } from "express";

const router = Router();

router.post('/aprobar', aprobarRequisito)
router.get('/obtener', obtenerRequisitosApr)
router.get('/obtenerPersonas', obtenerPersonasApr)

export default router;
