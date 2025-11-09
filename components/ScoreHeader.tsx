
import React from 'react';

interface ScoreHeaderProps {
  totalScore: number;
}

const POINTS_PER_LEVEL = 175;

const ScoreHeader: React.FC<ScoreHeaderProps> = ({ totalScore }) => {
  const level = Math.floor(totalScore / POINTS_PER_LEVEL) + 1;
  const pointsInCurrentLevel = totalScore % POINTS_PER_LEVEL;
  const progressPercentage = (pointsInCurrentLevel / POINTS_PER_LEVEL) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-700">Nivel {level}</h2>
        <p className="text-lg font-semibold text-indigo-500">
          {pointsInCurrentLevel} / {POINTS_PER_LEVEL} PTS
        </p>
      </div>
      <div className="w-full bg-indigo-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-amber-400 to-orange-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={pointsInCurrentLevel}
          aria-valuemin={0}
          aria-valuemax={POINTS_PER_LEVEL}
        ></div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">
        {totalScore > 0 ? `¡Sigue así para llegar al nivel ${level + 1}!` : '¡Completa tareas para subir de nivel!'}
      </p>
    </div>
  );
};

export default ScoreHeader;
