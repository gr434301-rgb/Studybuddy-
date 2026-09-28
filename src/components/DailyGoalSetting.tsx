import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Target, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Edit3, 
  ArrowRight, 
  Plus, 
  Minus, 
  Sparkles,
  Trophy,
  Flame,
  Check
} from 'lucide-react';

interface DailyGoalSettingProps {
  onStartPractice: () => void;
  onOpenTimer: () => void;
}

export const DailyGoalSetting: React.FC<DailyGoalSettingProps> = ({ 
  onStartPractice, 
  onOpenTimer 
}) => {
  const { user, setDailyGoal, celebrate } = useApp();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const goalType = user.dailyGoalType || 'questions';
  const targetQuestions = user.dailyTargetQuestions || 50;
  const targetHours = user.dailyTargetHours || 2;

  // Local state for editing form
  const [tempType, setTempType] = useState<'questions' | 'hours'>(goalType);
  const [tempQuestions, setTempQuestions] = useState<number>(targetQuestions);
  const [tempHours, setTempHours] = useState<number>(targetHours);

  // Current logged metrics
  const currentQuestions = user.dailyStreakCount || 0;
  const currentMinutes = user.dailyStudyMinutes || 0;
  const currentHours = Math.round((currentMinutes / 60) * 10) / 10;

  // Progress calculations
  const progressPercent = goalType === 'questions'
    ? Math.min(100, Math.round((currentQuestions / Math.max(1, targetQuestions)) * 100))
    : Math.min(100, Math.round((currentMinutes / Math.max(1, targetHours * 60)) * 100));

  const isCompleted = progressPercent >= 100;

  // Circular progress SVG constants
  const size = 104;
  const strokeWidth = 8.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const handleOpenEdit = () => {
    setTempType(goalType);
    setTempQuestions(targetQuestions);
    setTempHours(targetHours);
    setIsEditing(true);
  };

  const handleSaveGoal = () => {
    if (tempType === 'questions') {
      const q = Math.max(5, Math.min(200, tempQuestions));
      setDailyGoal('questions', q);
    } else {
      const h = Math.max(0.5, Math.min(12, Math.round(tempHours * 10) / 10));
      setDailyGoal('hours', h);
    }
    setIsEditing(false);
    celebrate();
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4.5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs relative overflow-hidden transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            isCompleted 
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
              : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
          }`}>
            {isCompleted ? <Trophy className="w-4 h-4" /> : <Target className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Daily Goal Setting
              </h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isCompleted 
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                  : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
              }`}>
                {isCompleted ? 'Target Achieved! 🏆' : `${progressPercent}% Completed`}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {goalType === 'questions' ? 'Questions Practice Target' : 'Deep Study Time Target'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              setIsEditing(false);
            } else {
              handleOpenEdit();
            }
          }}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300 transition text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Edit3 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{isEditing ? 'Cancel' : 'Set Goal'}</span>
        </button>
      </div>

      {/* Main View: Circular Progress Bar + Metrics */}
      {!isEditing ? (
        <div className="flex flex-col sm:flex-row items-center gap-4 py-1">
          {/* Circular Progress Bar Indicator */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg 
              width={size} 
              height={size} 
              className="transform -rotate-90 filter drop-shadow-xs"
            >
              <defs>
                <linearGradient id="goalProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isCompleted ? '#10b981' : '#6366f1'} />
                  <stop offset="100%" stopColor={isCompleted ? '#14b8a6' : '#8b5cf6'} />
                </linearGradient>
              </defs>

              {/* Background Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-700"
                strokeWidth={strokeWidth}
                fill="none"
              />

              {/* Animated Progress Circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#goalProgressGradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{
                  transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            </svg>

            {/* Inner Content of Circular Progress Bar */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-0.5" />
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">100%</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Done</span>
                </>
              ) : (
                <>
                  <span className="text-base font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                    {progressPercent}%
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {goalType === 'questions' ? `${currentQuestions}/${targetQuestions}` : `${currentHours}h/${targetHours}h`}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Metrics & Action Details */}
          <div className="flex-1 w-full space-y-2 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {goalType === 'questions' ? currentQuestions : `${currentHours}h`}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {goalType === 'questions' 
                    ? `/ ${targetQuestions} questions target`
                    : `/ ${targetHours}h study target (${currentMinutes}m)`}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {isCompleted 
                  ? 'Fantastic consistency! You hit today’s board target.' 
                  : goalType === 'questions'
                    ? `${Math.max(0, targetQuestions - currentQuestions)} more questions remaining today`
                    : `${Math.max(0, Math.round(targetHours * 60 - currentMinutes))} minutes remaining to reach goal`}
              </p>
            </div>

            {/* Quick Action Button & Streak Tag */}
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
              {goalType === 'questions' ? (
                <button
                  onClick={onStartPractice}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5 active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isCompleted ? 'Solve Bonus Questions' : 'Solve Questions'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  onClick={onOpenTimer}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5 active:scale-95"
                >
                  <Clock className="w-3.5 h-3.5 text-indigo-200" />
                  <span>{isCompleted ? 'Log Extra Focus' : 'Start Focus Timer'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}

              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
                <Flame className="w-3 h-3 fill-amber-500" />
                <span>+50 XP Streak</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Goal Setting Form & Stepper */
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3 animate-in fade-in duration-150">
          {/* Goal Type Switcher */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Choose Target Metric
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTempType('questions')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                  tempType === 'questions'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Daily Questions</span>
              </button>

              <button
                type="button"
                onClick={() => setTempType('hours')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                  tempType === 'hours'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Study Hours</span>
              </button>
            </div>
          </div>

          {/* Stepper + Direct Input for Questions */}
          {tempType === 'questions' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  Target Questions Count (per day)
                </label>
                <span className="text-[10px] text-slate-400">Current: {currentQuestions} done today</span>
              </div>

              <div className="flex items-center justify-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setTempQuestions(prev => Math.max(5, prev - 5))}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>

                {/* Direct Number Input */}
                <input
                  type="number"
                  min="5"
                  max="200"
                  value={tempQuestions}
                  onChange={(e) => setTempQuestions(Number(e.target.value) || 0)}
                  className="w-20 text-center text-xl font-extrabold text-indigo-600 dark:text-indigo-400 bg-transparent border-b border-indigo-300 dark:border-indigo-700 focus:outline-none focus:border-indigo-500 tabular-nums"
                />

                <button
                  type="button"
                  onClick={() => setTempQuestions(prev => Math.min(200, prev + 5))}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex gap-1.5 justify-center pt-1">
                {[20, 35, 50, 75, 100].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTempQuestions(val)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                      tempQuestions === val
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {val} Qs
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Stepper + Direct Input for Hours */
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  Target Deep Study Hours (per day)
                </label>
                <span className="text-[10px] text-slate-400">Current: {currentHours}h ({currentMinutes}m)</span>
              </div>

              <div className="flex items-center justify-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setTempHours(prev => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10))}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>

                {/* Direct Number Input */}
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="12"
                  value={tempHours}
                  onChange={(e) => setTempHours(Number(e.target.value) || 0)}
                  className="w-20 text-center text-xl font-extrabold text-indigo-600 dark:text-indigo-400 bg-transparent border-b border-indigo-300 dark:border-indigo-700 focus:outline-none focus:border-indigo-500 tabular-nums"
                />

                <button
                  type="button"
                  onClick={() => setTempHours(prev => Math.min(12, Math.round((prev + 0.5) * 10) / 10))}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex gap-1.5 justify-center pt-1">
                {[1, 1.5, 2, 3, 4].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTempHours(val)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                      tempHours === val
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    {val} Hours
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleSaveGoal}
              className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Daily Goal</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3.5 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium hover:bg-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
