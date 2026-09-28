import React from 'react';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATA } from '../data/questions';
import { NCERT_NOTES } from '../data/ncertNotes';
import { FORMULAS_DATA } from '../data/formulas';
import { MOTIVATIONAL_QUOTES } from '../data/leaderboardData';
import { DailyGoalSetting } from './DailyGoalSetting';
import { 
  BookOpen, 
  Zap, 
  Clock, 
  Trophy, 
  Search, 
  FileText, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Sparkles,
  Bookmark
} from 'lucide-react';
import { SubjectId } from '../types';

interface HomeTabProps {
  onStartPracticeMode: (mode: 'streak50' | 'subject' | 'mock', subject?: SubjectId) => void;
  onOpenChapterNote: (noteId: string) => void;
  onOpenTimer?: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onStartPracticeMode, onOpenChapterNote }) => {
  const { 
    user, 
    setCurrentTab, 
    searchQuery, 
    setSearchQuery, 
    setSelectedSubject 
  } = useApp();

  const [quoteIndex] = React.useState(() => Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length));
  const activeQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  // Daily Tasks state with local storage
  const [completedTasks, setCompletedTasks] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('edupulse_daily_tasks');
    return saved ? JSON.parse(saved) : ['task_1'];
  });

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const next = prev.includes(taskId) ? prev.filter(t => t !== taskId) : [...prev, taskId];
      localStorage.setItem('edupulse_daily_tasks', JSON.stringify(next));
      return next;
    });
  };

  // Search Results
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();

    const matchedQuestions = QUESTIONS_DATA.filter(
      item => item.question.toLowerCase().includes(q) || item.chapter.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedNotes = NCERT_NOTES.filter(
      item => item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedFormulas = FORMULAS_DATA.filter(
      item => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.application.toLowerCase().includes(q)
    ).slice(0, 3);

    return {
      questions: matchedQuestions,
      notes: matchedNotes,
      formulas: matchedFormulas,
      totalCount: matchedQuestions.length + matchedNotes.length + matchedFormulas.length
    };
  }, [searchQuery]);

  const streakPercent = Math.min(100, Math.round((user.dailyStreakCount / 50) * 100));

  return (
    <div className="p-4 space-y-4">
      {/* Welcome & Motivational Banner */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 text-white p-4.5 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
              Class 10 Board Prep
            </span>
            <span className="text-xs font-medium bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
              Target: {user.targetPercent}%
            </span>
          </div>

          <h3 className="text-lg font-extrabold mt-1 tracking-tight">
            Namaste, {user.name.split(' ')[0]}! 👋
          </h3>

          <p className="text-xs text-indigo-100 mt-1 leading-relaxed italic">
            "{activeQuote.quote}"
          </p>

          <div className="mt-3.5 pt-3 border-t border-indigo-500/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Questions Solved: <strong className="text-white tabular-nums">{user.questionsSolved}</strong></span>
            </div>
            <button
              onClick={() => onStartPracticeMode('streak50')}
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-sm transition-all"
            >
              <span>Daily Streak</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Daily Goal Setting Component with Circular Progress Bar */}
      <DailyGoalSetting 
        onStartPractice={() => onStartPracticeMode('streak50')}
        onOpenTimer={() => setCurrentTab('timer')}
      />

      {/* Universal Search Bar */}
      <div className="relative">
        <div className="bg-white dark:bg-slate-800 p-2.5 px-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 shadow-xs focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters, notes, formulas, questions..."
            className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Search Results Dropdown Preview */}
        {searchResults && (
          <div className="mt-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-3 shadow-lg space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              <span>Search Results ({searchResults.totalCount})</span>
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">Close</button>
            </div>

            {searchResults.totalCount === 0 && (
              <p className="text-xs text-slate-400 py-3 text-center">
                No matches found for "{searchQuery}". Try searching for "Electricity", "Trigonometry", or "Acid".
              </p>
            )}

            {/* Notes Matches */}
            {searchResults.notes.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">NCERT Chapter Notes</span>
                {searchResults.notes.map(note => (
                  <div
                    key={note.id}
                    onClick={() => {
                      onOpenChapterNote(note.id);
                      setSearchQuery('');
                    }}
                    className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{note.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{note.readTime}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Formulas Matches */}
            {searchResults.formulas.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Formulas & Reactions</span>
                {searchResults.formulas.map(f => (
                  <div
                    key={f.id}
                    onClick={() => {
                      setCurrentTab('formulas');
                      setSearchQuery('');
                    }}
                    className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{f.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{f.category}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Questions Matches */}
            {searchResults.questions.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">Practice Questions</span>
                {searchResults.questions.map(q => (
                  <div
                    key={q.id}
                    onClick={() => {
                      setCurrentTab('practice');
                      setSearchQuery('');
                    }}
                    className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 cursor-pointer text-xs"
                  >
                    <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{q.question}</p>
                    <span className="text-[10px] text-slate-400">{q.chapter} · {q.difficulty}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Feature Grid (2x3 Clean cards) */}
      <div className="grid grid-cols-2 gap-3">
        {/* NCERT Hub */}
        <div 
          onClick={() => setCurrentTab('ncert')}
          className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <BookOpen className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            NCERT Hub
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Class 10 Notes & Exemplars
          </p>
        </div>

        {/* Practice Hub */}
        <div 
          onClick={() => setCurrentTab('practice')}
          className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Practice Hub
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            MCQs & Board PYQs
          </p>
        </div>

        {/* Study Timer */}
        <div 
          onClick={() => setCurrentTab('timer')}
          className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Study Timer
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            1 to 6 Hours Focus
          </p>
        </div>

        {/* Formula Sheets */}
        <div 
          onClick={() => setCurrentTab('formulas')}
          className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Formula Sheets
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Physics, Chem & Maths
          </p>
        </div>

        {/* Leaderboard */}
        <div 
          onClick={() => setCurrentTab('leaderboard')}
          className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Trophy className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Leaderboard
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            State & All-India Ranks
          </p>
        </div>

        {/* Mistake Notebook */}
        <div 
          onClick={() => setCurrentTab('mistakes')}
          className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Mistake Box
            </h4>
            {user.mistakeQuestionIds.length > 0 && (
              <span className="text-[10px] bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 px-1.5 py-0.2 rounded-full font-bold">
                {user.mistakeQuestionIds.length}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Re-test Missed PYQs
          </p>
        </div>
      </div>

      {/* Subject Quick Selector Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Subjects & Chapter Quizzes
          </h4>
          <button 
            onClick={() => { setSelectedSubject('all'); setCurrentTab('ncert'); }}
            className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Science */}
          <div 
            onClick={() => { setSelectedSubject('science'); setCurrentTab('practice'); }}
            className="p-3 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-100 dark:border-slate-700 cursor-pointer hover:border-blue-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-lg">🧪</span>
              <h5 className="text-xs font-bold mt-1 text-slate-800 dark:text-slate-100">Science</h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Physics, Chem, Bio</p>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-500" />
          </div>

          {/* Maths */}
          <div 
            onClick={() => { setSelectedSubject('maths'); setCurrentTab('practice'); }}
            className="p-3 rounded-2xl bg-gradient-to-br from-purple-50/70 to-pink-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-purple-100 dark:border-slate-700 cursor-pointer hover:border-purple-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-lg">📐</span>
              <h5 className="text-xs font-bold mt-1 text-slate-800 dark:text-slate-100">Mathematics</h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Algebra, Geometry, Trig</p>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-500" />
          </div>

          {/* Social Science */}
          <div 
            onClick={() => { setSelectedSubject('social'); setCurrentTab('practice'); }}
            className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-teal-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-emerald-100 dark:border-slate-700 cursor-pointer hover:border-emerald-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-lg">🌍</span>
              <h5 className="text-xs font-bold mt-1 text-slate-800 dark:text-slate-100">Social Science</h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">History, Civics, Geog, Eco</p>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500" />
          </div>

          {/* English */}
          <div 
            onClick={() => { setSelectedSubject('english'); setCurrentTab('practice'); }}
            className="p-3 rounded-2xl bg-gradient-to-br from-amber-50/70 to-orange-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-amber-100 dark:border-slate-700 cursor-pointer hover:border-amber-400 transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-lg">📖</span>
              <h5 className="text-xs font-bold mt-1 text-slate-800 dark:text-slate-100">English</h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">First Flight, Grammar</p>
            </div>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </div>

          {/* Hindi */}
          <div 
            onClick={() => { setSelectedSubject('hindi'); setCurrentTab('practice'); }}
            className="p-3 rounded-2xl bg-gradient-to-br from-rose-50/70 to-pink-50/50 dark:from-slate-800 dark:to-slate-800/80 border border-rose-100 dark:border-slate-700 cursor-pointer hover:border-rose-400 transition-colors flex items-center justify-between col-span-2 sm:col-span-1"
          >
            <div>
              <span className="text-lg">🪷</span>
              <h5 className="text-xs font-bold mt-1 text-slate-800 dark:text-slate-100">Hindi (हिंदी)</h5>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">क्षितिज, कृतिका, व्याकरण</p>
            </div>
            <ArrowRight className="w-4 h-4 text-rose-500" />
          </div>
        </div>
      </div>

      {/* Daily Study Checklist */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs font-bold">Daily Class 10 Study Plan</h4>
          </div>
          <span className="text-[11px] text-slate-400">
            {completedTasks.length}/3 completed
          </span>
        </div>

        <div className="space-y-2">
          {[
            { id: 'task_1', title: 'Solve 15 Mathematics MCQs & Quadratic problems', xp: '+30 XP' },
            { id: 'task_2', title: 'Revise Science Chemical Reactions & Balancing', xp: '+25 XP' },
            { id: 'task_3', title: 'Complete a 45-min Deep Focus Study Timer', xp: '+40 XP' }
          ].map(task => {
            const isDone = completedTasks.includes(task.id);
            return (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  isDone 
                    ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 line-through' 
                    : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="text-xs font-medium">{task.title}</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0 ml-2">
                  {task.xp}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
