// src/App.tsx
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import CelebrationModal from './components/CelebrationModal';
import SuggestionModal from './components/SuggestionModal';
import ScoreHeader from './components/ScoreHeader';
import LevelUpModal from './components/LevelUpModal';
import { SparklesIcon, ResetIcon } from './components/icons';
import { Task } from './types';

// Mock del servicio para GitHub Pages
export const getCongratulatoryMessage = async (taskName: string): Promise<string> => {
    return Promise.resolve(`¡Excelente trabajo completando "${taskName}"! 🌟`);
};

export const getActivitySuggestions = async (): Promise<string[]> => {
    return Promise.resolve([
        "Leer un capítulo de tu libro favorito",
        "Ayudar a ordenar la cocina",
        "Practicar algún dibujo o pintura",
        "Hacer un pequeño experimento científico en casa"
    ]);
};

// Datos iniciales de tareas
const initialTaskData = {
    "Aseo e higiene personal": [
        { name: "Lavarse bien los dientes", points: 2, penalty: 2 },
        { name: "Ducharse bien", points: 2, penalty: 2 },
        { name: "Usar desodorante", points: 1, penalty: 1 }
    ],
    "Académico": [
        { name: "Hacer deberes", points: 1, penalty: 1 },
        { name: "Estudiar para controles", points: 2, penalty: 2 },
        { name: "Leer 15 Min", points: 5, penalty: 5 },
        { name: "Repaso Contenidos", points: 3, penalty: 3 }
    ],
    "Hogar": [
        { name: "Ordenar habitación", points: 1, penalty: 1 },
        { name: "Limpiar habitación", points: 2, penalty: 2 },
        { name: "Sacar lavavajillas", points: 1, penalty: 1 },
        { name: "Limpiar baño", points: 2, penalty: 2 }
    ],
    "General": [
        { name: "Lenguaje", points: 1, penalty: 1 },
        { name: "Buena Actitud", points: 1, penalty: 1 },
        { name: "Colabora en Labores Hogar", points: 1, penalty: 1 }
    ]
};

// Generar tareas iniciales con ID único
const getInitialTasks = (): Task[] => {
    return Object.entries(initialTaskData).flatMap(([category, tasks]) =>
        tasks.map(task => ({
            id: `${category}-${task.name}`.replace(/\s+/g, '-'),
            name: task.name,
            points: task.points,
            penalty: task.penalty,
            category,
            status: 'pending',
        }))
    );
};

