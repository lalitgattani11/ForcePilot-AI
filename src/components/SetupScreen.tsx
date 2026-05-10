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
} from 'lucide-react';
import type { InterviewConfig, Role, Difficulty, InterviewerPersonality } from '../types';

interface SetupScreenProps {
  onStart: (config: InterviewConfig) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
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
    { val: 'Strict', label: 'Technical', icon: ShieldCheck },
    { val: 'Mentor', label: 'Mentor', icon: HeartHandshake },
  ];

  return (
    <div className="w-full lg:min-w-[1400px] max-w-[1600px] mx-auto py-4 sm:py-8 px-3 sm:px-5 lg:px-8">
      {/* Premium Hero Identity */}
      <div className="text-center mb-12 sm:mb-24 space-y-4 sm:space-y-8 reveal-1">
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
      </div>

      {/* Elevated Focal Panel */}
      <div className="premium-glass rounded-[2rem] sm:rounded-[2.5rem] p-0.5 sm:p-1 shadow-2xl reveal-2">
        <div className="bg-slate-950/40 rounded-[1.9rem] sm:rounded-[2.4rem] p-6 sm:p-10 md:p-16 space-y-6 sm:space-y-16 border border-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-16 lg:gap-24">
            
            {/* Left Column: Identity & Track */}
            <div className="space-y-4 sm:space-y-12">
              <div className="space-y-2 sm:space-y-6">
                <h3 className="meta-label">Registration</h3>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    placeholder="Candidate Name"
                    value={config.candidateName}
                    onChange={(e) => setConfig({ ...config, candidateName: e.target.value })}
                    className="input-glass w-full"
                  />
                </div>
              </div>

              <div className="space-y-4 sm:space-y-8">
                <h3 className="meta-label">Interview Track</h3>
                
                {/* Mobile Track Selector */}
                <div className="block sm:hidden">
                  <select
                    value={config.role}
                    onChange={(e) => setConfig({ ...config, role: e.target.value as Role })}
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white backdrop-blur-sm sm:backdrop-blur-xl focus:outline-none focus:border-emerald-500/50"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role} className="bg-slate-900">
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Desktop Track Selector */}
                <div className="hidden sm:grid grid-cols-1 gap-2 sm:gap-3">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setConfig({ ...config, role })}
                      className={`card-selector px-5 py-4 sm:px-8 sm:py-5 text-left flex items-center justify-between group ${
                        config.role === role ? 'active' : 'inactive'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold tracking-tight">{role}</span>
                      {config.role === role ? (
                        <Zap size={14} className="text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Play size={10} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Calibration */}
            <div className="space-y-4 sm:space-y-12 mt-1 sm:mt-0">
              <div className="space-y-4 sm:space-y-8">
                <h3 className="meta-label">Complexity</h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {difficulties.map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setConfig({ ...config, difficulty: val })}
                      className={`card-selector py-4 sm:py-5 flex flex-col items-center gap-2 ${
                        config.difficulty === val ? 'active' : 'inactive'
                      }`}
                    >
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-8">
                <h3 className="meta-label">Neural Tone</h3>
                <div className="bg-white/[0.02] p-1 sm:p-1.5 rounded-xl sm:rounded-2xl grid grid-cols-3 gap-1 border border-white/[0.05]">
                  {personalities.map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setConfig({ ...config, personality: val })}
                      className={`py-2.5 sm:py-3 px-1 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all duration-500 ${
                        config.personality === val 
                        ? 'bg-white text-slate-950 shadow-xl scale-[1.02]' 
                        : 'text-slate-600 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-8">
                <div className="flex items-center justify-between px-1">
                  <h3 className="meta-label m-0">Voice Synthesis</h3>
                  <button 
                    type="button"
                    onClick={() => setConfig({...config, voiceEnabled: !config.voiceEnabled})}
                    className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full relative transition-all duration-500 ${config.voiceEnabled ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-slate-900 border border-white/10'}`}
                  >
                    <div className={`absolute top-0.5 sm:top-1 w-4 h-4 rounded-full bg-white transition-all duration-500 ${config.voiceEnabled ? 'right-0.5 sm:right-1' : 'left-0.5 sm:left-1'}`} />
                  </button>
                </div>
                
                <div className="bg-white/[0.02] p-6 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6 border border-white/[0.05] shadow-inner">
                  <div className="flex justify-between text-[9px] sm:text-[10px] font-bold text-slate-600 tracking-widest uppercase">
                    <span>Transmission Speed</span>
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
          </div>

          {/* Final Action - Cinematic CTA */}
          <div className="pt-8 sm:pt-12 border-t border-white/[0.05] flex justify-center md:justify-end">
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
    </div>
  );
};

export default SetupScreen;
