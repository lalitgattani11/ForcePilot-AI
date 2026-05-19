import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  RotateCcw,
  Brain,
  Target,
  Trophy,
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

interface ResultsScreenProps {
  answers?: Answer[];
  role?: Role;
  onReset: () => void;
  isHistory?: boolean;
  date?: string;
  transcript?: string;
}

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
  completenessScore: number;
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

    // 1. Transcript restoration for legacy data
    if (
      (base.length === 0 || (!base[0]?.questionText && !(base[0] as any)?.question)) &&
      transcript && transcript.trim()
    ) {
      try {
        const segments = transcript.split(/\n\n+/);
        base = segments
          .filter(s => s.startsWith("Q"))
          .map((s, i) => {
            const lines = s.split("\n");
            return {
              questionId: `restored-${i}`,
              questionText: lines[0]?.replace(/^Q\d+:\s*/, "").trim() || "Question",
              userAnswer: lines[1]?.replace(/^A:\s*/, "").trim() || "No answer recorded.",
              timeTaken: 0,
            };
          });
      } catch (e) { console.error("Transcript recovery failed", e); }
    }

    return base.map((item, index) => {
      const qText = item.questionText || (item as any).question || "Technical Concept";
      const uAnswer = item.userAnswer || (item as any).answer || "";
      const evalData = item.evaluation || ({} as EvaluationResult);
      const historical = (item as any).historical_evaluation || ({} as any);

      // PRODUCTION-GRADE EVALUATION TRUST
      // Absolute trust in the backend scoring engine
      const rawScore = evalData.score != null ? Number(evalData.score) : 50.0;
      
      // LOGGING FOR VARIANCE DEBUGGING
      console.log(`[SCORE_DEBUG] Q: ${index + 1} | AI_Raw: ${evalData.score} | Display: ${rawScore}`);

      const finalTech = evalData.technicalScore != null ? Number(evalData.technicalScore) : rawScore;
      const finalComm = evalData.communicationScore != null ? Number(evalData.communicationScore) : rawScore;
      const finalReason = evalData.roleSpecificScore != null ? Number(evalData.roleSpecificScore) : rawScore;
      const finalConcept = evalData.conceptCoverageScore != null ? Number(evalData.conceptCoverageScore) : rawScore;
      
      const finalScore = rawScore;

      return {
        ...item,
        displayQuestion: String(qText),
        displayAnswer: String(uAnswer),
        displayIdeal: String(evalData.idealAnswer || "Reference technical standards for this role."),
        displayScore: finalScore,
        displayFeedback: String(evalData.feedback || historical.feedback || "Technical session archived."),
        displayTopic: String(evalData.topic || historical.topic || "Technical Assessment"),
        displayStrengths: Array.isArray(evalData.strengths) && evalData.strengths.length > 0
          ? evalData.strengths
          : ["Technical attempt recorded."],
        displayWeaknesses: Array.isArray(evalData.weaknesses) && evalData.weaknesses.length > 0
          ? evalData.weaknesses
          : ["Analyze gaps for specific concept mastery."],
        displayGuidance: String(evalData.improvementGuidance || "Continue specialized technical practice."),
        displayExpectation: String(evalData.recruiterExpectation || "Recruiter expects technically structured reasoning."),
        displayComms: String(evalData.communicationFeedback || "Professional technical communication recorded."),
        displayConfidence: String(evalData.confidenceAnalysis || "Stable conviction detected."),
        techScore: finalTech,
        commScore: finalComm,
        reasonScore: finalReason,
        completenessScore: finalConcept,
      };
    });
  }, [answers, transcript, role]);

  const metrics = useMemo(() => {
    if (normalizedAnswers.length === 0) return null;

    let totalTechnical = 0;
    let totalCommunication = 0;
    let totalReasoning = 0;
    let totalCompleteness = 0;
    let validAnswersCount = 0;

    normalizedAnswers.forEach((ans) => {
      if (ans.displayScore > 0) {
        totalTechnical += ans.techScore;
        totalCommunication += ans.commScore;
        totalReasoning += ans.reasonScore;
        totalCompleteness += ans.completenessScore;
        validAnswersCount++;
      }
    });

    const count = validAnswersCount > 0 ? validAnswersCount : 1;
    
    const avgTech = totalTechnical / count;
    const avgComm = totalCommunication / count;
    const avgReason = totalReasoning / count;
    const avgCompleteness = totalCompleteness / count;

    // DIRECT SCORE AVERAGING (PRESERVING VARIANCE)
    const allScores = normalizedAnswers.map(ans => Number(ans.displayScore || 0));
    const rawSessionAvg = allScores.reduce((a, b) => a + b, 0) / Math.max(1, allScores.length);
    
    // Pass the raw percentage average directly without scaling or artificial clamping
    const finalScore = Math.round(rawSessionAvg);

    let verdict;
    if (validAnswersCount === 0) {
      verdict = "Insufficient evidence for a technical verdict.";
    } else {
      verdict = finalScore >= 85 
        ? `Exceptional technical mastery. Candidate demonstrates senior-level understanding of ${role} architecture.`
        : finalScore >= 70
        ? `Strong professional competency. Good technical logic in ${role} concepts.`
        : finalScore >= 50
        ? `Moderate technical proficiency. Core foundations in ${role} are present.`
        : `Technical baseline not met. Significant gaps in core ${role} concepts.`;
    }

    return {
      avgScore: finalScore,
      technicalScore: Math.round(avgTech),
      communicationScore: Math.round(avgComm),
      roleSpecificScore: Math.round(avgReason),
      completenessScore: Math.round(avgCompleteness),
      consistencyScore: 0, // Not used for final score calculation anymore to preserve variance
      readiness: finalScore >= 85 ? "Executive Ready" : finalScore >= 70 ? "Strong Candidate" : finalScore >= 50 ? "Moderate" : "Needs Improvement",
      verdict,
    };
  }, [normalizedAnswers, role]);

  useEffect(() => {
    const saveInterview = async () => {
      if (isHistory || !metrics || normalizedAnswers.length < 10) return;

      try {
        const transcriptText = normalizedAnswers.map((a, i) => `Q${i + 1}: ${a.displayQuestion}\nA: ${a.displayAnswer}`).join("\n\n");
        const feedbackText = normalizedAnswers.map((a, i) => `Q${i + 1}: ${a.displayFeedback}`).join("\n\n");

        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id) return;

        const safePayload = {
          user_id: String(user.id),
          role: (!role || String(role).toLowerCase() === "unknown") ? "Professional Readiness" : String(role),
          difficulty: "Technical Assessment",
          score: Number(metrics.avgScore),
          feedback: String(feedbackText || ""),
          transcript: String(transcriptText || ""),
          duration: Number(normalizedAnswers.length || 0),
          communication_score: Number(metrics.communicationScore),
          technical_score: Number(metrics.technicalScore),
          confidence_score: Number(metrics.avgScore),
          coach_advice: String(normalizedAnswers[0]?.displayFeedback || ""),
          ai_verdict: String(metrics.readiness),
          interview_completed: true,
          total_questions: 10,
          completed_questions: normalizedAnswers.length,
          behavior_analytics: {
            completeness: metrics.completenessScore,
            consistency: metrics.consistencyScore,
            technical: metrics.technicalScore,
            communication: metrics.communicationScore,
          },
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
            technicalScore: Number(a.techScore),
            communicationScore: Number(a.commScore),
            roleSpecificScore: Number(a.reasonScore),
          })),
        };

        const { error } = await supabase.from("interview_history").insert([safePayload]);
        if (error) console.error("[SAVE_ERROR]", error);
      } catch (err) { console.error("[SAVE_EXCEPTION]", err); }
    };
    saveInterview();
  }, [metrics, role, normalizedAnswers, isHistory]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] sm:min-h-screen text-white gap-8">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
          <Brain size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 animate-pulse" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-black tracking-tighter uppercase italic">Analyzing Performance</div>
          <div className="text-xs font-bold text-slate-400 tracking-[0.3em] uppercase">Intelligence Layer Initializing</div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return <div className="text-center text-white py-20 italic opacity-50">Intelligence report unavailable.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* 1. CINEMATIC SESSION HEADER */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden premium-glass rounded-[2.5rem] border border-white/10 p-8 sm:p-12">
        <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-5 sm:opacity-10 pointer-events-none">
          <Sparkles size={120} className="text-emerald-500" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-12 sm:gap-8">
          <div className="space-y-6 sm:space-y-4 w-full sm:w-auto">
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400">Session Intelligence</div>
              {date && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar size={12} />
                  {new Date(date).toLocaleDateString()}
                </div>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white italic tracking-tighter leading-tight break-words">{role}</h1>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10 shrink-0"><Target size={20} /></div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Readiness</div>
                  <div className="text-sm font-black text-white">{metrics.readiness}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10 shrink-0"><ShieldCheck size={20} /></div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Evaluation Index</div>
                  <div className="text-sm font-black text-white">{metrics.avgScore}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full sm:w-auto flex justify-center sm:justify-end mt-4 sm:mt-0 py-6 sm:py-0">
            <div className="text-[80px] sm:text-[160px] font-black text-white/[0.03] sm:text-white/5 leading-none absolute -top-6 sm:-top-12 -right-0 sm:-right-8 select-none italic pointer-events-none">{metrics.avgScore}</div>
            <div className="flex flex-col items-center sm:items-end relative">
              <div className="text-7xl sm:text-8xl font-black text-emerald-500 italic leading-none drop-shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                {metrics.avgScore}<span className="text-3xl sm:text-4xl">%</span>
              </div>
              <div className="text-[10px] font-black text-emerald-500/70 uppercase tracking-[0.4em] mt-3 sm:mt-2 sm:mr-2">OVERALL READINESS</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. INTELLIGENCE INSIGHTS SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 premium-glass rounded-3xl border border-white/5 p-8 space-y-8">
          <div className="flex items-center gap-3 border-b border-white/5 pb-6">
            <BarChart3 className="text-cyan-400" size={20} />
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Dimension Analytics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Technical depth", score: metrics.technicalScore, color: "emerald" },
              { label: "Communication", score: metrics.communicationScore, color: "cyan" },
              { label: "Problem Solving", score: metrics.roleSpecificScore, color: "violet" },
            ].map((dim, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{dim.label}</span>
                  <span className={`text-lg font-black ${dim.color === "emerald" ? "text-emerald-400" : dim.color === "cyan" ? "text-cyan-400" : "text-violet-400"}`}>
                    {Math.round(dim.score || 0)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.round(dim.score || 0)}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }} className={`h-full rounded-full ${dim.color === "emerald" ? "bg-emerald-500" : dim.color === "cyan" ? "bg-cyan-500" : "bg-violet-500"}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="premium-glass rounded-3xl border border-white/5 p-8 flex flex-col justify-center gap-4 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Trophy className="mx-auto text-emerald-400 mb-2" size={32} />
          <h2 className="text-lg font-black text-white italic">Technical Verdict</h2>
          <p className="text-sm text-slate-400 leading-relaxed italic whitespace-pre-line">"{metrics.verdict}"</p>
        </motion.div>
      </div>

      {/* 3. QUESTION REVIEW TIMELINE */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-emerald-500" size={24} />
          <h2 className="text-2xl font-black text-white italic">Intelligence Breakdown</h2>
        </div>

        <div className="space-y-6">
          {normalizedAnswers.map((answer, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={`premium-glass rounded-[2rem] border transition-all duration-500 ${isExpanded ? "border-emerald-500/30 ring-1 ring-emerald-500/10" : "border-white/5 hover:border-white/10"}`}>
                <button onClick={() => setExpandedIndex(isExpanded ? null : index)} className="w-full text-left p-5 sm:p-8 flex items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-base sm:text-lg shrink-0 ${answer.displayScore >= 80 ? "bg-emerald-500/10 text-emerald-400" : answer.displayScore >= 60 ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-500/10 text-slate-400"}`}>{index + 1}</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span>{answer.displayTopic}</span>
                        <div className="hidden xs:block w-1 h-1 rounded-full bg-slate-700" />
                        <span>Score: {Math.round(answer.displayScore)}%</span>
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight break-words line-clamp-2 sm:line-clamp-1">{answer.displayQuestion}</h3>
                    </div>
                  </div>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/5 flex items-center justify-center text-slate-400 shrink-0 transition-all ${isExpanded ? "rotate-180 bg-white/5 text-white" : ""}`}><ChevronDown size={18} /></div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-8 pb-8 pt-2 space-y-10 border-t border-white/5">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><Sparkles size={12} className="text-cyan-400" />Technical Question</div>
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-slate-200 text-sm leading-relaxed italic">"{answer.displayQuestion}"</div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><Users size={12} className="text-emerald-400" />Your Response</div>
                            <div className={`p-6 rounded-2xl border text-sm leading-relaxed ${answer.displayAnswer.length < 20 ? "italic text-slate-400" : "text-white"} ${answer.displayScore >= 70 ? "bg-emerald-500/5 border-emerald-500/10" : "bg-white/[0.03] border-white/5"}`}>{answer.displayAnswer}</div>
                          </div>
                        </div>

                        {answer.displayIdeal && (
                          <div className="space-y-4 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl p-5 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <Trophy className="text-emerald-400 shrink-0" size={16} />
                                <h4 className="text-[11px] sm:text-sm font-black text-white uppercase tracking-widest italic">Technical Expectations</h4>
                              </div>
                            </div>
                            <div className="text-sm text-slate-300 leading-relaxed font-medium whitespace-pre-line">{answer.displayIdeal}</div>
                            {answer.displayExpectation && (
                              <div className="pt-4 mt-4 border-t border-emerald-500/10">
                                <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest block mb-2">Technical Rationale</span>
                                <p className="text-xs text-slate-400 leading-relaxed">{answer.displayExpectation}</p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="premium-glass rounded-2xl border border-white/5 p-6 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest"><CheckCircle2 size={14} /> Key Strengths</div>
                            <div className="space-y-2">
                              {answer.displayStrengths.map((s, si) => (
                                <div key={si} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                                  <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />{s}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="premium-glass rounded-2xl border border-white/5 p-6 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-rose-400 uppercase tracking-widest"><XCircle size={14} /> Gaps</div>
                            <div className="space-y-2">
                              {answer.displayWeaknesses.map((w, wi) => (
                                <div key={wi} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                                  <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 shrink-0" />{w}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                          {answer.displayGuidance && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest"><Lightbulb size={12} /> Improvement</div>
                              <p className="text-xs text-slate-400 leading-relaxed">{answer.displayGuidance}</p>
                            </div>
                          )}
                          {answer.displayComms && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-[10px] font-black text-violet-400 uppercase tracking-widest"><MessageSquare size={12} /> Delivery</div>
                              <p className="text-xs text-slate-400 leading-relaxed">{answer.displayComms}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex justify-center sm:justify-between items-center gap-6">
        <div className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">End of Session Intelligence Review</div>
        <button onClick={onReset} className="cta-button group flex items-center gap-4 px-10 py-5">
          <RotateCcw size={16} className="group-hover:rotate-[-45deg] transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">{isHistory ? "Return to Archives" : "Restart Interview"}</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
