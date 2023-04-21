
import jwt from 'jsonwebtoken';

const generarJWT = ( uid: string ) => {
    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRET as string, {
            expiresIn: '4h'
        }, (err, token) => {

            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }

        });

    });

}

export default generarJWT;