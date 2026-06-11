import React from "react";
import { 
  ArrowRight, 
  ChevronRight, 
   
  CheckCircle2, 
  Code2, 
  Layers, 
  Search, 
  AlertCircle,
  ShieldAlert,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useJsonLd } from "../hooks/useJsonLd";
import { 
  fadeIn, 
  revealFadeUp, 
  badgeAnimation, 
  staggerContainer, 
  revealStaggerContainer 
} from "../utils/animations";

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

const ApexTriggerInterviewQuestions: React.FC = () => {
  const faqSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are Salesforce Apex triggers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex triggers are database scripts that run before or after DML transactions (inserts, updates, deletes, merges) execute on Salesforce records. They enable developers to build custom validations, propagate related updates, and interface with third-party software."
        }
      },
      {
        "@type": "Question",
        "name": "Why is putting business logic directly in the trigger body considered a red flag?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Putting logic directly inside the trigger body makes code difficult to maintain, test, and reuse. It prevents developers from implementing bypass structures or controlling recursion. Best practices dictate using a Trigger Handler pattern."
        }
      },
      {
        "@type": "Question",
        "name": "How do you handle trigger exceptions gracefully in bulk operations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the addError() method on specific records inside the trigger to display user-friendly error messages on screen without rolling back the entire DML batch, keeping partial updates intact."
        }
      },
      {
        "@type": "Question",
        "name": "What is the CPU time limit and how does it affect triggers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Apex triggers share the synchronous transaction CPU time limit (10 seconds). To prevent CPU time outs, avoid nested loop structures, use indexing, and offload calculations to Queueable jobs."
        }
      },
      {
        "@type": "Question",
        "name": "How does ForcePilot AI help developers master trigger architecture?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ForcePilot AI assesses your trigger code structure, recursion handling, and bulkification patterns. You can practice responding to recruiter questions in real-time on our interactive Salesforce Mock Interview screen."
        }
      }
    ]
  }), []);

  useJsonLd(faqSchema, "schema-faq");


  const sections = [
    {
      title: "Bulkification & Limits",
      desc: "Moving beyond single-record logic to enterprise-scale processing.",
      topics: ["Set/Map Collection Patterns", "Avoiding SOQL in Loops", "Heap Size Management", "10,001 DML Limit"]
    },
    {
      title: "Enterprise Patterns",
      desc: "Building maintainable, testable, and scalable trigger architectures.",
      topics: ["Trigger Handler Pattern", "Recursion Prevention", "Bypass Mechanisms", "One Trigger Per Object"]
    },
    {
      title: "Transaction Control",
      desc: "Understanding the Save Order and how triggers interact with the database.",
      topics: ["Before vs After Context", "Database.insert Partial Success", "Async Apex (Queueable/Future)", "Transaction Finalizers"]
    }
  ];

  const triggerQuestions: QuestionSection[] = [
    {
      title: "Beginner Trigger Questions",
      questions: [
        {
          q: "Explain before vs after triggers in Salesforce Apex, and when to use each.",
          expectation: "Contrast in-memory field updates vs. database ID access and DML execution rules.",
          weak: "Before triggers run before the record is saved, and after triggers run after it has been saved to the database.",
          strong: (
            <span>
              Use "Before" triggers to validate input values or modify fields on the triggering record itself; this is highly efficient because changes are applied in memory before writes, avoiding extra DML statements. Use "After" triggers when you need to access system-generated values (like record <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Id</code> or <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">CreatedDate</code>) or update related records, which does require a DML statement.
            </span>
          )
        },
        {
          q: "What are trigger context variables, and how do you use them in Apex triggers?",
          expectation: "Define key context variables (isBefore, new, oldMap) and explain how to query field values.",
          weak: "Context variables are lists of records that tell the trigger what event is currently running.",
          strong: (
            <span>
              Trigger context variables are system-defined variables exposing runtime metadata. Key variables include booleans like <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Trigger.isBefore</code> and <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Trigger.isInsert</code>, and collections like <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Trigger.new</code> (list of new records) and <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Trigger.oldMap</code> (map of old IDs to records, useful for detecting field updates).
            </span>
          )
        },
        {
          q: "What is trigger bulkification, and how do you write a bulk-safe trigger?",
          expectation: "Describe processing batches of 200 records, avoiding SOQL/DML in loops, and using collections.",
          weak: "Bulkification is writing your code so it doesn't crash when you load a batch of records.",
          strong: (
            <span>
              Trigger bulkification means designing your Apex logic to process batches of records efficiently (up to 200 records per execution block). Writing bulk-safe code requires avoiding SOQL queries and DML updates inside loop structures. Instead, gather query criteria in a Set, perform a single SOQL query outside loops, use a Map to correlate data, and save database commits via collections. Review transaction boundaries on our <Link to="/governor-limits-explained" className="text-blue-400 hover:underline">Governor Limits Explained Guide</Link>.
            </span>
          )
        }
      ]
    },
    {
      title: "Intermediate Trigger Questions",
      questions: [
        {
          q: "Why is it a best practice to adhere to the 'One Trigger Per Object' pattern?",
          expectation: "Address order of execution uncertainty, testing, and trigger consolidation.",
          weak: "It keeps your trigger folder clean and makes the files easier to search.",
          strong: (
            <span>
              Salesforce does not guarantee the order of execution when multiple triggers exist on the same object. Having a single trigger per object enforces a predictable execution sequence, simplifies debugging, facilitates trigger bypass configurations, and reduces redundant database queries. Learn trigger designs in our <Link to="/apex-interview-questions" className="text-blue-400 hover:underline">Apex Interview Questions Guide</Link>.
            </span>
          )
        },
        {
          q: "What is a Trigger Handler Framework, and how does it separate concerns in Apex?",
          expectation: "Explain decoupling trigger entry points from business logic, testability, and standard interface handlers.",
          weak: "It's a helper class where you write the actual code instead of putting it in the trigger body.",
          strong: (
            <span>
              A Trigger Handler framework separates trigger event routing from business logic. The trigger file itself only contains a single line that calls the framework orchestrator. The orchestrator delegates events (like <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">beforeInsert()</code> or <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">afterUpdate()</code>) to dedicated handler classes, improving code maintainability, promoting reuse, and enabling unit testing without committing dummy test records.
            </span>
          )
        },
        {
          q: "How do you implement trigger recursion prevention in Apex triggers?",
          expectation: "Describe bulk-safe recursion blockers using static Set patterns rather than simple booleans.",
          weak: "Use a static boolean variable set to true after the first execution to block other runs.",
          strong: (
            <span>
              While a simple static boolean (e.g., <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">runOnce</code>) works for single records, it fails during bulk DML updates because Salesforce batches records in chunks of 200, which resets the transaction context but retains static variables. A bulk-safe design uses a helper class with a static <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Set&lt;Id&gt;</code> to store processed record IDs. The handler compares incoming records against the set, filters out already processed records, executes logic, and adds the IDs to the set.
            </span>
          )
        }
      ]
    },
    {
      title: "Advanced Trigger Questions",
      questions: [
        {
          q: "Explain the Salesforce Save Order of Execution and where Apex triggers fit in this flow.",
          expectation: "Detail the exact sequence: before-save flows, before triggers, validation rules, after triggers, after-save flows.",
          weak: "Triggers run first, then validations run, then the database saves the records.",
          strong: (
            <span>
              The Save Order of Execution is: 1) System validation and Before-Save Flows run. 2) Before Apex Triggers execute. 3) Custom validation rules execute. 4) Record is written to the database (not committed). 5) After Apex Triggers execute. 6) After-Save Flows execute. Knowing this, updates that occur after validation rules must happen in After-Save paths, whereas initial field sanitization belongs in Before-Save flows. For low-code limits, check our <Link to="/salesforce-flow-interview-questions" className="text-blue-400 hover:underline">Salesforce Flow Guide</Link>.
            </span>
          )
        },
        {
          q: "How do you handle Mixed DML Exceptions in Apex Triggers when updating setup and non-setup records?",
          expectation: "Explain split transaction boundaries, invocable methods, future annotations, and Queueable jobs.",
          weak: "You just use try-catch blocks to capture the error and retry the insert.",
          strong: (
            <span>
              A Mixed DML Exception occurs when you update a setup object (e.g., User or Group) and a non-setup object (e.g., Account or Contact) in the same transaction block. To resolve this inside triggers, you must isolate one of the DML actions by running it asynchronously. You can invoke a Queueable class or call a helper method decorated with <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">@future</code> to run the setup DML in a separate transaction thread.
            </span>
          )
        },
        {
          q: "What is asynchronous trigger processing, and how do you design triggers to handle high-volume event publishing?",
          expectation: "Discuss Platform Events, Event-Driven Architecture, and execution isolation.",
          weak: "Use future methods inside the trigger to run all calculations in the background.",
          strong: (
            <span>
              Asynchronous trigger processing is achieved via Platform Events and Event-Driven architecture. A trigger can publish a Platform Event, which executes an event-based trigger asynchronously in a separate transaction. This isolates complex calculations, avoids database locks, and provides a fresh set of governor limits. Practice designing high-scale integration architectures on our <Link to="/salesforce-mock-interview" className="text-blue-400 hover:underline">Salesforce Mock Interview Screen</Link>.
            </span>
          )
        }
      ]
    },
    {
      title: "Scenario-Based Trigger Questions",
      questions: [
        {
          q: "Scenario: You have a trigger that updates contact fields when an account is updated. However, the contact update trigger updates account fields, causing a loop. How do you resolve this?",
          expectation: "Diagnose recursive loops, filter parameters, and configure bypass variables.",
          weak: "Use a simple boolean flag in a helper class to stop the contact trigger from updating the account.",
          strong: (
            <span>
              This is a recursive update loop. To resolve this, implement double-guarded entry criteria. In the Account trigger, only update Contacts if relevant Account fields have changed (comparing <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Trigger.new</code> to <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Trigger.oldMap</code>). In the Contact trigger, check that Contact values differ before calling DML. Finally, implement a static bypass configuration class to allow programmatically disabling either trigger during updates. Practice resolving these loops on our <Link to="/salesforce-mock-interview" className="text-blue-400 hover:underline">Salesforce Mock Interview Screen</Link>.
            </span>
          )
        },
        {
          q: "Scenario: A batch data load of 10,000 Opportunity records fails with 'Too many SOQL queries: 101' in a related Trigger. How do you troubleshoot?",
          expectation: "Identify query-in-loop bottlenecks, apply bulk collections, and leverage Maps for bulk lookups.",
          weak: "I would reduce the data load batch size from 200 to 50 in the Data Loader.",
          strong: (
            <span>
              Reducing batch size is a temporary workaround. The query is executing inside a loop. Refactor the Trigger Handler to extract the query out of the loop. Gather parent Account IDs in a Set, execute a single query outside the loop, load results into a Map (<code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Map&lt;Id, Account&gt;</code>), and query values in-memory inside the loop, limiting database hits to one query.
            </span>
          )
        },
        {
          q: "Scenario: How do you bypass all Apex triggers programmatically during a large migration?",
          expectation: "Discuss custom settings or custom metadata check structures built into handlers.",
          weak: "Deactivate triggers in sandbox and deploy them as inactive files.",
          strong: (
            <span>
              Configure a hierarchical Custom Setting or Custom Metadata Type bypass flag. In the Trigger Handler orchestrator, query this bypass flag. If set to true, return immediately from execution. This enables administrators to bypass triggers dynamically for specific data loads without deploying code.
            </span>
          )
        }
      ]
    },
    {
      title: "Trigger Architecture Questions",
      questions: [
        {
          q: "How do you design a trigger to handle partial success during bulk updates?",
          expectation: "Discuss using Database methods, error handling, and the addError() record method.",
          weak: "Use try-catch blocks to catch the exception and print the log.",
          strong: (
            <span>
              For bulk updates, use database methods (like <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Database.update(records, false)</code>) to allow partial success. Inside the trigger, use the <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">addError()</code> method on specific invalid records. This rolls back changes for those specific records and reports failures, while letting valid records commit.
            </span>
          )
        },
        {
          q: "What is the Unit of Work pattern, and how does it optimize trigger DML performance?",
          expectation: "Explain transactional DML registries, ordering execution, and reducing database lock times.",
          weak: "It is a class that manages your queries and loops to save memory.",
          strong: (
            <span>
              The Unit of Work pattern registers database operations during trigger execution. Instead of executing multiple DML statements on different objects throughout the handlers, the Unit of Work commits all transactions at the end of the trigger in a single block. This optimizes Save Order, minimizes DML statements, and prevents database locking bottlenecks.
            </span>
          )
        },
        {
          q: "How does the virtual database state ($Record) differ between Flow Triggers and Apex Triggers?",
          expectation: "Contrast list processing, prior value evaluations, and CPU timing overheads.",
          weak: "Apex uses Trigger.new and Flow uses $Record, but they are exactly the same.",
          strong: (
            <span>
              Apex triggers process batches of records via context lists (<code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Trigger.new</code>/<code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">Trigger.old</code>). Flow triggers evaluate records individually using the <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">$Record</code> and <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">$Record__Prior</code> variables. Furthermore, modifications to `$Record` in Before-Save flows are automatically committed, while modifying `Trigger.new` requires manual assignment in before trigger events.
            </span>
          )
        }
      ]
    }
  ];

  return (
    <div className="text-slate-300 antialiased relative overflow-hidden">
      <Helmet>
        <title>Salesforce Apex Trigger Interview Questions & Answers Guide (2026) | ForcePilot AI</title>
        <meta
          name="description"
          content="Master Salesforce Apex Trigger interview questions. Deep dives into before vs after trigger execution, trigger handler frameworks, bulkification, and transaction control."
        />
        <meta name="keywords" content="apex trigger interview questions, salesforce trigger interview questions, before vs after trigger, trigger handler framework, trigger bulkification, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/apex-trigger-interview-questions" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce Apex Trigger Interview Questions & Answers Guide (2026) | ForcePilot AI" />
        <meta property="og:description" content="Master Salesforce Apex Trigger interview questions. Study before vs after trigger execution, trigger handler frameworks, and bulkification." />
        <meta property="og:url" content="https://forcepilotai.online/apex-trigger-interview-questions" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
        
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
            <span className="label-text">Apex Engineering Track</span>
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="guide-hero-title">
            <span className="block pb-1 sm:pb-2 overflow-visible">Salesforce Apex</span>
            <span className="block mt-1 sm:mt-2 md:mt-2.5 pb-[0.25em] overflow-visible text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-500">
              Trigger Interview Questions
            </span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="guide-hero-subtitle">
            The definitive guide to production-grade Apex triggers. Master before vs after trigger details, trigger handler framework setups, and trigger bulkification patterns.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 sm:mb-0">
            <Link
              to="/#setup"
              state={{ role: "Salesforce Apex Developer" }}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-base sm:text-lg transition-all shadow-[0_0_40px_rgba(59,130,246,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
            >
              Practice Apex Trigger Interviews
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform sm:size-[22px]"
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 space-y-16 sm:space-y-24 pb-8 sm:pb-12">
        {/* Quick Nav */}
      <motion.nav 
        variants={revealStaggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { title: "Flow Interview", link: "/salesforce-flow-interview-questions", color: "emerald", icon: Layers },
          { title: "Apex Questions", link: "/apex-interview-questions", color: "cyan", icon: Code2 },
          { title: "Governor Limits", link: "/governor-limits-explained", color: "rose", icon: ShieldAlert },
          { title: "Scenario Based", link: "/scenario-based-salesforce-interview", color: "blue", icon: Search }
        ].map((link, i) => (
          <motion.div key={i} variants={revealFadeUp}>
            <Link to={link.link} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${link.color}-500/10 text-${link.color}-400 group-hover:scale-110 transition-transform`}>
                  <link.icon size={20} />
                </div>
                <span className="font-bold text-white text-sm">{link.title}</span>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {/* Focus Areas */}
      <section className="space-y-16">
        <motion.div 
          variants={revealFadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Core <span className="text-blue-400">Concepts</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Master the trigger nuances that separate senior architects from junior developers.</p>
        </motion.div>

        <motion.div 
          variants={revealStaggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {sections.map((section, i) => (
            <motion.div 
              key={i}
              variants={revealFadeUp}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm mb-6">
                {section.desc}
              </p>
              <div className="space-y-3">
                {section.topics.map((topic, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 size={14} className="text-blue-500/60" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Questions Section */}
      <section className="space-y-24">
        {triggerQuestions.map((section, idx) => (
          <div key={idx} className="space-y-8">
            <motion.h2 
              variants={revealFadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-blue-500 pl-4"
            >
              {section.title}
            </motion.h2>

            <motion.div 
              variants={revealStaggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid gap-6 sm:gap-8"
            >
              {section.questions.map((item, qIdx) => (
                <motion.div
                  key={qIdx}
                  variants={revealFadeUp}
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
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <motion.section 
        variants={revealFadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-blue-500 pl-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-blue-400 transition-colors">
                What are Salesforce Apex triggers?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Apex triggers are database scripts that run before or after DML transactions (inserts, updates, deletes, merges) execute on Salesforce records. They enable developers to build custom validations, propagate related updates, and interface with third-party software.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-blue-400 transition-colors">
                Why is putting business logic directly in the trigger body considered a red flag?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Putting logic directly inside the trigger body makes code difficult to maintain, test, and reuse. It prevents developers from implementing bypass structures or controlling recursion. Best practices dictate using a Trigger Handler pattern.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-blue-400 transition-colors">
                How do you handle trigger exceptions gracefully in bulk operations?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Use the <code className="text-blue-400 bg-slate-950 px-1 rounded font-mono">addError()</code> method on specific records inside the trigger to display user-friendly error messages on screen without rolling back the entire DML batch, keeping partial updates intact.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-blue-400 transition-colors">
                What is the CPU time limit and how does it affect triggers?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Apex triggers share the synchronous transaction CPU time limit (10 seconds). To prevent CPU time outs, avoid nested loop structures, use indexing, and offload calculations to Queueable jobs.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-blue-400 transition-colors">
                How does ForcePilot AI help developers master trigger architecture?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              ForcePilot AI assesses your trigger code structure, recursion handling, and bulkification patterns. You can practice responding to recruiter questions in real-time on our interactive <Link to="/salesforce-mock-interview" className="text-blue-400 hover:underline">Salesforce Mock Interview</Link> screen.
            </div>
          </details>
        </div>
      </motion.section>

      {/* Recruiter Intelligence */}
      <motion.section 
        variants={revealFadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-8 sm:p-20 flex flex-col lg:flex-row items-center gap-16"
      >
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Think like a <br />
            <span className="text-indigo-400">Technical Lead</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Interviewer expectations have evolved. They don't just want to see code that works; they want to see code that is <strong>defensive</strong>. ForcePilot AI evaluates your ability to handle null pointer exceptions, bulk data scenarios, and complex governor limit constraints.
          </p>
          <div className="flex gap-4">
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
              Bulkification First
            </div>
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold">
              Clean Architecture
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
              <AlertCircle size={20} />
            </div>
            <div className="text-sm font-bold text-white">Recruiter Red Flag</div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            "Avoid putting logic directly in the trigger body. Always use a Handler class. This shows you understand separation of concerns and testability."
          </p>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full w-[85%] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          </div>
          <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest text-center">Architectural Maturity</div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        variants={revealFadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center"
      >        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Stop Coding <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Start Engineering
            </span>
          </h2>
          <div className="pt-8">
            <Link
              to="/#setup"
              state={{ role: "Salesforce Apex Developer" }}
              className="px-6 py-4 text-sm sm:px-10 sm:py-5 sm:text-base lg:px-14 lg:py-6 lg:text-xl bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black transition-all shadow-[0_0_50px_rgba(59,130,246,0.3)] flex items-center justify-center gap-4 mx-auto group active:scale-95 text-center"
            >
              Start Trigger Practice
              <ArrowRight className="size-4 sm:size-5 lg:size-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.section>

      <footer className="text-center text-slate-400 text-sm py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-8">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/salesforce-mock-interview" className="hover:text-blue-400 transition-colors">Mock Interview</Link>
          <Link to="/governor-limits-explained" className="hover:text-blue-400 transition-colors">Governor Limits</Link>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default ApexTriggerInterviewQuestions;
