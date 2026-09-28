import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectId, SubjectInsight } from '../types';
import { aiVoice } from '../utils/aiVoice';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Award, 
  TrendingUp, 
  BookOpen, 
  Zap, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Volume2,
  Filter
} from 'lucide-react';

interface PracticeInsightsProps {
  onPracticeSubject: (subject: SubjectId) => void;
  onOpenNotes: (subject: SubjectId) => void;
}

export const PracticeInsights: React.FC<PracticeInsightsProps> = ({ 
  onPracticeSubject,
  onOpenNotes
}) => {
  const { user, darkMode } = useApp();
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<SubjectId | null>(null);
  const [scope, setScope] = useState<'core5' | 'all6'>('core5');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Subject performance stats across the 6 Class 10 subjects
  const stats = user.subjectStats || {
    maths: { answered: 32, correct: 28 },
    science: { answered: 38, correct: 34 },
    social: { answered: 22, correct: 18 },
    english: { answered: 16, correct: 14 },
    hindi: { answered: 24, correct: 22 },
    optional_lang: { answered: 20, correct: 18 }
  };

  const subjectData: SubjectInsight[] = [
    {
      subject: 'maths',
      subjectName: 'Math (Mathematics)',
      icon: '📐',
      color: '#8b5cf6', // violet
      totalAnswered: stats.maths?.answered || 32,
      correct: stats.maths?.correct || 28,
      accuracy: Math.round(((stats.maths?.correct || 28) / Math.max(1, stats.maths?.answered || 32)) * 100),
      masteryScore: Math.min(100, Math.round(((stats.maths?.correct || 28) / 35) * 100)),
      chapterCount: 14,
      recommendedChapter: 'Trigonometry & Quadratic Equations',
      status: ((stats.maths?.correct || 28) / Math.max(1, stats.maths?.answered || 32)) >= 0.85 ? 'Mastered' : 'Proficient'
    },
    {
      subject: 'science',
      subjectName: 'Science',
      icon: '🧪',
      color: '#3b82f6', // blue
      totalAnswered: stats.science?.answered || 38,
      correct: stats.science?.correct || 34,
      accuracy: Math.round(((stats.science?.correct || 34) / Math.max(1, stats.science?.answered || 38)) * 100),
      masteryScore: Math.min(100, Math.round(((stats.science?.correct || 34) / 35) * 100)),
      chapterCount: 13,
      recommendedChapter: 'Electricity, Optics & Carbon Compounds',
      status: ((stats.science?.correct || 34) / Math.max(1, stats.science?.answered || 38)) >= 0.85 ? 'Mastered' : 'Proficient'
    },
    {
      subject: 'english',
      subjectName: 'English',
      icon: '📖',
      color: '#f59e0b', // amber
      totalAnswered: stats.english?.answered || 16,
      correct: stats.english?.correct || 14,
      accuracy: Math.round(((stats.english?.correct || 14) / Math.max(1, stats.english?.answered || 16)) * 100),
      masteryScore: Math.min(100, Math.round(((stats.english?.correct || 14) / 25) * 100)),
      chapterCount: 16,
      recommendedChapter: 'First Flight & Reported Speech Grammar',
      status: ((stats.english?.correct || 14) / Math.max(1, stats.english?.answered || 16)) >= 0.85 ? 'Mastered' : 'Proficient'
    },
    {
      subject: 'hindi',
      subjectName: 'Hindi (क्षितिज/कृतिका)',
      icon: '🪷',
      color: '#ec4899', // pink
      totalAnswered: stats.hindi?.answered || 24,
      correct: stats.hindi?.correct || 22,
      accuracy: Math.round(((stats.hindi?.correct || 22) / Math.max(1, stats.hindi?.answered || 24)) * 100),
      masteryScore: Math.min(100, Math.round(((stats.hindi?.correct || 22) / 30) * 100)),
      chapterCount: 16,
      recommendedChapter: 'नेताजी का चश्मा, सूरदास के पद व व्याकरण वाच्य',
      status: ((stats.hindi?.correct || 22) / Math.max(1, stats.hindi?.answered || 24)) >= 0.85 ? 'Mastered' : 'Proficient'
    },
    {
      subject: 'social',
      subjectName: 'Social Science',
      icon: '🌍',
      color: '#10b981', // emerald
      totalAnswered: stats.social?.answered || 22,
      correct: stats.social?.correct || 18,
      accuracy: Math.round(((stats.social?.correct || 18) / Math.max(1, stats.social?.answered || 22)) * 100),
      masteryScore: Math.min(100, Math.round(((stats.social?.correct || 18) / 30) * 100)),
      chapterCount: 20,
      recommendedChapter: 'भारत में राष्ट्रवाद, संघवाद व संसाधन विकास',
      status: ((stats.social?.correct || 18) / Math.max(1, stats.social?.answered || 22)) >= 0.85 ? 'Mastered' : 'Proficient'
    },
    {
      subject: 'optional_lang',
      subjectName: 'Optional Languages',
      icon: '🗣️',
      color: '#06b6d4', // cyan
      totalAnswered: stats.optional_lang?.answered || 20,
      correct: stats.optional_lang?.correct || 18,
      accuracy: Math.round(((stats.optional_lang?.correct || 18) / Math.max(1, stats.optional_lang?.answered || 20)) * 100),
      masteryScore: Math.min(100, Math.round(((stats.optional_lang?.correct || 18) / 25) * 100)),
      chapterCount: 12,
      recommendedChapter: 'संस्कृत शेमुषी / IT 402 AI & Computer Applications',
      status: ((stats.optional_lang?.correct || 18) / Math.max(1, stats.optional_lang?.answered || 20)) >= 0.85 ? 'Mastered' : 'Proficient'
    }
  ];

  // Recharts Radar Chart Data Format for Core 5 Class 10 Subjects vs All 6
  const allRadarData = [
    { subject: 'Math', score: subjectData[0].accuracy, fullMark: 100, key: 'maths' },
    { subject: 'Science', score: subjectData[1].accuracy, fullMark: 100, key: 'science' },
    { subject: 'English', score: subjectData[2].accuracy, fullMark: 100, key: 'english' },
    { subject: 'Hindi', score: subjectData[3].accuracy, fullMark: 100, key: 'hindi' },
    { subject: 'Social Science', score: subjectData[4].accuracy, fullMark: 100, key: 'social' },
    { subject: 'Optional Lang', score: subjectData[5].accuracy, fullMark: 100, key: 'optional_lang' }
  ];

  const radarChartData = scope === 'core5' ? allRadarData.slice(0, 5) : allRadarData;
  const activeSubjectData = scope === 'core5' ? subjectData.slice(0, 5) : subjectData;

  // Average accuracy
  const totalAcc = activeSubjectData.reduce((acc, s) => acc + s.accuracy, 0);
  const avgAccuracy = Math.round(totalAcc / activeSubjectData.length);

  const bestSubject = [...activeSubjectData].sort((a, b) => b.accuracy - a.accuracy)[0];
  const focusSubject = [...activeSubjectData].sort((a, b) => a.accuracy - b.accuracy)[0];

  const handleVoiceAdvice = () => {
    const text = `आपके छह विषयों के प्रदर्शन का विश्लेषण: आपका सबसे मजबूत विषय ${bestSubject.subjectName} है जिसमें आपकी एक्यूरेसी ${bestSubject.accuracy} प्रतिशत है। और प्राथमिकता से रिवीजन करने वाला विषय ${focusSubject.subjectName} है। आइए आज इस पर 20 प्रश्न हल करें!`;
    aiVoice.speak(text);
  };

  // Custom Recharts Tooltip
  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const matchingSub = subjectData.find(s => s.subject === data.key);
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-lg border border-slate-700 text-xs space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-indigo-300">
            <span>{matchingSub?.icon}</span>
            <span>{matchingSub?.subjectName}</span>
          </p>
          <p className="text-slate-300">
            Accuracy: <strong className="text-emerald-400">{data.score}%</strong>
          </p>
          <p className="text-[10px] text-slate-400">
            Solved: {matchingSub?.correct}/{matchingSub?.totalAnswered} Correct
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-4.5 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
              Class 10 6-Subject Performance Radar (Recharts)
            </span>
          </div>
          <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            Overall: {avgAccuracy}%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-indigo-700/50 text-xs">
          <div>
            <span className="text-[10px] text-indigo-300 uppercase block font-semibold">Strongest Subject</span>
            <span className="font-bold flex items-center gap-1 mt-0.5">
              <span>{bestSubject.icon}</span>
              <span className="truncate">{bestSubject.subjectName}</span>
              <span className="text-emerald-400 font-extrabold shrink-0">({bestSubject.accuracy}%)</span>
            </span>
          </div>

          <div>
            <span className="text-[10px] text-indigo-300 uppercase block font-semibold">Priority Revision</span>
            <span className="font-bold flex items-center gap-1 mt-0.5">
              <span>{focusSubject.icon}</span>
              <span className="truncate">{focusSubject.subjectName}</span>
              <span className="text-amber-300 font-extrabold shrink-0">({focusSubject.accuracy}%)</span>
            </span>
          </div>
        </div>

        {/* AI Voice Mentor Advice Trigger */}
        <div className="mt-3 pt-2.5 border-t border-indigo-700/40 flex items-center justify-between">
          <button
            onClick={handleVoiceAdvice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition backdrop-blur-xs"
          >
            <Volume2 className="w-3.5 h-3.5 text-indigo-300" />
            <span>Hear AI Mentor Insights ({aiVoice.getPersona() === 'bharti' ? 'Bharti' : 'Amitabh'})</span>
          </button>
          <span className="text-[10px] text-indigo-300">Live Class 10 Syllabus</span>
        </div>
      </div>

      {/* Recharts Radar Chart Visualizer */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col items-center relative">
        <div className="w-full flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
            <span>Class 10 Core Subject Performance Radar</span>
          </h4>
          
          {/* Scope Toggle: Core 5 vs All 6 */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 p-0.5 rounded-xl text-[10px] font-semibold">
            <button
              onClick={() => setScope('core5')}
              className={`px-2 py-0.5 rounded-lg transition ${
                scope === 'core5'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Core 5 Subjects
            </button>
            <button
              onClick={() => setScope('all6')}
              className={`px-2 py-0.5 rounded-lg transition ${
                scope === 'all6'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              All 6 (incl. Optional)
            </button>
          </div>
        </div>

        {/* Recharts Radar Chart */}
        <div className="w-full max-w-[340px] h-[280px] flex items-center justify-center relative">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarChartData}>
                <PolarGrid 
                  stroke={darkMode ? '#334155' : '#e2e8f0'} 
                  strokeDasharray="3 3" 
                />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ 
                    fill: darkMode ? '#cbd5e1' : '#334155', 
                    fontSize: 10, 
                    fontWeight: 700 
                  }} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: '#94a3b8', fontSize: 8 }}
                />
                <Radar
                  name="Mastery %"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.45}
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 1, stroke: '#ffffff' }}
                />
                <Tooltip content={<CustomRadarTooltip />} />
                <Legend 
                  wrapperStyle={{ 
                    fontSize: '11px', 
                    paddingTop: '4px',
                    color: darkMode ? '#94a3b8' : '#64748b' 
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-slate-400">
              Loading Performance Radar...
            </div>
          )}
        </div>

        {/* Interactive Subject Filter Pills for the 6 Subjects */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/60 w-full text-[11px]">
          {subjectData.map(s => {
            const isSelected = selectedSubjectKey === s.subject;
            return (
              <button
                key={s.subject}
                onClick={() => setSelectedSubjectKey(isSelected ? null : s.subject)}
                className={`px-2.5 py-1 rounded-xl flex items-center gap-1 border transition-colors ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-700/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.subjectName.split(' ')[0]}</span>
                <span className="font-bold tabular-nums">({s.accuracy}%)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Breakdown for All 6 Subjects */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>6 Subjects In-Depth Breakdown</span>
          <span className="text-[10px] text-slate-400 font-normal">Click practice to launch drill</span>
        </h4>

        {subjectData.map(s => {
          const isSelected = selectedSubjectKey === s.subject;

          return (
            <div
              key={s.subject}
              className={`p-3.5 rounded-2xl border transition-all ${
                isSelected 
                  ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {s.subjectName}
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        s.status === 'Mastered'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : s.status === 'Proficient'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}>
                        {s.status}
                      </span>
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {s.correct}/{s.totalAnswered} solved correctly · {s.accuracy}% accuracy · {s.chapterCount} NCERT chapters
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {s.masteryScore}%
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
                    Mastery
                  </span>
                </div>
              </div>

              {/* Recommended High-Yield Chapter & Action */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 flex-1 mr-2">
                  <strong className="text-slate-900 dark:text-white">Next Focus: </strong>
                  {s.recommendedChapter}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onOpenNotes(s.subject)}
                    className="p-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => onPracticeSubject(s.subject)}
                    className="p-1.5 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold shadow-xs transition flex items-center gap-1"
                  >
                    <span>Practice</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
