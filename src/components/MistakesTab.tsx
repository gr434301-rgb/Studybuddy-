import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QUESTIONS_DATA } from '../data/questions';
import { Question } from '../types';
import { 
  AlertCircle, 
  Bookmark, 
  RotateCcw, 
  CheckCircle2, 
  ChevronRight, 
  Trash2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface MistakesTabProps {
  onStartRetest: (questions: Question[]) => void;
}

export const MistakesTab: React.FC<MistakesTabProps> = ({ onStartRetest }) => {
  const { user, toggleBookmark, recordQuestionAnswered } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'mistakes' | 'bookmarks'>('all');

  // Pull matching questions
  const mistakeQuestions = QUESTIONS_DATA.filter(q => user.mistakeQuestionIds.includes(q.id));
  const bookmarkedQuestions = QUESTIONS_DATA.filter(q => user.bookmarkedQuestionIds.includes(q.id));

  const displayedQuestions = React.useMemo(() => {
    if (filterType === 'mistakes') return mistakeQuestions;
    if (filterType === 'bookmarks') return bookmarkedQuestions;

    // Combined unique
    const set = new Set([...user.mistakeQuestionIds, ...user.bookmarkedQuestionIds]);
    return QUESTIONS_DATA.filter(q => set.has(q.id));
  }, [filterType, mistakeQuestions, bookmarkedQuestions, user.mistakeQuestionIds, user.bookmarkedQuestionIds]);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Mistake & Bookmark Notebook</h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Re-test questions you missed to guarantee 100% board accuracy
          </p>
        </div>
        {displayedQuestions.length > 0 && (
          <button
            onClick={() => onStartRetest(displayedQuestions)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retest ({displayedQuestions.length})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setFilterType('all')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition ${
            filterType === 'all'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          All ({mistakeQuestions.length + bookmarkedQuestions.length})
        </button>

        <button
          onClick={() => setFilterType('mistakes')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1 ${
            filterType === 'mistakes'
              ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <AlertCircle className="w-3 h-3" />
          <span>Mistakes ({mistakeQuestions.length})</span>
        </button>

        <button
          onClick={() => setFilterType('bookmarks')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1 ${
            filterType === 'bookmarks'
              ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-3 h-3" />
          <span>Bookmarks ({bookmarkedQuestions.length})</span>
        </button>
      </div>

      {/* List of Questions */}
      <div className="space-y-3">
        {displayedQuestions.map(q => {
          const isMistake = user.mistakeQuestionIds.includes(q.id);
          const isBookmarked = user.bookmarkedQuestionIds.includes(q.id);

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    {q.subjectName}
                  </span>
                  <span>·</span>
                  <span className="truncate max-w-[130px]">{q.chapter}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isMistake && (
                    <span className="text-[10px] bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 font-bold px-2 py-0.5 rounded-full">
                      Needs Revision
                    </span>
                  )}
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {q.question}
              </h4>

              {/* Correct Answer Highlight */}
              <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-300">
                <span className="font-bold">Correct Solution: </span>
                {q.options[q.correctAnswer]}
              </div>

              {/* Explanation */}
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {q.explanation}
              </p>
            </div>
          );
        })}

        {displayedQuestions.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Clean Record!
            </h4>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              You currently have no questions marked as mistakes. Solve new tests in the Practice Hub to challenge yourself!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
