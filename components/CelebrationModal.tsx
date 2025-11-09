// src/components/CelebrationModal.tsx
import React from 'react';
import { SparklesIcon } from './icons';

interface CelebrationModalProps {
  message: string;
  taskName: string;
  onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ message, taskName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity animate-fade-in">
      <div className="bg-gradient-to-br from-amber-300 to-orange-400 p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-auto transform animate-scale-in border-4 border-white">
        <div className="text-yellow-900 mx-auto -mt-16 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
          <SparklesIcon />
        </div>
        <h2 className="text-2xl font-bold text-white mt-4">¡Felicidades!</h2>
        <p className="text-yellow-800 text-sm mt-1">
          Completaste: <span className="font-semibold">{taskName}</span>
        </p>
        <p className="text-xl font-medium text-white my-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-white text-orange-500 font-bold py-2 px-6 rounded-full hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition transform hover:scale-105"
        >
          ¡Genial!
        </button>
      </div>
    </div>
  );
};

export default CelebrationModal;
