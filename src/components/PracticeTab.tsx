import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATA } from '../data/questions';
import { Question, SubjectId, Difficulty } from '../types';
import { PracticeInsights } from './PracticeInsights';
import { QuickDoubtModal } from './QuickDoubtModal';
import { 
  getDailyQuiz500Questions, 
  getPracticeHub1000Questions, 
  getTimeUntilMidnight 
} from '../utils/assessmentEngine';
import { aiVoice, PERSONAS_CONFIG } from '../utils/aiVoice';
import { 
  Zap, 
  Bookmark, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Clock, 
  Filter, 
  Flame, 
  HelpCircle, 
  Share2,
  BarChart3,
  Bot,
  Sparkles,
  Volume2,
  VolumeX,
  RefreshCw
} from 'lucide-react';

interface PracticeTabProps {
  initialMode?: 'streak50' | 'subject' | 'mock' | 'insights';
  initialSubject?: SubjectId;
  onOpenNotes?: (subject: SubjectId) => void;
}

export const PracticeTab: React.FC<PracticeTabProps> = ({ 
  initialMode = 'streak50',
  initialSubject,
  onOpenNotes
}) => {
  const { 
    user, 
    recordQuestionAnswered, 
    toggleBookmark, 
    celebrate,
    selectedSubject,
    setSelectedSubject,
    setCurrentTab
  } = useApp();

  const [mode, setMode] = useState<'streak50' | 'subject' | 'mock' | 'insights'>(initialMode);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [showDoubtModal, setShowDoubtModal] = useState<boolean>(false);

  // Midnight countdown state for Daily 50 & Quiz Hub refresh
  const [countdown, setCountdown] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filtered questions pool
  const questionPool = React.useMemo(() => {
    const sourcePool = mode === 'streak50' 
      ? getDailyQuiz500Questions() 
      : getPracticeHub1000Questions();

    return sourcePool.filter(q => {
      const matchSubject = selectedSubject === 'all' || q.subject === selectedSubject;
      const matchDiff = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
      return matchSubject && matchDiff;
    });
  }, [mode, selectedSubject, filterDifficulty]);

  // Active question state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Mock Test Mode State
  const [mockTimeLeft, setMockTimeLeft] = useState<number>(600); // 10 minutes
  const [mockActive, setMockActive] = useState<boolean>(false);
  const [mockFinished, setMockFinished] = useState<boolean>(false);
  const [mockAnswers, setMockAnswers] = useState<Record<number, number>>({});

  const activeQuestion: Question | undefined = questionPool[currentIndex % (questionPool.length || 1)];

  // Set initial subject if passed
  useEffect(() => {
    if (initialSubject) {
      setSelectedSubject(initialSubject);
    }
  }, [initialSubject, setSelectedSubject]);

  // Mock test timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mockActive && !mockFinished && mockTimeLeft > 0) {
      timer = setInterval(() => {
        setMockTimeLeft(prev => {
          if (prev <= 1) {
            setMockFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mockActive, mockFinished, mockTimeLeft]);

  const handleSelectOption = (index: number) => {
    if (answered && mode !== 'mock') return;
    if (!activeQuestion) return;

    setSelectedOption(index);

    if (mode === 'mock') {
      setMockAnswers(prev => ({
        ...prev,
        [currentIndex]: index
      }));
      return;
    }

    const correct = index === activeQuestion.correctAnswer;
    setIsCorrect(correct);
    setAnswered(true);

    // Speak AI Voice feedback (Amitabh Bachchan or Bharti)
    aiVoice.speakFeedback(correct);

    // Record question in app store with subject metadata
    recordQuestionAnswered(
      activeQuestion.id, 
      correct, 
      activeQuestion.difficulty === 'HOTS' ? 30 : 20,
      activeQuestion.subject
    );
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(false);
    setCurrentIndex(prev => prev + 1);
  };

  const startMockTest = () => {
    setMockTimeLeft(600);
    setMockActive(true);
    setMockFinished(false);
    setMockAnswers({});
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswered(false);
  };

  const finishMockTest = () => {
    setMockFinished(true);
    celebrate();
  };

  const handlePracticeFromInsights = (sub: SubjectId) => {
    setSelectedSubject(sub);
    setMode('subject');
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswered(false);
  };

  const handleOpenNotesFromInsights = (sub: SubjectId) => {
    setSelectedSubject(sub);
    if (onOpenNotes) {
      onOpenNotes(sub);
    } else {
      setCurrentTab('ncert');
    }
  };

  const isBookmarked = activeQuestion ? user.bookmarkedQuestionIds.includes(activeQuestion.id) : false;

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 space-y-4 relative">
      {/* Mode Switcher Buttons (4 Modes) */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => { setMode('streak50'); setMockActive(false); }}
          className={`py-2 px-1 text-[11px] font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
            mode === 'streak50'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Daily Quiz (500)</span>
        </button>

        <button
          onClick={() => { setMode('subject'); setMockActive(false); }}
          className={`py-2 px-1 text-[11px] font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
            mode === 'subject'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Filter className="w-3.5 h-3.5 text-indigo-500" />
          <span>Practice Hub (1000)</span>
        </button>

        <button
          onClick={() => { setMode('mock'); startMockTest(); }}
          className={`py-2 px-1 text-[11px] font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
            mode === 'mock'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Mock Board</span>
        </button>

        <button
          onClick={() => { setMode('insights'); setMockActive(false); }}
          className={`py-2 px-1 text-[11px] font-semibold rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
            mode === 'insights'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
          <span>Insights</span>
        </button>
      </div>

      {/* 4. PRACTICE INSIGHTS VIEW (with Radar Chart) */}
      {mode === 'insights' && (
        <PracticeInsights
          onPracticeSubject={handlePracticeFromInsights}
          onOpenNotes={handleOpenNotesFromInsights}
        />
      )}

      {/* Mode Sub-Filters for Subject Drill */}
      {mode === 'subject' && (
        <div className="space-y-2">
          {/* Subject Pills including Optional Languages */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Subjects' },
              { id: 'maths', label: '📐 Maths' },
              { id: 'science', label: '🧪 Science' },
              { id: 'social', label: '🌍 Social Sci' },
              { id: 'english', label: '📖 English' },
              { id: 'hindi', label: '🪷 Hindi' },
              { id: 'optional_lang', label: '🗣️ Optional Lang' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(sub.id as SubjectId | 'all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border ${
                  selectedSubject === sub.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Difficulty Filter & Pool Info */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[11px] uppercase tracking-wider">Level:</span>
              {(['all', 'Easy', 'Medium', 'HOTS'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => setFilterDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterDifficulty === diff
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {diff === 'all' ? 'Any' : diff}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
              1,000 Competency Questions · Randomized Options
            </span>
          </div>
        </div>
      )}

      {/* Daily Quiz Top Status Header with Midnight Countdown */}
      {mode === 'streak50' && (
        <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-transparent p-3 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Daily Quiz (500 Competency Questions)
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-amber-500" />
                <span>Refreshes in {countdown.hours}h {countdown.minutes}m {countdown.seconds}s · Randomized Options</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tabular-nums block">
                {user.dailyStreakCount}/{user.dailyTargetQuestions || 50} Solved Today
              </span>
              <span className="text-[10px] text-slate-400">Pool: 500 Questions</span>
            </div>
          </div>
        </div>
      )}

      {/* Mock Test Countdown Header */}
      {mode === 'mock' && !mockFinished && (
        <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold">Class 10 Speed Mock Test</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 tabular-nums">
              ⏳ {formatTime(mockTimeLeft)}
            </span>
            <button
              onClick={finishMockTest}
              className="text-xs font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-lg hover:bg-indigo-700"
            >
              Submit Test
            </button>
          </div>
        </div>
      )}

      {/* Mock Test Result Scorecard */}
      {mode === 'mock' && mockFinished && (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md text-center space-y-4">
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg font-extrabold">Mock Test Completed!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Class 10 CBSE Board Exam Speed Assessment
            </p>
          </div>

          {/* Calculate score */}
          {(() => {
            const totalQuestions = Math.min(10, questionPool.length);
            let score = 0;
            for (let i = 0; i < totalQuestions; i++) {
              const q = questionPool[i];
              if (mockAnswers[i] === q.correctAnswer) {
                score++;
              }
            }
            const pct = Math.round((score / totalQuestions) * 100);

            return (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {score} / {totalQuestions}
                </div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Accuracy: <span className="text-emerald-600 font-bold">{pct}%</span>
                  {' · '}
                  XP Earned: <span className="text-amber-500 font-bold">+{score * 20} XP</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {pct >= 80 
                    ? 'Outstanding! Your concept clarity is at 95%+ board examination level.' 
                    : 'Good attempt! Review your incorrect answers and formulas to sharpen accuracy.'}
                </p>
              </div>
            );
          })()}

          <div className="flex gap-2">
            <button
              onClick={startMockTest}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
            >
              Retake Mock Test
            </button>
            <button
              onClick={() => { setMode('streak50'); setMockFinished(false); }}
              className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
            >
              Back to Daily Practice
            </button>
          </div>
        </div>
      )}

      {/* Active Question Card (Regular Practice / Daily Streak / Active Mock) */}
      {(mode !== 'insights' && !mockFinished && activeQuestion) && (
        <div className="bg-white dark:bg-slate-800 p-4.5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          {/* Header Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-200">
                Q{currentIndex + 1}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                {activeQuestion.subjectName}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate max-w-[130px]">{activeQuestion.chapter}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeQuestion.difficulty === 'HOTS'
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                  : activeQuestion.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                  : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
              }`}>
                {activeQuestion.difficulty}
              </span>

              {/* Bookmark Button */}
              <button
                onClick={() => toggleBookmark(activeQuestion.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Add to Mistake / Bookmark Notebook'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Question Text with AI Voice Reader */}
          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50 leading-snug flex-1">
                {activeQuestion.question}
              </p>
              
              {/* AI Voice Read Aloud Button */}
              <button
                type="button"
                onClick={() => aiVoice.speakQuestion(activeQuestion.question)}
                className="p-1.5 px-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-[10px] font-bold flex items-center gap-1 border border-purple-200 dark:border-purple-800 shrink-0 transition"
                title={`Hear question read by ${PERSONAS_CONFIG[aiVoice.getPersona()].name}`}
              >
                <Volume2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Hear AI Voice ({PERSONAS_CONFIG[aiVoice.getPersona()].name.split(' ')[0]})</span>
              </button>
            </div>

            {activeQuestion.year && (
              <span className="text-[10px] text-slate-400 font-medium block">
                Appeared in: {activeQuestion.year}
              </span>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-2">
            {activeQuestion.options.map((option, idx) => {
              const isSelected = mode === 'mock' 
                ? mockAnswers[currentIndex] === idx 
                : selectedOption === idx;
              
              const isCorrectAnswer = idx === activeQuestion.correctAnswer;

              let optionClasses = 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400';

              if (mode !== 'mock' && answered) {
                if (isCorrectAnswer) {
                  optionClasses = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-medium';
                } else if (isSelected && !isCorrectAnswer) {
                  optionClasses = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200';
                } else {
                  optionClasses = 'opacity-60 bg-slate-50 dark:bg-slate-700/20 border-slate-200 dark:border-slate-800 text-slate-500';
                }
              } else if (isSelected) {
                optionClasses = 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-900 dark:text-indigo-200 font-medium ring-2 ring-indigo-500/20';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex items-start gap-2.5 ${optionClasses}`}
                >
                  <span className="w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                  {mode !== 'mock' && answered && isCorrectAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {mode !== 'mock' && answered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Detailed Explanation Box (shown after answer in regular mode) */}
          {mode !== 'mock' && answered && (
            <div className={`p-4 rounded-2xl border space-y-2.5 transition-all ${
              isCorrect 
                ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40' 
                : 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        Correct Answer! (+{activeQuestion.difficulty === 'HOTS' ? 30 : 20} XP)
                      </span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                        Concept Review (+5 XP for trying)
                      </span>
                    </>
                  )}
                </div>

                {/* Inline Quick Doubt Button */}
                <button
                  onClick={() => setShowDoubtModal(true)}
                  className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-white/90 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-900/50 flex items-center gap-1 hover:bg-indigo-50 transition shadow-2xs"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Explain with AI</span>
                </button>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-slate-100">Explanation: </strong>
                {activeQuestion.explanation}
              </div>

              {activeQuestion.formulaOrConcept && (
                <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-indigo-700 dark:text-indigo-300">
                  📌 Key Rule: {activeQuestion.formulaOrConcept}
                </div>
              )}

              <button
                onClick={handleNextQuestion}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 mt-2"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Next / Previous Controls in Mock Mode */}
          {mode === 'mock' && (
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs text-slate-400 tabular-nums">
                {currentIndex + 1} of {Math.min(10, questionPool.length)}
              </span>
              <button
                onClick={() => {
                  if (currentIndex + 1 < Math.min(10, questionPool.length)) {
                    setCurrentIndex(prev => prev + 1);
                  } else {
                    finishMockTest();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
              >
                {currentIndex + 1 === Math.min(10, questionPool.length) ? 'Finish & Grade' : 'Next'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Action Button (FAB) for AI Concept Doubt Chat */}
      {activeQuestion && mode !== 'insights' && (
        <div className="fixed bottom-20 sm:bottom-22 right-4 sm:right-6 md:right-8 z-40 pointer-events-auto">
          <button
            onClick={() => setShowDoubtModal(true)}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs py-3 px-4.5 rounded-full shadow-xl shadow-indigo-600/35 border border-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group ring-2 ring-white/10"
            title="Ask AI Tutor for concept explanations pre-filled with this question"
            aria-label="Open AI Concept Tutor"
          >
            <div className="relative">
              <Bot className="w-4.5 h-4.5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </div>
            <span className="font-extrabold tracking-wide">Ask AI Concept</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* AI Quick Doubt Modal */}
      {showDoubtModal && activeQuestion && (
        <QuickDoubtModal
          question={activeQuestion}
          selectedOptionIndex={selectedOption}
          onClose={() => setShowDoubtModal(false)}
        />
      )}

      {/* Empty State */}
      {mode !== 'insights' && questionPool.length === 0 && (
        <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500">No questions found matching your filter.</p>
          <button
            onClick={() => { setSelectedSubject('all'); setFilterDifficulty('all'); }}
            className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
