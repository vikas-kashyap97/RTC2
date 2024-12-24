export type User = {
  id: string;
  name: string;
  isOnline: boolean;
};

export type Message = {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  type: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
};

export type VoiceEffect = 'normal' | 'male' | 'female' | 'child' | 'robot';