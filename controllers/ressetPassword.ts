import db from '../db/connection';
import { Request, Response } from "express";
import { initModels, usuarios} from '../models/init-models';
import nodemailer from 'nodemailer'

initModels(db);

export const resetPassword = async (req: Request, res: Response) => {
    //obtener mail del usuario
    const { email } = req.body;
    // buscar el email en los usuarios
    const busUser = await usuarios.findOne({
        where: {
            EMAIL: email
        },
        attributes: [
            'EMAIL',
        ]
    });
    // si no existe el email
    if (!busUser) {
        return res.status(404).json({
            msg: 'Email no encontrado'
        })
    }
    // si existe el email enviar email con link para resetear contraseña con token
    else {
        //crear objeto con el email del usuario
        const transporter= nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'stevenrosales31@gmail.com',
                pass:'uihwfnjofqdiymii'        
    }
        });
        const mailOptions = {
            from: 'stevenrosales31@gmail.com',
            to: email,
            subject: 'Resetear contraseña',
            text: 'Para resetear su contraseña haga click en el siguiente link: http://localhost:5173/?#/updatepassword'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return res.status(200).json({  
            msg: 'Email enviado'
        })
    }


}