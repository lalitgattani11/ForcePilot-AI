import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

import type { Answer, Role } from "../types";
const stripHtml = (
  html?: string | null,
): string => {
  return (html || "").replace(
    /<[^>]*>?/gm,
    "",
  );
};

import {
  History,
  TrendingUp,
  Target,
  Calendar,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

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

const HistoryIntelligence: React.FC<
  HistoryIntelligenceProps
> = ({ onViewDetail }) => {
  const { user } = useAuth();

  const [records, setRecords] = useState<
    InterviewRecord[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [careerInsight, setCareerInsight] =
    useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      console.log(
        "[DEBUG_HISTORY] fetchHistory triggered",
      );

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        console.log(
          "[DEBUG_HISTORY] Fetching records:",
          authUser.id,
        );

        const { data, error } = await supabase
          .from("interview_history")
          .select("*")
          .eq("user_id", authUser.id)
          .order("created_at", {
            ascending: false,
          });

        if (error) throw error;

        const fetchedRecords =
          (data as InterviewRecord[]) || [];

        setRecords(fetchedRecords);

        if (fetchedRecords.length > 0) {
          const API_URL =
            import.meta.env.VITE_API_URL;

          const insightResponse = await fetch(
            `${API_URL}/generate-career-insight`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                history: fetchedRecords.map(
                  (r) => ({
                    role: r.role,
                    score: r.score,
                    feedback: r.feedback,
                    weak_concepts:
                      r.weak_concepts,
                    date: r.created_at,
                  }),
                ),

                role: fetchedRecords[0].role,
              }),
            },
          );

          if (insightResponse.ok) {
            const insightData =
              await insightResponse.json();

            setCareerInsight(
              insightData.careerInsight,
            );
          }
        }
      } catch (err) {
        console.error(
          "[DEBUG_HISTORY_ERROR]",
          err,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const stats = useMemo(() => {
    if (records.length === 0) return null;

    const avgScore =
      records.reduce(
        (acc, r) => acc + r.score,
        0,
      ) / records.length;

    const bestRole =
      records[0]?.role || "N/A";

    const timelineData = [
      ...records,
    ]
      .reverse()
      .map((record) => ({
        date: new Date(
          record.created_at,
        ).toLocaleDateString(),

        score: record.score,
      }));

    return {
      avgScore: Math.round(avgScore),

      bestRole,

      timelineData,

      totalInterviews:
        records.length,

      coachAdvice:
        careerInsight ||
        records[0]?.coach_advice ||
        "",
    };
  }, [records, careerInsight]);

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
        <h3 className="text-xl font-bold text-white mb-2">
          No History Yet
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs tracking-[0.2em] uppercase">
          <History size={14} />
          Personal Archives
        </div>

        <h2 className="text-4xl font-black text-white">
          Performance Intelligence
        </h2>

        <p className="text-slate-500 max-w-2xl mx-auto">
          Your historical session data synthesized into actionable career growth metrics.
        </p>
      </div>

      {/* Top Stats */}
      {stats && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Card */}
          <div className="xl:col-span-2 premium-glass rounded-3xl p-10 border border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400 mb-6">
              <TrendingUp size={12} />
              Growth Intelligence
            </div>

            <h3 className="text-5xl font-black text-white mb-4">
              Career Evolution
            </h3>

            <p className="text-slate-400 mb-10 max-w-xl">
              Your Salesforce mastery has improved through recent interview sessions.
            </p>

            <div className="grid grid-cols-2 gap-10 mb-10">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                  Average Score
                </div>

                <div className="text-5xl font-black text-white">
                  {stats.avgScore}%
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                  Top Track
                </div>

                <div className="text-emerald-400 text-xl font-bold">
                  {stats.bestRole}
                </div>
              </div>
            </div>

           <div className="w-full h-48 min-h-[192px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <AreaChart
                  data={stats.timelineData}
                >
                  <defs>
                    <linearGradient
                      id="colorHistory"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#10b981"
                        stopOpacity={0.4}
                      />

                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorHistory)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Cards */}
          <div className="space-y-6">
            <div className="premium-glass rounded-3xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles
                  className="text-cyan-400"
                  size={18}
                />

                <h4 className="text-lg font-bold text-white">
                  AI Coach Insight
                </h4>
              </div>

              <p className="text-slate-400 italic leading-relaxed">
                "{stripHtml(
                  stats.coachAdvice,
                )}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="premium-glass rounded-3xl p-6 border border-white/5 text-center">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                  Interviews
                </div>

                <div className="text-3xl font-black text-white">
                  {stats.totalInterviews}
                </div>
              </div>

              <div className="premium-glass rounded-3xl p-6 border border-white/5 text-center">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">
                  Readiness
                </div>

                <div className="text-xl font-black text-cyan-400">
                  Developing
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Archives */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <History
            className="text-slate-500"
            size={18}
          />

          <h3 className="text-2xl font-bold text-white">
            Session Archives
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {records.map((record) => (
            <motion.button
              key={record.id}
              whileHover={{ y: -4 }}
              onClick={() =>
                onViewDetail(record)
              }
              className="text-left group premium-glass rounded-3xl p-6 border border-white/10"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Target
                    className="text-slate-500"
                    size={24}
                  />
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-white">
                    {record.score}%
                  </div>

                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    Final Grade
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-white text-lg">
                  {record.role}
                </h4>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar size={12} />

                  {new Date(
                    record.created_at,
                  ).toLocaleDateString()}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {stripHtml(
                    record.coach_advice,
                  )}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>
                    View Full Intelligence
                  </span>

                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryIntelligence;