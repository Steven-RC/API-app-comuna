
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import  AuthRequest  from '../interfaces/auth-request';

const validarJWT = (req: Request, res: Response, next: NextFunction) => {
    //x-token headers
    const token = req.header('x-token');
    console.log(token);
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    
    try {
        const {uid}= jwt.verify(token, process.env.SECRET!) as JwtPayload;
        // console.log(uid);
        (req as unknown as AuthRequest).uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

export default validarJWT;
