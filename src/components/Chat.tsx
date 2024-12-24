import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useStore } from '../store/useStore';
import { v4 as uuidv4 } from 'uuid';

export const Chat = () => {
  const { messages, addMessage, currentUser } = useStore();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim() || !currentUser) return;

    addMessage({
      id: uuidv4(),
      userId: currentUser.id,
      content: message,
      timestamp: Date.now(),
      type: 'text'
    });

    setMessage('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    // In a real app, you would upload the file to a server here
    addMessage({
      id: uuidv4(),
      userId: currentUser.id,
      content: `Shared a file: ${file.name}`,
      timestamp: Date.now(),
      type: 'file',
      fileName: file.name
    });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.userId === currentUser?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.userId === currentUser?.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              {msg.type === 'file' && (
                <div className="mt-1 text-xs opacity-75">
                  📎 {msg.fileName}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t dark:border-gray-700 p-4">
        <div className="flex space-x-2">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,audio/*,video/*"
            />
            <Paperclip className="w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
          </label>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            onClick={handleSend}
            className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};