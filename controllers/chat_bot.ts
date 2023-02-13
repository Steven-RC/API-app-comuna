import { Request, Response, text } from 'express';
import { PythonShell } from 'python-shell';

export const  chatBot  =  async ( req :  Request ,  res :  Response ) => {
    const options = {
        scriptPath: './chat-bot',
        args: [req.body.message]
    };
    console.log(req.body.message);
    try{
        await PythonShell.run('main.py', options, function (err, results) {
            if (err) throw err;
            console.log('results: %j', results);
            res.json({
                ok: true, 
                message: results
            });
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado'
        });
    }


}
export const obtenerInfoOCR= async (req: Request, res: Response) => {
    // si no hay texto en el body
    if (!req.body.text) {
        return res.status(400).json({
            ok: false,
            message: 'No se recibió texto'
        });
    }else{
        
        const options = {
            scriptPath: './chat-bot',
            args: [req.body.text]
        };
        console.log(req.body.text);
        try{
             PythonShell.run('search.py', options, function (err, results) {
                if (err) throw err;
                console.log('results: %j', results);
                res.json(results
                );
            });

        }catch(err){
            console.log(err);
            res.status(500).json({ 
                ok: false,
                message: 'Error inesperado'
            });
        }
    }
}
export const buscarDocumento= async (req: Request, res: Response) => {
    // si no hay texto en el body
    if (!req.body.text) {
        return res.status(400).json({
            ok: false,
            message: 'No se recibió texto'
        });
    }else{
        
        const options = {
            scriptPath: './chat-bot',
            args: [req.body.text]
        };
        console.log(req.body.text);
        try{
             PythonShell.run('buscar_documento.py', options, function (err, results) {
                if (err) throw err;
                console.log('results: %j', results);
                res.json(results
                );
            });

        }catch(err){
            console.log(err);
            res.status(500).json({ 
                ok: false,
                message: 'Error inesperado'
            });
        }
    }
}