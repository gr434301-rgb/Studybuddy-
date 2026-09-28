import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, BookOpen, Sparkles, Clock, Compass } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ncert', label: 'NCERT Hub', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Sparkles },
    { id: 'timer', label: 'Timer', icon: Clock },
    { id: 'menu', label: 'Explore', icon: Compass }
  ];

  return (
    <nav className="border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2 py-1.5 shrink-0 z-20">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id || (item.id === 'menu' && ['formulas', 'leaderboard', 'mistakes', 'settings'].includes(currentTab));
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id === 'menu' ? 'formulas' : item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-indigo-50 dark:bg-indigo-950/60' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.3]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
