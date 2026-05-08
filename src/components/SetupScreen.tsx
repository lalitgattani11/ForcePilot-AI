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
  Brain
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
    <div className="max-w-4xl mx-auto py-12 md:py-24">
      {/* Premium Hero Identity */}
      <div className="text-center mb-24 space-y-8 reveal-1">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl mb-4 shadow-2xl">
          <Brain size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500/80">Interview Intelligence</span>
        </div>
        
        <h1 className="hero-title">
          The future of <span className="text-emerald-500 italic">Salesforce</span> mastery.
        </h1>
        
        <p className="sub-title mx-auto text-slate-400 max-w-xl">
          ForcePilot is an elite technical simulator for SFDC architects. 
          Bridge the gap between theory and enterprise-scale execution with AI-driven insights.
        </p>
      </div>

      {/* Elevated Focal Panel */}
      <div className="premium-glass rounded-[2.5rem] p-1 shadow-2xl reveal-2">
        <div className="bg-slate-950/40 rounded-[2.4rem] p-10 md:p-16 space-y-16 border border-white/[0.02]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Identity & Track */}
            <div className="space-y-12">
              <div className="space-y-6">
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

              <div className="space-y-8">
                <h3 className="meta-label">Interview Track</h3>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setConfig({ ...config, role })}
                      className={`card-selector px-8 py-5 text-left flex items-center justify-between group ${
                        config.role === role ? 'active' : 'inactive'
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-tight">{role}</span>
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
            <div className="space-y-12">
              <div className="space-y-8">
                <h3 className="meta-label">Complexity</h3>
                <div className="grid grid-cols-3 gap-3">
                  {difficulties.map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setConfig({ ...config, difficulty: val })}
                      className={`card-selector py-5 flex flex-col items-center gap-2 ${
                        config.difficulty === val ? 'active' : 'inactive'
                      }`}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="meta-label">Neural Tone</h3>
                <div className="bg-white/[0.02] p-1.5 rounded-2xl grid grid-cols-3 gap-1 border border-white/[0.05]">
                  {personalities.map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setConfig({ ...config, personality: val })}
                      className={`py-3 px-1 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-500 ${
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

              <div className="space-y-8">
                <div className="flex items-center justify-between px-1">
                  <h3 className="meta-label m-0">Voice Synthesis</h3>
                  <button 
                    type="button"
                    onClick={() => setConfig({...config, voiceEnabled: !config.voiceEnabled})}
                    className={`w-12 h-6 rounded-full relative transition-all duration-500 ${config.voiceEnabled ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-slate-900 border border-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-500 ${config.voiceEnabled ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
                
                <div className="bg-white/[0.02] p-8 rounded-3xl space-y-6 border border-white/[0.05] shadow-inner">
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 tracking-widest uppercase">
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
          <div className="pt-12 border-t border-white/[0.05] flex justify-center md:justify-end">
            <button 
              onClick={handleSubmit}
              className="cta-button group flex items-center gap-6 px-16 py-6"
            >
              <span className="text-base uppercase tracking-widest">Initialize Interview</span>
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center transition-transform group-hover:translate-x-2">
                <Play size={12} className="fill-white ml-0.5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
