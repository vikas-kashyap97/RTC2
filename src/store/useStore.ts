import { create } from 'zustand';
import { VoiceEffect, User, Message } from '../types';

interface AppState {
  users: User[];
  messages: Message[];
  currentUser: User | null;
  activeEffect: VoiceEffect;
  isCallActive: boolean;
  isSpeakerOn: boolean;
  isDarkMode: boolean;
  setUsers: (users: User[]) => void;
  addMessage: (message: Message) => void;
  setCurrentUser: (user: User | null) => void;
  setActiveEffect: (effect: VoiceEffect) => void;
  setCallActive: (active: boolean) => void;
  setSpeakerOn: (on: boolean) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>((set) => ({
  users: [],
  messages: [],
  currentUser: null,
  activeEffect: 'normal',
  isCallActive: false,
  isSpeakerOn: false,
  isDarkMode: false,
  setUsers: (users) => set({ users }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setCurrentUser: (user) => set({ currentUser: user }),
  setActiveEffect: (effect) => set({ activeEffect: effect }),
  setCallActive: (active) => set({ isCallActive: active }),
  setSpeakerOn: (on) => set({ isSpeakerOn: on }),
  toggleDarkMode: () => set((state) => ({ 
    isDarkMode: !state.isDarkMode 
  })),
}));