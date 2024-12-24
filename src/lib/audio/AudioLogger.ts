export class AudioLogger {
  private context = 'AudioProcessor';

  info(message: string, ...args: any[]) {
    console.info(`[${this.context}] ${message}`, ...args);
  }

  error(message: string, ...args: any[]) {
    console.error(`[${this.context}] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]) {
    console.warn(`[${this.context}] ${message}`, ...args);
  }
}