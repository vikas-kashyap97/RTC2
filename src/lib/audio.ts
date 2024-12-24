import * as Tone from 'tone';
import { VoiceEffect } from '../types';

export class AudioProcessor {
  private context: AudioContext | null = null;
  private processor: Tone.PitchShift | null = null;
  private noise: Tone.NoiseGate | null = null;
  private stream: MediaStream | null = null;

  async init() {
    console.log('Initializing AudioProcessor');
    try {
      await Tone.start();
      this.context = new AudioContext();
      this.processor = new Tone.PitchShift().toDestination();
      this.noise = new Tone.NoiseGate(-50).connect(this.processor);
      console.log('AudioProcessor initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize AudioProcessor:', error);
      return false;
    }
  }

  async setupMicrophone(): Promise<boolean> {
    console.log('Setting up microphone');
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!this.context || !this.noise) {
        throw new Error('Audio context not initialized');
      }
      
      const source = this.context.createMediaStreamSource(this.stream);
      const toneSource = Tone.getContext().createMediaStreamSource(this.stream);
      toneSource.connect(this.noise);
      
      console.log('Microphone setup successful');
      return true;
    } catch (error) {
      console.error('Microphone setup failed:', error);
      return false;
    }
  }

  applyEffect(effect: VoiceEffect): void {
    console.log('Applying voice effect:', effect);
    if (!this.processor) {
      console.error('Processor not initialized');
      return;
    }

    switch (effect) {
      case 'male':
        this.processor.pitch = -12;
        break;
      case 'female':
        this.processor.pitch = 12;
        break;
      case 'child':
        this.processor.pitch = 24;
        break;
      case 'robot':
        this.processor.pitch = -24;
        break;
      default:
        this.processor.pitch = 0;
    }
    console.log('Effect applied successfully');
  }

  dispose(): void {
    console.log('Disposing AudioProcessor');
    this.processor?.dispose();
    this.noise?.dispose();
    this.context?.close();
    this.stream?.getTracks().forEach(track => track.stop());
  }
}