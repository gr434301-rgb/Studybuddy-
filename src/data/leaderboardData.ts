import { LeaderboardUser } from '../types';

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'lead_1',
    name: 'Aarav Sharma',
    avatar: '👨‍🎓',
    rank: 1,
    xp: 4250,
    streak: 28,
    accuracy: 96,
    badge: 'State Topper'
  },
  {
    id: 'lead_2',
    name: 'Diya Patel',
    avatar: '👩‍🔬',
    rank: 2,
    xp: 3890,
    streak: 24,
    accuracy: 94,
    badge: 'Science Prodigy'
  },
  {
    id: 'lead_3',
    name: 'Rohan Verma',
    avatar: '🧑‍💻',
    rank: 3,
    xp: 3540,
    streak: 19,
    accuracy: 92,
    badge: 'Maths Wizard'
  },
  {
    id: 'lead_4',
    name: 'Ananya Gupta',
    avatar: '👩‍🏫',
    rank: 4,
    xp: 3120,
    streak: 16,
    accuracy: 90,
    badge: 'Consistent Scholar'
  },
  {
    id: 'lead_5',
    name: 'Siddharth Iyer',
    avatar: '👨‍🚀',
    rank: 5,
    xp: 2840,
    streak: 14,
    accuracy: 89,
    badge: 'Streak Master'
  },
  {
    id: 'lead_6',
    name: 'Meera Nambiar',
    avatar: '🌟',
    rank: 6,
    xp: 2600,
    streak: 12,
    accuracy: 88,
    badge: 'Rising Star'
  },
  {
    id: 'lead_7',
    name: 'Kabir Singh',
    avatar: '⚡',
    rank: 7,
    xp: 2310,
    streak: 11,
    accuracy: 86,
    badge: 'Daily Solver'
  },
  {
    id: 'lead_8',
    name: 'Pooja Reddy',
    avatar: '📚',
    rank: 8,
    xp: 1950,
    streak: 9,
    accuracy: 84,
    badge: 'NCERT Master'
  }
];

export const MOTIVATIONAL_QUOTES = [
  {
    quote: "Success in Class 10 is not about 14 hours of study in one day, but 3 hours of dedicated study every day.",
    author: "EduPulse Wisdom"
  },
  {
    quote: "Clear concepts, consistent revision, and daily MCQs turn anxiety into board exam confidence.",
    author: "CBSE Toppers Guild"
  },
  {
    quote: "Every formula practiced today is a mark guaranteed in your final board scorecard.",
    author: "Dr. A.P.J. Abdul Kalam Spirit"
  },
  {
    quote: "Small daily improvements over time lead to stunning board results.",
    author: "EduPulse Daily Motivation"
  }
];

export const BADGES_LIST = [
  {
    id: 'first_50',
    title: 'Daily 50 Achiever',
    description: 'Completed 50 questions in a single day',
    icon: '⚡',
    requiredStreak: 1
  },
  {
    id: 'streak_7',
    title: '7-Day Fire Warrior',
    description: 'Maintained a 7-day study streak',
    icon: '🔥',
    requiredStreak: 7
  },
  {
    id: 'science_pro',
    title: 'Science Explorer',
    description: 'Answered 10+ Science questions correctly',
    icon: '🧪',
    requiredStreak: 0
  },
  {
    id: 'maths_champ',
    title: 'Maths Champion',
    description: 'Mastered 10+ Maths board problems',
    icon: '📐',
    requiredStreak: 0
  },
  {
    id: 'timer_master',
    title: 'Deep Focus Monk',
    description: 'Completed a 60+ minute study timer session',
    icon: '🧘',
    requiredStreak: 0
  }
];
