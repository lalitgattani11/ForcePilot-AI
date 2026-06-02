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
  Layout,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

interface QuestionItem {
  q: string;
  expectation: string;
  weak: string;
  strong: React.ReactNode;
}

interface QuestionSection {
  title: string;
  questions: QuestionItem[];
}

const SalesforceFlowInterviewQuestions: React.FC = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Salesforce Flow, and when should I use it?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Salesforce Flow is a low-code visual tool used to build complex, trigger-based, and screen-guided business automations. It is Salesforce's primary declarative tool and should be used to model most automation rules before relying on developer code."
                }
              },
              {
                "@type": "Question",
                "name": "Can a Record-Triggered Flow execute after a record has been deleted?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, record-triggered flows can execute in a 'Before-Delete' context. This allows you to inspect field values, validate conditions, or clean up associated configurations before the record is officially removed from the database."
                }
              },
              {
                "@type": "Question",
                "name": "How do you bypass a Salesforce Flow for large data migrations?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The best practice is to reference a custom bypass hierarchical setting or custom metadata permission flag in the Flow's Start Element entry condition. During data loading, admins can assign this custom permission to the integration user to deactivate all flows programmatically."
                }
              },
              {
                "@type": "Question",
                "name": "How do I call Apex code from a Salesforce Flow?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can invoke Apex classes using the 'Apex Action' element inside Flow Builder, provided the static method is decorated with the @InvocableMethod annotation. This enables passing parameters from the Flow and receiving calculated results back."
                }
              },
              {
                "@type": "Question",
                "name": "How does ForcePilot AI help prepare for Salesforce Flow interviews?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ForcePilot AI simulates technical interview sessions that test your automation architectural choices, governor limits knowledge, and bulkification patterns. You can practice in real-time on our interactive Salesforce Mock Interview engine."
                }
              }
            ]
          });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);


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

  const flowQuestions: QuestionSection[] = [
    {
      title: "Beginner Flow Questions",
      questions: [
        {
          q: "What is the difference between a Before-Save (Fast Field Updates) Flow and an After-Save (Actions and Related Records) Flow?",
          expectation: "Compare execution times, performance implications, DML transactions, and standard update features.",
          weak: "Before-save flows run before saving the record, and after-save flows run after saving it.",
          strong: (
            <span>
              Before-Save flows (Fast Field Updates) execute before the record is committed to the database. They run up to 10 times faster than After-Save flows or Process Builder because updates happen in memory without triggering a DML operation or re-executing validation rules. After-Save flows (Actions and Related Records) execute after the record is committed, allowing you to access system-generated fields (like <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">Id</code> or <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">CreatedDate</code>), update related records, send email alerts, or execute custom invocable Apex.
            </span>
          )
        },
        {
          q: "What is a Screen Flow in Salesforce, and how is it used in custom business processes?",
          expectation: "Discuss user-guided screens, layout flexibility, embedding locations, and how variables are captured.",
          weak: "A screen flow is a flow that shows a popup screen where users can type in custom information.",
          strong: (
            <span>
              A Screen Flow is a user-interactive automation that guides users through a visual wizard. It supports rich visual UI components (text fields, picklists, file uploaders) and can be embedded on lightning record pages, utility bars, quick actions, or Experience Cloud sites. Unlike record-triggered flows, Screen Flows are launched by user action and are ideal for structured data collection, call scripting, and multi-step business guides.
            </span>
          )
        },
        {
          q: "What are Flow Governor Limits, and how do you monitor them during execution?",
          expectation: "Identify CPU usage constraints, element counts, query limits, and monitoring options.",
          weak: "Flow limits are Salesforce quotas that stop you from doing too many things in a single flow execution.",
          strong: (
            <span>
              Flows are subject to standard transaction governor limits, including a maximum of 100 SOQL queries and 150 DML operations. Additionally, a single flow transaction has an element execution limit of 2,000 elements. You can debug limits using the native Flow Debugger in Flow Builder, or analyze debug logs via the Developer Console. Read our <Link to="/governor-limits-explained" className="text-cyan-400 hover:underline">Governor Limits Explained Guide</Link> to see how flow elements map to global transaction quotas.
            </span>
          )
        }
      ]
    },
    {
      title: "Intermediate Flow Questions",
      questions: [
        {
          q: "How do you implement bulkification in Salesforce Flows to prevent hitting governor limits?",
          expectation: "Detail how the flow engine groups records, the impact of DML elements inside loops, and collection variables usage.",
          weak: "You must avoid placing Get Records or Update Records elements inside loops.",
          strong: (
            <span>
              Bulkification in Flow ensures the automation handles multiple records (e.g., 200 records loaded via Data Loader) without throwing errors. The critical rule is never to place "Get Records", "Create Records", "Update Records", or "Delete Records" inside a Loop element. Instead, use an Assignment element inside the loop to add records to a Collection Variable, and perform a single DML operation on the collection outside the loop.
            </span>
          )
        },
        {
          q: "What are Subflows in Salesforce, and what are the benefits of using them in enterprise architecture?",
          expectation: "Explain component reuse, input/output variable configurations, and modular testing.",
          weak: "Subflows are small flows that you run inside other flows to do separate tasks.",
          strong: (
            <span>
              Subflows are autolaunched or screen flows invoked from a parent flow. They facilitate reusability, improve readability, and simplify maintenance by segmenting complex logic into independent modules. Variables are passed between parent and child via fields marked as 'Available for Input' and 'Available for Output'. If you need to evaluate triggers or handler logic alongside subflows, visit our <Link to="/apex-trigger-interview-questions" className="text-cyan-400 hover:underline">Apex Trigger Guide</Link> or study our <Link to="/apex-interview-questions" className="text-cyan-400 hover:underline">Apex Interview Questions Guide</Link>.
            </span>
          )
        },
        {
          q: "How do you handle and debug errors in Salesforce Flows when an automation fails in production?",
          expectation: "Describe fault path routing, email error logs, and the native flow debugger interface.",
          weak: "You read the error notification email that Salesforce sends you and check the user's screen.",
          strong: (
            <span>
              To handle failures gracefully, developers use "Fault Paths" on DML and query elements to catch exceptions (like validation rule errors). Instead of displaying a generic fault screen, the flow routes through the fault path to display custom messages, log details, or send email alerts. For debugging, use the "Debug" tool in Flow Builder, which lets you run the flow in rollback mode to inspect variable assignments step-by-step.
            </span>
          )
        }
      ]
    },
    {
      title: "Advanced Flow Questions",
      questions: [
        {
          q: "Explain the concept of transaction boundaries and pause elements in Scheduled/Autolaunched Flows.",
          expectation: "Detail how database transactions are grouped, elements that trigger boundaries, and asynchronous path behavior.",
          weak: "A transaction boundary is the point where the flow stops running and saves the data.",
          strong: (
            <span>
              A transaction boundary defines the execution block of a database transaction. In flows, a new transaction starts when the triggering event occurs and ends when the flow finishes. Elements like Pause elements, Scheduled Paths, or Asynchronous Paths break the execution into separate transactions, resetting governor limits for subsequent paths. This helps avoid timeout limits but requires checking record values to ensure data integrity across boundaries.
            </span>
          )
        },
        {
          q: "How do you integrate Salesforce Flows with Apex code, and when should you use an Invocable Method?",
          expectation: "Explain InvocableMethod annotation requirements, bulk inputs processing, and callout options.",
          weak: "You call Apex code when a flow action is not powerful enough by using custom developer code.",
          strong: (
            <span>
              Flows integrate with Apex via the <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">@InvocableMethod</code> annotation on static methods. This exposes the code as an Action element inside Flow Builder. Invocable methods are bulk-safe, accepting a list of inputs (<code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">List&lt;Requests&gt;</code>) and returning a list of outputs. Use them for complex math, recursive calculations, or external integrations that cannot be built using standard flow elements. Practice explaining Apex integrations on our <Link to="/salesforce-mock-interview" className="text-cyan-400 hover:underline">Salesforce Mock Interview</Link> screen.
            </span>
          )
        },
        {
          q: "How do you prevent recursion and infinite loops when using Record-Triggered Flows?",
          expectation: "Identify recursive trigger triggers, prioritizing prior value formulas, and administrative metadata bypasses.",
          weak: "Make sure you set entry conditions on the flow so that it doesn't trigger again when values are saved.",
          strong: (
            <span>
              Recursion occurs when a flow updates a record, which re-fires the same flow in an infinite loop. To prevent this, set strict "Entry Conditions" using "Only when a record is updated to meet the condition requirements". Alternatively, use formula elements checking <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">$Record__Prior</code> to verify if a field value has actually changed. For large data loads, use Custom Metadata settings to bypass flows programmatically.
            </span>
          )
        }
      ]
    },
    {
      title: "Scenario-Based Flow Questions",
      questions: [
        {
          q: "Scenario: An After-Save Flow on Opportunity updates a field on Account, which triggers an automation that updates the Opportunity. This results in a limit crash. How do you resolve this?",
          expectation: "Diagnose cyclic recursion patterns and list solutions via condition filtering.",
          weak: "Delete one of the flows or write an Apex trigger to manage the update instead.",
          strong: (
            <span>
              This is a recursive loop. The immediate solution is to add strict "Entry Criteria" on both Opportunity and Account flows to ensure they only execute when the specific field being updated has changed. If both automations are necessary, consider consolidating them or using custom settings/metadata flags to temporarily disable flows during execution, which can be practiced on our <Link to="/salesforce-mock-interview" className="text-cyan-400 hover:underline">Salesforce Mock Interview</Link> simulator.
            </span>
          )
        },
        {
          q: "Scenario: A Scheduled Flow updates 50,000 records daily, but fails with a CPU Time Limit Exceeded error. How do you optimize it?",
          expectation: "Contrast collection queries inside flow canvas vs. setting source filters in the Start element.",
          weak: "Change the run schedule to run in smaller intervals or call a subflow.",
          strong: (
            <span>
              If a Scheduled Flow uses a 'Get Records' element to query all 50,000 records inside the canvas, it will exceed CPU limits. The optimized approach is to define the query filter criteria directly in the Flow's Start Element. Salesforce will query the records at the platform level and automatically process them in chunks of 200, assigning each batch a fresh set of transaction limits to avoid CPU timeout errors.
            </span>
          )
        },
        {
          q: "Scenario: You need to perform an external HTTP callout inside a Record-Triggered Flow. What design considerations must you apply?",
          expectation: "Discuss callout restrictions on active transactions and detail how to use Asynchronous Paths.",
          weak: "You just drag an HTTP Callout action element into the flow diagram.",
          strong: (
            <span>
              Salesforce prevents synchronous HTTP callouts during active database transactions to prevent record locking. To perform a callout in a Record-Triggered Flow, you must run it in an "Asynchronous Path" (configured in the Start element) or call an invocable Apex method decorated with <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">@future(callout=true)</code>. This frees up database locks before initiating the external API call.
            </span>
          )
        }
      ]
    },
    {
      title: "Automation Architecture Questions",
      questions: [
        {
          q: "How do you design an enterprise-grade Automation Strategy containing multiple flows on the same object?",
          expectation: "Discuss Flow Trigger Explorer, ordering, save order execution sequence, and consolidating logic.",
          weak: "Just create flows as you need them and Salesforce will execute them automatically.",
          strong: (
            <span>
              An enterprise strategy prioritizes logic consolidation. Best practice involves creating one Before-Save flow for fast updates, and one After-Save flow for actions/related records on each object. If multiple flows are necessary, use Flow Trigger Explorer to set trigger order values (1 to 2000) to guarantee a sequential execution order and prevent unexpected runtime interactions.
            </span>
          )
        },
        {
          q: "How does the Salesforce Save Order of Execution affect your automation design when using both Apex Triggers and Flows?",
          expectation: "Detail save order sequences, when before/after triggers fire, when validation rules execute, and when flows run.",
          weak: "Triggers run first, then validation rules execute, and then flows run and commit the updates.",
          strong: (
            <span>
              The Save Order of Execution is: 1) System validation and Before-Save Flows run. 2) Before Apex Triggers execute. 3) Custom validation rules execute. 4) Record is written to the database (not committed). 5) After Apex Triggers execute. 6) After-Save Flows execute. Knowing this, operations that rely on system-generated fields (like record IDs) or require updating related objects must happen in After-Save paths.
            </span>
          )
        },
        {
          q: "What are the architectural differences between Flow, Workflow Rules, and Process Builder in modern Salesforce environments?",
          expectation: "Detail the deprecation of legacy engines, CPU efficiency gains, and functional consolidations in Flow.",
          weak: "Workflow rules are simple, Process Builder is visual, and Flows are newer and let you build screen layouts.",
          strong: (
            <span>
              Salesforce has deprecated Workflow Rules and Process Builder in favor of Flow. Process Builder was built as an abstraction layer over the Flow engine, which resulted in heavy CPU execution costs. Record-Triggered Flows run directly on the platform kernel, consuming significantly less CPU time. Flow consolidates all legacy features (updates, email alerts, outbound messages) into a single, unified engine.
            </span>
          )
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>Salesforce Flow Interview Questions & Answers Guide (2026) | Flow Automation | ForcePilot AI</title>
        <meta
          name="description"
          content="Master your Salesforce developer or architect interview with expert-verified Salesforce Flow interview questions and answers. Study record-triggered flows, bulkification, and recursion."
        />
        <meta name="keywords" content="salesforce flow interview questions, record triggered flow interview questions, salesforce automation interview questions, salesforce flow scenario questions, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/salesforce-flow-interview-questions" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce Flow Interview Questions & Answers Guide (2026) | ForcePilot AI" />
        <meta property="og:description" content="Master your Salesforce developer or architect interview with expert-verified Salesforce Flow interview questions and answers." />
        <meta property="og:url" content="https://forcepilotai.online/salesforce-flow-interview-questions" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
        
      </Helmet>

      {/* Hero Section */}
      <section className="guide-hero-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="guide-hero-badge border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
        >
          <Workflow size={14} className="animate-pulse" />
          <span>Automation Mastery Track</span>
        </motion.div>
        
        <h1 className="guide-hero-title">
          Salesforce Flow <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500">
            Interview Questions
          </span>
        </h1>
        
        <p className="guide-hero-subtitle">
          The definitive guide to low-code automation. Master record triggered flow interview questions and salesforce automation interview questions. Prepare for complex scenario-based designs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/#setup"
            state={{ role: "Salesforce Admin" }}
            className="w-full sm:w-auto px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Master Salesforce Flow Interviews
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Quick Nav */}
      <nav className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-0">
        {[
          { title: "Admin Interview", link: "/salesforce-admin-interview", color: "emerald", icon: Layout },
          { title: "Apex Triggers", link: "/apex-trigger-interview-questions", color: "blue", icon: Database },
          { title: "Governor Limits", link: "/governor-limits-explained", color: "rose", icon: ShieldCheck },
          { title: "Mock Interview", link: "/salesforce-mock-interview", color: "cyan", icon: Zap }
        ].map((link, i) => (
          <Link key={i} to={link.link} className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-2.5 sm:p-3 rounded-xl bg-${link.color}-500/10 text-${link.color}-400 group-hover:scale-110 transition-transform`}>
                <link.icon size={18} className="sm:size-[20px]" />
              </div>
              <span className="font-bold text-white text-xs sm:text-sm">{link.title}</span>
            </div>
            <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 group-hover:text-white transition-all sm:size-[18px]" />
          </Link>
        ))}
      </nav>

      {/* Categories / Pillars */}
      <section className="space-y-12 sm:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-5xl font-bold text-white tracking-tight">Technical <span className="text-cyan-400">Pillars.</span></h2>
          <p className="text-slate-500 text-xs sm:text-base max-w-2xl mx-auto px-4 sm:px-0">Elite Flow developers are judged on their ability to build efficient, scalable, and maintainable automations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
            >
              <div className={`mb-6 inline-flex p-3 sm:p-4 rounded-2xl bg-${cat.color}-500/10 text-${cat.color}-400 group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} className="sm:size-[28px]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{cat.title}</h3>
              <p className="text-slate-500 leading-relaxed text-xs sm:text-sm">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Questions Section */}
      <section className="space-y-24">
        {flowQuestions.map((section, idx) => (
          <div key={idx} className="space-y-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-cyan-500 pl-4">
              {section.title}
            </h2>

            <div className="grid gap-6 sm:gap-8">
              {section.questions.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 sm:p-8 space-y-6"
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
                    {item.q}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-rose-500/80 uppercase">
                        Weak Answer
                      </div>
                      <p className="text-slate-500 text-sm italic">
                        "{item.weak}"
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-emerald-500/80 uppercase">
                        Strong Answer
                      </div>
                      <div className="text-slate-300 text-sm leading-relaxed">
                        {item.strong}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-cyan-500 pl-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-cyan-400 transition-colors">
                What is Salesforce Flow, and when should I use it?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Salesforce Flow is a low-code visual tool used to build complex, trigger-based, and screen-guided business automations. It is Salesforce's primary declarative tool and should be used to model most automation rules before relying on developer code.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-cyan-400 transition-colors">
                Can a Record-Triggered Flow execute after a record has been deleted?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Yes, record-triggered flows can execute in a "Before-Delete" context. This allows you to inspect field values, validate conditions, or clean up associated configurations before the record is officially removed from the database.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-cyan-400 transition-colors">
                How do you bypass a Salesforce Flow for large data migrations?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              The best practice is to reference a custom bypass hierarchical setting or custom metadata permission flag in the Flow's Start Element entry condition. During data loading, admins can assign this custom permission to the integration user to deactivate all flows programmatically.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-cyan-400 transition-colors">
                How do I call Apex code from a Salesforce Flow?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              You can invoke Apex classes using the "Apex Action" element inside Flow Builder, provided the static method is decorated with the <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">@InvocableMethod</code> annotation. This enables passing parameters from the Flow and receiving calculated results back. Learn more on the <Link to="/apex-interview-questions" className="text-cyan-400 hover:underline">Apex Interview Questions Guide</Link>.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-cyan-400 transition-colors">
                How does ForcePilot AI help prepare for Salesforce Flow interviews?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              ForcePilot AI simulates technical interview sessions that test your automation architectural choices, governor limits knowledge, and bulkification patterns. You can practice in real-time on our interactive <Link to="/salesforce-mock-interview" className="text-cyan-400 hover:underline">Salesforce Mock Interview</Link> engine.
            </div>
          </details>
        </div>
      </section>

      {/* Recruiter Strategy */}
      <section className="bg-[#0a0c10] border border-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-20 flex flex-col lg:flex-row items-center gap-12 sm:gap-16 overflow-hidden relative">
        <div className="flex-1 space-y-6 sm:space-y-8 relative z-10 text-center lg:text-left">
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Design for <br />
            <span className="text-emerald-400">Transaction Scale.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Interviewer focus has shifted from "Can you build a Flow?" to "Can you build a Flow that won't break the org?". We evaluate your understanding of bulkification and governor limit impacts.
          </p>
          <div className="space-y-4 text-left inline-block lg:block">
            {[
              "Bulkified DML & SOQL elements",
              "Before-Save vs After-Save efficiency",
              "Subflow strategy for reusability",
              "Avoiding Flow recursion"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 sm:size-[18px]" />
                <span className="font-medium text-sm sm:text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[450px] space-y-6 relative z-10">
           <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Architect Scorecard</div>
                <div className="text-emerald-400 font-mono text-xs">PASS</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-400">Bulkification Logic</span>
                  <span className="text-white font-bold">EXCELLENT</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-400">Limit Awareness</span>
                  <span className="text-white font-bold">ADVANCED</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed italic">
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
              solution: "Consolidate logic and use Flow Trigger Explorer weights."
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
            <Link
              to="/#setup"
              state={{ role: "Salesforce Admin" }}
              className="px-14 py-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_50px_rgba(34,211,238,0.3)] flex items-center justify-center gap-4 mx-auto group active:scale-95 text-center"
            >
              Start Flow Practice
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
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
