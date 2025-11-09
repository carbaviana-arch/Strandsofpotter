
import React from 'react';
import { Task } from '../types';
import { CheckIcon, PlusIcon, MinusIcon, XIcon, ResetIcon } from './icons';

interface TaskItemProps {
  task: Task;
  onScore: (id: string, action: 'add' | 'subtract') => void;
  onReset: (id: string) => void;
  isLoading: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onScore, onReset, isLoading }) => {
  const isPending = task.status === 'pending';

  const containerClasses = {
    pending: 'bg-white shadow-sm hover:shadow-md',
    completed: 'bg-emerald-200/70 text-gray-500',
    penalized: 'bg-rose-200/70 text-gray-500',
  };

  const handleScore = (e: React.MouseEvent, action: 'add' | 'subtract') => {
    e.stopPropagation();
    if (!isLoading && isPending) {
      onScore(task.id, action);
    }
  };

  return (
    <li
      aria-disabled={isLoading || !isPending}
      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
        containerClasses[task.status]
      } ${isLoading ? 'opacity-70 cursor-wait' : ''} ${!isPending ? 'cursor-default' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${
            task.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
            task.status === 'penalized' ? 'bg-rose-500 border-rose-500' :
            'border-gray-300 bg-white'
          }`}
        >
          {task.status === 'completed' && <CheckIcon />}
          {task.status === 'penalized' && <XIcon />}
        </div>
        <span className={`flex-grow text-lg ${!isPending ? 'line-through' : 'text-gray-800'}`}>
          {task.name}
        </span>
      </div>

      <div className="flex items-center justify-end gap-2" style={{width: '110px'}}>
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        ) : isPending ? (
          <>
            <button 
              onClick={(e) => handleScore(e, 'subtract')} 
              className="bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-400"
              aria-label={`Restar ${task.penalty} puntos`}
            >
              <MinusIcon />
            </button>
            <button 
              onClick={(e) => handleScore(e, 'add')} 
              className="bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label={`Sumar ${task.points} puntos`}
            >
              <PlusIcon />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-end gap-2 w-full">
            <div className="text-center font-bold text-xl flex-grow">
              {task.status === 'completed' ? (
                <span className="text-emerald-600">+{task.points}</span>
              ) : (
                <span className="text-rose-600">-{task.penalty}</span>
              )}
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onReset(task.id); }}
                className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Reestablecer tarea"
            >
                <ResetIcon />
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
