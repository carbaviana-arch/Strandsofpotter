
import React from 'react';

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

interface DaySelectorProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, onDayChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="day-select" className="block text-lg font-medium text-indigo-600 mb-2 px-2">
        Día de la semana
      </label>
      <select
        id="day-select"
        value={selectedDay}
        onChange={(e) => onDayChange(e.target.value)}
        className="w-full p-3 bg-white border-2 border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        {daysOfWeek.map(day => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DaySelector;
