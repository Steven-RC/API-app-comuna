
import { Socket } from "socket.io";

export const socketController = (socket: Socket) => {
    console.log('Cliente conectado', socket.id);
    //enviar mensaje con el id del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('send-mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido', payload.cuerpo);
        //enviar mensaje a todos los clientes conectados
        socket.emit('send-mensaje', payload);
        console.log('Mensaje enviado', payload);
    });

    // recibir mensaje del cliente y mostrarlo en consola
    socket.on('send-alert', (payload: { de: string, cuerpo: string }) => {
        console.log('Alerta Recibida', payload.cuerpo);
        //enviar mensaje a todos los clientes conectados
        socket.emit('emit-alert', payload);
        console.log('Alerta Enviada', payload);
    });


}

