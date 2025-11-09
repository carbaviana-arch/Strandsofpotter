
import React from 'react';

interface SuggestionModalProps {
  suggestions: string[];
  isLoading: boolean;
  onClose: () => void;
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ suggestions, isLoading, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-auto transform animate-scale-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">¡Ideas para divertirse!</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <ul className="space-y-3 list-disc list-inside text-gray-700">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-lg">{suggestion}</li>
            ))}
          </ul>
        )}
        <div className="text-center mt-6">
          <button
            onClick={onClose}
            className="bg-teal-500 text-white font-bold py-2 px-6 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transition transform hover:scale-105"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuggestionModal;
