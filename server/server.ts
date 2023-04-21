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
import terrenosRoutes from '../routes/terrenos';
import authRoutes from '../routes/auth';


import { createServer } from 'http';
import  {socketController} from '../socket/controllers';




class Server {
    public app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/usuarios',
        nacionalidad: '/nacionalidad',
        barrios: '/barrios',
        personas: '/personas',
        roles: '/roles',
        comuneros: '/comuneros',
        contrasenia: '/contrasenia',
        asociaciones:'/asociaciones',
        anio:'/anio',
        cuota:'/cuota',
        requisitos:'/requisitos',
        requisitosApr:'/requisitosApr',
        facturas:'/facturas',
        cuotasFactura:'/cuotasFactura',
        tipo_documentos:'/tipodocumentos',
        documentos:'/documentos',
        chatBot:'/chatBot',
        upload: '/upload',
        terrenos: '/terrenos',
        auth: '/auth'


    }
    private server: any;

    constructor() {
       //inicializa el servidor con express y socket.io
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.server = createServer(this.app);
        const io = require('socket.io')(this.server,{
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        //conectar a la base de datos
        this.conectarDB();
        //middlewares
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
        //sockets
        io.on('connection', 
            socketController
        );



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
        this.app.use(this.apiPaths.terrenos, terrenosRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
    }




    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });

    }


}

export default Server;