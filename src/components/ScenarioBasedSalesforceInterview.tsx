import React from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  BrainCircuit, 
  Terminal, 
  AlertTriangle, 
  Workflow
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const ScenarioBasedSalesforceInterview: React.FC = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const scenarios = [
    {
      title: "LDV Performance Issues",
      desc: "Solving query timeouts in an org with 50 million records.",
      topics: ["Index Optimization", "Skinny Tables", "Query Plan Tool", "Async Processing"]
    },
    {
      title: "Complex Integration Failures",
      desc: "Debugging real-time callouts hitting CPU limits.",
      topics: ["Continuation Pattern", "Platform Events", "Named Credentials", "Error Logging Framework"]
    },
    {
      title: "Multi-Org Security Leak",
      desc: "Identifying sharing vulnerabilities in a complex hierarchy.",
      topics: ["Apex Managed Sharing", "With Sharing vs Inherited Sharing", "Shield Event Monitoring", "Restriction Rules"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>Scenario-Based Salesforce Interview Questions 2026 | Architect Thinking | ForcePilot AI</title>
        <meta
          name="description"
          content="Master scenario-based Salesforce interview questions. Real production issues, governor limit debugging, sharing/security problems, and enterprise scalability."
        />
        <meta name="keywords" content="scenario based salesforce interview, salesforce architect interview, salesforce production issues, governor limit debugging, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/scenario-based-salesforce-interview" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Scenario-Based Salesforce Interview Questions 2026 | ForcePilot AI" />
        <meta property="og:description" content="Master scenario-based Salesforce interview questions with AI-powered practice." />
        <meta property="og:url" content="https://forcepilotai.online/scenario-based-salesforce-interview" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative text-center space-y-10 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/5 px-6 py-2 text-xs font-bold tracking-[0.2em] text-rose-400 uppercase backdrop-blur-md mb-4"
        >
          <BrainCircuit size={14} className="animate-pulse" />
          <span>Architectural Thinking Track</span>
        </motion.div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
          Master Scenario <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-500">
            Based Interviews
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
          The elite technical simulator for SFDC architects. Solve real production puzzles. Get evaluated on your technical decision-making and problem-solving.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <button
            onClick={() => navigate('/interview')}
            className="w-full sm:w-auto px-12 py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(244,63,94,0.2)] flex items-center justify-center gap-3 group active:scale-95"
          >
            Start Scenario-Based Interview Practice
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Quick Nav */}
      <nav className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Apex Triggers", link: "/apex-trigger-interview-questions", color: "blue", icon: Terminal },
          { title: "Flow Interview", link: "/salesforce-flow-interview-questions", color: "emerald", icon: Workflow },
          { title: "LWC Coding", link: "/lwc-coding-interview", color: "cyan", icon: Code2 },
          { title: "Governor Limits", link: "/governor-limits-explained", color: "rose", icon: ShieldCheck }
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

      {/* Scenarios */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Production <span className="text-rose-400">Puzzles.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Prepare for the "What would you do?" questions that define high-level technical rounds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scenarios.map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-6">
                {item.desc}
              </p>
              <div className="space-y-3">
                {item.topics.map((topic, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 size={14} className="text-rose-500/60" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recruiter Strategy */}
      <section className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-8 sm:p-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Stop Memorizing. <br />
            <span className="text-orange-400">Start Solving.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            In senior technical interviews, there is rarely a single "correct" answer. Interviewers want to see your <strong>design process</strong>. ForcePilot AI evaluates how you weigh pros and cons, consider platform limits, and prioritize long-term maintainability.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Critical Analysis</div>
                <div className="text-xl font-bold text-white">96%</div>
             </div>
             <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">System Impact</div>
                <div className="text-xl font-bold text-white">92%</div>
             </div>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400">
              <AlertTriangle size={20} />
            </div>
            <div className="text-sm font-bold text-white">Architect Mindset</div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            "When presented with a performance issue, always mention the Query Plan Tool and the importance of selective SOQL filters. This shows you know how to use the platform's diagnostic tools."
          </p>
          <div className="pt-4 border-t border-white/5">
             <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Problem Solving</span>
                <span className="text-rose-400">Elite</span>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center">
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Ready to Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-500">
              Enterprise Solutions?
            </span>
          </h2>
          <div className="pt-8">
            <button
              onClick={() => navigate('/interview')}
              className="px-14 py-6 bg-rose-600 hover:bg-rose-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_50px_rgba(244,63,94,0.3)] flex items-center justify-center gap-4 mx-auto group"
            >
              Start Practice Now
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <footer className="text-center text-slate-600 text-sm py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-8">
          <Link to="/" className="hover:text-rose-400 transition-colors font-bold">Home</Link>
          <Link to="/salesforce-mock-interview" className="hover:text-rose-400 transition-colors font-bold">Mock Interview</Link>
          <Link to="/governor-limits-explained" className="hover:text-rose-400 transition-colors font-bold">Governor Limits</Link>
        </div>
      </footer>
    </div>
  );
};

export default ScenarioBasedSalesforceInterview;
