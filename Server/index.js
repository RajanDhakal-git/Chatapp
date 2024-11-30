const express = require('express');
const { Server } = require('socket.io');
const app = express();

app.get('/', (req, res) => res.send('Socket.IO server is running'));

// Use the PORT provided by Render, or fall back to 3000 for local development
const PORT = process.env.PORT || 3000;

// Create HTTP server for Socket.IO
const server = require('http').createServer(app);

// Set up Socket.IO with the CORS configuration
const io = new Server(server, {
  cors: {
    origin: 'https://chatapp-virid-eta.vercel.app', // Replace with your frontend's deployed URL
    methods: ['GET', 'POST'],
  },
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Broadcast messages to all clients
  socket.on('msg', (data) => {
    io.emit('rec', data); // Emit message to all, including sender
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
