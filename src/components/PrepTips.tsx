import React from "react";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Target, 
  CheckCircle2, 
  MessageSquare, 
  Zap,
  Brain,
  AlertCircle,
  ShieldCheck,
  Star,
  Users
} from "lucide-react";

const PrepTips: React.FC = () => {
  const categories = [
    {
      title: "Mindset & Strategy",
      icon: Brain,
      color: "emerald",
      tips: [
        "Treat the simulation like a final-round interview.",
        "Take 2 seconds to structure your thoughts before speaking.",
        "Focus on practical scenarios, not just definitions.",
        "Maintain a growth mindset — every feedback is an asset."
      ]
    },
    {
      title: "Technical Delivery",
      icon: ShieldCheck,
      color: "cyan",
      tips: [
        "Explain the 'Why' before the 'How' for architectural clarity.",
        "Use Salesforce-standard terminology consistently.",
        "Be specific about governor limits and bulkification.",
        "Mention real-world trade-offs in your design decisions."
      ]
    },
    {
      title: "Communication Mastery",
      icon: MessageSquare,
      color: "purple",
      tips: [
        "Use the SALO method for scenario-based questions.",
        "Keep your answers concise but logically dense.",
        "Vary your tone to emphasize critical technical points.",
        "Speak with conviction — you are the subject matter expert."
      ]
    }
  ];

  const frameworks = [
    {
      title: "The SALO Framework",
      desc: "Situation, Action, Logic, Outcome. Move beyond STAR by explicitly explaining the 'Logic' behind your technical choices. This is what separates Senior candidates.",
      steps: ["Situation: Context of the problem", "Action: Specific steps taken", "Logic: Why you chose that path", "Outcome: Quantifiable results"]
    },
    {
      title: "The Scale Filter",
      desc: "Before finalizing any technical answer, run it through the 'Scale Filter'. How does this solution behave with 1 million records? How does it impact CPU time?",
      steps: ["Data Volume check", "Governor Limit impact", "Async potential", "Concurrency handling"]
    }
  ];

  const pacingTips = [
    { label: "The 5-Second Rule", desc: "Silently count to 5 before answering complex architectural questions. It signals deep thought, not hesitation." },
    { label: "Structured Pausing", desc: "Pause after stating a critical technical decision to allow the interviewer (or AI) to process the weight of the choice." },
    { label: "Verbal Signaling", desc: "Use phrases like 'Let's look at this from a scalability perspective' to guide the flow of the technical review." }
  ];

  const checklist = [
    "Stable internet connection and quiet environment",
    "Functional microphone for high-fidelity AI analysis",
    "Familiarity with the chosen role (Admin/Dev/LWC)",
    "Ready to articulate technical logic clearly",
    "Openness to detailed AI-driven constructive criticism"
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 px-4 sm:px-0">
      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4 sm:px-0">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-sm">
          <Star size={14} className="text-purple-400" />
          Elite Preparation Framework
        </div>
        <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tighter leading-[1.1]">
          Interview <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic">Preparation Tips.</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Maximize your performance with actionable strategies and insights used by top 1% Salesforce professionals.
        </p>
      </section>

      {/* Strategy Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-950/20 border border-white/5 relative group overflow-hidden"
          >
            <div className="space-y-6 sm:space-y-8 relative z-10">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-${cat.color}-500/10 border border-${cat.color}-500/20 flex items-center justify-center text-${cat.color}-400`}>
                <cat.icon size={24} className="sm:w-7 sm:h-7" />
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{cat.title}</h2>
              
              <ul className="space-y-5">
                {cat.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 size={16} className={`mt-1 text-${cat.color}-500 shrink-0`} />
                    <p className="text-xs sm:text-[13px] text-slate-400 font-medium leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-${cat.color}-500/5 blur-[60px] rounded-full`} />
          </motion.div>
        ))}
      </section>

      {/* Frameworks Section */}
      <section className="space-y-10 sm:space-y-12">
         <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">Strategic Frameworks</h2>
            <p className="text-slate-400 text-xs sm:text-base font-medium italic">Mental models used by CTA candidates.</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {frameworks.map((f, i) => (
               <div key={i} className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-white/[0.01] border border-white/5 space-y-6 sm:space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <Target size={100} className="text-emerald-500 sm:w-32 sm:h-32" />
                  </div>
                  <div className="relative z-10 space-y-6">
                     <h3 className="text-xl sm:text-2xl font-black text-white italic">{f.title}</h3>
                     <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">{f.desc}</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {f.steps.map((step, idx) => (
                           <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-bold text-slate-300">
                              <span className="text-emerald-500 font-black">0{idx + 1}</span> {step}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Pro Tips Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="premium-glass p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-emerald-500/10 bg-emerald-500/[0.01] flex flex-col justify-center space-y-6">
           <div className="flex items-center gap-3 text-emerald-400">
             <Zap size={20} className="sm:w-6 sm:h-6" />
             <span className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em]">The "Power Move" Strategy</span>
           </div>
           <h2 className="text-xl sm:text-2xl font-black text-white italic">Explain trade-offs automatically.</h2>
           <p className="text-slate-400 text-sm leading-relaxed font-medium">
             Don't just provide a solution. Explain why you chose it over an alternative. 
           </p>
        </div>

        <div className="premium-glass p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-rose-500/10 bg-rose-500/[0.01] flex flex-col justify-center space-y-6">
           <div className="flex items-center gap-3 text-rose-400">
             <AlertCircle size={20} className="sm:w-6 sm:h-6" />
             <span className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em]">Common Failure Pattern</span>
           </div>
           <h2 className="text-xl sm:text-2xl font-black text-white italic">The "Definition Trap".</h2>
           <p className="text-slate-400 text-sm leading-relaxed font-medium">
             Avoid just reciting definitions. Describe a real scenario where you solved a business problem.
           </p>
        </div>
      </section>

      {/* Pacing & Delivery */}
      <section className="space-y-10 sm:space-y-12">
         <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">Strategic Pacing</h2>
            <p className="text-slate-400 text-xs sm:text-base font-medium">Controlling the technical dialogue for maximum impact.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {pacingTips.map((tip, i) => (
               <div key={i} className="p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-950/40 border border-white/5 space-y-3 sm:space-y-4">
                  <div className="text-cyan-400 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em]">{tip.label}</div>
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed font-medium">{tip.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Checklist */}
      <section className="relative p-6 sm:p-20 rounded-[2.5rem] sm:rounded-[4rem] bg-slate-950/40 border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">Final Session Checklist</h2>
            <p className="text-slate-400 text-xs sm:text-base font-medium italic">Ensure you are optimized for high-fidelity gathering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-5 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-3xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-black text-[10px] sm:text-xs shrink-0">
                  {i + 1}
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-12 space-y-6">
        <div className="flex justify-center gap-4">
          <Users size={24} className="text-slate-700" />
          <Target size={24} className="text-emerald-500/50" />
          <Rocket size={24} className="text-slate-700" />
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Join the top 1% of Salesforce technical performers.
        </p>
      </section>
    </div>
  );
};

export default PrepTips;
