import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VoicePersonaSelector } from './VoicePersonaSelector';
import { 
  User, 
  Settings, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  LogOut, 
  Target, 
  Award, 
  BookOpen, 
  Clock, 
  Check, 
  CheckCircle2 
} from 'lucide-react';

export const ProfileSettingsTab: React.FC = () => {
  const { 
    user, 
    updateUserProfile, 
    resetProgress, 
    logout, 
    soundEnabled, 
    setSoundEnabled, 
    darkMode, 
    setDarkMode, 
    viewMode, 
    setViewMode,
    celebrate
  } = useApp();

  const [name, setName] = useState(user.name);
  const [targetPercent, setTargetPercent] = useState(user.targetPercent);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const AVATARS = ['👨‍🎓', '👩‍🔬', '🧑‍💻', '👩‍🏫', '👨‍🚀', '🌟', '⚡', '📚', '🎯', '🚀'];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || 'Student',
      targetPercent
    });
    setSavedSuccess(true);
    celebrate();
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSelectAvatar = (av: string) => {
    updateUserProfile({ avatar: av });
  };

  const accuracy = Math.round((user.correctCount / Math.max(1, user.questionsSolved)) * 100);

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 p-4.5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border-2 border-indigo-500 flex items-center justify-center text-3xl shadow-sm shrink-0">
          <span>{user.avatar}</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {user.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            CBSE Class 10 · +91 {user.phone}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Level {user.level}</span>
            <span>·</span>
            <span className="tabular-nums">{user.xp} XP</span>
            <span>·</span>
            <span>{user.streak}d Streak</span>
          </div>
        </div>
      </div>

      {/* Cumulative Study Stats */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Questions Solved
          </span>
          <span className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
            {user.questionsSolved}
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block">
            {accuracy}% accuracy rate
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Focused Study Time
          </span>
          <span className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
            {Math.floor(user.totalStudyMinutes / 60)}h {user.totalStudyMinutes % 60}m
          </span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium block">
            {user.completedChapterIds.length} chapters revised
          </span>
        </div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Student Profile Details
        </h4>

        {/* Avatar Picker */}
        <div>
          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1.5">
            Select Your Avatar
          </label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {AVATARS.map(av => (
              <button
                key={av}
                type="button"
                onClick={() => handleSelectAvatar(av)}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center text-lg transition-transform shrink-0 ${
                  user.avatar === av
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 scale-110 shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Student Name */}
        <div>
          <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">
            Student Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:outline-none focus:border-indigo-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Target Percentage */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              Class 10 Target Board Percentage
            </label>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {targetPercent}%
            </span>
          </div>
          <input
            type="range"
            min={75}
            max={100}
            step={1}
            value={targetPercent}
            onChange={(e) => setTargetPercent(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <span>Update Profile</span>
          )}
        </button>
      </form>

      {/* App Preferences & Persistent Theme */}
      <div className="bg-white dark:bg-slate-800 p-4.5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            System-Wide Theme & Appearance
          </h4>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            Auto-Persisted
          </span>
        </div>

        {/* Visual Dual Theme Selector Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Light Theme Card */}
          <button
            type="button"
            onClick={() => setDarkMode(false)}
            className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
              !darkMode
                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20 shadow-xs'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-900/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Sun className="w-4 h-4" />
                </div>
                {!darkMode && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              <span className="text-xs font-bold block text-slate-900 dark:text-white">
                Light Mode
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                High contrast crisp layout for daylight study
              </p>
            </div>
          </button>

          {/* Dark Theme Card */}
          <button
            type="button"
            onClick={() => setDarkMode(true)}
            className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
              darkMode
                ? 'border-indigo-500 bg-indigo-950/40 ring-2 ring-indigo-500/30 shadow-xs'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-900/40'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-900/60 flex items-center justify-center text-indigo-400">
                  <Moon className="w-4 h-4" />
                </div>
                {darkMode && (
                  <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              <span className="text-xs font-bold block text-slate-900 dark:text-white">
                Dark Mode
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                Deep slate OLED theme for night revision
              </p>
            </div>
          </button>
        </div>

        {/* Master Toggle Bar with Persistence Notice */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {darkMode ? (
              <Moon className="w-4 h-4 text-indigo-400 shrink-0" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Persistent Dark Mode
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                  darkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {darkMode ? 'ON' : 'OFF'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                Saved permanently in browser storage across all sessions
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            role="switch"
            aria-checked={darkMode}
            aria-label="Toggle system-wide dark mode"
            className={`w-12 h-6.5 rounded-full transition-colors relative p-0.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
              darkMode ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <div className={`w-5.5 h-5.5 rounded-full bg-white shadow-xs transition-transform flex items-center justify-center ${
              darkMode ? 'translate-x-5.5' : 'translate-x-0'
            }`}>
              {darkMode ? (
                <Moon className="w-3 h-3 text-indigo-600" />
              ) : (
                <Sun className="w-3 h-3 text-amber-500" />
              )}
            </div>
          </button>
        </div>

        {/* Audio Sound */}
        <div className="flex items-center justify-between py-1 border-t border-slate-100 dark:border-slate-700/60 pt-3">
          <div className="flex items-center gap-2">
            {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <div>
              <span className="text-xs font-bold block text-slate-900 dark:text-white">Audio Sound Effects</span>
              <span className="text-[10px] text-slate-400">Chimes for correct answers & timer bell</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              soundEnabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              soundEnabled ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Mobile Frame vs Wide Mode */}
        <div className="flex items-center justify-between py-1 border-t border-slate-100 dark:border-slate-700/60 pt-2">
          <div className="flex items-center gap-2">
            {viewMode === 'mobile' ? <Minimize2 className="w-4 h-4 text-indigo-500" /> : <Maximize2 className="w-4 h-4 text-indigo-500" />}
            <div>
              <span className="text-xs font-bold block text-slate-900 dark:text-white">Layout Mode</span>
              <span className="text-[10px] text-slate-400">
                {viewMode === 'mobile' ? 'Mobile Phone Frame' : 'Full Screen Responsive'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'mobile' ? 'wide' : 'mobile')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {viewMode === 'mobile' ? 'Expand View' : 'Phone Shell'}
          </button>
        </div>
      </div>

      {/* AI Voice Personalization (Amitabh Bachchan & Bharti & Deactivated) */}
      <VoicePersonaSelector />

      {/* Danger Zone: Reset & Logout */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Account Actions
        </h4>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              Reset Progress
            </span>
            <span className="text-[10px] text-slate-400">
              Clear answered questions, streak & XP
            </span>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your quiz & streak progress?')) {
                resetProgress();
              }
            }}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
          >
            Reset Data
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              Log Out
            </span>
            <span className="text-[10px] text-slate-400">
              Switch user or phone account
            </span>
          </div>
          <button
            onClick={logout}
            className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
