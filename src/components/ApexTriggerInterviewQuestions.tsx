import React from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  Terminal, 
  CheckCircle2, 
  Code2, 
  Layers, 
  Search, 
  AlertCircle,
  ShieldAlert
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const ApexTriggerInterviewQuestions: React.FC = () => {

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const sections = [
    {
      title: "Bulkification & Limits",
      desc: "Moving beyond single-record logic to enterprise-scale processing.",
      topics: ["Set/Map Collection Patterns", "Avoiding SOQL in Loops", "Heap Size Management", "10,001 DML Limit"]
    },
    {
      title: "Enterprise Patterns",
      desc: "Building maintainable, testable, and scalable trigger architectures.",
      topics: ["Trigger Handler Pattern", "Recursion Prevention", "Bypass Mechanisms", "One Trigger Per Object"]
    },
    {
      title: "Transaction Control",
      desc: "Understanding the Save Order and how triggers interact with the database.",
      topics: ["Before vs After Context", "Database.insert Partial Success", "Async Apex (Queueable/Future)", "Transaction Finalizers"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>Apex Trigger Interview Questions 2026 | Bulkification & Scenarios | ForcePilot AI</title>
        <meta
          name="description"
          content="Master Apex Trigger interview questions. Deep dives into bulkification, trigger handler patterns, recursion prevention, and transaction control."
        />
        <meta name="keywords" content="apex trigger interview questions, salesforce developer interview, trigger bulkification, trigger handler pattern, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/apex-trigger-interview-questions" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Apex Trigger Interview Questions 2026 | ForcePilot AI" />
        <meta property="og:description" content="Master Apex Trigger interview questions with AI-powered practice." />
        <meta property="og:url" content="https://forcepilotai.online/apex-trigger-interview-questions" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative text-center space-y-10 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-6 py-2 text-xs font-bold tracking-[0.2em] text-blue-400 uppercase backdrop-blur-md mb-4"
        >
          <Terminal size={14} className="animate-pulse" />
          <span>Apex Engineering Track</span>
        </motion.div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
          Master Apex <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-500">
            Trigger Interviews
          </span>
        </h1>
        
        <p className="text-sm sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal sm:font-medium">
          The definitive guide to production-grade Apex. From bulkification patterns to complex recursion control. Get evaluated on your code architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link
            to="/#setup"
            state={{ role: "Salesforce Apex Developer" }}
            className="w-full sm:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(59,130,246,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Practice Apex Trigger Interviews
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Quick Nav */}
      <nav className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Flow Interview", link: "/salesforce-flow-interview-questions", color: "emerald", icon: Layers },
          { title: "Apex Questions", link: "/apex-interview-questions", color: "cyan", icon: Code2 },
          { title: "Governor Limits", link: "/governor-limits-explained", color: "rose", icon: ShieldAlert },
          { title: "Scenario Based", link: "/scenario-based-salesforce-interview", color: "blue", icon: Search }
        ].map((link, i) => (
          <Link key={i} to={link.link} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-${link.color}-500/10 text-${link.color}-400 group-hover:scale-110 transition-transform`}>
                <link.icon size={20} />
              </div>
              <span className="font-bold text-white text-sm">{link.title}</span>
            </div>
            <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 group-hover:text-white transition-all" />
          </Link>
        ))}
      </nav>

      {/* Focus Areas */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Core <span className="text-blue-400">Concepts.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Master the trigger nuances that separate senior architects from junior developers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-6">
                {section.desc}
              </p>
              <div className="space-y-3">
                {section.topics.map((topic, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 size={14} className="text-blue-500/60" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recruiter Intelligence */}
      <section className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-8 sm:p-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Think like a <br />
            <span className="text-indigo-400">Technical Lead.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Interviewer expectations have evolved. They don't just want to see code that works; they want to see code that is <strong>defensive</strong>. ForcePilot AI evaluates your ability to handle null pointer exceptions, bulk data scenarios, and complex governor limit constraints.
          </p>
          <div className="flex gap-4">
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
              Bulkification First
            </div>
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold">
              Clean Architecture
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <AlertCircle size={20} />
            </div>
            <div className="text-sm font-bold text-white">Recruiter Red Flag</div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            "Avoid putting logic directly in the trigger body. Always use a Handler class. This shows you understand separation of concerns and testability."
          </p>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full w-[85%] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          </div>
          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest text-center">Architectural Maturity</div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center">
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Stop Coding. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
              Start Engineering.
            </span>
          </h2>
          <div className="pt-8">
            <Link
              to="/#setup"
              state={{ role: "Salesforce Apex Developer" }}
              className="px-14 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_50px_rgba(59,130,246,0.3)] flex items-center justify-center gap-4 mx-auto group active:scale-95 text-center"
            >
              Start Trigger Practice
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-slate-600 text-sm py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-8">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/salesforce-mock-interview" className="hover:text-blue-400 transition-colors">Mock Interview</Link>
          <Link to="/governor-limits-explained" className="hover:text-blue-400 transition-colors">Governor Limits</Link>
        </div>
      </footer>
    </div>
  );
};

export default ApexTriggerInterviewQuestions;