// Configuración niveles y badges
const POINTS_PER_LEVEL = 175;
const badgeNames = [
    "Principiante Estelar", "Aprendiz Brillante", "Ayudante Habilidoso", "Maestro de Tareas",
    "Campeón de Desafíos", "Héroe del Hogar", "Superestrella Cotidiana", "Leyenda de Logros"
];
const getBadgeNameForLevel = (level: number) => {
    return badgeNames[(level - 2 + badgeNames.length) % badgeNames.length];
};

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedDate = localStorage.getItem('tasksDate');
        const today = new Date().toDateString();
        if (savedDate === today) {
            const savedTasks = localStorage.getItem('tasks');
            return savedTasks ? JSON.parse(savedTasks) : getInitialTasks();
        }
        return getInitialTasks();
    });

    const [totalScore, setTotalScore] = useState<number>(() => {
        const savedDate = localStorage.getItem('tasksDate');
        const today = new Date().toDateString();
        if (savedDate === today) {
            const savedScore = localStorage.getItem('totalScore');
            return savedScore ? JSON.parse(savedScore) : 0;
        }
        return 0;
    });

    const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);
    const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);
    const [completedTaskName, setCompletedTaskName] = useState<string | null>(null);

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestionModal, setShowSuggestionModal] = useState<boolean>(false);
    const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);

    const [levelUpInfo, setLevelUpInfo] = useState<{ level: number, badgeName: string } | null>(null);
    const [showLevelUpModal, setShowLevelUpModal] = useState<boolean>(false);

    useEffect(() => {
        const today = new Date().toDateString();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('totalScore', JSON.stringify(totalScore));
        localStorage.setItem('tasksDate', today);
    }, [tasks, totalScore]);

    const handleScoreTask = async (id: string, action: 'add' | 'subtract') => {
        const taskToScore = tasks.find(t => t.id === id);
        if (!taskToScore || taskToScore.status !== 'pending') return;

        const oldScore = totalScore;

        if (action === 'add') {
            setLoadingTaskId(id);
            try {
                const message = await getCongratulatoryMessage(taskToScore.name);
                setCelebrationMessage(message);
                setCompletedTaskName(taskToScore.name);
            } catch {
                setCelebrationMessage("¡Muy bien hecho!");
                setCompletedTaskName(taskToScore.name);
            } finally {
                const newScore = oldScore + taskToScore.points;
                setTotalScore(newScore);
                setTasks(prev => prev.map(task =>
                    task.id === id ? { ...task, status: 'completed' } : task
                ));
                const oldLevel = Math.floor(oldScore / POINTS_PER_LEVEL);
                const newLevel = Math.floor(newScore / POINTS_PER_LEVEL);
                if (newLevel > oldLevel) {
                    setLevelUpInfo({ level: newLevel + 1, badgeName: getBadgeNameForLevel(newLevel + 1) });
                }
                setLoadingTaskId(null);
            }
        } else { // subtract
            setTotalScore(prev => prev - taskToScore.penalty);
            setTasks(prev => prev.map(task =>
                task.id === id ? { ...task, status: 'penalized' } : task
            ));
        }
    };

    const handleResetTask = (id: string) => {
        const taskToReset = tasks.find(t => t.id === id);
        if (!taskToReset || taskToReset.status === 'pending') return;

        if (taskToReset.status === 'completed') setTotalScore(prev => prev - taskToReset.points);
        else if (taskToReset.status === 'penalized') setTotalScore(prev => prev + taskToReset.penalty);

        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, status: 'pending' } : task
        ));
    };

    const handleResetDay = () => {
        if (window.confirm('¿Estás seguro de que quieres reiniciar el día? Se perderá toda tu puntuación y progreso de hoy.')) {
            setTasks(getInitialTasks());
            setTotalScore(0);
        }
    };

    const closeCelebrationModal = () => {
        setCelebrationMessage(null);
        setCompletedTaskName(null);
        if (levelUpInfo) setShowLevelUpModal(true);
    };

    const closeLevelUpModal = () => {
        setShowLevelUpModal(false);
        setLevelUpInfo(null);
    };

    const handleGetSuggestions = async () => {
        setShowSuggestionModal(true);
        setLoadingSuggestions(true);
        try {
            const suggs = await getActivitySuggestions();
            setSuggestions(suggs);
        } catch {
            setSuggestions(["Error al cargar sugerencias."]);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-indigo-200 font-sans p-4 sm:p-6 md:p-8">
            <main className="max-w-2xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 tracking-tight">
                        Mis Tareas de Hoy
                    </h1>
                    <p className="text-indigo-500 mt-2 text-lg">¡Sube de nivel completando tus tareas!</p>
                </header>

                <ScoreHeader totalScore={totalScore} />

                <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-md">
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleResetDay}
                            className="inline-flex items-center gap-2 bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-transform transform hover:scale-105 shadow-lg"
                        >
                            <ResetIcon />
                            Reiniciar Día
                        </button>
                    </div>
                    <TaskList
                        tasks={tasks}
                        onScoreTask={handleScoreTask}
                        onResetTask={handleResetTask}
                        loadingTaskId={loadingTaskId}
                    />
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={handleGetSuggestions}
                        className="inline-flex items-center gap-2 bg-pink-500 text-white font-bold py-3 px-6 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition-transform transform hover:scale-105 shadow-lg"
                    >
                        <SparklesIcon />
                        ¿Necesitas ideas?
                    </button>
                </div>
            </main>

            {celebrationMessage && completedTaskName && (
                <CelebrationModal
                    message={celebrationMessage}
                    taskName={completedTaskName}
                    onClose={closeCelebrationModal}
                />
            )}

            {showLevelUpModal && levelUpInfo && (
                <LevelUpModal
                    level={levelUpInfo.level}
                    badgeName={levelUpInfo.badgeName}
                    onClose={closeLevelUpModal}
                />
            )}

            {showSuggestionModal && (
                <SuggestionModal
                    suggestions={suggestions}
                    isLoading={loadingSuggestions}
                    onClose={() => setShowSuggestionModal(false)}
                />
            )}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default App;
