import { Response, Request } from "express";
import db from "../db/connection";
import subirArchivo from "../helpers/subir-archivo";
import path from 'path';
import fs from 'fs';
import { comuneros, initModels, tipo_documentos, comuneros_tipos_doc,  comuneros_tipos_docCreationAttributes } from '../models/init-models'
//importar cloudinary v2
initModels(db);

export const subirPDF = async (req: Request, res: Response) => {
    try {
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
                alias: tipoDoc
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
                alias: tipoDoc
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
                id_comunero: parseInt(id),
                id_tipo_doc: tipoDocumento.id_tipo_doc
            }
        });
        if (documentoComunero) {
            //borrar el documento
            const pathDocumento = path.join(__dirname, '../uploads', tipoDoc, documentoComunero.documento as string);
            if (fs.existsSync(pathDocumento)) {
                fs.unlinkSync(pathDocumento);
            }
            console.log(pathDocumento);
            //borrar la relacion
            await comuneros_tipos_doc.destroy({
                where: {
                    id_comunero: parseInt(id),
                    id_tipo_doc: tipoDocumento.id_tipo_doc
                }
            });

        }

        //subir el documento
        const nombre = String(await subirArchivo.subirArchivo(req.files, ['pdf'], tipoDoc));
        //crear relacion comunero_tipo_doc

        const comuneroTipoDoc: comuneros_tipos_docCreationAttributes = {
            id_comunero: id,
            id_tipo_doc: tipoDocumento.id_tipo_doc,
            documento: nombre,
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

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const mostrarPdf = async (req: Request, res: Response) => {
    try {
        //id comunero, tipo documento, nombre del documento,
        const { tipoDoc, id } = req.params;
    
        let tipoDocumento;
        let documentoComunero;
        //buscar el tipo de documento
        tipoDocumento = await tipo_documentos.findOne({
            where: {
                alias: tipoDoc
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
                id_comunero: id,
                id_tipo_doc: tipoDocumento.id_tipo_doc
            }
        });
        if (!documentoComunero) {
            return res.status(400).json({
                msg: `No existe un documento de tipo ${tipoDoc} para el comunero con id ${id}`
            });
        }
        //mostrar el documento
        if (documentoComunero.documento) {
            const pathDocumento = path.join(__dirname, '../uploads', tipoDoc, documentoComunero.documento as string);
            if (fs.existsSync(pathDocumento)) {
                return res.sendFile(pathDocumento);
            } else {
                return res.status(400).json({
                    msg: `No existe el documento en el servidor`
                });
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}

//obtener comuneros tipo doc
export const obtenerComunerosTipoDoc = async (req: Request, res: Response) => {
    try {
        const listaComunerosTipoDoc = await comuneros_tipos_doc.findAll({
            include: [
                {
                    model: comuneros,
                    as: 'id_comunero_comunero',
                    attributes: ['id_comunero', 'id_persona'],
                },
                {
                    model: tipo_documentos,
                    as: 'id_tipo_doc_tipo_documento',
                    attributes: ['id_tipo_doc', 'tipo_doc'],
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
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
    }
}
//obtener comuneros tipo doc por id comunero
export const obtenerComunerosTipoDocPorIdComunero = async (req: Request, res: Response) => {
    try {
        console.log(req.body.id);
        const listaComunerosTipoDoc = await db.query("select tipo_documentos.id_tipo_doc,tipo_documentos.tipo_doc, tipo_documentos.alias from ((comuneros inner join comuneros_tipos_doc on comuneros.id_comunero = comuneros_tipos_doc.id_comunero)inner join tipo_documentos on comuneros_tipos_doc.id_tipo_doc=tipo_documentos.id_tipo_doc) where comuneros.id_comunero=" + req.body.id);
        if (listaComunerosTipoDoc[0].length > 0) {
            const documentosComunero = listaComunerosTipoDoc[0];
            res.json({
                documentosComunero
            });
        } else {
            return res.status(400).json({
                msg: `El comunero no tiene documentos registrados`
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
        
    }

}