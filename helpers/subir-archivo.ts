import {v4} from 'uuid';
import path from 'path';


const subirArchivo=(files: any,extensionesValidas= ['jpg', 'png', 'jpeg'],
carpeta='' )=>{
    return new Promise((resolve, reject) => {

        const {archivo} = files as any;
        const nombreCortado = archivo.name.split('.');
        console.log(nombreCortado);
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    
        // Validar extensión
        if (!extensionesValidas.includes(extensionArchivo)) {
            return reject(`La extensión ${extensionArchivo} no es permitida`);
        }
    
        // res.json({extensionArchivo})
        // Generar el nombre del archivo
        const nombreTemp= v4() + '.' + extensionArchivo;
        
    
        const uploadPath = path.join(__dirname, '../uploads/' ,carpeta, nombreTemp);
        archivo.mv(uploadPath, function(err: any) {
          if (err){
              reject(err);
          }
            resolve(nombreTemp);
        

        });
    });
}
export default {
    subirArchivo
}