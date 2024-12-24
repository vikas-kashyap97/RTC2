import { useEffect, useRef, useState, useCallback } from 'react';
import { AudioProcessor } from '../lib/audio/AudioProcessor';
import { useStore } from '../store/useStore';
import { useLogger } from './useLogger';
import { useCleanup } from './useCleanup';

export function useAudio() {
  const audioProcessor = useRef<AudioProcessor | null>(null);
  const { activeEffect, isCallActive } = useStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const logger = useLogger('useAudio');

  const cleanup = useCallback(() => {
    if (audioProcessor.current) {
      logger.info('Cleaning up audio processor');
      audioProcessor.current.dispose();
      audioProcessor.current = null;
      setIsInitialized(false);
    }
  }, [logger]);

  useCleanup(cleanup);

  useEffect(() => {
    let mounted = true;

    async function initializeAudio() {
      if (isCallActive && !audioProcessor.current) {
        logger.info('Initializing audio processor');
        audioProcessor.current = new AudioProcessor();
        const initialized = await audioProcessor.current.init();
        if (initialized && mounted) {
          const micSetup = await audioProcessor.current.setupMicrophone();
          setIsInitialized(micSetup);
          logger.info('Audio initialization complete:', { micSetup });
        }
      }
    }

    initializeAudio();

    return () => {
      mounted = false;
      cleanup();
    };
  }, [isCallActive, logger, cleanup]);

  useEffect(() => {
    if (audioProcessor.current && isInitialized) {
      logger.info('Updating voice effect:', activeEffect);
      audioProcessor.current.applyEffect(activeEffect);
    }
  }, [activeEffect, isInitialized, logger]);

  return { isInitialized };
}