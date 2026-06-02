import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, ChevronDown } from "lucide-react";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface QuestionItem {
  q: string;
  expectation: string;
  weak: string;
  strong: React.ReactNode;
}

interface SectionItem {
  title: string;
  questions: QuestionItem[];
}

const ApexInterviewQuestions: React.FC = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Apex in Salesforce?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apex is Salesforce’s strongly typed object-oriented programming language."
      }
    }
  ]
}`;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const sections: SectionItem[] = [
    {
      title: "Beginner Apex Questions",
      questions: [
        {
          q: "What is the difference between insert and Database.insert in Apex DML?",
          expectation:
            "Candidates should demonstrate knowledge of error handling, bulk DML operations, and transaction management.",
          weak: "One is a keyword and the other is a method. They both do the same thing.",
          strong: (
            <span>
              The <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">insert</code> statement is "all-or-none"—if a single record in a list fails, the entire transaction rolls back. In contrast, <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Database.insert</code> provides partial success handling via the optional <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">allOrNone</code> parameter. When set to false, valid records are committed, and failures return detailed logs in a <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Database.SaveResult[]</code> array, allowing for custom error logging. To see how these DML choices impact your execution quotas, explore our comprehensive <Link to="/governor-limits-explained" className="text-emerald-400 hover:underline">Governor Limits Explained</Link> guide.
            </span>
          ),
        },
        {
          q: "Explain the difference between a Map and a Set in Apex.",
          expectation:
            "Clear understanding of Apex collection types, lookup complexity, and performance considerations.",
          weak: "A Map has keys and values, a Set is just a list with no duplicates.",
          strong: (
            <span>
              A <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Set</code> is an unordered collection of unique elements, ideal for storing IDs for SOQL filters. A <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Map</code> is a key-value collection providing O(1) lookup complexity. In bulkified code, Maps are essential to correlate records (e.g., mapping parent Account IDs to child Contacts) without using nested loops, which prevents CPU timeout issues.
            </span>
          ),
        },
        {
          q: "What are Apex collections and how do you use them to write bulkified code?",
          expectation:
            "Demonstrate fundamental understanding of List, Set, and Map for processing multiple records efficiently.",
          weak: "Collections are lists of records that you loop through to update things.",
          strong: (
            <span>
              Apex supports three collection types: Lists (ordered, index-based), Sets (unordered, unique), and Maps (key-value pairs). Writing bulkified code requires using a Set to gather query criteria (like record IDs), executing a single SOQL query outside loops, and mapping the query results into a Map. This eliminates nested loops and limits SOQL/DML commands to a single execution. Read our <Link to="/governor-limits-explained" className="text-emerald-400 hover:underline">Governor Limits Explained</Link> to see why this pattern is critical.
            </span>
          ),
        },
      ],
    },
    {
      title: "Intermediate Apex Questions",
      questions: [
        {
          q: "Why is it a best practice to enforce the 'One Trigger Per Object' pattern?",
          expectation:
            "Understanding of execution order, trigger handler frameworks, and maintainability.",
          weak: "It makes the code easier to find and keeps the trigger folder clean.",
          strong: (
            <span>
              Salesforce does not guarantee the execution order of multiple triggers on the same object. Adhering to the "One Trigger Per Object" pattern by routing all events through a single Trigger Handler framework guarantees execution sequence, prevents recursive logic, simplifies maintenance, and enables programmatic bypassing. Check out our <Link to="/apex-trigger-interview-questions" className="text-emerald-400 hover:underline">Apex Trigger Guide</Link> for structured implementation examples.
            </span>
          ),
        },
        {
          q: "When should you write a 'Before' trigger versus an 'After' trigger?",
          expectation:
            "Understanding the Salesforce Trigger Save Order and executing field updates efficiently.",
          weak: "Before is for validation, and After is for updating database records.",
          strong: (
            <span>
              Use "Before" triggers to validate records and update fields on the same record prior to database commit, as updates occur in memory and do not require a separate DML operation. Use "After" triggers when you require system-generated fields (such as record <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Id</code> or <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">CreatedDate</code>) or when you need to perform DML operations on related objects.
            </span>
          ),
        },
        {
          q: "What is asynchronous Apex, and when would you use a future method?",
          expectation:
            "Knowledge of asynchronous processing options, governor limits relief, and mixed DML prevention.",
          weak: "It runs in the background so users don't have to wait for the UI to load.",
          strong: (
            <span>
              Asynchronous Apex executes logic in a separate thread when resources are available, granting higher governor limits. An <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">@future</code> method is ideal for simple background execution, such as performing HTTP callouts or avoiding Mixed DML errors (updating setup and non-setup objects). However, future methods only accept primitive parameters (no sObjects) and cannot be directly chained.
            </span>
          ),
        },
      ],
    },
    {
      title: "Advanced Apex Questions",
      questions: [
        {
          q: "How does Queueable Apex improve upon Future methods, and how is it used?",
          expectation:
            "Understanding advanced asynchronous execution, job chaining, and passing complex data types.",
          weak: "Queueable is just a newer way of doing future methods and it lets you do callouts.",
          strong: (
            <span>
              Queueable Apex improves upon future methods by supporting complex data types (like sObjects and collections), returning a Job ID for tracking, and allowing jobs to be chained. Batch Apex is designed to process massive datasets (up to 50 million records) by automatically chunking the payload into blocks of 200 records, each with its own set of transaction limits. To test your knowledge on when to apply each model, practice with our real-time <Link to="/salesforce-mock-interview" className="text-emerald-400 hover:underline">Salesforce Mock Interview</Link> simulator.
            </span>
          ),
        },
        {
          q: "Explain the Enterprise Application Architecture (FFLIB) pattern in Apex.",
          expectation:
            "Familiarity with scalable enterprise patterns, separation of concerns, and mock unit testing.",
          weak: "FFLIB is a library that you install to make your code look clean and modular.",
          strong: (
            <span>
              Enterprise frameworks like FFLIB separate Apex logic into Service (business process orchestration), Domain (object validation and defaults), Selector (centralized SOQL queries), and Unit of Work (transactional DML registry) layers. This decouples responsibilities, enforces security defaults, eliminates redundant code, and enables pure unit testing by stubbing dependencies in-memory rather than relying on database inserts.
            </span>
          ),
        },
        {
          q: "What is the Stub API in Apex, and how does it accelerate CI/CD testing?",
          expectation:
            "Deep understanding of mocking frameworks, test-driven development, and decoupling test dependencies.",
          weak: "It's an API to mock HTTP callouts so that your test classes pass successfully.",
          strong: (
            <span>
              The Stub API enables developers to build mock implementations of Apex classes at runtime by implementing <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">System.StubProvider</code>. This allows unit tests to intercept method calls and return mock data without writing records to the database. Bypassing database commits speeds up test execution significantly, accelerating CI/CD pipeline runs.
            </span>
          ),
        },
      ],
    },
    {
      title: "Scenario-Based Apex Questions",
      questions: [
        {
          q: "Scenario: A query on a large custom object is throwing a 'Non-selective query against large object' error. How do you fix it?",
          expectation:
            "Understanding query selectivity, indexes, and the Salesforce Query Optimizer.",
          weak: "Add a LIMIT 1000 statement or check the fields in the where clause.",
          strong: (
            <span>
              A query becomes non-selective when it filters on a non-indexed field on a table containing more than 200,000 records, exceeding the optimizer's threshold (typically 10% for standard indexes, 30% for custom indexes). To resolve this, ensure filters utilize indexed fields (such as <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Id</code>, <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Name</code>, standard lookups, external IDs, or custom indexes requested from Salesforce Support). I'd verify using the Query Plan Tool in the Developer Console.
            </span>
          ),
        },
        {
          q: "Scenario: You need to call a third-party REST API that takes 10+ seconds to respond. How do you design this?",
          expectation:
            "Designing integration architectures that respect concurrency limits and thread availability.",
          weak: "Use a trigger to make the callout when the record is saved.",
          strong: (
            <span>
              Making synchronous callouts lasting over 5 seconds blocks transaction threads, exhausting the platform's limit of 10 concurrent requests. The correct design is asynchronous. For user actions, use a <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Continuation</code> object in LWC, which suspends the thread while waiting for the response. For back-end updates, invoke a Queueable class. You can refine your integration design explanations on our <Link to="/salesforce-mock-interview" className="text-emerald-400 hover:underline">Interactive Salesforce Mock Interview</Link> page.
            </span>
          ),
        },
        {
          q: "Scenario: How do you prevent recursive trigger execution when updating related records?",
          expectation:
            "Understanding trigger execution contexts, static variables, and bulk-safe recursion prevention.",
          weak: "Use a static boolean variable like runOnce and set it to false after the first run.",
          strong: (
            <span>
              A simple static boolean fails to prevent recursion during bulk DML transactions because records are processed in batches of 200, which resets the execution context but retains static variables. A bulk-safe design uses a helper class with a static <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Set&lt;Id&gt;</code> to track processed records. The trigger handler compares incoming records against the set, filters out already processed records, executes logic, and adds the IDs to the set. Check our <Link to="/apex-trigger-interview-questions" className="text-emerald-400 hover:underline">Apex Trigger Guide</Link> for trigger frameworks.
            </span>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 text-slate-300">
      <Helmet>
        <title>Salesforce Apex Interview Questions & Answers Guide (2026) | ForcePilot AI</title>
        <meta
          name="description"
          content="Master your Salesforce developer interview with expert-verified Salesforce Apex interview questions and answers. Practice beginner, intermediate, advanced, and scenario-based topics."
        />
        <link
          rel="canonical"
          href="https://forcepilotai.online/apex-interview-questions"
        />
        <meta
          property="og:title"
          content="Salesforce Apex Interview Questions & Answers Guide (2026) | ForcePilot AI"
        />
        <meta
          property="og:description"
          content="Master your Salesforce developer interview with expert-verified Salesforce Apex interview questions and answers. Practice beginner, intermediate, advanced, and scenario-based topics."
        />
        <meta
          property="og:url"
          content="https://forcepilotai.online/apex-interview-questions"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://forcepilotai.online/pwa-512.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Salesforce Apex Interview Questions & Answers Guide (2026) | ForcePilot AI"
        />
        <meta
          name="twitter:description"
          content="Master your Salesforce developer interview with expert-verified Salesforce Apex interview questions and answers. Practice beginner, intermediate, advanced, and scenario-based topics."
        />
        <meta
          name="twitter:image"
          content="https://forcepilotai.online/pwa-512.png"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="guide-hero-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="guide-hero-badge border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span>Technical Interview Intelligence</span>
        </motion.div>
        <h1 className="guide-hero-title">
          Salesforce Apex <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Interview Questions
          </span>
        </h1>
        <p className="guide-hero-subtitle">
          The definitive guide to Salesforce Developer interviews. Technical
          deep-dives, recruiter expectations, and production-grade answer
          strategies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/#setup"
            state={{ role: "Salesforce Apex Developer" }}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-base sm:text-lg transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Practice Real Apex Interviews
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform sm:size-[22px]"
            />
          </Link>
        </div>
      </section>

      {/* Internal Linking / Resources Bar */}
      <nav className="grid sm:grid-cols-2 gap-4 px-2 sm:px-0">
        <Link
          to="/lwc-interview-guide"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">
              Next Guide
            </div>
            <div className="text-white font-semibold">LWC Interview Guide</div>
          </div>
          <ChevronRight
            size={20}
            className="text-slate-500 group-hover:translate-x-1 transition-transform"
          />
        </Link>
        <Link
          to="/governor-limits-explained"
          className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1">
              Deep Dive
            </div>
            <div className="text-white font-semibold">
              Governor Limits Explained
            </div>
          </div>
          <ChevronRight
            size={20}
            className="text-slate-500 group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </nav>

      {/* Questions Section */}
      <div className="space-y-24">
        {sections.map((section, idx) => (
          <section key={idx} className="space-y-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-emerald-500 pl-4">
              {section.title}
            </h2>

            <div className="grid gap-6 sm:gap-8">
              {section.questions.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 sm:p-8 space-y-6"
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
                      <div className="text-slate-300 text-sm leading-relaxed">{item.strong}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* FAQ Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-cyan-500 pl-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          <details className="group bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                What are Salesforce Apex Governor Limits, and why are they enforced?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Apex Governor Limits are runtime limits enforced by the multi-tenant architecture of Salesforce. Because multiple clients share the same server resources, these limits ensure that runaway Apex scripts do not monopolize CPU time, memory, database connections, or email bandwidth. Key limits include 100 SOQL queries per synchronous transaction and 150 DML statements. See the full table on our <Link to="/governor-limits-explained" className="text-emerald-400 hover:underline">Governor Limits Explained</Link> page.
            </div>
          </details>

          <details className="group bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                How does ForcePilot AI help developers prepare for Apex interviews?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              ForcePilot AI offers a recruiter-grade simulation engine that dynamically tests your understanding of Apex. It evaluates your code logic, bulkification, and execution order awareness in real-time, providing immediate feedback on how to turn weak responses into strong ones. You can try a live session on the <Link to="/salesforce-mock-interview" className="text-emerald-400 hover:underline">Salesforce Mock Interview</Link> screen.
            </div>
          </details>

          <details className="group bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                What is the difference between Custom Settings and Custom Metadata Types?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Custom Settings are cached at the application level and are ideal for storing user-specific or hierarchical configurations. Custom Metadata Types allow you to define custom application configurations that can be packaged, deployed via change sets or the Metadata API, and queried without consuming SOQL limits.
            </div>
          </details>

          <details className="group bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                What are the best practices for writing Apex test classes?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Salesforce requires a minimum of 75% code coverage to deploy Apex to production, but best practices dictate aiming for 100% logic coverage. Test classes should verify bulk behavior (processing 200+ records), use <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Test.startTest()</code> and <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Test.stopTest()</code> to reset governor limits and force asynchronous processing, and utilize mock interfaces (like the Stub API) to avoid database dependencies.
            </div>
          </details>

          <details className="group bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                How do you handle CRUD and FLS security in Apex?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              By default, Apex runs in "System Mode" which ignores sharing rules, object-level security (CRUD), and field-level security (FLS). To enforce security, use the <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">with sharing</code> keyword on classes to respect sharing rules. For CRUD and FLS, use the <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">WITH USER_MODE</code> database query filter, or filter results programmatically using <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">Security.stripInaccessible()</code>.
            </div>
          </details>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-16 text-center shadow-2xl">
        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Recruiter-Grade <br /> Apex Mastery.
          </h2>
          <p className="text-emerald-50 text-lg opacity-90">
            ForcePilot AI adapts to your technical depth. Get real-time feedback
            on your code logic, bulkification strategies, and governor limit
            awareness.
          </p>
          <div className="pt-6">
            <Link
              to="/#setup"
              state={{ role: "Salesforce Apex Developer" }}
              className="px-10 py-5 bg-white text-emerald-700 hover:bg-emerald-100 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 mx-auto group"
            >
              Start Real-Time Interview
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-slate-600 text-sm py-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link
            to="/lwc-interview-guide"
            className="hover:text-emerald-400 transition-colors"
          >
            LWC Guide
          </Link>
          <Link
            to="/governor-limits-explained"
            className="hover:text-emerald-400 transition-colors"
          >
            Governor Limits
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ApexInterviewQuestions;
