import React from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Database, 
  Zap, 
  
  Workflow,
  Search,
  CheckCircle2,
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

const SalesforceAdminInterview: React.FC = () => {
  const faqSchema = React.useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between a role and a profile?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Profiles determine what permissions a user has (object access, fields, page layouts). Roles determine which data records a user can access based on the organization hierarchy."
        }
      },
      {
        "@type": "Question",
        "name": "How does Salesforce enforce field-level security?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Field-Level Security (FLS) controls whether a user can see, edit, or delete specific fields on an object. Admins configure FLS on Profiles or Permission Sets, and it is automatically respected across page layouts, search results, reports, and list views."
        }
      },
      {
        "@type": "Question",
        "name": "What is a validation rule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Validation Rule contains a formula that evaluates record fields on save. If the formula evaluates to True, it blocks the save operation and displays a custom error message to ensure data quality."
        }
      },
      {
        "@type": "Question",
        "name": "How do you migrate legacy Workflow Rules to Flow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Salesforce provides a native 'Migrate to Flow' tool that converts legacy Workflow Rules and Process Builders into record-triggered flows. Admins should use this tool to consolidate and optimize automations."
        }
      },
      {
        "@type": "Question",
        "name": "How does ForcePilot AI help admins prepare for certification and job interviews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ForcePilot AI generates real-world scenario questions and mock interview simulations that assess your security design, automation configuration, and data integrity logic. Practice in real-time on our Salesforce Mock Interview Screen."
        }
      }
    ]
  }), []);

  useJsonLd(faqSchema, "schema-faq");

  const domains = [
    {
      title: "Security & Access Control",
      desc: "Master the Salesforce sharing model, from Org-Wide Defaults to Permission Set Groups.",
      topics: ["OWD vs Sharing Rules", "Profiles vs Permission Sets", "Manual Sharing", "Restriction Rules"]
    },
    {
      title: "Automation & Flow",
      desc: "Transitioning from Workflow and Process Builder to the power of Salesforce Flow.",
      topics: ["Record-Triggered Flows", "Before-Save Optimization", "Screen Flows", "Fault Paths"]
    },
    {
      title: "Data & User Management",
      desc: "Best practices for data integrity, user lifecycle, and license management.",
      topics: ["Validation Rules", "Data Import Wizard", "Lookup vs Master-Detail", "User Freezing vs Deactivation"]
    }
  ];

  const adminQuestions: QuestionSection[] = [
    {
      title: "Beginner Admin Questions",
      questions: [
        {
          q: "Explain the difference between profiles and roles in Salesforce.",
          expectation: "Clearly explain object/field access (Profiles) vs. record-level visibility (Roles).",
          weak: "Profiles are for permissions and roles are for showing who is the boss in the hierarchy.",
          strong: (
            <span>
              Profiles control object permissions, field-level security, page layouts, and system privileges—defining <strong>what</strong> a user can do on the platform. Roles control record-level visibility via the Role Hierarchy—defining <strong>which</strong> records a user can view or edit. A user must have exactly one Profile, while a Role is optional but recommended for data sharing.
            </span>
          )
        },
        {
          q: "What are validation rules, and when should you use them?",
          expectation: "Detail data integrity enforcement, conditional formulas, and error message mapping.",
          weak: "Validation rules are used to make fields required so users don't skip them.",
          strong: (
            <span>
              Validation rules execute formula expressions when a record is saved. If the formula evaluates to True, it indicates an error, blocks the save operation, and displays a custom error message. They are used to enforce business rules and maintain data integrity, such as verifying that an Opportunity closed-lost reason is filled out only when the stage is 'Closed Lost'.
            </span>
          )
        },
        {
          q: "What is the difference between a lookup relationship and a master-detail relationship?",
          expectation: "Contrast record ownership, cascading deletes, rollup summaries, and sharing configurations.",
          weak: "Master-detail is a strong link and lookup is a weak link between objects.",
          strong: (
            <span>
              In a Master-Detail relationship, the detail record's lifecycle, sharing access, and ownership are inherited from the master record; if the master is deleted, all detail records are cascade-deleted, and you can create Roll-Up Summary fields on the master. In a Lookup relationship, records are linked loosely: they maintain independent ownership, sharing rules, and deletion of the parent does not cascade-delete the child.
            </span>
          )
        }
      ]
    },
    {
      title: "Intermediate Admin Questions",
      questions: [
        {
          q: "How do Permission Sets differ from Profiles, and why has Salesforce shifted to a 'Permission Set-Led' security model?",
          expectation: "Contrast baseline access vs. incremental access, group permissions, and profile consolidation.",
          weak: "Permission sets are extra profiles you assign to users to give them more permissions.",
          strong: (
            <span>
              Profiles define baseline access, but Salesforce is consolidating profile functionality. Permission Sets and Permission Set Groups allow you to grant incremental permissions to specific users without creating new profiles. This prevents profile creep, allowing admins to maintain a single base profile per department and assign functional permissions dynamically. Study scaling boundaries in our <Link to="/governor-limits-explained" className="text-emerald-400 hover:underline">Governor Limits Explained Guide</Link>.
            </span>
          )
        },
        {
          q: "What is the Salesforce Sharing Model, and how do Org-Wide Defaults (OWD) interact with Sharing Rules?",
          expectation: "Describe OWD default-deny behavior, role hierarchy inheritance, and sharing rules as exception models.",
          weak: "Sharing rules are used to make records public for everyone in the organization.",
          strong: (
            <span>
              The sharing model begins with Org-Wide Defaults (OWD), defining the most restrictive access level (Private, Public Read-Only, Public Read/Write). We then open access using the Role Hierarchy (vertical sharing) and Sharing Rules (horizontal sharing based on owner or criteria). Sharing rules are exception-based: they only open access; they can never restrict access beyond the OWD baseline.
            </span>
          )
        },
        {
          q: "What are record types, and how do they control page layouts and picklist values?",
          expectation: "Describe business process variations, picklist subsets, and mapping profiles to layouts.",
          weak: "Record types let you create different screens for different users.",
          strong: (
            <span>
              Record Types allow you to offer different business processes, page layouts, and picklist values to different users based on their needs. For example, a support team might use a 'Technical Case' record type with specific fields and stages, while a billing team uses a 'Billing Case' record type. Admins map record types to page layouts per profile to customize the user experience.
            </span>
          )
        }
      ]
    },
    {
      title: "Advanced Admin Questions",
      questions: [
        {
          q: "Explain how you design and configure an Approval Process in Salesforce.",
          expectation: "Detail entry criteria, initial submission steps, approval/rejection gates, and automated field actions.",
          weak: "You create a process that routes a record to a manager when a user clicks submit.",
          strong: (
            <span>
              An Approval Process automates how records are approved. It requires: 1) Entry Criteria (which records qualify). 2) Initial Submission Actions (locking the record, updating fields). 3) Approval Steps (defining assigned approvers, delegates, or queues). 4) Final Approval/Rejection Actions (unlocking records, updating status fields, sending emails). Practice architecting business flows on our <Link to="/scenario-based-salesforce-interview" className="text-emerald-400 hover:underline">Scenario Interview Page</Link>.
            </span>
          )
        },
        {
          q: "What are the differences between custom reports, dashboards, and reporting snapshots?",
          expectation: "Describe folder security, dynamic dashboards, historical trending, and running users.",
          weak: "Reports show lists of records, and dashboards show visual charts of those reports.",
          strong: (
            <span>
              Reports are queries that extract record lists matching criteria. Dashboards present report data visually (charts, gauges). Dashboards can run under a 'Running User' to show static security views, or dynamically to match the logged-in user's sharing. Reporting Snapshots capture historical data trends by writing report summary data to a custom object on a recurring schedule. Learn real-time database query optimizations in our <Link to="/governor-limits-explained" className="text-emerald-400 hover:underline">Governor Limits Explained</Link> resource.
            </span>
          )
        },
        {
          q: "What tools are available for importing and exporting data, and when would you use each?",
          expectation: "Contrast Data Import Wizard limits vs. Data Loader API capacities.",
          weak: "You use Data Loader for everything because it is faster and does more objects.",
          strong: (
            <span>
              Use the Data Import Wizard for simple imports (up to 50,000 records) of standard or custom objects; it runs directly in the browser, enforces validation rules, and automatically checks for duplicates. Use Data Loader for large datasets (up to 5,000,000 records), exporting/deleting records, or automated schedules; it executes via the Bulk/SOAP API and requires a desktop installation.
            </span>
          )
        }
      ]
    },
    {
      title: "Scenario-Based Admin Questions",
      questions: [
        {
          q: "Scenario: A sales manager needs to view all opportunity records, but the sales reps should only see their own. How do you configure this?",
          expectation: "Configure OWD to Private and leverage Role Hierarchy upward inheritance.",
          weak: "Create a sharing rule that shares all opportunity records with the sales manager.",
          strong: (
            <span>
              First, set the Org-Wide Default (OWD) for Opportunities to 'Private' to ensure sales reps are restricted to their own records. Next, configure the Role Hierarchy so that Sales Reps report up to the Sales Manager role. By default, Salesforce rolls record visibility upwards through the hierarchy, granting the manager automatic access to all records owned by their subordinates without requiring sharing rules.
            </span>
          )
        },
        {
          q: "Scenario: A business requires Opportunity records to lock automatically once they reach the 'Closed Won' stage, preventing all edits except by the System Administrator. How do you implement this?",
          expectation: "Enforce validation rule checks against closed states and system profiles.",
          weak: "Make all fields read-only on the page layout for closed won opportunities.",
          strong: (
            <span>
              To enforce a database-level lock, implement a Validation Rule. The formula evaluates: <code className="text-emerald-400 bg-slate-950 px-1 rounded font-mono">PRIORVALUE(IsClosed) = True && $Profile.Name != 'System Administrator'</code>. This blocks all edits once closed, regardless of how the update is initiated. Practice analyzing system-level automation behaviors on our <Link to="/salesforce-flow-interview-questions" className="text-emerald-400 hover:underline">Salesforce Flow Guide</Link>.
            </span>
          )
        },
        {
          q: "Scenario: Users report that a critical Validation Rule is failing to fire when records are uploaded via a legacy data load. What is the cause?",
          expectation: "Explain user validation bypass conditions and rule activation states.",
          weak: "Validation rules are ignored by Data Loader because APIs bypass validation.",
          strong: (
            <span>
              Validation rules execute during standard API data loads. If a rule fails to fire, the primary causes are: 1) The user executing the data load is explicitly excluded from the validation rule logic (e.g. via a profile or custom permission bypass filter). 2) The import was run with a tool that bypassed database validations. 3) The validation rule was deactivated during the import window.
            </span>
          )
        }
      ]
    },
    {
      title: "Security & Automation Questions",
      questions: [
        {
          q: "How do you choose between Salesforce Flow and legacy Process Builder / Workflow Rules in 2026?",
          expectation: "Discuss the deprecation of legacy engines, CPU efficiency gains, and flow orchestration.",
          weak: "Use workflows for simple alerts, process builder for multiple actions, and flows for complex things.",
          strong: (
            <span>
              Salesforce has deprecated Workflow Rules and Process Builder, replacing them with Salesforce Flow. Flows execute directly on the platform kernel, consuming significantly less CPU time than legacy Process Builders (which ran as heavy Aura configurations). Admins should use Record-Triggered Flows for back-end updates, Screen Flows for user guides, and Flow Trigger Explorer to manage execution order.
            </span>
          )
        },
        {
          q: "How do you prevent recursive automation loops when a Flow updates a record that is also evaluated by other triggers?",
          expectation: "Establish strict entry conditions, prior value evaluations, and automation consolidation.",
          weak: "Deactivate other flows when you create a new one to avoid conflicts.",
          strong: (
            <span>
              Recursion happens when a flow update triggers downstream logic that re-evaluates and updates the original record, causing a loop. To prevent this: 1) Set strict Flow 'Entry Conditions' so it only fires when specific fields change. 2) Utilize formula conditions evaluating `$Record__Prior` to verify if values differ. 3) Consolidate automations to ensure field updates happen in Before-Save flows. Practice on our <Link to="/salesforce-mock-interview" className="text-emerald-400 hover:underline">Salesforce Mock Interview Screen</Link>.
            </span>
          )
        },
        {
          q: "Explain the concept of 'Least Privilege' and how you apply it when configuring a new user profile.",
          expectation: "Define baseline security configurations, permission sets integration, and user groupings.",
          weak: "Give users a standard profile and add permissions when they get errors.",
          strong: (
            <span>
              The principle of Least Privilege dictates that users should only have the minimum access necessary to perform their job. I apply this by assigning a highly restricted base Profile (minimum object read permissions, no 'Modify All Data' or administrative rights). I then grant functional permissions (create/edit rights, special system permissions) incrementally using Permission Sets or Permission Set Groups based on job requirements.
            </span>
          )
        }
      ]
    }
  ];

  return (
    <div className="text-slate-300 antialiased relative overflow-hidden">
      <Helmet>
        <title>Salesforce Admin Interview Questions & Answers Guide (2026) | ForcePilot AI</title>
        <meta
          name="description"
          content="Master your Salesforce Admin interview with expert-verified Salesforce Administrator interview questions and answers. Practice security, profiles, sharing rules, and flows."
        />
        <meta name="keywords" content="salesforce admin interview questions, salesforce administrator interview questions, salesforce admin scenario questions, salesforce admin mock interview, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/salesforce-admin-interview" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce Admin Interview Questions & Answers Guide (2026) | ForcePilot AI" />
        <meta property="og:description" content="Master your Salesforce Admin interview with expert-verified Salesforce Administrator interview questions." />
        <meta property="og:url" content="https://forcepilotai.online/salesforce-admin-interview" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Salesforce Admin Interview Questions & Answers Guide (2026) | ForcePilot AI" />
        <meta name="twitter:description" content="AI-powered Salesforce Admin interview preparation guide." />
        
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
            <span className="label-text">Admin Excellence Track</span>
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="guide-hero-title">
            <span className="block pb-1 sm:pb-2 overflow-visible">Salesforce Admin</span>
            <span className="block mt-1 sm:mt-2 md:mt-2.5 pb-[0.25em] overflow-visible text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
              Interview Questions
            </span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="guide-hero-subtitle">
            Master salesforce administrator interview questions and salesforce admin scenario questions. Practice your response structure with our admin mock interview guides covering profiles, roles, permission sets, and flows.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 sm:mb-0">
            <Link
              to="/#setup"
              state={{ role: "Salesforce Admin" }}
              className="w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-base sm:text-lg transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
            >
              Practice Admin Interviews
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform sm:size-[22px]" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 space-y-16 sm:space-y-24 pb-8 sm:pb-12">
      {/* Quick Nav Links */}

      <motion.nav 
        variants={revealStaggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-0"
      >
        {[
          { title: "Flow Interview", link: "/salesforce-flow-interview-questions", color: "emerald", icon: Workflow },
          { title: "Mock Interview", link: "/salesforce-mock-interview", color: "cyan", icon: Zap },
          { title: "Apex Triggers", link: "/apex-trigger-interview-questions", color: "blue", icon: Database },
          { title: "Scenario Based", link: "/scenario-based-salesforce-interview", color: "rose", icon: Search }
        ].map((link, i) => (
          <motion.div key={i} variants={revealFadeUp}>
            <Link to={link.link} className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group flex items-center justify-between h-full">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 sm:p-3 rounded-xl bg-${link.color}-500/10 text-${link.color}-400 group-hover:scale-110 transition-transform`}>
                  <link.icon size={18} className="sm:size-[20px]" />
                </div>
                <span className="font-bold text-white text-xs sm:text-sm">{link.title}</span>
              </div>
              <ChevronRight size={16} className="text-slate-600 group-hover:translate-x-1 group-hover:text-white transition-all sm:size-[18px]" />
            </Link>
          </motion.div>
        ))}
      </motion.nav>

      {/* Focus Domains */}
      <section className="space-y-12 sm:space-y-16">
        <motion.div 
          variants={revealFadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-2xl sm:text-5xl font-bold text-white tracking-tight">Focus <span className="text-emerald-400">Domains</span></h2>
          <p className="text-slate-500 text-xs sm:text-base max-w-2xl mx-auto px-4 sm:px-0">Master the critical areas recruiters focus on during Admin interviews.</p>
        </motion.div>

        <motion.div 
          variants={revealStaggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {domains.map((section, i) => (
            <motion.div 
              key={i}
              variants={revealFadeUp}
              className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{section.title}</h3>
              <p className="text-slate-500 leading-relaxed text-xs sm:text-sm mb-6">
                {section.desc}
              </p>
              <div className="space-y-3">
                {section.topics.map((topic, j) => (
                  <div key={j} className="flex items-center gap-3 text-xs sm:text-sm text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-500/60" />
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
        {adminQuestions.map((section, idx) => (
          <div key={idx} className="space-y-8">
            <motion.h2 
              variants={revealFadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-emerald-500 pl-4"
            >
              {section.title}
            </motion.h2>

            <div className="grid gap-6 sm:gap-8">
              {section.questions.map((item, qIdx) => (
                <motion.div
                  key={qIdx}
                  variants={revealFadeUp}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
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
            </div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <motion.h2 
          variants={revealFadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-emerald-500 pl-4"
        >
          Frequently Asked Questions (FAQ)
        </motion.h2>
        <div className="space-y-4">
          {[
            {
              q: "What is the difference between a role and a profile?",
              a: "Profiles determine **what** permissions a user has (object access, fields, page layouts). Roles determine **which** data records a user can access based on the organization hierarchy."
            },
            {
              q: "How does Salesforce enforce field-level security?",
              a: "Field-Level Security (FLS) controls whether a user can see, edit, or delete specific fields on an object. Admins configure FLS on Profiles or Permission Sets, and it is automatically respected across page layouts, search results, reports, and list views."
            },
            {
              q: "What is a validation rule?",
              a: "A Validation Rule contains a formula that evaluates record fields on save. If the formula evaluates to True, it blocks the save operation and displays a custom error message to ensure data quality."
            },
            {
              q: "How do you migrate legacy Workflow Rules to Flow?",
              a: "Salesforce provides a native \"Migrate to Flow\" tool that converts legacy Workflow Rules and Process Builders into record-triggered flows. Admins should use this tool to consolidate and optimize automations."
            },
            {
              q: "How does ForcePilot AI help admins prepare for certification and job interviews?",
              a: (
                <>
                  ForcePilot AI generates real-world scenario questions and mock interview simulations that assess your security design, automation configuration, and data integrity logic. Practice in real-time on our <Link to="/salesforce-mock-interview" className="text-emerald-400 hover:underline">Salesforce Mock Interview Screen</Link>.
                </>
              )
            }
          ].map((faq, i) => (
            <motion.details 
              key={i}
              variants={revealFadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <h3 className="text-lg font-semibold text-white group-open:text-emerald-400 transition-colors">
                  {faq.q}
                </h3>
                <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <div className="mt-4 text-slate-300 leading-relaxed text-sm">
                {faq.a}
              </div>
            </motion.details>
          ))}
        </div>
      </section>

      {/* Recruiter Intelligence */}
      <motion.section 
        variants={revealFadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="bg-white/[0.01] border border-white/5 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-20 flex flex-col lg:flex-row items-center gap-12 sm:gap-16"
      >
        <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Think like a <br />
            <span className="text-cyan-400">System Architect</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            The best Admins don't just know where the buttons are; they understand the "why" behind every configuration. ForcePilot AI evaluates your ability to balance security with usability.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-white">90%</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Efficiency Boost</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-white">2026</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ready Content</div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={20} />
            </div>
            <div className="text-sm font-bold text-white">Security Evaluation</div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 text-xs text-slate-400 leading-relaxed italic">
              "When asked about OWD, never start with code. Explain the default-deny principle first."
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
              Pro-Tip: Mention Permission Set Groups for scalability.
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        variants={revealFadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-16 sm:py-24 text-center"
      >
        <div className="relative z-10 space-y-8 sm:space-y-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-7xl font-black text-white leading-tight">
            Ready to Ace <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Your Admin Interview?
            </span>
          </h2>
          <div className="pt-4 sm:pt-8">
            <Link
              to="/#setup"
              state={{ role: "Salesforce Admin" }}
              className="px-6 py-4 text-sm sm:px-10 sm:py-5 sm:text-base lg:px-14 lg:py-6 lg:text-xl bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black transition-all shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center justify-center gap-4 mx-auto group active:scale-95 text-center"
            >
              Start Practice Now
              <ArrowRight className="size-4 sm:size-5 lg:size-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.section>

      <footer className="text-center text-slate-600 text-sm py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-8">
          <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <Link to="/salesforce-mock-interview" className="hover:text-emerald-400 transition-colors">Mock Interview</Link>
          <Link to="/governor-limits-explained" className="hover:text-emerald-400 transition-colors">Governor Limits</Link>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default SalesforceAdminInterview;
