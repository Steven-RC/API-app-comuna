import { Router } from "express";
import{obtenerFacturas,crearFactura,obtenerFacturasComunero
        ,obtenerFacturasMes} from '../controllers/facturas';

const router = Router();

router.get('/obtener', obtenerFacturas)
router.post('/crear', crearFactura)
router.post('/obtenerComunero', obtenerFacturasComunero)
router.get('/obtenerMes', obtenerFacturasMes)



export default router;