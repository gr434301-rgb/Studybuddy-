import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_LEADERBOARD, BADGES_LIST } from '../data/leaderboardData';
import { Trophy, Flame, Medal, Award, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { LeaderboardUser } from '../types';

export const LeaderboardTab: React.FC = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<'ranks' | 'badges'>('ranks');

  // Insert current user into leaderboard dynamically based on their XP
  const fullLeaderboard: LeaderboardUser[] = React.useMemo(() => {
    const currentUserEntry: LeaderboardUser = {
      id: 'current_user',
      name: user.name + ' (You)',
      avatar: user.avatar,
      rank: 1, // temporary
      xp: user.xp,
      streak: user.streak,
      accuracy: Math.round((user.correctCount / Math.max(1, user.questionsSolved)) * 100),
      badge: user.level >= 5 ? 'Class 10 Veteran' : 'Rising Scholar',
      isCurrentUser: true
    };

    const combined = [...INITIAL_LEADERBOARD, currentUserEntry];
    combined.sort((a, b) => b.xp - a.xp);

    return combined.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  }, [user]);

  const userCurrentRank = fullLeaderboard.find(u => u.isCurrentUser)?.rank || 4;

  return (
    <div className="p-4 space-y-4">
      {/* Top Banner / Current User Standings */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white p-4.5 rounded-3xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-200 fill-amber-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
              Class 10 State League
            </span>
          </div>
          <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">
            Rank #{userCurrentRank}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <h3 className="text-base font-extrabold">{user.name}</h3>
            <p className="text-xs text-amber-100">Level {user.level} · {user.xp} Total XP</p>
          </div>
          <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-2xl">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="text-xs font-bold">{user.streak} Days Active</span>
          </div>
        </div>
      </div>

      {/* Segmented Switcher (Ranks vs Badges) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('ranks')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
            activeTab === 'ranks'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Topper Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
            activeTab === 'badges'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Badges & Achievements
        </button>
      </div>

      {/* Ranks Tab */}
      {activeTab === 'ranks' && (
        <div className="space-y-2">
          {fullLeaderboard.map((student) => {
            const isTop3 = student.rank <= 3;
            const medalColors = [
              'text-amber-500 fill-amber-400',
              'text-slate-400 fill-slate-300',
              'text-amber-700 fill-amber-600'
            ];

            return (
              <div
                key={student.id}
                className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                  student.isCurrentUser
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank badge */}
                  <div className="w-7 text-center font-bold text-xs shrink-0">
                    {isTop3 ? (
                      <Medal className={`w-5 h-5 mx-auto ${medalColors[student.rank - 1]}`} />
                    ) : (
                      <span className="text-slate-400 font-mono">#{student.rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-base shrink-0">
                    {student.avatar}
                  </div>

                  {/* Name and badge */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      {student.name}
                      {student.isCurrentUser && (
                        <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                          YOU
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {student.badge} · {student.streak}d streak
                    </p>
                  </div>
                </div>

                {/* Score & XP */}
                <div className="text-right">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums block">
                    {student.xp} XP
                  </span>
                  <span className="text-[10px] text-slate-400 tabular-nums">
                    {student.accuracy}% accuracy
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="space-y-3">
          {BADGES_LIST.map((badge) => {
            const isUnlocked = user.badges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xs'
                    : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                    isUnlocked 
                      ? 'bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/50' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      {badge.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {badge.description}
                    </p>
                  </div>
                </div>

                <div>
                  {isUnlocked ? (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
