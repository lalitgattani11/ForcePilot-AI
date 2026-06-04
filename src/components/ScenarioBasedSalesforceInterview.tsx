import React from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  Code2, 
  BrainCircuit, 
  Terminal, 
  AlertTriangle, 
  Workflow,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useJsonLd } from "../hooks/useJsonLd";

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

const ScenarioBasedSalesforceInterview: React.FC = () => {
  const faqSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are Salesforce scenario-based interview questions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Scenario-based questions present hypothetical real-world technical problems (such as Governor Limit errors, concurrency lockouts, or sharing discrepancies) to assess a developer's design methodology, architectural choices, and technical depth."
        }
      },
      {
        "@type": "Question",
        "name": "How do you approach performance-related scenarios in interviews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Always analyze diagnostic strategies (Query Plan tool, debug logs), query optimization (selective indexing, parent-child subqueries), low-code vs. code trade-offs, and asynchronous delegation (Queueables, Batch Apex) to show a comprehensive understanding of resources."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between with sharing and without sharing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "with sharing enforces the sharing rules of the running user, preventing data leakages. without sharing executes database actions in system mode, ignoring sharing settings. Best practices suggest using inherited sharing to resolve permissions dynamically."
        }
      },
      {
        "@type": "Question",
        "name": "How do you handle high-volume data operations without crashing Salesforce?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Process database updates asynchronously in batches of 200 using Batch Apex, use selective query filters on indexed fields, define skinny tables for heavy objects, and design clean archiving mechanisms."
        }
      },
      {
        "@type": "Question",
        "name": "How does ForcePilot AI help prepare for scenario-based interviews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ForcePilot AI serves as an interactive simulator that generates complex architectural and code failure scenarios. It audits your responses for security standards, limit compliance, and design patterns in real-time. Practice on our interactive Salesforce Mock Interview screen."
        }
      }
    ]
  }), []);

  useJsonLd(faqSchema, "schema-faq");


  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const pillars = [
    {
      title: "LDV Performance Issues",
      desc: "Solving query timeouts in an org with 50 million records.",
      topics: ["Index Optimization", "Skinny Tables", "Query Plan Tool", "Async Processing"]
    },
    {
      title: "Complex Integration Failures",
      desc: "Debugging real-time callouts hitting CPU limits.",
      topics: ["Continuation Pattern", "Platform Events", "Named Credentials", "Error Logging Framework"]
    },
    {
      title: "Multi-Org Security Leak",
      desc: "Identifying sharing vulnerabilities in a complex hierarchy.",
      topics: ["Apex Managed Sharing", "With Sharing vs Inherited Sharing", "Shield Event Monitoring", "Restriction Rules"]
    }
  ];

  const scenarioQuestions: QuestionSection[] = [
    {
      title: "Beginner Scenario Questions",
      questions: [
        {
          q: "Scenario: A user updates 15 records in the UI and gets a 'System.LimitException: Too many SOQL queries: 101'. What is the root cause and how do you fix it?",
          expectation: "Identify query-in-loop bottlenecks and explain refactoring queries to gather collections outside loops.",
          weak: "The system is trying to process too many records at once. To fix it, reduce the batch size or use a try-catch block.",
          strong: (
            <span>
              The root cause is a SOQL query executing inside a loop. Since synchronous transactions are limited to 100 queries, iterating through 15 records with nested queries can easily exceed this if other triggers execute in the transaction. The fix is to bulkify the logic: gather the criteria IDs in a Set, execute a single SOQL query outside the loop, map the query results, and retrieve records in-memory inside the loop.
            </span>
          )
        },
        {
          q: "Scenario: You need to implement an automated field update on a Lead record when it is created. You want to prioritize execution speed and resource limits. Should you use a Flow or Apex Trigger?",
          expectation: "Compare low-code Before-Save Flow execution advantages over standard Apex triggers.",
          weak: "Use a simple workflow rule or Apex trigger because code is always faster than flow.",
          strong: (
            <span>
              For field updates on the same record, use a Before-Save Flow (Fast Field Updates). Architecturally, Before-Save Flows execute prior to saving the record to the database, allowing you to modify fields in memory without issuing a DML statement. This is up to 10 times faster than After-Save Flows or standard Apex triggers and preserves database CPU resources. Review low-code configurations on our <Link to="/salesforce-flow-interview-questions" className="text-rose-400 hover:underline">Salesforce Flow Guide</Link>.
            </span>
          )
        }
      ]
    },
    {
      title: "Intermediate Scenario Questions",
      questions: [
        {
          q: "Scenario: During a migration run of 5,000 records, you encounter a 'MIXED_DML_OPERATION' error. How do you resolve this?",
          expectation: "Discuss transaction separation boundaries when updating setup and non-setup records.",
          weak: "Separate your data sheets and run the migration in two separate files.",
          strong: (
            <span>
              A Mixed DML Exception occurs when DML operations are performed on both setup sObjects (like User or Group) and non-setup sObjects (like Account or Contact) in the same transaction block. To resolve this, run one of the DML actions asynchronously. By calling an `@future` method, enqueuing a Queueable job, or executing a Platform Event, you yield the thread, allowing the second DML operation to execute in its own transaction boundary. Learn more on our <Link to="/governor-limits-explained" className="text-rose-400 hover:underline">Governor Limits Explained Guide</Link>.
            </span>
          )
        },
        {
          q: "Scenario: A third-party external API integration takes up to 8 seconds to respond. Users are experiencing UI lockouts and 'Concurrent Request Limit' failures. How do you redesign this integration?",
          expectation: "Identify concurrent connection limits and explain LWC Continuation pattern advantages.",
          weak: "Tell the users to wait or add a loading spinner to the visual layout.",
          strong: (
            <span>
              Synchronous callouts lasting over 5 seconds block active database request threads, quickly exhausting the platform limit of 10 concurrent requests. To resolve this, redesign the integration asynchronously. For user-initiated actions, use a Continuation object in LWC, which releases the thread back to Salesforce while waiting for the HTTP response. For back-end tasks, use Queueable Apex with retry policies. Verify integration designs in our <Link to="/apex-trigger-interview-questions" className="text-rose-400 hover:underline">Apex Trigger Guide</Link>.
            </span>
          )
        }
      ]
    },
    {
      title: "Advanced Architecture Scenarios",
      questions: [
        {
          q: "Scenario: You are designing a data structure for an org that expects to store 100 million records in a custom Log object. What architecture decisions will you implement to prevent performance degradation?",
          expectation: "Discuss LDV strategies, database indexes, skinny tables, archiving policies, and sharing configurations.",
          weak: "Create a standard object and use a basic query limit clause to keep lists short.",
          strong: (
            <span>
              To handle Large Data Volumes (LDV): 1) Configure selective query filters on indexed fields (like standard External IDs or RecordTypeIds) to satisfy the Query Optimizer. 2) Implement custom indexes or request Skinny Tables from Salesforce Support to merge fields. 3) Enforce sharing rules (with sharing) to limit search scopes. 4) Use a data archiving strategy, moving old data to external databases using Salesforce Connect. Read detailed query designs on our <Link to="/apex-interview-questions" className="text-rose-400 hover:underline">Apex Interview Guide</Link>.
            </span>
          )
        },
        {
          q: "Scenario: How do you design an error logging and retry framework using Platform Events that guarantees transactions roll back but log records persist?",
          expectation: "Explain transactional DML rollback scopes and Platform Events Publish Immediately settings.",
          weak: "Use try-catch blocks to catch errors, insert log records inside the catch, and call Database.rollback().",
          strong: (
            <span>
              When a transaction fails and rolls back, any DML logging records created inside that transaction are also rolled back and lost. To prevent this, publish a custom logging Platform Event set to "Publish Immediately" behavior inside the catch block. Since Platform Events published immediately are written to the bus outside the active transaction, they persist even if the parent Apex transaction rolls back. An event-triggered handler then subscribes to write the log database records.
            </span>
          )
        }
      ]
    },
    {
      title: "Real Production Failure Scenarios",
      questions: [
        {
          q: "Scenario: A production deployment fails because a test class fails due to changing organization validation rules. What is your mitigation strategy?",
          expectation: "Understand how to mock setup metadata and avoid relying on existing database records.",
          weak: "Temporarily turn off the validation rules in production during deployment.",
          strong: (
            <span>
              Deployments should never rely on active database configurations. To prevent this, test classes must mock all necessary setup data in memory, avoiding hardcoded IDs or active custom configurations. Use the <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">@testSetup</code> annotation to isolate data creation, mock profiles, and utilize dynamic query setups to retrieve test data. During failures, implement a git rollback deployment path to restore the system state instantly.
            </span>
          )
        },
        {
          q: "Scenario: A trigger updates contact fields when an account is updated. However, the contact update trigger updates account fields, causing a loop. How do you resolve this?",
          expectation: "Detail how recursive loops start and how to resolve them using field change mapping filters.",
          weak: "Use a static boolean in a helper class to stop the triggers from running again.",
          strong: (
            <span>
              This is a recursive update loop. To resolve this, implement double-guarded entry criteria. In the Account trigger, only update Contacts if relevant Account fields have changed (comparing <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">Trigger.new</code> to <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">Trigger.oldMap</code>). In the Contact trigger, check that Contact values differ before calling DML. Finally, implement a static bypass configuration class to allow programmatically disabling either trigger during updates. Practice resolving these loops on our <Link to="/salesforce-mock-interview" className="text-rose-400 hover:underline">Salesforce Mock Interview Screen</Link>.
            </span>
          )
        }
      ]
    },
    {
      title: "Performance Optimization Scenarios",
      questions: [
        {
          q: "Scenario: A page containing a custom list of 5,000 records takes 12 seconds to load. How do you troubleshoot and optimize this?",
          expectation: "Diagnose rendering delays, database query times, cache availability, and UI pagination solutions.",
          weak: "Write smaller styles and HTML files to make the page load faster.",
          strong: (
            <span>
              A 12-second load indicates DOM weight bottlenecks or database timeouts. To optimize: 1) Implement pagination or lazy loading (infinite scroll) to load only 50 records at a time. 2) Mark the Apex queries as <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">@AuraEnabled(cacheable=true)</code> to cache results locally. 3) Ensure queries use indexed filters. 4) Use read-only query keywords to bypass transactional locking.
            </span>
          )
        },
        {
          q: "Scenario: How do you optimize a transaction that must update related cases whenever an account is modified, while avoiding CPU Time Limit exceptions?",
          expectation: "Detail DML consolidation and offloading heavy tasks asynchronously via Queueable Apex.",
          weak: "Add a database update statement inside a loop and use smaller batches.",
          strong: (
            <span>
              To prevent CPU timeout exceptions: 1) Consolidate DML statements, using a single update statement for all related cases. 2) Move the related update logic to a Queueable Apex class. Queueable Apex executes asynchronously, resetting the CPU limit from 10 seconds to 60 seconds. This removes the performance burden from the synchronous thread, allowing the user's Account update to commit immediately.
            </span>
          )
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>Salesforce Scenario-Based Interview Questions & Answers Guide (2026) | ForcePilot AI</title>
        <meta
          name="description"
          content="Master your Salesforce developer or architect interview with expert-verified Salesforce scenario-based interview questions and answers. Solve real-world database, security, and performance scenarios."
        />
        <meta name="keywords" content="salesforce scenario based interview questions, salesforce developer scenario questions, salesforce architecture interview questions, advanced salesforce interview questions, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/scenario-based-salesforce-interview" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce Scenario-Based Interview Questions & Answers Guide (2026) | ForcePilot AI" />
        <meta property="og:description" content="Master your Salesforce developer or architect interview with expert-verified Salesforce scenario-based interview questions." />
        <meta property="og:url" content="https://forcepilotai.online/scenario-based-salesforce-interview" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
        
      </Helmet>

      {/* Hero Section */}
      <section className="guide-hero-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="guide-hero-badge border-rose-500/20 bg-rose-500/5 text-rose-400"
        >
          <BrainCircuit size={14} className="animate-pulse" />
          <span>Architectural Thinking Track</span>
        </motion.div>
        
        <h1 className="guide-hero-title">
          <span className="md:whitespace-nowrap inline-block">Salesforce</span>
          <span className="md:hidden"> </span>
          <br className="hidden md:block" />
          <span className="md:whitespace-nowrap inline-block">Scenario-Based</span>
          <span className="md:hidden"> </span>
          <br className="hidden md:block" />
          <span className="md:whitespace-nowrap inline-block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-500">
            Questions
          </span>
        </h1>
        
        <p className="guide-hero-subtitle">
          Master real-world Salesforce architecture scenarios, debugging strategies, and system design thinking. Practice recruiter-grade problem solving built for high-level SFDC technical interviews.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/#setup"
            state={{ role: "Professional Readiness" }}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold text-base sm:text-lg transition-all shadow-[0_0_40px_rgba(244,63,94,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Start Scenario-Based Interview Practice
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform sm:size-[22px]"
            />
          </Link>
        </div>
      </section>

      {/* Quick Nav */}
      <nav className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Apex Triggers", link: "/apex-trigger-interview-questions", color: "blue", icon: Terminal },
          { title: "Flow Interview", link: "/salesforce-flow-interview-questions", color: "emerald", icon: Workflow },
          { title: "LWC Coding", link: "/lwc-coding-interview", color: "cyan", icon: Code2 },
          { title: "Governor Limits", link: "/governor-limits-explained", color: "rose", icon: ShieldCheck }
        ].map((link, i) => (
          <Link key={i} to={link.link} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-${link.color}-500/10 text-${link.color}-400 group-hover:scale-110 transition-transform`}>
                <link.icon size={20} />
              </div>
              <span className="font-bold text-white text-sm">{link.title}</span>
            </div>
            <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
          </Link>
        ))}
      </nav>

      {/* Scenarios / Pillars */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Production <span className="text-rose-400">Puzzles.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Prepare for the "What would you do?" questions that define high-level technical rounds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-6">
                {item.desc}
              </p>
              <div className="space-y-3">
                {item.topics.map((topic, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 size={14} className="text-rose-500/60" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Questions Section */}
      <section className="space-y-24">
        {scenarioQuestions.map((section, idx) => (
          <div key={idx} className="space-y-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-rose-500 pl-4">
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
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-rose-500 pl-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                What are Salesforce scenario-based interview questions?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Scenario-based questions present hypothetical real-world technical problems (such as Governor Limit errors, concurrency lockouts, or sharing discrepancies) to assess a developer's design methodology, architectural choices, and technical depth.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                How do you approach performance-related scenarios in interviews?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Always analyze diagnostic strategies (Query Plan tool, debug logs), query optimization (selective indexing, parent-child subqueries), low-code vs. code trade-offs, and asynchronous delegation (Queueables, Batch Apex) to show a comprehensive understanding of resources.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                What is the difference between with sharing and without sharing?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">with sharing</code> enforces the sharing rules of the running user, preventing data leakages. <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">without sharing</code> executes database actions in system mode, ignoring sharing settings. Best practices suggest using <code className="text-rose-400 bg-slate-950 px-1 rounded font-mono">inherited sharing</code> to resolve permissions dynamically.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                How do you handle high-volume data operations without crashing Salesforce?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Process database updates asynchronously in batches of 200 using Batch Apex, use selective query filters on indexed fields, define skinny tables for heavy objects, and design clean archiving mechanisms.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-rose-400 transition-colors">
                How does ForcePilot AI help prepare for scenario-based interviews?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              ForcePilot AI serves as an interactive simulator that generates complex architectural and code failure scenarios. It audits your responses for security standards, limit compliance, and design patterns in real-time. Practice on our interactive <Link to="/salesforce-mock-interview" className="text-rose-400 hover:underline">Salesforce Mock Interview</Link> screen.
            </div>
          </details>
        </div>
      </section>

      {/* Recruiter Strategy */}
      <section className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-8 sm:p-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Stop Memorizing. <br />
            <span className="text-orange-400">Start Solving.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            In senior technical interviews, there is rarely a single "correct" answer. Interviewers want to see your <strong>design process</strong>. ForcePilot AI evaluates how you weigh pros and cons, consider platform limits, and prioritize long-term maintainability.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Critical Analysis</div>
                <div className="text-xl font-bold text-white">96%</div>
             </div>
             <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">System Impact</div>
                <div className="text-xl font-bold text-white">92%</div>
             </div>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400">
              <AlertTriangle size={20} />
            </div>
            <div className="text-sm font-bold text-white">Architect Mindset</div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            "When presented with a performance issue, always mention the Query Plan Tool and the importance of selective SOQL filters. This shows you know how to use the platform's diagnostic tools."
          </p>
          <div className="pt-4 border-t border-white/5">
             <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Problem Solving</span>
                <span className="text-rose-400">Elite</span>
              </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center">
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Ready to Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-500">
              Enterprise Solutions?
            </span>
          </h2>
          <div className="pt-8">
            <Link
              to="/#setup"
              state={{ role: "Professional Readiness" }}
              className="px-14 py-6 bg-rose-600 hover:bg-rose-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_50px_rgba(244,63,94,0.3)] flex items-center justify-center gap-4 mx-auto group active:scale-95 text-center"
            >
              Start Practice Now
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-slate-600 text-sm py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-8">
          <Link to="/" className="hover:text-rose-400 transition-colors font-bold">Home</Link>
          <Link to="/salesforce-mock-interview" className="hover:text-rose-400 transition-colors font-bold">Mock Interview</Link>
          <Link to="/governor-limits-explained" className="hover:text-rose-400 transition-colors font-bold">Governor Limits</Link>
        </div>
      </footer>
    </div>
  );
};

export default ScenarioBasedSalesforceInterview;
