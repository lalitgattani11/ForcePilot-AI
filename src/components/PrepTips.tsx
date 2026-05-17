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
        "Use the STAR method for scenario-based questions.",
        "Keep your answers concise but logically dense.",
        "Vary your tone to emphasize critical technical points.",
        "Speak with conviction — you are the subject matter expert."
      ]
    }
  ];

  const checklist = [
    "Stable internet connection and quiet environment",
    "Functional microphone for high-fidelity AI analysis",
    "Familiarity with the chosen role (Admin/Dev/LWC)",
    "Ready to articulate technical logic clearly",
    "Openness to detailed AI-driven constructive criticism"
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-[10px] font-black uppercase tracking-[0.3em]">
          <Star size={14} className="text-purple-400" />
          Elite Preparation Framework
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none">
          Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic">Preparation Tips.</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Maximize your performance with actionable strategies and insights used by top 1% Salesforce professionals.
        </p>
      </section>

      {/* Strategy Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-slate-950/20 border border-white/5 relative group overflow-hidden"
          >
            <div className="space-y-8 relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-${cat.color}-500/10 border border-${cat.color}-500/20 flex items-center justify-center text-${cat.color}-400`}>
                <cat.icon size={28} />
              </div>
              
              <h3 className="text-2xl font-bold text-white tracking-tight">{cat.title}</h3>
              
              <ul className="space-y-5">
                {cat.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 size={16} className={`mt-1 text-${cat.color}-500 shrink-0`} />
                    <p className="text-[13px] text-slate-400 font-medium leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-${cat.color}-500/5 blur-[60px] rounded-full`} />
          </motion.div>
        ))}
      </section>

      {/* Pro Tips Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-glass p-12 rounded-[3rem] border border-emerald-500/10 bg-emerald-500/[0.01] flex flex-col justify-center space-y-6">
           <div className="flex items-center gap-3 text-emerald-400">
             <Zap size={24} />
             <span className="text-xs font-black uppercase tracking-[0.2em]">The "Power Move" Strategy</span>
           </div>
           <h3 className="text-2xl font-black text-white italic">Explain trade-offs automatically.</h3>
           <p className="text-slate-400 leading-relaxed font-medium">
             Don't just provide a solution. Explain why you chose it over an alternative. 
             (e.g., "I would use a Before-Save Flow here instead of Apex because...") 
             This demonstrates senior-level architectural thinking that recruiters crave.
           </p>
        </div>

        <div className="premium-glass p-12 rounded-[3rem] border border-rose-500/10 bg-rose-500/[0.01] flex flex-col justify-center space-y-6">
           <div className="flex items-center gap-3 text-rose-400">
             <AlertCircle size={24} />
             <span className="text-xs font-black uppercase tracking-[0.2em]">Common Failure Pattern</span>
           </div>
           <h3 className="text-2xl font-black text-white italic">The "Definition Trap".</h3>
           <p className="text-slate-400 leading-relaxed font-medium">
             Avoid just reciting definitions. When asked what a Junction Object is, 
             don't just say it's a many-to-many relationship. Describe a real scenario 
             where you implemented one to solve a business problem.
           </p>
        </div>
      </section>

      {/* Checklist */}
      <section className="relative p-12 sm:p-20 rounded-[4rem] bg-slate-950/40 border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black text-white tracking-tighter">Final Session Checklist</h2>
            <p className="text-slate-500 font-medium italic">Ensure you are optimized for high-fidelity intelligence gathering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-center gap-5 p-6 rounded-3xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all">
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-black text-xs shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item}</span>
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
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">
          Join the top 1% of Salesforce technical performers.
        </p>
      </section>
    </div>
  );
};

export default PrepTips;
