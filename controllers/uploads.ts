import { Response, Request } from "express";
import subirArchivo from "../helpers/subir-archivo";
import path from 'path';
import fs from 'fs';
import { comuneros, usuarios } from '../models/init-models'
//importar cloudinary v2

export const cargarArchivo = async (req: Request, res: Response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: 'No files were uploaded.' });
  }

  try {
    const nombre = await subirArchivo.subirArchivo(req.files, ['pdf'], 'cedulas');
    res.json({
      nombre: nombre
    });

  } catch (err) {
    res.status(400).json({ msg: err });
  }

}

export const subirImagen = async (req: Request, res: Response) => {
  try {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
      case 'usuarios':
        modelo = await usuarios.findByPk(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
          });
        }
        break;
      default:
        return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }
    //limpiar imagenes previas
    if (modelo.img) {
      //hay que borrar la imagen del servidor
      const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);

      }
    }


    const nombre = await subirArchivo.subirArchivo(req.files, ['png', 'jpg', 'jpeg'], 'usuarios');
    modelo.img = nombre as string;
    await modelo.save();
    res.json({
      modelo
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error inesperado' });

  }
}

export const mostrarImagen = async (req: Request, res: Response) => {
  try {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
      case 'usuarios':
        modelo = await usuarios.findByPk(id);
        if (!modelo) {
          return res.status(400).json({
            msg: `No existe un usuario con el id ${id}`
          });
        }
        break;
      default:
        return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }
    //limpiar imagenes previas
    if (modelo.img) {
      //hay que borrar la imagen del servidor
      const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
      if (fs.existsSync(pathImagen)) {
        return res.sendFile(pathImagen);
      } else {
        return res.sendFile(path.join(__dirname, '../assets/no-image.jpg'));
      }
    }


    res.json({
      msg: 'no existe imagen'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error inesperado' });

  }
}