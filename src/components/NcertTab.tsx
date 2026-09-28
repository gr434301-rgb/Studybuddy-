import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NCERT_NOTES } from '../data/ncertNotes';
import { ChapterNote, SubjectId } from '../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  X, 
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface NcertTabProps {
  openedNoteId?: string | null;
  onCloseOpenedNote?: () => void;
  onPracticeChapter?: (subject: SubjectId) => void;
}

export const NcertTab: React.FC<NcertTabProps> = ({ 
  openedNoteId = null,
  onCloseOpenedNote,
  onPracticeChapter
}) => {
  const { user, toggleChapterCompleted, selectedSubject, setSelectedSubject } = useApp();
  const [activeNoteModal, setActiveNoteModal] = useState<ChapterNote | null>(() => {
    if (openedNoteId) {
      return NCERT_NOTES.find(n => n.id === openedNoteId) || null;
    }
    return null;
  });

  // Filter notes
  const filteredNotes = React.useMemo(() => {
    return NCERT_NOTES.filter(n => {
      if (selectedSubject === 'all') return true;
      return n.subject === selectedSubject;
    });
  }, [selectedSubject]);

  const completedCount = user.completedChapterIds.length;
  const totalNotesCount = NCERT_NOTES.length;
  const syllabusProgress = Math.round((completedCount / totalNotesCount) * 100);

  return (
    <div className="p-4 space-y-4">
      {/* Syllabus Completion Tracker */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold">Class 10 NCERT Syllabus Tracker</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                High-yield chapters & board exam notes
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {completedCount}/{totalNotesCount} Done
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${syllabusProgress}%` }}
          />
        </div>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Subjects' },
          { id: 'science', label: '🧪 Science' },
          { id: 'maths', label: '📐 Mathematics' },
          { id: 'social', label: '🌍 Social Science' },
          { id: 'english', label: '📖 English' },
          { id: 'hindi', label: '🪷 Hindi (हिंदी)' },
          { id: 'optional_lang', label: '🗣️ Optional Languages' }
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

      {/* Chapters Cards List */}
      <div className="space-y-3">
        {filteredNotes.map(note => {
          const isDone = user.completedChapterIds.includes(note.id);

          return (
            <div
              key={note.id}
              className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs hover:border-indigo-400 transition-all flex flex-col gap-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div 
                  onClick={() => setActiveNoteModal(note)}
                  className="cursor-pointer flex-1"
                >
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <span className="font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Ch {note.chapterNumber} · {note.subject.toUpperCase()}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {note.readTime}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {note.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {note.summary}
                  </p>
                </div>

                {/* Mark as Done Toggle */}
                <button
                  onClick={() => toggleChapterCompleted(note.id)}
                  className={`p-1.5 rounded-xl transition-colors shrink-0 ${
                    isDone
                      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  title={isDone ? 'Mark as Incomplete' : 'Mark as Read (+50 XP)'}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>

              {/* Action bar */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveNoteModal(note)}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
                >
                  <span>Read Chapter Notes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {onPracticeChapter && (
                  <button
                    onClick={() => onPracticeChapter(note.subject)}
                    className="text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    Practice MCQs →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chapter Detail Full Reading Modal */}
      {activeNoteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[85vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Chapter {activeNoteModal.chapterNumber} · {activeNoteModal.subject.toUpperCase()}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {activeNoteModal.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveNoteModal(null);
                  if (onCloseOpenedNote) onCloseOpenedNote();
                }}
                className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 overflow-y-auto no-scrollbar space-y-4 text-xs leading-relaxed">
              {/* Summary */}
              <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
                <h5 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Quick Overview
                </h5>
                <p className="text-slate-700 dark:text-slate-300">{activeNoteModal.summary}</p>
              </div>

              {/* Key Concept Points */}
              <div className="space-y-2">
                <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                  Key High-Yield Concepts
                </h5>
                <ul className="space-y-2">
                  {activeNoteModal.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                      <span className="font-bold text-indigo-600 shrink-0 mt-0.5">•</span>
                      <span className="text-slate-800 dark:text-slate-200">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Reactions / Formulas if available */}
              {activeNoteModal.importantFormulasOrReactions && activeNoteModal.importantFormulasOrReactions.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                    Important Reactions & Equations
                  </h5>
                  <div className="space-y-1.5">
                    {activeNoteModal.importantFormulasOrReactions.map((eq, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {eq}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Frequent Board Questions */}
              <div className="space-y-2">
                <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  Frequent Board Exam Questions
                </h5>
                <div className="space-y-2.5">
                  {activeNoteModal.frequentBoardQuestions.map((q, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1.5">
                      <p className="font-bold text-amber-900 dark:text-amber-300">
                        Q: {q.question}
                      </p>
                      <p className="text-slate-700 dark:text-slate-300 text-[11px] pl-2 border-l-2 border-amber-400">
                        <strong>Ans:</strong> {q.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleChapterCompleted(activeNoteModal.id);
                  setActiveNoteModal(null);
                }}
                className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition"
              >
                {user.completedChapterIds.includes(activeNoteModal.id) ? 'Keep as Done' : 'Mark as Completed (+50 XP)'}
              </button>

              <button
                onClick={() => {
                  setActiveNoteModal(null);
                  if (onPracticeChapter) onPracticeChapter(activeNoteModal.subject);
                }}
                className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Practice Questions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
