import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Code2, 
  Workflow, 
  HelpCircle, 
  ShieldAlert, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Database, 
  Layout, 
  AlertTriangle,
  AlertCircle,
  Timer,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { SEO_LANDING_PAGES } from "../data/seoLandingPages";
import NotFound from "./NotFound";
import Breadcrumbs from "./Breadcrumbs";
import { useJsonLd } from "../hooks/useJsonLd";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  Workflow,
  HelpCircle,
  ShieldAlert,
  Layers,
  Zap,
  ShieldCheck,
  Database,
  Layout,
  AlertTriangle,
  AlertCircle,
  Timer,
  BookOpen
};

const resolveIcon = (name: string) => {
  return iconMap[name] || HelpCircle;
};

interface SeoLandingTemplateProps {
  pageId: string;
}

const SeoLandingTemplate: React.FC<SeoLandingTemplateProps> = ({ pageId }) => {
  const page = SEO_LANDING_PAGES[pageId];

  // FAQ Schema
  const faqSchema = page ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  // Article Schema
  const articleSchema = page ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": page.title.split(" | ")[0],
    "description": page.description,
    "image": "https://forcepilotai.online/pwa-512.png",
    "datePublished": page.datePublished,
    "dateModified": page.dateModified,
    "author": {
      "@type": "Person",
      "name": page.author,
      "jobTitle": page.authorRole
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
      "@id": page.canonicalUrl
    }
  } : null;

  useJsonLd(faqSchema, "schema-faq");
  useJsonLd(articleSchema, "schema-article");

  if (!page) {
    return <NotFound />;
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  // Dynamic Tailwind color class mapping to prevent purge issues
  const textColors: Record<string, string> = {
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
    rose: "text-rose-400"
  };

  const borderColors: Record<string, string> = {
    emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    cyan: "border-cyan-500/20 bg-cyan-500/5 text-cyan-400",
    blue: "border-blue-500/20 bg-blue-500/5 text-blue-400",
    purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
    rose: "border-rose-500/20 bg-rose-500/5 text-rose-400"
  };

  const hoverBorders: Record<string, string> = {
    emerald: "hover:border-emerald-500/30",
    cyan: "hover:border-cyan-500/30",
    blue: "hover:border-blue-500/30",
    purple: "hover:border-purple-500/30",
    rose: "hover:border-rose-500/30"
  };

  const bgGlows: Record<string, string> = {
    emerald: "bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.2)] bg-emerald-600 hover:bg-emerald-500",
    cyan: "bg-cyan-500/5 shadow-[0_0_40px_rgba(6,182,212,0.2)] bg-cyan-600 hover:bg-cyan-500",
    blue: "bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.2)] bg-blue-600 hover:bg-blue-500",
    purple: "bg-purple-500/5 shadow-[0_0_40px_rgba(168,85,247,0.2)] bg-purple-600 hover:bg-purple-500",
    rose: "bg-rose-500/5 shadow-[0_0_40px_rgba(244,63,94,0.2)] bg-rose-600 hover:bg-rose-500"
  };

  const topBarGlows: Record<string, string> = {
    emerald: "via-emerald-500/40",
    cyan: "via-cyan-500/40",
    blue: "via-blue-500/40",
    purple: "via-purple-500/40",
    rose: "via-rose-500/40"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32 text-slate-300 antialiased">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <meta name="keywords" content={page.keywords} />
        <link rel="canonical" href={page.canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={page.canonicalUrl} />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Breadcrumbs & Hero Container to avoid space-y-32 gap */}
      <div className="space-y-8">
        <Breadcrumbs 
          items={[
            { name: "Home", path: "/" },
            { name: "Interview Guides", path: "/blog" },
            { name: page.heroBadge, path: `/${page.slug}` }
          ]} 
          themeColor={page.themeColor as any}
        />

        {/* Hero Section */}
        <section className="guide-hero-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={`guide-hero-badge border ${borderColors[page.themeColor] || "border-white/10 bg-white/5"}`}
        >
          {React.createElement(resolveIcon(page.heroIcon), { size: 14, className: "animate-pulse" })}
          <span>{page.heroBadge}</span>
        </motion.div>
        
        <h1 className="guide-hero-title">
          {page.heroTitle.split(" ").slice(0, -1).join(" ")} <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${page.heroTitleGradient}`}>
            {page.heroTitle.split(" ").slice(-1)[0]}
          </span>
        </h1>
        
        <p className="guide-hero-subtitle">
          {page.heroSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to="/#setup"
            state={{ role: page.ctaRoleState }}
            className={`w-full sm:w-auto px-12 py-5 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 group active:scale-95 text-center ${bgGlows[page.themeColor] || "bg-slate-800 hover:bg-slate-700"}`}
          >
            {page.ctaText}
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
      </div>

      {/* AI Overview & Quick Definitions Block */}
      <section className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${topBarGlows[page.themeColor] || "via-white/20"} to-transparent`} />
        
        <div className="space-y-2">
          <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${textColors[page.themeColor]}`}>
            AI Overview & Core Concepts
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Essential semantic summaries optimized for search engines, LLM retrievals, and quick reading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Answer */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">{page.aiOverviewHeading}</h3>
            <p className="text-slate-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: page.aiOverviewAnswer }} />
          </div>

          {/* Key Takeaways */}
          <div className="bg-slate-900/30 border border-white/[0.03] p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{page.aiOverviewTakeawayHeading}</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {page.aiOverviewTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`${textColors[page.themeColor]} mt-1`}>•</span>
                  <span dangerouslySetInnerHTML={{ __html: takeaway }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison Block */}
        {page.aiOverviewComparison && (
          <div className="border-t border-white/[0.05] pt-6 space-y-4">
            {page.aiOverviewComparisonHeading && (
              <h3 className="text-base font-bold text-white">{page.aiOverviewComparisonHeading}</h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-900/20 border border-white/5 space-y-1">
                <span className={`font-bold ${textColors[page.aiOverviewComparison.color1]}`}>
                  {page.aiOverviewComparison.label1}
                </span>
                <p className="text-slate-400 leading-relaxed">
                  {page.aiOverviewComparison.text1}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/20 border border-white/5 space-y-1">
                <span className={`font-bold ${textColors[page.aiOverviewComparison.color2]}`}>
                  {page.aiOverviewComparison.label2}
                </span>
                <p className="text-slate-400 leading-relaxed">
                  {page.aiOverviewComparison.text2}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Categories / Pillars */}
      <section className="space-y-12 sm:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-5xl font-bold text-white tracking-tight">
            {page.pillarsTitle.split(" ").slice(0, -1).join(" ")}{" "}
            <span className={textColors[page.themeColor]}>{page.pillarsTitle.split(" ").slice(-1)[0]}</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-base max-w-2xl mx-auto px-4 sm:px-0">
            {page.pillarsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {page.pillars.map((cat, i) => {
            const pillBorder = borderColors[cat.color] || "border-white/5 bg-white/[0.02]";
            return (
              <motion.div 
                key={i}
                {...fadeIn}
                className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
              >
                <div className={`mb-6 inline-flex p-3 sm:p-4 rounded-2xl ${pillBorder.split(" ")[1]} ${pillBorder.split(" ")[2]} group-hover:scale-110 transition-transform`}>
                  {React.createElement(resolveIcon(cat.icon), { size: 24, className: "sm:size-[28px]" })}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{cat.title}</h3>
                <p className="text-slate-500 leading-relaxed text-xs sm:text-sm">
                  {cat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Questions Section */}
      <section className="space-y-24">
        {page.questionSections.map((section, idx) => (
          <div key={idx} className="space-y-8">
            <h2 className={`text-2xl font-bold text-white uppercase tracking-widest border-l-4 pl-4 ${
              page.themeColor === "emerald" ? "border-emerald-500" :
              page.themeColor === "cyan" ? "border-cyan-500" :
              page.themeColor === "blue" ? "border-blue-500" :
              page.themeColor === "purple" ? "border-purple-500" :
              "border-rose-500"
            }`}>
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
                      <div className={`text-xs font-bold uppercase ${textColors[page.themeColor]}`}>
                        Strong Answer (Recruiter Grade)
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.strong}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="space-y-12">
        <h2 className={`text-2xl font-bold text-white uppercase tracking-widest border-l-4 pl-4 ${
          page.themeColor === "emerald" ? "border-emerald-500" :
          page.themeColor === "cyan" ? "border-cyan-500" :
          page.themeColor === "blue" ? "border-blue-500" :
          page.themeColor === "purple" ? "border-purple-500" :
          "border-rose-500"
        }`}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {page.faqs.map((faq, i) => (
            <details key={i} className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <h3 className={`text-lg font-semibold text-white group-open:${textColors[page.themeColor]} transition-colors`}>
                  {faq.q}
                </h3>
                <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-800 p-1.5 text-slate-400 group-open:rotate-180 transition-transform duration-300">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <div className="mt-4 text-slate-300 leading-relaxed text-sm">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Recommended Next Topics */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            Recommended Next Topics
          </h2>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
            page.themeColor === "emerald" ? "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" :
            page.themeColor === "cyan" ? "text-cyan-400 bg-cyan-500/5 border-cyan-500/10" :
            page.themeColor === "blue" ? "text-blue-400 bg-blue-500/5 border-blue-500/10" :
            page.themeColor === "purple" ? "text-purple-400 bg-purple-500/5 border-purple-500/10" :
            "text-rose-400 bg-rose-500/5 border-rose-500/10"
          }`}>
            Continue Learning
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {page.relatedLinks.map((link, i) => {
            return (
              <Link
                key={i}
                to={link.link}
                className={`p-6 rounded-2xl border border-slate-800 bg-slate-900/30 hover:bg-slate-800/40 transition-all group flex flex-col justify-between h-40 ${hoverBorders[page.themeColor] || "hover:border-white/20"}`}
              >
                <div>
                  {React.createElement(resolveIcon(link.icon), { size: 24, className: `${textColors[page.themeColor]} mb-3 group-hover:scale-110 transition-transform` })}
                  <h3 className={`text-base font-bold text-white group-hover:${textColors[page.themeColor]} transition-colors`}>
                    {link.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-2">
                    {link.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
                  Explore Guide <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recruiter Banner */}
      <section className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-16 border border-white/10 bg-slate-950/40 text-center space-y-6 sm:space-y-8">
        <div className="absolute inset-0 bg-aurora opacity-5" />
        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tighter leading-tight">
            Ready to accelerate your search?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium px-4">
            Practice structural answering dynamically using our technical mock interview simulator.
          </p>
          <div className="pt-2">
            <Link 
              to="/salesforce-mock-interview"
              className={`inline-flex items-center justify-between px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-[#02040a] transition-all ${
                page.themeColor === "emerald" ? "bg-emerald-500 hover:bg-emerald-400" :
                page.themeColor === "cyan" ? "bg-cyan-500 hover:bg-cyan-400" :
                page.themeColor === "blue" ? "bg-blue-500 hover:bg-blue-400" :
                page.themeColor === "purple" ? "bg-purple-500 hover:bg-purple-400" :
                "bg-rose-500 hover:bg-rose-400"
              }`}
            >
              Start Free AI Simulation
              <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeoLandingTemplate;
