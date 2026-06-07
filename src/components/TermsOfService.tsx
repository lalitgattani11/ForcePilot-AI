import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Scale, Mail, Calendar, BookOpen, User, AlertTriangle, FileText, Info, Shield } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

const TermsOfService: React.FC = () => {
  const pageTitle = "Terms of Service | ForcePilot AI";
  const pageDescription = "Review the terms and conditions governing the use of ForcePilot AI and its Salesforce interview preparation services.";
  const canonicalUrl = "https://forcepilotai.online/terms";

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: Scale,
      content: (
        <p className="text-slate-300 leading-relaxed">
          By accessing, browsing, or utilizing the ForcePilot AI platform, services, and applications, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      )
    },
    {
      id: "purpose",
      title: "2. Platform Purpose",
      icon: BookOpen,
      content: (
        <p className="text-slate-300 leading-relaxed">
          ForcePilot AI is an advanced, AI-powered mock interview simulator specifically designed for the Salesforce ecosystem. The platform serves educational and interview preparation purposes, providing candidates with mock interview sessions, automated coaching evaluations, and technical scorecards to aid their learning and assessment.
        </p>
      )
    },
    {
      id: "responsibilities",
      title: "3. User Responsibilities",
      icon: User,
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-4">
            As a user of the platform, you agree to uphold standard professional conduct, which includes:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {[
              { label: "Provide Accurate Data", desc: "You must provide real, accurate, and up-to-date registration details." },
              { label: "Maintain Account Security", desc: "You are responsible for keeping credentials confidential and secure." },
              { label: "Use Platform Legally", desc: "All interaction with our AI simulator must comply with local and international laws." }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-semibold text-white text-sm block">{item.label}</span>
                <span className="text-slate-400 text-xs leading-relaxed">{item.desc}</span>
              </div>
            ))}
          </ul>
        </>
      )
    },
    {
      id: "prohibited",
      title: "4. Prohibited Activities",
      icon: AlertTriangle,
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-4">
            To maintain the integrity, security, and performance of our infrastructure, you agree not to engage in:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Abuse of Services", desc: "Flooding, DDOS attempts, or automated scripting that stresses our systems." },
              { title: "Unauthorized Access", desc: "Attempting to bypass authentication mechanisms or access other user records." },
              { title: "Reverse Engineering", desc: "Attempting to decompile, reverse engineer, or copy the platform logic." },
              { title: "Misuse of AI Systems", desc: "Injecting prompts designed to hijack or exploit the underlying language models." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start p-4 rounded-xl bg-rose-500/[0.02] border border-rose-500/5">
                <span className="h-2 w-2 rounded-full bg-rose-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    },
    {
      id: "ip",
      title: "5. Intellectual Property",
      icon: FileText,
      content: (
        <p className="text-slate-300 leading-relaxed">
          All materials, content, designs, logos, software, and proprietary AI scoring templates on the website are the exclusive intellectual property of ForcePilot AI. You may not distribute, reproduce, or modify any portion of our platform without explicit written authorization from ForcePilot AI.
        </p>
      )
    },
    {
      id: "termination",
      title: "6. Account Termination",
      icon: AlertTriangle,
      content: (
        <p className="text-slate-300 leading-relaxed">
          We reserve the right, without notice and at our sole discretion, to suspend or terminate your access to the platform for any breach of these Terms of Service, security violations, or fraudulent activity that threatens the safety or performance of ForcePilot AI.
        </p>
      )
    },
    {
      id: "disclaimer",
      title: "7. Disclaimer",
      icon: Info,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            ForcePilot AI provides educational tools, technical resources, and simulated mock interviews to help you prepare for recruiting evaluations.
          </p>
          <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Info size={40} className="text-cyan-400" />
            </div>
            <h4 className="text-white text-sm font-bold mb-2">No Guarantee of Employment Outcomes</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We make no representations or warranties regarding actual employment outcomes, job offers, or career advancement. Success in real-world interviews depends on a wide range of factors, including candidate credentials, communication styles, and interviewer criteria that lie completely outside our control.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "liability",
      title: "8. Limitation of Liability",
      icon: Shield,
      content: (
        <p className="text-slate-300 leading-relaxed">
          In no event shall ForcePilot AI, its owners, developers, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the platform, even if ForcePilot AI has been notified of the possibility of such damage.
        </p>
      )
    },
    {
      id: "contact",
      title: "9. Contact Information",
      icon: Mail,
      content: (
        <div className="p-6 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-white font-bold text-base">Questions about our terms?</h4>
            <p className="text-slate-400 text-xs sm:text-sm">Contact support for clarifications on platform policies or standard usage guidelines.</p>
          </div>
          <a
            href="mailto:support@forcepilotai.com"
            className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#02040a] rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Mail size={14} />
            support@forcepilotai.com
          </a>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12 sm:py-12 space-y-12 text-slate-300 antialiased">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" }
        ]}
        themeColor="cyan"
      />

      {/* Hero Section */}
      <section className="guide-hero-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="guide-hero-badge border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
        >
          <Scale size={14} className="animate-pulse" />
          <span>Legal Agreement</span>
        </motion.div>

        <h1 className="guide-hero-title">
          Terms of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Service
          </span>
        </h1>

        <p className="guide-hero-subtitle">
          Please review the terms and conditions governing your use of ForcePilot AI and its Salesforce mock interview preparation services before starting your sessions.
        </p>

        {/* Last Updated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 font-medium mt-2">
          <Calendar size={14} className="text-cyan-400" />
          <span>Last Updated: June 2026</span>
        </div>
      </section>

      {/* Main Grid: Sidebar Table of Contents + Reading Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block lg:col-span-1 sticky top-28 space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Sections</h3>
            <nav className="flex flex-col space-y-3">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-slate-400 hover:text-cyan-400 text-xs font-semibold tracking-wide transition-colors block cursor-pointer"
                >
                  {sec.title.split(" ").slice(1).join(" ")}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-12">
          {sections.map((sec) => (
            <motion.section
              key={sec.id}
              id={sec.id}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="premium-glass rounded-[2rem] p-6 sm:p-8 space-y-6 relative overflow-hidden"
            >
              {/* Left Accent Bar on sections */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <sec.icon size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {sec.title}
                </h2>
              </div>
              
              <div className="border-t border-white/[0.03] pt-6 text-sm sm:text-base leading-relaxed text-slate-300">
                {sec.content}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
