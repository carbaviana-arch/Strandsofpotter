// src/components/icons.tsx
import React from 'react';

// Icono de check ✅ para tareas completadas
export const CheckIcon: React.FC = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// Icono de cruz ❌ para tareas penalizadas
export const XIcon: React.FC = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Icono de más ➕ para sumar puntos
export const PlusIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

// Icono de menos ➖ para restar puntos
export const MinusIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

// Icono de reinicio 🔄 para resetear tareas
export const ResetIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0116 0" />
  </svg>
);

// Icono de chispas ✨ para modal de celebración
export const SparklesIcon: React.FC = () => (
  <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0l1.176 3.618L17 5l-2.824 2.382L15 12l-3.618-1.176L8 12l1.382-3.618L7 5l3.824-1.382L12 0z"/>
  </svg>
);

// Icono de estrella 🏅 para modal de subida de nivel
export const StarBadgeIcon: React.FC = () => (
  <svg className="w-20 h-20 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 2.5-7.5L2 9h7l3-7z"/>
  </svg>
);
