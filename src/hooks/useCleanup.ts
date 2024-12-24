import { useEffect } from 'react';
import { useLogger } from './useLogger';

export function useCleanup(cleanup: () => void) {
  const logger = useLogger('useCleanup');

  useEffect(() => {
    const handleBeforeUnload = () => {
      logger.info('Cleaning up before page unload');
      cleanup();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      cleanup();
    };
  }, [cleanup, logger]);
}