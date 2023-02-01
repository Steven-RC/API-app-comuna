import { Router } from "express";
import{obtenerFacturas,crearFactura,obtenerFacturasComunero} from '../controllers/facturas';

const router = Router();

router.get('/obtener', obtenerFacturas)
router.post('/crear', crearFactura)
router.post('/obtenerComunero', obtenerFacturasComunero)


export default router;