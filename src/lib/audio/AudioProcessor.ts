import * as Tone from 'tone';
import { VoiceEffect } from '../../types';
import { AUDIO_CONFIG } from '../../config/constants';
import { AudioLogger } from './AudioLogger';

export class AudioProcessor {
  private context: AudioContext | null = null;
  private processor: Tone.PitchShift | null = null;
  private noise: Tone.NoiseGate | null = null;
  private stream: MediaStream | null = null;
  private logger: AudioLogger;

  constructor() {
    this.logger = new AudioLogger();
  }

  async init(): Promise<boolean> {
    this.logger.info('Initializing AudioProcessor');
    try {
      await Tone.start();
      this.context = new AudioContext();
      this.processor = new Tone.PitchShift().toDestination();
      this.noise = new Tone.NoiseGate(AUDIO_CONFIG.NOISE_GATE_THRESHOLD).connect(this.processor);
      this.logger.info('AudioProcessor initialized successfully');
      return true;
    } catch (error) {
      this.logger.error('Failed to initialize AudioProcessor:', error);
      return false;
    }
  }

  async setupMicrophone(): Promise<boolean> {
    this.logger.info('Setting up microphone');
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!this.context || !this.noise) {
        throw new Error('Audio context not initialized');
      }
      
      const source = this.context.createMediaStreamSource(this.stream);
      const toneSource = Tone.getContext().createMediaStreamSource(this.stream);
      toneSource.connect(this.noise);
      
      this.logger.info('Microphone setup successful');
      return true;
    } catch (error) {
      this.logger.error('Microphone setup failed:', error);
      return false;
    }
  }

  applyEffect(effect: VoiceEffect): void {
    this.logger.info('Applying voice effect:', effect);
    if (!this.processor) {
      this.logger.error('Processor not initialized');
      return;
    }

    const pitch = AUDIO_CONFIG.PITCH_SHIFTS[effect.toUpperCase() as keyof typeof AUDIO_CONFIG.PITCH_SHIFTS];
    this.processor.pitch = pitch;
    this.logger.info('Effect applied with pitch:', pitch);
  }

  dispose(): void {
    this.logger.info('Disposing AudioProcessor');
    this.processor?.dispose();
    this.noise?.dispose();
    this.context?.close();
    this.stream?.getTracks().forEach(track => track.stop());
  }
}