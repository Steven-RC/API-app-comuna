import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, } from '../models/init-models';
import { terrenos } from '../models/init-models';
initModels(db);

//obtener terrenos de un comunero
export const obtenerTerrenosComunero = async (req: Request, res: Response) => {
    try {
        const {id} = req.body;
        const response = await db.query('select terrenos.id_terreno,terrenos.lim_norte, terrenos.lim_sur, terrenos.lim_este ,' +
        'terrenos.lim_oeste,terrenos.norte,terrenos.sur,terrenos.este,terrenos.oeste from comuneros ' + 
        'inner join terrenos on comuneros.id_terreno=terrenos.id_terreno where comuneros.id_comunero =' + id);
        const terreno = response[0];
        
        if (terreno.length > 0) {
            res.json({
                terreno
            })
        }
        else {
            //retorna un array vacio
            res.json({
                terreno: []
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }

}

//actualizar terreno
export const actualizarTerreno = async (req: Request, res: Response) => {
    try {
        const { id, lim_norte, lim_sur, lim_este, lim_oeste, norte, sur, este, oeste } = req.body;
        const terreno = await terrenos.findOne({
            where: {
                id_terreno: id
            }
        });
        if (terreno) {
            await terreno.update({
                lim_norte,
                lim_sur,
                lim_este,
                lim_oeste,
                norte,
                sur,
                este,
                oeste
            });
            res.json({
                msg: 'Terreno actualizado'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error inesperado'
        })

    }
}
