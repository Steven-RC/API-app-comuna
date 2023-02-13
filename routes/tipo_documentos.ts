import { Router } from "express";
import { crearTipoDocumento, obtenerTiposDocumentos,
actualizarTipoDocumento } from '../controllers/tipo_documentos';

const router = Router();

router.post('/crear', crearTipoDocumento)
router.get('/obtener', obtenerTiposDocumentos)
router.patch('/actualizar', actualizarTipoDocumento)

export default router;