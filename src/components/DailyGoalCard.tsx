import React from 'react';
import { DailyGoalSetting } from './DailyGoalSetting';

interface DailyGoalCardProps {
  onStartPractice: () => void;
  onOpenTimer: () => void;
}

export const DailyGoalCard: React.FC<DailyGoalCardProps> = (props) => {
  return <DailyGoalSetting {...props} />;
};

export { DailyGoalSetting };
