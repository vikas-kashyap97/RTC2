import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useTheme() {
  const { isDarkMode } = useStore();

  useEffect(() => {
    console.log('Theme changed:', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
}