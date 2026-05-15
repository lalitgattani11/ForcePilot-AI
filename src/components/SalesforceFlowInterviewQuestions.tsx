import React from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  Workflow, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Database,
  CheckCircle2,
  AlertTriangle,
  Layout
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const SalesforceFlowInterviewQuestions: React.FC = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const categories = [
    {
      title: "Flow Architecture",
      desc: "Understanding when to use Before-Save vs After-Save triggers.",
      icon: Layout,
      color: "emerald"
    },
    {
      title: "Optimization",
      desc: "Avoiding the common pitfalls of Flow-in-loops and excessive elements.",
      icon: Cpu,
      color: "cyan"
    },
    {
      title: "Error Handling",
      desc: "Mastering Fault Paths and specialized error notifications.",
      icon: AlertTriangle,
      color: "rose"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>Salesforce Flow Interview Questions 2026 | Flow Automation Guide | ForcePilot AI</title>
        <meta
          name="description"
          content="Master Salesforce Flow interview questions. Deep dives into record-triggered flows, before-save vs after-save, flow optimization, and error handling."
        />
        <meta name="keywords" content="salesforce flow interview questions, salesforce automation interview, record-triggered flows, flow optimization, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/salesforce-flow-interview-questions" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce Flow Interview Questions 2026 | ForcePilot AI" />
        <meta property="og:description" content="Master Salesforce Flow interview questions with AI-powered practice." />
        <meta property="og:url" content="https://forcepilotai.online/salesforce-flow-interview-questions" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative text-center space-y-10 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-6 py-2 text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase backdrop-blur-md mb-4"
        >
          <Workflow size={14} className="animate-pulse" />
          <span>Automation Mastery Track</span>
        </motion.div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
          Master Salesforce <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500">
            Flow Interviews
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
          The definitive guide to low-code automation. From record-triggered logic to complex subflows. Get evaluated on your architectural decision-making.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <button
            onClick={() => navigate('/interview')}
            className="w-full sm:w-auto px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center justify-center gap-3 group active:scale-95"
          >
            Master Salesforce Flow Interviews
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Quick Nav */}
      <nav className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Admin Interview", link: "/salesforce-admin-interview", color: "emerald", icon: Layout },
          { title: "Apex Triggers", link: "/apex-trigger-interview-questions", color: "blue", icon: Database },
          { title: "Governor Limits", link: "/governor-limits-explained", color: "rose", icon: ShieldCheck },
          { title: "Mock Interview", link: "/salesforce-mock-interview", color: "cyan", icon: Zap }
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

      {/* Categories */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Technical <span className="text-cyan-400">Pillars.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Elite Flow developers are judged on their ability to build efficient, scalable, and maintainable automations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
            >
              <div className={`mb-6 inline-flex p-4 rounded-2xl bg-${cat.color}-500/10 text-${cat.color}-400 group-hover:scale-110 transition-transform`}>
                <cat.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{cat.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recruiter Strategy */}
      <section className="bg-[#0a0c10] border border-white/5 rounded-[3rem] p-8 sm:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
        <div className="flex-1 space-y-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Design for <br />
            <span className="text-emerald-400">Transaction Scale.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Interviewer focus has shifted from "Can you build a Flow?" to "Can you build a Flow that won't break the org?". We evaluate your understanding of bulkification and governor limit impacts.
          </p>
          <div className="space-y-4">
            {[
              "Bulkified DML & SOQL elements",
              "Before-Save vs After-Save efficiency",
              "Subflow strategy for reusability",
              "Avoiding Flow recursion"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[450px] space-y-6 relative z-10">
           <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Architect Scorecard</div>
                <div className="text-emerald-400 font-mono text-xs">PASS</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Bulkification Logic</span>
                  <span className="text-white font-bold">EXCELLENT</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Limit Awareness</span>
                  <span className="text-white font-bold">ADVANCED</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    "Candidate correctly identified that field updates should happen in a Before-Save Flow to save CPU time."
                  </p>
                </div>
              </div>
           </div>
        </div>
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-0"></div>
      </section>

      {/* Scenario Logic */}
      <section className="space-y-16">
         <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Scenario <span className="text-blue-400">Thinking.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Prepare for complex automation puzzles frequently used by Salesforce Partners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "The Bulk DML Challenge",
              context: "Your Flow works for 1 record but hits limits with 200 via Data Loader.",
              solution: "Move DML outside of loops and use collection variables."
            },
            {
              title: "The Order of Execution",
              context: "Flow conflicts with an existing Apex Trigger on the same object.",
              solution: "Understanding the Save Order and consolidating logic."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 space-y-4 hover:border-white/10 transition-all"
            >
              <h4 className="text-xl font-bold text-white">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.context}</p>
              <div className="pt-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Key Insight: {item.solution}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center">
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Stop Building. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Start Engineering.
            </span>
          </h2>
          <div className="pt-8">
            <button
             onClick={() => navigate('/interview')}
              className="px-14 py-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_50px_rgba(34,211,238,0.3)] flex items-center justify-center gap-4 mx-auto group"
            >
              Start Flow Practice
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
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

export default SalesforceFlowInterviewQuestions;
