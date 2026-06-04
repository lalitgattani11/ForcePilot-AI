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
  AlertCircle,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useJsonLd } from "../hooks/useJsonLd";

const CareerRoadmap: React.FC = () => {
  const faqSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Salesforce Developer roadmap?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Salesforce Developer roadmap is a structured learning path that guides candidates from platform administrator configurations to advanced programmatic languages like Apex, LWC, and platform API integrations."
        }
      },
      {
        "@type": "Question",
        "name": "How can a fresher become a Salesforce Developer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Freshers should start by mastering standard database configurations (objects, fields, validation rules), transition to low-code flows, learn core programming logic via Java-like Apex, study reactive web designs via LWC, and build a GitHub portfolio showing real REST API integrations."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to learn Salesforce development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For candidates with standard programming knowledge, mastering Salesforce development takes 3 to 6 months of consistent study. This includes learning Apex syntax, LWC component architectures, and platform governor limits."
        }
      },
      {
        "@type": "Question",
        "name": "Are certifications enough to get a junior Salesforce Developer job?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, certifications are not enough. Recruiters look for hands-on playground configurations, GitHub repositories, and coding portfolios. A candidate who can explain trigger recursion or API callout constraints is preferred over someone with multiple certifications but no code examples."
        }
      },
      {
        "@type": "Question",
        "name": "How does ForcePilot AI accelerate career progression?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ForcePilot AI acts as a technical recruiter simulation engine. It dynamically audits your Apex, LWC, and Flow answers, helping you identify knowledge gaps and practice structural answers in real-time. Practice on our Salesforce Mock Interview Screen."
        }
      }
    ]
  }), []);

  const articleSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Salesforce Developer & Career Roadmap (2026)",
    "description": "Navigate your career path with our structured Salesforce developer roadmap. Learn how to become a Salesforce developer with detailed guides for freshers.",
    "image": "https://forcepilotai.online/pwa-512.png",
    "datePublished": "2026-03-05T08:00:00Z",
    "dateModified": "2026-06-03T12:00:00Z",
    "author": {
      "@type": "Person",
      "name": "Alex Rivera",
      "jobTitle": "Principal Salesforce Architect"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ForcePilot AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://forcepilotai.online/pwa-512.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://forcepilotai.online/career-roadmap"
    }
  }), []);

  useJsonLd(faqSchema, "schema-faq");
  useJsonLd(articleSchema, "schema-article");

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
    <div className="space-y-16 sm:space-y-24 pt-0 pb-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-300 antialiased">
      <Helmet>
        <title>Salesforce Developer & Career Roadmap (2026) | ForcePilot AI</title>
        <meta
          name="description"
          content="Navigate your career path with our structured Salesforce developer roadmap. Learn how to become a Salesforce developer with detailed guides for freshers."
        />
        <meta name="keywords" content="salesforce developer roadmap, how to become salesforce developer, salesforce career roadmap, salesforce roadmap for freshers, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/career-roadmap" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce Developer & Career Roadmap (2026) | ForcePilot AI" />
        <meta property="og:description" content="Navigate your career path with our structured Salesforce developer roadmap for freshers and admins." />
        <meta property="og:url" content="https://forcepilotai.online/career-roadmap" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
        
      </Helmet>

      {/* Hero Header */}
      <section className="guide-hero-section">
        <div className="guide-hero-badge border-emerald-500/20 bg-emerald-500/5 text-emerald-300">
          <Map size={14} className="text-emerald-400" />
          <span>Strategic Growth Framework</span>
        </div>
        <h1 className="guide-hero-title">
          Salesforce <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic">Career Roadmap</span>
        </h1>
        <p className="guide-hero-subtitle">
          Navigate your professional evolution with our structured salesforce career roadmap. Learn how to become a salesforce developer using our dedicated salesforce roadmap for freshers.
        </p>
      </section>

      {/* AI Overview & Quick Definitions Block */}
      <section className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
        <div className="space-y-2">
          <h2 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em]">
            AI Overview & Career Path Basics
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Core Salesforce trajectory insights optimized for automated scanners, search engines, and recruiters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* How to Become a Salesforce Developer? */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">How to Become a Salesforce Developer?</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To become a <strong>Salesforce Developer</strong>, candidates must transition from declarative administration to programmatic engineering. The career roadmap begins with mastering low-code tools like Flow Builder, followed by learning Apex (Salesforce's strongly typed, object-oriented OOP language), understanding multi-tenant Governor Limits, implementing Lightning Web Components (LWC), and adopting modern CI/CD DevOps workflows.
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-slate-900/30 border border-white/[0.03] p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strategic Milestones</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Admin Base:</strong> Master record sharing models, validation rules, Flow automations, and basic object design.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Developer Core:</strong> Write trigger handlers, build LWC interfaces, query via SOQL, and handle async processing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">•</span>
                <span><strong>Architect Horizon:</strong> Design multi-org environments, design integrations, and enforce system security.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison Block */}
        <div className="border-t border-white/[0.05] pt-6 space-y-4">
          <h3 className="text-base font-bold text-white">Salesforce Roles and Trajectories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900/20 border border-white/5 space-y-1">
              <span className="font-bold text-emerald-400">Salesforce Admin</span>
              <p className="text-slate-400 leading-relaxed">Manages users, designs fields, configures standard sharing, and builds declarative flows to solve business problems.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/20 border border-white/5 space-y-1">
              <span className="font-bold text-cyan-400">Salesforce Developer</span>
              <p className="text-slate-400 leading-relaxed">Writes Apex classes, triggers, Lightning Web Components, integrates APIs, and builds programmatic unit tests.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/20 border border-white/5 space-y-1">
              <span className="font-bold text-purple-400">Salesforce Architect</span>
              <p className="text-slate-400 leading-relaxed">Designs end-to-end system landscapes, outlines integration strategy, minimizes technical debt, and leads governance teams.</p>
            </div>
          </div>
        </div>
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
                <div className={`p-2 rounded-xl bg-slate-800 text-${p.color}-400`}>
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

      {/* Developer Growth Framework */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Developer <span className="text-emerald-400">Growth Framework</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The technical learning path for freshers and experienced engineers transitioning to Salesforce development.
          </p>
        </div>

        <div className="space-y-12">
          {/* 1. Salesforce Ecosystem Introduction */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400 whitespace-nowrap">01/</span> Salesforce Ecosystem Introduction
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Salesforce has evolved from a customer relationship management tool into a multi-cloud enterprise platform. In 2026, the ecosystem focuses heavily on unified profiles via Data Cloud, trusted AI agent architectures, and programmatic platform engineering. Freshers entering this space must understand the multi-tenant architecture: multiple customers share the same infrastructure, which is why Salesforce enforces strict execution boundaries.
            </p>
          </div>

          {/* 2. Admin vs Developer Career Paths */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400 whitespace-nowrap">02/</span> Admin vs Developer Career Paths
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The Salesforce ecosystem features two distinct primary career paths. The **Salesforce Administrator** path focuses on business logic configuration, security models, OWD sharing configurations, and low-code flow automations. The **Salesforce Developer** path focuses on software engineering: writing custom Apex triggers, developing reactive LWC user interfaces, and integrating external web services. Review the admin path in our <Link to="/salesforce-admin-interview" className="text-emerald-400 hover:underline">Salesforce Admin Guide</Link>.
            </p>
          </div>

          {/* 3. Apex Learning Roadmap */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400 whitespace-nowrap">03/</span> Apex Learning Roadmap
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Apex is Salesforce's strongly typed, object-oriented database language. A fresher's learning sequence should be: 1) Core syntax (variables, lists, loops). 2) SOQL/SOSL queries. 3) DML operations. 4) Trigger bulkification patterns (eliminating queries inside loops). 5) Asynchronous Apex (Future, Queueable, Batch). Check coding patterns in our <Link to="/apex-interview-questions" className="text-emerald-400 hover:underline">Apex Interview Questions Guide</Link>.
            </p>
          </div>

          {/* 4. LWC Learning Roadmap */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400 whitespace-nowrap">04/</span> Lightning Web Components (LWC) Roadmap
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              LWC is the modern frontend framework built on native web standards. To master LWC: 1) Core JavaScript (ES6+ modules, Promises, Array methods). 2) Reactivity model (using <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">@api</code> for public properties and <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">@track</code> for nested object reactivity). 3) Wire Service for cached data lookups. 4) Shadow DOM styling constraints and Custom Events. Find frontend guides in our <Link to="/lwc-interview-guide" className="text-emerald-400 hover:underline">LWC Interview Guide</Link>.
            </p>
          </div>

          {/* 5. Flow Automation Learning */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400 whitespace-nowrap">05/</span> Flow Automation Learning
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Before writing code, developers must understand the low-code alternatives. Salesforce Flow is the primary automation engine. Learning sequence: 1) Record-Triggered Flows (before-save for fast updates, after-save for actions). 2) Screen Flows for user-guided wizards. 3) Scheduled Flows for daily batch jobs. 4) Consolidating logic to prevent recursive trigger loops. Access flow tutorials in our <Link to="/salesforce-flow-interview-questions" className="text-emerald-400 hover:underline">Flow Automation Guide</Link>.
            </p>
          </div>

          {/* 6. Project Building Strategy */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400 whitespace-nowrap">06/</span> Project Building Strategy
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Do not just copy tutorial projects. Build real-world Salesforce solutions that prove architectural capability. Recommended project: Build a custom integration that calls a public REST API, processes the JSON response in Apex, stores data in custom records, and updates a reactive LWC dashboard. Commit all configurations and code to a clean, well-documented **GitHub Portfolio**.
            </p>
          </div>

          {/* 7. Certification Guidance */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400 whitespace-nowrap">07/</span> Certification Guidance
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Certifications validate baseline knowledge but over-certification without hands-on experience is a major red flag for recruiters. Prioritize certifications in this order: 1) Salesforce Administrator. 2) Platform Developer I (PD1). 3) Platform App Builder. 4) Platform Developer II (PD2). Focus on hands-on playground orgs rather than memorizing exam dumps.
            </p>
          </div>

          {/* 8. Resume & Interview Preparation */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400 whitespace-nowrap">08/</span> Resume & Interview Preparation
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your resume should highlight problem-solving results (e.g. "Optimized trigger handlers, reducing CPU timeouts by 40%") rather than listings of objects. To prepare for interviews, study governor limits exceptions, sharing settings exceptions, and LWC lifecycle methods. Practice technical conversations on our <Link to="/salesforce-mock-interview" className="text-emerald-400 hover:underline">Salesforce Mock Interview Screen</Link> to build confidence.
            </p>
          </div>

          {/* 9. Job Search Strategy */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400 whitespace-nowrap">09/</span> Job Search Strategy & Fresher Tips
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              To land junior roles or internships, freshers must show consistency. Network with Salesforce Partners, join local Trailblazer Community groups, and contribute to open-source Salesforce tools. Avoid common beginner mistakes like hardcoding record IDs in Apex, putting query selectors inside loops, or neglecting test coverage logic.
            </p>
          </div>
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

      {/* FAQ Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-emerald-500 pl-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                What is a Salesforce Developer roadmap?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              A Salesforce Developer roadmap is a structured learning path that guides candidates from platform administrator configurations to advanced programmatic languages like Apex, LWC, and platform API integrations.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                How can a fresher become a Salesforce Developer?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Freshers should start by mastering standard database configurations (objects, fields, validation rules), transition to low-code flows, learn core programming logic via Java-like Apex, study reactive web designs via LWC, and build a GitHub portfolio showing real REST API integrations.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                How long does it take to learn Salesforce development?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              For candidates with standard programming knowledge, mastering Salesforce development takes 3 to 6 months of consistent study. This includes learning Apex syntax, LWC component architectures, and platform governor limits.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                Are certifications enough to get a junior Salesforce Developer job?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              No, certifications are not enough. Recruiters look for hands-on playground configurations, GitHub repositories, and coding portfolios. A candidate who can explain trigger recursion or API callout constraints is preferred over someone with multiple certifications but no code examples.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                How does ForcePilot AI accelerate career progression?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              ForcePilot AI acts as a technical recruiter simulation engine. It dynamically audits your Apex, LWC, and Flow answers, helping you identify knowledge gaps and practice structural answers in real-time. Practice on our <Link to="/salesforce-mock-interview" className="text-emerald-400 hover:underline">Salesforce Mock Interview Screen</Link>.
            </div>
          </details>
        </div>
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

      {/* Recommended Next Topics */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            Recommended Next Topics
          </h2>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
            Continue Learning
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/interview-preparation-tips"
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-emerald-500/30 transition-all group flex flex-col justify-between h-40"
          >
            <div>
              <GraduationCap className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                Interview Preparation Tips
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                Master the SALO framework, behavioral answers, and scenario interview structures.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
              Explore Tips <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/salesforce-mock-interview"
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-emerald-500/30 transition-all group flex flex-col justify-between h-40"
          >
            <div>
              <Zap className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                Salesforce Mock Interview
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                Practice explaining your experience level, project designs, and platform architecture.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
              Practice Live <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/blog"
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-emerald-500/30 transition-all group flex flex-col justify-between h-40"
          >
            <div>
              <Rocket className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                ForcePilot AI Blog
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                Read deep-dives on LWC performance, Flow scenarios, and platform updates.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
              Read Articles <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
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
          </Link>
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
