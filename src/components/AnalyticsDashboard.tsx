import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Brain,
  Flame,
  Activity,
  ShieldCheck,
  MessageSquare,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface StrongestTopic {
  name: string;
  avg: number;
  status: string;
  confidence: string;
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
  } | null;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: TimelineItem; value: number }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    return (
      <div className="premium-glass p-4 border border-white/10 bg-slate-900/90 rounded-2xl shadow-2xl backdrop-blur-xl">
        <div className="mb-3">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
            {data?.role ?? "Interview Session"}
          </p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            {data?.fullDate ?? ""}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center gap-8">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Overall Performance
            </span>
            <span className="text-sm font-black text-white">
              {payload[0]?.value ?? 0}%
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-2">
            <div className="space-y-0.5">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                Technical
              </span>
              <div className="text-xs font-black text-cyan-400">
                {data?.technical ?? 0}%
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                Comm.
              </span>
              <div className="text-xs font-black text-purple-400">
                {data?.communication ?? 0}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

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
  };

  const stats = propStats || defaultStats;

  const isCalibration = stats.intelligenceTier === "calibration";
  const isBasic = stats.intelligenceTier === "basic";

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

            <div className="space-y-2.5 overflow-visible">
              <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tighter leading-tight sm:leading-none pb-1 sm:pb-0 overflow-visible">
                Performance{" "}
                <span className="inline-block pr-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  Insights
                </span>
              </h2>
              <p className="text-slate-400 text-[11px] sm:text-sm font-medium leading-relaxed max-w-xl mx-auto xl:mx-0">
                Track your technical evolution and career readiness. ForcePilot
                AI synthesizes thousands of data points from your sessions to
                map your trajectory toward Salesforce mastery.
              </p>
            </div>

            <div className="flex flex-wrap justify-center xl:justify-start gap-3 pt-1">
              <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Readiness
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200">
                  {stats.readiness}
                </div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Status
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200">
                  {stats.dataConfidence}
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
            {!isCalibration && (
              <div className="space-y-0.5 text-center border-l border-white/10 pl-8 sm:pl-12">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  RECENT GROWTH
                </div>
                {stats.recentGrowth !== null ? (
                  <div
                    className={`text-2xl sm:text-4xl font-black ${stats.recentGrowth >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {stats.recentGrowth >= 0 ? "+" : ""}
                    {Math.round(stats.recentGrowth)}%
                  </div>
                ) : (
                  <div className="text-2xl sm:text-4xl font-black text-cyan-400">
                    Baseline
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Intelligence Surface: Technical Evolution & Behavioral Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Performance Trends Panel */}
        <div className="xl:col-span-7 premium-glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-white/5 bg-slate-950/20 flex flex-col min-h-[400px] sm:min-h-[500px] relative min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
                {isCalibration
                  ? "In Progress"
                  : isBasic
                    ? "Interview Trends"
                    : "Advanced Performance Analysis"}
              </h3>
            </div>
          </div>

          <div className="flex-1 w-full relative min-w-0 overflow-hidden">
            {isCalibration ? (
              <div className="h-full flex flex-col justify-center gap-8">
                {/* Calibration Block */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border-4 border-dashed border-white/10 animate-spin flex items-center justify-center">
                    <TrendingUp size={24} className="text-slate-700" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">
                      Analyzing Data Stream
                    </h4>
                    <p className="text-xs text-slate-400 max-w-[200px]">
                      Waiting for consistent patterns to emerge in technical
                      responses.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full -ml-6 pr-2">
                {stats.timelineData.length === 1 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-8 pt-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
                      <div className="relative w-20 h-20 rounded-[2rem] bg-slate-900/80 border border-white/10 flex items-center justify-center text-emerald-400 shadow-2xl">
                        <Activity size={36} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-white font-black uppercase tracking-[0.25em] text-[11px]">
                        Baseline Established
                      </h4>
                      <p className="text-[13px] text-slate-400 font-medium leading-relaxed max-w-[260px] mx-auto">
                        Your first session is captured. Complete another
                        interview to activate multi-point trend analysis and
                        growth metrics.
                      </p>
                    </div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={stats.timelineData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="velocityGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.25}
                          />
                          <stop
                            offset="50%"
                            stopColor="#10b981"
                            stopOpacity={0.1}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="4 4"
                        stroke="rgba(255,255,255,0.05)"
                        vertical={true}
                        horizontal={true}
                      />
                      <XAxis
                        dataKey="session"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#64748b",
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                        dy={15}
                        padding={{ left: 20, right: 20 }}
                      />
                      <YAxis
                        hide={false}
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#475569", fontSize: 9, fontWeight: 800 }}
                        width={30}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                          stroke: "rgba(16, 185, 129, 0.2)",
                          strokeWidth: 2,
                          strokeDasharray: "5 5",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#10b981"
                        strokeWidth={3}
                        fill="url(#velocityGradient)"
                        animationDuration={2000}
                        connectNulls={true}
                        dot={{
                          r: 4,
                          fill: "#020617",
                          stroke: "#10b981",
                          strokeWidth: 2,
                        }}
                        activeDot={{
                          r: 6,
                          fill: "#10b981",
                          stroke: "#ffffff",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            )}
          </div>

          {/* Metrics Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-8 mt-8 sm:pt-10 sm:mt-10 border-t border-white/5">
            <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 flex flex-col justify-center group hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-wider text-slate-400">
                <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
                <span>Technical Skills</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-200 tracking-tight leading-tight">
                {stats.techPerformance}
              </div>
            </div>
            <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 flex flex-col justify-center group hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-wider text-slate-400">
                <MessageSquare size={12} className="text-cyan-500 shrink-0" />
                <span>Communication</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-200 tracking-tight leading-tight">
                {stats.commClarity}
              </div>
            </div>
            <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 flex flex-col justify-center group hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-wider text-slate-400">
                <Award size={12} className="text-purple-500 shrink-0" />
                <span>Consistency</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-200 tracking-tight leading-tight">
                {stats.interviewConsistency}
              </div>
            </div>
            <div className="px-4 py-3 sm:px-5 sm:py-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 flex flex-col justify-center group hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-wider text-slate-400">
                <Flame size={12} className="text-orange-500 shrink-0" />
                <span>Confidence</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-200 tracking-tight leading-tight">
                {stats.responseConfidence}
              </div>
            </div>
          </div>
        </div>

        {/* Topic Analysis Panel */}
        <div className="xl:col-span-5 flex flex-col gap-8">
          {/* Topic Intelligence */}
          <div className="flex-1 premium-glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-white/5 bg-slate-950/20 space-y-8 sm:space-y-10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                <Brain size={20} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">
                Topic Analysis
              </h3>
            </div>

            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  <span>Strongest Topics</span>
                  <span className="text-[9px] text-slate-400 uppercase">
                    Skill Level
                  </span>
                </div>
                {stats.strongestTopics.length > 0 ? (
                  stats.strongestTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between group"
                    >
                      <div className="space-y-1">
                        <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                          {topic.name}
                        </span>
                        <div className="text-[9px] font-black uppercase text-slate-400/80">
                          {topic.confidence} Confidence
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="w-20 sm:w-32 h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${topic.avg}%` }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                            className={`h-full shadow-[0_0_10px_rgba(0,0,0,0.2)] ${
                              topic.status === "Expert" ||
                              topic.status === "Strong"
                                ? "bg-emerald-500 shadow-emerald-500/20"
                                : topic.status === "Developing"
                                  ? "bg-cyan-500 shadow-cyan-500/20"
                                  : "bg-orange-500 shadow-orange-500/20"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider min-w-[70px] sm:min-w-[80px] text-right ${
                            topic.status === "Expert" ||
                            topic.status === "Strong"
                              ? "text-emerald-400"
                              : topic.status === "Developing"
                                ? "text-cyan-400"
                                : "text-orange-400"
                          }`}
                        >
                          {topic.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-[10px] text-slate-400 italic">
                    Complete more sessions to identify top skills.
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  Areas to Improve
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {stats.weakestTopics.length > 0 ? (
                    stats.weakestTopics.map((topic, i) => (
                      <div
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/[0.04] border border-rose-500/10 text-[9px] sm:text-[10px] font-black text-rose-400/80 uppercase tracking-tighter flex items-center gap-2.5 hover:bg-rose-500/[0.08] transition-all"
                      >
                        <div className="w-1 h-1 rounded-full bg-rose-500" />
                        {topic.name}
                        <span className="text-[8px] text-rose-500/70 ml-1">
                          {topic.confidence === "Consistent" ? "!!" : "!"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-[10px] text-slate-400 italic">
                      More history needed to identify common technical gaps.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="premium-glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-white/5 bg-slate-950/20 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 group hover:bg-slate-950/30 transition-all">
            <div className="flex items-center gap-6 sm:gap-8">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Interview Streak
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                  {stats.streak}
                  <Flame
                    size={24}
                    className="text-orange-500 group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-white/10" />
              <div className="space-y-1.5 sm:space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Total Interviews
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-cyan-400 transition-colors">
                  {stats.totalInterviews}
                </div>
              </div>
            </div>

            <div className="flex gap-1.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 sm:w-2 h-6 sm:h-8 rounded-full transition-all duration-700 ${i < stats.streak ? "bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)] scale-y-110" : "bg-white/5"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
