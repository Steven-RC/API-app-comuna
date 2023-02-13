import { Router } from "express";
import { mostrarPdf,subirPDF ,
        obtenerComunerosTipoDoc,
        obtenerComunerosTipoDocPorIdComunero} from '../controllers/documentos';

const router = Router();

router.get('/:coleccion/:tipoDoc/:id',mostrarPdf);
router.put('/:coleccion/:tipoDoc/:id',subirPDF);
router.get('/obtener',obtenerComunerosTipoDoc);
router.post('/obtenerCom',obtenerComunerosTipoDocPorIdComunero);



export default router;