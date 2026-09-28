import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { PracticeTab } from './components/PracticeTab';
import { NcertTab } from './components/NcertTab';
import { TimerTab } from './components/TimerTab';
import { FormulasTab } from './components/FormulasTab';
import { LeaderboardTab } from './components/LeaderboardTab';
import { MistakesTab } from './components/MistakesTab';
import { ProfileSettingsTab } from './components/ProfileSettingsTab';
import { AuthModal } from './components/AuthModal';
import { SubjectId, Question } from './types';

const MainAppContent: React.FC = () => {
  const { 
    isAuthenticated, 
    currentTab, 
    setCurrentTab, 
    viewMode, 
    setSelectedSubject 
  } = useApp();

  const [openedChapterNoteId, setOpenedChapterNoteId] = useState<string | null>(null);
  const [practiceMode, setPracticeMode] = useState<'streak50' | 'subject' | 'mock' | 'insights'>('streak50');
  const [practiceSubject, setPracticeSubject] = useState<SubjectId | undefined>(undefined);

  const handleStartPracticeMode = (mode: 'streak50' | 'subject' | 'mock' | 'insights', subject?: SubjectId) => {
    setPracticeMode(mode);
    if (subject) {
      setPracticeSubject(subject);
      setSelectedSubject(subject);
    }
    setCurrentTab('practice');
  };

  const handleOpenChapterNote = (noteId: string) => {
    setOpenedChapterNoteId(noteId);
    setCurrentTab('ncert');
  };

  const handleStartRetest = (missedQuestions: Question[]) => {
    setPracticeMode('subject');
    setCurrentTab('practice');
  };

  const isWide = viewMode === 'wide';

  return (
    <div className="h-full w-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center sm:p-4 overflow-hidden select-none">
      {/* Shell Container */}
      <div 
        className={`w-full h-full flex flex-col bg-white dark:bg-slate-900 shadow-2xl overflow-hidden transition-all duration-300 ${
          isWide 
            ? 'max-w-4xl sm:h-[95vh] sm:rounded-3xl sm:border border-slate-200 dark:border-slate-800' 
            : 'max-w-md sm:h-[92vh] sm:rounded-[36px] sm:border-8 sm:border-slate-800 dark:sm:border-slate-800'
        }`}
      >
        {!isAuthenticated ? (
          <AuthModal />
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Top Header */}
            <Header />

            {/* Scrollable Main View */}
            <main className="flex-1 overflow-y-auto no-scrollbar">
              {currentTab === 'home' && (
                <HomeTab 
                  onStartPracticeMode={handleStartPracticeMode} 
                  onOpenChapterNote={handleOpenChapterNote}
                  onOpenTimer={() => setCurrentTab('timer')}
                />
              )}

              {currentTab === 'ncert' && (
                <NcertTab 
                  openedNoteId={openedChapterNoteId}
                  onCloseOpenedNote={() => setOpenedChapterNoteId(null)}
                  onPracticeChapter={(subject) => handleStartPracticeMode('subject', subject)}
                />
              )}

              {currentTab === 'practice' && (
                <PracticeTab 
                  initialMode={practiceMode} 
                  initialSubject={practiceSubject} 
                  onOpenNotes={(subject) => {
                    setSelectedSubject(subject);
                    setCurrentTab('ncert');
                  }}
                />
              )}

              {currentTab === 'timer' && (
                <TimerTab 
                  onPracticeSubject={(subject) => handleStartPracticeMode('subject', subject)} 
                  onOpenNotes={(subject) => {
                    setSelectedSubject(subject);
                    setCurrentTab('ncert');
                  }}
                />
              )}

              {currentTab === 'formulas' && <FormulasTab />}

              {currentTab === 'leaderboard' && <LeaderboardTab />}

              {currentTab === 'mistakes' && (
                <MistakesTab onStartRetest={handleStartRetest} />
              )}

              {currentTab === 'settings' && <ProfileSettingsTab />}
            </main>

            {/* Bottom Nav Bar */}
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
