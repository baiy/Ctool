#!/usr/bin/node
// node server.js
const WebSocket = require("ws")
const wss = new WebSocket.WebSocketServer({ port: 23451 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        ws.send(`Server: ${data}`)
    });

    ws.send('welcome');
});
