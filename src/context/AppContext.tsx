import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, SubjectId } from '../types';
import { BADGES_LIST } from '../data/leaderboardData';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

interface AppContextType {
  isAuthenticated: boolean;
  user: UserProfile;
  currentTab: string;
  darkMode: boolean;
  viewMode: 'mobile' | 'wide';
  soundEnabled: boolean;
  selectedSubject: SubjectId | 'all';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedSubject: (subject: SubjectId | 'all') => void;
  setCurrentTab: (tab: string) => void;
  setDarkMode: (enabled: boolean) => void;
  setViewMode: (mode: 'mobile' | 'wide') => void;
  setSoundEnabled: (enabled: boolean) => void;
  login: (phone: string, name?: string) => void;
  logout: () => void;
  recordQuestionAnswered: (questionId: string, isCorrect: boolean, xpEarned?: number, subject?: SubjectId) => void;
  toggleBookmark: (questionId: string) => void;
  toggleChapterCompleted: (chapterId: string) => void;
  recordStudySession: (minutes: number, subject?: SubjectId) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  setDailyGoal: (type: 'questions' | 'hours', target: number) => void;
  resetProgress: () => void;
  celebrate: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: 'Arjun Sharma',
  phone: '9876543210',
  avatar: '👨‍🎓',
  targetPercent: 95,
  level: 4,
  xp: 1420,
  streak: 7,
  dailyStreakCount: 18,
  dailyStudyMinutes: 50,
  dailyGoalType: 'questions',
  dailyTargetQuestions: 50,
  dailyTargetHours: 2.5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  questionsSolved: 132,
  correctCount: 116,
  totalStudyMinutes: 380,
  bookmarkedQuestionIds: ['sci_4', 'math_5', 'hin_2'],
  mistakeQuestionIds: ['sci_5', 'math_6'],
  completedChapterIds: ['note_sci_1', 'note_math_1', 'note_hin_1'],
  badges: ['first_50', 'streak_7', 'science_pro'],
  subjectStats: {
    maths: { answered: 32, correct: 28 },
    science: { answered: 38, correct: 34 },
    social: { answered: 22, correct: 18 },
    english: { answered: 16, correct: 14 },
    hindi: { answered: 24, correct: 22 },
    optional_lang: { answered: 20, correct: 18 }
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('edupulse_auth');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('edupulse_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const today = new Date().toISOString().split('T')[0];
        if (parsed.lastActiveDate !== today) {
          parsed.dailyStreakCount = 0;
          parsed.dailyStudyMinutes = 0;
          parsed.lastActiveDate = today;
        }
        // Ensure defaults for any new properties
        return {
          ...DEFAULT_USER,
          ...parsed,
          subjectStats: {
            ...DEFAULT_USER.subjectStats,
            ...(parsed.subjectStats || {})
          }
        };
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('edupulse_dark');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [viewMode, setViewMode] = useState<'mobile' | 'wide'>('mobile');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    try {
      localStorage.setItem('edupulse_dark', JSON.stringify(darkMode));
    } catch (e) {
      console.error('Failed to save dark mode preference:', e);
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('edupulse_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('edupulse_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const celebrate = () => {
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 }
    });
    if (soundEnabled) {
      soundEngine.playCelebration();
    }
  };

  const login = (phone: string, name?: string) => {
    setIsAuthenticated(true);
    setUser(prev => ({
      ...prev,
      phone,
      name: name || (phone === '9876543210' ? 'Arjun Sharma' : 'Student')
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const recordQuestionAnswered = (
    questionId: string, 
    isCorrect: boolean, 
    xpEarned = 20, 
    subject?: SubjectId
  ) => {
    setUser(prev => {
      const newDailyCount = prev.dailyStreakCount + 1;
      const newXp = prev.xp + (isCorrect ? xpEarned : 5);
      const newLevel = Math.floor(newXp / 400) + 1;
      const newQuestionsSolved = prev.questionsSolved + 1;
      const newCorrectCount = prev.correctCount + (isCorrect ? 1 : 0);

      const newMistakes = isCorrect
        ? prev.mistakeQuestionIds.filter(id => id !== questionId)
        : prev.mistakeQuestionIds.includes(questionId)
          ? prev.mistakeQuestionIds
          : [...prev.mistakeQuestionIds, questionId];

      const newBadges = [...prev.badges];
      if (newDailyCount >= (prev.dailyTargetQuestions || 50) && !newBadges.includes('first_50')) {
        newBadges.push('first_50');
      }

      // Subject stats tracking
      const updatedSubjectStats: Record<SubjectId, { answered: number; correct: number }> = {
        maths: prev.subjectStats?.maths || { answered: 0, correct: 0 },
        science: prev.subjectStats?.science || { answered: 0, correct: 0 },
        social: prev.subjectStats?.social || { answered: 0, correct: 0 },
        english: prev.subjectStats?.english || { answered: 0, correct: 0 },
        hindi: prev.subjectStats?.hindi || { answered: 0, correct: 0 },
        optional_lang: prev.subjectStats?.optional_lang || { answered: 0, correct: 0 },
      };

      if (subject) {
        const cur = updatedSubjectStats[subject];
        updatedSubjectStats[subject] = {
          answered: cur.answered + 1,
          correct: cur.correct + (isCorrect ? 1 : 0)
        };
      }

      // Check if user hit their daily question goal
      if (prev.dailyGoalType === 'questions' && newDailyCount === prev.dailyTargetQuestions) {
        setTimeout(celebrate, 200);
      }

      return {
        ...prev,
        dailyStreakCount: newDailyCount,
        xp: newXp,
        level: newLevel,
        questionsSolved: newQuestionsSolved,
        correctCount: newCorrectCount,
        mistakeQuestionIds: newMistakes,
        badges: newBadges,
        subjectStats: updatedSubjectStats
      };
    });

    if (soundEnabled) {
      if (isCorrect) {
        soundEngine.playCorrect();
      } else {
        soundEngine.playIncorrect();
      }
    }
  };

  const setDailyGoal = (type: 'questions' | 'hours', target: number) => {
    setUser(prev => ({
      ...prev,
      dailyGoalType: type,
      dailyTargetQuestions: type === 'questions' ? target : prev.dailyTargetQuestions,
      dailyTargetHours: type === 'hours' ? target : prev.dailyTargetHours
    }));
  };

  const toggleBookmark = (questionId: string) => {
    setUser(prev => {
      const exists = prev.bookmarkedQuestionIds.includes(questionId);
      return {
        ...prev,
        bookmarkedQuestionIds: exists
          ? prev.bookmarkedQuestionIds.filter(id => id !== questionId)
          : [...prev.bookmarkedQuestionIds, questionId]
      };
    });
  };

  const toggleChapterCompleted = (chapterId: string) => {
    setUser(prev => {
      const exists = prev.completedChapterIds.includes(chapterId);
      const updated = exists
        ? prev.completedChapterIds.filter(id => id !== chapterId)
        : [...prev.completedChapterIds, chapterId];
      return {
        ...prev,
        completedChapterIds: updated,
        xp: prev.xp + (exists ? 0 : 50)
      };
    });
  };

  const recordStudySession = (minutes: number, subject?: SubjectId) => {
    setUser(prev => {
      const newTotalMinutes = prev.totalStudyMinutes + minutes;
      const newDailyMinutes = (prev.dailyStudyMinutes || 0) + minutes;
      const newBadges = [...prev.badges];
      if (minutes >= 60 && !newBadges.includes('timer_master')) {
        newBadges.push('timer_master');
      }

      // Check if user hit their daily hours goal
      const targetMins = (prev.dailyTargetHours || 2) * 60;
      if (prev.dailyGoalType === 'hours' && prev.dailyStudyMinutes < targetMins && newDailyMinutes >= targetMins) {
        setTimeout(celebrate, 200);
      }

      return {
        ...prev,
        totalStudyMinutes: newTotalMinutes,
        dailyStudyMinutes: newDailyMinutes,
        xp: prev.xp + Math.round(minutes * 1.5),
        badges: newBadges
      };
    });
    if (soundEnabled) {
      soundEngine.playBell();
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetProgress = () => {
    setUser({
      ...DEFAULT_USER,
      dailyStreakCount: 0,
      dailyStudyMinutes: 0,
      xp: 100,
      level: 1,
      questionsSolved: 0,
      correctCount: 0,
      totalStudyMinutes: 0,
      bookmarkedQuestionIds: [],
      mistakeQuestionIds: [],
      completedChapterIds: [],
      badges: [],
      subjectStats: {
        maths: { answered: 0, correct: 0 },
        science: { answered: 0, correct: 0 },
        social: { answered: 0, correct: 0 },
        english: { answered: 0, correct: 0 },
        hindi: { answered: 0, correct: 0 },
        optional_lang: { answered: 0, correct: 0 }
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        currentTab,
        darkMode,
        viewMode,
        soundEnabled,
        selectedSubject,
        searchQuery,
        setSearchQuery,
        setSelectedSubject,
        setCurrentTab,
        setDarkMode,
        setViewMode,
        setSoundEnabled,
        login,
        logout,
        recordQuestionAnswered,
        toggleBookmark,
        toggleChapterCompleted,
        recordStudySession,
        updateUserProfile,
        setDailyGoal,
        resetProgress,
        celebrate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
