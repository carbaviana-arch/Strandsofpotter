import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onScoreTask: (id: string, action: 'add' | 'subtract') => void;
  onResetTask: (id: string) => void;
  loadingTaskId: string | null;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onScoreTask, onResetTask, loadingTaskId }) => {
  
  const allTasksScored = tasks.every(task => task.status !== 'pending');

  if (allTasksScored) {
    return (
      <div className="text-center py-10 px-4 bg-white/70 rounded-xl shadow-inner">
        <img src="https://picsum.photos/seed/kidstasks-done/200/200" alt="Niño celebrando" className="mx-auto rounded-full w-32 h-32 mb-4"/>
        <p className="text-gray-600 text-xl font-bold">¡Felicidades!</p>
        <p className="text-gray-500">Has calificado todas las tareas de hoy.</p>
      </div>
    );
  }
  
  // Fix: The `reduce` function's accumulator type was incorrectly inferred.
  // By providing a generic type argument, we ensure `groupedTasks` is correctly typed,
  // which resolves the downstream error on `tasksInCategory.map`.
  const groupedTasks = tasks.reduce<Record<string, Task[]>>((acc, task) => {
    (acc[task.category] = acc[task.category] || []).push(task);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedTasks).map(([category, tasksInCategory]) => (
        <div key={category}>
            <h2 className="text-xl font-bold text-indigo-600 mb-3 px-2">{category}</h2>
            <ul className="space-y-3">
            {tasksInCategory.map((task) => (
                <TaskItem
                key={task.id}
                task={task}
                onScore={onScoreTask}
                onReset={onResetTask}
                isLoading={loadingTaskId === task.id}
                />
            ))}
            </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskList;