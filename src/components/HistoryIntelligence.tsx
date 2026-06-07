import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";

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
  completeness?: number;
  consistency?: number;
  technical?: number;
  communication?: number;
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
  focus?: string;
}

interface HistoryIntelligenceProps {
  onViewDetail?: (record: InterviewRecord) => void;
}

const getSessionSlug = (role: string, id: string) => {
  const cleanRole = role.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${cleanRole}--${id}`;
};

const HistoryIntelligence: React.FC<HistoryIntelligenceProps> = ({
  onViewDetail,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [records, setRecords] = useState<InterviewRecord[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState<string | null>(null);

  // Delete State
  const [sessionToDelete, setSessionToDelete] =
    useState<InterviewRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterScore, setFilterScore] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchHistory = async () => {
      // Use user from context if available, otherwise fallback to explicit check
      const authUser = user;

      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        // OPTIMIZATION: Fetch only metadata and scores to avoid timeout on large JSON columns
        const INITIAL_COLUMNS = [
          "id",
          "created_at",
          "user_id",
          "role",
          "difficulty",
          "score",
          "technical_score",
          "communication_score",
          "confidence_score",
          "feedback",
          "coach_advice",
          "ai_verdict",
          "duration",
          "behavior_analytics",
          "skill_matrix",
          "weak_concepts",
        ].join(",");

        const { data, error } = await supabase
          .from("interview_history")
          .select(INITIAL_COLUMNS)
          .eq("user_id", authUser.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("[SUPABASE_FETCH_ERROR]", error);
          throw error;
        }

        // PRODUCTION-GRADE FILTERING: Include completed sessions & valid legacy data
        const rawData: any[] = Array.isArray(data) ? data : [];
        const filteredData = rawData.filter((record: any) => {
          const hasTenQuestions = Number(record.duration || 0) >= 10;

          const hasValidLegacyResults =
            Number(record.score || 0) > 0 &&
            Array.isArray(record.full_results) &&
            record.full_results.length > 0;

          return hasTenQuestions || hasValidLegacyResults;
        });

        const fetchedRecords = (filteredData as any[]).map((record) => {
          const rawScore = Number(record?.score || 0);
          const behavior =
            (record?.behavior_analytics as BehaviorAnalytics) || {};
          const createdAt = String(record?.created_at || "");

          // Apply simple rounding for consistency
          const normalizedScore = Math.round(rawScore);

          // PRODUCTION-LEVEL SESSION NORMALIZATION
          const getNormalizedLabel = () => {
            const diff = String(record?.difficulty || "").toLowerCase();
            const score = normalizedScore;
            if (score >= 90) return "Final Evaluation";
            if (diff.includes("advanced") || diff.includes("intermediate"))
              return "Technical Screening";
            return "Mock Interview";
          };

          return {
            ...record,
            id: String(record?.id || ""),
            created_at: createdAt,
            user_id: String(record?.user_id || ""),
            role:
              !record?.role || String(record.role).toLowerCase() === "unknown"
                ? ("Professional Readiness" as Role)
                : (String(record.role) as Role),
            difficulty: getNormalizedLabel(),
            score: normalizedScore,
            communication_score: Math.round(
              Number(record?.communication_score || rawScore),
            ),
            technical_score: Math.round(
              Number(record?.technical_score || rawScore),
            ),
            confidence_score: Math.round(
              Number(record?.confidence_score || rawScore),
            ),
            feedback: String(record?.feedback || ""),
            transcript: String(record?.transcript || ""),
            coach_advice: String(record?.coach_advice || ""),
            ai_verdict: String(record?.ai_verdict || ""),
            duration: Number(record?.duration || 0),
            weak_concepts: Array.isArray(record?.weak_concepts)
              ? (record.weak_concepts as WeakConceptItem[])
              : [],
            skill_matrix: Array.isArray(record?.skill_matrix)
              ? (record.skill_matrix as SkillMatrixItem[])
              : [],
            full_results: Array.isArray(record?.full_results)
              ? (record.full_results as Answer[])
              : [],
            behavior_analytics: behavior,
            focus: (() => {
              const results = Array.isArray(record?.full_results)
                ? (record.full_results as any[])
                : [];
              if (results.length > 0) {
                const topic =
                  results[0].displayTopic ||
                  results[0].topic ||
                  results[0].questionText ||
                  "General Assessment";
                return topic;
              }
              // Fallback for optimized fetch
              return record.role || "General Review";
            })(),
          };
        });

        // PREVENT INCONSISTENT DUPLICATES
        const uniqueMap = new Map();
        fetchedRecords.forEach((r) => {
          const date = new Date(r.created_at);
          const minuteKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
          const key = `${r.role}-${r.focus}-${r.score}-${minuteKey}`;

          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, r);
          }
        });

        const deduplicatedRecords = Array.from(uniqueMap.values());

        // SECONDARY FETCH: Fetch full_results for only the last 10 records to populate the dashboard topics
        // This keeps the initial load fast while still providing deep insights for the dashboard
        if (deduplicatedRecords.length > 0) {
          const topIds = deduplicatedRecords.slice(0, 10).map((r) => r.id);
          const { data: topicData } = await supabase
            .from("interview_history")
            .select("id, full_results")
            .in("id", topIds);

          if (topicData) {
            const topicMap = new Map(
              topicData.map((d: any) => [d.id, d.full_results]),
            );
            deduplicatedRecords.forEach((r) => {
              if (topicMap.has(r.id)) {
                r.full_results = topicMap.get(r.id);
                // Update focus with real topic data
                if (r.full_results && r.full_results.length > 0) {
                  const firstResult = r.full_results[0] as any;
                  r.focus =
                    firstResult.displayTopic ||
                    firstResult.topic ||
                    firstResult.questionText ||
                    r.role;
                }
              }
            });
          }
        }
        setRecords(deduplicatedRecords);
      } catch (err) {
        console.error("[HISTORY_CRITICAL_FAILURE]", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const handleViewDetail = async (record: InterviewRecord) => {
    // If we already have the full results, just navigate
    if (record.full_results && record.full_results.length > 0) {
      if (onViewDetail) onViewDetail(record);
      else navigate(`/session/${getSessionSlug(record.role, record.id)}`);
      return;
    }

    setLoadingDetails(record.id);

    try {
      // Fetch full results and transcript on-demand
      const { data, error } = await supabase
        .from("interview_history")
        .select("full_results, transcript")
        .eq("id", record.id)
        .single();

      if (error) throw error;

      const fullRecord = {
        ...record,
        full_results: data.full_results || [],
        transcript: data.transcript || "",
      };

      // Update local state so we don't have to fetch again
      setRecords((prev) =>
        prev.map((r) => (r.id === record.id ? fullRecord : r)),
      );

      if (onViewDetail) onViewDetail(fullRecord);
      else navigate(`/session/${getSessionSlug(record.role, record.id)}`);
    } catch (err) {
      console.error("[DETAIL_FETCH_FAILURE]", err);
      alert("Intelligence details could not be retrieved. Please try again.");
    } finally {
      setLoadingDetails(null);
    }
  };

  const handleDelete = async () => {
    if (!sessionToDelete || !user) return;

    setIsDeleting(true);

    // Capture state for potential rollback
    const targetId = sessionToDelete.id;
    const previousRecords = [...records];

    // Handle potential ID type mismatch (Supabase handles most, but being explicit is safer)
    const idToUse = isNaN(Number(targetId)) ? targetId : Number(targetId);

    try {
      // 1. Attempt persistent deletion with verification
      const { data, error } = await supabase
        .from("interview_history")
        .delete()
        .eq("id", idToUse)
        .eq("user_id", user.id)
        .select();

      if (error) {
        console.error("[SUPABASE_DELETE_ERROR]", error);
        throw error;
      }

      // 2. Validate row removal (catches silent RLS policy blocks)
      if (!data || data.length === 0) {
        throw new Error(
          "Cloud archive update failed. You may not have deletion permissions for this record.",
        );
      }

      // 3. Update local state only after DB confirmation
      setRecords((prev) => prev.filter((r) => r.id !== targetId));
      setSessionToDelete(null);
    } catch (err: unknown) {
      console.error("[DELETE_EXCEPTION]", err);
      // Ensure local state remains accurate
      setRecords(previousRecords);
      const message =
        err instanceof Error
          ? err.message
          : "Deletion failed. Please verify your connection or permissions.";
      alert(message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Derived Data for Refactored UI
  const filteredRecords = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return records.filter((r) => {
      // 1. Basic Fields
      const basicMatch =
        r.role.toLowerCase().includes(query) ||
        r.ai_verdict.toLowerCase().includes(query) ||
        stripHtml(r.coach_advice).toLowerCase().includes(query) ||
        r.difficulty.toLowerCase().includes(query);

      // 2. Date Match
      const formattedDate = new Date(r.created_at)
        .toLocaleDateString()
        .toLowerCase();
      const dateMatch = formattedDate.includes(query);

      // 3. Deep Transcript Match
      const transcriptMatch = (r.transcript || "")
        .toLowerCase()
        .includes(query);

      // 4. Topic & Question Match (from full_results)
      const resultsMatch = (r.full_results || []).some((res: Answer) => {
        const resObj = res as unknown as Record<string, unknown>;

        const q = String(resObj.questionText || resObj.question || "");

        const topic = String(resObj.displayTopic || resObj.topic || "");

        const feedback = String(
          resObj.displayFeedback || resObj.feedback || "",
        );

        return (
          q.toLowerCase().includes(query) ||
          topic.toLowerCase().includes(query) ||
          feedback.toLowerCase().includes(query)
        );
      });

      // 5. Concept Match (Legacy fallbacks)
      const conceptMatch =
        (r.skill_matrix || []).some((s) =>
          s.name.toLowerCase().includes(query),
        ) ||
        (r.weak_concepts || []).some((w) =>
          w.name.toLowerCase().includes(query),
        );

      const matchesSearch =
        query === "" ||
        basicMatch ||
        dateMatch ||
        transcriptMatch ||
        resultsMatch ||
        conceptMatch;

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
    // 1. Deduplicate by ID to ensure we don't feature the same session twice
    const uniqueMap = new Map(filteredRecords.map((r) => [r.id, r]));
    const uniqueFiltered = Array.from(uniqueMap.values());

    if (uniqueFiltered.length === 0) return [];

    const featured: {
      record: InterviewRecord;
      type: "latest" | "highest" | "improved";
    }[] = [];

    // 1. Latest
    featured.push({ record: uniqueFiltered[0], type: "latest" });

    // 2. Highest Score (distinct from latest)
    const remainingAfterLatest = uniqueFiltered.slice(1);
    if (remainingAfterLatest.length > 0) {
      const highest = [...remainingAfterLatest].sort(
        (a, b) => b.score - a.score,
      )[0];
      featured.push({ record: highest, type: "highest" });
    }

    // 3. Most Improved
    const remainingAfterHighest = uniqueFiltered.filter(
      (r) => !featured.find((f) => f.record.id === r.id),
    );
    if (remainingAfterHighest.length > 0) {
      const improvedRecords = remainingAfterHighest
        .map((r) => {
          const indexInFullRecords = records.findIndex(
            (full) => full.id === r.id,
          );
          const previousRecord = records[indexInFullRecords + 1];
          const improvement = previousRecord
            ? r.score - previousRecord.score
            : 0;
          return { record: r, improvement };
        })
        .sort((a, b) => b.improvement - a.improvement);

      featured.push({ record: improvedRecords[0].record, type: "improved" });
    }

    return featured;
  }, [filteredRecords, records]);

  const uniqueTimelineRecords = useMemo(() => {
    // Ensure absolute uniqueness of all filtered records by ID
    const uniqueMap = new Map(filteredRecords.map((r) => [r.id, r]));
    return Array.from(uniqueMap.values());
  }, [filteredRecords]);

  const stats = useMemo(() => {
    if (records.length === 0) return null;

    // 1. Multi-Dimensional Scoring (Weighted)
    const dimensions = records.map((r) => ({
      tech: Number(r.technical_score || r.score || 0),
      comm: Number(r.communication_score || r.score || 0),
      conf: Number(r.confidence_score || r.score || 0),
      duration: Number(r.duration || 0),
    }));

    const avgTech =
      dimensions.reduce((acc, d) => acc + d.tech, 0) / records.length;
    const avgComm =
      dimensions.reduce((acc, d) => acc + d.comm, 0) / records.length;
    const avgConf =
      dimensions.reduce((acc, d) => acc + d.conf, 0) / records.length;

    // 2. Consistency & Confidence Analysis
    const techVariance =
      dimensions.reduce((acc, d) => acc + Math.pow(d.tech - avgTech, 2), 0) /
      records.length;
    const technicalConsistency = Math.sqrt(techVariance);

    // Qualitative mapping for consistency
    const getConsistencyLabel = (variance: number) => {
      if (records.length === 1) return "Early Stage";
      if (records.length < 3) return "Moderate";
      if (variance < 5) return "Stable";
      if (variance < 12) return "Improving";
      if (variance < 20) return "Building";
      return "Variable";
    };

    // Qualitative mapping for confidence
    const getConfidenceLabel = (conf: number) => {
      if (conf >= 88) return "Expert Conviction";
      if (conf >= 75) return "Strong";
      if (conf >= 60) return "Moderate";
      return "Low Conviction";
    };

    // Qualitative mapping for technical performance
    const getTechLabel = (score: number) => {
      if (score >= 88) return "Architectural";
      if (score >= 75) return "Professional";
      if (score >= 60) return "Operational";
      return "Conceptual Gaps";
    };

    // Qualitative mapping for communication
    const getCommLabel = (score: number) => {
      if (score >= 88) return "Elite";
      if (score >= 75) return "Professional";
      if (score >= 60) return "Effective";
      return "Needs Refinement";
    };

    // 3. Grounded Topic Extraction
    const skillMap: Record<
      string,
      { total: number; count: number; weightTotal: number }
    > = {};
    const weakMap: Record<string, { count: number; weightTotal: number }> = {};

    // Behavioral Stats
    let totalWords = 0;
    let totalAnswers = 0;
    let lowDepthCount = 0;
    let totalReasoning = 0;

    records.forEach((record, index) => {
      const recencyWeight = 1 + 0.5 * (1 - index / records.length);

      if (
        Array.isArray(record.full_results) &&
        record.full_results.length > 0
      ) {
        record.full_results.forEach((res) => {
          const resObj = res as unknown as Record<string, unknown>;

          // Enhanced Salesforce Topic Extraction
          let topic = String(resObj.displayTopic || resObj.topic || "");
          if (
            !topic ||
            topic === "General" ||
            topic === "Technical Assessment"
          ) {
            const q = String(
              resObj.questionText || resObj.question || "",
            ).toLowerCase();

            // Security & Governance
            if (
              q.includes("profile") ||
              q.includes("permission set") ||
              q.includes("permission-set")
            )
              topic = "Profiles & Permissions";
            else if (
              q.includes("owd") ||
              q.includes("sharing rule") ||
              q.includes("record-level")
            )
              topic = "Record Security";
            else if (
              q.includes("security") ||
              q.includes("mfa") ||
              q.includes("shield")
            )
              topic = "Security Model";
            // Automation & Logic
            else if (q.includes("flow")) topic = "Flow Automation";
            else if (q.includes("validation rule")) topic = "Validation Rules";
            else if (q.includes("approval process"))
              topic = "Process Automation";
            // Apex & Backend
            else if (q.includes("trigger")) topic = "Trigger Logic";
            else if (q.includes("soql") || q.includes("sosl"))
              topic = "SOQL & SOSL";
            else if (
              q.includes("governor limit") ||
              q.includes("bulkification")
            )
              topic = "Governor Limits";
            else if (q.includes("apex")) topic = "Apex Logic";
            // Frontend & UI
            else if (
              q.includes("lwc") ||
              q.includes("component") ||
              q.includes("shadow dom")
            )
              topic = "LWC Architecture";
            // Core Data
            else if (
              q.includes("lookup") ||
              q.includes("master-detail") ||
              q.includes("junction")
            )
              topic = "Data Modeling";
            else if (
              q.includes("object") ||
              q.includes("field") ||
              q.includes("layout")
            )
              topic = "Platform Fundamentals";
            else topic = "General Administration";
          }

          const score = Number(resObj.displayScore || resObj.score || 0);
          const reasoning = Number(resObj.practicalReasoningScore || score);
          const answer = String(resObj.userAnswer || "");

          if (answer.trim()) {
            const words = answer.split(/\s+/).length;
            totalWords += words;
            totalAnswers++;
            if (words < 25) lowDepthCount++;
          }
          totalReasoning += reasoning;

          if (!skillMap[topic])
            skillMap[topic] = { total: 0, count: 0, weightTotal: 0 };
          skillMap[topic].total += score * recencyWeight;
          skillMap[topic].count += 1;
          skillMap[topic].weightTotal += recencyWeight;

          if (score < 6.5) {
            if (!weakMap[topic]) weakMap[topic] = { count: 0, weightTotal: 0 };
            weakMap[topic].count += 1;
            weakMap[topic].weightTotal += recencyWeight;
          }
        });
      } else {
        // Fallback to legacy skill_matrix
        (record.skill_matrix || []).forEach((skill) => {
          if (!skill.name) return;
          const mappedName =
            skill.name === "General" ? "Platform Fundamentals" : skill.name;
          if (!skillMap[mappedName])
            skillMap[mappedName] = { total: 0, count: 0, weightTotal: 0 };
          skillMap[mappedName].total +=
            Number(skill.value || 0) * recencyWeight;
          skillMap[mappedName].count += 1;
          skillMap[mappedName].weightTotal += recencyWeight;
        });

        (record.weak_concepts || []).forEach((weak) => {
          if (!weak.name) return;
          const mappedName =
            weak.name === "General" ? "Platform Fundamentals" : weak.name;
          if (!weakMap[mappedName])
            weakMap[mappedName] = { count: 0, weightTotal: 0 };
          weakMap[mappedName].count += 1;
          weakMap[mappedName].weightTotal += recencyWeight;
        });
      }
    });

    const getTopicStatus = (score: number) => {
      if (score >= 85) return "Expert";
      if (score >= 70) return "Strong";
      if (score >= 50) return "Developing";
      return "Critical Gap";
    };

    let strongestTopics = Object.entries(skillMap)
      .map(([name, data]) => {
        const avg = Math.round(data.total / data.weightTotal);
        return {
          name,
          avg,
          status: getTopicStatus(avg),
          confidence:
            data.count >= 3 ? "High" : data.count >= 2 ? "Moderate" : "Initial",
          count: data.count,
        };
      })
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 3);

    const weakestTopics = Object.entries(weakMap)
      .map(([name, data]) => ({
        name,
        count: data.count,
        confidence: data.count >= 2 ? "Consistent" : "Occasional",
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // Inject Behavioral Insights if topics are sparse or if they are significant
    const avgWords = totalAnswers > 0 ? totalWords / totalAnswers : 0;
    const avgReasoning = totalAnswers > 0 ? totalReasoning / totalAnswers : 0;

    if (lowDepthCount > totalAnswers * 0.4 || avgWords < 35) {
      if (!weakestTopics.find((t) => t.name === "Response Depth")) {
        weakestTopics.unshift({
          name: "Response Depth",
          count: 1,
          confidence: "Instructional",
        });
      }
    }

    if (avgReasoning < 6.5 && totalAnswers > 0) {
      if (!weakestTopics.find((t) => t.name === "Scenario Explanation")) {
        weakestTopics.push({
          name: "Scenario Explanation",
          count: 1,
          confidence: "Guidance",
        });
      }
    }

    // Ensure we always have something to show
    if (strongestTopics.length === 0) {
      strongestTopics = [
        {
          name: "Platform Fundamentals",
          avg: Math.round(avgTech),
          status: getTopicStatus(avgTech),
          confidence: "Initial",
          count: 0,
        },
        {
          name: "Communication",
          avg: Math.round(avgComm),
          status: getTopicStatus(avgComm),
          confidence: "Initial",
          count: 0,
        },
      ];
    }

    if (weakestTopics.length === 0) {
      if (avgTech < 75)
        weakestTopics.push({
          name: "Technical Accuracy",
          count: 1,
          confidence: "Guidance",
        });
      if (avgComm < 75)
        weakestTopics.push({
          name: "Professional Tone",
          count: 1,
          confidence: "Guidance",
        });
    }

    // 4. Trend Intelligence (Grounded & Chronological)
    const timelineData = [...records]
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
      .map((record) => {
        const date = new Date(record.created_at);
        const dayMonth = date.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        });

        // SINGLE SOURCE OF TRUTH: Use the exact normalized score from the record
        const consistentScore = Math.round(record.score || 0);

        return {
          session: dayMonth, // X-axis marker
          fullDate: date.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          role: record.role,
          score: consistentScore,
          technical: Math.round(record.technical_score || 0),
          communication: Math.round(record.communication_score || 0),
          id: record.id, // Explicitly map by ID for integrity
        };
      });

    const recentRecords = records.slice(0, Math.min(3, records.length));
    const recentAvg =
      recentRecords.length > 0
        ? recentRecords.reduce((acc, r) => acc + r.score, 0) /
          recentRecords.length
        : 0;
    const baselineAvg =
      records.reduce((acc, r) => acc + r.score, 0) / records.length;

    // Only calculate growth if we have more than one session
    const growth =
      records.length > 1 && baselineAvg > 0
        ? ((recentAvg - baselineAvg) / baselineAvg) * 100
        : null;

    // Streak Calculation (Realistic)
    const uniqueDates = records
      .map((r) => new Date(r.created_at).toDateString())
      .filter((v, i, a) => a.indexOf(v) === i);

    let streak = 0;
    if (uniqueDates.length > 0) {
      const dateObjects = uniqueDates
        .map((d) => new Date(d))
        .sort((a, b) => b.getTime() - a.getTime());
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const latestInterview = dateObjects[0];
      const diffDays = Math.floor(
        (today.getTime() - latestInterview.getTime()) / (1000 * 3600 * 24),
      );

      if (diffDays <= 1) {
        streak = 1;
        for (let i = 1; i < dateObjects.length; i++) {
          const prevDiff = Math.floor(
            (dateObjects[i - 1].getTime() - dateObjects[i].getTime()) /
              (1000 * 3600 * 24),
          );
          if (prevDiff === 1) streak++;
          else break;
        }
      }
    }

    // Data Confidence & Tier Logic (Recruiter-friendly)
    const count = records.length;
    const intelligenceTier: "calibration" | "basic" | "advanced" =
      count >= 10 && baselineAvg >= 85
        ? "advanced"
        : count >= 1
          ? "basic"
          : "calibration";

    const dataConfidence =
      count >= 10 && baselineAvg >= 85
        ? "Verified Expert"
        : count >= 3
          ? "Stable Pattern"
          : "Active Analysis";

    // Qualitative labels for Readiness
    const getReadinessLabel = (score: number) => {
      if (score >= 88) return "Executive Ready";
      if (score >= 75) return "Strong Candidate";
      if (score >= 60) return "Operational";
      return "Growth Required";
    };

    // Grounded topic extraction for latest topic
    let latestTopic = "";
    if (records.length > 0) {
      const latestRecord = records[0];
      if (Array.isArray(latestRecord.full_results) && latestRecord.full_results.length > 0) {
        for (const res of latestRecord.full_results) {
          const resObj = res as unknown as Record<string, unknown>;
          let topic = String(resObj.displayTopic || resObj.topic || "");
          if (!topic || topic === "General" || topic === "Technical Assessment") {
            const q = String(resObj.questionText || resObj.question || "").toLowerCase();
            if (q.includes("profile") || q.includes("permission set") || q.includes("permission-set")) topic = "Profiles & Permissions";
            else if (q.includes("owd") || q.includes("sharing rule") || q.includes("record-level")) topic = "Record Security";
            else if (q.includes("security") || q.includes("mfa") || q.includes("shield")) topic = "Security Model";
            else if (q.includes("flow")) topic = "Flow Automation";
            else if (q.includes("validation rule")) topic = "Validation Rules";
            else if (q.includes("approval process")) topic = "Process Automation";
            else if (q.includes("trigger")) topic = "Trigger Logic";
            else if (q.includes("soql") || q.includes("sosl")) topic = "SOQL & SOSL";
            else if (q.includes("governor limit") || q.includes("bulkification")) topic = "Governor Limits";
            else if (q.includes("apex")) topic = "Apex Logic";
            else if (q.includes("lwc") || q.includes("component") || q.includes("shadow dom")) topic = "LWC Architecture";
            else if (q.includes("lookup") || q.includes("master-detail") || q.includes("junction")) topic = "Data Modeling";
            else if (q.includes("object") || q.includes("field") || q.includes("layout")) topic = "Platform Fundamentals";
            else topic = "Platform Fundamentals";
          }
          if (topic) {
            latestTopic = topic;
            break;
          }
        }
      } else if (Array.isArray(latestRecord.skill_matrix) && latestRecord.skill_matrix.length > 0) {
        latestTopic = latestRecord.skill_matrix[0]?.name || "";
        if (latestTopic === "General") latestTopic = "Platform Fundamentals";
      }
    }

    let totalQuestions = 0;
    records.forEach((record) => {
      if (Array.isArray(record.full_results) && record.full_results.length > 0) {
        totalQuestions += record.full_results.length;
      } else {
        totalQuestions += 10;
      }
    });

    const latestScore = records.length > 0 ? Math.round(Number(records[0].score || 0)) : 0;
    const bestScore = records.length > 0 ? Math.round(Math.max(...records.map(r => Number(r.score || 0)))) : 0;
    const latestInterviewDate = records.length > 0 ? records[0].created_at : "";

    return {
      avgScore: Math.round(baselineAvg),
      recentGrowth: Math.round(growth ?? 0),
      timelineData,
      totalInterviews: count,
      readiness: getReadinessLabel(baselineAvg),
      signalStrength: Math.round(baselineAvg),
      strongestTopics,
      weakestTopics,
      streak,
      dataConfidence,
      intelligenceTier,
      latestScore,
      bestScore,
      latestInterviewDate,
      latestTopic,
      totalQuestions,
      // Grounded qualitative metrics
      techPerformance: getTechLabel(avgTech),
      commClarity: getCommLabel(avgComm),
      interviewConsistency: getConsistencyLabel(technicalConsistency),
      responseConfidence: getConfidenceLabel(avgConf),
    };
  }, [records]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
        <div className="h-10 w-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin mb-4" />

        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
          Syncing Intelligence Archives...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative overflow-hidden">
      {records.length > 0 && stats && <AnalyticsDashboard stats={stats} />}

      {/* Session Archives Section */}
      <div className="border-t border-white/5 pt-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2 text-center md:text-left overflow-visible">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pb-1 md:pb-0 overflow-visible">
              Intelligence{" "}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                Archives
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto md:mx-0">
              Review and analyze your previous technical simulation sessions and
              recruiter-grade evaluation reports.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full md:w-auto pb-1">
            <div className="relative group w-full md:w-48 shrink-0">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors"
                size={14}
              />

              <label htmlFor="searchArchives" className="sr-only">
                Search archives
              </label>
              <input
                id="searchArchives"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all w-full"
              />
            </div>

            <div className="relative group w-full md:w-40">
              <label htmlFor="roleFilter" className="sr-only">
                Filter by role
              </label>
              <select
                id="roleFilter"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all cursor-pointer w-full"
              >
                <option value="all" className="bg-[#0f172a] text-white">
                  All Roles
                </option>
                {uniqueRoles.map((role) => (
                  <option
                    key={role}
                    value={role}
                    className="bg-[#0f172a] text-white"
                  >
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-cyan-400 transition-colors"
                size={12}
              />
            </div>

            <div className="relative group w-full md:w-40">
              <label htmlFor="difficultyFilter" className="sr-only">
                Filter by difficulty
              </label>
              <select
                id="difficultyFilter"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all cursor-pointer w-full"
              >
                <option value="all" className="bg-[#0f172a] text-white">
                  All Diffs
                </option>
                {uniqueDifficulties.map((diff) => (
                  <option
                    key={diff}
                    value={diff}
                    className="bg-[#0f172a] text-white"
                  >
                    {diff}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-cyan-400 transition-colors"
                size={12}
              />
            </div>

            <div className="relative group w-full md:w-40">
              <label htmlFor="scoreFilter" className="sr-only">
                Filter by score
              </label>
              <select
                id="scoreFilter"
                value={filterScore}
                onChange={(e) => setFilterScore(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 transition-all cursor-pointer w-full"
              >
                <option value="all" className="bg-[#0f172a] text-white">
                  All Scores
                </option>
                <option value="exceptional" className="bg-[#0f172a] text-white">
                  90+
                </option>
                <option value="strong" className="bg-[#0f172a] text-white">
                  80-89
                </option>
                <option value="developing" className="bg-[#0f172a] text-white">
                  70-79
                </option>
                <option value="needs-work" className="bg-[#0f172a] text-white">
                  &lt;70
                </option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-cyan-400 transition-colors"
                size={12}
              />
            </div>
          </div>
        </div>

        {/* Featured Sessions */}
        {records.length > 0 &&
          featuredSessions.length > 0 &&
          searchQuery === "" &&
          filterRole === "all" &&
          filterScore === "all" && (
            <div className="space-y-6">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
                <Sparkles size={12} className="text-cyan-400" />
                Featured Intelligence
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                <AnimatePresence mode="popLayout">
                  {featuredSessions.map(({ record, type }) => (
                    <motion.div
                      layout
                      key={record.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        transition: { duration: 0.2 },
                      }}
                      className="relative h-full"
                    >
                      <motion.div
                        role="button"
                        tabIndex={0}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => handleViewDetail(record)}
                        className="w-full h-full text-left relative group overflow-hidden premium-glass rounded-[2rem] p-6 sm:p-8 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col"
                      >
                        {/* Loading Overlay */}
                        {loadingDetails === record.id && (
                          <div className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center">
                            <div className="h-8 w-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
                          </div>
                        )}

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

                        {/* Premium Delete Action */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSessionToDelete(record);
                          }}
                          aria-label="Delete session"
                          className="absolute bottom-6 right-6 p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-[#ff7b9c] hover:bg-[#16090d] hover:border-[#4b1d2b] transition-all opacity-40 group-hover:opacity-100 z-20 hover:shadow-[0_0_20px_rgba(255,123,156,0.15)]"
                          title="Delete Session"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="flex justify-between items-start mb-8 shrink-0">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                            {type === "latest" ? (
                              <Zap className="text-cyan-400" size={28} />
                            ) : type === "highest" ? (
                              <Award className="text-emerald-400" size={28} />
                            ) : (
                              <TrendingUp
                                className="text-purple-400"
                                size={28}
                              />
                            )}
                          </div>

                          <div className="text-right">
                            <div className="text-4xl font-black text-white">
                              {record.score}%
                            </div>

                            <div className="text-[10px] uppercase tracking-widest text-slate-400">
                              Efficiency
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 flex-1 flex flex-col">
                          <h4 className="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">
                            {record.role}
                          </h4>

                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Calendar size={14} />

                              {new Date(record.created_at).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </div>

                            {record.focus && (
                              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                <Target size={10} className="text-cyan-500" />
                                {record.focus}
                              </div>
                            )}
                          </div>

                          {record.coach_advice &&
                            record.coach_advice.trim() &&
                            record.coach_advice !== '""' && (
                              <div className="space-y-2 group/feedback">
                                <div className="flex items-center gap-2">
                                  <Sparkles
                                    size={10}
                                    className="text-cyan-400"
                                  />
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                    AI Feedback
                                  </span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium line-clamp-2">
                                  {stripHtml(record.coach_advice)}
                                </p>
                              </div>
                            )}

                          <div className="mt-auto pt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors">
                            <span>Analyze Session</span>
                            <ArrowUpRight size={16} />
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

        {/* Compact Timeline */}
        <div className="space-y-6">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
            <History size={12} />
            Session Timeline
          </div>

          {uniqueTimelineRecords.length > 0 ? (
            <div className="premium-glass timeline-container rounded-[2rem] border border-white/5 overflow-hidden">
              <div className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {uniqueTimelineRecords
                    .slice(0, visibleCount)
                    .map((record) => (
                      <motion.div
                        layout
                        key={record.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                          opacity: 0,
                          x: -20,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <motion.div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleViewDetail(record)}
                          whileHover={{
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                          }}
                          className="w-full text-left pl-4 pr-10 sm:px-6 md:px-8 py-5 sm:py-6 flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 group transition-all relative"
                        >
                          {/* Loading Indicator */}
                          {loadingDetails === record.id && (
                            <div className="absolute inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center">
                              <div className="h-5 w-5 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
                            </div>
                          )}

                          {/* 1. IDENTITY & METADATA */}
                          <div className="flex items-center gap-6 flex-1 min-w-0">
                            <div className="w-11 h-11 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all">
                              <Target size={22} />
                            </div>

                            <div className="min-w-0">
                              <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                                {record.role}
                              </h4>

                              <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 font-medium">
                                <div className="flex items-center gap-2">
                                  <Calendar
                                    size={13}
                                    className="text-slate-400"
                                  />
                                  {new Date(
                                    record.created_at,
                                  ).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>

                                {record.focus && (
                                  <div className="flex items-center gap-1.5 text-cyan-500/60 font-black uppercase tracking-[0.15em] text-[9px]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
                                    {record.focus}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* 2. STATS & ACTIONS (Right Stack) */}
                          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-2 sm:gap-6 md:gap-10 shrink-0 w-full md:w-auto">
                            {/* Score Column (Fixed Width for Alignment) */}
                            <div className="text-center w-12 sm:w-20 shrink-0">
                              <div className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                                {record.score}%
                              </div>
                              <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                Accuracy
                              </div>
                            </div>

                            {/* Badge Column (Consistent Alignment) */}
                            <div className="w-20 sm:w-28 flex justify-center shrink-0">
                              <div
                                className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border text-center w-full ${
                                  record.score >= 90
                                    ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                                    : record.score >= 80
                                      ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
                                      : "border-slate-500/20 bg-slate-500/5 text-slate-400"
                                }`}
                              >
                                {record.difficulty}
                              </div>
                            </div>

                            {/* Actions Column */}
                            <div className="flex items-center gap-4 shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSessionToDelete(record);
                                }}
                                aria-label="Delete session"
                                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-[#ff7b9c] hover:bg-[#16090d] hover:border-[#4b1d2b] transition-all opacity-0 lg:group-hover:opacity-100 hidden md:flex items-center justify-center"
                                title="Delete Session"
                              >
                                <Trash2 size={16} />
                              </button>

                              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-cyan-500/50 group-hover:text-cyan-400 group-hover:bg-cyan-500/5 transition-all">
                                <ChevronRight size={18} />
                              </div>
                            </div>
                          </div>

                          {/* Mobile Only: Top-Right Floating Delete */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSessionToDelete(record);
                            }}
                            aria-label="Delete session"
                            className="absolute top-4 right-4 md:hidden p-2 text-slate-400 active:text-[#ff7b9c] bg-white/5 rounded-lg border border-white/5"
                          >
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {uniqueTimelineRecords.length > visibleCount && (
                <div className="p-8 border-t border-white/5 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="px-8 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Load More Sessions
                  </button>
                </div>
              )}
            </div>
          ) : records.length === 0 ? (
            <div className="p-8 sm:p-12 text-center space-y-6 premium-glass rounded-[3rem] border border-white/5 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                  <History size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white italic">
                    Intelligence Archives Empty
                  </h3>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
                    You haven't completed any full 10-question interview
                    simulations yet. Finish a session to activate performance
                    analytics and track your technical trajectory.
                  </p>
                </div>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-8 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cyan-500/20 transition-all"
                >
                  Start First Simulation
                </button>
              </div>
            </div>
          ) : (
            <div className="p-20 text-center space-y-3">
              <div className="text-white font-bold italic">
                No interview sessions matched your search.
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Try searching for a specific role, technical concept, or
                interview track.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Premium Confirmation Modal Overlay */}
      <AnimatePresence>
        {sessionToDelete && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setSessionToDelete(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md premium-glass rounded-[2.5rem] border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Trash2 size={120} className="text-[#ff7b9c]" />
              </div>

              <div className="relative z-10 text-center space-y-8">
                <div className="mx-auto w-20 h-20 rounded-[2rem] bg-[#16090d] border border-[#4b1d2b] flex items-center justify-center text-[#ff7b9c] shadow-[0_0_30px_rgba(255,123,156,0.1)]">
                  <AlertTriangle size={36} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-white italic tracking-tight">
                    Delete this interview session?
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    This action permanently removes the archived intelligence
                    report. This cannot be undone.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    disabled={isDeleting}
                    onClick={() => setSessionToDelete(null)}
                    className="flex-1 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={handleDelete}
                    className="flex-1 px-8 py-4 rounded-2xl bg-[#16090d] border border-[#4b1d2b] text-[#ff7b9c] text-sm font-black uppercase tracking-widest hover:bg-[#1d0c12] hover:border-[#7a2942] hover:shadow-[0_0_30px_rgba(255,123,156,0.15)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <div className="h-4 w-4 border-2 border-[#ff7b9c]/30 border-t-[#ff7b9c] animate-spin rounded-full" />
                    ) : (
                      <>
                        <Trash2 size={16} />
                        Delete Session
                      </>
                    )}
                  </button>
                </div>
              </div>

              <button
                disabled={isDeleting}
                onClick={() => setSessionToDelete(null)}
                aria-label="Close modal"
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryIntelligence;
