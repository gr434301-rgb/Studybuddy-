import React, { useState } from 'react';
import { FORMULAS_DATA } from '../data/formulas';
import { FormulaItem, SubjectId } from '../types';
import { 
  FileText, 
  Search, 
  Copy, 
  Check, 
  Bookmark, 
  Sparkles,
  Layers
} from 'lucide-react';

export const FormulasTab: React.FC = () => {
  const [filterSubject, setFilterSubject] = useState<SubjectId | 'all'>('all');
  const [search, setSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFormulas = React.useMemo(() => {
    return FORMULAS_DATA.filter(f => {
      const matchSubject = filterSubject === 'all' || f.subject === filterSubject;
      const matchSearch = !search.trim() || 
        f.title.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase()) ||
        f.variables.toLowerCase().includes(search.toLowerCase()) ||
        f.application.toLowerCase().includes(search.toLowerCase());
      return matchSubject && matchSearch;
    });
  }, [filterSubject, search]);

  const handleCopy = (formula: FormulaItem) => {
    navigator.clipboard.writeText(`${formula.title}: ${formula.formula}`);
    setCopiedId(formula.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold">Class 10 Formula & Reaction Bank</h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Must-know formulas for Physics, Chemistry & Mathematics board exams
        </p>
      </div>

      {/* Search & Subject filter */}
      <div className="space-y-2">
        <div className="bg-white dark:bg-slate-800 p-2 px-3 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Ohm's Law, Quadratic, Trigonometry..."
            className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-xs text-slate-400">
              Clear
            </button>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Formulas' },
            { id: 'maths', label: '📐 Mathematics' },
            { id: 'science', label: '🧪 Science' },
            { id: 'social', label: '🌍 Social Science' },
            { id: 'hindi', label: '🪷 Hindi Grammar' },
            { id: 'optional_lang', label: '🗣️ Optional Lang' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterSubject(tab.id as SubjectId | 'all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border ${
                filterSubject === tab.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Formulas List */}
      <div className="space-y-3">
        {filteredFormulas.map(item => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5 hover:border-indigo-400 transition-colors"
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {item.category}
              </span>
              <button
                onClick={() => handleCopy(item)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 text-[11px]"
                title="Copy Formula"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {item.title}
            </h4>

            {/* Formula Block */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700/60 font-mono text-xs font-semibold text-slate-900 dark:text-indigo-300 tracking-wide overflow-x-auto no-scrollbar">
              {item.formula}
            </div>

            {/* Variables breakdown */}
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong className="text-slate-700 dark:text-slate-300">Variables: </strong>
              {item.variables}
            </p>

            {/* Application */}
            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-amber-50/50 dark:bg-amber-950/20 p-2 rounded-xl border border-amber-200/50 dark:border-amber-900/30">
              <span className="font-semibold text-amber-800 dark:text-amber-300">Board Exam Tip: </span>
              {item.application}
            </div>
          </div>
        ))}

        {filteredFormulas.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            No formulas found matching "{search}".
          </div>
        )}
      </div>
    </div>
  );
};
