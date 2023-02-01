import { Router } from "express";
import { crearRequisito, obtenerRequisitos, 
    obtenerRequisitoPersona } from '../controllers/requisitos';

const router = Router();

router.post('/crear', crearRequisito)
router.get('/obtener', obtenerRequisitos)
router.post('/obtenerPersona', obtenerRequisitoPersona)




export default router;
