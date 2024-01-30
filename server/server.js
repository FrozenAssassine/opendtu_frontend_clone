const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

// Manual WebSocket upgrade handling
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

app.use(express.json());

app.post('/openDTU/livedata', (req, res) => {
    const data = req.body;
    const dataString = JSON.stringify(data, null, 2);

    fs.writeFile('livedata.json', dataString + '\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Data stored successfully');

            // Notify connected clients through WebSocket
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send('File Uploaded!');
                    console.log('Notify Client');
                }
            });

            res.status(200).send('Data stored successfully');
        }
    });
});

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(5100, () => {
    console.log('Server started on http://localhost:5100');
});