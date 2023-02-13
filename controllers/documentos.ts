import { Response, Request } from "express";
import db from "../db/connection";
import subirArchivo from "../helpers/subir-archivo";
import path from 'path';
import fs from 'fs';
import { comuneros,initModels, usuarios, tipo_documentos, comuneros_tipos_doc, comuneros_tipos_docAttributes, comuneros_tipos_docCreationAttributes } from '../models/init-models'
//importar cloudinary v2
initModels(db);

import cloudinary from 'cloudinary';

cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
});




export const subirPDF = async (req: Request, res: Response) => {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos que subir' });
    }
    const { tipoDoc, id } = req.params;

    let tipoDocumento;
    let documentoComunero;
    //buscar el tipo de documento
    tipoDocumento = await tipo_documentos.findOne({
        where: {
            ALIAS: tipoDoc
        }
    });
    if (!tipoDocumento) {
        return res.status(400).json({
            msg: `No existe un tipo de documento con el nombre ${tipoDoc}`
        });
    }
    //buscar si existe el tipo de documento
    tipoDocumento = await tipo_documentos.findOne({
        where: {
            ALIAS: tipoDoc
        }
    });
    if (!tipoDocumento) {
        return res.status(400).json({
            msg: `No existe un tipo de documento con el nombre ${tipoDoc}`
        });
    }
    //si ya existe un documento de ese tipo, borrarlo
    documentoComunero = await comuneros_tipos_doc.findOne({
        where: {
            ID_COMUNERO: parseInt(id),
            ID_TIPO_DOC: tipoDocumento.ID_TIPO_DOC
        }
    });
    if (documentoComunero) {
        //borrar el documento
        const pathDocumento = path.join(__dirname, '../uploads', tipoDoc, documentoComunero.DOCUMENTO as string);
        if (fs.existsSync(pathDocumento)) {
            fs.unlinkSync(pathDocumento);
        }
        console.log(pathDocumento);
        //borrar la relacion
        await comuneros_tipos_doc.destroy({
            where: {
                ID_COMUNERO: parseInt(id),
                ID_TIPO_DOC: tipoDocumento.ID_TIPO_DOC
            }
        });
        
    }
    
    //subir el documento
    const nombre = String(await subirArchivo.subirArchivo(req.files, ['pdf'], tipoDoc));
    //crear relacion comunero_tipo_doc

    const comuneroTipoDoc: comuneros_tipos_docCreationAttributes = {
        ID_COMUNERO: parseInt(id),
        ID_TIPO_DOC: tipoDocumento.ID_TIPO_DOC,
        DOCUMENTO: nombre,
    }
    try {
        await comuneros_tipos_doc.create(comuneroTipoDoc);
    } catch (err) {
        return res.status(400).json({
            msg: err
        });
    }

    res.json({
        nombre: nombre
    });

}

export const mostrarPdf = async (req: Request, res: Response) => {
    //id comunero, tipo documento, nombre del documento,
    const { tipoDoc, id } = req.params;

    let tipoDocumento;
    let documentoComunero;
    //buscar el tipo de documento
    tipoDocumento = await tipo_documentos.findOne({
        where: {
            ALIAS: tipoDoc
        }
    });
    if (!tipoDocumento) {
        return res.status(400).json({
            msg: `No existe un tipo de documento con el nombre ${tipoDoc}`
        });
    }
    //buscar el comunero
    documentoComunero = await comuneros_tipos_doc.findOne({
        where: {
            ID_COMUNERO: parseInt(id),
            ID_TIPO_DOC: tipoDocumento.ID_TIPO_DOC
        }
    });
    if (!documentoComunero) {
        return res.status(400).json({
            msg: `No existe un documento de tipo ${tipoDoc} para el comunero con id ${id}`
        });
    } 
    //mostrar el documento
    if(documentoComunero.DOCUMENTO){
        const pathDocumento = path.join(__dirname, '../uploads', tipoDoc, documentoComunero.DOCUMENTO as string);
        if(fs.existsSync(pathDocumento)){
            return res.sendFile(pathDocumento);
        }else{
            return res.status(400).json({
                msg: `No existe el documento en el servidor`
            });
        }
    }
}

//obtener comuneros tipo doc
export const obtenerComunerosTipoDoc = async (req: Request, res: Response) => {
    const listaComunerosTipoDoc = await comuneros_tipos_doc.findAll({
        include: [
            {
                model: comuneros,
                as:'ID_COMUNERO_comunero',
                attributes: ['ID_COMUNERO','ID_PERSONA'],
            },
            {
                model: tipo_documentos,
                as:'ID_TIPO_DOC_tipo_documento',
                attributes: ['ID_TIPO_DOC','TIPO_DOC'],
            }
        ]

    });
    if (!listaComunerosTipoDoc) {
        return res.status(400).json({
            msg: `No existen documentos de comuneros`
        });
    }
    res.json({
        listaComunerosTipoDoc
    });
}
//obtener comuneros tipo doc por id comunero
export const obtenerComunerosTipoDocPorIdComunero = async (req: Request, res: Response) => {
    console.log(req.body.id);
    const listaComunerosTipoDoc= await db.query("select tipo_documentos.ID_TIPO_DOC,tipo_documentos.TIPO_DOC, tipo_documentos.ALIAS from ((comuneros inner join comuneros_tipos_doc on comuneros.ID_COMUNERO = comuneros_tipos_doc.ID_COMUNERO)inner join tipo_documentos on comuneros_tipos_doc.ID_TIPO_DOC=tipo_documentos.ID_TIPO_DOC) where comuneros.ID_COMUNERO="+ req.body.id);
    if (listaComunerosTipoDoc[0].length>0) {
        const listaComuneros= listaComunerosTipoDoc[0];
        res.json({
            listaComuneros
        });
    }else{
        return res.status(400).json({
            msg: `El comunero no tiene documentos registrados`
        });
    }
 
}