import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Brain,
  Activity,
  Lock,
  Check,
  Target,
} from "lucide-react";

interface StrongestTopic {
  name: string;
  avg: number;
  status: string;
  confidence: string;
  count?: number;
}

interface WeakestTopic {
  name: string;
  count: number;
  confidence: string;
}

interface TimelineItem {
  session: string; // Day/Month label
  fullDate: string;
  role: string;
  score: number;
  technical: number;
  communication: number;
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
    dataConfidence: string;
    intelligenceTier: "calibration" | "basic" | "advanced";
    techPerformance: string;
    commClarity: string;
    interviewConsistency: string;
    responseConfidence: string;
    latestScore?: number;
    bestScore?: number;
    latestInterviewDate?: string;
    latestTopic?: string;
    totalQuestions?: number;
  } | null;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  stats: propStats,
}) => {
  const defaultStats: NonNullable<AnalyticsDashboardProps["stats"]> = {
    avgScore: 0,
    recentGrowth: 0,
    timelineData: [],
    strongestTopics: [],
    weakestTopics: [],
    streak: 0,
    totalInterviews: 0,
    readiness: "Not Started",
    signalStrength: 0,
    dataConfidence: "No Data",
    intelligenceTier: "calibration",
    techPerformance: "N/A",
    commClarity: "N/A",
    interviewConsistency: "N/A",
    responseConfidence: "N/A",
    latestScore: 0,
    bestScore: 0,
    latestInterviewDate: "",
    latestTopic: "",
    totalQuestions: 0,
  };

  const stats = propStats || defaultStats;

  return (
    <div className="space-y-8 relative overflow-hidden">
      {/* 1. Integrated Intelligence Surface: Executive Summary */}
      <div className="premium-glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 lg:px-16 lg:py-12 border border-white/5 bg-slate-950/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.04] blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row gap-8 xl:gap-10 xl:items-center justify-between">
          <div className="space-y-4 sm:space-y-5 max-w-2xl text-center xl:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-[9px] font-black tracking-[0.3em] uppercase mx-auto xl:mx-0">
              <Activity size={12} className="text-cyan-400" />
              Interview Performance Analysis
            </div>

            <div className="space-y-8 overflow-visible">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tighter leading-tight sm:leading-none pb-1 sm:pb-0 overflow-visible">
                  Interview{" "}
                  <span className="inline-block pr-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                    Performance
                  </span>
                </h2>
                <p className="text-slate-400 text-[11px] sm:text-sm font-medium leading-relaxed max-w-xl mx-auto xl:mx-0">
                  Track your interview performance and progress based on completed interview sessions.
                </p>
              </div>
              <div className="h-px w-full bg-white/5" />
            </div>

            <div className="flex flex-wrap justify-center xl:justify-start gap-3">
              <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Current Stage
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200">
                  {stats.totalInterviews === 0 ? "Not Started" : stats.totalInterviews < 3 ? "Building Foundation" : stats.totalInterviews < 5 ? "Learning Phase" : "Interview Ready"}
                </div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Interview Data
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200">
                  {stats.totalInterviews} Interview{stats.totalInterviews !== 1 ? 's' : ''} Available
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center xl:justify-end gap-8 sm:gap-12 lg:pr-6 shrink-0">
            <div className="space-y-0.5 text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                OVERALL SCORE
              </div>
              <div className="text-5xl sm:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {stats.avgScore}%
              </div>
            </div>
            <div className="space-y-0.5 text-center border-l border-white/10 pl-8 sm:pl-12">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                INTERVIEWS COMPLETED
              </div>
              <div className="text-5xl sm:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {stats.totalInterviews}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Redesigned Section: Interview Summary */}
      <section className="premium-glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 lg:px-16 lg:py-12 border border-white/5 bg-slate-950/20 relative overflow-hidden group space-y-8">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-300 shrink-0">
              <Brain size={22} strokeWidth={1.5} />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-[28px] font-bold text-white tracking-wide">
                Interview Summary
              </h3>
              <p className="text-slate-400 text-[13px] sm:text-sm font-medium">
                Track the topics you have practiced and your interview progress so far.
              </p>
            </div>
          </div>
          <div className="h-px w-full bg-white/5" />
        </div>

        <div className="relative z-10">
          {(() => {
          // Extract real topics from interview data
          const allTopics = Array.from(new Set([
            ...(stats.strongestTopics || []).map(t => t.name),
            ...(stats.weakestTopics || []).map(t => t.name)
          ])).filter(name => name && name !== "Response Depth" && name !== "Scenario Explanation" && name !== "Professional Tone" && name !== "Technical Accuracy");

          const latestTopic = stats.totalInterviews > 0 ? (stats.latestTopic || "None") : "None";
          const recentlyPracticed = allTopics.slice(1);

          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
               {/* Card 1: Topics Practiced */}
              <div className="premium-glass rounded-[2rem] p-5 sm:p-6 border border-white/5 bg-slate-950/20 flex flex-col justify-between gap-4 h-full">
                <div className="space-y-4 w-full">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Topics</span>
                    <h4 className="text-base font-bold text-white">Topics Practiced</h4>
                  </div>

                  {allTopics.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {allTopics.map((topic, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-[10px] font-semibold text-cyan-400 tracking-normal"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 flex items-center justify-center text-center border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
                      <p className="text-xs text-slate-500 italic leading-relaxed">
                        No topics practiced yet.
                      </p>
                    </div>
                  )}

                  {/* Real Stats Detail Rows */}
                  {stats.totalInterviews > 0 && (
                    <div className="pt-3 space-y-2.5 border-t border-white/5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-400">Topics Practiced</span>
                        <span className="font-black text-cyan-400">{allTopics.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-400">Most Practiced Topic</span>
                        <span className="font-black text-white">{allTopics[0] || "None"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-400">Latest Topic</span>
                        <span className="font-black text-white">{latestTopic}</span>
                      </div>
                      {stats.totalQuestions !== undefined && stats.totalQuestions > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-400">Total Questions Answered</span>
                          <span className="font-black text-white">{stats.totalQuestions}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card 2: Interview History */}
              <div className="premium-glass rounded-[2rem] p-5 sm:p-6 border border-white/5 bg-slate-950/20 flex flex-col justify-between gap-4 h-full">
                <div className="space-y-4 w-full">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">History</span>
                    <h4 className="text-base font-bold text-white">Interview History</h4>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400">Interviews Completed</span>
                      <span className="text-base font-black text-white">{stats.totalInterviews}</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400">Topics Practiced</span>
                      <span className="text-base font-black text-cyan-400">{allTopics.length}</span>
                    </div>

                    {stats.totalInterviews > 0 && stats.latestScore !== undefined && (
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">Latest Score</span>
                        <span className="text-base font-black text-white">{stats.latestScore}%</span>
                      </div>
                    )}

                    {stats.totalInterviews >= 3 && stats.bestScore !== undefined && (
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">Best Score</span>
                        <span className="text-base font-black text-white">{stats.bestScore}%</span>
                      </div>
                    )}

                    {stats.totalInterviews > 0 && stats.latestInterviewDate ? (
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">Latest Interview Date</span>
                        <span className="text-xs font-black text-white">
                          {new Date(stats.latestInterviewDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {stats.totalInterviews < 5 ? (
                /* Card 3: Locked Features Section (2x2 Grid) */
                <div className="premium-glass rounded-[2rem] p-5 sm:p-6 border border-white/5 bg-slate-950/20 flex flex-col justify-between gap-4 h-full relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 bg-cyan-500/[0.01] blur-[80px] pointer-events-none" />
                  </div>

                  <div className="space-y-6 w-full z-10 relative flex-1 flex flex-col">
                    
                    {/* Top Content: Progress Stats */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Unlock After 5 Interviews</span>
                        </div>
                        <div className="w-[25px] h-[25px] rounded-[8px] bg-white/[0.02] border-[0.5px] border-white/5 flex items-center justify-center text-slate-500 shrink-0">
                          <Lock size={12} strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="space-y-[10px]">
                        <h4 className="text-[13px] font-bold text-white tracking-wide">{stats.totalInterviews} / 5 Interviews Completed</h4>
                        <p className="text-[11px] text-slate-400">
                          <span className="text-cyan-400 font-semibold">{Math.max(5 - stats.totalInterviews, 0)}</span> More Interviews Needed
                        </p>
                      </div>

                      <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${Math.min((stats.totalInterviews / 5) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-white/5" />

                    {/* Bottom Content: Feature Cards */}
                    <div className="space-y-4 flex-1 flex flex-col justify-end">
                      <h5 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Unlocks Next</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { title: "Score Progress", desc: "Track score improvement." },
                          { title: "Topic Analysis", desc: "Most practiced topics." },
                          { title: "Interview Comparison", desc: "Compare interview results." },
                          { title: "Job Readiness", desc: "Measure job readiness." }
                        ].map((cap, i) => (
                          <div key={i} className="py-2.5 px-3.5 rounded-xl bg-white/[0.01] border border-white/10 flex flex-col justify-center h-[58px]">
                            <div className="space-y-1.5">
                              <span className="font-bold text-slate-200 text-sm block leading-tight">{cap.title}</span>
                              <span className="text-sm text-slate-400 block leading-tight whitespace-nowrap">{cap.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                /* Card 3: Topic Analysis */
                <div className="premium-glass rounded-[2rem] p-5 sm:p-6 border border-white/5 bg-slate-950/20 flex flex-col justify-between gap-4 h-full">
                  <div className="space-y-4 w-full">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Analysis</span>
                      <h4 className="text-base font-bold text-white">Topic Analysis</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Most Recent Topic</span>
                        <div className="text-xs font-black text-white">{latestTopic}</div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recently Practiced</span>
                        {recentlyPracticed.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {recentlyPracticed.map((topic, i) => (
                              <span 
                                key={i} 
                                className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-medium text-slate-300"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-500 italic">No additional topics recorded.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
        </div>
      </section>

      {/* 3. Technical Trajectory: Premium Intelligence Progression System */}
      {(() => {
        const stages = [
          { label: "Baseline", req: 1 },
          { label: "Accuracy", req: 2 },
          { label: "Insights", req: 3 },
          { label: "Benchmark", req: 4 },
          { label: "Forecast", req: 5 }
        ];

        const progressPercent = Math.min(Math.round((stats.totalInterviews / 5) * 100), 100);
        const interviewsRemaining = Math.max(5 - stats.totalInterviews, 0);
        const currentStageIndex = stats.totalInterviews - 1;
        const currentLevel = stats.totalInterviews === 0 
          ? "Getting Started" 
          : (stages[currentStageIndex]?.label || "Forecast");
        const nextUnlock = stats.totalInterviews >= 5 
          ? "All Stages Complete" 
          : (stages[stats.totalInterviews]?.label || "N/A");
        const calibrationStatus = stats.totalInterviews >= 5 
          ? "Complete" 
          : stats.totalInterviews === 0 
            ? "Not Started" 
            : "In Progress";

        return (
          <React.Fragment>
            {/* Section Divider */}
            <div className="pt-8 pb-4 sm:pt-12 sm:pb-6">
              <div className="h-px w-full bg-white/5" />
            </div>

            <section className="premium-glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 lg:px-16 lg:py-12 border border-white/5 bg-slate-950/20 relative overflow-hidden group space-y-8">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.02] blur-[120px] pointer-events-none" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex flex-col xl:flex-row gap-8 xl:items-start justify-between">
                  <div className="flex items-start gap-5 max-w-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-300 shrink-0">
                      <TrendingUp size={22} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-[28px] font-bold text-white tracking-wide">
                        Career Progress
                      </h3>
                      <p className="text-slate-400 text-[13px] sm:text-sm font-medium">
                        Complete more interviews to unlock new features, track your progress, and compare your performance over time.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-0 lg:divide-x lg:divide-white/5 shrink-0 py-1 w-full lg:w-auto">
                    <div className="space-y-0.5 text-center lg:px-6 xl:px-8 lg:first:pl-0">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Latest</div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{stats.timelineData.length > 0 ? `${stats.timelineData[stats.timelineData.length - 1].score}%` : 'N/A'}</div>
                    </div>
                    <div className="space-y-0.5 text-center lg:px-6 xl:px-8">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Best</div>
                      <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{stats.timelineData.length > 0 ? `${Math.max(...stats.timelineData.map(d => d.score))}%` : 'N/A'}</div>
                    </div>
                    <div className="space-y-0.5 text-center lg:px-6 xl:px-8">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sessions</div>
                      <div className="text-2xl sm:text-3xl font-bold text-white">{stats.totalInterviews}</div>
                    </div>
                    <div className="space-y-0.5 text-center lg:px-6 xl:px-8 lg:last:pr-0">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Remaining</div>
                      <div className="text-2xl sm:text-3xl font-bold text-rose-400">{interviewsRemaining}</div>
                    </div>
                  </div>
                </div>
                <div className="h-px w-full bg-white/5" />
              </div>

              <div className="relative z-10 w-full mt-4">
                {/* Visual Roadmap Centerpiece (Desktop - md and above) */}
                <div className="hidden md:block w-full relative pt-10 pb-16 px-6 sm:pt-12 sm:pb-20 sm:px-8 bg-slate-950/20 rounded-[2rem] border border-white/5 overflow-hidden">
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/[0.03] blur-[80px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/[0.02] blur-[80px] pointer-events-none" />
                  {/* Milestones */}
                  <div className="relative flex justify-between items-center px-0 z-10">
                    {/* Connecting Line */}
                    <div className="absolute left-[40px] right-[40px] sm:left-12 sm:right-12 top-1/2 -translate-y-1/2 h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] z-0">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                      />
                    </div>

                    {stages.map((m, i) => {
                      const isDone = stats.totalInterviews >= m.req;
                      const isCurrent = stats.totalInterviews === m.req - 1;
                      
                      return (
                        <div key={i} className="flex flex-col items-center relative group w-20 sm:w-24 shrink-0">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.15 }}
                            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 sm:border-[3px] relative z-10 transition-all duration-500 bg-slate-950 ${
                              isDone 
                                ? 'border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] bg-gradient-to-b from-emerald-950/20 to-slate-950 hover:scale-105' 
                                : isCurrent 
                                  ? 'border-cyan-400 text-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.8),_inset_0_0_15px_rgba(34,211,238,0.3)] scale-110 bg-gradient-to-b from-cyan-950/30 to-slate-950' 
                                  : 'border-slate-800 text-slate-500 hover:border-slate-700 bg-slate-950/60'
                            }`}
                          >
                            {isDone ? (
                              <Check className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" strokeWidth={3} />
                            ) : isCurrent ? (
                              <div className="relative flex items-center justify-center">
                                <span className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-cyan-400/20 animate-ping pointer-events-none" />
                                <span className="text-xs sm:text-sm font-black tracking-tighter text-cyan-400">0{m.req}</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center opacity-65 group-hover:opacity-100 transition-opacity">
                                <Lock className="w-4 h-4 text-slate-600 mb-0.5" />
                                <span className="text-[9px] sm:text-[10px] font-black text-slate-500">
                                  0{m.req}
                                </span>
                              </div>
                            )}
                          </motion.div>
                          <div className="absolute top-[64px] sm:top-[74px] left-1/2 -translate-x-1/2 text-center pointer-events-none whitespace-nowrap">
                            <div className={`text-xs font-semibold leading-tight transition-colors duration-500 ${
                              isDone ? 'text-emerald-400' : isCurrent ? 'text-cyan-400' : 'text-slate-500'
                            }`}>
                              {m.label}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Visual Roadmap (screens below md) */}
                <div className="block md:hidden w-full relative pt-6 pb-6 px-5 bg-slate-950/20 rounded-[2rem] border border-white/5 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/[0.03] blur-[80px] pointer-events-none" />
                    
                    {/* Header status inside mobile centerpiece */}
                    <div className="flex w-full justify-between items-center mb-6 pb-3 border-b border-white/5 relative z-10">
                      <div className="flex-1 flex flex-col items-center text-center">
                        <span className="text-xs font-semibold text-slate-400">Status</span>
                        <span className="text-sm font-bold text-cyan-400 mt-0.5">{calibrationStatus}</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center text-center">
                        <span className="text-xs font-semibold text-slate-400">Remaining</span>
                        <span className="text-sm font-bold text-rose-400 mt-0.5">
                          {stats.totalInterviews >= 5 ? "0" : interviewsRemaining}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col items-center text-center">
                        <span className="text-xs font-semibold text-slate-400">Progress</span>
                        <span className="text-sm font-bold text-white mt-0.5">{progressPercent}%</span>
                      </div>
                    </div>

                   {/* Vertical Steps Container */}
                   <div className="relative flex flex-col space-y-6 z-10">
                     {/* Connecting Line (Vertical) */}
                     <div className="absolute left-[19px] top-[20px] bottom-[20px] w-[2px] bg-slate-900 rounded-full border-l border-white/5">
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${progressPercent}%` }}
                         transition={{ duration: 1.5, ease: "easeOut" }}
                         className="w-full bg-gradient-to-b from-cyan-500 via-emerald-400 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                       />
                     </div>

                     {stages.map((m, i) => {
                       const isDone = stats.totalInterviews >= m.req;
                       const isCurrent = stats.totalInterviews === m.req - 1;
                       
                       return (
                         <div key={i} className="flex items-center space-x-4 relative z-10">
                           <motion.div 
                             initial={{ scale: 0 }}
                             animate={{ scale: 1 }}
                             transition={{ delay: i * 0.1 }}
                             className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-slate-950 shrink-0 transition-all duration-500 ${
                               isDone 
                                 ? 'border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                                 : isCurrent 
                                   ? 'border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-105' 
                                   : 'border-slate-800 text-slate-500'
                             }`}
                           >
                             {isDone ? (
                               <Check className="w-5 h-5 text-emerald-400" strokeWidth={3} />
                             ) : isCurrent ? (
                               <div className="relative flex items-center justify-center">
                                 <span className="absolute w-8 h-8 rounded-full border border-cyan-400/25 animate-ping pointer-events-none" />
                                 <span className="text-[11px] font-bold text-cyan-400">0{m.req}</span>
                               </div>
                             ) : (
                               <div className="flex items-center justify-center opacity-65">
                                 <Lock className="w-3.5 h-3.5 text-slate-600" />
                               </div>
                             )}
                           </motion.div>
                           <div className="flex items-center justify-between flex-1">
                             <span className={`text-sm font-semibold transition-colors duration-500 ${
                               isDone ? 'text-emerald-400' : isCurrent ? 'text-cyan-400 font-bold' : 'text-slate-400'
                             }`}>
                               {m.label}
                             </span>
                             {isCurrent && (
                               <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 animate-pulse">
                                 Current Stage
                               </span>
                             )}
                             {isDone && (
                               <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                 Completed
                               </span>
                             )}
                           </div>
                         </div>
                       );
                     })}
                   </div>
                </div>
              </div>

              {/* Supporting Information Grid */}
              <div className="relative z-10 w-full mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {/* Progress Info Card (compressed) */}
                  <div className="flex flex-col justify-between bg-white/[0.01] border border-white/5 rounded-[2rem] p-4 sm:p-5 relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-cyan-500/[0.03] blur-xl pointer-events-none" />
                    
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                        <span className="text-xs font-semibold text-slate-400">Your Progress</span>
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                        </span>
                      </div>

                      {/* Progress & Completed */}
                      <div className="space-y-0.5">
                        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {progressPercent}% Complete
                        </div>
                        <div className="text-xs font-semibold text-slate-400">
                          {stats.totalInterviews} / 5 Interviews Completed
                        </div>
                      </div>

                      <div className="h-px bg-white/5" />

                      {/* Levels & Status */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium text-slate-400">Current Stage</div>
                          <div className="text-sm font-bold text-white">
                            {currentLevel}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium text-slate-400">Next Unlock</div>
                          <div className="text-sm font-bold text-cyan-400">
                            {nextUnlock}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium text-slate-400">Status</div>
                          <div className={`text-sm font-bold ${stats.totalInterviews >= 5 ? "text-emerald-400" : "text-cyan-400"}`}>
                            {calibrationStatus}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium text-slate-400">Remaining</div>
                          <div className={`text-sm font-bold ${stats.totalInterviews >= 5 ? "text-emerald-400" : "text-rose-400"}`}>
                            {stats.totalInterviews >= 5 ? "Fully Unlocked" : `${interviewsRemaining} Interview${interviewsRemaining !== 1 ? 's' : ''}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Motivational Next Milestone */}
                  <div className="premium-glass rounded-[2rem] p-4 sm:p-5 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent relative group hover:border-cyan-500/40 transition-colors flex flex-col justify-between h-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Target size={14} className="text-cyan-400" />
                          <span className="text-xs font-semibold text-cyan-400">Next Unlock</span>
                        </div>
                      </div>
                      
                      <div className="space-y-0.5">
                        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {nextUnlock}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-slate-400">Progress to Unlock</div>
                        <div className="text-sm font-bold text-white">{stats.totalInterviews} / 5 Completed</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-slate-400">Unlocks In:</div>
                        <div className="text-sm font-bold text-cyan-400">{stats.totalInterviews >= 5 ? "Fully Unlocked" : `${interviewsRemaining} More Interview${interviewsRemaining !== 1 ? 's' : ''}`}</div>
                      </div>

                      <div className="h-px bg-white/5" />

                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-400">What You'll Get:</div>
                        <ul className="space-y-1.5 text-xs font-medium text-slate-300">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                            <span>Score Progress</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                            <span>Topic Analysis</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                            <span>Interview Comparison</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
                            <span>Job Readiness</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Progress Summary */}
                  <div className="flex flex-col justify-between bg-white/[0.01] border border-white/5 rounded-[2rem] p-4 sm:p-5 relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.03] blur-xl pointer-events-none" />
                    
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                        <span className="text-xs font-semibold text-slate-400">Progress Summary</span>
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {stats.totalInterviews} / 5
                        </div>
                        <div className="text-xs font-semibold text-slate-400">
                          Interviews Completed
                        </div>
                      </div>

                      <div className="h-px bg-white/5" />

                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium text-slate-400">Completed</div>
                          <div className="text-sm font-bold text-white">
                            {stats.totalInterviews} Interview{stats.totalInterviews !== 1 ? 's' : ''}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium text-slate-400">Remaining</div>
                          <div className={`text-sm font-bold ${stats.totalInterviews >= 5 ? "text-emerald-400" : "text-rose-400"}`}>
                            {stats.totalInterviews >= 5 ? "0 Interviews" : `${interviewsRemaining} Interview${interviewsRemaining !== 1 ? 's' : ''}`}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium text-slate-400">Progress</div>
                          <div className="text-sm font-bold text-white">
                            {progressPercent}%
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-xs font-medium text-slate-400">Next Goal</div>
                          <div className="text-sm font-bold text-cyan-400">
                            Reach {nextUnlock} Stage
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </section>
          </React.Fragment>
        );
      })()}
    </div>
  );
};

export default AnalyticsDashboard;
