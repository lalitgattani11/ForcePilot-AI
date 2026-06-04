import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Tag, 
  BookOpen, 
  ShieldCheck, 
  Rocket, 
  Layers 
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'ShieldCheck': return ShieldCheck;
    case 'Rocket': return Rocket;
    case 'Layers': return Layers;
    default: return BookOpen;
  }
};

const BlogList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Apex & Architecture', 'LWC & Frontend', 'Career & Interview'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  } as const;

  return (
    <>
      <Helmet>
        <title>Salesforce Engineering Blog & Developer Guides | ForcePilot AI</title>
        <meta name="description" content="Access deep-dive Salesforce technical articles on Apex architecture, governor limits, LWC performance, and interview strategies written by industry leaders." />
        <meta name="keywords" content="salesforce blog, salesforce developer articles, apex governor limits, lightning web components, lwc performance, salesforce architect, technical recruiter" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://forcepilotai.online/blog" />
        <meta property="og:title" content="Salesforce Engineering Blog & Developer Guides | ForcePilot AI" />
        <meta property="og:description" content="Access deep-dive Salesforce technical articles on Apex architecture, governor limits, LWC performance, and interview strategies." />
        <meta property="og:image" content="https://forcepilotai.online/pwa-512.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://forcepilotai.online/blog" />
        <meta property="twitter:title" content="Salesforce Engineering Blog & Developer Guides | ForcePilot AI" />
        <meta property="twitter:description" content="Access deep-dive Salesforce technical articles on Apex architecture, governor limits, LWC performance, and interview strategies." />
      </Helmet>

      <div className="space-y-16 sm:space-y-24 pt-0 pb-8 sm:py-12 px-4 sm:px-0">
        {/* Hero Header */}
        <section className="guide-hero-section">
          <div className="guide-hero-badge border-emerald-500/20 bg-emerald-500/5 text-emerald-300">
            <BookOpen size={14} className="text-emerald-400" />
            <span>Engineering Intelligence Hub</span>
          </div>
          <h1 className="guide-hero-title">
            Technical <br className="sm:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 italic">Salesforce Blog</span>
          </h1>
          <p className="guide-hero-subtitle">
            Deep-dive architectural blueprints, recruiter-grade strategy playbooks, and LWC rendering optimizations curated for modern Salesforce engineers.
          </p>
        </section>

        {/* Filters and Search Strip */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between pb-8 border-b border-white/5">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    selectedCategory === category
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "text-slate-400 bg-white/[0.01] hover:bg-white/5 border border-white/5"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm bg-slate-950/40 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/30 transition-all font-medium"
              />
            </div>
          </div>
        </section>

        {/* Blog Post Grid */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          {filteredPosts.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => {
                const IconComponent = getIconComponent(post.icon);
                return (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    className="group relative flex flex-col h-full rounded-[2rem] bg-slate-950/20 border border-white/5 overflow-hidden hover:border-emerald-500/30 transition-all duration-500"
                  >
                    {/* Visual Card Cover */}
                    <div className={`h-48 w-full bg-gradient-to-br ${post.gradient} relative flex items-center justify-center border-b border-white/5 overflow-hidden`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(2,4,10,0.8),transparent)]" />
                      <div className="relative p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-emerald-400 group-hover:scale-110 group-hover:border-emerald-500/20 transition-all duration-500 shadow-2xl">
                        <IconComponent size={28} />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-950/80 text-emerald-400 border border-emerald-500/20 backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-grow flex flex-col space-y-4">
                      {/* Meta Date & Time */}
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

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-emerald-400 transition-colors duration-300">
                        <Link to={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium flex-grow">
                        {post.description}
                      </p>

                      {/* Tag list */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5"
                          >
                            <Tag size={8} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-6 pt-0 border-t border-white/[0.03] mt-auto">
                      <div className="flex items-center justify-between pt-4">
                        {/* Author */}
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-white/10 uppercase">
                            {post.author.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-300 leading-none">{post.author}</span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase mt-0.5 leading-none">{post.authorRole}</span>
                          </div>
                        </div>

                        {/* Action Link */}
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="flex items-center gap-1 text-xs font-black text-emerald-400 group-hover:text-emerald-300 transition-colors"
                        >
                          READ ARTICLE
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-slate-950/20 border border-white/5 rounded-3xl max-w-md mx-auto space-y-4">
              <BookOpen className="mx-auto text-slate-600 w-12 h-12" />
              <h3 className="text-lg font-bold text-white">No articles found</h3>
              <p className="text-slate-400 text-sm font-medium">Try resetting your search query or selecting another category filter.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 text-white border border-white/5 hover:bg-white/10 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Curated Developer Interview Guides */}
        <section className="max-w-6xl mx-auto px-4 pb-20 border-t border-white/5 pt-16 space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-[10px] font-black uppercase tracking-[0.25em] backdrop-blur-sm">
              <Layers size={12} className="text-cyan-400" />
              Specialized Interview Playbooks
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Developer Guides</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl font-medium leading-relaxed">
              Explore structural, recruiter-grade answers to the most common technical questions across Salesforce topics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/top-apex-interview-questions"
              className="group p-6 rounded-2xl border border-white/5 bg-slate-950/20 hover:bg-slate-900/40 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Apex Track</span>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mt-3">
                  Top Apex Interview Questions
                </h3>
                <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">
                  Master transaction boundaries, bulkification, and async architecture for senior apex roles.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
                View Playbook <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              to="/top-lwc-interview-questions"
              className="group p-6 rounded-2xl border border-white/5 bg-slate-950/20 hover:bg-slate-900/40 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">LWC Track</span>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mt-3">
                  Top LWC Interview Questions
                </h3>
                <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">
                  Prepare for Lightning Data Service, wire adapters, custom events, and rendering cache limits.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
                View Playbook <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              to="/salesforce-flow-questions-for-freshers"
              className="group p-6 rounded-2xl border border-white/5 bg-slate-950/20 hover:bg-slate-900/40 hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">Automation Track</span>
                <h3 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors mt-3">
                  Flow Questions for Freshers
                </h3>
                <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">
                  Build a solid foundation around loop limits, record triggers, fast field updates, and debugging.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
                View Playbook <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              to="/scenario-based-salesforce-questions"
              className="group p-6 rounded-2xl border border-white/5 bg-slate-950/20 hover:bg-slate-900/40 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Architecture Track</span>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mt-3">
                  Scenario-Based Salesforce Questions
                </h3>
                <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">
                  Solve complex mixed DML errors, experience cloud security architecture, and system integration patterns.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
                View Playbook <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              to="/governor-limits-interview-questions"
              className="group p-6 rounded-2xl border border-white/5 bg-slate-950/20 hover:bg-slate-900/40 hover:border-rose-500/30 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
            >
              <div>
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Guardrails Track</span>
                <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors mt-3">
                  Governor Limits Questions
                </h3>
                <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">
                  Explain the root cause of SOQL 101, CPU timeouts, and heap management practices.
                </p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider mt-4">
                View Playbook <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogList;
