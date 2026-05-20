import React from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Search, 
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const LwcCodingInterview: React.FC = () => {

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const sections = [
    {
      title: "Reactivity & Data Flow",
      desc: "Master the nuances of @api, @wire, and @track in modern LWC.",
      topics: ["Wire Service Lifecycle", "Reactive Properties", "Public vs Private APIs", "LMS & PubSub"]
    },
    {
      title: "Component Architecture",
      desc: "Building modular, reusable, and performant web components.",
      topics: ["Shadow DOM Boundaries", "Event Propagation (Bubbling)", "Composition vs Inheritance", "Lifecycle Hooks Sequence"]
    },
    {
      title: "Performance & Security",
      desc: "Optimizing the frontend for enterprise-scale Salesforce orgs.",
      topics: ["Locker Service vs LWS", "Lightning Data Service", "Render Optimization", "Security Best Practices (XSS/CSRF)"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>LWC Coding Interview Questions 2026 | Lightning Web Components Practice | ForcePilot AI</title>
        <meta
          name="description"
          content="Practice LWC coding interviews with AI-powered feedback. Master @api, @wire, lifecycle hooks, shadow DOM, and component architecture for Salesforce roles."
        />
        <meta name="keywords" content="lwc coding interview, lightning web components practice, lwc interview questions, salesforce frontend interview, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/lwc-coding-interview" />
        
        {/* Open Graph */}
        <meta property="og:title" content="LWC Coding Interview Questions 2026 | ForcePilot AI" />
        <meta property="og:description" content="Master LWC coding interviews with AI-powered practice." />
        <meta property="og:url" content="https://forcepilotai.online/lwc-coding-interview" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="guide-hero-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="guide-hero-badge border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
        >
          <Layers size={14} className="animate-pulse" />
          <span>Frontend Excellence Track</span>
        </motion.div>
        
        <h1 className="guide-hero-title">
          Master LWC <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500">
            Coding Interviews
          </span>
        </h1>
        
        <p className="guide-hero-subtitle">
          The elite technical roadmap for modern Salesforce frontends. From Shadow DOM to specialized wire adapters. Get evaluated on your component logic.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/#setup"
            state={{ role: "Salesforce LWC Developer" }}
            className="w-full sm:w-auto px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Practice LWC Coding Interviews
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Quick Nav */}
      <nav className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-0">
        {[
          { title: "Apex Questions", link: "/apex-interview-questions", color: "emerald", icon: Terminal },
          { title: "Flow Interview", link: "/salesforce-flow-interview-questions", color: "cyan", icon: Zap },
          { title: "Governor Limits", link: "/governor-limits-explained", color: "rose", icon: ShieldCheck },
          { title: "Scenario Based", link: "/scenario-based-salesforce-interview", color: "blue", icon: Search }
        ].map((link, i) => (
          <Link key={i} to={link.link} className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-2.5 sm:p-3 rounded-xl bg-${link.color}-500/10 text-${link.color}-400 group-hover:scale-110 transition-transform`}>
                <link.icon size={18} className="sm:size-[20px]" />
              </div>
              <span className="font-bold text-white text-xs sm:text-sm">{link.title}</span>
            </div>
            <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 group-hover:text-white transition-all sm:size-[18px]" />
          </Link>
        ))}
      </nav>

      {/* Focus Areas */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Technical <span className="text-cyan-400">Pillars.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Elite LWC developers are judged on their ability to build modern, reactive, and optimized web standards components.</p>
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
                    <CheckCircle2 size={14} className="text-cyan-500/60" />
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
            <span className="text-emerald-400">Web Standards Expert.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Salesforce has moved LWC closer to native web standards. Interviewers are now looking for developers who understand the underlying platform mechanics like Custom Elements, Templates, and Shadow DOM. ForcePilot AI evaluates your ability to build future-proof frontends.
          </p>
          <div className="flex gap-4">
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold">
              Reactive Mastery
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
              Clean DOM Architecture
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Activity size={20} />
            </div>
            <div className="text-sm font-bold text-white">Performance Audit</div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            "Don't just mention @wire. Explain how the wire service manages the cache and how you would force a refresh using refreshApex()."
          </p>
          <div className="flex items-center gap-2">
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full w-[92%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
             </div>
             <span className="text-[10px] font-bold text-emerald-400">92%</span>
          </div>
          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest text-center">Frontend Maturity</div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center">
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Stop Rendering. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500">
              Start Engineering.
            </span>
          </h2>
          <div className="pt-8">
            <Link
              to="/#setup"
              state={{ role: "Salesforce LWC Developer" }}
              className="px-14 py-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_50px_rgba(34,211,238,0.3)] flex items-center justify-center gap-4 mx-auto group active:scale-95 text-center"
            >
              Start LWC Practice
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-slate-600 text-sm py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-8">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/salesforce-mock-interview" className="hover:text-cyan-400 transition-colors">Mock Interview</Link>
          <Link to="/governor-limits-explained" className="hover:text-cyan-400 transition-colors">Governor Limits</Link>
        </div>
      </footer>
    </div>
  );
};

export default LwcCodingInterview;
