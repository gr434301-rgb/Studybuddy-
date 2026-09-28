import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Settings, Moon, Sun, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { aiVoice, PERSONAS_CONFIG, VoicePersona } from '../utils/aiVoice';

export const Header: React.FC = () => {
  const {
    user,
    currentTab,
    setCurrentTab,
    darkMode,
    setDarkMode,
    soundEnabled,
    setSoundEnabled,
    viewMode,
    setViewMode
  } = useApp();

  const [currentPersona, setCurrentPersona] = useState<VoicePersona>(() => aiVoice.getPersona());

  const handleCyclePersona = () => {
    const sequence: VoicePersona[] = ['amitabh', 'bharti', 'deactivated'];
    const nextIdx = (sequence.indexOf(currentPersona) + 1) % sequence.length;
    const nextPersona = sequence[nextIdx];
    setCurrentPersona(nextPersona);
    aiVoice.setPersona(nextPersona);
    if (nextPersona !== 'deactivated') {
      aiVoice.speakIntro(nextPersona);
    }
  };

  return (
    <header className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-10 shrink-0 select-none">
      {/* Profile & Level */}
      <div 
        onClick={() => setCurrentTab('settings')}
        className="flex items-center gap-2.5 cursor-pointer group"
        title="View Profile & Settings"
      >
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border-2 border-indigo-500/80 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform">
          <span>{user.avatar || '👨‍🎓'}</span>
        </div>
        <div className="text-left">
          <h2 className="text-sm font-bold leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {user.name}
          </h2>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Class 10</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Lvl {user.level}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{user.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5">
        {/* Streak Pill */}
        <div 
          onClick={() => setCurrentTab('leaderboard')}
          className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900/50 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
          title="Daily Study Streak"
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 tabular-nums">
            {user.streak}d
          </span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
          aria-label={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Quick AI Voice Persona Pill (Amitabh / Bharti / Deactivated) */}
        <button
          onClick={handleCyclePersona}
          className="flex items-center gap-1 px-2 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-[11px] font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-colors"
          title={`Active AI Voice: ${PERSONAS_CONFIG[currentPersona].name} (Click to switch between Amitabh, Bharti, or Mute)`}
        >
          <span>{PERSONAS_CONFIG[currentPersona].avatar}</span>
          <span className="hidden sm:inline">{PERSONAS_CONFIG[currentPersona].name.split(' ')[0]}</span>
        </button>

        {/* View Mode Toggle (Mobile Frame vs Full Screen) */}
        <button
          onClick={() => setViewMode(viewMode === 'mobile' ? 'wide' : 'mobile')}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={viewMode === 'mobile' ? 'Switch to Wide Desktop View' : 'Switch to Mobile Frame'}
          aria-label="Toggle screen frame"
        >
          {viewMode === 'mobile' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Settings button */}
        <button
          onClick={() => setCurrentTab('settings')}
          className={`p-2 rounded-xl transition-colors ${
            currentTab === 'settings'
              ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Settings"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
