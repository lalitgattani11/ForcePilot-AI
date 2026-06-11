import React from 'react';
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  
  Database,
  Timer,
  BarChart3,
  HardDrive,
  Workflow,
  ChevronDown,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from './Breadcrumbs';
import { useJsonLd } from "../hooks/useJsonLd";
import { 
  fadeIn, 
  revealFadeUp, 
  badgeAnimation, 
  staggerContainer, 
  revealStaggerContainer 
} from "../utils/animations";

const GovernorLimitsExplained: React.FC = () => {
  const faqSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a transaction boundary in Salesforce?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A transaction boundary defines the lifetime of a single execution block. A transaction begins when an event occurs (such as a user DML save, a flow trigger, or an API callout) and ends when all downstream validation rules, database triggers, and commits complete. Governor limits are reset at each new transaction boundary."
        }
      },
      {
        "@type": "Question",
        "name": "Why does Salesforce enforce Governor Limits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Salesforce is built on a multi-tenant architecture, meaning multiple customer orgs (tenants) share physical hardware, memory, and database servers. Governor limits ensure that a single tenant's poorly optimized script cannot monopolize system resource pools, guaranteeing platform stability for all."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between synchronous and asynchronous limits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Synchronous tasks execute immediately, blocking user threads and enforcing tighter limits (100 SOQL queries, 10s CPU, 6 MB heap). Asynchronous tasks (Queueables, Batch Apex, @future calls) run in the background, allowing Salesforce to schedule resource usage. This grants higher thresholds (200 SOQL queries, 60s CPU, 12 MB heap)."
        }
      },
      {
        "@type": "Question",
        "name": "How do you resolve a System.LimitException: Too many SOQL queries: 101 error?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This exception is triggered when SOQL queries are placed inside loop statements. To resolve it, gather the query parameters in a Set, execute a single bulk SOQL query outside the loop, and load the results into a Map. This allows retrieving data inside loops in-memory without making additional database calls."
        }
      },
      {
        "@type": "Question",
        "name": "How does ForcePilot AI help developers master limits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ForcePilot AI evaluates coding submissions, trigger architecture choices, and async configurations, advising on bulk-safe compliance. Developers can test their skills in real time on our interactive Salesforce Mock Interview simulator."
        }
      }
    ]
  }), []);

  const articleSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Salesforce Governor Limits Explained Guide (2026)",
    "description": "Master Salesforce Governor Limits for your developer interview. Technical deep-dives into synchronous vs asynchronous limits, CPU time, heap size, and bulkification.",
    "image": "https://forcepilotai.online/pwa-512.png",
    "datePublished": "2026-01-15T08:00:00Z",
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
      "@id": "https://forcepilotai.online/governor-limits-explained"
    }
  }), []);

  useJsonLd(faqSchema, "schema-faq");
  useJsonLd(articleSchema, "schema-article");

  const limits = [
    {
      icon: Database,
      name: "SOQL Queries",
      sync: "100",
      async: "200",
      desc: "Total number of SOQL queries issued in a single transaction."
    },
    {
      icon: HardDrive,
      name: "DML Statements",
      sync: "150",
      async: "150",
      desc: "Total number of DML statements (insert, update, delete, etc.) issued."
    },
    {
      icon: Timer,
      name: "CPU Time",
      sync: "10,000 ms",
      async: "60,000 ms",
      desc: "Maximum CPU time on the Salesforce servers."
    },
    {
      icon: BarChart3,
      name: "Heap Size",
      sync: "6 MB",
      async: "12 MB",
      desc: "Maximum amount of memory occupied by objects at any point."
    }
  ];

  return (
    <div className="text-slate-300 antialiased relative overflow-hidden">
      <Helmet>
        <title>Salesforce Governor Limits Explained Guide (2026) | ForcePilot AI</title>
        <meta name="description" content="Master Salesforce Governor Limits for your developer interview. Technical deep-dives into synchronous vs asynchronous limits, CPU time, heap size, and bulkification." />
        <meta name="keywords" content="salesforce governor limits, apex governor limits, governor limits explained, salesforce limits interview questions, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/governor-limits-explained" />
        <meta property="og:title" content="Salesforce Governor Limits Explained Guide (2026) | ForcePilot AI" />
        <meta property="og:description" content="Master Salesforce Governor Limits for your developer interview. Study synchronous vs asynchronous limits, CPU time, and heap size." />
        <meta property="og:url" content="https://forcepilotai.online/governor-limits-explained" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        
      </Helmet>

      {/* Hero Section */}
      <section className="guide-hero-section border-b border-white/5">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={badgeAnimation} className="platform-pill-badge">
            <div className="dot" />
            <span className="label-text">Multi-Tenant Architecture</span>
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="guide-hero-title">
            <span className="block pb-1 sm:pb-2 overflow-visible">Salesforce Governor</span>
            <span className="block mt-1 sm:mt-2 md:mt-2.5 pb-[0.25em] overflow-visible text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              Limits Explained
            </span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="guide-hero-subtitle">
            The non-negotiable rules of the Salesforce platform. Master apex governor limits and prepare for salesforce limits interview questions with our architect-grade guide.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 sm:mb-0">
            <Link 
              to="/#setup"
              state={{ role: "Salesforce Apex Developer" }}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold text-base sm:text-lg transition-all shadow-[0_0_40px_rgba(244,63,94,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
            >
              Practice Limit Management
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform sm:size-[22px]"
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 space-y-16 sm:space-y-24 pb-8 sm:pb-12">
        <Breadcrumbs 
          hideVisual
          items={[
            { name: "Home", path: "/" },
            { name: "Interview Guides", path: "/blog" },
            { name: "Governor Limits", path: "/governor-limits-explained" }
          ]} 
          themeColor="rose"
        />

        {/* Internal Navigation */}
      <motion.nav 
        variants={revealStaggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 gap-4"
      >
        <motion.div variants={revealFadeUp}>
          <Link to="/apex-interview-questions" className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group h-full">
            <div>
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Apply Knowledge</div>
              <div className="text-white font-semibold">Apex Interview Questions</div>
            </div>
            <ChevronRight size={18} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
          </Link>
        </motion.div>
        <motion.div variants={revealFadeUp}>
          <Link to="/lwc-interview-guide" className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group h-full">
            <div>
              <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1">Frontend Focus</div>
              <div className="text-white font-semibold">LWC Interview Guide</div>
            </div>
            <ChevronRight size={18} className="text-slate-600 group-hover:text-cyan-500 transition-colors" />
          </Link>
        </motion.div>
      </motion.nav>

      {/* AI Overview & Quick Definitions Block */}
      <motion.section 
        variants={revealFadeUp}
        className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />
        <div className="space-y-2">
          <h2 className="text-xs font-black text-rose-400 uppercase tracking-[0.2em]">
            AI Overview & Guardrail Basics
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Essential concepts summarized for automated answering systems and recruiters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What are Governor Limits? */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">What are Salesforce Governor Limits?</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong>Salesforce Governor Limits</strong> are hard execution bounds enforced by the multitenant architecture. Because resources like memory, CPU, and database pools are shared among all customers (tenants) on a single server, these limits prevent a single customer's inefficient code from degrading performance for others. If a limit is breached, the entire transaction is immediately rolled back with a <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">LimitException</code>.
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="bg-slate-900/30 border border-white/[0.03] p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Limit Guardrails</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">•</span>
                <span><strong>SOQL limit:</strong> Max 100 synchronous queries / 200 asynchronous queries per transaction.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">•</span>
                <span><strong>DML limit:</strong> Max 150 DML statements per transaction, processing up to 10,000 records total.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-1">•</span>
                <span><strong>CPU time:</strong> Max 10 seconds synchronous / 60 seconds asynchronous before timeout.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison Block */}
        <div className="border-t border-white/[0.05] pt-6 space-y-4">
          <h3 className="text-base font-bold text-white">Synchronous vs. Asynchronous Limits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900/20 border border-white/5 space-y-1">
              <span className="font-bold text-rose-400">Synchronous Execution</span>
              <p className="text-slate-400 leading-relaxed">Processes immediately. Enforces a 6 MB heap size limit, 10-second CPU time, and a 100 SOQL query threshold.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/20 border border-white/5 space-y-1">
              <span className="font-bold text-orange-400">Asynchronous Execution</span>
              <p className="text-slate-400 leading-relaxed">Runs in background. Doubles limits to a 12 MB heap size, 60-second CPU time, and a 200 SOQL query threshold.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Limits Grid */}
      <motion.section 
        variants={revealStaggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="space-y-12"
      >
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-rose-500 pl-4">
          Core Transaction Limits
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {limits.map((limit, i) => (
            <motion.div 
              key={i} 
              variants={revealFadeUp}
              className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                  <limit.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{limit.name}</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{limit.desc}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Synchronous</div>
                  <div className="text-white font-mono">{limit.sync}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Asynchronous</div>
                  <div className="text-white font-mono">{limit.async}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Structured Educational Content Sections */}
      <section className="space-y-16">
        <motion.div 
          variants={revealFadeUp}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold text-white tracking-tight border-l-4 border-rose-500 pl-4">
            Technical Breakdowns
          </h2>
          <p className="text-slate-400 max-w-3xl">
            A comprehensive look at how each limit operates, the standard Exception causes, and how to avoid them in production code.
          </p>
        </motion.div>

        <div className="space-y-16">
          {[
            {
              title: "SOQL Limits",
              icon: Database,
              content: (
                <p className="text-slate-400 leading-relaxed text-sm">
                  Salesforce enforces a maximum of <strong>100 synchronous SOQL queries</strong> per transaction (relaxed to <strong>200 queries</strong> in asynchronous contexts). If your execution path makes more queries, the platform aborts execution with a <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">System.LimitException: Too many SOQL queries: 101</code>. To optimize queries, minimize field selections, use indexing, and leverage parent-child relationships instead of issuing separate subqueries. See our <Link to="/apex-interview-questions" className="text-rose-400 hover:underline">Apex Interview Questions</Link> for detailed query mapping examples.
                </p>
              )
            },
            {
              title: "DML Limits",
              icon: HardDrive,
              content: (
                <p className="text-slate-400 leading-relaxed text-sm">
                  A single transaction is limited to <strong>150 DML statements</strong> (insert, update, delete, upsert, undelete, merge) and a total of <strong>10,000 processed records</strong>. Exceeding this boundary throws <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">System.LimitException: Too many DML statements: 151</code>. To preserve database resource cycles, never execute DML operations inside loops. Always collect modified sObjects in a list and perform one database commit.
                </p>
              )
            },
            {
              title: "CPU Time Limits",
              icon: Timer,
              content: (
                <p className="text-slate-400 leading-relaxed text-sm">
                  Salesforce limits CPU time to <strong>10 seconds (10,000 ms)</strong> for synchronous runs and <strong>60 seconds (60,000 ms)</strong> for asynchronous paths. CPU time comprises Apex calculations, formula evaluations, and trigger handlers, but excludes database processing time and HTTP callout wait times. To optimize CPU usage, avoid nested loop iterations, streamline search algorithms, and defer heavy processes to asynchronous tasks.
                </p>
              )
            },
            {
              title: "Heap Size Limits",
              icon: BarChart3,
              content: (
                <p className="text-slate-400 leading-relaxed text-sm">
                  The heap size limit is <strong>6 MB</strong> for synchronous processes and <strong>12 MB</strong> for asynchronous execution. Heap size measures the total memory occupied by instantiated objects, query lists, and cached configurations. To prevent heap overflows, use SOQL for-loops to process large query result lists in chunks of 200, filter out unneeded payload fields, and call <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">clear()</code> on lists that are no longer needed.
                </p>
              )
            },
            {
              title: "Async Apex Limits",
              icon: Layers,
              content: (
                <p className="text-slate-400 leading-relaxed text-sm">
                  Asynchronous Apex (Future methods, Queueable classes, Batch jobs, and Scheduled Apex) execute in background threads when resources become available. This grants higher transaction boundaries (e.g. 200 SOQL queries, 12 MB heap size, and 60 seconds CPU time). Developers use async Apex to process large datasets (Batch Apex supports up to 50 million records) and perform web service integration callouts.
                </p>
              )
            },
            {
              title: "Flow Governor Limits",
              icon: Workflow,
              content: (
                <p className="text-slate-400 leading-relaxed text-sm">
                  Salesforce Flows are visual automations, but they run on the same platform engine as Apex and share standard transaction limits (100 SOQL queries and 150 DML statements). Additionally, a single flow transaction cannot execute more than <strong>2,000 flow elements</strong>. To prevent element crashes, utilize Before-Save Flows for fast field updates and avoid looping query components. Read more in our <Link to="/salesforce-flow-interview-questions" className="text-rose-400 hover:underline">Salesforce Flow Guide</Link>.
                </p>
              )
            },
            {
              title: "Bulkification Strategies",
              icon: Sparkles,
              content: (
                <p className="text-slate-400 leading-relaxed text-sm">
                  Bulkification is the design practice that guarantees code behaves correctly and stays within governor limits when processing records in batches (such as trigger batches of 200 records). You must write triggers using a single-trigger framework pattern, collect query filters in Sets, query databases once, and register modifications via collections to bypass DML limit loops. Master bulk-trigger patterns in our <Link to="/apex-trigger-interview-questions" className="text-rose-400 hover:underline">Apex Trigger Guide</Link>.
                </p>
              )
            }
          ].map((section, idx) => (
            <motion.div 
              key={idx}
              variants={revealFadeUp}
              className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4"
            >
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <section.icon size={20} className="text-rose-400" />
                {section.title}
              </h3>
              {section.content}
            </motion.div>
          ))}

          {/* Real Interview Scenarios */}
          <motion.div 
            variants={revealFadeUp}
            className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6"
          >
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <HelpCircle size={20} className="text-rose-400" />
              Real Interview Scenarios
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white">Scenario 1: Resolving Mixed DML Errors</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  <strong>Problem:</strong> A transaction updates a setup object (like User) and a non-setup object (like Account) synchronously, triggering a <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">MIXED_DML_OPERATION</code>.
                  <br />
                  <strong>Solution:</strong> Isolate the setup or non-setup object DML update by running it asynchronously inside an `@future` method or a Queueable job, creating a separate transaction boundary.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-white">Scenario 2: Managing Heavy Database Query Heap</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  <strong>Problem:</strong> A developer query retrieves 20,000 records, loading all items into memory and causing a heap exception.
                  <br />
                  <strong>Solution:</strong> Implement a SOQL for-loop: <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">for(List&lt;Account&gt; accounts : [SELECT Id FROM Account]) &#123; ... &#125;</code>. This queries and processes records in chunks of 200, allowing garbage collection to free memory between loops. Practice explaining heap management on the <Link to="/salesforce-mock-interview" className="text-rose-400 hover:underline">Salesforce Mock Interview Screen</Link>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recruiter Section */}
      <motion.section 
        variants={revealFadeUp}
        className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-6"
      >
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Sparkles className="text-orange-400" />
          The "Architect" mindset
        </h2>
        <div className="prose prose-invert max-w-none text-slate-400 text-sm">
          <p>
            When an interviewer asks about governor limits, they aren't testing your ability to memorize numbers. They are testing your ability to design <strong>scalable</strong> systems. 
          </p>
          <p className="pt-4 italic text-slate-300">
            "I once saw a senior developer fail an interview because they couldn't explain how to handle 10,001 records in a single transaction. They knew the limit was 10k, but they didn't know how to move to Batch Apex or Queueables. That's what separates mid-level from senior."
          </p>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        variants={revealFadeUp}
        className="space-y-8"
      >
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-rose-500 pl-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "What is a transaction boundary in Salesforce?",
              ans: "A transaction boundary defines the lifetime of a single execution block. A transaction begins when an event occurs (such as a user DML save, a flow trigger, or an API callout) and ends when all downstream validation rules, database triggers, and commits complete. Governor limits are reset at each new transaction boundary."
            },
            {
              q: "Why does Salesforce enforce Governor Limits?",
              ans: "Salesforce is built on a multi-tenant architecture, meaning multiple customer orgs (tenants) share physical hardware, memory, and database servers. Governor limits ensure that a single tenant's poorly optimized script cannot monopolize system resource pools, guaranteeing platform stability for all."
            },
            {
              q: "What is the difference between synchronous and asynchronous limits?",
              ans: "Synchronous tasks execute immediately, blocking user threads and enforcing tighter limits (100 SOQL queries, 10s CPU, 6 MB heap). Asynchronous tasks (Queueables, Batch Apex, @future calls) run in the background, allowing Salesforce to schedule resource usage. This grants higher thresholds (200 SOQL queries, 60s CPU, 12 MB heap)."
            },
            {
              q: "How do you resolve a System.LimitException: Too many SOQL queries: 101 error?",
              ans: "This exception is triggered when SOQL queries are placed inside loop statements. To resolve it, gather the query parameters in a Set, execute a single bulk SOQL query outside the loop, and load the results into a Map. This allows retrieving data inside loops in-memory without making additional database calls."
            },
            {
              q: "How does ForcePilot AI help developers master limits?",
              ans: "ForcePilot AI evaluates coding submissions, trigger architecture choices, and async configurations, advising on bulk-safe compliance. Developers can test their skills in real time on our interactive Salesforce Mock Interview simulator."
            }
          ].map((item, idx) => (
            <details key={idx} className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                  {item.q}
                </h3>
                <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <div className="mt-4 text-slate-300 leading-relaxed text-sm">
                {item.ans}
              </div>
            </details>
          ))}
        </div>
      </motion.section>

      {/* Recommended Next Topics */}
      <motion.section 
        variants={revealFadeUp}
        className="space-y-8"
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            Recommended Next Topics
          </h2>
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-500/5 px-3 py-1 rounded-full border border-rose-500/10">
            Continue Learning
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/salesforce-flow-interview-questions"
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-rose-500/30 transition-all group flex flex-col justify-between h-40"
          >
            <div>
              <Workflow className="text-rose-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                Salesforce Flow Interview Questions
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                Master record-triggered flow loops, element limits, and complex fault paths.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
              Explore Guide <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/apex-trigger-interview-questions"
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-rose-500/30 transition-all group flex flex-col justify-between h-40"
          >
            <div>
              <Layers className="text-rose-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                Apex Trigger Interview Questions
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                Learn trigger frameworks, recursion prevention, and bulkification patterns.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
              Explore Guide <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          <Link
            to="/career-roadmap"
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 hover:border-rose-500/30 transition-all group flex flex-col justify-between h-40"
          >
            <div>
              <Sparkles className="text-rose-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                Salesforce Career Roadmap
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                Navigate your path from Associate Administrator to Principal Architect.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
              Explore Guide <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        variants={revealFadeUp}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center"
      >
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Master the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              Platform Rules
            </span>
          </h2>
          <div className="pt-8">
            <Link
              to="/#setup"
              state={{ role: "Salesforce Apex Developer" }}
              className="px-6 py-4 text-sm sm:px-10 sm:py-5 sm:text-base lg:px-14 lg:py-6 lg:text-xl bg-rose-600 hover:bg-rose-500 text-white rounded-[2rem] font-black transition-all shadow-[0_0_50px_rgba(244,63,94,0.3)] flex items-center justify-center gap-4 mx-auto group active:scale-95 text-center"
            >
              Start Practice Session
              <ArrowRight className="size-4 sm:size-5 lg:size-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.section>

      <footer className="text-center text-slate-400 text-sm py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-8">
          <Link to="/" className="hover:text-rose-400 transition-colors">Home</Link>
          <Link to="/salesforce-mock-interview" className="hover:text-rose-400 transition-colors">Mock Interview</Link>
          <Link to="/apex-interview-questions" className="hover:text-rose-400 transition-colors">Apex Questions</Link>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default GovernorLimitsExplained;
