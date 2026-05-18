import React from 'react';
import { 
  ArrowRight, 
  ChevronRight,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const LwcInterviewGuide: React.FC = () => {

  const sections = [
    {
      title: "LWC Core Concepts",
      questions: [
        {
          q: "What is the difference between @track, @wire, and @api decorators?",
          expectation: "Understanding of reactivity and data flow in modern LWC development.",
          weak: "They are used to define variables and call apex methods.",
          strong: "@api makes a property public and reactive (passed from parent). @wire is for declarative data fetching from Apex or UI API. @track is now primarily used for sub-properties of objects or array elements, as primitive properties are reactive by default since Spring '20."
        },
        {
          q: "How do you communicate between components that are not in the same DOM hierarchy?",
          expectation: "Knowledge of Lightning Message Service (LMS) vs PubSub.",
          weak: "I would use events or parent-child communication.",
          strong: "I would use Lightning Message Service (LMS) for communication across the DOM, including between LWC, Aura, and Visualforce. For components in the same hierarchy, I'd use standard DOM events (bubbling) or public methods (@api)."
        }
      ]
    },
    {
      title: "Performance & Optimization",
      questions: [
        {
          q: "How do you optimize a Lightning Web Component that handles a large dataset?",
          expectation: "Awareness of virtualization and pagination techniques.",
          weak: "I would use a loading spinner and make sure the query is fast.",
          strong: "I would implement 'infinite loading' or pagination to avoid DOM bloat. I'd also ensure that I'm using @wire with dynamic parameters to only fetch what's needed and utilize client-side filtering where appropriate to reduce Apex calls."
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 text-slate-300">
      <Helmet>
        <title>LWC Interview Guide 2026 | Lightning Web Components | ForcePilot AI</title>
        <meta name="description" content="Expert guide for Lightning Web Component (LWC) interviews. Master reactivity, decorators, events, and performance optimization for Salesforce Developer roles." />
        <link rel="canonical" href="https://forcepilotai.online/lwc-interview-guide" />
        <meta property="og:title" content="LWC Interview Guide 2026 | ForcePilot AI" />
        <meta property="og:description" content="Expert guide for Lightning Web Component (LWC) interviews. Master reactivity, decorators, events, and performance optimization." />
        <meta property="og:url" content="https://forcepilotai.online/lwc-interview-guide" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LWC Interview Guide 2026 | ForcePilot AI" />
        <meta name="twitter:description" content="Expert guide for Lightning Web Component (LWC) interviews." />
      </Helmet>

      {/* Hero Section */}
      <section className="text-center space-y-8 py-12 border-b border-slate-800/50">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-xs font-medium text-cyan-400 backdrop-blur-sm mb-4">
          <Globe size={14} />
          <span>Modern Web Standards</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          LWC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Interview Mastery</span>
        </h1>
        <p className="text-sm sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal sm:font-medium">
          The ultimate technical roadmap for Lightning Web Components. From shadow DOM to specialized wire adapters.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            to="/#setup"
            state={{ role: "Salesforce LWC Developer" }}
            className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 group"
          >
            Start LWC Mock Interview
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Navigation Links */}
      <nav className="grid sm:grid-cols-2 gap-4">
        <Link to="/apex-interview-questions" className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group">
          <div>
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Previous Guide</div>
            <div className="text-white font-semibold">Apex Interview Questions</div>
          </div>
          <ChevronRight size={20} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/governor-limits-explained" className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors flex items-center justify-between group">
          <div>
            <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1">Deep Dive</div>
            <div className="text-white font-semibold">Governor Limits Explained</div>
          </div>
          <ChevronRight size={20} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      {/* Content Section */}
      <div className="space-y-24">
        {sections.map((section, idx) => (
          <section key={idx} className="space-y-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest border-l-4 border-cyan-500 pl-4">
              {section.title}
            </h2>
            <div className="grid gap-8">
              {section.questions.map((item, qIdx) => (
                <div key={qIdx} className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight">
                    {item.q}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-rose-500/80 uppercase">Weak Answer</div>
                      <p className="text-slate-500 text-sm italic">"{item.weak}"</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-cyan-500/80 uppercase">Strong Answer</div>
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
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-600 to-blue-700 px-6 py-16 text-center shadow-2xl">
        <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Verify Your <br/> LWC Expertise.
          </h2>
          <p className="text-cyan-50 text-lg opacity-90">
            ForcePilot AI simulates complex LWC scenarios. Test your knowledge of lifecycle hooks, event propagation, and security best practices.
          </p>
          <div className="pt-6">
            <Link 
              to="/#setup"
              state={{ role: "Salesforce LWC Developer" }}
              className="px-10 py-5 bg-white text-cyan-700 hover:bg-cyan-50 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3 mx-auto group"
            >
              Practice LWC Interviews
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="text-center text-slate-600 text-sm py-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 ForcePilot AI. Salesforce-Focused Intelligence.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/apex-interview-questions" className="hover:text-cyan-400 transition-colors">Apex Questions</Link>
          <Link to="/governor-limits-explained" className="hover:text-cyan-400 transition-colors">Governor Limits</Link>
        </div>
      </footer>
    </div>
  );
};

export default LwcInterviewGuide;
