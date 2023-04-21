import dotenv from 'dotenv'
import Server from './server/server';
//agregar socket.io



dotenv.config();


const ExpressServer= new Server();



ExpressServer.listen();

