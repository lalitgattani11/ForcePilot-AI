import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Rocket, 
  Map, 
  Code2, 
  Settings, 
  Layers,
  Zap,
  TrendingUp,
  GraduationCap,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

const CareerRoadmap: React.FC = () => {
  const milestones = [
    {
      stage: "Foundation",
      title: "Beginner Path",
      icon: GraduationCap,
      color: "emerald",
      items: ["Salesforce Ecosystem Basics", "Platform Fundamentals", "Standard Objects & Data Model", "Basic Process Automation", "Certification: Associate / Admin"],
      checkpoints: ["Master declarative tools first", "Understand the 'Why' behind every click", "Build a portfolio org"]
    },
    {
      stage: "Specialization",
      title: "Intermediate Path",
      icon: Code2,
      color: "cyan",
      items: ["Advanced Flow Strategy", "Apex Fundamentals", "Sharing & Security Model", "Declarative vs Programmatic", "Certification: Platform App Builder"],
      checkpoints: ["Shift to programmatic thinking", "Optimize for multi-tenant limits", "Lead small-scale projects"]
    },
    {
      stage: "Expertise",
      title: "Advanced Path",
      icon: Rocket,
      color: "purple",
      items: ["LWC Architecture", "Complex Trigger Logic", "Enterprise Integration Patterns", "Scalable System Design", "Certification: PD1 / PD2"],
      checkpoints: ["Architect for global scale", "Master asynchronous Apex", "Influence technical strategy"]
    }
  ];

  const paths = [
    {
      role: "Salesforce Admin",
      skills: ["Permission Sets", "Advanced Reports", "Flow Builder", "CPQ / Billing"],
      icon: Settings,
      color: "emerald",
      trajectory: "Focus on Business Logic & Governance"
    },
    {
      role: "Salesforce Developer",
      skills: ["Apex Patterns", "LWC / JS", "REST APIs", "CI/CD & DevOps"],
      icon: Terminal,
      color: "blue",
      trajectory: "Focus on Engineering & Optimization"
    },
    {
      role: "Salesforce Architect",
      skills: ["Multi-Org Strategy", "System Landscape", "Security Architecture", "Governance"],
      icon: Map,
      color: "amber",
      trajectory: "Focus on Scalability & Design Authority"
    }
  ];

  const strategicGuidance = [
    {
      title: "The Developer Pivot",
      desc: "Transitioning from Admin to Developer isn't just about learning Apex; it's about adopting an engineering mindset. Start with bulkified flows, then move to Trigger Handlers.",
      icon: Zap
    },
    {
      title: "Architecture Leap",
      desc: "Architects don't solve problems with code alone. They weigh technical debt against business speed. Mastery of the Save Order is non-negotiable.",
      icon: ShieldCheck
    },
    {
      title: "Common Mistakes",
      desc: "Over-certification without hands-on implementation is a red flag for recruiters. Prioritize scenario-based problem solving over multiple choice exams.",
      icon: AlertCircle
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12 px-4 sm:px-0">
      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4 sm:px-0">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-sm">
          <Map size={14} className="text-emerald-400" />
          Strategic Growth Framework
        </div>
        <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tighter leading-[1.1]">
          Salesforce <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic">Career Roadmap.</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Navigate your professional evolution with our structured intelligence roadmap. From foundation to architectural mastery.
        </p>
      </section>

      {/* Roadmap Timeline */}
      <section className="space-y-10 sm:space-y-12">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6 sm:pb-8">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 text-emerald-400">
            <TrendingUp size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Progression Milestones</h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">Targeted developmental stages for SFDC professionals.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {milestones.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-950/20 border border-white/5 group hover:border-emerald-500/30 transition-all overflow-hidden"
            >
              <div className={`absolute top-0 right-0 p-4 sm:p-6 opacity-5 text-${m.color}-500`}>
                <m.icon size={60} className="sm:w-20 sm:h-20" />
              </div>
              <div className="relative space-y-6">
                <div className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-${m.color}-400`}>
                  Stage {i + 1}: {m.stage}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white italic">{m.title}</h3>
                <ul className="space-y-4">
                  {m.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-400 font-medium">
                      <div className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-${m.color}-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/5">
                   <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Key Checkpoints</div>
                   <div className="space-y-2">
                      {m.checkpoints.map((cp, idx) => (
                        <div key={idx} className="text-[10px] sm:text-[11px] text-slate-400 italic flex gap-2 font-medium">
                           <span className="text-emerald-500">→</span> {cp}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Role Tracks */}
      <section className="space-y-10 sm:space-y-12">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6 sm:pb-8">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 text-cyan-400">
            <Layers size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Technical Specializations</h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">Deep-dive mastery paths for high-growth roles.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {paths.map((p, i) => (
            <div key={i} className="premium-glass p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 space-y-6 group hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl bg-${p.color}-500/10 text-${p.color}-400`}>
                  <p.icon size={18} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{p.role}</h3>
                  <p className="text-[8px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-black mt-0.5">{p.trajectory}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Guidance Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {strategicGuidance.map((guide, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-white/[0.01] border border-white/5 space-y-4 sm:space-y-6"
          >
            <div className="flex items-center gap-3 text-cyan-400">
               <guide.icon size={18} className="sm:w-5 sm:h-5" />
               <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-none">{guide.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
               {guide.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Enterprise Expectations */}
      <section className="bg-slate-950/40 border border-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/5 blur-[80px] sm:blur-[120px] rounded-full" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
           <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tighter leading-tight">
                 Industry <br className="hidden sm:block" />
                 <span className="text-emerald-400 italic">Direction 2026.</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                 The Salesforce industry is shifting from generalist admins to specialized platform engineers. To remain competitive, professionals must bridge the gap between low-code and high-code.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                 <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 text-center sm:text-left">
                    <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Architectural IQ</div>
                    <div className="text-lg sm:text-xl font-bold text-white">Essential</div>
                 </div>
                 <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 text-center sm:text-left">
                    <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Data Literacy</div>
                    <div className="text-lg sm:text-xl font-bold text-white">Critical</div>
                 </div>
              </div>
           </div>
           <div className="space-y-4 sm:space-y-6">
              {[
                { label: "Data Cloud Mastery", desc: "Understanding unified profiles and real-time data orchestration." },
                { label: "AI Integration Logic", desc: "Building trusted AI agents and mastering prompt engineering." },
                { label: "Platform Engineering", desc: "Adopting DevOps Center, Scratch Orgs, and modular architecture." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:border-emerald-500/20 transition-all">
                   <div className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs sm:text-sm font-black">
                      {i + 1}
                   </div>
                   <div className="space-y-1">
                      <div className="font-bold text-white text-xs sm:text-sm">{item.label}</div>
                      <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Strategic CTA */}
      <section className="premium-glass rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 border border-emerald-500/10 bg-emerald-500/[0.02] text-center space-y-6 sm:space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-5" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tighter leading-tight">Ready to accelerate?</h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium px-4">
            Start a recruiter-grade technical simulation today and identify your current position on the roadmap.
          </p>
          <Link
            to="/#setup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl sm:rounded-2xl bg-emerald-500 text-slate-950 font-black uppercase tracking-widest text-[10px] sm:text-xs hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.3)] inline-block"
          >
            Launch Assessment
          </Link>        </div>
      </section>
    </div>
  );
};

const Terminal = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

export default CareerRoadmap;
