import React from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Database, 
  Zap, 
  BrainCircuit, 
  UserCheck, 
  LineChart, 
  ShieldCheck,
  ChevronRight,
  Code2,
  Workflow,
  Cpu,
  Search,
  Rocket,
  ShieldAlert
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const SalesforceMockInterview: React.FC = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const categories = [
    {
      title: "Apex Developer Interview",
      desc: "Triggers, Async Apex, Collections, and Integration patterns.",
      icon: Terminal,
      color: "emerald",
      slug: "Salesforce Apex Developer"
    },
    {
      title: "LWC Interview",
      desc: "Component lifecycle, Wire Service, LMS, and Shadow DOM.",
      icon: Layers,
      color: "cyan",
      slug: "Salesforce LWC Developer"
    },
    {
      title: "Salesforce Admin Interview",
      desc: "Security, Sharing, User Mgmt, and Data Modeling.",
      icon: UserCheck,
      color: "violet",
      slug: "Salesforce Admin"
    },
    {
      title: "Flow Automation Interview",
      desc: "Record-triggered flows, Subflows, and Optimization.",
      icon: Workflow,
      color: "amber",
      slug: "Salesforce Admin"
    },
    {
      title: "Trigger Scenario Interview",
      desc: "Complex logic, Reentrancy, and Bulkification scenarios.",
      icon: Code2,
      color: "rose",
      slug: "Salesforce Apex Developer"
    }
  ];

  const scenarios = [
    {
      title: "Trigger Bulkification Issue",
      context: "A trigger that works for single records but fails during Data Loader imports.",
      insight: "Focus on Set/Map collection patterns and eliminating SOQL in loops."
    },
    {
      title: "CPU Timeout Debugging",
      context: "Complex org with multiple managed packages and custom triggers causing limits to hit.",
      insight: "Analyzing transaction profiler and optimizing inefficient loops."
    },
    {
      title: "Sharing/Security Issue",
      context: "User can see records they shouldn't in a Private sharing model.",
      insight: "Evaluating 'with sharing' vs 'without sharing' and Manual/Apex sharing."
    },
    {
      title: "LWC Lifecycle Debugging",
      context: "Data is not rendering correctly after a child component update.",
      insight: "Understanding @track, @wire, and the connectedCallback sequence."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>Salesforce Mock Interview Platform 2026 | Apex, LWC & Admin Practice | ForcePilot AI</title>
        <meta
          name="description"
          content="Practice real Salesforce mock interviews with AI-powered recruiter-style evaluation for Apex, LWC, Flow, and Salesforce Admin interview preparation."
        />
        <meta name="keywords" content="salesforce mock interview, salesforce interview practice, apex mock interview, lwc interview questions, salesforce admin interview, salesforce ai interview" />
        <link rel="canonical" href="https://forcepilotai.online/salesforce-mock-interview" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce Mock Interview Platform 2026 | ForcePilot AI" />
        <meta property="og:description" content="Practice real Salesforce mock interviews with AI-powered recruiter-style evaluation for Apex, LWC, and Admin." />
        <meta property="og:url" content="https://forcepilotai.online/salesforce-mock-interview" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Salesforce Mock Interview Platform 2026 | ForcePilot AI" />
        <meta name="twitter:description" content="Master your Salesforce interview with AI-powered technical simulations." />
        <meta name="twitter:image" content="https://forcepilotai.online/pwa-512.png" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="relative text-center space-y-10 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2 text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase backdrop-blur-md mb-4"
        >
          <Zap size={14} className="animate-pulse" />
          <span>Next-Gen Interview Intelligence</span>
        </motion.div>
        
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
          Master your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
            Salesforce Mock Interview
          </span>
        </h1>
        
        <p className="text-sm sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal sm:font-medium">
          The elite technical simulator for SFDC professionals. Stop guessing. Start practicing with the platform that thinks like a Technical Architect.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link
            to="/#setup"
            className="w-full sm:w-auto px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Start Salesforce Mock Interview
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/apex-interview-questions"
            className="w-full sm:w-auto px-12 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 group"
          >
            Practice Apex Interviews
          </Link>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[120px] -z-10 rounded-full"></div>
      </section>

      {/* SECTION 2 — WHY FORCEPILOT AI */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Why <span className="text-emerald-400">ForcePilot AI?</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Engineered to simulate the intensity of Tier-1 Salesforce technical rounds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Adaptive AI Interviews",
              desc: "Questions evolve based on your technical depth. Show weakness in Async Apex? The AI digs deeper.",
              icon: BrainCircuit,
              color: "emerald"
            },
            {
              title: "Recruiter-Style Evaluation",
              desc: "Get scored on Technical Depth, Communication, and Solution Design just like a real panel review.",
              icon: LineChart,
              color: "cyan"
            },
            {
              title: "Salesforce Intelligence",
              desc: "Our engine is trained on thousands of enterprise scenarios, from CPQ to Shield and multi-org strategy.",
              icon: Database,
              color: "blue"
            },
            {
              title: "Comprehensive Coverage",
              desc: "Deep-dives into Apex, LWC, Flows, and Admin configurations with production-grade expectations.",
              icon: Layers,
              color: "violet"
            },
            {
              title: "Scenario-Based Logic",
              desc: "We don't just ask definitions. We present complex business problems that require architectural thinking.",
              icon: Code2,
              color: "rose"
            },
            {
              title: "Immediate Analytics",
              desc: "Identify your knowledge gaps instantly with detailed feedback on every response.",
              icon: ShieldCheck,
              color: "amber"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
            >
              <div className={`mb-6 inline-flex p-4 rounded-2xl bg-${item.color}-500/10 text-${item.color}-400 group-hover:scale-110 transition-transform`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — MOCK INTERVIEW CATEGORIES */}
      <section className="space-y-16">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 text-center md:text-left">
          <div className="space-y-4 w-full">
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Technical <span className="text-cyan-400">Tracks.</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto md:mx-0">Choose your specialization and start a targeted simulation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="group relative bg-[#0a0c10] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all cursor-pointer shadow-2xl"
              onClick={() => navigate('/#setup', { state: { role: cat.slug } })}
            >
              <div className="p-8 space-y-6">
                <div className={`w-14 h-14 rounded-2xl bg-${cat.color}-500/10 flex items-center justify-center text-${cat.color}-400 group-hover:scale-110 transition-transform`}>
                  <cat.icon size={30} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold uppercase tracking-widest text-cyan-500 gap-2">
                  Launch Track <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-${cat.color}-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — INTERVIEW PROCESS */}
      <section className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-8 sm:p-20 space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">The <span className="text-emerald-400">Experience.</span></h2>
          <p className="text-slate-500">How ForcePilot AI elevates your preparation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10"></div>

          {[
            { step: "01", title: "Select Role", desc: "Choose your target Salesforce position.", icon: UserCheck },
            { step: "02", title: "AI Dialogue", desc: "Adaptive questions asked in real-time.", icon: BrainCircuit },
            { step: "03", title: "Live Input", desc: "Answer verbally or via technical text.", icon: Terminal },
            { step: "04", title: "Neural Audit", desc: "AI evaluates every technical nuance.", icon: Search },
            { step: "05", title: "Evolution", desc: "Track progress and bridge gaps.", icon: LineChart }
          ].map((item, i) => (
            <div key={i} className="space-y-6 text-center lg:text-left group">
              <div className="w-20 h-20 rounded-3xl bg-[#0a0c10] border border-white/10 flex items-center justify-center mx-auto lg:mx-0 shadow-xl group-hover:border-emerald-500/40 transition-all">
                <span className="text-2xl font-black text-emerald-400">{item.step}</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — RECRUITER INTELLIGENCE */}
      <section className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
            Recruiter-Grade <br />
            <span className="text-emerald-400">Analytics.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Stop receiving generic feedback. ForcePilot AI provides a multidimensional breakdown of your technical persona, mirroring the internal scorecards used by Salesforce Partners and Fortune 500 recruiters.
          </p>

          <div className="space-y-6">
            {[
              { label: "Technical Depth Score", val: "94%", color: "emerald" },
              { label: "Communication Clarity", val: "88%", color: "cyan" },
              { label: "Architecture Thinking", val: "91%", color: "blue" },
              { label: "Governor Limits Awareness", val: "96%", color: "rose" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold tracking-widest uppercase">
                  <span className="text-slate-500">{stat.label}</span>
                  <span className={`text-${stat.color}-400`}>{stat.val}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: stat.val }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full bg-${stat.color}-500 shadow-[0_0_10px_rgba(var(--${stat.color}),0.5)]`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-slate-900 to-[#0a0c10] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Cpu size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Feedback Module</div>
                  <div className="text-white font-bold">Neural Evaluation #842</div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-tighter">Verified</div>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Architectural Strength</div>
                <p className="text-sm text-slate-400">Candidate demonstrated superior knowledge of Trigger Handler patterns and successfully identified the CPU timeout risk in the provided scenario.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-rose-500">Growth Opportunity</div>
                <p className="text-sm text-slate-400">While technically sound, the explanation of the LWC shadow DOM could be more concise for C-level stakeholders.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Verdict</div>
                  <div className="text-xl font-bold text-emerald-400 uppercase tracking-tight">Strong Hire</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Confidence</div>
                  <div className="text-xl font-bold text-white uppercase tracking-tight">High</div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl -z-10 opacity-50"></div>
        </div>
      </section>

      {/* SECTION 6 — SCENARIO QUESTIONS */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Scenario <span className="text-rose-400">Intelligence.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Real problems. Production-grade solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {scenarios.map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="bg-white/[0.01] border border-white/5 p-8 rounded-[2rem] space-y-4 hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                <div className="p-2 rounded-lg bg-white/5"><Code2 size={16} className="text-slate-500" /></div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{item.context}</p>
              <div className="pt-4 flex items-start gap-3">
                <div className="mt-1 h-4 w-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={10} className="text-emerald-400" />
                </div>
                <p className="text-xs font-medium text-emerald-400/80 leading-relaxed italic">{item.insight}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — INTERNAL SEO LINKS */}
      <nav className="grid sm:grid-cols-3 gap-6">
        {[
          { title: "Apex Questions", link: "/apex-interview-questions", color: "emerald", icon: Terminal },
          { title: "LWC Guide", link: "/lwc-interview-guide", color: "cyan", icon: Layers },
          { title: "Governor Limits", link: "/governor-limits-explained", color: "rose", icon: ShieldAlert }
        ].map((link, i) => (
          <Link 
            key={i}
            to={link.link}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-${link.color}-500/10 text-${link.color}-400 group-hover:scale-110 transition-transform`}>
                <link.icon size={20} />
              </div>
              <span className="font-bold text-white">{link.title}</span>
            </div>
            <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 group-hover:text-white transition-all" />
          </Link>
        ))}
      </nav>

      {/* SECTION 8 — FINAL CTA */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center">
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4 animate-bounce">
            <Rocket size={32} />
          </div>
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Stop Preparing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
              Start Executing.
            </span>
          </h2>
          <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">
            Your next Salesforce role is within reach. Give your technical confidence the elite upgrade it deserves.
          </p>
          <div className="pt-8">
            <Link
              to="/#setup"
              className="px-14 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center justify-center gap-4 mx-auto group active:scale-95"
            >
              Start Your Salesforce Mock Interview
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 -z-10"></div>
      </section>

      <footer className="text-center text-slate-600 text-sm py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. The elite technical simulator for Salesforce professionals.</p>
        <div className="flex gap-8">
          <Link to="/" className="hover:text-emerald-400 transition-colors font-bold">Home</Link>
          <Link to="/apex-interview-questions" className="hover:text-emerald-400 transition-colors font-bold">Apex</Link>
          <Link to="/lwc-interview-guide" className="hover:text-emerald-400 transition-colors font-bold">LWC</Link>
        </div>
      </footer>
    </div>
  );
};

export default SalesforceMockInterview;
