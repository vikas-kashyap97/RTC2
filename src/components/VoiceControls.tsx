import React from 'react';
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';
import { useStore } from '../store/useStore';
import { VoiceEffect } from '../types';

const effects: VoiceEffect[] = ['normal', 'male', 'female', 'child', 'robot'];

export const VoiceControls = () => {
  const { 
    activeEffect, 
    setActiveEffect, 
    isCallActive, 
    setCallActive,
    isSpeakerOn,
    setSpeakerOn
  } = useStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col space-y-4">
          {/* Voice Effects */}
          <div className="flex justify-center space-x-4">
            {effects.map((effect) => (
              <button
                key={effect}
                onClick={() => setActiveEffect(effect)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize
                  ${activeEffect === effect
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
              >
                {effect}
              </button>
            ))}
          </div>

          {/* Call Controls */}
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => setCallActive(!isCallActive)}
              className={`p-4 rounded-full ${
                isCallActive
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isCallActive ? (
                <PhoneOff className="w-6 h-6 text-white" />
              ) : (
                <Phone className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={() => setSpeakerOn(!isSpeakerOn)}
              className={`p-4 rounded-full ${
                isSpeakerOn
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`}
            >
              {isSpeakerOn ? (
                <Volume2 className="w-6 h-6 text-white" />
              ) : (
                <VolumeX className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};