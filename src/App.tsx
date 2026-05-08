import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SetupScreen from './components/SetupScreen';
import ChatInterface from './components/ChatInterface';
import ResultsScreen from './components/ResultsScreen';
import ErrorBoundary from './components/ErrorBoundary';
import type { InterviewConfig, Answer } from './types';
import './App.css';

type Phase = 'setup' | 'interview' | 'results';

function App() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    // Always dark mode for the premium experience
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  }, []);

  useEffect(() => {
    const stopSpeech = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
    window.addEventListener("beforeunload", stopSpeech);
    
    return () => {
      window.removeEventListener("beforeunload", stopSpeech);
      stopSpeech();
    };
  }, []);

  const startInterview = (config: InterviewConfig) => {
    setConfig(config);
    setPhase('interview');
  };

  const completeInterview = (finalAnswers: Answer[]) => {
    setAnswers(finalAnswers || []);
    setPhase('results');
  };

  const resetInterview = () => {
    setPhase('setup');
    setConfig(null);
    setAnswers([]);
  };

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-[#02040a] text-slate-300 font-sans selection:bg-emerald-500/20 overflow-x-hidden antialiased">
        {/* Cinematic Premium Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-aurora opacity-[0.25] animate-aurora"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/10 to-[#02040a]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.05)_0%,transparent_50%)]"></div>
        </div>

        {/* Minimal Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 px-10 py-10 flex justify-between items-center bg-transparent pointer-events-none">
          <div className="flex items-center gap-3 group cursor-default pointer-events-auto">
            <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105 duration-500">
              <span className="font-bold text-xl tracking-tighter">F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">ForcePilot<span className="text-emerald-500">.</span></span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 pt-40 pb-24 min-h-screen">
          <div className="container mx-auto px-12">
            {phase === 'setup' && (
              <SetupScreen onStart={startInterview} />
            )}

            {phase === 'interview' && config && (
              <ChatInterface config={config} onComplete={completeInterview} />
            )}

            {phase === 'results' && config && (
              <ResultsScreen answers={answers} role={config.role} onReset={resetInterview} />
            )}
            
            {(!['setup', 'interview', 'results'].includes(phase)) && (
               <div className="flex items-center justify-center min-h-[40vh] text-slate-500 text-xs font-medium">
                 Error: Invalid phase detected.
               </div>
            )}
          </div>
        </main>

        {/* Footer Signature */}
        <footer className="fixed bottom-0 left-0 right-0 z-50 px-12 py-10 bg-transparent flex justify-end items-center pointer-events-none">
          <div className="pointer-events-auto">
            <div className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500/50 transition-all duration-500">
              <span className="group-hover:text-slate-400 transition-colors duration-500">Engineered by</span>
              <div className="w-1 h-1 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400 transition-colors duration-500"></div>
              <span className="text-emerald-500/60 group-hover:text-emerald-400 tracking-[0.3em] transition-colors duration-500">Lalit Gattani</span>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
