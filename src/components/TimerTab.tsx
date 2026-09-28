import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { soundEngine } from '../utils/audio';
import { SubjectId } from '../types';
import { SessionRecapModal } from './SessionRecapModal';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Headphones, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  VolumeX,
  Award,
  FastForward,
  FileText
} from 'lucide-react';

interface TimerTabProps {
  onPracticeSubject?: (subject: SubjectId) => void;
  onOpenNotes?: (subject: SubjectId) => void;
}

export const TimerTab: React.FC<TimerTabProps> = ({ onPracticeSubject, onOpenNotes }) => {
  const { user, recordStudySession, celebrate } = useApp();

  // Presets in minutes (from 25 min pomodoro to 6 hours!) plus 10s quick test
  const PRESETS: Array<{ label: string; minutes: number; seconds?: number }> = [
    { label: '10s (Test Recap)', minutes: 1, seconds: 10 },
    { label: '25m (Pomodoro)', minutes: 25 },
    { label: '45m (School Period)', minutes: 45 },
    { label: '1 Hour', minutes: 60 },
    { label: '2 Hours (Deep Study)', minutes: 120 },
    { label: '3 Hours (Mock Test)', minutes: 180 },
    { label: '4 Hours', minutes: 240 },
    { label: '6 Hours (Marathon)', minutes: 360 }
  ];

  const [selectedMinutes, setSelectedMinutes] = useState<number>(45);
  const [timeLeft, setTimeLeft] = useState<number>(45 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeSubject, setActiveSubject] = useState<SubjectId>('science');
  const [ambientSound, setAmbientSound] = useState<'off' | 'rain' | 'whitenoise' | 'focuswaves'>('off');
  const [completedSessionNotice, setCompletedSessionNotice] = useState<boolean>(false);
  const [showRecapModal, setShowRecapModal] = useState<boolean>(false);
  const [lastFinishedMinutes, setLastFinishedMinutes] = useState<number>(45);

  // Sync timeLeft when preset changes if not currently running
  const handleSelectPreset = (preset: { label: string; minutes: number; seconds?: number }) => {
    if (isRunning) return;
    setSelectedMinutes(preset.minutes);
    setTimeLeft(preset.seconds ? preset.seconds : preset.minutes * 60);
    setCompletedSessionNotice(false);
  };

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            soundEngine.stopAmbient();
            recordStudySession(selectedMinutes, activeSubject);
            celebrate();
            setLastFinishedMinutes(selectedMinutes);
            setCompletedSessionNotice(true);
            setShowRecapModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, selectedMinutes, activeSubject, recordStudySession, celebrate]);

  // Ambient sound handler
  const handleToggleAmbient = (sound: 'rain' | 'whitenoise' | 'focuswaves') => {
    if (ambientSound === sound) {
      soundEngine.stopAmbient();
      setAmbientSound('off');
    } else {
      soundEngine.startAmbient(sound);
      setAmbientSound(sound);
    }
  };

  const handleTogglePlay = () => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(selectedMinutes * 60);
    }
    setIsRunning(!isRunning);
    setCompletedSessionNotice(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedMinutes * 60);
    soundEngine.stopAmbient();
    setAmbientSound('off');
    setCompletedSessionNotice(false);
  };

  // Immediate simulation of timer expiration for testing
  const handleSimulateFinish = () => {
    setIsRunning(false);
    setTimeLeft(0);
    soundEngine.stopAmbient();
    recordStudySession(selectedMinutes, activeSubject);
    celebrate();
    setLastFinishedMinutes(selectedMinutes);
    setCompletedSessionNotice(true);
    setShowRecapModal(true);
  };

  const handleStartAnotherSession = () => {
    setShowRecapModal(false);
    setTimeLeft(selectedMinutes * 60);
    setIsRunning(true);
  };

  // Clean up ambient on unmount
  useEffect(() => {
    return () => {
      soundEngine.stopAmbient();
    };
  }, []);

  const totalSeconds = selectedMinutes * 60;
  const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - timeLeft) / totalSeconds) * 100));

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const displayTime = hours > 0
    ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="p-4 space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Class 10 Deep Focus Study Timer</h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            1 to 6 Hours study blocks with focus audio
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
            Total Focused Today
          </span>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {Math.floor(user.totalStudyMinutes / 60)}h {user.totalStudyMinutes % 60}m
          </span>
        </div>
      </div>

      {/* Subject Tag Selector */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Target Study Subject
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {[
            { id: 'maths', label: '📐 Maths' },
            { id: 'science', label: '🧪 Science' },
            { id: 'social', label: '🌍 Social' },
            { id: 'english', label: '📖 English' },
            { id: 'hindi', label: '🪷 Hindi' }
          ].map(sub => (
            <button
              key={sub.id}
              onClick={() => setActiveSubject(sub.id as SubjectId)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition border ${
                activeSubject === sub.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Circular Timer Display Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs text-center space-y-4 relative overflow-hidden">
        {/* Circular progress representation */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-slate-100 dark:text-slate-700 stroke-current"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Foreground progress ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-indigo-600 dark:text-indigo-400 stroke-current transition-all duration-300"
              strokeWidth="6"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Digital Clock */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
              {displayTime}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
              {isRunning ? 'Focus In Progress' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Play / Pause / Reset Control Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleTogglePlay}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition flex items-center gap-2 ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>Start Focus</span>
              </>
            )}
          </button>

          {/* Quick simulation / test button for instant timer completion */}
          <button
            onClick={handleSimulateFinish}
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition"
            title="Simulate Timer Completion & Test Session Recap Modal"
          >
            <FastForward className="w-5 h-5" />
          </button>
        </div>

        {/* Completed Session Notification & View Recap */}
        {completedSessionNotice && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bravo! {lastFinishedMinutes} minutes added to your Class 10 record!</span>
            </div>
            <button
              onClick={() => setShowRecapModal(true)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Session Recap</span>
            </button>
          </div>
        )}
      </div>

      {/* Duration Presets (1 to 6 Hours) */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Duration Presets (1 to 6 Hours)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => handleSelectPreset(p)}
              disabled={isRunning}
              className={`p-2.5 rounded-xl text-xs font-medium border text-center transition ${
                selectedMinutes === p.minutes && (!p.seconds || timeLeft <= 10)
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-bold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400'
              } disabled:opacity-50`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Focus Audio Synthesizer Controls */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs font-bold">Focus Ambient Audio (Built-in Synthesizer)</h4>
          </div>
          {ambientSound !== 'off' && (
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
              ● Active
            </span>
          )}
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Scientifically modeled brown/white noise to block outside chatter and distractions.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => handleToggleAmbient('rain')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
              ambientSound === 'rain'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400'
            }`}
          >
            <span>🌧️ Rain</span>
          </button>

          <button
            onClick={() => handleToggleAmbient('whitenoise')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
              ambientSound === 'whitenoise'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400'
            }`}
          >
            <span>📻 White Noise</span>
          </button>

          <button
            onClick={() => handleToggleAmbient('focuswaves')}
            className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
              ambientSound === 'focuswaves'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400'
            }`}
          >
            <span>🧘 Alpha Waves</span>
          </button>
        </div>
      </div>

      {/* Session Recap Modal */}
      <SessionRecapModal
        isOpen={showRecapModal}
        onClose={() => setShowRecapModal(false)}
        minutesSpent={lastFinishedMinutes}
        subject={activeSubject}
        onStartAnotherSession={handleStartAnotherSession}
        onPracticeSubject={(sub) => {
          setShowRecapModal(false);
          if (onPracticeSubject) {
            onPracticeSubject(sub);
          }
        }}
        onOpenNotes={(sub) => {
          setShowRecapModal(false);
          if (onOpenNotes) {
            onOpenNotes(sub);
          }
        }}
      />
    </div>
  );
};
