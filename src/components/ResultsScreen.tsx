import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  RotateCcw,
  Brain,
  Target,
  Trophy,
  Zap,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Lightbulb,
  MessageSquare,
  BarChart3,
  Calendar,
  ChevronDown,
  Sparkles,
  Users,
} from "lucide-react";
import type { Answer, Role, EvaluationResult } from "../types";
import { ALL_QUESTIONS } from "../mockData";

interface ResultsScreenProps {
  answers?: Answer[];
  role?: Role;
  onReset: () => void;
  isHistory?: boolean;
  date?: string;
  transcript?: string;
}

// Internal interface for normalized display data
interface NormalizedAnswer extends Answer {
  displayQuestion: string;
  displayAnswer: string;
  displayIdeal: string;
  displayScore: number;
  displayFeedback: string;
  displayTopic: string;
  displayStrengths: string[];
  displayWeaknesses: string[];
  displayGuidance: string;
  displayExpectation: string;
  displayComms: string;
  displayConfidence: string;
  techScore: number;
  commScore: number;
  reasonScore: number;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  answers: propAnswers,
  role: propRole,
  onReset,
  isHistory: propIsHistory = false,
  date: propdate = "",
  transcript: propTranscript = "",
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sessionData, setSessionData] = useState<{
    answers: Answer[];
    role: Role;
    date: string;
    transcript: string;
    isHistory: boolean;
  } | null>(
    propAnswers
      ? {
          answers: propAnswers,
          role: propRole || "Salesforce Admin",
          date: propdate,
          transcript: propTranscript,
          isHistory: propIsHistory,
        }
      : null,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchSession = async () => {
      if (!id) {
        // Handle direct /results (current session)
        if (propAnswers) {
          setIsLoading(true);
          const timer = setTimeout(() => setIsLoading(false), 2000);
          return () => clearTimeout(timer);
        } else {
          navigate("/");
          return;
        }
      }

      try {
        // Extract UUID from slug if present (format: slug--uuid)
        const sessionId = id.includes("--") ? id.split("--").pop() : id;

        const { data, error } = await supabase
          .from("interview_history")
          .select("*")
          .eq("id", sessionId)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Session not found");

        setSessionData({
          answers: data.full_results || [],
          role: data.role as Role,
          date: data.created_at,
          transcript: data.transcript,
          isHistory: true,
        });
      } catch (err) {
        console.error("Failed to fetch session:", err);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [id, propAnswers, navigate]);

  const { answers, role, date, transcript, isHistory } = sessionData || {
    answers: [],
    role: "Salesforce Admin" as Role,
    date: "",
    transcript: "",
    isHistory: false,
  };

  // --- DATA RESTORATION & NORMALIZATION LAYER (PRODUCTION-GRADE) ---
  const normalizedAnswers: NormalizedAnswer[] = useMemo(() => {
    let base = Array.isArray(answers) ? [...answers] : [];

    // 1. Transcript restoration for legacy/malformed data (defensive parsing)
    if (
      (base.length === 0 ||
        (!base[0]?.questionText &&
          !(base[0] as unknown as Record<string, unknown>)?.question)) &&
      transcript &&
      transcript.trim()
    ) {
      try {
        const blocks = transcript.split(/\n\n+/);
        const restored = blocks
          .map((block, idx) => {
            const lines = block.split("\n").map((l) => l.trim());
            let q = "";
            let a = "";

            for (const line of lines) {
              if (line.startsWith("Q") && line.includes(":"))
                q = line.split(":").slice(1).join(":").trim();
              else if (line.startsWith("Interviewer:"))
                q = line.replace("Interviewer:", "").trim();
              else if (line.startsWith("A:") || line.startsWith("Ans:"))
                a = line.split(":").slice(1).join(":").trim();
              else if (line.startsWith("Candidate:"))
                a = line.replace("Candidate:", "").trim();
            }

            if (q || a) {
              return {
                questionId: `restored-${idx}`,
                questionText: q || "Question",
                userAnswer: a || "",
                timeTaken: 0,
                evaluation: {},
              } as Answer;
            }
            return null;
          })
          .filter((item): item is Answer => item !== null);

        if (restored.length > 0) base = restored;
      } catch (err) {
        console.warn("[RESTORE] Failed to parse transcript safely", err);
      }
    }

    // 2. Map and Enrich Data (Deterministic, Grounded Derivation)
    return base.map((item) => {
      const historical = item as unknown as Record<string, unknown>;
      const evalData: EvaluationResult =
        item.evaluation || (historical as unknown as EvaluationResult) || {};

      const qText = item.questionText || historical.question || "Question";
      const uAnswerRaw = item.userAnswer || historical.answer || "";
      const uAnswer = String(uAnswerRaw || "").trim()
        ? uAnswerRaw
        : "No response provided.";

      // Look up ideal answer for baseline comparison
      let ideal = evalData.idealAnswer || "";
      if (!ideal && qText !== "Question") {
        const match = ALL_QUESTIONS.find(
          (q) =>
            String(q.text || "")
              .toLowerCase()
              .trim() ===
              String(qText || "")
                .toLowerCase()
                .trim() ||
            String(qText || "")
              .toLowerCase()
              .includes(
                String(q.text || "")
                  .toLowerCase()
                  .substring(0, 30),
              ),
        );
        if (match) ideal = match.idealAnswer;
      }
      if (!ideal && qText !== "Question") {
        ideal = `A professional ${role} response should thoroughly explain the technical architecture, best practices, and real-world implementation nuances of this concept.`;
      }

      // --- ENTERPRISE-GRADE DERIVATION ENGINE ---

      const cleanAnswer = String(uAnswer || "")
        .toLowerCase()
        .replace(/[^\w\s]/gi, "");

      const cleanIdeal = String(ideal || "")
        .toLowerCase()
        .replace(/[^\w\s]/gi, "");

      const answerTokens = cleanAnswer
        .split(/\s+/)
        .filter((w: string) => w.length > 0);

      const wordCount = answerTokens.length;

      const insufficientData =
        wordCount < 10 || uAnswer === "No response provided.";

      // 1. Technical Depth
      const sfTerms = new Set([
        "object",
        "record",
        "trigger",
        "flow",
        "apex",
        "soql",
        "sosl",
        "lwc",
        "aura",
        "integration",
        "api",
        "security",
        "profile",
        "permission",
        "sharing",
        "role",
        "hierarchy",
        "architecture",
        "limit",
        "governor",
        "async",
        "batch",
        "future",
        "queueable",
        "test",
        "deployment",
        "metadata",
        "sandbox",
      ]);

      let sfTermHits = 0;

      answerTokens.forEach((w: string) => {
        if (sfTerms.has(w)) sfTermHits++;
      });

      const idealWords = new Set(cleanIdeal.match(/\b[a-z]{5,}\b/g) || []);

      const answerWords = new Set(cleanAnswer.match(/\b[a-z]{5,}\b/g) || []);

      let techMatches = 0;

      idealWords.forEach((w: string) => {
        if (answerWords.has(w)) techMatches++;
      });

      const techBaseScore =
        idealWords.size > 0 ? techMatches / Math.min(12, idealWords.size) : 0;

      const techDomainBonus = Math.min(0.3, sfTermHits * 0.05);

      const techCoverage = Math.min(1, techBaseScore + techDomainBonus);

      // 2. Communication Clarity
      const fillers = (
        cleanAnswer.match(
          /\b(um|uh|like|you know|basically|just|actually|sort of|kind of|i guess|maybe|probably)\b/g,
        ) || []
      ).length;

      const fillerPenalty =
        wordCount > 0 ? Math.min(0.4, (fillers / wordCount) * 2.5) : 0;

      const sentences = String(uAnswer || "")
        .split(/[.!?]+/)
        .filter((s: string) => s.trim().length > 0).length;

      const avgWordsPerSentence = sentences > 0 ? wordCount / sentences : 0;

      const sentenceStructurePenalty =
        avgWordsPerSentence > 35 || avgWordsPerSentence < 5 ? 0.15 : 0;

      const lengthCompleteness = Math.min(1, wordCount / 50);

      const commScoreDerivation = Math.max(
        0.1,
        lengthCompleteness - fillerPenalty - sentenceStructurePenalty,
      );

      // 3. Problem Solving & Reasoning
      const reasoningConnectors = (
        cleanAnswer.match(
          /\b(because|therefore|however|example|scenario|instance|if|then|leads|results|mean|why|how|approach|solution|first|second|finally|consequently|although)\b/g,
        ) || []
      ).length;

      const reasoningDensity =
        wordCount > 0 ? reasoningConnectors / wordCount : 0;

      const reasonScoreDerivation =
        Math.min(1, reasoningDensity / 0.08) * lengthCompleteness;

      // Safe Fallback Logic
      // Only override if the backend provided obvious placeholder data (0, 2.5, 5, null)
      const isPlaceholder = (val: unknown) =>
        val == null ||
        Number(val) === 5 ||
        Number(val) === 0 ||
        Number(val) === 2.5;

      let finalTech, finalComm, finalReason, finalScore;

      if (insufficientData) {
        finalTech = 0;
        finalComm = 0;
        finalReason = 0;
        finalScore = 0;
      } else {
        // Map 0-1 range to 1-10 enterprise scale, avoiding artificial rounding
        const derivedTech = 1 + techCoverage * 9;
        const derivedComm = 1 + commScoreDerivation * 9;
        const derivedReason = 1 + reasonScoreDerivation * 9;

        finalTech = !isPlaceholder(evalData.technicalScore)
          ? Number(evalData.technicalScore)
          : derivedTech;
        finalComm = !isPlaceholder(evalData.communicationScore)
          ? Number(evalData.communicationScore)
          : derivedComm;
        finalReason = !isPlaceholder(evalData.roleSpecificScore)
          ? Number(evalData.roleSpecificScore)
          : derivedReason;

        const derivedTotal =
          finalTech * 0.45 + finalComm * 0.25 + finalReason * 0.3;
        finalScore = !isPlaceholder(evalData.score)
          ? Number(evalData.score)
          : derivedTotal;
      }

      // Generate Grounded Strengths and Weaknesses
      const dynamicStrengths = [];
      const dynamicWeaknesses = [];

      if (insufficientData) {
        dynamicWeaknesses.push(
          "The answer was too short to really judge your technical knowledge or reasoning.",
        );
      } else {
        if (techCoverage > 0.65)
          dynamicStrengths.push(
            "Good use of technical terms and a solid grasp of how the platform works.",
          );
        else if (techCoverage > 0.4)
          dynamicStrengths.push(
            "You covered the basics, but could have gone into more detail.",
          );
        else
          dynamicWeaknesses.push(
            "You missed some key technical terms and concepts for this topic.",
          );

        if (sfTermHits >= 3)
          dynamicStrengths.push(
            "You did a great job using Salesforce-specific language in your explanation.",
          );

        if (fillerPenalty > 0.15)
          dynamicWeaknesses.push(
            "Too many filler words made the delivery feel a bit less professional.",
          );
        else if (commScoreDerivation > 0.7)
          dynamicStrengths.push(
            "Your explanation was clear, direct, and easy to follow.",
          );

        if (reasonScoreDerivation > 0.6)
          dynamicStrengths.push(
            "Nice job walking through the logic and cause-and-effect in your answer.",
          );
        else if (reasonScoreDerivation < 0.3 && lengthCompleteness > 0.5)
          dynamicWeaknesses.push(
            "The explanation felt a bit flat—try adding more 'why' or a specific example.",
          );

        if (sentenceStructurePenalty > 0)
          dynamicWeaknesses.push(
            "Some of the sentences were a bit hard to follow, which made the explanation less clear.",
          );
      }

      if (dynamicStrengths.length === 0 && !insufficientData)
        dynamicStrengths.push("You tried to answer the question directly.");
      if (dynamicWeaknesses.length === 0 && !insufficientData)
        dynamicWeaknesses.push(
          "No major issues with how you structured your answer.",
        );

      return {
        ...item,
        displayQuestion: String(qText),
        displayAnswer: String(uAnswer),
        displayIdeal: String(ideal),
        displayScore: finalScore,
        displayFeedback: insufficientData
          ? "The response was too short to give proper feedback."
          : String(
              evalData.feedback ??
                historical.feedback ??
                "Analyzed based on your technical accuracy and how you structured the explanation.",
            ),
        displayTopic: String(
          evalData.topic || historical.topic || "Technical Assessment",
        ),
        displayStrengths:
          Array.isArray(evalData.strengths) && evalData.strengths.length > 0
            ? evalData.strengths
            : dynamicStrengths,
        displayWeaknesses:
          Array.isArray(evalData.weaknesses) && evalData.weaknesses.length > 0
            ? evalData.weaknesses
            : dynamicWeaknesses,
        displayGuidance: insufficientData
          ? "Try to give more detailed answers next time so we can provide better coaching."
          : String(
              evalData.improvementGuidance ||
                (finalScore < 6
                  ? "To improve, define the concept first, explain why it's used, and give a real Salesforce example."
                  : "Great depth—keep providing this level of detail in your responses."),
            ),
        displayExpectation: String(
          evalData.recruiterExpectation ||
            "I'm looking for clear technical definitions paired with real-world examples.",
        ),
        displayComms: insufficientData
          ? "N/A"
          : String(
              evalData.communicationFeedback ||
                (fillerPenalty > 0.15
                  ? "Try to avoid using too many 'um's or 'like's—pausing for a second is usually better."
                  : "Clear and professional delivery."),
            ),
        displayConfidence: insufficientData
          ? "N/A"
          : String(
              evalData.confidenceAnalysis ||
                (finalScore > 7
                  ? "You sounded confident and really knew the topic."
                  : "Your answer felt a bit hesitant. Working on concise definitions will help."),
            ),
        techScore: finalTech,
        commScore: finalComm,
        reasonScore: finalReason,
      };
    });
  }, [answers, transcript, role]);

  const metrics = useMemo(() => {
    if (normalizedAnswers.length === 0) return null;

    let totalScore = 0;
    let technicalScore = 0;
    let communicationScore = 0;
    let roleSpecificScore = 0;
    let validAnswersCount = 0;

    normalizedAnswers.forEach((ans) => {
      // Exclude skipped or empty answers from dragging down the average unfairly if they are anomalies,
      // but if the entire interview is short, the score will reflect it.
      if (ans.displayScore > 0) {
        totalScore += ans.displayScore;
        technicalScore += ans.techScore;
        communicationScore += ans.commScore;
        roleSpecificScore += ans.reasonScore;
        validAnswersCount++;
      }
    });

    const count = validAnswersCount > 0 ? validAnswersCount : 1; // Prevent division by zero
    const rawAvgScore = totalScore / count;
    const rawAvgTech = technicalScore / count;
    const rawAvgComm = communicationScore / count;
    const rawAvgReason = roleSpecificScore / count;

    // Apply normalization to keep UX motivating (realistic SaaS scale)
    const normalize = (val: number) => {
      if (val <= 0) return 0;
      // Formula: 35% baseline + (raw score * 6.5 multiplier) 
      // This maps 0-10 to 35-100 (clamped at 95 for realism)
      const mapped = 35 + val * 6.5;
      return Math.min(95, Math.round(mapped));
    };

    const finalAvg = normalize(rawAvgScore);
    const finalTech = normalize(rawAvgTech);
    const finalComm = normalize(rawAvgComm);
    const finalReason = normalize(rawAvgReason);

    // Grounded recruiter-grade verdict generation
    let verdict;
    if (validAnswersCount === 0) {
      verdict =
        "Not enough data for a full verdict yet. Try giving more detailed answers in your next session.";
    } else if (finalAvg >= 82) {
      verdict = `Excellent work. You showed a strong technical grasp of ${role} concepts and structured your answers well. You're ready for advanced roles and client-facing work.`;
    } else if (finalAvg >= 65) {
      verdict = `Good performance overall. Your communication was clear, but some technical explanations needed more depth or real-world examples to really stand out at a senior level.`;
    } else if (finalAvg >= 45) {
      verdict = `You have a decent start on the basics, but your technical answers were often too brief. Focus on explaining the 'how' and 'why' behind Salesforce features in more detail.`;
    } else {
      verdict = `Your answers were incomplete or missing key technical details. I'd recommend spending more time on the fundamentals and practicing how to explain them clearly.`;
    }

    return {
      avgScore: finalAvg,
      technicalScore: finalTech,
      communicationScore: finalComm,
      roleSpecificScore: finalReason,
      readiness:
        validAnswersCount === 0
          ? "Incomplete Data"
          : finalAvg >= 82
            ? "Executive Ready"
            : finalAvg >= 65
              ? "Strong Candidate"
              : finalAvg >= 45
                ? "Developing"
                : "Needs Work",
      verdict,
    };
  }, [normalizedAnswers, role]);

  useEffect(() => {
    const saveInterview = async () => {
      if (isHistory || !metrics || normalizedAnswers.length === 0) return;

      try {
        const transcriptText = normalizedAnswers
          .map(
            (a, i) => `Q${i + 1}: ${a.displayQuestion}\nA: ${a.displayAnswer}`,
          )
          .join("\n\n");

        const feedbackText = normalizedAnswers
          .map((a, i) => `Q${i + 1}: ${a.displayFeedback}`)
          .join("\n\n");

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user?.id) return;

        const safePayload = {
          user_id: String(user.id),
          role: (!role || String(role).toLowerCase() === "unknown") ? "Professional Readiness" : String(role),
          difficulty: (!normalizedAnswers[0]?.displayTopic || String(normalizedAnswers[0].displayTopic).toLowerCase() === "unknown") 
            ? "Initial Assessment" 
            : String(normalizedAnswers[0].displayTopic),
          score: Number(metrics.avgScore),
          feedback: String(feedbackText || ""),
          transcript: String(transcriptText || ""),
          duration: Number(normalizedAnswers.length || 0),
          communication_score: Number(metrics.communicationScore),
          technical_score: Number(metrics.technicalScore),
          confidence_score: Number(metrics.avgScore),
          coach_advice: String(normalizedAnswers[0]?.displayFeedback || ""),
          ai_verdict: String(metrics.readiness),
          full_results: normalizedAnswers.map((a) => ({
            question: String(a.displayQuestion),
            answer: String(a.displayAnswer),
            score: Number(a.displayScore),
            feedback: String(a.displayFeedback),
            topic: String(a.displayTopic),
            strengths: a.displayStrengths,
            weaknesses: a.displayWeaknesses,
            idealAnswer: String(a.displayIdeal),
            recruiterExpectation: String(a.displayExpectation),
            improvementGuidance: String(a.displayGuidance),
            communicationFeedback: String(a.displayComms),
            confidenceAnalysis: String(a.displayConfidence),
            technicalScore: Number(a.techScore),
            communicationScore: Number(a.commScore),
            roleSpecificScore: Number(a.reasonScore),
          })),
        };

        const { error } = await supabase
          .from("interview_history")
          .insert([safePayload]);
        if (error) console.error("[SAVE_ERROR]", error);
        else console.log("[SAVE] Session intelligence archived.");
      } catch (err) {
        console.error("[SAVE_EXCEPTION]", err);
      }
    };

    saveInterview();
  }, [metrics, role, normalizedAnswers, isHistory]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white gap-8">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
          <Brain
            size={40}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 animate-pulse"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-black tracking-tighter uppercase italic">
            Analyzing Performance
          </div>
          <div className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase">
            Intelligence Layer Initializing
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center text-white py-20 italic opacity-50">
        Intelligence report unavailable for this session.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* 1. CINEMATIC SESSION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden premium-glass rounded-[2.5rem] border border-white/10 p-8 sm:p-12"
      >
        {/* Decorative Sparkle - Refined for mobile balance */}
        <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 sm:opacity-10 pointer-events-none">
          <Sparkles size={80} className="text-emerald-500 block sm:hidden" />
          <Sparkles size={120} className="text-emerald-500 hidden sm:block" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-12 sm:gap-8">
          <div className="space-y-6 sm:space-y-4 w-full sm:w-auto">
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Session Intelligence
              </div>
              {date && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Calendar size={12} />
                  {new Date(date).toLocaleDateString()}
                </div>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white italic tracking-tighter leading-tight break-words">
              {role}
            </h1>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                    Readiness
                  </div>
                  <div className="text-sm font-black text-white">
                    {metrics.readiness}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10 shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                    Efficiency
                  </div>
                  <div className="text-sm font-black text-white">
                    {metrics.avgScore}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full sm:w-auto flex justify-center sm:justify-end mt-4 sm:mt-0 py-6 sm:py-0">
            {/* Background decorative number - Repositioned and subtler on mobile */}
            <div className="text-[80px] sm:text-[160px] font-black text-white/[0.03] sm:text-white/5 leading-none absolute -top-6 sm:-top-12 -right-0 sm:-right-8 select-none italic pointer-events-none transition-all">
              {metrics.avgScore}
            </div>
            <div className="flex flex-col items-center sm:items-end relative">
              <div className="text-7xl sm:text-8xl font-black text-emerald-500 italic leading-none drop-shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                {metrics.avgScore}
                <span className="text-3xl sm:text-4xl">%</span>
              </div>
              <div className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.4em] mt-3 sm:mt-2 sm:mr-2">
                OVERALL READINESS
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. INTELLIGENCE INSIGHTS SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 premium-glass rounded-3xl border border-white/5 p-8 space-y-8"
        >
          <div className="flex items-center gap-3 border-b border-white/5 pb-6">
            <BarChart3 className="text-cyan-400" size={20} />
            <h3 className="text-sm font-black text-white uppercase tracking-widest">
              Dimension Analytics
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: "Technical depth",
                score: metrics.technicalScore,
                color: "emerald",
              },
              {
                label: "Communication",
                score: metrics.communicationScore,
                color: "cyan",
              },
              {
                label: "Problem Solving",
                score: metrics.roleSpecificScore,
                color: "violet",
              },
            ].map((dim, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {dim.label}
                  </span>
                  <span
                    className={`text-lg font-black ${dim.color === "emerald" ? "text-emerald-400" : dim.color === "cyan" ? "text-cyan-400" : "text-violet-400"}`}
                  >
                    {Math.round((dim.score || 0) * 10)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((dim.score || 0) * 10)}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className={`h-full rounded-full ${dim.color === "emerald" ? "bg-emerald-500" : dim.color === "cyan" ? "bg-cyan-500" : "bg-violet-500"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="premium-glass rounded-3xl border border-white/5 p-8 flex flex-col justify-center gap-4 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Trophy className="mx-auto text-emerald-400 mb-2" size={32} />
          <h3 className="text-lg font-black text-white italic">Verdict</h3>
          <p className="text-sm text-slate-400 leading-relaxed italic">
            "{metrics.verdict}"
          </p>
        </motion.div>
      </div>

      {/* 3. QUESTION REVIEW TIMELINE */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-emerald-500" size={24} />
          <h3 className="text-2xl font-black text-white italic">
            Intelligence Breakdown
          </h3>
        </div>

        <div className="space-y-6">
          {normalizedAnswers.map((answer, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`premium-glass rounded-[2rem] border transition-all duration-500 ${isExpanded ? "border-emerald-500/30 ring-1 ring-emerald-500/10" : "border-white/5 hover:border-white/10"}`}
              >
                {/* Header Strip */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full text-left p-5 sm:p-8 flex items-center justify-between gap-4 sm:gap-6"
                >
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-base sm:text-lg shrink-0 transition-colors ${answer.displayScore >= 8 ? "bg-emerald-500/10 text-emerald-400" : answer.displayScore >= 6 ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-500/10 text-slate-400"}`}
                    >
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="truncate max-w-[120px] sm:max-w-none">
                          {answer.displayTopic}
                        </span>
                        <div className="hidden xs:block w-1 h-1 rounded-full bg-slate-700" />
                        <span>
                          Score: {Math.round(answer.displayScore * 10)}%
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight break-words line-clamp-2 sm:line-clamp-1">
                        {answer.displayQuestion}
                      </h4>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/5 flex items-center justify-center text-slate-500 shrink-0 transition-all ${isExpanded ? "rotate-180 bg-white/5 text-white" : ""}`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-2 space-y-10 border-t border-white/5">
                        {/* Conversation Pair */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              <Sparkles size={12} className="text-cyan-400" />
                              Recruiter Question
                            </div>
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-slate-200 text-sm leading-relaxed italic">
                              "{answer.displayQuestion}"
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              <Users size={12} className="text-emerald-400" />
                              Your Response
                            </div>
                            <div
                              className={`p-6 rounded-2xl border text-sm leading-relaxed ${answer.displayAnswer.length < 20 ? "italic text-slate-500" : "text-white"} ${answer.displayScore >= 7 ? "bg-emerald-500/5 border-emerald-500/10" : "bg-white/[0.03] border-white/5"}`}
                            >
                              {answer.displayAnswer}
                            </div>
                          </div>
                        </div>

                        {/* Ideal Answer Section */}
                        {answer.displayIdeal && (
                          <div className="space-y-4 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl p-5 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <Trophy
                                  className="text-emerald-400 shrink-0"
                                  size={16}
                                />
                                <h5 className="text-[11px] sm:text-sm font-black text-white uppercase tracking-widest italic leading-tight">
                                  Recruiter's Ideal Response
                                </h5>
                              </div>
                              <div className="self-start sm:self-auto px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/20 text-[8px] sm:text-[9px] font-black text-emerald-400 uppercase tracking-widest border border-emerald-500/10">
                                Best Practice
                              </div>
                            </div>
                            <div className="text-sm text-slate-300 leading-relaxed font-medium">
                              {answer.displayIdeal}
                            </div>
                            {answer.displayExpectation && (
                              <div className="pt-4 mt-4 border-t border-emerald-500/10">
                                <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest block mb-2">
                                  Technical Rationale
                                </span>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  {answer.displayExpectation}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* AI Intelligence Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="premium-glass rounded-2xl border border-white/5 p-6 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                              <CheckCircle2 size={14} /> Key Strengths
                            </div>
                            <div className="space-y-2">
                              {answer.displayStrengths.length > 0 ? (
                                answer.displayStrengths.map((s, si) => (
                                  <div
                                    key={si}
                                    className="flex gap-2 text-xs text-slate-400 leading-relaxed"
                                  >
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                    {s}
                                  </div>
                                ))
                              ) : (
                                <div className="text-xs text-slate-600 italic">
                                  No significant strengths noted.
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="premium-glass rounded-2xl border border-white/5 p-6 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-rose-400 uppercase tracking-widest">
                              <XCircle size={14} /> Performance Gaps
                            </div>
                            <div className="space-y-2">
                              {answer.displayWeaknesses.length > 0 ? (
                                answer.displayWeaknesses.map((w, wi) => (
                                  <div
                                    key={wi}
                                    className="flex gap-2 text-xs text-slate-400 leading-relaxed"
                                  >
                                    <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                    {w}
                                  </div>
                                ))
                              ) : (
                                <div className="text-xs text-slate-600 italic">
                                  No major performance gaps detected.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Guidance & Coaching */}
                        {(answer.displayGuidance ||
                          answer.displayComms ||
                          answer.displayConfidence) && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            {answer.displayGuidance && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                                  <Lightbulb size={12} /> Improvement
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  {answer.displayGuidance}
                                </p>
                              </div>
                            )}
                            {answer.displayComms && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-violet-400 uppercase tracking-widest">
                                  <MessageSquare size={12} /> Delivery
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  {answer.displayComms}
                                </p>
                              </div>
                            )}
                            {answer.displayConfidence && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-amber-400 uppercase tracking-widest">
                                  <Zap size={12} /> Confidence
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  {answer.displayConfidence}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIONS */}
      <div className="pt-12 border-t border-white/5 flex justify-center sm:justify-between items-center gap-6">
        <div className="hidden sm:block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          End of Session Intelligence Review
        </div>
        <button
          onClick={onReset}
          className="cta-button group flex items-center gap-4 px-10 py-5"
        >
          <RotateCcw
            size={16}
            className="group-hover:rotate-[-45deg] transition-transform"
          />
          <span className="text-xs font-black uppercase tracking-widest">
            {isHistory ? "Return to Archives" : "Restart Interview"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
