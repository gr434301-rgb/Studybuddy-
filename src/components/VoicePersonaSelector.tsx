import React, { useState, useEffect } from 'react';
import { aiVoice, VoicePersona, PERSONAS_CONFIG } from '../utils/aiVoice';
import { Volume2, VolumeX, Sparkles, Play, Square, Check, Radio } from 'lucide-react';

interface VoicePersonaSelectorProps {
  compact?: boolean;
}

export const VoicePersonaSelector: React.FC<VoicePersonaSelectorProps> = ({ compact = false }) => {
  const [currentPersona, setCurrentPersona] = useState<VoicePersona>(() => aiVoice.getPersona());
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingText, setSpeakingText] = useState<string>('');

  useEffect(() => {
    const unsubscribe = aiVoice.subscribe((speaking, text) => {
      setIsSpeaking(speaking);
      setSpeakingText(text);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectPersona = (persona: VoicePersona) => {
    setCurrentPersona(persona);
    aiVoice.setPersona(persona);
    if (persona !== 'deactivated') {
      aiVoice.speakIntro(persona);
    } else {
      aiVoice.stop();
    }
  };

  const handlePlayPreview = (e: React.MouseEvent, persona: VoicePersona) => {
    e.stopPropagation();
    if (isSpeaking) {
      aiVoice.stop();
    } else {
      aiVoice.speakIntro(persona);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
        {(['amitabh', 'bharti', 'deactivated'] as VoicePersona[]).map(p => {
          const cfg = PERSONAS_CONFIG[p];
          const isSelected = currentPersona === p;
          return (
            <button
              key={p}
              onClick={() => handleSelectPersona(p)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title={cfg.name}
            >
              <span>{cfg.avatar}</span>
              <span>{cfg.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-4.5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>AI Voice Mentor Personalization</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-extrabold">
                Part 3
              </span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Choose your personal AI study voice for questions, hints, and celebrations
            </p>
          </div>
        </div>

        {/* Live Speaking Indicator */}
        {isSpeaking && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-[10px] font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
            <span>Speaking...</span>
            <button
              onClick={() => aiVoice.stop()}
              className="ml-1 hover:text-purple-900 dark:hover:text-white"
            >
              <Square className="w-3 h-3 fill-current" />
            </button>
          </div>
        )}
      </div>

      {/* Voice Personas Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(['amitabh', 'bharti', 'deactivated'] as VoicePersona[]).map(personaKey => {
          const cfg = PERSONAS_CONFIG[personaKey];
          const isSelected = currentPersona === personaKey;

          return (
            <div
              key={personaKey}
              onClick={() => handleSelectPersona(personaKey)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/30 dark:bg-slate-900/30'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl shadow-xs">
                    {cfg.avatar}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {cfg.name}
                  </h5>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                    personaKey === 'amitabh'
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      : personaKey === 'bharti'
                      ? 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {cfg.badge}
                  </span>
                </div>

                <p className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {cfg.character}
                </p>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {cfg.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-400">
                  {isSelected ? '✓ Active Voice' : 'Click to Activate'}
                </span>

                {personaKey !== 'deactivated' && (
                  <button
                    type="button"
                    onClick={(e) => handlePlayPreview(e, personaKey)}
                    className="p-1 px-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900 text-[10px] font-bold flex items-center gap-1 transition"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Test Audio</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Speaking text subtitle preview */}
      {isSpeaking && speakingText && (
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 rounded-2xl border border-indigo-200 dark:border-indigo-800/80 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block text-[10px] uppercase tracking-wider text-indigo-500">
              AI Voice Live Subtitle ({PERSONAS_CONFIG[currentPersona].name}):
            </span>
            <p className="italic text-[11px] mt-0.5 leading-relaxed">
              "{speakingText}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
