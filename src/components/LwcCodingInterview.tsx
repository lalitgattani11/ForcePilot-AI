import React from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Search, 
  Activity,
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

const LwcCodingInterview: React.FC = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the main difference between LWC and Aura?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "LWC is a modern, lightweight framework built on native web standards (like Custom Elements, Shadow DOM, and ES6+ modules), which allows it to execute directly in browser engines without heavy abstraction layers. Aura is a legacy framework created before these native web standards existed, requiring a heavier JavaScript runtime and producing slower rendering cycles."
                }
              },
              {
                "@type": "Question",
                "name": "How do you handle styling overrides inside Shadow DOM boundaries in LWC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Due to shadow encapsulation, global styles cannot target elements inside a component. To override styles, use CSS Custom Properties (variables) defined by standard Salesforce styling hooks (e.g., --sds-c-*), declare styling hooks in the parent, or configure the component to render in the Light DOM (which bypasses shadow DOM styling constraints)."
                }
              },
              {
                "@type": "Question",
                "name": "Can you call an Apex method with parameters imperatively in LWC?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. You import the Apex method inside JavaScript and call it imperatively like a standard function, passing an object representing the parameters: apexMethodName({ paramName: value }). This returns a Promise that resolves with the return value or rejects with an error."
                }
              },
              {
                "@type": "Question",
                "name": "How can we run a performance audit on LWC components?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can perform audits using standard browser Developer Tools (Chrome DevTools Performance and Lighthouse panels), or install the Salesforce Lightning Inspector Extension. These tools track layout recalculations, evaluate script compile sizes, and record wire service latency rates."
                }
              },
              {
                "@type": "Question",
                "name": "Does LWC support double-data binding in templates?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. LWC enforces a strict one-way data flow model from JavaScript properties to HTML template elements. To pass values back to JavaScript, you must capture input events (e.g., onchange) and update JavaScript properties manually."
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

  const pillars = [
    {
      title: "Reactivity & Data Flow",
      desc: "Master the nuances of @api, @wire, and @track in modern LWC.",
      topics: ["Wire Service Lifecycle", "Reactive Properties", "Public vs Private APIs", "LMS & PubSub"]
    },
    {
      title: "Component Architecture",
      desc: "Building modular, reusable, and performant web components.",
      topics: ["Shadow DOM Boundaries", "Event Propagation (Bubbling)", "Composition vs Inheritance", "Lifecycle Hooks Sequence"]
    },
    {
      title: "Performance & Security",
      desc: "Optimizing the frontend for enterprise-scale Salesforce orgs.",
      topics: ["Locker Service vs LWS", "Lightning Data Service", "Render Optimization", "Security Best Practices (XSS/CSRF)"]
    }
  ];

  const lwcQuestions: QuestionSection[] = [
    {
      title: "Beginner LWC Questions",
      questions: [
        {
          q: "Explain the difference between @api and @track decorators in Lightning Web Components.",
          expectation: "Clearly explain public property exposure vs. private property state tracking, reactive render loops, and property reactivity changes.",
          weak: "One is for public properties and the other is for private properties so they can update the screen.",
          strong: (
            <span>
              The <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">@api</code> decorator exposes a public property or method, making it configurable by a parent component (enabling parent-to-child data flow). It is reactive; if the parent updates the value, LWC rerenders. The <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">@track</code> decorator makes private properties reactive, specifically for tracking mutations inside objects or arrays. Since the Spring '20 release, simple private properties are reactive by default; <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">@track</code> is only required to detect nested state changes in objects or arrays.
            </span>
          )
        },
        {
          q: "How do you pass data from a parent component to a child component and vice-versa in LWC?",
          expectation: "Demonstrate understanding of public property binding (down-flow) and Custom Events dispatching (up-flow).",
          weak: "Parents pass attributes in the HTML markup, and children send variables using standard JavaScript function calls.",
          strong: (
            <span>
              Data flows down from parent to child via public properties decorated with <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">@api</code> in the child. To pass data up, the child dispatches a custom event using <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">this.dispatchEvent(new CustomEvent('eventname', &#123; detail: payload &#125;))</code>. The parent catches this event by registering an listener attribute (<code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">oneventname=&#123;handleEvent&#125;</code>) in its HTML markup.
            </span>
          )
        },
        {
          q: "What is the purpose of lifecycle hooks in LWC, and what is the execution order of standard hooks?",
          expectation: "Explain component setup stages, connecting/rendering milestones, and cleanup requirements.",
          weak: "Lifecycle hooks run when the component loads or unloads to execute custom Javascript.",
          strong: (
            <span>
              Lifecycle hooks manage a component's lifecycle. The execution sequence is: 1) <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">constructor</code> (invokes <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">super()</code>, sets defaults, DOM not ready); 2) <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">connectedCallback</code> (element inserted into DOM, ideal for initiating data fetches); 3) <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">renderedCallback</code> (UI updates completed; avoid updating reactive fields here as it triggers infinite rendering); 4) <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">disconnectedCallback</code> (component removed; clean up window listeners and timers).
            </span>
          )
        }
      ]
    },
    {
      title: "Intermediate LWC Questions",
      questions: [
        {
          q: "What is the Wire Service in LWC, and how does it handle data caching and reactive updates?",
          expectation: "Explain the Lightning Data Service caching layer, wire adaptors, parameter reactivity, and cache refreshing.",
          weak: "It's a decorator that automatically hooks LWC components to Apex databases.",
          strong: (
            <span>
              The <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">@wire</code> decorator provides a declarative way to fetch data. Built on Lightning Data Service (LDS), it caches results on the client. It is reactive; prefixing a parameter with <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">$</code> (e.g., <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">'$recordId'</code>) causes the adapter to re-execute whenever that parameter's value changes. To force-update cached wire records without a page refresh, import and run the <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">refreshApex()</code> function. Check out our <Link to="/governor-limits-explained" className="text-cyan-400 hover:underline">Governor Limits Explained</Link> page to see how caching aligns with platform query limits.
            </span>
          )
        },
        {
          q: "When should you use Imperative Apex instead of the Wire Service?",
          expectation: "Analyze declarative wire adapter limitations, transactional use cases, and manual execution triggers.",
          weak: "Imperative Apex is used when the wire service doesn't load or when writing custom controllers.",
          strong: (
            <span>
              Use Imperative Apex when you need to execute DML operations, invoke Apex dynamically in response to user actions (like a button click rather than loading a component), pass non-reactive parameters, or retrieve data that should not be cached. Imperative calls return a standard JavaScript Promise, allowing you to use <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">async/await</code> or <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">.then().catch()</code> to manage execution flow. For backend Apex queries, read our <Link to="/apex-interview-questions" className="text-cyan-400 hover:underline">Apex Interview Questions Guide</Link>.
            </span>
          )
        },
        {
          q: "How does the Lightning Message Service (LMS) enable communication between sibling or unrelated components?",
          expectation: "Discuss communication across DOM boundaries, message channels, scope, and compatibility (LWC, Aura, Visualforce).",
          weak: "LMS is a service to send messages between components that aren't in the same parent element.",
          strong: (
            <span>
              Lightning Message Service (LMS) utilizes Message Channels (<code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">LightningMessageChannel</code>) to publish and subscribe to messages across DOM boundaries. Unlike custom events, LMS does not require components to share a parent-child relationship. It enables communication across Aura, Visualforce, and LWC components in a workspace. Test your component communications using the <Link to="/salesforce-mock-interview" className="text-cyan-400 hover:underline">Salesforce Mock Interview</Link> simulator.
            </span>
          )
        }
      ]
    },
    {
      title: "Advanced LWC Questions",
      questions: [
        {
          q: "Explain the differences between Lightning Locker and Lightning Web Security (LWS).",
          expectation: "Contrast security isolation strategies, standard API availability, and performance efficiency between these layers.",
          weak: "Locker is the old security and LWS is the new security that runs faster in the browser.",
          strong: (
            <span>
              Lightning Locker isolates components by wrapping standard APIs in secure virtual versions (e.g., <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">SecureWindow</code>), preventing cross-namespace DOM access. Lightning Web Security (LWS) represents the modern successor, leveraging native browser virtualization. LWS uses JavaScript "distortions" to modify behavior at the browser level, allowing LWCs to utilize modern JS syntax, import standard third-party libraries, and achieve faster execution times.
            </span>
          )
        },
        {
          q: "How does the Shadow DOM operate in LWC, and how does LWC handle CSS encapsulation?",
          expectation: "Discuss shadow DOM boundaries, style leaking prevention, and synthetic vs. native shadow DOM.",
          weak: "Shadow DOM hides component HTML and CSS so other elements don't affect them.",
          strong: (
            <span>
              LWC leverages Shadow DOM to encapsulate HTML markup and CSS styling. Elements inside a component are isolated; global stylesheets cannot target component internals, and component styles do not leak out. Because older browsers lack native shadow DOM support, LWC defaults to a synthetic shadow DOM polyfill. Developers can opt into the Light DOM model if they need to bypass shadow encapsulation and use global stylesheets.
            </span>
          )
        },
        {
          q: "How do you mock Apex methods and wire adapters in Jest unit tests?",
          expectation: "Detail LWC unit testing frameworks, importing adapters, and firing mock database responses.",
          weak: "You run standard Jest command line checks to see if the LWC returns error codes.",
          strong: (
            <span>
              LWC unit tests use Jest and the <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">@salesforce/sfdx-lwc-jest</code> test utility. To isolate the component, developers mock imported Apex methods using Jest mock functions. For wires, they import and register a mock adapter using <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">registerLdsTestWireAdapter</code>. The test then fires a mock payload using <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">adapter.emit(mockData)</code> and validates that the UI renders the fields correctly without calling a real Salesforce server.
            </span>
          )
        }
      ]
    },
    {
      title: "Scenario-Based LWC Questions",
      questions: [
        {
          q: "Scenario: A search input component queries Salesforce as the user types, but triggers a 'Concurrent Request Limit' error. How do you resolve this?",
          expectation: "Understand how to implement client-side debouncing to throttle Apex queries.",
          weak: "I would ask the user to click a search button rather than querying automatically.",
          strong: (
            <span>
              The issue occurs because an Apex callout is fired on every keystroke. To resolve this, I would implement a debounce pattern in JavaScript. Using <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">setTimeout</code> and <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">clearTimeout</code>, I delay the imperative call or the wire parameter update by a threshold (e.g., 300ms). If the user types another character before the timer expires, the previous timer is cleared, ensuring a query is only executed after typing pauses.
            </span>
          )
        },
        {
          q: "Scenario: A component needs to update field values on the parent record and refresh other standard components on the page. How do you achieve this?",
          expectation: "Leverage Lightning Data Service API and notify the container page of record data changes.",
          weak: "Perform a page reload using location.reload() to force Salesforce to refresh all record details.",
          strong: (
            <span>
              I would update the record using the LDS <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">updateRecord</code> method. To notify other components on the page, I would import <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">notifyRecordUpdateAvailable(recordIds)</code> (formerly <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">getRecordNotifyChange</code>) and call it with the record ID. This prompts the platform caching layer to refresh standard Salesforce UI components in place without a page reload.
            </span>
          )
        },
        {
          q: "Scenario: You have a nested list of 1,000+ items in LWC, and scrolling is lagging. How do you optimize this list?",
          expectation: "Diagnose heavy rendering loads, describe virtual lists, and optimize template loops.",
          weak: "I would paginate the page or make sure that fewer fields are displayed.",
          strong: (
            <span>
              Scrolling lag is caused by rendering 1,000+ DOM nodes simultaneously, which causes layout recalculation bottlenecks. I would optimize this by implementing "Virtual Scrolling" (only rendering items currently visible in the viewport) or lazy loading on scroll. I would also verify that the <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">&lt;template for:each&gt;</code> loop is bound to a unique and stable property via the <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">key</code> attribute to assist the virtual DOM engine.
            </span>
          )
        }
      ]
    },
    {
      title: "LWC Performance Optimization Questions",
      questions: [
        {
          q: "What are best practices for optimizing render performance in Lightning Web Components?",
          expectation: "Detail strategies for minimizing reactive property mutations, lazy loading components, and template directives.",
          weak: "Optimize styling code, write shorter templates, and try to use fewer Javascript variables.",
          strong: (
            <span>
              To optimize render performance, minimize mutations of reactive properties, defer component instantiation using conditional template directives (<code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">lwc:if</code> / <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">lwc:else</code>), and use computed getters instead of inline expressions. Furthermore, avoid performing DOM manipulations inside <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">renderedCallback</code>, and load heavy third-party assets asynchronously.
            </span>
          )
        },
        {
          q: "How does the Lightning Data Service (LDS) improve performance compared to custom Apex controller methods?",
          expectation: "Explain the client-side caching mechanism, record sharing, and security benefits of LDS.",
          weak: "LDS is just faster because it is developed and optimized internally by Salesforce.",
          strong: (
            <span>
              LDS maintains a single client-side cache of records that is shared across all Lightning Web Components in a session. If multiple components query the same record ID via LDS, only one network request is made; subsequent requests are served instantly from the local cache. This reduces database queries, saves network bandwidth, and automatically enforces user permissions (CRUD/FLS) on the client side.
            </span>
          )
        },
        {
          q: "How do you optimize third-party JavaScript library loading in LWC?",
          expectation: "Discuss uploading static resources, utilizing script loaders, and checking load states.",
          weak: "You reference the external scripts inside the index.html or templates header tags.",
          strong: (
            <span>
              Third-party libraries must be uploaded as Static Resources. Developers must import them using <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">loadScript</code> and <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">loadStyle</code> from <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">lightning/platformResourceLoader</code>. Since these return Promises, wrap the loading calls in <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">Promise.all()</code>. Using a private tracking flag (e.g. <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">isLibraryLoaded</code>) prevents duplicate script loading on component re-evaluation.
            </span>
          )
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>Salesforce LWC Interview Questions & Answers Guide (2026) | Lightning Web Components Practice | ForcePilot AI</title>
        <meta
          name="description"
          content="Master your Salesforce developer interview with expert-verified LWC interview questions for experienced candidates. Learn reactive rendering, wire service, LDS, and performance optimizations."
        />
        <meta name="keywords" content="lwc interview questions, lightning web components interview questions, salesforce lwc coding interview, lwc interview questions for experienced, forcepilot ai" />
        <link rel="canonical" href="https://forcepilotai.online/lwc-coding-interview" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Salesforce LWC Interview Questions & Answers Guide (2026) | ForcePilot AI" />
        <meta property="og:description" content="Master your Salesforce developer interview with expert-verified LWC interview questions for experienced candidates." />
        <meta property="og:url" content="https://forcepilotai.online/lwc-coding-interview" />
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
          <Layers size={14} className="animate-pulse" />
          <span>Frontend Excellence Track</span>
        </motion.div>
        
        <h1 className="guide-hero-title">
          Salesforce LWC <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500">
            Coding Interview Questions
          </span>
        </h1>
        
        <p className="guide-hero-subtitle">
          The elite technical roadmap for modern Salesforce frontends. Master LWC interview questions for experienced developers. From Shadow DOM to specialized wire adapters.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/#setup"
            state={{ role: "Salesforce LWC Developer" }}
            className="w-full sm:w-auto px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center justify-center gap-3 group active:scale-95 text-center"
          >
            Practice LWC Coding Interviews
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Quick Nav */}
      <nav className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-0">
        {[
          { title: "Apex Questions", link: "/apex-interview-questions", color: "emerald", icon: Terminal },
          { title: "Flow Interview", link: "/salesforce-flow-interview-questions", color: "cyan", icon: Zap },
          { title: "Governor Limits", link: "/governor-limits-explained", color: "rose", icon: ShieldCheck },
          { title: "Scenario Based", link: "/scenario-based-salesforce-interview", color: "blue", icon: Search }
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

      {/* Focus Areas */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Technical <span className="text-cyan-400">Pillars.</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Elite LWC developers are judged on their ability to build modern, reactive, and optimized web standards components.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((section, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-6">
                {section.desc}
              </p>
              <div className="space-y-3">
                {section.topics.map((topic, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 size={14} className="text-cyan-500/60" />
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
        {lwcQuestions.map((section, idx) => (
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
                What is the main difference between LWC and Aura?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              LWC is a modern, lightweight framework built on native web standards (like Custom Elements, Shadow DOM, and ES6+ modules), which allows it to execute directly in browser engines without heavy abstraction layers. Aura is a legacy framework created before these native web standards existed, requiring a heavier JavaScript runtime and producing slower rendering cycles.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-cyan-400 transition-colors">
                How do you handle styling overrides inside Shadow DOM boundaries in LWC?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Due to shadow encapsulation, global styles cannot target elements inside a component. To override styles, use CSS Custom Properties (variables) defined by standard Salesforce styling hooks (e.g., <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">--sds-c-*</code>), declare styling hooks in the parent, or configure the component to render in the Light DOM (which bypasses shadow DOM styling constraints).
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-cyan-400 transition-colors">
                Can you call an Apex method with parameters imperatively in LWC?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              Yes. You import the Apex method inside JavaScript and call it imperatively like a standard function, passing an object representing the parameters: <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">apexMethodName(&#123; paramName: value &#125;)</code>. This returns a Promise that resolves with the return value or rejects with an error. Read more on the <Link to="/apex-interview-questions" className="text-cyan-400 hover:underline">Apex Interview Questions Guide</Link>.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-cyan-400 transition-colors">
                How can we run a performance audit on LWC components?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              You can perform audits using standard browser Developer Tools (Chrome DevTools Performance and Lighthouse panels), or install the Salesforce Lightning Inspector Extension. These tools track layout recalculations, evaluate script compile sizes, and record wire service latency rates.
            </div>
          </details>

          <details className="group bg-white/[0.01] border border-white/5 rounded-[2rem] p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
              <h3 className="text-lg font-semibold text-white group-open:text-cyan-400 transition-colors">
                Does LWC support double-data binding in templates?
              </h3>
              <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-4 text-slate-300 leading-relaxed text-sm">
              No. LWC enforces a strict one-way data flow model from JavaScript properties to HTML template elements. To pass values back to JavaScript, you must capture input events (e.g., <code className="text-cyan-400 bg-slate-950 px-1 rounded font-mono">onchange</code>) and update JavaScript properties manually. Learn how LWC coordinates with transaction-safe schemas by visiting our interactive <Link to="/salesforce-mock-interview" className="text-cyan-400 hover:underline">Salesforce Mock Interview</Link> engine.
            </div>
          </details>
        </div>
      </section>

      {/* Recruiter Intelligence */}
      <section className="bg-white/[0.01] border border-white/5 rounded-[3rem] p-8 sm:p-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Think like a <br />
            <span className="text-emerald-400">Web Standards Expert.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Salesforce has moved LWC closer to native web standards. Interviewers are now looking for developers who understand the underlying platform mechanics like Custom Elements, Templates, and Shadow DOM. ForcePilot AI evaluates your ability to build future-proof frontends.
          </p>
          <div className="flex gap-4">
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold">
              Reactive Mastery
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
              Clean DOM Architecture
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96 bg-slate-900/50 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Activity size={20} />
            </div>
            <div className="text-sm font-bold text-white">Performance Audit</div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            "Don't just mention @wire. Explain how the wire service manages the cache and how you would force a refresh using refreshApex()."
          </p>
          <div className="flex items-center gap-2">
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full w-[92%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
             </div>
             <span className="text-[10px] font-bold text-emerald-400">92%</span>
          </div>
          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest text-center">Frontend Maturity</div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#020617] via-slate-900 to-[#020617] border border-white/10 px-6 py-24 text-center">
        <div className="relative z-10 space-y-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-7xl font-black text-white leading-tight">
            Stop Rendering. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500">
              Start Engineering.
            </span>
          </h2>
          <div className="pt-8">
            <Link
              to="/#setup"
              state={{ role: "Salesforce LWC Developer" }}
              className="px-14 py-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[2rem] font-black text-xl transition-all shadow-[0_0_50px_rgba(34,211,238,0.3)] flex items-center justify-center gap-4 mx-auto group active:scale-95 text-center"
            >
              Start LWC Practice
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

export default LwcCodingInterview;
