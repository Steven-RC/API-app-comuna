import express, { Application } from 'express';
// import multer from 'multer';
import fileUpload from 'express-fileupload';

import userRoutes from '../routes/usuarios';
import cors from "cors";
import db from '../db/connection';
import nacionRoutes from '../routes/nacionalidad';
import barrioRoutes from '../routes/barrios';
import personaRoutes from '../routes/personas';
import rolRouter from '../routes/roles';
import comuneroRoutes from '../routes/comuneros';
import resetPasswordRoutes from '../routes/ressetPassword';
import asociacionesROutes from '../routes/asociaciones';
import anioRoutes from '../routes/anio';
import cuotaRoutes from '../routes/cuotas';
import requisitosRoutes from '../routes/requisitos';
import requisitosAprRoytes from '../routes/requisitos_apr';
import facturasRoutes from '../routes/facturas';
import cuotasFacturaRoutes from '../routes/cuotas_factura';
import tipo_documentosRoutes from '../routes/tipo_documentos';
import documentosRoutes from '../routes/documentos';
import chatBotRoutes from '../routes/chat_bot';
import uploadRoutes from '../routes/uploads';


class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        nacionalidad: '/api/nacionalidad',
        barrios: '/api/barrios',
        personas: '/api/personas',
        roles: '/api/roles',
        comuneros: '/api/comuneros',
        contrasenia: '/api/contrasenia',
        asociaciones:'/api/asociaciones',
        anio:'/api/anio',
        cuota:'/api/cuota',
        requisitos:'/api/requisitos',
        requisitosApr:'/api/requisitosApr',
        facturas:'/api/facturas',
        cuotasFactura:'/api/cuotasFactura',
        tipo_documentos:'/api/tipodocumentos',
        documentos:'/api/documentos',
        chatBot:'/api/chatBot',
        upload: '/api/upload'


    }


    constructor() {
        this.app = express();//inicializamos express
        
        this.port = process.env.PORT || '8000';//puerto por defecto
        //middlewares
        this.middlewares();//llamamos a los middlewares
        //base de datos
        this.conectarDB();//llamamos a la base de datos
        this.routes();//llamamos a las rutas


    }
    //conexion base de datos
    async conectarDB() {

        try {
            await db.authenticate();
            console.log('Base de datos online');
        } catch (error) {
            throw error;
        }
    }


    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //carpeta publica
        this.app.use(express.static('public'));
        
        //crear filtro para subir archivos
        // this.app.use(multerUpload.single('file'));
        // cargar archivos
        // this.app.use('/pdf', express.static('pdf'));
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }


    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.nacionalidad, nacionRoutes);
        this.app.use(this.apiPaths.barrios, barrioRoutes);
        this.app.use(this.apiPaths.personas, personaRoutes);
        this.app.use(this.apiPaths.roles, rolRouter);
        this.app.use(this.apiPaths.comuneros, comuneroRoutes);
        this.app.use(this.apiPaths.contrasenia, resetPasswordRoutes);
        this.app.use(this.apiPaths.asociaciones, asociacionesROutes);
        this.app.use(this.apiPaths.anio, anioRoutes);
        this.app.use(this.apiPaths.cuota, cuotaRoutes);
        this.app.use(this.apiPaths.requisitos, requisitosRoutes);
        this.app.use(this.apiPaths.requisitosApr, requisitosAprRoytes);
        this.app.use(this.apiPaths.facturas, facturasRoutes);
        this.app.use(this.apiPaths.cuotasFactura, cuotasFacturaRoutes);
        this.app.use(this.apiPaths.tipo_documentos, tipo_documentosRoutes);
        this.app.use(this.apiPaths.documentos, documentosRoutes);
        this.app.use(this.apiPaths.chatBot, chatBotRoutes);
        this.app.use(this.apiPaths.upload, uploadRoutes);
    }




    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });

    }


}

export default Server;