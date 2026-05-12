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
  Zap,
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
  confidence: string;
}

interface WeakestTopic {
  name: string;
  count: number;
  confidence: string;
}

interface TimelineItem {
  session: string;
  date: string;
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
  payload?: any[];
}) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    return (
      <div className="premium-glass p-4 border border-white/10 bg-slate-900/90 rounded-2xl shadow-2xl backdrop-blur-xl">
        {" "}
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
          {" "}
          {data?.session ?? "Session"} • {data?.date ?? ""}{" "}
        </p>{" "}
        <div className="space-y-1.5">
          {" "}
          <div className="flex justify-between items-center gap-8">
            {" "}
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {" "}
              Overall Score{" "}
            </span>{" "}
            <span className="text-sm font-black text-emerald-400">
              {" "}
              {payload[0]?.value ?? 0}%{" "}
            </span>{" "}
          </div>{" "}
          <div className="flex justify-between items-center gap-8 border-t border-white/5 pt-1.5">
            {" "}
            <span className="text-[9px] font-bold text-slate-500 uppercase">
              {" "}
              Technical{" "}
            </span>{" "}
            <span className="text-xs font-black text-cyan-400">
              {" "}
              {data?.technical ?? 0}/100{" "}
            </span>{" "}
          </div>{" "}
          <div className="flex justify-between items-center gap-8">
            {" "}
            <span className="text-[9px] font-bold text-slate-500 uppercase">
              {" "}
              Comm.{" "}
            </span>{" "}
            <span className="text-xs font-black text-purple-400">
              {" "}
              {data?.communication ?? 0}/100{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
  return null;
};

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ stats }) => {
  if (!stats) return null;

  const isCalibration = stats.intelligenceTier === "calibration";
  const isBasic = stats.intelligenceTier === "basic";

  return (
    <div className="space-y-6">
      {/* 1. Integrated Intelligence Surface: Executive Summary */}
      <div className="premium-glass rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 border border-white/5 bg-slate-950/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-[9px] font-black tracking-[0.3em] uppercase">
              <Activity size={12} className="text-cyan-400" />
              Intelligence Engine v4.2
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter leading-none">
                Performance{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Intelligence
                </span>
              </h2>
              <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-lg">
                Multi-dimensional performance synthesis. Built from
                cross-session technical depth, communication clarity, and
                behavioral consistency analysis.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  Readiness
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {stats.readiness}
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  Confidence
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {stats.dataConfidence}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10 lg:pr-4">
            <div className="space-y-0.5 text-center">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                Composite Score
              </div>
              <div className="text-5xl font-black text-white tracking-tighter">
                {stats.avgScore}
              </div>
            </div>
            {!isCalibration && (
              <div className="space-y-0.5 text-center border-l border-white/5 pl-10">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Recent Growth
                </div>
                <div
                  className={`text-2xl font-black ${stats.recentGrowth >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                >
                  {stats.recentGrowth >= 0 ? "+" : ""}
                  {Math.round(stats.recentGrowth)}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Intelligence Surface: Technical Evolution & Behavioral Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Performance Trends Panel */}
        <div className="xl:col-span-7 premium-glass rounded-[2rem] p-8 border border-white/5 bg-slate-950/20 flex flex-col min-h-[440px] relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <TrendingUp size={16} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                {isCalibration
                  ? "Early Insights"
                  : isBasic
                    ? "Performance Trends"
                    : "Advanced Performance Modeling"}
              </h3>
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic opacity-50">
              {stats.intelligenceTier === "calibration"
                ? "Interview Progress"
                : stats.intelligenceTier === "basic"
                  ? "Standard Tier"
                  : "Advanced Tier"}
            </div>
          </div>

          <div className="flex-1 w-full relative">
            {isCalibration ? (
              <div className="h-full flex flex-col justify-center gap-8">
                <div className="flex flex-col md:flex-row items-center gap-8 px-4">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-emerald-500/10 blur-[30px] rounded-full animate-pulse" />
                    <div className="relative w-20 h-20 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-center text-emerald-400 shadow-2xl">
                      <Zap size={32} />
                    </div>
                  </div>

                  <div className="space-y-3 text-center md:text-left">
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">
                        Performance Profile
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-sm">
                        Complete{" "}
                        <span className="text-emerald-400 font-black">
                          {5 - stats.totalInterviews} more interviews
                        </span>{" "}
                        to unlock advanced performance insights.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(stats.totalInterviews / 5) * 100}%`,
                          }}
                          className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        />
                      </div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        {stats.totalInterviews}/5 Interviews
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 group hover:bg-white/[0.04] transition-all">
                    <div className="flex items-center gap-2">
                      <Brain size={12} className="text-cyan-400" />
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        Technical Focus
                      </div>
                    </div>
                    <div className="text-sm font-bold text-slate-200 tracking-tight">
                      {stats.weakestTopics[0]?.name || "Broad Platform Coverage"}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic opacity-70">
                      Based on your recent interview performance.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 group hover:bg-white/[0.04] transition-all">
                    <div className="flex items-center gap-2">
                      <Award size={12} className="text-emerald-400" />
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        Strongest Area
                      </div>
                    </div>
                    <div className="text-sm font-bold text-slate-200 tracking-tight">
                      {stats.strongestTopics[0]?.name ||
                        "Professional Readiness"}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic opacity-70">
                      Your strongest area so far.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full -ml-4 pr-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={stats.timelineData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.03)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="session"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#475569", fontSize: 9, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis hide={true} domain={[0, 105]} />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        stroke: "rgba(255,255,255,0.1)",
                        strokeWidth: 1,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      strokeWidth={3}
                      fill="url(#velocityGradient)"
                      animationDuration={2000}
                      dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
                      activeDot={{
                        r: 6,
                        fill: "#10b981",
                        stroke: "#020617",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Metrics Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 mt-8 border-t border-white/5">
            <div className="px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                <ShieldCheck size={10} className="text-emerald-500 shrink-0" />
                <span className="truncate">Technical Skills</span>
              </div>
              <div className="text-[11px] font-bold text-slate-200 tracking-tight leading-tight">
                {stats.techPerformance}
              </div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                <MessageSquare size={10} className="text-cyan-500 shrink-0" />
                <span className="truncate">Communication</span>
              </div>
              <div className="text-[11px] font-bold text-slate-200 tracking-tight leading-tight">
                {stats.commClarity}
              </div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                <Award size={10} className="text-purple-500 shrink-0" />
                <span className="truncate">Interview Consistency</span>
              </div>
              <div className="text-[11px] font-bold text-slate-200 tracking-tight leading-tight">
                {stats.interviewConsistency}
              </div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                <Flame size={10} className="text-orange-500 shrink-0" />
                <span className="truncate">Response Confidence</span>
              </div>
              <div className="text-[11px] font-bold text-slate-200 tracking-tight leading-tight">
                {stats.responseConfidence}
              </div>
            </div>
          </div>
        </div>

        {/* Topic Analysis Panel */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          {/* Topic Intelligence */}
          <div className="flex-1 premium-glass rounded-[2rem] p-8 border border-white/5 bg-slate-950/20 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Brain size={16} />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Topic Analysis
              </h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  <span>Strongest Topics</span>
                  <span className="text-[8px] text-slate-600">
                    Weighted Recency
                  </span>
                </div>
                {stats.strongestTopics.length > 0 ? (
                  stats.strongestTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                          {topic.name}
                        </span>
                        <div className="text-[8px] font-black uppercase text-emerald-500/50">
                          {topic.confidence} Confidence
                        </div>
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
                        <span className="text-[10px] font-black text-emerald-400">
                          {topic.avg}%
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-[10px] text-slate-600 italic">
                    No data available
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  Areas to Improve
                </div>
                <div className="flex flex-wrap gap-2">
                  {stats.weakestTopics.length > 0 ? (
                    stats.weakestTopics.map((topic, i) => (
                      <div
                        key={i}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-500/[0.03] border border-rose-500/10 text-[9px] font-black text-rose-400/80 uppercase tracking-tighter flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-rose-500" />
                        {topic.name}
                        <span className="text-[7px] text-rose-500/40 ml-1">
                          {topic.confidence === "High" ? "!!" : "!"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-[10px] text-slate-600 italic">
                      No weaknesses detected
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="premium-glass rounded-[2rem] p-8 border border-white/5 bg-slate-950/20 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="space-y-1">
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                  Interview Streak
                </div>
                <div className="text-3xl font-black text-white flex items-center gap-2">
                  {stats.streak}
                  <Flame size={18} className="text-orange-500" />
                </div>
              </div>
              <div className="w-px h-8 bg-white/5" />
              <div className="space-y-1">
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                  Total Interviews
                </div>
                <div className="text-3xl font-black text-white">
                  {stats.totalInterviews}
                </div>
              </div>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-6 rounded-full transition-all duration-500 ${i < stats.streak ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.3)]" : "bg-white/5"}`}
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
