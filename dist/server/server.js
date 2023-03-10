"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import multer from 'multer';
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const nacionalidad_1 = __importDefault(require("../routes/nacionalidad"));
const barrios_1 = __importDefault(require("../routes/barrios"));
const personas_1 = __importDefault(require("../routes/personas"));
const roles_1 = __importDefault(require("../routes/roles"));
const comuneros_1 = __importDefault(require("../routes/comuneros"));
const ressetPassword_1 = __importDefault(require("../routes/ressetPassword"));
const asociaciones_1 = __importDefault(require("../routes/asociaciones"));
const anio_1 = __importDefault(require("../routes/anio"));
const cuotas_1 = __importDefault(require("../routes/cuotas"));
const requisitos_1 = __importDefault(require("../routes/requisitos"));
const requisitos_apr_1 = __importDefault(require("../routes/requisitos_apr"));
const facturas_1 = __importDefault(require("../routes/facturas"));
const cuotas_factura_1 = __importDefault(require("../routes/cuotas_factura"));
const tipo_documentos_1 = __importDefault(require("../routes/tipo_documentos"));
const documentos_1 = __importDefault(require("../routes/documentos"));
const chat_bot_1 = __importDefault(require("../routes/chat_bot"));
const uploads_1 = __importDefault(require("../routes/uploads"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            nacionalidad: '/api/nacionalidad',
            barrios: '/api/barrios',
            personas: '/api/personas',
            roles: '/api/roles',
            comuneros: '/api/comuneros',
            contrasenia: '/api/contrasenia',
            asociaciones: '/api/asociaciones',
            anio: '/api/anio',
            cuota: '/api/cuota',
            requisitos: '/api/requisitos',
            requisitosApr: '/api/requisitosApr',
            facturas: '/api/facturas',
            cuotasFactura: '/api/cuotasFactura',
            tipo_documentos: '/api/tipodocumentos',
            documentos: '/api/documentos',
            chatBot: '/api/chatBot',
            upload: '/api/upload'
        };
        this.app = (0, express_1.default)(); //inicializamos express
        this.port = process.env.PORT || '8000'; //puerto por defecto
        //middlewares
        this.middlewares(); //llamamos a los middlewares
        //base de datos
        this.conectarDB(); //llamamos a la base de datos
        this.routes(); //llamamos a las rutas
    }
    //conexion base de datos
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos online');
            }
            catch (error) {
                throw error;
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura y parseo del body
        this.app.use(express_1.default.json());
        //carpeta publica
        this.app.use(express_1.default.static('public'));
        //crear filtro para subir archivos
        // this.app.use(multerUpload.single('file'));
        // cargar archivos
        // this.app.use('/pdf', express.static('pdf'));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
        this.app.use(this.apiPaths.nacionalidad, nacionalidad_1.default);
        this.app.use(this.apiPaths.barrios, barrios_1.default);
        this.app.use(this.apiPaths.personas, personas_1.default);
        this.app.use(this.apiPaths.roles, roles_1.default);
        this.app.use(this.apiPaths.comuneros, comuneros_1.default);
        this.app.use(this.apiPaths.contrasenia, ressetPassword_1.default);
        this.app.use(this.apiPaths.asociaciones, asociaciones_1.default);
        this.app.use(this.apiPaths.anio, anio_1.default);
        this.app.use(this.apiPaths.cuota, cuotas_1.default);
        this.app.use(this.apiPaths.requisitos, requisitos_1.default);
        this.app.use(this.apiPaths.requisitosApr, requisitos_apr_1.default);
        this.app.use(this.apiPaths.facturas, facturas_1.default);
        this.app.use(this.apiPaths.cuotasFactura, cuotas_factura_1.default);
        this.app.use(this.apiPaths.tipo_documentos, tipo_documentos_1.default);
        this.app.use(this.apiPaths.documentos, documentos_1.default);
        this.app.use(this.apiPaths.chatBot, chat_bot_1.default);
        this.app.use(this.apiPaths.upload, uploads_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map