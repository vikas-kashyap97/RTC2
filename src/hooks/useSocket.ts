import { useEffect, useCallback } from 'react';
import { socket } from '../lib/socket';
import { useStore } from '../store/useStore';
import { User } from '../types';
import { useLogger } from './useLogger';
import { useCleanup } from './useCleanup';

export function useSocket() {
  const { currentUser, setUsers } = useStore();
  const logger = useLogger('useSocket');

  const cleanup = useCallback(() => {
    logger.info('Disconnecting socket');
    socket.disconnect();
  }, [logger]);

  useCleanup(cleanup);

  useEffect(() => {
    if (!currentUser) return;

    logger.info('Connecting socket for user:', currentUser);
    socket.connect();

    const handleConnect = () => {
      logger.info('Socket connected');
      socket.emit('user:join', currentUser);
    };

    const handleUsersUpdate = (users: User[]) => {
      logger.info('Users updated:', users);
      setUsers(users);
    };

    socket.on('connect', handleConnect);
    socket.on('users:update', handleUsersUpdate);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('users:update', handleUsersUpdate);
      cleanup();
    };
  }, [currentUser, setUsers, logger, cleanup]);

  return socket;
}