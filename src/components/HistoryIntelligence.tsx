import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import AnalyticsDashboard from "./AnalyticsDashboard";

import type { Answer, Role } from "../types";
const stripHtml = (html?: unknown): string => {
  return String(html || "").replace(/<[^>]*>?/gm, "");
};

import {
  History,
  Target,
  Calendar,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Search,
  Zap,
  Award,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

interface SkillMatrixItem {
  name: string;
  value: number;
}

interface WeakConceptItem {
  name: string;
  severity?: string;
}

interface BehaviorAnalytics {
  avgWords?: number;
  fluency?: string;
  style?: string;
  confidence?: string;
  observation?: string;
}

interface InterviewRecord {
  id: string;
  created_at: string;
  user_id: string;

  role: Role;
  difficulty: string;

  score: number;

  communication_score: number;
  technical_score: number;
  confidence_score: number;

  feedback: string;
  transcript: string;

  duration: number;

  skill_matrix: SkillMatrixItem[];

  weak_concepts: WeakConceptItem[];

  coach_advice: string;

  ai_verdict: string;

  behavior_analytics: BehaviorAnalytics;

  full_results: Answer[];
}

interface HistoryIntelligenceProps {
  onViewDetail: (record: InterviewRecord) => void;
}

const HistoryIntelligence: React.FC<HistoryIntelligenceProps> = ({
  onViewDetail,
}) => {
  const { user } = useAuth();

  const [records, setRecords] = useState<InterviewRecord[]>([]);

  const [loading, setLoading] = useState(true);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterScore, setFilterScore] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchHistory = async () => {
      console.log("[DEBUG_HISTORY] fetchHistory triggered");

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        console.log("[DEBUG_HISTORY] Fetching records:", authUser.id);

        const { data, error } = await supabase
          .from("interview_history")
          .select("*")
          .eq("user_id", authUser.id)
          .order("created_at", {
            ascending: false,
          });

        if (error) throw error;

        const fetchedRecords = (Array.isArray(data) ? data : []).map(
          (record: Record<string, unknown>) => ({
            ...record,

           id: String(record?.id || ""), created_at: String(record?.created_at || ""), user_id: String(record?.user_id || ""), role: String(record?.role || "Unknown") as Role,

            difficulty: String(record?.difficulty || "Unknown"),

            score: Number(record?.score || 0),

            communication_score: Number(record?.communication_score || 0),

            technical_score: Number(record?.technical_score || 0),

            confidence_score: Number(record?.confidence_score || 0),

            feedback: String(record?.feedback || ""),

            transcript: String(record?.transcript || ""),

            coach_advice: String(record?.coach_advice || ""),

            ai_verdict: String(record?.ai_verdict || ""),

            duration: Number(record?.duration || 0),

            weak_concepts: Array.isArray(record?.weak_concepts)
              ? record.weak_concepts as WeakConceptItem[]
              : [],

            skill_matrix: Array.isArray(record?.skill_matrix)
              ? record.skill_matrix as SkillMatrixItem[]
              : [],

            full_results: Array.isArray(record?.full_results)
              ? record.full_results as Answer[]
              : [],

            behavior_analytics:
              typeof record?.behavior_analytics === "object" &&
              record?.behavior_analytics !== null
                ? record.behavior_analytics as BehaviorAnalytics
                : {},
          }),
        );

        setRecords(Array.isArray(fetchedRecords) ? fetchedRecords : []);
      } catch (err) {
        console.error("[DEBUG_HISTORY_ERROR]", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  // Derived Data for Refactored UI
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.ai_verdict.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stripHtml(r.coach_advice).toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = filterRole === "all" || r.role === filterRole;
      const matchesDifficulty =
        filterDifficulty === "all" || r.difficulty === filterDifficulty;

      let matchesScore = true;
      if (filterScore === "exceptional") matchesScore = r.score >= 90;
      else if (filterScore === "strong")
        matchesScore = r.score >= 80 && r.score < 90;
      else if (filterScore === "developing")
        matchesScore = r.score >= 70 && r.score < 80;
      else if (filterScore === "needs-work") matchesScore = r.score < 70;

      return matchesSearch && matchesRole && matchesDifficulty && matchesScore;
    });
  }, [records, searchQuery, filterRole, filterDifficulty, filterScore]);

  const uniqueRoles = useMemo(
    () => Array.from(new Set(records.map((r) => r.role))),
    [records],
  );
  const uniqueDifficulties = useMemo(
    () => Array.from(new Set(records.map((r) => r.difficulty))),
    [records],
  );

  const featuredSessions = useMemo(() => {
    if (filteredRecords.length === 0) return [];

    const featured: {
      record: InterviewRecord;
      type: "latest" | "highest" | "improved";
    }[] = [];

    // 1. Latest
    featured.push({ record: filteredRecords[0], type: "latest" });

    // 2. Highest Score (distinct from latest)
    const remainingAfterLatest = filteredRecords.slice(1);
    if (remainingAfterLatest.length > 0) {
      const highest = [...remainingAfterLatest].sort(
        (a, b) => b.score - a.score,
      )[0];
      featured.push({ record: highest, type: "highest" });
    }

    // 3. Most Improved
    const remainingAfterHighest = filteredRecords.filter(
      (r) => !featured.find((f) => f.record.id === r.id),
    );
    if (remainingAfterHighest.length > 0) {
      const improvedRecords = remainingAfterHighest
        .map((r) => {
          const indexInFullRecords = records.findIndex(
            (full) => full.id === r.id,
          );
          const previousRecord = records[indexInFullRecords + 1];
          const improvement = previousRecord ? r.score - previousRecord.score : 0;
          return { record: r, improvement };
        })
        .sort((a, b) => b.improvement - a.improvement);

      featured.push({ record: improvedRecords[0].record, type: "improved" });
    }

    return featured;
  }, [filteredRecords, records]);

  const timelineRecords = useMemo(() => {
    const featuredIds = new Set(featuredSessions.map((f) => f.record.id));
    return filteredRecords.filter((r) => !featuredIds.has(r.id));
  }, [filteredRecords, featuredSessions]);

  const stats = useMemo(() => {
    if (records.length === 0) return null;

    // 1. Multi-Dimensional Scoring (Weighted)
    const dimensions = records.map(r => ({
      tech: Number(r.technical_score || r.score || 0),
      comm: Number(r.communication_score || r.score || 0),
      conf: Number(r.confidence_score || r.score || 0),
      duration: Number(r.duration || 0)
    }));

    const avgTech = dimensions.reduce((acc, d) => acc + d.tech, 0) / records.length;
    const avgComm = dimensions.reduce((acc, d) => acc + d.comm, 0) / records.length;
    const avgConf = dimensions.reduce((acc, d) => acc + d.conf, 0) / records.length;

    // Weighted Performance Score: 50% Technical, 30% Communication, 20% Confidence
    const weightedPerformance = (avgTech * 0.5) + (avgComm * 0.3) + (avgConf * 0.2);

    // 2. Consistency & Confidence Analysis
    const techVariance = dimensions.reduce((acc, d) => acc + Math.pow(d.tech - avgTech, 2), 0) / records.length;
    const technicalConsistency = Math.sqrt(techVariance);
    
    // Qualitative mapping for consistency
    const getConsistencyLabel = (variance: number) => {
      if (records.length < 5) return "Limited Data";
      if (variance < 5) return "Stable";
      if (variance < 12) return "Improving Stability";
      if (variance < 20) return "Building Consistency";
      return "Inconsistent";
    };

    // Qualitative mapping for confidence
    const getConfidenceLabel = (conf: number) => {
      if (records.length < 3) return "Initial Signals";
      if (conf >= 85) return "Exceptional";
      if (conf >= 70) return "Strong";
      if (conf >= 50) return "Moderate";
      return "Needs Improvement";
    };

    // Qualitative mapping for technical performance
    const getTechLabel = (score: number) => {
      if (records.length < 3) return "Early Signals";
      if (score >= 85) return "Architectural";
      if (score >= 70) return "Professional";
      if (score >= 50) return "Good Foundation";
      return "Needs Improvement";
    };

    // Qualitative mapping for communication
    const getCommLabel = (score: number) => {
      if (records.length < 3) return "Early Signals";
      if (score >= 85) return "Articulate";
      if (score >= 70) return "Clear";
      if (score >= 50) return "Improving";
      return "Needs Improvement";
    };

    // 3. Recency-Weighted Topic Intelligence
    const skillMap: Record<string, { total: number; count: number; weightTotal: number }> = {};
    const weakMap: Record<string, { count: number; weightTotal: number }> = {};

    records.forEach((record, index) => {
      // Weight: 1.0 for oldest, up to 2.0 for most recent
      const recencyWeight = 1 + (1 - (index / records.length));

      (record.skill_matrix || []).forEach((skill) => {
        if (!skill.name) return;
        if (!skillMap[skill.name]) skillMap[skill.name] = { total: 0, count: 0, weightTotal: 0 };
        skillMap[skill.name].total += Number(skill.value || 0) * recencyWeight;
        skillMap[skill.name].count += 1;
        skillMap[skill.name].weightTotal += recencyWeight;
      });

      (record.weak_concepts || []).forEach((weak) => {
        if (!weak.name) return;
        if (!weakMap[weak.name]) weakMap[weak.name] = { count: 0, weightTotal: 0 };
        weakMap[weak.name].count += 1;
        weakMap[weak.name].weightTotal += recencyWeight;
      });
    });

    const strongestTopics = Object.entries(skillMap)
      .map(([name, data]) => ({ 
        name, 
        avg: Math.round(data.total / data.weightTotal),
        confidence: data.count >= 3 ? "High" : data.count >= 2 ? "Moderate" : "Low"
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 3);

    const weakestTopics = Object.entries(weakMap)
      .map(([name, data]) => ({ 
        name, 
        count: data.count,
        confidence: data.count >= 3 ? "High" : "Moderate"
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // 4. Trend Intelligence
    const timelineData = [...records].reverse().map((record, idx) => ({
      session: `Session ${idx + 1}`,
      date: record.created_at
        ? new Date(record.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        : "Unknown",
      score: Math.round(record.score || 0),
      technical: Math.round(record.technical_score || 0),
      communication: Math.round(record.communication_score || 0),
    }));

    const recentDimensions = dimensions.slice(0, Math.min(3, records.length));
    const recentAvg = recentDimensions.length > 0 ? recentDimensions.reduce((acc, d) => acc + d.tech, 0) / recentDimensions.length : 0;
    const baselineAvg = avgTech;
    const growth = baselineAvg > 0 ? ((recentAvg - baselineAvg) / baselineAvg) * 100 : 0;

    // Streak Calculation
    const uniqueDates = records
      .map((r) => new Date(r.created_at).toDateString())
      .filter((v, i, a) => a.indexOf(v) === i);

    let streak = 0;
    if (uniqueDates.length > 0) {
      const dateObjects = uniqueDates.map(d => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
      const today = new Date();
      today.setHours(0,0,0,0);
      
      const latestInterview = dateObjects[0];
      const diffDays = (today.getTime() - latestInterview.getTime()) / (1000 * 3600 * 24);

      if (diffDays <= 1) {
        streak = 1;
        for (let i = 1; i < dateObjects.length; i++) {
          const prevDiff = (dateObjects[i-1].getTime() - dateObjects[i].getTime()) / (1000 * 3600 * 24);
          if (prevDiff === 1) streak++;
          else break;
        }
      }
    }

    // Data Confidence & Tier Logic
    const count = records.length;
    const intelligenceTier: 'calibration' | 'basic' | 'advanced' = 
      count >= 10 ? 'advanced' : count >= 5 ? 'basic' : 'calibration';
    
    const dataConfidence = 
      count >= 10 ? "High Confidence" : count >= 5 ? "Moderate Confidence" : "Initial Calibration";

    // Qualitative labels for Readiness
    const getReadinessLabel = (score: number) => {
      if (score >= 90) return "Executive Ready";
      if (score >= 80) return "Strong Candidate";
      if (score >= 70) return "Promising";
      return "Needs Improvement";
    };

    return {
      avgScore: Math.round(weightedPerformance),
      recentGrowth: Math.round(growth),
      timelineData,
      totalInterviews: count,
      readiness: getReadinessLabel(weightedPerformance),
      signalStrength: Math.round(weightedPerformance),
      strongestTopics,
      weakestTopics,
      streak,
      dataConfidence,
      intelligenceTier,
      // Grounded qualitative metrics
      techPerformance: getTechLabel(avgTech),
      commClarity: getCommLabel(avgComm),
      interviewConsistency: getConsistencyLabel(technicalConsistency),
      responseConfidence: getConfidenceLabel(avgConf)
    };
  }, [records]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-10 w-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin mb-4" />

        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading Performance History
        </p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-20 premium-glass rounded-3xl border border-white/5">
        <h3 className="text-xl font-bold text-white mb-2">No History Yet</h3>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <AnalyticsDashboard stats={stats} />

      {/* Session Archives Section */}
      <div className="space-y-10 pt-16 border-t border-white/5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-3 shrink-0">
            <History className="text-cyan-500" size={24} />

            <h3 className="text-3xl font-black text-white italic">
              Intelligence Archives
            </h3>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full xl:w-auto">
            <div className="relative group w-full md:w-64 shrink-0">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors"
                size={16}
              />

              <input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all w-full"
              />
            </div>

            <div className="relative group w-full md:min-w-[180px] flex-1 md:flex-initial">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-2xl py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all cursor-pointer w-full"
              >
                <option value="all" className="bg-[#0f172a] text-white">All Roles</option>

                {uniqueRoles.map((role) => (
                  <option key={role} value={role} className="bg-[#0f172a] text-white">
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-cyan-400 transition-colors" size={14} />
            </div>

            <div className="relative group w-full md:min-w-[180px] flex-1 md:flex-initial">
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-2xl py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all cursor-pointer w-full"
              >
                <option value="all" className="bg-[#0f172a] text-white">All Difficulties</option>

                {uniqueDifficulties.map((diff) => (
                  <option key={diff} value={diff} className="bg-[#0f172a] text-white">
                    {diff}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-cyan-400 transition-colors" size={14} />
            </div>

            <div className="relative group w-full md:min-w-[180px] flex-1 md:flex-initial">
              <select
                value={filterScore}
                onChange={(e) => setFilterScore(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-2xl py-3 pl-5 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all cursor-pointer w-full"
              >
                <option value="all" className="bg-[#0f172a] text-white">All Scores</option>

                <option value="exceptional" className="bg-[#0f172a] text-white">Exceptional (90+)</option>

                <option value="strong" className="bg-[#0f172a] text-white">Strong (80-89)</option>

                <option value="developing" className="bg-[#0f172a] text-white">Developing (70-79)</option>

                <option value="needs-work" className="bg-[#0f172a] text-white">Needs Work (&lt;70)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-cyan-400 transition-colors" size={14} />
            </div>
          </div>
        </div>

        {/* Featured Sessions */}
        {featuredSessions.length > 0 &&
          searchQuery === "" &&
          filterRole === "all" &&
          filterScore === "all" && (
            <div className="space-y-6">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-2">
                <Sparkles size={12} className="text-cyan-400" />
                Featured Intelligence
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {featuredSessions.map(({ record, type }) => (
                  <motion.button
                    key={record.id}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => onViewDetail(record)}
                    className="text-left relative group overflow-hidden premium-glass rounded-[2rem] p-8 border border-white/10 hover:border-cyan-500/30 transition-all"
                  >
                    {/* Type Badge */}
                    <div
                      className={`absolute top-0 right-0 px-6 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${
                        type === "latest"
                          ? "bg-cyan-500/20 text-cyan-300"
                          : type === "highest"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-purple-500/20 text-purple-300"
                      }`}
                    >
                      {type}
                    </div>

                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                        {type === "latest" ? (
                          <Zap className="text-cyan-400" size={28} />
                        ) : type === "highest" ? (
                          <Award className="text-emerald-400" size={28} />
                        ) : (
                          <TrendingUp className="text-purple-400" size={28} />
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-4xl font-black text-white">
                          {record.score}%
                        </div>

                        <div className="text-[10px] uppercase tracking-widest text-slate-500">
                          Efficiency
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">
                        {record.role}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar size={14} />

                        {new Date(record.created_at).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </div>

                      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed italic">
                        "{stripHtml(record.coach_advice)}"
                      </p>

                      <div className="pt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors">
                        <span>Analyze Session</span>

                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

        {/* Compact Timeline */}
        <div className="space-y-6">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-2">
            <History size={12} />
            Session Timeline
          </div>

          <div className="premium-glass rounded-[2rem] border border-white/5 overflow-hidden">
            <div className="divide-y divide-white/5">
              {timelineRecords.slice(0, visibleCount).map((record) => (
                <motion.button
                  key={record.id}
                  onClick={() => onViewDetail(record)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                  className="w-full text-left px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-all"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all">
                      <Target size={20} />
                    </div>

                    <div>
                      <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {record.role}
                      </h4>

                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        <Calendar size={12} />

                        {new Date(record.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center w-24">
                      <div className="text-xl font-black text-white">
                        {record.score}%
                      </div>

                      <div className="text-[10px] uppercase tracking-widest text-slate-500">
                        Score
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          record.score >= 90
                            ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                            : record.score >= 80
                              ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
                              : "border-slate-500/20 bg-slate-500/5 text-slate-400"
                        }`}
                      >
                        {record.difficulty}
                      </div>

                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {timelineRecords.length > visibleCount && (
              <div className="p-8 border-t border-white/5 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="px-8 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Load More Sessions
                </button>
              </div>
            )}

            {timelineRecords.length === 0 && (
              <div className="p-20 text-center text-slate-500 italic">
                No sessions found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryIntelligence;
