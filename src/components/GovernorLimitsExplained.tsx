import React from 'react';
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  ShieldAlert,
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

const GovernorLimitsExplained: React.FC = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
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
          });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);


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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 text-slate-300">
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
      <section className="guide-hero-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="guide-hero-badge border-rose-500/20 bg-rose-500/5 text-rose-400"
        >
          <ShieldAlert size={14} className="animate-pulse" />
          <span>Multi-Tenant Architecture</span>
        </motion.div>
        <h1 className="guide-hero-title">
          Salesforce Governor <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
            Limits Explained
          </span>
        </h1>
        <p className="guide-hero-subtitle">
          The non-negotiable rules of the Salesforce platform. Master apex governor limits and prepare for salesforce limits interview questions with our architect-grade guide.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/#setup"
            state={{ role: "Salesforce Apex Developer" }}
            className="w-full sm:w-auto px-12 py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(244,63,94,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Practice Limit Management
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Internal Navigation */}
      <nav className="grid sm:grid-cols-2 gap-4">
        <Link to="/apex-interview-questions" className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group">
          <div>
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Apply Knowledge</div>
            <div className="text-white font-semibold">Apex Interview Questions</div>
          </div>
          <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/lwc-interview-guide" className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group">
          <div>
            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1">Frontend Focus</div>
            <div className="text-white font-semibold">LWC Interview Guide</div>
          </div>
          <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      {/* Limits Grid */}
      <section className="space-y-12">
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-rose-500 pl-4">
          Core Transaction Limits
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {limits.map((limit, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl space-y-4 hover:border-slate-700 transition-colors">
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
            </div>
          ))}
        </div>
      </section>

      {/* Structured Educational Content Sections */}
      <section className="space-y-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white tracking-tight border-l-4 border-rose-500 pl-4">
            Technical Breakdowns
          </h2>
          <p className="text-slate-400 max-w-3xl">
            A comprehensive look at how each limit operates, the standard Exception causes, and how to avoid them in production code.
          </p>
        </div>

        <div className="space-y-16">
          {/* SOQL Limits */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Database size={20} className="text-rose-400" />
              SOQL Limits
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Salesforce enforces a maximum of <strong>100 synchronous SOQL queries</strong> per transaction (relaxed to <strong>200 queries</strong> in asynchronous contexts). If your execution path makes more queries, the platform aborts execution with a <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">System.LimitException: Too many SOQL queries: 101</code>. To optimize queries, minimize field selections, use indexing, and leverage parent-child relationships instead of issuing separate subqueries. See our <Link to="/apex-interview-questions" className="text-rose-400 hover:underline">Apex Interview Questions</Link> for detailed query mapping examples.
            </p>
          </div>

          {/* DML Limits */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <HardDrive size={20} className="text-rose-400" />
              DML Limits
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              A single transaction is limited to <strong>150 DML statements</strong> (insert, update, delete, upsert, undelete, merge) and a total of <strong>10,000 processed records</strong>. Exceeding this boundary throws <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">System.LimitException: Too many DML statements: 151</code>. To preserve database resource cycles, never execute DML operations inside loops. Always collect modified sObjects in a list and perform one database commit.
            </p>
          </div>

          {/* CPU Time Limits */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Timer size={20} className="text-rose-400" />
              CPU Time Limits
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Salesforce limits CPU time to <strong>10 seconds (10,000 ms)</strong> for synchronous runs and <strong>60 seconds (60,000 ms)</strong> for asynchronous paths. CPU time comprises Apex calculations, formula evaluations, and trigger handlers, but excludes database processing time and HTTP callout wait times. To optimize CPU usage, avoid nested loop iterations, streamline search algorithms, and defer heavy processes to asynchronous tasks.
            </p>
          </div>

          {/* Heap Size Limits */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <BarChart3 size={20} className="text-rose-400" />
              Heap Size Limits
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              The heap size limit is <strong>6 MB</strong> for synchronous processes and <strong>12 MB</strong> for asynchronous execution. Heap size measures the total memory occupied by instantiated objects, query lists, and cached configurations. To prevent heap overflows, use SOQL for-loops to process large query result lists in chunks of 200, filter out unneeded payload fields, and call <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">clear()</code> on lists that are no longer needed.
            </p>
          </div>

          {/* Async Apex Limits */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Layers size={20} className="text-rose-400" />
              Async Apex Limits
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Asynchronous Apex (Future methods, Queueable classes, Batch jobs, and Scheduled Apex) execute in background threads when resources become available. This grants higher transaction boundaries (e.g. 200 SOQL queries, 12 MB heap size, and 60 seconds CPU time). Developers use async Apex to process large datasets (Batch Apex supports up to 50 million records) and perform web service integration callouts.
            </p>
          </div>

          {/* Flow Governor Limits */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Workflow size={20} className="text-rose-400" />
              Flow Governor Limits
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Salesforce Flows are visual automations, but they run on the same platform engine as Apex and share standard transaction limits (100 SOQL queries and 150 DML statements). Additionally, a single flow transaction cannot execute more than <strong>2,000 flow elements</strong>. To prevent element crashes, utilize Before-Save Flows for fast field updates and avoid looping query components. Read more in our <Link to="/salesforce-flow-interview-questions" className="text-rose-400 hover:underline">Salesforce Flow Guide</Link>.
            </p>
          </div>

          {/* Bulkification Strategies */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Sparkles size={20} className="text-rose-400" />
              Bulkification Strategies
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              Bulkification is the design practice that guarantees code behaves correctly and stays within governor limits when processing records in batches (such as trigger batches of 200 records). You must write triggers using a single-trigger framework pattern, collect query filters in Sets, query databases once, and register modifications via collections to bypass DML limit loops. Master bulk-trigger patterns in our <Link to="/apex-trigger-interview-questions" className="text-rose-400 hover:underline">Apex Trigger Guide</Link>.
            </p>
          </div>

          {/* Real Interview Scenarios */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
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
          </div>
        </div>
      </section>

      {/* Recruiter Section */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-6">
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
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-rose-500 pl-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          <details className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                What is a transaction boundary in Salesforce?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              A transaction boundary defines the lifetime of a single execution block. A transaction begins when an event occurs (such as a user DML save, a flow trigger, or an API callout) and ends when all downstream validation rules, database triggers, and commits complete. Governor limits are reset at each new transaction boundary.
            </div>
          </details>

          <details className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                Why does Salesforce enforce Governor Limits?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Salesforce is built on a multi-tenant architecture, meaning multiple customer orgs (tenants) share physical hardware, memory, and database servers. Governor limits ensure that a single tenant's poorly optimized script cannot monopolize system resource pools, guaranteeing platform stability for all.
            </div>
          </details>

          <details className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                What is the difference between synchronous and asynchronous limits?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Synchronous tasks execute immediately, blocking user threads and enforcing tighter limits (100 SOQL queries, 10s CPU, 6 MB heap). Asynchronous tasks (Queueables, Batch Apex, `@future` calls) run in the background, allowing Salesforce to schedule resource usage. This grants higher thresholds (200 SOQL queries, 60s CPU, 12 MB heap).
            </div>
          </details>

          <details className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                How do you resolve a System.LimitException: Too many SOQL queries: 101 error?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              This exception is triggered when SOQL queries are placed inside loop statements. To resolve it, gather the query parameters in a Set, execute a single bulk SOQL query outside the loop, and load the results into a Map. This allows retrieving data inside loops in-memory without making additional database calls.
            </div>
          </details>

          <details className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                How does ForcePilot AI help developers master limits?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              ForcePilot AI evaluates coding submissions, trigger architecture choices, and async configurations, advising on bulk-safe compliance. Developers can test their skills in real time on our interactive <Link to="/salesforce-mock-interview" className="text-rose-400 hover:underline">Salesforce Mock Interview</Link> simulator.
            </div>
          </details>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-rose-600 to-orange-700 px-6 py-16 text-center shadow-2xl">
        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Design for <br/> Platform Scale.
          </h2>
          <p className="text-rose-50 text-lg opacity-90">
            ForcePilot AI challenges your architectural decisions. Practice handling large datasets, long-running processes, and complex trigger recursions.
          </p>
          <div className="pt-6">
            <Link 
              to="/#setup"
              state={{ role: "Salesforce Apex Developer" }}
              className="px-10 py-5 bg-white text-rose-700 hover:bg-rose-50 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 mx-auto group"
            >
              Master Governor Limits
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-slate-400 text-sm py-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-rose-400 transition-colors">Home</Link>
          <Link to="/apex-interview-questions" className="hover:text-rose-400 transition-colors">Apex Questions</Link>
          <Link to="/lwc-interview-guide" className="hover:text-rose-400 transition-colors">LWC Guide</Link>
        </div>
      </footer>
    </div>
  );
};

export default GovernorLimitsExplained;
