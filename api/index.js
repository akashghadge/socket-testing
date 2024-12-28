// Importing required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path'); // Import the path module

// Create an express app and HTTP server
const app = express();
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = new Server(server);

// Serve static files (HTML) from the current directory
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for messages from the client
    socket.on('message', (msg) => {
        console.log(`Message received: ${msg}`);
        // Broadcast the message to all connected clients
        io.emit('message', msg);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
