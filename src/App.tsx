import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { VoiceControls } from './components/VoiceControls';
import { UsersList } from './components/UsersList';
import { Chat } from './components/Chat';
import { useStore } from './store/useStore';
import { useTheme } from './hooks/useTheme';
import { useSocket } from './hooks/useSocket';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const { setCurrentUser } = useStore();
  useTheme();
  useSocket();

  useEffect(() => {
    // Check for shared user ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedId = urlParams.get('id');
    
    console.log('Initializing app with shared ID:', sharedId);

    // Initialize current user
    setCurrentUser({
      id: uuidv4(),
      name: `User-${Math.floor(Math.random() * 1000)}`,
      isOnline: true
    });
  }, [setCurrentUser]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full flex items-center justify-center">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                Start a call to begin voice chat
              </p>
            </div>
          </div>
          
          <div className="h-96">
            <Chat />
          </div>
        </div>
        
        <UsersList />
      </main>
      
      <VoiceControls />
    </div>
  );
}
export default App;