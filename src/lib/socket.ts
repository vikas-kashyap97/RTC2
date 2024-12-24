import { io } from 'socket.io-client';
import { SOCKET_CONFIG } from '../config/constants';

export const socket = io(SOCKET_CONFIG.URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: SOCKET_CONFIG.RECONNECTION_ATTEMPTS,
  reconnectionDelay: SOCKET_CONFIG.RECONNECTION_DELAY,
  transports: ['websocket', 'polling']
});