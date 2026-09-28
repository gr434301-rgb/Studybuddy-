import React, { useState, useEffect, useRef } from 'react';
import { Question, ChatMessage } from '../types';
import { aiVoice } from '../utils/aiVoice';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Copy, 
  Check, 
  MessageSquare, 
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Lightbulb
} from 'lucide-react';

interface QuickDoubtModalProps {
  question: Question;
  selectedOptionIndex: number | null;
  onClose: () => void;
}

export const QuickDoubtModal: React.FC<QuickDoubtModalProps> = ({
  question,
  selectedOptionIndex,
  onClose
}) => {
  // Pre-fill question prompt for user
  const getPreFilledPrompt = () => {
    if (selectedOptionIndex !== null) {
      const selectedLetter = String.fromCharCode(65 + selectedOptionIndex);
      const correctLetter = String.fromCharCode(65 + question.correctAnswer);
      if (selectedOptionIndex === question.correctAnswer) {
        return `Can you explain the deeper concept behind this question from ${question.chapter}: "${question.question}"? (I correctly chose Option ${selectedLetter}). What related board exam traps should I look out for?`;
      } else {
        return `Can you explain the core concept behind this question from ${question.chapter}: "${question.question}"? I selected Option (${selectedLetter}), but the correct answer is Option (${correctLetter}). Why is my option incorrect and what is the underlying concept?`;
      }
    }
    return `Please explain the concept and step-by-step reasoning for this question from ${question.chapter}: "${question.question}"`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputDoubt, setInputDoubt] = useState<string>(getPreFilledPrompt());
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showFullQuestion, setShowFullQuestion] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Concept Explanation suggestion pills tailored to Class 10 NCERT
  const promptSuggestions = [
    'Explain the core concept step-by-step',
    selectedOptionIndex !== null && selectedOptionIndex !== question.correctAnswer
      ? `Why is Option (${String.fromCharCode(65 + selectedOptionIndex)}) incorrect?`
      : 'Why are the distractors / other options wrong?',
    'What key formula or NCERT rule applies here?',
    'Give a mnemonic or memory trick for board exams',
    'सरल हिंदी में समझाइए (Explain in simple Hindi/Hinglish)',
    'CBSE 2026 Board Exam marking scheme keywords'
  ];

  // Initialize with concept explanation on mount
  useEffect(() => {
    fetchDoubtExplanation();
  }, [question.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const fetchDoubtExplanation = async (userPrompt?: string) => {
    setLoading(true);

    const promptText = userPrompt || getPreFilledPrompt();

    if (userPrompt) {
      const userMsg: ChatMessage = {
        id: `user_${Date.now()}`,
        role: 'user',
        content: promptText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsg]);
    }

    try {
      const res = await fetch('/api/explain-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          userDoubt: promptText,
          chatHistory: messages
        })
      });

      if (!res.ok) {
        throw new Error('Failed to fetch AI explanation');
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: data.reply || question.explanation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('AI Doubt fetch error:', err);
      // Fallback structured message
      const fallbackMsg: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: `### 💡 Concept Guide: ${question.chapter}

**1. Core NCERT Concept:**
• This question assesses key competencies from **${question.chapter}** (${question.subjectName}).
• **Correct Answer:** Option (${String.fromCharCode(65 + question.correctAnswer)}) — ${question.options[question.correctAnswer]}

**2. Detailed Conceptual Breakdown:**
${question.explanation}

${question.formulaOrConcept ? `**3. Key Formula / Reaction Rule:**\n\`${question.formulaOrConcept}\`\n` : ''}
**4. Why Distractors Fail:**
${question.options.map((opt, i) => {
  if (i === question.correctAnswer) return `• Option (${String.fromCharCode(65 + i)}): Correct application of the principle.`;
  return `• Option (${String.fromCharCode(65 + i)}): Incorrect due to common misconceptions or reversed signs.`;
}).join('\n')}

