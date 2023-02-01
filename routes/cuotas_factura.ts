import {Router} from 'express';
import { crearCuotaFactura,obtenerCuotasFactura } from '../controllers/cuotas_factura';

const router = Router();

router.post('/crear', crearCuotaFactura)
router.post('/obtener', obtenerCuotasFactura)

export default router;
