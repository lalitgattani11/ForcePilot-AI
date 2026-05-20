import React from 'react';
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  ShieldAlert,
  Database,
  Timer,
  BarChart3,
  HardDrive
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const GovernorLimitsExplained: React.FC = () => {

  const limits = [
    {
      icon: Database,
      name: "SOQL Queries",
      sync: "100",
      async: "200",
      desc: "Total number of SOQL queries issued in a single transaction."
    },
    {
      icon: HardDrive,
      name: "DML Statements",
      sync: "150",
      async: "150",
      desc: "Total number of DML statements (insert, update, delete, etc.) issued."
    },
    {
      icon: Timer,
      name: "CPU Time",
      sync: "10,000 ms",
      async: "60,000 ms",
      desc: "Maximum CPU time on the Salesforce servers."
    },
    {
      icon: BarChart3,
      name: "Heap Size",
      sync: "6 MB",
      async: "12 MB",
      desc: "Maximum amount of memory occupied by objects at any point."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 text-slate-300">
      <Helmet>
        <title>Salesforce Governor Limits Explained 2026 | ForcePilot AI</title>
        <meta name="description" content="A technical deep-dive into Salesforce Governor Limits. Understanding synchronous vs asynchronous limits, CPU time, and SOQL constraints for elite developers." />
        <link rel="canonical" href="https://forcepilotai.online/governor-limits-explained" />
        <meta property="og:title" content="Salesforce Governor Limits Explained | ForcePilot AI" />
        <meta property="og:description" content="Technical deep-dive into Salesforce Governor Limits. Master the constraints of the multi-tenant architecture." />
        <meta property="og:url" content="https://forcepilotai.online/governor-limits-explained" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
      </Helmet>

      {/* Hero Section */}
      <section className="guide-hero-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="guide-hero-badge border-rose-500/20 bg-rose-500/5 text-rose-400"
        >
          <ShieldAlert size={14} className="animate-pulse" />
          <span>Multi-Tenant Architecture</span>
        </motion.div>
        <h1 className="guide-hero-title">
          Governor Limits <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
            Demystified
          </span>
        </h1>
        <p className="guide-hero-subtitle">
          The non-negotiable rules of the Salesforce platform. Understanding these is the difference between a Junior Developer and a Technical Architect.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/#setup"
            state={{ role: "Salesforce Apex Developer" }}
            className="w-full sm:w-auto px-12 py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(244,63,94,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Practice Limit Management
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Internal Navigation */}
      <nav className="grid sm:grid-cols-2 gap-4">
        <Link to="/apex-interview-questions" className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group">
          <div>
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Apply Knowledge</div>
            <div className="text-white font-semibold">Apex Interview Questions</div>
          </div>
          <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/lwc-interview-guide" className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group">
          <div>
            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1">Frontend Focus</div>
            <div className="text-white font-semibold">LWC Interview Guide</div>
          </div>
          <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      {/* Limits Grid */}
      <section className="space-y-12">
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-rose-500 pl-4">
          Core Transaction Limits
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {limits.map((limit, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                  <limit.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{limit.name}</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{limit.desc}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Synchronous</div>
                  <div className="text-white font-mono">{limit.sync}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Asynchronous</div>
                  <div className="text-white font-mono">{limit.async}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recruiter Section */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Sparkles className="text-orange-400" />
          The "Architect" mindset
        </h2>
        <div className="prose prose-invert max-w-none text-slate-400">
          <p>
            When an interviewer asks about governor limits, they aren't testing your ability to memorize numbers. They are testing your ability to design <strong>scalable</strong> systems. 
          </p>
          <p className="pt-4 italic text-slate-300">
            "I once saw a senior developer fail an interview because they couldn't explain how to handle 10,001 records in a single transaction. They knew the limit was 10k, but they didn't know how to move to Batch Apex or Queueables. That's what separates mid-level from senior."
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-600 to-orange-700 px-6 py-16 text-center shadow-2xl">
        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Design for <br/> Platform Scale.
          </h2>
          <p className="text-rose-50 text-lg opacity-90">
            ForcePilot AI challenges your architectural decisions. Practice handling large datasets, long-running processes, and complex trigger recursions.
          </p>
          <div className="pt-6">
            <Link 
              to="/#setup"
              state={{ role: "Salesforce Apex Developer" }}
              className="px-10 py-5 bg-white text-rose-700 hover:bg-rose-50 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 mx-auto group"
            >
              Master Governor Limits
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-slate-400 text-sm py-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-rose-400 transition-colors">Home</Link>
          <Link to="/apex-interview-questions" className="hover:text-rose-400 transition-colors">Apex Questions</Link>
          <Link to="/lwc-interview-guide" className="hover:text-rose-400 transition-colors">LWC Guide</Link>
        </div>
      </footer>
    </div>
  );
};

export default GovernorLimitsExplained;
