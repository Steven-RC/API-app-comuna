import db from '../db/connection';
import { Request, Response } from "express";
import {initModels, documentos,documentosAttributes,documentosCreationAttributes } from '../models/init-models';

initModels(db);

export const crearDocumento = async (req:Request,res:Response)=>{
    const documento:documentosCreationAttributes = {
        ID_COMUNERO:req.body.id_comunero,
        ID_TIPO_DOC:req.body.id_tipo_doc,
        FILE:req.body.file
    }
    await documentos.create(documento);
    res.json({
        msg:'Documento creado'
    })
}
