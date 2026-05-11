import React, { useState } from 'react';
import {
  Play,
  GraduationCap,
  Code2,
  Rocket,
  ShieldCheck,
  UserCheck,
  HeartHandshake,
  Zap,
  History,
  BrainCircuit
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import HistoryIntelligence from './HistoryIntelligence';
import type { InterviewConfig, Role, Difficulty, InterviewerPersonality } from '../types';

interface InterviewHistoryRecord {
  id: string;
  role: string;
  score: number;
  created_at: string;
  verdict?: string;
  communicationScore?: number;
  confidenceScore?: number;
}

interface SetupScreenProps {
  onStart: (config: InterviewConfig) => void;
  onViewHistoryDetail: (record: InterviewHistoryRecord) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart, onViewHistoryDetail }) => {
  const { user } = useAuth();
  const [config, setConfig] = useState<InterviewConfig>({
    candidateName: 'Lalit',
    role: 'Salesforce Admin',
    difficulty: 'Fresher',
    personality: 'Professional',
    timeLimit: 60,
    voiceEnabled: true,
    speechSpeed: 1.0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config.candidateName.trim()) {
      onStart(config);
    }
  };

  const roles: Role[] = [
    'Professional Readiness',
    'Salesforce Admin',
    'Salesforce Apex Developer',
    'Salesforce LWC Developer'
  ];

  const difficulties: { val: Difficulty; label: string; icon: React.ElementType }[] = [
    { val: 'Fresher', label: 'Beginner', icon: GraduationCap },
    { val: 'Intermediate', label: 'Intermediate', icon: Code2 },
    { val: 'Advanced', label: 'Advanced', icon: Rocket },
  ];

  const personalities: { val: InterviewerPersonality; label: string; icon: React.ElementType }[] = [
    { val: 'Professional', label: 'Professional', icon: UserCheck },
    { val: 'Strict', label: 'Strict', icon: ShieldCheck },
    { val: 'Mentor', label: 'Mentor', icon: HeartHandshake },
  ];

  return (
    <div className="w-full lg:min-w-[1400px] max-w-[1600px] mx-auto py-4 sm:py-8 px-3 sm:px-5 lg:px-8 space-y-12 sm:space-y-24">
      
      {/* 1. PRIMARY FOCUS: HERO & ROLE SELECTION */}
      <section className="space-y-12 sm:space-y-20">
        <div className="text-center space-y-4 sm:space-y-8 reveal-1">
          <div className="hidden lg:flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-5 py-2 text-xs tracking-[0.25em] text-cyan-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              INTERVIEW INTELLIGENCE
            </div>
          </div>

          <h1 className="hero-title">
            The future of <br className="hidden sm:block" /> <span className="text-emerald-500 italic">Salesforce</span> mastery.
          </h1>
          
          <p className="sub-title mx-auto text-slate-400 max-w-xl">
            ForcePilot is an elite technical simulator for SFDC architects. 
            Bridge the gap between theory and enterprise-scale execution with AI-driven insights.
          </p>

          {!user && (
            <div className="pt-4 sm:pt-6">
               <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Zap size={12} className="text-cyan-400" />
                  Sign in to track your career evolution
               </div>
            </div>
          )}
        </div>

        <div className="premium-glass rounded-[2rem] sm:rounded-[3rem] p-1 shadow-2xl reveal-2 max-w-5xl mx-auto">
          <div className="bg-slate-950/40 rounded-[1.9rem] sm:rounded-[2.9rem] p-6 sm:p-10 md:p-16 space-y-4 sm:space-y-12 border border-white/[0.02]">
            
            {/* Top: Identity & Track */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-12">
              
              {/* Identity */}
              <div className="md:col-span-4 space-y-4 md:max-w-xs">
                <h3 className="meta-label">Identity</h3>
                <input
                  type="text"
                  required
                  placeholder="Candidate Name"
                  value={config.candidateName}
                  onChange={(e) => setConfig({ ...config, candidateName: e.target.value })}
                  className="input-glass w-full"
                />
              </div>

              {/* Track */}
              <div className="md:col-span-8 space-y-4">
                <h3 className="meta-label text-center">Interview Track</h3>
                
                <div className="block sm:hidden">
                  <select
                    value={config.role}
                    onChange={(e) => setConfig({ ...config, role: e.target.value as Role })}
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role} className="bg-slate-900">{role}</option>
                    ))}
                  </select>
                </div>

                <div className="hidden sm:grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setConfig({ ...config, role })}
                      className={`card-selector px-5 py-4 text-left flex items-center justify-between group ${config.role === role ? 'active' : 'inactive'}`}
                    >
                      <span className="text-xs font-bold tracking-tight">{role}</span>
                      {config.role === role ? <Zap size={14} className="text-emerald-400" /> : <Play size={10} className="text-slate-700 opacity-0 group-hover:opacity-100" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle: Neural Configuration Center */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:pt-4">
              
              {/* Complexity */}
              <div className="premium-card rounded-2xl p-6 border border-white/5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400"><BrainCircuit size={16} /></div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Readiness</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {difficulties.map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setConfig({ ...config, difficulty: val })}
                      className={`py-2.5 px-1 rounded-lg text-[8.5px] font-black uppercase tracking-tight transition-all ${config.difficulty === val ? 'bg-white text-slate-950 shadow-lg' : 'bg-white/5 text-slate-600 hover:text-white'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Neural Tone */}
              <div className="premium-card rounded-2xl p-6 border border-white/5 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400"><ShieldCheck size={16} /></div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Persona</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {personalities.map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setConfig({ ...config, personality: val })}
                      className={`py-2.5 px-1 rounded-lg text-[8.5px] font-black uppercase tracking-tight transition-all ${config.personality === val ? 'bg-white text-slate-950 shadow-lg' : 'bg-white/5 text-slate-600 hover:text-white'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* System Intelligence */}
              <div className="premium-card rounded-2xl p-6 border border-white/5 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400"><Zap size={16} /></div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Audio</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setConfig({...config, voiceEnabled: !config.voiceEnabled})}
                    className={`w-9 h-4.5 rounded-full relative transition-all ${config.voiceEnabled ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-slate-900 border border-white/10'}`}
                  >
                    <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all ${config.voiceEnabled ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-bold text-slate-600 tracking-widest uppercase">
                    <span>Transmission</span>
                    <span className="text-emerald-500">{config.speechSpeed}x</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="1.5" step="0.1" 
                    value={config.speechSpeed} 
                    onChange={(e) => setConfig({...config, speechSpeed: parseFloat(e.target.value)})}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

            </div>

            {/* Bottom: Action */}
            <div className="pt-8 border-t border-white/[0.05] flex justify-center md:justify-end">
              <button 
                onClick={handleSubmit}
                className="cta-button group flex items-center gap-4 sm:gap-6 px-10 sm:px-16 py-4 sm:py-6"
              >
                <span className="text-sm sm:text-base uppercase tracking-widest">Initialize Interview</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-900 flex items-center justify-center transition-transform group-hover:translate-x-2">
                  <Play size={10} className="fill-white ml-0.5 sm:size-[12px]" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PERFORMANCE HISTORY SECTION */}
      {user && (
        <section className="pt-12 sm:pt-24 border-t border-white/[0.05] reveal-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-500">
                <History size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Personal Archives</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white">Performance Intelligence</h2>
              <p className="text-sm text-slate-500 max-w-lg">Your historical session data synthesized into actionable career growth metrics.</p>
            </div>
            <HistoryIntelligence onViewDetail={onViewHistoryDetail} />
          </div>
        </section>
      )}

    </div>
  );
};

export default SetupScreen;
