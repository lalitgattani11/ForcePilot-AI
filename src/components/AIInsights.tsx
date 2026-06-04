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
      metrics: ["Keyword Density", "Logic Consistency", "Platform Compliance"],
      deepDive: "Evaluates 'Bulkification IQ' and 'Governor Limit Awareness' in every scenario."
    },
    {
      title: "Communication Clarity",
      desc: "Analyzes professional tone, word choice, and explanation depth to ensure you're ready for recruiter screenings.",
      icon: MessageSquare,
      color: "cyan",
      metrics: ["Fluency Index", "Professionalism", "Response Depth"],
      deepDive: "Uses the 'Architectural Vocabulary Index' to measure seniority."
    },
    {
      title: "Confidence Analysis",
      desc: "Detects patterns in response speed and phrasing to measure your technical conviction in high-pressure scenarios.",
      icon: Zap,
      color: "purple",
      metrics: ["Conviction Score", "Speed of Thought", "Pattern Stability"],
      deepDive: "Identifies 'Uncertainty Markers' in complex architectural explanations."
    }
  ];

  const logicPoints = [
    { label: "Pattern Detection", desc: "Identifies recurring technical gaps across different interview sessions." },
    { label: "Growth Mapping", desc: "Visualizes your technical trajectory with high-fidelity analytics." },
    { label: "Recruiter Verdict", desc: "Synthesizes data into a simplified 'Professional Readiness' score." }
  ];

  const evaluationPatterns = [
    {
      title: "Architectural Reasoning",
      desc: "High-performing candidates don't just state the 'How'. They explain the 'Why' and the 'Alternative'. Our AI looks for the mention of trade-offs.",
      val: "92%"
    },
    {
      title: "Scenario Bulkification",
      desc: "Recruiters prioritize candidates who instinctively design for scale. The AI flags any logic that might fail in a multi-tenant environment.",
      val: "88%"
    },
    {
      title: "System Flow Mastery",
      desc: "Mastery of the Save Order and execution context is the most consistent signal of a Senior Developer or Architect.",
      val: "95%"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pt-0 pb-8 sm:py-12 px-4 sm:px-0">
      {/* Hero Header */}
      <section className="guide-hero-section">
        <div className="guide-hero-badge border-cyan-500/20 bg-cyan-500/5 text-cyan-300">
          <BrainCircuit size={14} className="text-cyan-400" />
          <span>Intelligence Engine</span>
        </div>
        <h1 className="guide-hero-title">
          Interview <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 italic">AI Insights.</span>
        </h1>
        <p className="guide-hero-subtitle">
          Deep-dive into the technical intelligence that powers ForcePilot AI. Understand how we analyze and grade your performance.
        </p>
      </section>

      {/* Analysis Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {insightCards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="premium-glass p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3.5 sm:p-4 rounded-2xl bg-${card.color}-500/10 text-${card.color}-400 group-hover:scale-110 transition-transform`}>
                <card.icon size={24} className="sm:w-7 sm:h-7" />
              </div>
              <Activity size={14} className="text-slate-700 sm:w-4 sm:h-4" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{card.title}</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">{card.desc}</p>
            </div>

            <div className="pt-4 sm:pt-6 space-y-3">
              {card.metrics.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div key={dot} className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${dot <= 4 ? `bg-${card.color}-500/40` : 'bg-white/5'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
               <div className="text-[8px] sm:text-[9px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-2 italic">Intelligence Deep Dive</div>
               <p className="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed font-medium">{card.deepDive}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Recruiter Evaluation Patterns */}
      <section className="space-y-10 sm:space-y-12">
         <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">Evaluation Patterns</h2>
            <p className="text-slate-400 text-xs sm:text-base font-medium">What our AI identifies as high-performance signals.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {evaluationPatterns.map((pattern, i) => (
               <div key={i} className="p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] bg-white/[0.01] border border-white/5 space-y-4 sm:space-y-6 relative group overflow-hidden">
                  <div className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 text-white/5 font-black text-4xl sm:text-6xl italic group-hover:text-emerald-500/10 transition-colors leading-none">{pattern.val}</div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight relative z-10">{pattern.title}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-medium relative z-10">{pattern.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Common Weakness Heatmap */}
      <section className="premium-glass p-6 sm:p-20 rounded-[2rem] sm:rounded-[4rem] border border-white/5 bg-slate-950/20 relative overflow-hidden">
         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="space-y-6 sm:space-y-8">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                  Technical Gaps
               </div>
               <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tighter leading-tight">
                  Common Candidate <br className="hidden sm:block" />
                  <span className="text-rose-400 italic">Weakness Markers.</span>
               </h2>
               <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                  Analysis across 5,000+ sessions reveals that even experienced developers often struggle with these three critical areas.
               </p>
               <div className="space-y-4 pt-2">
                  {[
                    { label: "Inefficient Loop Queries", val: "74%" },
                    { label: "Improper Error Handling", val: "62%" },
                    { label: "Shadow DOM Misconceptions", val: "58%" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>{stat.label}</span>
                          <span className="text-rose-400">{stat.val}</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500/40 rounded-full transition-all duration-1000" style={{ width: stat.val }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-slate-900/50 border border-white/10 space-y-6 sm:space-y-8 shadow-2xl relative">
               <div className="flex items-center gap-4 border-b border-white/5 pb-4 sm:pb-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                     <Search size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                     <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Intelligence Deep Dive</div>
                     <div className="text-base sm:text-lg font-bold text-white leading-tight">Architectural IQ</div>
                  </div>
               </div>
               <p className="text-xs sm:text-sm text-slate-400 leading-relaxed italic font-medium">
                  "The difference between a mid-level and senior response is often the ability to describe the implications of a design choice on long-term maintainability."
               </p>
               <div className="flex gap-4">
                  <div className="flex-1 p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 text-center">
                     <div className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase mb-1">Pass Rate</div>
                     <div className="text-lg sm:text-xl font-black text-emerald-400 leading-none">12%</div>
                  </div>
                  <div className="flex-1 p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 text-center">
                     <div className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase mb-1">Signal</div>
                     <div className="text-lg sm:text-xl font-black text-cyan-400 leading-none">HIGH</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Process Visualization */}
      <section className="relative p-8 sm:p-20 rounded-[2rem] sm:rounded-[4rem] bg-slate-950/20 border border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/5 blur-[80px] sm:blur-[120px] rounded-full" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8 text-center sm:text-left">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">The Intelligence Flow</h2>
              <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed px-4 sm:px-0">
                From the moment you speak to the final report, our system processes your technical footprint through multiple analysis layers.
              </p>
            </div>

            <div className="space-y-6 text-left">
              {logicPoints.map((point, i) => (
                <div key={i} className="flex gap-4 sm:gap-5">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 font-black text-[10px] sm:text-xs">
                    0{i + 1}
                  </div>
                  <div className="space-y-1 pt-0.5">
                    <h3 className="font-bold text-white text-[11px] sm:text-sm uppercase tracking-wide leading-none">{point.label}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-medium leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-glass p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-cyan-500/10 bg-cyan-500/[0.02] flex items-center justify-center min-h-[250px] sm:min-h-[300px]">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 blur-3xl animate-pulse" />
              <Cpu size={80} className="relative text-cyan-400 opacity-80 sm:w-32 sm:h-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Final Summary Card */}
      <section className="text-center space-y-8 max-w-3xl mx-auto pb-8 sm:pb-12 px-4 sm:px-0">
        <div className="p-3.5 sm:p-4 rounded-[1.5rem] sm:rounded-3xl bg-white/[0.02] border border-white/5 inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 max-w-full">
          <Search size={16} className="text-emerald-500 shrink-0 sm:w-5 sm:h-5" />
          <span className="text-[8px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.1em] sm:tracking-[0.2em] truncate">Validated against real recruiter standards.</span>
        </div>
      </section>
    </div>
  );
};

export default AIInsights;
