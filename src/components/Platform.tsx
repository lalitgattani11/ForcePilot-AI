import React from "react";
import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  Target, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Workflow, 
  LineChart, 
  Zap,
  CheckCircle2,
  Users,
  Code2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Platform: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const badgeAnimation = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      duration: 1.6, 
      ease: [0.23, 1, 0.32, 1],
    }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const capabilities = [
    {
      title: "AI Mock Interviews",
      description: "Voice-driven, realistic technical interviews that adapt to your responses in real-time.",
      icon: Zap,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Salesforce Role Intelligence",
      description: "Deep understanding of Salesforce-specific roles, from Admin to Architect.",
      icon: ShieldCheck,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    {
      title: "Technical Performance Analysis",
      description: "Granular breakdown of your technical accuracy, communication, and confidence.",
      icon: LineChart,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: "Interview Trends",
      description: "Identify patterns in your performance across multiple sessions to track growth.",
      icon: BrainCircuit,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      title: "Recruiter-Style Scoring",
      description: "Evaluations modeled after actual technical recruitment criteria at top companies.",
      icon: Target,
      color: "text-rose-400",
      bg: "bg-rose-500/10"
    },
    {
      title: "Session Archives",
      description: "Complete history of your interviews with detailed transcripts and feedback.",
      icon: Layers,
      color: "text-amber-400",
      bg: "bg-amber-500/10"
    }
  ];

  const builtFor = [
    {
      role: "Salesforce Admins",
      focus: "Configuration, Flows, Security, and Governance.",
      icon: Workflow
    },
    {
      role: "Apex Developers",
      focus: "Async processing, Triggers, Patterns, and Logic.",
      icon: Code2
    },
    {
      role: "LWC Developers",
      focus: "Reactive programming, DOM manipulation, and Performance.",
      icon: Terminal
    },
    {
      role: "Career Switchers",
      focus: "Foundational concepts and scenario-based thinking.",
      icon: Users
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={badgeAnimation} className="platform-pill-badge">
              <div className="dot" />
              <span className="label-text">The Intelligence Layer</span>
            </motion.div>
            <motion.h1 variants={fadeIn} className="platform-hero-title mb-4 sm:mb-8 lg:mb-8 max-w-[1500px] px-6 sm:px-2">
              <span className="block pb-1 sm:pb-3 overflow-visible">Recruiter-grade</span>
              <span className="block mt-2 sm:mt-8 md:mt-10 pb-[0.25em] overflow-visible text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
                Interview intelligence.
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="platform-sub-title mb-10 lg:mb-20 max-w-2xl px-4 sm:px-0">
              ForcePilot AI is the technical interview platform for the Salesforce ecosystem. 
              Built for precision, realism, and recruiter-level analysis.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Link to="/#setup" className="cta-button flex items-center gap-2">
                Start Interviewing <ArrowRight size={18} />
              </Link>
              <Link to="/career-roadmap" className="px-8 py-4 rounded-xl font-bold text-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center">
                View Roadmap
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Platform Purpose */}
      <section className="py-20 sm:py-32 border-t border-white/5 relative bg-[#02040a]/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="meta-label text-emerald-500 mb-6 lg:mb-10">Why ForcePilot AI</div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 lg:mb-8 tracking-tight leading-tight">
                Evaluations built on <br />
                <span className="text-slate-400">technical reasoning.</span>
              </h2>
              <div className="space-y-6 text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                <p>
                  Most mock interview platforms evaluate memorization through keyword matching. They often overlook the technical depth required of modern Salesforce professionals.
                </p>
                <p>
                  We built ForcePilot AI to prioritize technical reasoning and platform understanding—bridging the gap between theoretical knowledge and recruiter-level expectations.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-[4/3] rounded-[32px] overflow-hidden bg-white/[0.01] border border-white/10 p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />
              <div className="h-full w-full rounded-[28px] bg-[#02040a] flex flex-col p-8 overflow-hidden">
                {/* Authentic Interview Intelligence Visual */}
                <div className="flex flex-col h-full space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Interview Review</span>
                      <span className="text-[13px] font-bold text-white mt-1">Session #842 - Async Frameworks</span>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  
                  <div className="space-y-5 flex-grow">
                    <div className="space-y-2">
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-600">Candidate Response</div>
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[12px] text-slate-300 leading-relaxed italic">
                        "I used a Future method to handle the callout. It avoids the transaction limits and keeps the UI responsive..."
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-600">Coaching Insight</div>
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/10 relative overflow-hidden group">
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">Optimization Found</span>
                          </div>
                          <p className="text-[13px] text-white font-semibold leading-relaxed mb-3">
                            Prioritize Queueable over Future for complex logic.
                          </p>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            While Future works for simple callouts, Queueable allows for job chaining and superior heap limit management. Recruiters look for this distinction in Senior roles.
                          </p>
                        </div>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Zap size={40} className="text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 w-6 rounded-full bg-slate-800 border-2 border-[#02040a] flex items-center justify-center text-[8px] font-bold text-slate-400">
                          AI
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recruiter Intelligence Enabled</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Intelligence Philosophy */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16 sm:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="meta-label"
            >
              Philosophy
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            >
              Interview <span className="text-cyan-400">Intelligence.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Role-Aware Evaluation",
                desc: "The AI understands the difference between a Junior Admin and a Senior Architect, adjusting its criteria dynamically.",
                icon: Target
              },
              {
                title: "Concept-Based Scoring",
                desc: "We don't just look for keywords. We evaluate the underlying technical concepts and their application.",
                icon: BrainCircuit
              },
              {
                title: "Technical Correctness",
                desc: "Priority is given to technical accuracy and Salesforce Governor Limits awareness over stylistic polish.",
                icon: ShieldCheck
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl premium-card border border-white/5"
              >
                <item.icon className="text-cyan-400 mb-6" size={32} />
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Platform Capabilities */}
      <section className="py-20 sm:py-32 border-t border-white/5 bg-[#02040a]/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-12 sm:mb-20 text-center lg:text-left">
            <div className="meta-label">Capabilities</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Engineered for <br />
              <span className="text-slate-400 font-medium">performance.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
              >
                <div className={`h-12 w-12 rounded-2xl ${cap.bg} ${cap.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <cap.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{cap.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Built For */}
      <section className="py-20 sm:py-32 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 sm:mb-20">
            <div className="meta-label">Audience</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Built for Salesforce professionals.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {builtFor.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.08] transition-all"
              >
                <item.icon className="text-slate-400 mb-4 group-hover:text-emerald-400 transition-colors" size={24} />
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">{item.role}</h3>
                <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">{item.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Founder-Led Section */}
      <section className="py-20 sm:py-32 border-t border-white/5 bg-gradient-to-b from-transparent to-cyan-500/[0.02]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="premium-glass rounded-[2rem] sm:rounded-[32px] p-8 md:p-16 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <BrainCircuit size={120} className="text-cyan-500" />
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-cyan-400/80 mb-6 lg:mb-10">Founder-Led</div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 lg:mb-8 tracking-tight">
                Built for recruiter-grade <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  interview readiness.
                </span>
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed text-base sm:text-lg">
                <p>
                  ForcePilot AI was designed and developed by Lalit Maheshwari as a response to the lack of technically rigorous preparation tools for Salesforce professionals.
                </p>
                <p>
                  By focusing on intelligence rather than just interaction, the platform helps candidates bridge the gap between their daily experience and the expectations of top-tier technical recruiters.
                </p>
              </div>
              
              <div className="mt-10 lg:mt-12 pt-8 border-t border-white/5 inline-flex flex-col">
                <div className="text-white font-bold text-sm sm:text-base tracking-tight">Lalit Maheshwari</div>
                <div className="text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mt-1">Founder, ForcePilot AI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Closing Statement */}
      <section className="py-24 sm:py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
        <div className="max-w-[800px] mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight leading-tight">
            Elevate your technical <br />
            <span className="text-slate-400">interview readiness.</span>
          </h2>
          <Link to="/#setup" className="cta-button inline-flex items-center gap-2">
            Get Started Now <ArrowRight size={18} />
          </Link>
          <div className="mt-12 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
            <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Free Tier Available</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> No Card Required</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Platform;
