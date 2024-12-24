import React from 'react';
import { User as UserIcon } from 'lucide-react';
import { useStore } from '../store/useStore';

export const UsersList = () => {
  const { users } = useStore();

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 p-4 border-l dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Online Users
      </h2>
      
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-3 p-2 rounded-md bg-white dark:bg-gray-800"
          >
            <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user.name}
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </div>
        ))}
      </div>
    </div>
  );
};