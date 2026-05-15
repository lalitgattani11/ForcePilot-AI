import React from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Database, 
  Zap, 
  Settings,
  Workflow,
  Search,
  CheckCircle2
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const SalesforceAdminInterview: React.FC = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const sections = [
    {
      title: "Security & Access Control",
      desc: "Master the Salesforce sharing model, from Org-Wide Defaults to Permission Set Groups.",
      topics: ["OWD vs Sharing Rules", "Profiles vs Permission Sets", "Manual Sharing", "Restriction Rules"]
    },
    {
      title: "Automation & Flow",
      desc: "Transitioning from Workflow and Process Builder to the power of Salesforce Flow.",
      topics: ["Record-Triggered Flows", "Before-Save Optimization", "Screen Flows", "Fault Paths"]
    },
    {
      title: "Data & User Management",
      desc: "Best practices for data integrity, user lifecycle, and license management.",
      topics: ["Validation Rules", "Data Import Wizard", "Lookup vs Master-Detail", "User Freezing vs Deactivation"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>Salesforce Admin Interview Questions 2026 | AI Mock Practice | ForcePilot AI</title>
        <meta
          name="description"
          content="Master your Salesforce Admin interview with expert-verified questions and AI-powered practice. Deep dives into Security, Sharing, Flow, and Data Management."
        />
        <meta name="keywords" content="salesforce admin interview, salesforce interview questions, salesforce admin practice, salesforce ai interview" />
        <link rel="canonical" href="https://forcepilotai.online/salesforce-admin-interview" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce Admin Interview Questions 2026 | ForcePilot AI" />
        <meta property="og:description" content="Master your Salesforce Admin interview with expert-verified questions and AI-powered practice." />
        <meta property="og:url" content="https://forcepilotai.online/salesforce-admin-interview" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Salesforce Admin Interview Questions 2026 | ForcePilot AI" />
        <meta name="twitter:description" content="AI-powered Salesforce Admin interview preparation." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative text-center space-y-10 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2 text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase backdrop-blur-md mb-4"
        >
          <Settings size={14} className="animate-pulse" />
          <span>Admin Excellence Track</span>
        </motion.div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
          The Ultimate <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
            Salesforce Admin Interview
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
          From Profiles to Permission Sets, Master the core configurations of the Salesforce platform. Get recruiter-grade feedback on your administrative logic.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <button
            onClick={() => navigate('/interview')}
            className="w-full sm:w-auto px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 group active:scale-95"
          >
            Practice Salesforce Admin Interviews
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Navigation Links */}
      <nav className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Flow Interview", link: "/salesforce-flow-interview-questions", color: "emerald", icon: Workflow },
          { title: "Mock Interview", link: "/salesforce-mock-interview", color: "cyan", icon: Zap },
          { title: "Apex Triggers", link: "/apex-trigger-interview-questions", color: "blue", icon: Database },
          { title: "Scenario Based", link: "/scenario-based-salesforce-interview", color: "rose", icon: Search }
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

      {/* Core Domains */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Focus <span className="text-emerald-400">Domains.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Master the critical areas recruiters focus on during Admin interviews.</p>
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
                    <CheckCircle2 size={14} className="text-emerald-500/60" />
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
            <span className="text-cyan-400">System Architect.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            The best Admins don't just know where the buttons are; they understand the "why" behind every configuration. ForcePilot AI evaluates your ability to balance security with usability.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-4xl font-black text-white">90%</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Efficiency Boost</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-white">2026</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ready Content</div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={20} />
            </div>
            <div className="text-sm font-bold text-white">Security Evaluation</div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 text-xs text-slate-400 leading-relaxed italic">
              "When asked about OWD, never start with code. Explain the default-deny principle first."
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
              Pro-Tip: Mention Permission Set Groups for scalability.
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center">
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Ready to Ace <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Your Admin Interview?
            </span>
          </h2>
          <div className="pt-8">
            <button
              onClick={() => navigate('/interview')}
              className="px-14 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center justify-center gap-4 mx-auto group"
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
          <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <Link to="/salesforce-mock-interview" className="hover:text-emerald-400 transition-colors">Mock Interview</Link>
          <Link to="/governor-limits-explained" className="hover:text-emerald-400 transition-colors">Governor Limits</Link>
        </div>
      </footer>
    </div>
  );
};

export default SalesforceAdminInterview;
