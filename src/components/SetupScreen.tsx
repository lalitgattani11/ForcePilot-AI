import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Play,
  GraduationCap,
  Code2,
  Rocket,
  ShieldCheck,
  UserCheck,
  HeartHandshake,
  Zap,
  BrainCircuit,
  Terminal,
  Layers,
  ShieldAlert,
  ArrowRight,
  Settings,
  Workflow,
  Search,
  ChevronDown,
  LineChart,
  CheckCircle2,
  Mic,
  Gauge,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const HistoryIntelligence = React.lazy(() => import("./HistoryIntelligence"));

import type {
  InterviewConfig,
  Role,
  Difficulty,
  InterviewerPersonality,
} from "../types";

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

const SetupScreen: React.FC<SetupScreenProps> = ({
  onStart,
  onViewHistoryDetail,
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const roles = useMemo<Role[]>(
    () => [
      "Professional Readiness",
      "Salesforce Admin",
      "Salesforce Apex Developer",
      "Salesforce LWC Developer",
    ],
    []
  );

  const [config, setConfig] = useState<InterviewConfig>({
    candidateName: "Lalit",
    role: "Salesforce Admin",
    difficulty: "Fresher",
    personality: "Professional",
    timeLimit: 60,
    voiceEnabled: true,
    speechSpeed: 1.0,
  });

  // Context-aware pre-selection
  useEffect(() => {
    if (location.state?.role) {
      const targetRole = location.state.role as Role;
      if (roles.includes(targetRole)) {
        setConfig(prev => ({ ...prev, role: targetRole }));
      }
    }
  }, [location.state, roles]);



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config.candidateName.trim()) {
      onStart(config);
    }
  };

  const difficulties: {
    val: Difficulty;
    label: string;
    icon: React.ElementType;
  }[] = [
    { val: "Fresher", label: "Beginner", icon: GraduationCap },
    { val: "Intermediate", label: "Intermediate", icon: Code2 },
    { val: "Advanced", label: "Advanced", icon: Rocket },
  ];

  const personalities: {
    val: InterviewerPersonality;
    label: string;
    icon: React.ElementType;
  }[] = [
    { val: "Professional", label: "Professional", icon: UserCheck },
    { val: "Strict", label: "Strict", icon: ShieldCheck },
    { val: "Mentor", label: "Mentor", icon: HeartHandshake },
  ];

  return (
    <div className="flex flex-col w-full max-w-[1600px] mx-auto pt-0 pb-6 sm:py-8 px-4 sm:px-5 lg:px-8 gap-4 sm:gap-24 lg:gap-32">
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center pt-8 pb-10 sm:pt-12 sm:pb-16 overflow-visible w-full">
        {/* Ambient background blur behind hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-transparent blur-[140px] pointer-events-none -z-10 animate-pulse-neural"></div>

        <div className="text-center space-y-6 md:space-y-8 max-w-4xl lg:max-w-6xl mx-auto overflow-visible px-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex justify-center mb-2 will-change-transform"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-6 py-2 text-xs tracking-[0.3em] text-cyan-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              INTERVIEW INTELLIGENCE
            </div>
          </motion.div>

          <h1 className="hero-title px-2 sm:px-0 overflow-visible will-change-[opacity,transform]">
            The future of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] italic overflow-visible pr-[0.1em] -mr-[0.1em] sm:pr-[0.05em] sm:-mr-[0.05em]">Salesforce</span> mastery.
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="sub-title mx-auto px-4 sm:px-6 max-w-xl sm:max-w-2xl lg:max-w-3xl will-change-opacity text-slate-300"
          >
            Master Salesforce technical interviews with real-time AI mock sessions, 
            interactive coding evaluations, and recruiter-grade feedback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-md mx-auto"
          >
            <button
              onClick={() => document.getElementById('setup')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-button group flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <span>Start Mock Interview</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById('platform-preview')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 rounded-xl md:rounded-2xl font-bold text-sm text-slate-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 backdrop-blur-md flex items-center gap-3 justify-center group"
            >
              <span>Explore Platform</span>
              <ChevronDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </motion.div>

          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-2"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Zap size={12} className="text-cyan-400 animate-pulse" />
                Sign in to track your career evolution
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 1.5. PREMIUM PRODUCT SHOWCASE */}
      <section className="relative w-full overflow-visible py-4">
        {/* Soft edge illumination & radial glow behind showcase */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-[400px] bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-6xl mx-auto px-4"
        >
          <div className="premium-glass rounded-[2rem] border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden bg-slate-950/60 backdrop-blur-2xl relative group">
            {/* Soft inner glow and top border accent */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none"></div>

            {/* Mock Console Window Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-slate-950/40">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  AI Salesforce Interview Intelligence
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.05] bg-white/[0.02] px-3 py-1 text-[9px] font-bold text-slate-400">
                  <span>Target: Salesforce Architect</span>
                </div>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
              {/* LEFT COLUMN: SETUP & ACTIVE QUESTION (4 Cols) */}
              <div className="lg:col-span-4 space-y-4">
                {/* Setup Config Card */}
                <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl relative overflow-hidden group/card">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/[0.02] blur-xl rounded-full"></div>
                  <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-3 flex items-center gap-1.5">
                    <Settings size={10} className="text-cyan-400" />
                    Simulation Config
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Target Track:</span>
                      <span className="font-bold text-white bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px]">Apex Developer</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Readiness:</span>
                      <span className="font-bold text-white bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px]">Advanced</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Interviewer Tone:</span>
                      <span className="font-bold text-white bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded text-[10px]">Strict Architect</span>
                    </div>
                  </div>
                </div>

                {/* Active Question Card */}
                <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-3">
                  <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-1.5">
                    <Terminal size={10} className="text-cyan-400" />
                    Active Scenario
                  </h4>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.03] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/5 border border-emerald-500/10 px-1.5 py-0.5 rounded">Apex Trigger</span>
                      <span className="text-[9px] font-bold text-slate-500">Freq: 94%</span>
                    </div>
                    <p className="text-xs text-white font-medium leading-relaxed">
                      "How would you prevent recursion in a Salesforce trigger while maintaining transaction-safe bulk execution?"
                    </p>
                  </div>
                </div>
              </div>

              {/* MIDDLE COLUMN: LIVE CONVERSATION & TRANSCRIPTION (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Transcription & Audio Card */}
                <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl h-full flex flex-col justify-between min-h-[260px] relative">
                  <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-3 flex items-center gap-1.5">
                    <BrainCircuit size={10} className="text-cyan-400" />
                    Voice Intelligence
                  </h4>

                  {/* Chat bubble simulations */}
                  <div className="space-y-4 my-auto w-full">
                    {/* Mobile Viewports (< lg) */}
                    <div className="space-y-4 lg:hidden">
                      {/* AI speech bubble */}
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider ml-1">AI</span>
                        <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-2xl rounded-tl-none max-w-[88%] w-fit">
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            Excellent. Let's talk about execution state. Explain your strategy to guard against recursive trigger contexts.
                          </p>
                        </div>
                      </div>

                      {/* Candidate transcript */}
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider mr-1">ME</span>
                        <div className="bg-cyan-500/5 border border-cyan-500/10 p-3 rounded-2xl rounded-tr-none max-w-[88%] w-fit">
                          <p className="text-[11px] text-white leading-relaxed">
                            "I use a static helper class with a Set of record IDs. By verifying if an ID exists in the set before running logic, we ensure bulk updates run once..."
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Viewports (>= lg) */}
                    <div className="hidden lg:flex flex-col gap-4">
                      {/* AI speech bubble */}
                      <div className="flex gap-2">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                          <span className="text-[8px] font-bold text-cyan-400">AI</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-2xl rounded-tl-none max-w-[85%]">
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            Excellent. Let's talk about execution state. Explain your strategy to guard against recursive trigger contexts.
                          </p>
                        </div>
                      </div>

                      {/* Candidate transcript */}
                      <div className="flex gap-2 justify-end">
                        <div className="bg-cyan-500/5 border border-cyan-500/10 p-3 rounded-2xl rounded-tr-none max-w-[85%]">
                          <p className="text-[11px] text-white leading-relaxed">
                            "I use a static helper class with a Set of record IDs. By verifying if an ID exists in the set before running logic, we ensure bulk updates run once..."
                          </p>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <span className="text-[8px] font-bold text-emerald-400">ME</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Voice Waveform Indicator */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04] mt-2">
                    <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest shrink-0 animate-pulse">Streaming Audio</span>
                    <div className="flex items-end gap-1 h-6 flex-1 justify-center">
                      {[0.4, 0.9, 0.6, 0.3, 0.8, 0.5, 0.9, 0.7, 0.4, 0.8, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4].map((h, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [`${h * 100}%`, `${(1 - h) * 100 + 10}%`, `${h * 100}%`] }}
                          transition={{ duration: 1.5 + (i % 3) * 0.3, repeat: Infinity, ease: "easeInOut" }}
                          className="w-1 bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-full"
                          style={{ height: `${h * 100}%` }}
                        ></motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: SCORING & FEEDBACK (3 Cols) */}
              <div className="lg:col-span-3 space-y-4">
                {/* Score Ring Card */}
                <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl text-center space-y-4 relative overflow-hidden group/score">
                  <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest text-left flex items-center gap-1.5">
                    <LineChart size={10} className="text-cyan-400" />
                    Performance Forensics
                  </h4>

                  {/* Circular Chart */}
                  <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                    <svg viewBox="0 0 112 112" className="w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="46" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                      <circle
                        cx="56"
                        cy="56"
                        r="46"
                        stroke="url(#gradient-showcase)"
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray="289"
                        strokeDashoffset="35"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                      />
                      <defs>
                        <linearGradient id="gradient-showcase" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black text-white tracking-tight">88</span>
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Score / 100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-left pt-2">
                    <div className="bg-slate-950/40 p-2 rounded-lg border border-white/[0.03]">
                      <span className="text-[8px] font-bold text-slate-500 uppercase">Technical</span>
                      <div className="text-xs font-bold text-cyan-300">92 / 100</div>
                    </div>
                    <div className="bg-slate-950/40 p-2 rounded-lg border border-white/[0.03]">
                      <span className="text-[8px] font-bold text-slate-500 uppercase">Delivery</span>
                      <div className="text-xs font-bold text-emerald-300">84 / 100</div>
                    </div>
                  </div>
                </div>

                {/* Recruiter Evaluation Card */}
                <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-3">
                  <h4 className="text-[9px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-1.5">
                    <UserCheck size={10} className="text-cyan-400" />
                    Recruiter Digest
                  </h4>
                  <div className="space-y-2 text-left">
                    <div className="flex gap-1.5 items-start">
                      <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-slate-300 leading-normal">
                        Uses static sets for recursion control. Good bulk handling awareness.
                      </p>
                    </div>
                    <div className="flex gap-1.5 items-start">
                      <CheckCircle2 size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-slate-300 leading-normal">
                        Verbal response matches architectural guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. TRUST / SOCIAL PROOF SECTION */}
      <section className="w-full py-12 border-y border-white/[0.05] relative overflow-hidden bg-slate-950/20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <motion.div
              whileHover={{ y: -4 }}
              className="premium-glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-500 relative group overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 flex items-baseline gap-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">500+</span>
                <span className="text-cyan-400 text-sm font-bold">Questions</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Salesforce Focused</div>
              <p className="text-xs text-slate-400 leading-relaxed">Curated questions covering Apex triggers, components, frameworks, and architecture patterns.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="premium-glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-500 relative group overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 flex items-baseline gap-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">3</span>
                <span className="text-emerald-400 text-sm font-bold">Specialized Tracks</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Role-Focused Interview Preparation</div>
              <p className="text-xs text-slate-400 leading-relaxed">Master Salesforce Admin, Apex Developer, and LWC Developer interviews with dedicated AI-powered mock interview simulations.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="premium-glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-violet-500/30 transition-all duration-500 relative group overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all duration-500"></div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 flex items-baseline gap-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">AI</span>
                <span className="text-violet-400 text-sm font-bold">Evaluation</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Recruiter-Grade</div>
              <p className="text-xs text-slate-400 leading-relaxed">Granular breakdowns of technical accuracy, response structure, and delivery style in real-time.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="premium-glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-500 relative group overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500"></div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 flex items-baseline gap-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Expert</span>
                <span className="text-cyan-400 text-sm font-bold">Feedback</span>
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Real Preparation</div>
              <p className="text-xs text-slate-400 leading-relaxed">Personalized summaries highlighting architectural strengths and immediate opportunities for growth.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2.5 PLATFORM PREVIEW SECTION */}
      <section 
        id="platform-preview" 
        className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 border-t border-white/[0.05] space-y-[60px] sm:space-y-36 scroll-mt-20 sm:scroll-mt-28"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1500px' }}
      >
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-neural"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse-neural" style={{ animationDelay: '3s' }}></div>
 
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">
            <Sparkles size={10} />
            Experience ForcePilot
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Designed for Salesforce <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Engineering Leaders.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A highly optimized, intelligence-backed suite created to prep you for senior, lead, and architectural Salesforce interviews.
          </p>
        </div>
 
        {/* Alternate Feature Grid */}
        <div className="space-y-[60px] sm:space-y-32">
          {/* Feature 1: Setup - Text Left, UI Right */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-6 text-left"
            >
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">01 / TAILORED PREPARATION</div>
              <h3 className="text-[22px] sm:text-3xl font-black text-white tracking-tight leading-tight">
                <span className="lg:hidden">Simulate Exact <br className="block sm:hidden" /> Organizational Environments</span>
                <span className="hidden lg:inline">Simulate exact organizational environments.</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Define the rules of engagement. Select your specialization track, set appropriate difficulty thresholds, and calibrate the interviewer's personality profile. Build conversational confidence under simulated settings ranging from mentoring review boards to high-stress executive interviews.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Configurable Personas</span>
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Custom Time Limits</span>
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Role Specialization</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="premium-glass p-1 rounded-3xl border border-white/[0.08] shadow-2xl relative overflow-hidden bg-slate-950/40">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
                <div className="p-6 space-y-4">
                  {/* Mock Setup Console UI */}
                  <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Settings size={12} className="text-cyan-400" />
                      Session Setup Preview
                    </span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  </div>
                  
                  <div className="space-y-3 text-left">
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Select Role Track</span>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="bg-white/5 border border-cyan-500/30 text-white p-3 rounded-xl text-[11px] font-bold flex items-center justify-between">
                          <span>Apex Developer</span>
                          <Zap size={10} className="text-cyan-400" />
                        </div>
                        <div className="bg-white/[0.01] border border-white/[0.05] text-slate-500 p-3 rounded-xl text-[11px] font-bold">
                          <span>LWC Developer</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Interviewer Personality</span>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <div className="bg-white/[0.01] border border-white/[0.05] text-slate-500 p-2 rounded-lg text-[10px] text-center">Mentor</div>
                        <div className="bg-white/5 border border-cyan-500/30 text-white p-2 rounded-lg text-[10px] text-center font-bold">Strict Architect</div>
                        <div className="bg-white/[0.01] border border-white/[0.05] text-slate-500 p-2 rounded-lg text-[10px] text-center">Professional</div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                        Configure Simulation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 2: Voice/AI - UI Left, Text Right */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 max-w-6xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-6 text-left"
            >
              <div className="text-emerald-400 font-bold uppercase tracking-wider text-xs">02 / LIVE AI CONVERSATION</div>
              <h3 className="text-[22px] sm:text-3xl font-black text-white tracking-tight leading-tight">
                <span className="lg:hidden">Engage in Natural, <br className="block sm:hidden" /> Technical Dialogue</span>
                <span className="hidden lg:inline">Engage in natural, technical dialogue.</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Put down the keyboard. Experience vocal or text-based mock sessions where our AI responds dynamically to your verbal code explanations. Test your understanding of concurrency, transactional safety, trigger framework patterns, and Salesforce governor constraints in a fluid interview flow.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Natural Language Parsing</span>
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Real-Time Transcription</span>
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Adaptive Dialogue Flow</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="premium-glass p-1 rounded-3xl border border-white/[0.08] shadow-2xl relative overflow-hidden bg-slate-950/40">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Mic size={12} className="text-emerald-400" />
                      Live Audio Stream
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-[9px] font-bold text-emerald-400 tracking-wider">LISTENING</span>
                    </span>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-xl max-w-[90%]">
                      <p className="text-[10px] text-slate-400">
                        Explain when you would choose an asynchronous queueable process over a future method.
                      </p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl max-w-[90%] ml-auto">
                      <p className="text-[10px] text-white">
                        "Queueables support complex object types, can be chained together sequentially, and return a job ID for status tracking..."
                      </p>
                    </div>
                    
                    {/* Simulated Waveform */}
                    <div className="flex items-end gap-1 h-8 justify-center pt-2">
                      {[0.3, 0.7, 0.4, 0.8, 0.5, 0.9, 0.6, 0.3, 0.8, 0.4, 0.7, 0.5, 0.9, 0.3].map((h, i) => (
                        <div 
                          key={i} 
                          className="w-1 bg-emerald-500/60 rounded-full" 
                          style={{ height: `${h * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 3: Analysis - Text Left, UI Right */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-6 text-left"
            >
              <div className="text-violet-400 font-bold uppercase tracking-wider text-xs">03 / PERFORMANCE FORENSICS</div>
              <h3 className="text-[22px] sm:text-3xl font-black text-white tracking-tight leading-tight">
                <span className="lg:hidden">Review Multi-Dimensional <br className="block sm:hidden" /> Performance Analysis</span>
                <span className="hidden lg:inline">Review multi-dimensional performance analysis.</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No more guessing. Receive instantaneous visual analytics broken down across multiple core dimensions: Technical Depth, Communication Delivery, and Structural Confidence. Trace your progression over time to prepare for high-level certification panels.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Dimensional Scoring</span>
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Confidence Diagnostics</span>
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Historical Benchmarks</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="premium-glass p-1 rounded-3xl border border-white/[0.08] shadow-2xl relative overflow-hidden bg-slate-950/40">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"></div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Gauge size={12} className="text-violet-400" />
                      Session Diagnostics
                    </span>
                    <span className="text-xs font-bold text-violet-400">92 / 100</span>
                  </div>

                  <div className="space-y-3 text-left">
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase mb-1">
                        <span>Technical Accuracy</span>
                        <span className="text-white">94%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase mb-1">
                        <span>Communication Flow</span>
                        <span className="text-white">88%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-400 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase mb-1">
                        <span>Architectural Confidence</span>
                        <span className="text-white">90%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 4: Feedback - UI Left, Text Right */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 max-w-6xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-6 text-left"
            >
              <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">04 / RECRUITER REVIEWS</div>
              <h3 className="text-[22px] sm:text-3xl font-black text-white tracking-tight leading-tight">
                <span className="lg:hidden">Receive Expert <br className="block sm:hidden" /> Recruiter Evaluation</span>
                <span className="hidden lg:inline">Receive expert recruiter evaluation.</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Bridge the gap between raw code and hiring decisions. ForcePilot compiles detailed summaries highlighting key strengths and outlining critical areas of improvement. Get structured recommendations tailored exactly to what enterprise technical architects look for.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Actionable Bullet Points</span>
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Refactoring Suggestions</span>
                <span className="bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">Architect-Level Rubrics</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="premium-glass p-1 rounded-3xl border border-white/[0.08] shadow-2xl relative overflow-hidden bg-slate-950/40">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <UserCheck size={12} className="text-cyan-400" />
                      Hiring Verdict
                    </span>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-widest">
                      RECOMMEND HIRE
                    </span>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Strengths Identified</span>
                      <div className="bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-lg">
                        <p className="text-[10px] text-slate-300">
                          • Demonstrated clear understanding of platform limits and bulk trigger handler architectures.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Opportunity Area</span>
                      <div className="bg-yellow-500/5 border border-yellow-500/10 p-2.5 rounded-lg">
                        <p className="text-[10px] text-slate-300">
                          • Enhance verbal structure when discussing transactional governor limits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SETUP SECTION */}
      {/* 2. INTERVIEW CONFIGURATION LAYER */}
      <section 
        id="setup" 
        className="scroll-mt-20 sm:scroll-mt-28 min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-7rem)] flex items-center justify-center w-full py-12 sm:py-16 relative overflow-hidden"
      >
        {/* Ambient background blur behind setup */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-neural"></div>

        <motion.div 
          className="premium-glass rounded-[2rem] sm:rounded-[3rem] p-1 shadow-2xl w-full mx-auto relative z-10"
          initial={location.hash === "#setup" ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={location.hash === "#setup" ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
        >
        <div className="bg-slate-950/40 rounded-[1.9rem] sm:rounded-[2.9rem] p-6 sm:p-10 md:p-16 space-y-4 sm:space-y-12 border border-white/[0.02]">
          {/* Top: Identity & Track Intelligence Unit */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* Left Column: Identity Control */}
            <div className="w-full lg:w-80 shrink-0 space-y-3">
              <h2 className="meta-label">Identity</h2>
              <label htmlFor="candidateName" className="sr-only">Candidate Name</label>
              <input
                id="candidateName"
                type="text"
                required
                placeholder="Candidate Name"
                value={config.candidateName}
                onChange={(e) =>
                  setConfig({ ...config, candidateName: e.target.value })
                }
                className="card-selector active w-full px-5 py-4 text-xs font-bold tracking-tight bg-transparent focus:outline-none"
              />
            </div>

            {/* Right Column: Track Intelligence Grid */}
            <div className="flex-1 w-full space-y-3">
              <h2 className="meta-label">Interview Track</h2>

              <div className="block sm:hidden">
                <label htmlFor="roleSelect" className="sr-only">Select interview role</label>
                <select
                  id="roleSelect"
                  value={config.role}
                  onChange={(e) =>
                    setConfig({ ...config, role: e.target.value as Role })
                  }
                  className="w-full h-14 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                >
                  {roles.map((role) => (
                    <option key={role} value={role} className="bg-slate-900">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden sm:grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setConfig({ ...config, role })}
                    className={`card-selector px-5 py-4 text-left flex items-center justify-between group ${config.role === role ? "active" : "inactive"}`}
                  >
                    <span className="text-xs font-bold tracking-tight">
                      {role}
                    </span>
                    {config.role === role ? (
                      <Zap size={14} className="text-emerald-400" />
                    ) : (
                      <Play
                        size={10}
                        className="text-slate-700 opacity-0 group-hover:opacity-100"
                      />
                    )}
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
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <BrainCircuit size={16} />
                </div>
                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Readiness
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {difficulties.map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setConfig({ ...config, difficulty: val })}
                    className={`py-2.5 px-1 rounded-lg text-[8.5px] font-black uppercase tracking-tight transition-all ${config.difficulty === val ? "bg-white text-slate-950 shadow-lg" : "bg-white/5 text-slate-400 hover:text-white"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Neural Tone */}
            <div className="premium-card rounded-2xl p-6 border border-white/5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                  <ShieldCheck size={16} />
                </div>
                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Persona
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {personalities.map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setConfig({ ...config, personality: val })}
                    className={`py-2.5 px-1 rounded-lg text-[8.5px] font-black uppercase tracking-tight transition-all ${config.personality === val ? "bg-white text-slate-950 shadow-lg" : "bg-white/5 text-slate-400 hover:text-white"}`}
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
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Zap size={16} />
                  </div>
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Audio
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setConfig({
                      ...config,
                      voiceEnabled: !config.voiceEnabled,
                    })
                  }
                  aria-label={config.voiceEnabled ? "Disable voice audio" : "Enable voice audio"}
                  className={`w-9 h-4.5 rounded-full relative transition-all ${config.voiceEnabled ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-slate-900 border border-white/10"}`}
                >
                  <div
                    className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all ${config.voiceEnabled ? "right-0.5" : "left-0.5"}`}
                  />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                  <span>Transmission</span>
                  <span className="text-emerald-500">
                    {config.speechSpeed}x
                  </span>
                </div>
                <label htmlFor="speedControl" className="sr-only">Speech transmission speed</label>
                <input
                  id="speedControl"
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={config.speechSpeed}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      speechSpeed: parseFloat(e.target.value),
                    })
                  }
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.05] flex justify-center md:justify-end">
            <button
              onClick={handleSubmit}
              className="cta-button group flex items-center gap-4 sm:gap-6 px-8 sm:px-16 py-4 sm:py-6"
            >
              <span className="text-sm sm:text-base uppercase tracking-widest">
                Initialize Interview
              </span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-900 flex items-center justify-center transition-transform group-hover:translate-x-2">
                <Play
                  size={10}
                  className="fill-white ml-0.5 sm:size-[12px]"
                />
              </div>
            </button>
          </div>
        </div>
        </motion.div>
      </section>

      {/* 3. PERFORMANCE HISTORY SECTION */}
      {user && (
        <section
          id="analytics"
          className="relative border-t border-white/[0.05] w-full"
          style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}
        >
          <React.Suspense fallback={<div className="h-40 w-full animate-pulse bg-white/5 rounded-3xl" />}>
            <HistoryIntelligence onViewDetail={onViewHistoryDetail} />
          </React.Suspense>
        </section>
      )}

      {/* 4. TECHNICAL RESOURCES / SEO SECTION */}
      <section 
        className="relative mt-4 sm:mt-6 pt-6 border-t border-white/10 space-y-8 pb-12"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}
      >
        <div className="flex flex-col md:flex-row items-center sm:items-end justify-between gap-6 border-b border-white/5 pb-6">
          <div className="space-y-2 text-center sm:text-left overflow-visible">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pb-1 sm:pb-0 overflow-visible">
              Technical <span className="text-emerald-400">Intelligence.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto sm:mx-0">
              Master the technical nuances of the Salesforce platform with our
              deep-dive interview guides.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {[
            {
              title: "Mock Interview",
              desc: "Practice recruiter-grade technical simulations for all SFDC roles.",
              link: "/salesforce-mock-interview",
              icon: Rocket,
              color: "emerald",
            },
            {
              title: "Admin Interview",
              desc: "Master Security, Sharing, and User Management configurations.",
              link: "/salesforce-admin-interview",
              icon: Settings,
              color: "emerald",
            },
            {
              title: "Flow Interview",
              desc: "Master before-save logic and enterprise flow architecture.",
              link: "/salesforce-flow-interview-questions",
              icon: Workflow,
              color: "cyan",
            },
            {
              title: "Apex Triggers",
              desc: "Deep-dive into bulkification and recursion control patterns.",
              link: "/apex-trigger-interview-questions",
              icon: Terminal,
              color: "blue",
            },
            {
              title: "Apex Questions",
              desc: "From bulkification to trigger patterns and transaction control.",
              link: "/apex-interview-questions",
              icon: Code2,
              color: "cyan",
            },
            {
              title: "LWC Coding",
              desc: "Reactive rendering, shadow DOM, and component architecture.",
              link: "/lwc-coding-interview",
              icon: Layers,
              color: "violet",
            },
            {
              title: "Scenario Based",
              desc: "Solve real production issues and architect thinking puzzles.",
              link: "/scenario-based-salesforce-interview",
              icon: Search,
              color: "rose",
            },
            {
              title: "Governor Limits",
              desc: "Deep-dive into multi-tenant constraints and architectural safety.",
              link: "/governor-limits-explained",
              icon: ShieldAlert,
              color: "rose",
            },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden"
            >
              <div
                className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-${item.color}-500/10 text-${item.color}-400 group-hover:scale-110 transition-transform duration-500`}
              >
                <item.icon size={24} />
              </div>

              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                {item.title}
                <ArrowRight
                  size={16}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                />
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Decorative Gradient Overlay */}
              <div
                className={`absolute -right-12 -bottom-12 h-32 w-32 bg-${item.color}-500/5 blur-[60px] rounded-full group-hover:bg-${item.color}-500/10 transition-colors duration-500`}
              ></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SetupScreen;
