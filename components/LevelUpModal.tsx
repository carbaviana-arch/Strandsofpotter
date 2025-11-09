
import React from 'react';
import { StarBadgeIcon } from './icons';

interface LevelUpModalProps {
  level: number;
  badgeName: string;
  onClose: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, badgeName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity animate-fade-in">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-auto transform animate-scale-in border-4 border-white/50">
        <div className="mx-auto -mt-20 w-32 h-32 flex items-center justify-center">
            <StarBadgeIcon />
        </div>
        <h2 className="text-3xl font-bold text-white mt-2">¡Subiste de Nivel!</h2>
        <p className="text-indigo-200 text-lg mt-1">Alcanzaste el Nivel {level}</p>
        <div className="bg-white/20 rounded-lg p-4 my-6">
            <p className="text-sm text-indigo-100">Insignia Desbloqueada:</p>
            <p className="text-xl font-bold text-white">{badgeName}</p>
        </div>
        <button
          onClick={onClose}
          className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 transition transform hover:scale-105"
        >
          ¡Continuar!
        </button>
      </div>
    </div>
  );
};

export default LevelUpModal;
