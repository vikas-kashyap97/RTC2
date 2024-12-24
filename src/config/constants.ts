export const AUDIO_CONFIG = {
  NOISE_GATE_THRESHOLD: -50,
  PITCH_SHIFTS: {
    NORMAL: 0,
    MALE: -12,
    FEMALE: 12,
    CHILD: 24,
    ROBOT: -24
  }
} as const;

export const SOCKET_CONFIG = {
  URL: import.meta.env.VITE_SOCKET_URL || 'https://rtc2.netlify.app',
  RECONNECTION_ATTEMPTS: 5,
  RECONNECTION_DELAY: 1000
} as const;