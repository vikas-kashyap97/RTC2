type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export function useLogger(context: string) {
  const log = (level: LogLevel, message: string, ...args: any[]) => {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] [${context}] ${message}`, ...args);
  };

  return {
    info: (message: string, ...args: any[]) => log('info', message, ...args),
    warn: (message: string, ...args: any[]) => log('warn', message, ...args),
    error: (message: string, ...args: any[]) => log('error', message, ...args),
    debug: (message: string, ...args: any[]) => log('debug', message, ...args),
  };
}