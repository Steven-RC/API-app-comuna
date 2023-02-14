import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, nacionalidadCreationAttributes, nacionalidadAttributes } from "../models/init-models";
import { Nacionalidad } from '../models/nacionalidad';

initModels(db);


export const crearNacionalidad = async (req: Request, res: Response) => {
    // const {nacionalidad}=req.body;
    try {
        
        const encontrarNacionalidad = await Nacionalidad.findOne({
            where: {
                NACIONALIDAD: req.body.nacionalidad
            }
        })
        if (encontrarNacionalidad) {
            return res.status(400).json({
                msg: 'La nacionalidad ya existe'
            })
        } else {
            const nacionalidadcr: nacionalidadCreationAttributes = {
                NACIONALIDAD: req.body.nacionalidad,
            }
    
            await Nacionalidad.create(nacionalidadcr);
    
            res.status(200).json({
                msg: 'Nacionalidad creada '
            })
    
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
    }

}

export const crear = async (req: Request, res: Response) => {
    // const {nacionalidad}=req.body;


    try {

        const nacionalidad = await Nacionalidad.findOne({
            where: {
                NACIONALIDAD: req.body.nacionalidad
            }
        })

        if (nacionalidad) {

            return res.status(400).json({
                msg: 'La nacionalidad ya existe'
            })
        }


        const nacionalidadcr: nacionalidadCreationAttributes = {
            NACIONALIDAD: req.body.nacionalidad,
        }
        await Nacionalidad.create(nacionalidadcr);
        res.json({
            msg: 'Nacionalidad creada '
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}






//crear metodo para retornar todas las nacionalidades
export const getNacionalidades = async (req: Request, res: Response) => {
    try{
        const listNacionalidades = await Nacionalidad.findAll();
        if (listNacionalidades) {
            res.json({ listNacionalidades });
        } else {
            res.status(404).json({
                msg: 'No hay nacionalidades'
            })
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}
//metodo para retorrnar los nombres de las nacionalidades
export const getNombresNacionalidades = async (req: Request, res: Response) => {
    try {
        
        const listNacionalidades = await Nacionalidad.findAll({
            attributes: ['NACIONALIDAD']
        });
        if (listNacionalidades) {
            res.json({ listNacionalidades });
        } else {
            res.status(404).json({
                msg: 'No hay nacionalidades'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })        
    }

}

//crear metodo para retornar una nacionalidad por nombre
export const getNacionalidad = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.params;
        const encontrarNacionalidad = await Nacionalidad.findOne({
            where: {
                NACIONALIDAD: nombre
            }
        })
        if (encontrarNacionalidad) {
            res.json({ encontrarNacionalidad });
        }
        else {
            res.status(404).json({
                msg: 'Nacionalidad no encontrada'
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
        
    }
}
//crear metodo para actualizar una nacionalidad
export const actualizarNacionalidad = async (req: Request, res: Response) => {
    try{
        const { id } = req.body;
        const { nomNacionalidad } = req.body;
        const nacionalidadAct = await Nacionalidad.findByPk(id);
        if (!nacionalidadAct) {
            return res.status(404).json({
                msg: 'Nacionalidad no encontrada '
            })
        } else {
            await nacionalidadAct.update({
                NACIONALIDAD: nomNacionalidad
            })
            res.json({
                msg: 'Nacionalidad actualizada'
            })
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}