export type SubjectId = 'science' | 'maths' | 'social' | 'english' | 'hindi' | 'optional_lang';

export type Difficulty = 'Easy' | 'Medium' | 'HOTS';

export interface Question {
  id: string;
  subject: SubjectId;
  subjectName: string;
  chapter: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  difficulty: Difficulty;
  formulaOrConcept?: string;
  year?: string; // e.g. "CBSE 2023"
}

export interface ChapterNote {
  id: string;
  subject: SubjectId;
  title: string;
  chapterNumber: number;
  readTime: string;
  summary: string;
  keyPoints: string[];
  importantFormulasOrReactions?: string[];
  frequentBoardQuestions: {
    question: string;
    answer: string;
  }[];
  completed?: boolean;
}

export interface FormulaItem {
  id: string;
  subject: SubjectId;
  category: string;
  title: string;
  formula: string;
  variables: string;
  application: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  avatar: string;
  targetPercent: number;
  level: number;
  xp: number;
  streak: number;
  dailyStreakCount: number; // count of questions solved today
  dailyStudyMinutes: number; // minutes studied today
  dailyGoalType: 'questions' | 'hours';
  dailyTargetQuestions: number; // e.g. 50
  dailyTargetHours: number; // e.g. 2.5
  lastActiveDate: string;
  questionsSolved: number;
  correctCount: number;
  totalStudyMinutes: number;
  bookmarkedQuestionIds: string[];
  mistakeQuestionIds: string[];
  completedChapterIds: string[];
  badges: string[];
  subjectStats?: Record<SubjectId, { answered: number; correct: number }>;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  xp: number;
  streak: number;
  accuracy: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface TimerSession {
  id: string;
  subject: SubjectId;
  durationMinutes: number;
  completedAt: string;
}

export interface DailyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  completed: boolean;
}

export interface SubjectInsight {
  subject: SubjectId;
  subjectName: string;
  icon: string;
  color: string;
  totalAnswered: number;
  correct: number;
  accuracy: number;
  masteryScore: number; // 0 - 100
  chapterCount: number;
  recommendedChapter: string;
  status: 'Mastered' | 'Proficient' | 'Needs Practice' | 'Not Started';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
