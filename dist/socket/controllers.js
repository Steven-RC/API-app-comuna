"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);
    //enviar mensaje con el id del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });
    socket.on('send-mensaje', (payload) => {
        console.log('Mensaje recibido', payload.cuerpo);
        //enviar mensaje a todos los clientes conectados
        socket.emit('send-mensaje', payload);
        console.log('Mensaje enviado', payload);
    });
    // recibir mensaje del cliente y mostrarlo en consola
    socket.on('send-alert', (payload) => {
        console.log('Alerta Recibida', payload.cuerpo);
        //enviar mensaje a todos los clientes conectados
        socket.emit('emit-alert', payload);
        console.log('Alerta Enviada', payload);
    });
};
exports.socketController = socketController;
//# sourceMappingURL=controllers.js.map