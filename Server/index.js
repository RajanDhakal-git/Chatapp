const { Server } = require('socket.io');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Socket.IO server is running'));

// This is required for deployment on Vercel
const server = require('http').createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://chatapp-virid-eta.vercel.app', // Frontend Vercel URL
    methods: ['GET', 'POST'],
  },
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for messages from the client
  socket.on('msg', (data) => {
    io.emit('rec', data); // Send the message to everyone, including the sender
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Export server for Vercel deployment
module.exports = server;
