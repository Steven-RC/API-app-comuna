import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, tipo_documentos, tipo_documentosAttributes, tipo_documentosCreationAttributes } from "../models/init-models";

initModels(db);

export const crearTipoDocumento = async (req: Request, res: Response) => {
    //crear tipo documento
    const {tipoDocumento} = req.body;
    //quitar espacios y convertir a minusculas
    const alias=tipoDocumento.replace(/\s/g, '').toLowerCase();
    console.log(alias);
    const tipoDocument: tipo_documentosCreationAttributes = {
        TIPO_DOC:tipoDocumento,
    }
    await tipo_documentos.create(tipoDocument);
    res.json({
        msg: 'Tipo de documento creado'
    });
}

//obtener tipos de documentos
export const obtenerTiposDocumentos = async (req: Request, res: Response) => {
    const tiposDocumentos = await tipo_documentos.findAll();
    res.json({
        tiposDocumentos
    });
}
//actualizar tipo de documento
export const actualizarTipoDocumento = async (req: Request, res: Response) => {
    const { id } = req.body;
    const { tipoDocumento } = req.body;
    const alias=tipoDocumento.replace(/\s/g, '').toLowerCase();
    await tipo_documentos.update({
        TIPO_DOC: tipoDocumento,
        ALIAS: alias
    }, {
        where: {
            ID_TIPO_DOC: id
        }
    });
    res.json({
        msg: 'Tipo de documento actualizado'
    });
}
