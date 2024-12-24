export const CONFIG = {
  PORT: process.env.PORT || 3001,
  CORS_ORIGIN: 'https://rtc2.netlify.app',
  METHODS: ['GET', 'POST']
} as const;

export type User = {
  id: string;
  name: string;
  isOnline: boolean;
};