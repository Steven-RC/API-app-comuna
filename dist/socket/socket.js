"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const listenConection = (server) => {
    const io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
        socket.on('message', (message) => {
            console.log(message);
            io.emit('message', message);
        });
    });
};
exports.default = listenConection;
//# sourceMappingURL=socket.js.map