import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { login } = useApp();
  const [authStep, setAuthStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState<string>('9876543210');
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthStep('otp');
      setOtp('1234'); // Auto-suggest demo OTP
    }, 600);
  };

  const handleVerifyOtp = () => {
    if (otp !== '1234' && otp.length !== 4) {
      setError('Please enter the 4-digit OTP (hint: use 1234)');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(phone);
    }, 500);
  };

  const handleQuickDemoLogin = () => {
    login('9876543210', 'Arjun Sharma');
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 py-8 overflow-y-auto max-w-sm mx-auto w-full">
      {/* Brand Icon & Heading */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 mb-4 animate-bounce">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          EduPulse Class 10
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          CBSE & State Board Smart Learning Platform
        </p>
      </div>

      {/* Step 1: Phone input */}
      {authStep === 'phone' ? (
        <div className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Mobile Number
            </label>
            <div className="flex rounded-2xl border border-slate-300 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
              <span className="flex items-center px-3.5 text-slate-500 dark:text-slate-400 font-semibold text-sm border-r border-slate-200 dark:border-slate-800">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter 10-digit number"
                className="w-full bg-transparent py-3 px-3 text-sm focus:outline-none text-slate-900 dark:text-white font-mono"
              />
            </div>
            {error && <p className="text-xs text-rose-500 mt-1.5 font-medium">{error}</p>}
          </div>

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center text-xs gap-2"
          >
            {loading ? (
              <span>Sending OTP...</span>
            ) : (
              <>
                <span>Get OTP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            <span className="shrink-0 mx-2 text-[10px] text-slate-400 font-semibold uppercase">Or Instant Access</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          </div>

          <button
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Continue as Arjun Sharma (Demo)</span>
          </button>
        </div>
      ) : (
        /* Step 2: OTP verification */
        <div className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-center">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Enter 4-digit code sent to <strong className="text-slate-900 dark:text-white">+91 {phone}</strong>
            </p>
            <button
              onClick={() => { setAuthStep('phone'); setOtp(''); }}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline mt-1"
            >
              Change Mobile Number
            </button>
          </div>

          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
              placeholder="1234"
              className="w-full text-center tracking-widest text-2xl font-extrabold bg-slate-50 dark:bg-slate-900 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
            />
            <p className="text-[11px] text-slate-400 text-center mt-1.5">
              Hint: Demo OTP is <strong className="text-indigo-600 dark:text-indigo-400">1234</strong>
            </p>
            {error && <p className="text-xs text-rose-500 mt-1 text-center font-medium">{error}</p>}
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center text-xs gap-2"
          >
            {loading ? <span>Verifying...</span> : <span>Verify & Start Learning</span>}
          </button>
        </div>
      )}

      {/* Trust Marker */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>CBSE Class 10 Syllabus Aligned 2024-2025</span>
      </div>
    </div>
  );
};
