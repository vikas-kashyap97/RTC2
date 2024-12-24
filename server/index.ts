import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { CONFIG } from './config';
import { SocketHandlers } from './socket/handlers';

const app = express();
const httpServer = createServer(app);

// Configure CORS
app.use(cors({
  origin: CONFIG.CORS_ORIGIN,
  methods: CONFIG.METHODS
}));

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: CONFIG.CORS_ORIGIN,
    methods: CONFIG.METHODS
  }
});

// Initialize socket handlers
const socketHandlers = new SocketHandlers();

// Socket.IO connection handling
io.on('connection', (socket) => {
  socketHandlers.handleConnection(socket);
});

// Start server
httpServer.listen(CONFIG.PORT, () => {
  console.log(`
🚀 Server is running!
🌍 Listening on port ${CONFIG.PORT}
🔒 CORS enabled for ${CONFIG.CORS_ORIGIN}
  `);
});