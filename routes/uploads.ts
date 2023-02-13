import { Router } from 'express';
import { cargarArchivo,subirImagen ,mostrarImagen} from '../controllers/uploads';
import { validarArchivoSubir } from '../middlewares/valiadar-archivo';




const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);
router.put('/:coleccion/:id',validarArchivoSubir,subirImagen);
router.get('/:coleccion/:id',mostrarImagen)


export default router;