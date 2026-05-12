import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Brain, 
  Flame, 
  Activity,
  ShieldCheck,
  MessageSquare,
  Award
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface TimelineItem {
  date: string;
  score: number;
}

interface StrongestTopic {
  name: string;
  avg: number;
  confidence: string;
}

interface WeakestTopic {
  name: string;
  count: number;
  confidence: string;
}

interface AnalyticsDashboardProps {
  stats: {
    avgScore: number;
    recentGrowth: number;
    timelineData: TimelineItem[];
    strongestTopics: StrongestTopic[];
    weakestTopics: WeakestTopic[];
    streak: number;
    totalInterviews: number;
    readiness: string;
    signalStrength: number;
    consistency: number;
    stability: number;
    discipline: number;
  } | null;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="space-y-8">
      
      {/* 1. Integrated Intelligence Surface: Executive Summary */}
      <div className="premium-glass rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 border border-white/5 bg-slate-950/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:items-center justify-between">
          
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-[9px] font-black tracking-[0.3em] uppercase">
              <Activity size={12} className="text-cyan-400" />
              Intelligence Engine v4.2
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none">
                Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Intelligence</span>
              </h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Multi-dimensional performance synthesis. Built from cross-session technical depth, communication clarity, and behavioral consistency analysis.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
               <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Performance Level</div>
                  <div className="text-sm font-black text-cyan-400">{stats.readiness}</div>
               </div>
               <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Readiness Score</div>
                  <div className="text-sm font-black text-emerald-400">{stats.signalStrength}%</div>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-12 lg:pr-8">
             <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Average Score</div>
                <div className="text-6xl font-black text-white tracking-tighter">{stats.avgScore}</div>
             </div>
             <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Recent Growth</div>
                <div className={`text-3xl font-black ${stats.recentGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stats.recentGrowth >= 0 ? '+' : ''}{stats.recentGrowth}%
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* 2. Intelligence Surface: Technical Evolution & Behavioral Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Performance Trends Panel */}
        <div className="xl:col-span-7 premium-glass rounded-[2rem] p-8 border border-white/5 bg-slate-950/20 flex flex-col justify-between min-h-[400px]">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400"><TrendingUp size={16} /></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Performance Trends</h3>
              </div>
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">Technical Trajectory</div>
           </div>

           <div className="flex-1 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.timelineData}>
                  <defs>
                    <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#velocityGradient)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>

           <div className="grid grid-cols-3 gap-8 pt-10 mt-4 border-t border-white/5">
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    <ShieldCheck size={10} className="text-emerald-500" />
                    Tech Consistency
                 </div>
                 <div className="text-xl font-black text-white">{stats.consistency}%</div>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    <MessageSquare size={10} className="text-cyan-500" />
                    Comm Stability
                 </div>
                 <div className="text-xl font-black text-white">{stats.stability}%</div>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                    <Award size={10} className="text-purple-500" />
                    Discipline
                 </div>
                 <div className="text-xl font-black text-white">{stats.discipline}%</div>
              </div>
           </div>
        </div>

        {/* Topic Analysis Panel */}
        <div className="xl:col-span-5 flex flex-col gap-6">
           
           {/* Topic Intelligence */}
           <div className="flex-1 premium-glass rounded-[2rem] p-8 border border-white/5 bg-slate-950/20 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400"><Brain size={16} /></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Topic Analysis</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                    <span>Strongest Topics</span>
                    <span className="text-[8px] text-slate-600">Weighted Recency</span>
                  </div>
                  {stats.strongestTopics.length > 0 ? stats.strongestTopics.map((topic, i) => (
                    <div key={i} className="flex items-center justify-between group">
                       <div className="space-y-0.5">
                          <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{topic.name}</span>
                          <div className="text-[8px] font-black uppercase text-emerald-500/50">{topic.confidence} Confidence</div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="w-20 sm:w-28 h-1 rounded-full bg-white/5 overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${topic.avg}%` }}
                               transition={{ duration: 1.5, delay: i * 0.2 }}
                               className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                             />
                          </div>
                          <span className="text-[10px] font-black text-emerald-400">{topic.avg}%</span>
                       </div>
                    </div>
                  )) : (
                    <div className="text-[10px] text-slate-600 italic">No data available</div>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Areas to Improve</div>
                  <div className="flex flex-wrap gap-2">
                    {stats.weakestTopics.length > 0 ? stats.weakestTopics.map((topic, i) => (
                      <div key={i} className="px-2.5 py-1.5 rounded-lg bg-rose-500/[0.03] border border-rose-500/10 text-[9px] font-black text-rose-400/80 uppercase tracking-tighter flex items-center gap-2">
                         <div className="w-1 h-1 rounded-full bg-rose-500" />
                         {topic.name}
                         <span className="text-[7px] text-rose-500/40 ml-1">{topic.confidence === "High" ? "!!" : "!"}</span>
                      </div>
                    )) : (
                      <div className="text-[10px] text-slate-600 italic">No weaknesses detected</div>
                    )}
                  </div>
                </div>
              </div>
           </div>

           {/* Activity Summary */}
           <div className="premium-glass rounded-[2rem] p-8 border border-white/5 bg-slate-950/20 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="space-y-1">
                   <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Interview Streak</div>
                   <div className="text-3xl font-black text-white flex items-center gap-2">
                      {stats.streak}
                      <Flame size={18} className="text-orange-500" />
                   </div>
                </div>
                <div className="w-px h-8 bg-white/5" />
                <div className="space-y-1">
                   <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Total Interviews</div>
                   <div className="text-3xl font-black text-white">{stats.totalInterviews}</div>
                </div>
              </div>

              <div className="flex gap-1">
                 {Array.from({ length: 7 }).map((_, i) => (
                   <div key={i} className={`w-1.5 h-6 rounded-full transition-all duration-500 ${i < stats.streak ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.3)]' : 'bg-white/5'}`} />
                 ))}
              </div>
           </div>

        </div>

      </div>

    </div>
  );
};

export default AnalyticsDashboard;
