import type { Socket } from 'socket.io';
import type { User } from '../config';

export class SocketHandlers {
  private users = new Map<string, User>();

  handleConnection(socket: Socket) {
    console.log('🟢 User connected:', socket.id);
    
    socket.on('user:join', (user: User) => this.handleUserJoin(socket, user));
    socket.on('disconnect', () => this.handleDisconnect(socket));
  }

  private handleUserJoin(socket: Socket, user: User) {
    console.log('👤 User joined:', { socketId: socket.id, user });
    this.users.set(socket.id, user);
    this.broadcastUsers(socket);
  }

  private handleDisconnect(socket: Socket) {
    console.log('🔴 User disconnected:', socket.id);
    this.users.delete(socket.id);
    this.broadcastUsers(socket);
  }

  private broadcastUsers(socket: Socket) {
    const usersList = Array.from(this.users.values());
    console.log('📢 Broadcasting users update:', usersList);
    socket.broadcast.emit('users:update', usersList);
  }
}