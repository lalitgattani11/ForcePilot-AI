import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ApexInterviewQuestions: React.FC = () => {
  const sections = [
    {
      title: "Beginner Apex Interview Questions",
      questions: [
        {
          q: "What is the difference between insert and Database.insert?",
          expectation:
            "Candidates should demonstrate knowledge of error handling and partial success in bulk DML operations.",
          weak: "One is a keyword and the other is a method. They both do the same thing.",
          strong:
            "The 'insert' DML statement is 'all or none'—if one record fails, the entire transaction rolls back. 'Database.insert' allows for partial success via the 'allOrNone' boolean parameter. It returns a 'Database.SaveResult' array which can be used to inspect success or failure for each individual record.",
        },
        {
          q: "Explain the difference between a Map and a Set in Apex.",
          expectation:
            "Clear understanding of collection types and their specific use cases in Salesforce development.",
          weak: "A Map has keys and values, a Set is just a list with no duplicates.",
          strong:
            "A Set is an unordered collection of unique elements, ideal for storing IDs for SOQL filters. A Map is a key-value pair collection, critical for bulkification where you need to quickly associate a record with its related data without nested loops (O(1) lookup complexity).",
        },
      ],
    },
    {
      title: "Trigger Interview Questions",
      questions: [
        {
          q: "Why is it best practice to have only one trigger per object?",
          expectation:
            "Understanding of execution order and maintainability in the Salesforce multi-tenant environment.",
          weak: "It makes the code easier to find and doesn't clutter the setup.",
          strong:
            "Salesforce does not guarantee the order of execution for multiple triggers on the same object. Having a single trigger (using a Trigger Handler pattern) ensures predictable execution order, prevents redundant SOQL/DML calls, and allows for cleaner control over recursion and bypass logic.",
        },
        {
          q: "When should you use a 'Before' trigger vs an 'After' trigger?",
          expectation:
            "Knowledge of the Trigger Save Order and efficiency in field updates.",
          weak: "Before is for before saving, After is for after saving.",
          strong:
            "Use 'Before' triggers for field validation and updating fields on the same record (since you don't need a DML statement). Use 'After' triggers for operations that require the record ID (like creating related records) or when you need to interact with records other than the one that fired the trigger.",
        },
      ],
    },
    {
      title: "Governor Limits Questions",
      questions: [
        {
          q: "How do you handle the 'Too many SOQL queries: 101' error?",
          expectation:
            "Identification of SOQL-in-loop anti-patterns and bulkification strategies.",
          weak: "I would try to reduce the number of records being processed or use a try-catch block.",
          strong:
            "This usually happens when SOQL is inside a loop. I solve this by 'moving the query out of the loop.' I collect necessary IDs in a Set, perform one bulk query outside the loop, and use a Map to associate the results back to the records. For complex logic, I might also use parent-child subqueries to reduce the total number of SOQL calls.",
        },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 text-slate-300">
      <Helmet>
        <title>Apex Interview Questions & Answers 2026 | ForcePilot AI</title>
        <meta
          name="description"
          content="Master your Salesforce developer interview with expert-verified Apex interview questions. Technical deep-dives into Governor Limits, Triggers, and Bulkification."
        />
        <link
          rel="canonical"
          href="https://forcepilotai.online/apex-interview-questions"
        />
        <meta
          property="og:title"
          content="Apex Interview Questions & Answers 2026 | ForcePilot AI"
        />
        <meta
          property="og:description"
          content="Master your Salesforce developer interview with expert-verified Apex interview questions. Technical deep-dives into Governor Limits, Triggers, and Bulkification."
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
          content="Apex Interview Questions & Answers 2026 | ForcePilot AI"
        />
        <meta
          name="twitter:description"
          content="Master your Salesforce developer interview with expert-verified Apex interview questions. Technical deep-dives into Governor Limits, Triggers, and Bulkification."
        />
        <meta
          name="twitter:image"
          content="https://forcepilotai.online/pwa-512.png"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative text-center space-y-10 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-6 py-2 text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase backdrop-blur-md mb-4"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span>Technical Interview Intelligence</span>
        </motion.div>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
          Master the{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Apex Interview
          </span>
        </h1>
        <p className="text-sm sm:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal sm:font-medium">
          The definitive guide to Salesforce Developer interviews. Technical
          deep-dives, recruiter expectations, and production-grade answer
          strategies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link
            to="/#setup"
            state={{ role: "Salesforce Apex Developer" }}
            className="w-full sm:w-auto px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Practice Real Apex Interviews
            <ArrowRight
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>

      {/* Internal Linking / Resources Bar */}
      <nav className="grid sm:grid-cols-2 gap-4">
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

            <div className="grid gap-8">
              {section.questions.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6"
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
                      <p className="text-slate-300 text-sm">{item.strong}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

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
