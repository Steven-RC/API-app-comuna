import { Router } from "express";
import { crearBarrio,obtenerBarrios,eliminarBarrio,actualizarBarrio 
       ,obtenerComunerosBarrio} from '../controllers/barrios';


const router = Router();

router.post('/crear', crearBarrio)
router.get('/obtener', obtenerBarrios)
router.delete('/eliminar/:id', eliminarBarrio)
router.put('/actualizar', actualizarBarrio)
router.post('/comuneros', obtenerComunerosBarrio)


export default router;