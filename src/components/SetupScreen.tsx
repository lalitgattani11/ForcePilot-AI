import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import HistoryIntelligence from "./HistoryIntelligence";
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

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="flex flex-col w-full lg:min-w-[1400px] max-w-[1600px] mx-auto pt-0 pb-6 sm:py-8 px-4 sm:px-5 lg:px-8 gap-4 sm:gap-24 lg:gap-32">
      {/* 1. PRIMARY FOCUS: HERO & ROLE SELECTION */}
      <section className="relative flex flex-col justify-center min-h-0 pt-12 pb-16 lg:min-h-[78vh] lg:pt-0 lg:pb-0 overflow-visible">
        <div className="text-center space-y-3 md:space-y-8 xl:space-y-10 max-w-4xl lg:max-w-6xl xl:max-w-[90rem] mx-auto overflow-visible">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex justify-center mb-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-6 py-2 text-xs tracking-[0.3em] text-cyan-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              INTERVIEW INTELLIGENCE
            </div>
          </motion.div>

         <h1 className="hero-title px-4 overflow-visible">
            <span className="block">The future of</span>
            <span className="block">
              <span className="inline-block pr-2 lg:pr-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)] italic overflow-visible">
                Salesforce
              </span>{" "}
              mastery.
            </span>
         </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="sub-title mx-auto px-8 sm:px-6 max-w-[320px] sm:max-w-2xl lg:max-w-3xl"
          >
            Master Salesforce interviews with AI-powered mock sessions and
            real-world technical practice.
          </motion.p>

          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Zap size={12} className="text-cyan-400" />
                Sign in to track your career evolution
              </div>
            </motion.div>
          )}
        </div>

        {/* Ambient Depth Transition Glow */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent blur-sm"></div>

        {/* Scroll Continuation Indicator */}
        <AnimatePresence>
          {!hasScrolled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            >
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-cyan-400 transition-colors duration-500">Discover</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="p-1.5 rounded-full border border-white/5 bg-white/[0.02] text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 transition-all duration-500"
              >
                <ChevronDown size={14} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 2. INTERVIEW CONFIGURATION LAYER */}
      <motion.div 
        id="setup"
        className="scroll-mt-32 premium-glass rounded-[2rem] sm:rounded-[3rem] p-1 shadow-2xl w-full mx-auto relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
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

      {/* 3. PERFORMANCE HISTORY SECTION */}
      {user && (
        <section
          id="analytics"
          className="relative border-t border-white/[0.05] w-full"
        >
          <HistoryIntelligence onViewDetail={onViewHistoryDetail} />
        </section>
      )}

      {/* 4. TECHNICAL RESOURCES / SEO SECTION */}
      <section className="relative mt-4 sm:mt-6 pt-6 border-t border-white/10 space-y-8 pb-12">
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
