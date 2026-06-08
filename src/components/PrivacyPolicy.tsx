import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Mail, Calendar, Server, Lock, UserCheck, Eye, Database } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

const PrivacyPolicy: React.FC = () => {
  const pageTitle = "Privacy Policy | ForcePilot AI";
  const pageDescription = "Learn how ForcePilot AI collects, uses, and protects your information while using our Salesforce AI mock interview platform.";
  const canonicalUrl = "https://forcepilotai.online/privacy";

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const sections = [
    {
      id: "collect",
      title: "1. Information We Collect",
      icon: Database,
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-4">
            We collect information that helps us provide, personalize, and improve your ForcePilot AI experience. This includes information you provide directly and data generated during your sessions:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[
              { label: "Name", desc: "Used for personalization and user communication." },
              { label: "Email Address", desc: "Primary identifier for account access and support." },
              { label: "Authentication Details", desc: "Credentials used to sign in and secure your account." },
              { label: "Interview History", desc: "Details of your technical Salesforce mock interviews." },
              { label: "Performance Analytics", desc: "Scores, evaluations, and metrics from your responses." },
              { label: "Usage Information", desc: "Log data, browser details, and interaction metrics." }
            ].map((item, idx) => (
              <li key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-semibold text-white text-sm block">{item.label}</span>
                <span className="text-slate-400 text-xs leading-relaxed">{item.desc}</span>
              </li>
            ))}
          </ul>
        </>
      )
    },
    {
      id: "use",
      title: "2. How We Use Information",
      icon: Eye,
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-4">
            The data we gather is used to deliver a technically rigorous, highly responsive mock interview simulator:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {[
              { title: "Account & Authentication", desc: "To create your account, manage access, and keep your session secure." },
              { title: "Personalized Interviewing", desc: "Adapting mock interviews dynamically to your targeted Salesforce role and experience level." },
              { title: "Performance Analytics", desc: "Generating granular, recruiter-style scorecards tracking your Apex, LWC, or Admin proficiency." },
              { title: "Platform Improvement", desc: "Refining our AI evaluation logic, fixing bugs, and improving UI responsiveness." },
              { title: "Customer Support", desc: "Responding to support inquiries, resolving technical problems, and collecting feedback." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start p-4 rounded-xl bg-white/[0.01] border border-white/5">
                <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
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
      id: "security",
      title: "3. Authentication and Security",
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            Security is built into our platform architecture. ForcePilot AI enforces secure authentication mechanisms to prevent unauthorized access, manipulation, or disclosure of candidate records.
          </p>
          <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Lock size={40} className="text-cyan-400" />
            </div>
            <h4 className="text-white text-sm font-bold mb-2">Powered by Supabase Authentication</h4>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We leverage Supabase authentication services to securely process and store login credentials. We employ industry-standard encryption, firewalls, and regular security reviews. However, no database, transmission system, or infrastructure is 100% secure. We encourage users to maintain password security and restrict access to their accounts.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "storage",
      title: "4. Data Storage",
      icon: Server,
      content: (
        <p className="text-slate-300 leading-relaxed">
          Your information is stored securely in robust cloud infrastructure providers. Your performance analytics, audio-to-text transcript data, and profile details are maintained only to supply platform functionality, power the historical trend charts on your dashboard, and allow you to share results with prospective recruiters.
        </p>
      )
    },
    {
      id: "thirdparty",
      title: "5. Third-Party Services",
      icon: Shield,
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-4">
            We partner with reliable third-party infrastructure and service providers to operate our platform. These processors access data only to execute tasks on our behalf:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Supabase", desc: "Database management, secure row-level storage, and auth sessions." },
              { name: "Google Auth", desc: "Single sign-on provider for frictionless candidate login." },
              { name: "Infrastructure Providers", desc: "Cloud servers, CDNs, and telemetry systems." }
            ].map((service, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-center sm:text-left">
                <span className="font-bold text-white text-sm block">{service.name}</span>
                <span className="text-slate-400 text-xs leading-relaxed">{service.desc}</span>
              </div>
            ))}
          </div>
        </>
      )
    },
    {
      id: "rights",
      title: "6. User Rights",
      icon: UserCheck,
      content: (
        <>
          <p className="text-slate-300 leading-relaxed mb-4">
            We believe in giving you absolute transparency and control over your technical history. You have the following rights regarding your information:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Access Account Data", desc: "Request a copy of the information we store about your profile and interviews." },
              { title: "Request Correction", desc: "Update inaccurate email addresses, names, or basic settings." },
              { title: "Request Deletion", desc: "Permanently delete your profile and all associated interview logs." }
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    },
    {
      id: "contact",
      title: "7. Contact Information",
      icon: Mail,
      content: (
        <div className="p-6 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-white font-bold text-base">Questions about our privacy practices?</h4>
            <p className="text-slate-400 text-xs sm:text-sm">Reach out to our privacy compliance team for details or data removal requests.</p>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12 sm:pb-12 space-y-12 text-slate-300 antialiased">
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
          { name: "Privacy Policy", path: "/privacy" }
        ]}
        themeColor="cyan"
      />

      {/* Hero Section */}
      <section className="guide-hero-section">
        <div className="guide-hero-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="guide-hero-badge border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
          >
            <Shield size={14} className="animate-pulse" />
            <span>Security & Compliance</span>
          </motion.div>

          <h1 className="guide-hero-title">
            Privacy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Policy
            </span>
          </h1>

          <p className="guide-hero-subtitle">
            At ForcePilot AI, privacy is a fundamental component of our system design. We are committed to protecting the candidate credentials, interview transcripts, and performance analytics generated during your sessions.
          </p>

          {/* Last Updated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 font-medium mt-2">
            <Calendar size={14} className="text-cyan-400" />
            <span>Last Updated: June 2026</span>
          </div>
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

export default PrivacyPolicy;
