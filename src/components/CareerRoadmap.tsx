import React from "react";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Map, 
  Code2, 
  Settings, 
  Layers, 
  TrendingUp,
  GraduationCap
} from "lucide-react";

const CareerRoadmap: React.FC = () => {
  const milestones = [
    {
      stage: "Foundation",
      title: "Beginner Path",
      icon: GraduationCap,
      color: "emerald",
      items: ["Salesforce Ecosystem Basics", "Platform Fundamentals", "Standard Objects & Data Model", "Basic Process Automation", "Certification: Associate / Admin"]
    },
    {
      stage: "Specialization",
      title: "Intermediate Path",
      icon: Code2,
      color: "cyan",
      items: ["Advanced Flow Strategy", "Apex Fundamentals", "Sharing & Security Model", "Declarative vs Programmatic", "Certification: Platform App Builder"]
    },
    {
      stage: "Expertise",
      title: "Advanced Path",
      icon: Rocket,
      color: "purple",
      items: ["LWC Architecture", "Complex Trigger Logic", "Enterprise Integration Patterns", "Scalable System Design", "Certification: PD1 / PD2"]
    }
  ];

  const paths = [
    {
      role: "Salesforce Admin",
      skills: ["Permission Sets", "Advanced Reports", "Flow Builder", "CPQ / Billing"],
      icon: Settings,
      color: "emerald"
    },
    {
      role: "Salesforce Developer",
      skills: ["Apex Patterns", "LWC / JS", "REST APIs", "CI/CD & DevOps"],
      icon: Terminal,
      color: "blue"
    },
    {
      role: "Salesforce Architect",
      skills: ["Multi-Org Strategy", "System Landscape", "Security Architecture", "Governance"],
      icon: Map,
      color: "amber"
    }
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-[10px] font-black uppercase tracking-[0.3em]">
          <Map size={14} className="text-emerald-400" />
          Strategic Growth Framework
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none">
          Salesforce <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic">Career Roadmap.</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Navigate your professional evolution with our structured intelligence roadmap. From foundation to architectural mastery.
        </p>
      </section>

      {/* Roadmap Timeline */}
      <section className="space-y-12">
        <div className="flex items-center gap-4 border-b border-white/5 pb-8">
          <div className="p-3 rounded-2xl bg-white/5 text-emerald-400">
            <TrendingUp size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Progression Milestones</h2>
            <p className="text-slate-500 text-sm">Targeted developmental stages for SFDC professionals.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {milestones.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-[2.5rem] bg-slate-950/20 border border-white/5 group hover:border-emerald-500/30 transition-all overflow-hidden"
            >
              <div className={`absolute top-0 right-0 p-6 opacity-5 text-${m.color}-500`}>
                <m.icon size={80} />
              </div>
              <div className="relative space-y-6">
                <div className={`text-[10px] font-black uppercase tracking-widest text-${m.color}-400`}>
                  Stage {i + 1}: {m.stage}
                </div>
                <h3 className="text-xl font-black text-white italic">{m.title}</h3>
                <ul className="space-y-4">
                  {m.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                      <div className={`mt-1 h-1.5 w-1.5 rounded-full bg-${m.color}-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Role Tracks */}
      <section className="space-y-12">
        <div className="flex items-center gap-4 border-b border-white/5 pb-8">
          <div className="p-3 rounded-2xl bg-white/5 text-cyan-400">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Technical Specializations</h2>
            <p className="text-slate-500 text-sm">Deep-dive mastery paths for high-growth roles.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((p, i) => (
            <div key={i} className="premium-glass p-8 rounded-[2rem] border border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl bg-${p.color}-500/10 text-${p.color}-400`}>
                  <p.icon size={20} />
                </div>
                <h3 className="font-bold text-white">{p.role}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic CTA */}
      <section className="premium-glass rounded-[3rem] p-12 sm:p-16 border border-emerald-500/10 bg-emerald-500/[0.02] text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-5" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter">Ready to accelerate?</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium">
            Start a recruiter-grade technical simulation today and identify your current position on the roadmap.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl bg-emerald-500 text-slate-950 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            Launch Assessment
          </button>
        </div>
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
