import React from "react";
import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  Activity, 
  ShieldCheck, 
  MessageSquare, 
  Zap,
  Cpu,
  Search
} from "lucide-react";

const AIInsights: React.FC = () => {
  const insightCards = [
    {
      title: "Technical Accuracy",
      desc: "Our AI evaluates the structural integrity and technical precision of your responses against Salesforce documentation.",
      icon: ShieldCheck,
      color: "emerald",
      metrics: ["Keyword Density", "Logic Consistency", "Platform Compliance"]
    },
    {
      title: "Communication Clarity",
      desc: "Analyzes professional tone, word choice, and explanation depth to ensure you're ready for recruiter screenings.",
      icon: MessageSquare,
      color: "cyan",
      metrics: ["Fluency Index", "Professionalism", "Response Depth"]
    },
    {
      title: "Confidence Analysis",
      desc: "Detects patterns in response speed and phrasing to measure your technical conviction in high-pressure scenarios.",
      icon: Zap,
      color: "purple",
      metrics: ["Conviction Score", "Speed of Thought", "Pattern Stability"]
    }
  ];

  const logicPoints = [
    { label: "Pattern Detection", desc: "Identifies recurring technical gaps across different interview sessions." },
    { label: "Growth Mapping", desc: "Visualizes your technical trajectory with high-fidelity analytics." },
    { label: "Recruiter Verdict", desc: "Synthesizes data into a simplified 'Professional Readiness' score." }
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-[10px] font-black uppercase tracking-[0.3em]">
          <BrainCircuit size={14} className="text-cyan-400" />
          Intelligence Engine
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none">
          Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 italic">AI Insights.</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Deep-dive into the technical intelligence that powers ForcePilot AI. Understand how we analyze and grade your performance.
        </p>
      </section>

      {/* Analysis Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {insightCards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="premium-glass p-10 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between">
              <div className={`p-4 rounded-2xl bg-${card.color}-500/10 text-${card.color}-400 group-hover:scale-110 transition-transform`}>
                <card.icon size={28} />
              </div>
              <Activity size={16} className="text-slate-700" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{card.desc}</p>
            </div>

            <div className="pt-6 space-y-3">
              {card.metrics.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{m}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= 4 ? `bg-${card.color}-500/40` : 'bg-white/5'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Process Visualization */}
      <section className="relative p-12 sm:p-20 rounded-[4rem] bg-slate-950/20 border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px]" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-white tracking-tighter">The Intelligence Flow</h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                From the moment you speak to the final report, our system processes your technical footprint through multiple analysis layers.
              </p>
            </div>

            <div className="space-y-6">
              {logicPoints.map((point, i) => (
                <div key={i} className="flex gap-5">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 font-black text-xs">
                    0{i + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-sm uppercase tracking-wide">{point.label}</h4>
                    <p className="text-xs text-slate-500 font-medium">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-glass p-8 rounded-[3rem] border border-cyan-500/10 bg-cyan-500/[0.02] flex items-center justify-center min-h-[300px]">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 blur-3xl animate-pulse" />
              <Cpu size={120} className="relative text-cyan-400 opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Final Summary Card */}
      <section className="text-center space-y-8 max-w-3xl mx-auto pb-12">
        <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/5 inline-flex items-center gap-4 px-8">
          <Search size={20} className="text-emerald-500" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Validated against real recruiter standards.</span>
        </div>
      </section>
    </div>
  );
};

export default AIInsights;
