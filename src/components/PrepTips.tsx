import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Rocket, 
  Target, 
  CheckCircle2, 
  MessageSquare, 
  Zap,
  Brain,
  AlertCircle,
  ShieldCheck,
  Star,
  Users,
  ChevronDown,
  ChevronRight,
  Layout,
  Terminal,
  Search
} from "lucide-react";
import { Helmet } from "react-helmet-async";

interface QuestionItem {
  title: string;
  desc: React.ReactNode;
  icon: React.ComponentType<any>;
  color: string;
}

interface QuestionSection {
  title: string;
  items: QuestionItem[];
}

const PrepTips: React.FC = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are the best Salesforce interview preparation tips?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Focus on explaining project architectures using structured frameworks (like SALO), prepare for scenario-based governor limits checks, review core sharing rules, build a clean GitHub portfolio, and run simulated sessions to evaluate technical answers."
                }
              },
              {
                "@type": "Question",
                "name": "How should I prepare for a Salesforce Developer interview?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Developers must master Apex bulkification (preventing SOQL queries inside loops), transaction boundaries, asynchronous executions (Queueable classes, Batch Apex, and Future methods), and LWC reactivity models."
                }
              },
              {
                "@type": "Question",
                "name": "What is the SALO framework?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SALO stands for Situation, Action, Logic, and Outcome. It is a mental model that prompt candidates to explain the 'Logic' (the technical why) behind architectural and coding choices rather than just stating actions."
                }
              },
              {
                "@type": "Question",
                "name": "How do I handle behavioral interview questions in Salesforce rounds?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Structure your answers around project collaboration, managing conflicting stakeholder requirements, resolving production issues under pressure, and explaining technical limitations to non-technical users."
                }
              },
              {
                "@type": "Question",
                "name": "How does ForcePilot AI help prepare for interviews?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ForcePilot AI generates technical mock interviews, provides immediate verbal/text assessments, checks DML and query optimizations, and outputs multidimensional scorecards mapping your progression against top platform developers."
                }
              }
            ]
          });
    document.head.appendChild(script);

    const articleScript = document.createElement("script");
    articleScript.type = "application/ld+json";
    articleScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Salesforce Interview Preparation Tips Guide (2026)",
      "description": "Master your technical interview with our salesforce interview preparation tips. Learn how to prepare for salesforce developer, admin, and architect interviews.",
      "image": "https://forcepilotai.online/pwa-512.png",
      "datePublished": "2026-04-12T08:00:00Z",
      "dateModified": "2026-06-03T12:00:00Z",
      "author": {
        "@type": "Person",
        "name": "Marcus Chen",
        "jobTitle": "Lead LWC Engineer"
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
        "@id": "https://forcepilotai.online/interview-preparation-tips"
      }
    });
    document.head.appendChild(articleScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(articleScript);
    };
  }, []);

  const categories = [
    {
      title: "Mindset & Strategy",
      icon: Brain,
      color: "emerald",
      tips: [
        "Treat the simulation like a final-round interview.",
        "Take 2 seconds to structure your thoughts before speaking.",
        "Focus on practical scenarios, not just definitions.",
        "Maintain a growth mindset — every feedback is an asset."
      ]
    },
    {
      title: "Technical Delivery",
      icon: ShieldCheck,
      color: "cyan",
      tips: [
        "Explain the 'Why' before the 'How' for architectural clarity.",
        "Use Salesforce-standard terminology consistently.",
        "Be specific about governor limits and bulkification.",
        "Mention real-world trade-offs in your design decisions."
      ]
    },
    {
      title: "Communication Mastery",
      icon: MessageSquare,
      color: "purple",
      tips: [
        "Use the SALO method for scenario-based questions.",
        "Keep your answers concise but logically dense.",
        "Vary your tone to emphasize critical technical points.",
        "Speak with conviction — you are the subject matter expert."
      ]
    }
  ];

  const frameworks = [
    {
      title: "The SALO Framework",
      desc: "Situation, Action, Logic, Outcome. Move beyond STAR by explicitly explaining the 'Logic' behind your technical choices. This is what separates Senior candidates.",
      steps: ["Situation: Context of the problem", "Action: Specific steps taken", "Logic: Why you chose that path", "Outcome: Quantifiable results"]
    },
    {
      title: "The Scale Filter",
      desc: "Before finalizing any technical answer, run it through the 'Scale Filter'. How does this solution behave with 1 million records? How does it impact CPU time?",
      steps: ["Data Volume check", "Governor Limit impact", "Async potential", "Concurrency handling"]
    }
  ];

  const pacingTips = [
    { label: "The 5-Second Rule", desc: "Silently count to 5 before answering complex architectural questions. It signals deep thought, not hesitation." },
    { label: "Structured Pausing", desc: "Pause after stating a critical technical decision to allow the interviewer (or AI) to process the weight of the choice." },
    { label: "Verbal Signaling", desc: "Use phrases like 'Let's look at this from a scalability perspective' to guide the flow of the technical review." }
  ];

  const checklist = [
    "Stable internet connection and quiet environment",
    "Functional microphone for high-fidelity AI analysis",
    "Familiarity with the chosen role (Admin/Dev/LWC)",
    "Ready to articulate technical logic clearly",
    "Openness to detailed AI-driven constructive criticism"
  ];

  const prepSections: QuestionSection[] = [
    {
      title: "Recruiter-Grade Prep Strategies",
      items: [
        {
          title: "Resume Preparation Tips",
          desc: (
            <span>
              Format your experience around architectural impact. Instead of listing basic objects, highlight database optimization results: <em>"Optimized custom triggers, reducing CPU timeouts by 35%."</em> Add your clean GitHub portfolio link directly on the header.
            </span>
          ),
          icon: Layout,
          color: "emerald"
        },
        {
          title: "Salesforce Project Preparation",
          desc: (
            <span>
              When explaining projects, outline integration topology, API authentication models, and data synchronization patterns. Detail the trade-offs of low-code configurations like flows vs custom Apex triggers. Learn more on our <Link to="/apex-trigger-interview-questions" className="text-cyan-400 hover:underline">Apex Trigger Guide</Link>.
            </span>
          ),
          icon: Terminal,
          color: "violet"
        },
        {
          title: "Technical Revision Strategy",
          desc: (
            <span>
              Allocate revision time targeting platform core limits, transaction save order sequences, and asynchronous executions. Study these boundaries in our <Link to="/governor-limits-explained" className="text-cyan-400 hover:underline">Governor Limits Explained Guide</Link>.
            </span>
          ),
          icon: Search,
          color: "rose"
        },
        {
          title: "Scenario Question Preparation",
          desc: (
            <span>
              Recruiters test your limits via scenario questions (e.g. mixed DML exceptions, loop queries, data pagination lag). Study scenario patterns on our <Link to="/scenario-based-salesforce-interview" className="text-cyan-400 hover:underline">Scenario Interview Page</Link> and <Link to="/lwc-interview-guide" className="text-cyan-400 hover:underline">LWC Guide</Link>.
            </span>
          ),
          icon: ShieldAlert,
          color: "blue"
        },
        {
          title: "Communication & Confidence Tips",
          desc: (
            <span>
              If you don't know the answer, explain your logical debugging process rather than guessing. Discuss checking debug logs, running Query Plan tests, or referencing documentation to demonstrate platform maturity.
            </span>
          ),
          icon: MessageSquare,
          color: "purple"
        },
        {
          title: "Mock Interview Strategy",
          desc: (
            <span>
              Test your logic using specialized mock simulators. AI mock platforms evaluate technical depth, confidence, and limit compliance. Initiate a simulation on our <Link to="/salesforce-mock-interview" className="text-cyan-400 hover:underline">Salesforce Mock Interview Screen</Link>.
            </span>
          ),
          icon: Zap,
          color: "amber"
        },
        {
          title: "Common Interview Mistakes",
          desc: (
            <span>
              Avoid common beginner mistakes like hardcoding Salesforce record IDs, placing queries or DML statements inside loop iterations, or failing to mention mock stubs when writing test classes. Study progression stages on our <Link to="/career-roadmap" className="text-cyan-400 hover:underline">Career Roadmap Page</Link>.
            </span>
          ),
          icon: AlertCircle,
          color: "rose"
        },
        {
          title: "Interview Day Preparation",
          desc: (
            <span>
              Perform environmental audio checks, secure a high-speed connection, open your local developer console for code scratchpad routing, and read your portfolio project architectures before the session.
            </span>
          ),
          icon: ShieldCheck,
          color: "emerald"
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-24 text-slate-300 antialiased">
      <Helmet>
        <title>Salesforce Interview Preparation Tips Guide (2026) | ForcePilot AI</title>
        <meta
          name="description"
          content="Master your technical interview with our salesforce interview preparation tips. Learn how to prepare for salesforce developer, admin, and architect interviews."
        />
        <meta name="keywords" content="salesforce interview preparation tips, how to prepare for salesforce interview, salesforce interview tips, salesforce developer interview preparation, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/interview-preparation-tips" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce Interview Preparation Tips Guide (2026) | ForcePilot AI" />
        <meta property="og:description" content="Master your technical interview with our salesforce interview preparation tips and mental frameworks." />
        <meta property="og:url" content="https://forcepilotai.online/interview-preparation-tips" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
        
      </Helmet>

      {/* Hero Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4 sm:px-0">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-sm mb-4">
          <Star size={14} className="text-purple-400" />
          Elite Preparation Framework
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-[1.1]">
          Interview <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 italic">
            Preparation Tips
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Maximize your performance with our salesforce interview preparation tips. Learn how to prepare for salesforce developer interview rounds using recruiter-ready structures.
        </p>
      </section>

      {/* Strategy Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-950/20 border border-white/5 relative group overflow-hidden"
          >
            <div className="space-y-6 sm:space-y-8 relative z-10">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-${cat.color}-500/10 border border-${cat.color}-500/20 flex items-center justify-center text-${cat.color}-400`}>
                <cat.icon size={24} className="sm:w-7 sm:h-7" />
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{cat.title}</h2>
              
              <ul className="space-y-5">
                {cat.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 size={16} className={`mt-1 text-${cat.color}-500 shrink-0`} />
                    <p className="text-xs sm:text-[13px] text-slate-400 font-medium leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 bg-${cat.color}-500/5 blur-[60px] rounded-full`} />
          </motion.div>
        ))}
      </section>

      {/* Structured Content Sections */}
      <section className="space-y-16">
        {prepSections.map((section, idx) => (
          <div key={idx} className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Preparation <span className="text-emerald-400">Pillars.</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Master the key preparation topics that top candidates focus on.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.items.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-4 hover:bg-white/[0.03] transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-${item.color}-500/10 text-${item.color}-400`}>
                      <item.icon size={22} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Frameworks Section */}
      <section className="space-y-10 sm:space-y-12">
         <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">Strategic Frameworks</h2>
            <p className="text-slate-400 text-xs sm:text-base font-medium italic">Mental models used by CTA candidates.</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {frameworks.map((f, i) => (
               <div key={i} className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-white/[0.01] border border-white/5 space-y-6 sm:space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <Target size={100} className="text-emerald-500 sm:w-32 sm:h-32" />
                  </div>
                  <div className="relative z-10 space-y-6">
                     <h3 className="text-xl sm:text-2xl font-black text-white italic">{f.title}</h3>
                     <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">{f.desc}</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {f.steps.map((step, idx) => (
                           <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-bold text-slate-300">
                              <span className="text-emerald-500 font-black">0{idx + 1}</span> {step}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Pro Tips Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="premium-glass p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-emerald-500/10 bg-emerald-500/[0.01] flex flex-col justify-center space-y-6">
           <div className="flex items-center gap-3 text-emerald-400">
             <Zap size={20} className="sm:w-6 sm:h-6" />
             <span className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em]">The "Power Move" Strategy</span>
           </div>
           <h2 className="text-xl sm:text-2xl font-black text-white italic">Explain trade-offs automatically.</h2>
           <p className="text-slate-400 text-sm leading-relaxed font-medium">
             Don't just provide a solution. Explain why you chose it over an alternative. Show how you balance technical debt with business velocity.
           </p>
        </div>

        <div className="premium-glass p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-rose-500/10 bg-rose-500/[0.01] flex flex-col justify-center space-y-6">
           <div className="flex items-center gap-3 text-rose-400">
             <AlertCircle size={20} className="sm:w-6 sm:h-6" />
             <span className="text-[9px] sm:text-xs font-black uppercase tracking-[0.2em]">Common Failure Pattern</span>
           </div>
           <h2 className="text-xl sm:text-2xl font-black text-white italic">The "Definition Trap".</h2>
           <p className="text-slate-400 text-sm leading-relaxed font-medium">
             Avoid just reciting definitions. Describe a real scenario where you solved a business problem, showing limits awareness.
           </p>
        </div>
      </section>

      {/* Pacing & Delivery */}
      <section className="space-y-10 sm:space-y-12">
         <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">Strategic Pacing</h2>
            <p className="text-slate-400 text-xs sm:text-base font-medium">Controlling the technical dialogue for maximum impact.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {pacingTips.map((tip, i) => (
               <div key={i} className="p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-950/40 border border-white/5 space-y-3 sm:space-y-4">
                  <div className="text-cyan-400 font-black text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em]">{tip.label}</div>
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed font-medium">{tip.desc}</p>
               </div>
            ))}
         </div>
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
                What are the best Salesforce interview preparation tips?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Focus on explaining project architectures using structured frameworks (like SALO), prepare for scenario-based governor limits checks, review core sharing rules, build a clean GitHub portfolio, and run simulated sessions to evaluate technical answers.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                How should I prepare for a Salesforce Developer interview?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Developers must master Apex bulkification (preventing SOQL queries inside loops), transaction boundaries, asynchronous executions (Queueable classes, Batch Apex, and Future methods), and LWC reactivity models.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                What is the SALO framework?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              SALO stands for Situation, Action, Logic, and Outcome. It is a mental model that prompt candidates to explain the "Logic" (the technical why) behind architectural and coding choices rather than just stating actions.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                How do I handle behavioral interview questions in Salesforce rounds?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Structure your answers around project collaboration, managing conflicting stakeholder requirements, resolving production issues under pressure, and explaining technical limitations to non-technical users.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                How does ForcePilot AI help prepare for interviews?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              ForcePilot AI generates technical mock interviews, provides immediate verbal/text assessments, checks DML and query optimizations, and outputs multidimensional scorecards mapping your progression against top platform developers.
            </div>
          </details>
        </div>
      </section>

      {/* Checklist */}
      <section className="relative p-6 sm:p-20 rounded-[2.5rem] sm:rounded-[4rem] bg-slate-950/40 border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">Final Session Checklist</h2>
            <p className="text-slate-400 text-xs sm:text-base font-medium italic">Ensure you are optimized for high-fidelity gathering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-5 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-3xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.05] transition-all">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-black text-[10px] sm:text-xs shrink-0">
                  {i + 1}
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Next Topics */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            Continue Learning
          </h2>
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/10">
            Next Steps
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/career-roadmap"
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-purple-500/30 transition-all group flex flex-col justify-between h-40"
          >
            <div>
              <Target className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                Salesforce Career Roadmap
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                Chart your career progression path and acquire critical programmatic skills.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
              Explore Roadmap <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/governor-limits-explained"
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-purple-500/30 transition-all group flex flex-col justify-between h-40"
          >
            <div>
              <ShieldCheck className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                Governor Limits Explained
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                Deep-dive into Salesforce platform quotas, synchronous execution limits, and CPU time.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
              Explore Limits <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/salesforce-flow-interview-questions"
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-purple-500/30 transition-all group flex flex-col justify-between h-40"
          >
            <div>
              <Rocket className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                Salesforce Flow Questions
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                Practice advanced automation scenario queries, fault paths, and flow design patterns.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
              Explore Guide <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-12 space-y-6">
        <div className="flex justify-center gap-4">
          <Users size={24} className="text-slate-700" />
          <Target size={24} className="text-emerald-500/50" />
          <Rocket size={24} className="text-slate-700" />
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Join the top 1% of Salesforce technical performers.
        </p>
      </section>
    </div>
  );
};

const ShieldAlert = ({ size, className }: { size?: number, className?: string }) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default PrepTips;
