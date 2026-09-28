import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectId } from '../types';
import { 
  Trophy, 
  Flame, 
  Target, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Check, 
  Share2, 
  X,
  Zap,
  Coffee,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SessionRecapModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionMinutes?: number;
  minutesSpent?: number;
  subject: SubjectId;
  onStartPractice?: (subject: SubjectId) => void;
  onPracticeSubject?: (subject: SubjectId) => void;
  onOpenNotes?: (subject: SubjectId) => void;
  onStartNewSession?: (minutes: number) => void;
  onStartAnotherSession?: () => void;
}

export const SessionRecapModal: React.FC<SessionRecapModalProps> = ({
  isOpen,
  onClose,
  sessionMinutes,
  minutesSpent,
  subject,
  onStartPractice,
  onPracticeSubject,
  onOpenNotes,
  onStartNewSession,
  onStartAnotherSession
}) => {
  const effectiveMinutes = sessionMinutes ?? minutesSpent ?? 45;
  const handlePractice = onStartPractice || onPracticeSubject;
  const handleAnotherSession = onStartNewSession 
    ? () => onStartNewSession(effectiveMinutes) 
    : onStartAnotherSession;
  const { user } = useApp();
  const [breakTimerActive, setBreakTimerActive] = useState<boolean>(false);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState<number>(300); // 5 minutes break
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger festive confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    } else {
      setBreakTimerActive(false);
      setBreakSecondsLeft(300);
    }
  }, [isOpen]);

  // Break timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breakTimerActive && breakSecondsLeft > 0) {
      interval = setInterval(() => {
        setBreakSecondsLeft(prev => {
          if (prev <= 1) {
            setBreakTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breakTimerActive, breakSecondsLeft]);

  if (!isOpen) return null;

  const SUBJECT_MAP: Record<SubjectId, { name: string; emoji: string; color: string }> = {
    science: { name: 'Science', emoji: '🧪', color: 'from-emerald-500 to-teal-600' },
    maths: { name: 'Mathematics', emoji: '📐', color: 'from-blue-500 to-indigo-600' },
    social: { name: 'Social Science', emoji: '🌍', color: 'from-amber-500 to-orange-600' },
    english: { name: 'English', emoji: '📖', color: 'from-purple-500 to-pink-600' },
    hindi: { name: 'Hindi Course A/B', emoji: '🪷', color: 'from-rose-500 to-red-600' },
    optional_lang: { name: 'Optional Languages', emoji: '🗣️', color: 'from-cyan-500 to-blue-600' }
  };

  const currentSub = SUBJECT_MAP[subject] || { name: 'General Study', emoji: '📚', color: 'from-indigo-500 to-purple-600' };
  const xpEarned = Math.round(effectiveMinutes * 1.5);

  // Daily target calculation
  const targetMinutes = (user.dailyTargetHours || 2.5) * 60;
  const currentDailyMinutes = user.dailyStudyMinutes;
  const dailyProgressPercent = Math.min(100, Math.round((currentDailyMinutes / Math.max(1, targetMinutes)) * 100));
  const isDailyGoalMet = currentDailyMinutes >= targetMinutes;

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m} mins`;
  };

  const breakMins = Math.floor(breakSecondsLeft / 60);
  const breakSecs = breakSecondsLeft % 60;

  const handleShareRecap = () => {
    const text = `🎯 I just completed a ${effectiveMinutes}-minute focused study block for Class 10 ${currentSub.name} on EduPulse! 7-day streak active 🔥. Board prep in full swing!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header */}
        <div className={`p-5 bg-gradient-to-r ${currentSub.color} text-white relative shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Session Completed
            </span>
            <span className="text-xs font-semibold bg-white/15 px-2 py-0.5 rounded-full">
              Class 10 Board Prep
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2 mt-1">
            <span>Outstanding Focus!</span>
            <span className="text-2xl">🎉</span>
          </h2>
          <p className="text-xs text-white/90 mt-1">
            You successfully conquered your study block. Every session counts towards your {user.targetPercent}% target!
          </p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-4 text-slate-800 dark:text-slate-100 flex-1">
          
          {/* 4 Stat Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-center">
              <Clock className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Focused Time</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                {formatTime(effectiveMinutes)}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-center">
              <span className="text-base mx-auto block mb-0.5">{currentSub.emoji}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Subject</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                {currentSub.name}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-center">
              <Zap className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block">XP Earned</span>
              <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                +{xpEarned} XP
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-center">
              <Trophy className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Focus Rating</span>
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                100% Deep
              </span>
            </div>
          </div>

          {/* Milestones Reached in this Session */}
          <div className="bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Milestones Reached in Current Session
              </h3>
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                {dailyProgressPercent}% Goal
              </span>
            </div>

            {/* Daily Study Goal Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">
                  Daily Study Target ({user.dailyTargetHours} Hours)
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {(currentDailyMinutes / 60).toFixed(1)}h / {user.dailyTargetHours}h
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isDailyGoalMet ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                  }`}
                  style={{ width: `${dailyProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Milestone List */}
            <div className="space-y-2 pt-1 text-xs">
              {isDailyGoalMet ? (
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-100/60 dark:bg-emerald-900/30 p-2 rounded-xl border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Daily Study Target Achieved! You finished your {user.dailyTargetHours}-hour goal!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-500" />
                  <span>Added <strong>{effectiveMinutes} minutes</strong> toward today&apos;s Class 10 goal.</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Flame className="w-4 h-4 shrink-0 text-amber-500 fill-amber-500" />
                <span><strong>{user.streak}-Day Study Streak</strong> kept burning bright!</span>
              </div>

              {effectiveMinutes >= 60 && (
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-semibold bg-purple-100/60 dark:bg-purple-900/30 p-2 rounded-xl border border-purple-200 dark:border-purple-800">
                  <Trophy className="w-4 h-4 shrink-0 text-purple-600" />
                  <span>Milestone: <strong>&apos;Deep Focus Monk&apos;</strong> (60+ min single block achieved)!</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Sparkles className="w-4 h-4 shrink-0 text-indigo-500" />
                <span>Cumulative Class 10 Focus: <strong>{formatTime(user.totalStudyMinutes)}</strong> logged!</span>
              </div>
            </div>
          </div>

          {/* 5-Minute Brain Break Interactive Tool */}
          <div className="bg-slate-50 dark:bg-slate-800/70 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Take a 5-Minute Brain Break
                </span>
              </div>
              <button
                onClick={() => setBreakTimerActive(!breakTimerActive)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition ${
                  breakTimerActive 
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {breakTimerActive ? 'Pause Break' : 'Start 5m Rest'}
              </button>
            </div>

            {breakTimerActive ? (
              <div className="text-center py-2 space-y-1 bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <span className="text-2xl font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                  {breakMins.toString().padStart(2, '0')}:{breakSecs.toString().padStart(2, '0')}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Close your eyes, drink water, and relax your shoulders. Great job!
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Science recommends a 5-minute break after deep work to consolidate board exam concepts.
              </p>
            )}
          </div>

          {/* Actionable Next Steps */}
          <div className="space-y-2 pt-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Recommended Next Actions
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {handlePractice && (
                <button
                  onClick={() => {
                    onClose();
                    handlePractice(subject);
                  }}
                  className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-500 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block">
                      Solve 5 {currentSub.name} MCQs
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Reinforce what you just revised
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {onOpenNotes && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenNotes(subject);
                  }}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Review NCERT Key Notes
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      Read summaries & formulas
                    </span>
                  </div>
                  <BookOpen className="w-4 h-4 text-slate-500 group-hover:scale-110 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={handleShareRecap}
            className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 flex items-center gap-1.5 transition"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Streak</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {handleAnotherSession && (
              <button
                onClick={() => {
                  onClose();
                  handleAnotherSession();
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Another {effectiveMinutes}m</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
            >
              Done & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
