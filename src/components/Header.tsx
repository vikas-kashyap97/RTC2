import React from 'react';
import { Share2, Moon, Sun, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header = () => {
  const { isDarkMode, toggleDarkMode, currentUser } = useStore();

  const copyInviteLink = () => {
    const link = `${window.location.origin}?id=${currentUser?.id}`;
    navigator.clipboard.writeText(link);
    alert('Invite link copied to clipboard!');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        VoiceChanger
      </h1>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={copyInviteLink}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Link
        </button>
        
        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        
        <div className="flex items-center">
          <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </header>
  );
};