import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Check, 
  Copy, 
  Sparkles, 
  AlertTriangle, 
  Info,
  ChevronRight,
  ArrowRight,
  Target
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import NotFound from './NotFound';
import { useJsonLd } from '../hooks/useJsonLd';

// Regex-based dynamic helper to replace keywords with SPA <Link> elements
const renderParagraphWithLinks = (text: string) => {
  const linkConfigs = [
    { text: "Salesforce Mock Interview", path: "/salesforce-mock-interview" },
    { text: "Mock Interview page", path: "/salesforce-mock-interview" },
    { text: "Mock Interview", path: "/salesforce-mock-interview" },
    { text: "Governor Limits page", path: "/governor-limits-explained" },
    { text: "Governor Limits", path: "/governor-limits-explained" },
    { text: "governor limits", path: "/governor-limits-explained" },
    { text: "Trigger Interview page", path: "/apex-trigger-interview-questions" },
    { text: "Apex Trigger", path: "/apex-trigger-interview-questions" },
    { text: "Apex trigger", path: "/apex-trigger-interview-questions" },
    { text: "LWC coding", path: "/lwc-coding-interview" },
    { text: "LWC Coding", path: "/lwc-coding-interview" },
    { text: "LWC Interview page", path: "/lwc-coding-interview" },
    { text: "LWC page", path: "/lwc-coding-interview" },
    { text: "Lightning Web Components", path: "/lwc-coding-interview" },
    { text: "Salesforce Flow", path: "/salesforce-flow-interview-questions" },
    { text: "Flow Interview page", path: "/salesforce-flow-interview-questions" },
    { text: "Flow page", path: "/salesforce-flow-interview-questions" },
    { text: "Career Roadmap", path: "/career-roadmap" },
    { text: "Apex Interview page", path: "/apex-interview-questions" },
    { text: "Apex interview questions", path: "/apex-interview-questions" },
    { text: "Apex page", path: "/apex-interview-questions" }
  ];

  // Sort by length descending to match longer strings first
  const sortedConfigs = [...linkConfigs].sort((a, b) => b.text.length - a.text.length);

  // Build combined regex
  const escapedTerms = sortedConfigs.map(c => c.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const regex = new RegExp(`(${escapedTerms.join('|')})`, 'g');

  const parts = text.split(regex);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, index) => {
        const matchingConfig = sortedConfigs.find(c => c.text.toLowerCase() === part.toLowerCase());
        if (matchingConfig) {
          return (
            <Link 
              key={index} 
              to={matchingConfig.path} 
              className="text-emerald-400 hover:text-emerald-300 font-bold underline decoration-emerald-500/30 hover:decoration-emerald-400/60 transition-all"
            >
              {part}
            </Link>
          );
        }
        return part;
      })}
    </>
  );
};

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copiedSectionIndex, setCopiedSectionIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const post = BLOG_POSTS.find(p => p.slug === slug);

  const articleSchema = React.useMemo(() => {
    if (!post) return null;

    let isoDate = "2026-06-02T00:00:00Z";
    try {
      if (post.publishDate) {
        isoDate = new Date(post.publishDate).toISOString();
      }
    } catch {
      console.warn("Invalid date format:", post.publishDate);
    }

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.description,
      "image": "https://forcepilotai.online/pwa-512.png",
      "datePublished": isoDate,
      "dateModified": isoDate,
      "author": {
        "@type": "Person",
        "name": post.author,
        "jobTitle": post.authorRole
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
        "@id": `https://forcepilotai.online/blog/${post.slug}`
      }
    };
  }, [post]);

  useJsonLd(articleSchema, "schema-article");

  if (!post) {
    return <NotFound />;
  }

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSectionIndex(index);
    setTimeout(() => setCopiedSectionIndex(null), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | ForcePilot AI Blog</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags.join(', ')} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://forcepilotai.online/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | ForcePilot AI Blog`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((tag, idx) => (
          <meta key={idx} property="article:tag" content={tag} />
        ))}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://forcepilotai.online/blog/${post.slug}`} />
        <meta property="twitter:title" content={`${post.title} | ForcePilot AI Blog`} />
        <meta property="twitter:description" content={post.description} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        {/* Back Link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-white transition-colors duration-300 mb-8 sm:mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="space-y-6 pb-8 border-b border-white/5">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {post.category}
            </span>
            <span className="text-slate-600 text-xs font-bold">•</span>
            <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {post.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {post.readingTime}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed max-w-3xl">
            {post.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            {/* Author details */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center font-bold text-emerald-400 uppercase text-sm">
                {post.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{post.author}</span>
                <span className="text-xs font-bold text-slate-500 uppercase mt-0.5">{post.authorRole}</span>
              </div>
            </div>

            {/* Share / Action Button */}
            <button 
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 self-start sm:self-center px-4 py-2 rounded-xl text-xs font-bold bg-white/[0.02] border border-white/5 hover:bg-white/5 text-slate-300 hover:text-white transition-all"
            >
              {copiedLink ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  Copy Share Link
                </>
              )}
            </button>
          </div>
        </header>

        {/* Article Body */}
        <article className="py-8 sm:py-12 max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {post.content.map((section, idx) => {
            switch (section.type) {
              case 'paragraph':
                return (
                  <p key={idx} className="text-slate-300 text-sm sm:text-base md:text-[17px] leading-relaxed font-medium tracking-tight">
                    {renderParagraphWithLinks(section.text || '')}
                  </p>
                );

              case 'heading-2':
                return (
                  <h2 key={idx} className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-8 pb-2 italic border-l-2 border-emerald-500 pl-4">
                    {section.text}
                  </h2>
                );

              case 'heading-3':
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-6">
                    {section.text}
                  </h3>
                );

              case 'code':
                return (
                  <div key={idx} className="relative rounded-2xl border border-white/5 bg-[#060a13] overflow-hidden my-6 font-mono text-xs sm:text-sm shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-950/60 border-b border-white/5">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                        {section.language || 'code'}
                      </span>
                      <button
                        onClick={() => handleCopyCode(section.code || '', idx)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                        title="Copy Code"
                      >
                        {copiedSectionIndex === idx ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <div className="p-4 sm:p-5 overflow-x-auto text-slate-300 whitespace-pre scrollbar-thin">
                      <code>{section.code}</code>
                    </div>
                  </div>
                );

              case 'callout':
                const getCalloutStyles = () => {
                  switch (section.calloutType) {
                    case 'tip':
                      return {
                        bg: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300',
                        icon: Sparkles
                      };
                    case 'warning':
                      return {
                        bg: 'bg-rose-500/5 border-rose-500/20 text-rose-300',
                        icon: AlertTriangle
                      };
                    default:
                      return {
                        bg: 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300',
                        icon: Info
                      };
                  }
                };
                const styles = getCalloutStyles();
                const CalloutIcon = styles.icon;
                return (
                  <div key={idx} className={`flex items-start gap-4 p-5 rounded-2xl my-6 border backdrop-blur-sm ${styles.bg}`}>
                    <div className="mt-0.5 shrink-0">
                      <CalloutIcon size={18} />
                    </div>
                    <div className="space-y-1">
                      {section.title && <h4 className="text-xs font-black uppercase tracking-wider">{section.title}</h4>}
                      <p className="text-xs sm:text-sm font-medium leading-relaxed">{section.text}</p>
                    </div>
                  </div>
                );

              case 'table':
                return (
                  <div key={idx} className="overflow-x-auto my-8 border border-white/5 rounded-2xl bg-slate-950/20 shadow-2xl">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-white/[0.02] border-b border-white/5">
                          {section.tableHeaders?.map((header, hIdx) => (
                            <th key={hIdx} className="p-4 font-black uppercase text-[10px] tracking-wider text-slate-400">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.tableRows?.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/[0.01] transition-colors border-b border-white/[0.03]">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-4 font-medium leading-relaxed text-slate-300">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );

              case 'list':
                return (
                  <ul key={idx} className="space-y-3.5 my-6 pl-4">
                    {section.items?.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-300 font-medium">
                        <div className="mt-2.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                        <span>{renderParagraphWithLinks(item)}</span>
                      </li>
                    ))}
                  </ul>
                );

              default:
                return null;
            }
          })}
        </article>

        {/* Sidebar / Related Reading / Internal Links Index */}
        <section className="mt-12 sm:mt-16 pt-10 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Related pages */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-1.5">
                <Target size={12} className="text-emerald-400" />
                Technical Interview Hub
              </h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Prepare comprehensively for Salesforce hiring loops by exploring our specialized interactive study modules.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link to="/apex-interview-questions" className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  <ChevronRight size={12} />
                  Apex Questions
                </Link>
                <Link to="/lwc-coding-interview" className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  <ChevronRight size={12} />
                  LWC Coding
                </Link>
                <Link to="/salesforce-flow-interview-questions" className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  <ChevronRight size={12} />
                  Flow Automation
                </Link>
                <Link to="/career-roadmap" className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  <ChevronRight size={12} />
                  Career Roadmap
                </Link>
              </div>
            </div>

            {/* Platform CTA */}
            <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4 hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-400" />
                  Evaluate Your Readiness
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Done reading? Put your theory to the test. Launch our AI-powered voice recruiter simulation to benchmark your performance.
                </p>
              </div>
              <Link 
                to="/salesforce-mock-interview"
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-[#02040a] transition-all"
              >
                <span>Launch Mock Interview</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPostDetail;