*CBSE Board Exam Tip:* Always define the fundamental terms and state the governing law before writing your final conclusion!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputDoubt.trim() || loading) return;
    const text = inputDoubt.trim();
    setInputDoubt('');
    fetchDoubtExplanation(text);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Subscribe to AI voice speaking state
  useEffect(() => {
    const unsubscribe = aiVoice.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => {
      unsubscribe();
      aiVoice.stop();
    };
  }, []);

  const handleToggleSpeech = (text: string) => {
    if (isSpeaking) {
      aiVoice.stop();
    } else {
      // Strip markdown hashes and stars for natural speech
      const cleanText = text
        .replace(/###/g, '')
        .replace(/\*\*/g, '')
        .replace(/•/g, '')
        .slice(0, 300);
      aiVoice.speak(cleanText);
    }
  };

  const handleResetPreFill = () => {
    setInputDoubt(getPreFilledPrompt());
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl h-[90vh] max-h-[800px] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  EduPulse AI Concept Tutor
                </h3>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  Voice Mentor Active
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {question.subjectName} · {question.chapter}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              aiVoice.stop();
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
            aria-label="Close AI Tutor modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pre-filled Active Question Banner */}
        <div className="bg-indigo-50/60 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] transition-all">
          <div className="px-3.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <FileQuestion className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider text-[10px]">
                Pre-filled Question Context
              </span>
              <span className="text-[10px] bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded-md font-semibold border border-slate-200 dark:border-slate-600">
                {question.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Correct: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">({String.fromCharCode(65 + question.correctAnswer)})</strong>
              </span>
              <button
                onClick={() => setShowFullQuestion(prev => !prev)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center"
                title={showFullQuestion ? 'Collapse Question' : 'Expand Question'}
              >
                {showFullQuestion ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {showFullQuestion && (
            <div className="px-3.5 pb-2.5 pt-0.5 space-y-1.5">
              <p className="font-semibold text-slate-800 dark:text-slate-100 text-xs leading-relaxed">
                {question.question}
              </p>

              {/* Options breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
                {question.options.map((opt, idx) => {
                  const isCorrect = idx === question.correctAnswer;
                  const isUserSelection = idx === selectedOptionIndex;

                  let badgeStyle = 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
                  if (isCorrect) {
                    badgeStyle = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-semibold';
                  } else if (isUserSelection) {
                    badgeStyle = 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700 font-semibold';
                  }

                  return (
                    <div 
                      key={idx}
                      className={`px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 ${badgeStyle}`}
                    >
                      <span className="font-bold text-[10px] w-4">
                        ({String.fromCharCode(65 + idx)})
                      </span>
                      <span className="truncate flex-1">{opt}</span>
                      {isCorrect && <Check className="w-3 h-3 text-emerald-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 space-y-3.5 text-xs">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[94%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/80 dark:border-slate-700/80 shadow-xs'
                  }`}
                >
                  {msg.content}
                </div>

                {/* Message Action Footer */}
                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <>
                      <button
                        onClick={() => handleCopyText(msg.id, msg.content)}
                        className="hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-0.5 ml-1 transition"
                        title="Copy explanation"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleToggleSpeech(msg.content)}
                        className={`hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-0.5 transition ${
                          isSpeaking ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
                        }`}
                        title="Listen with AI Persona voice"
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3 h-3 text-indigo-500 animate-pulse" />
                            <span>Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-indigo-500" />
                            <span>Read Aloud</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2.5 p-3.5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 w-fit text-xs border border-slate-200 dark:border-slate-700 animate-pulse">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
              <span>EduPulse Guru is analyzing NCERT concepts & board rubrics...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 1-Tap Quick Concept Pills */}
        <div className="px-3 py-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-50/50 dark:bg-slate-900/50">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            Quick Prompts:
          </span>
          {promptSuggestions.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => fetchDoubtExplanation(prompt)}
              disabled={loading}
              className="text-[10px] whitespace-nowrap px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition font-medium shrink-0 disabled:opacity-50 shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar Pre-filled with Current Question */}
        <form 
          onSubmit={handleSendMessage} 
          className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5"
        >
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>Pre-filled with current question concept:</span>
            <button
              type="button"
              onClick={handleResetPreFill}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
              title="Reset prompt to current question"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset to Question Prompt</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputDoubt}
              onChange={(e) => setInputDoubt(e.target.value)}
              placeholder="Ask any concept doubt about this question..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputDoubt.trim() || loading}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition active:scale-95"
              aria-label="Send Doubt Question"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
