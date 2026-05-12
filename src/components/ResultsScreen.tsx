import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Users
} from "lucide-react";
import type { Answer, Role, EvaluationResult } from "../types";
import { ALL_QUESTIONS } from "../mockData";

interface ResultsScreenProps {
  answers: Answer[];
  role: Role;
  onReset: () => void;
  isHistory?: boolean;
  sessionDate?: string;
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
  answers = [],
  role,
  onReset,
  isHistory = false,
  sessionDate = "",
  transcript = "",
}) => {
  const [isLoading, setIsLoading] = useState(!isHistory);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Artificial delay for cinematic effect on new sessions
  useEffect(() => {
    if (!isHistory) {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isHistory]);

  // --- DATA RESTORATION & NORMALIZATION LAYER ---
  const normalizedAnswers: NormalizedAnswer[] = useMemo(() => {
    let base = Array.isArray(answers) ? [...answers] : [];
    
    // 1. Transcript restoration for legacy/malformed data (hardened)
    if ((base.length === 0 || (!base[0]?.questionText && !(base[0] as any)?.question)) && transcript && transcript.trim()) {
      try {
        const blocks = transcript.split(/\n\n+/);
        const restored = blocks.map((block, idx) => {
          const lines = block.split('\n').map(l => l.trim());
          let q = "";
          let a = "";
          
          for (const line of lines) {
            if (line.startsWith('Q') && line.includes(':')) q = line.split(':').slice(1).join(':').trim();
            else if (line.startsWith('Interviewer:')) q = line.replace('Interviewer:', '').trim();
            else if (line.startsWith('A:') || line.startsWith('Ans:')) a = line.split(':').slice(1).join(':').trim();
            else if (line.startsWith('Candidate:')) a = line.replace('Candidate:', '').trim();
          }

          if (q || a) {
            return {
              questionId: `restored-${idx}`,
              questionText: q || "Question",
              userAnswer: a || "No response provided.",
              timeTaken: 0,
              evaluation: {
                score: 5,
                feedback: "Restored from session transcript.",
                strengths: [],
                missingPoints: []
              }
            } as Answer;
          }
          return null;
        }).filter((item): item is Answer => item !== null);

        if (restored.length > 0) base = restored;
      } catch (err) {
        console.warn("[RESTORE] Failed to parse transcript", err);
      }
    }

    // 2. Map and Enrich Data (Fallbacks for Ideal Answers & Metadata)
    return base.map(item => {
      const historical = item as any;
      const evalData: EvaluationResult = item.evaluation || historical || {};
      
      const qText = item.questionText || historical.question || "Question";
      const uAnswer = item.userAnswer || historical.answer || "No response provided.";
      
      // Attempt to find ideal answer from mock data if missing
      let ideal = evalData.idealAnswer || "";
      if (!ideal && qText !== "Question") {
        const match = ALL_QUESTIONS.find(q => 
          q.text.toLowerCase().trim() === qText.toLowerCase().trim() ||
          qText.toLowerCase().includes(q.text.toLowerCase().substring(0, 30))
        );
        if (match) ideal = match.idealAnswer;
      }
      
      if (!ideal && qText !== "Question") {
        ideal = `A professional ${role} response would involve explaining the core concept, its practical application in Salesforce, and any relevant best practices or governor limits.`;
      }

      return {
        ...item,
        displayQuestion: String(qText),
        displayAnswer: String(uAnswer),
        displayIdeal: String(ideal),
        displayScore: Number(evalData.score ?? historical.score ?? 5),
        displayFeedback: String(evalData.feedback ?? historical.feedback ?? "Analysis unavailable."),
        displayTopic: String(evalData.topic || historical.topic || "General Intelligence"),
        displayStrengths: Array.isArray(evalData.strengths) ? evalData.strengths : [],
        displayWeaknesses: Array.isArray(evalData.weaknesses) ? evalData.weaknesses : [],
        displayGuidance: String(evalData.improvementGuidance || ""),
        displayExpectation: String(evalData.recruiterExpectation || ""),
        displayComms: String(evalData.communicationFeedback || ""),
        displayConfidence: String(evalData.confidenceAnalysis || ""),
        techScore: Number(evalData.technicalScore ?? evalData.score ?? 5),
        commScore: Number(evalData.communicationScore ?? evalData.score ?? 5),
        reasonScore: Number(evalData.roleSpecificScore ?? evalData.score ?? 5),
      };
    });
  }, [answers, transcript, role]);

  const metrics = useMemo(() => {
    if (normalizedAnswers.length === 0) return null;

    let totalScore = 0;
    let technicalScore = 0;
    let communicationScore = 0;
    let roleSpecificScore = 0;

    normalizedAnswers.forEach((ans) => {
      totalScore += ans.displayScore;
      technicalScore += ans.techScore;
      communicationScore += ans.commScore;
      roleSpecificScore += ans.reasonScore;
    });

    const count = normalizedAnswers.length;
    const avgScore = totalScore / count;

    return {
      avgScore: Math.round(avgScore * 10) / 10,
      technicalScore: Math.round((technicalScore / count) * 10) / 10,
      communicationScore: Math.round((communicationScore / count) * 10) / 10,
      roleSpecificScore: Math.round((roleSpecificScore / count) * 10) / 10,
      readiness: avgScore >= 8 ? "Executive Ready" : avgScore >= 6.5 ? "Strong Candidate" : avgScore >= 5 ? "Developing" : "Needs Work",
    };
  }, [normalizedAnswers]);

  useEffect(() => {
    const saveInterview = async () => {
      if (isHistory || !metrics || normalizedAnswers.length === 0) return;

      try {
        const transcriptText = normalizedAnswers
          .map((a, i) => `Q${i + 1}: ${a.displayQuestion}\nA: ${a.displayAnswer}`)
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
          role: String(role || "Unknown"),
          difficulty: String(normalizedAnswers[0]?.displayTopic || "Unknown"),
          score: Number(Math.round(metrics.avgScore)),
          feedback: String(feedbackText || ""),
          transcript: String(transcriptText || ""),
          duration: Number(normalizedAnswers.length || 0),
          communication_score: Number(Math.round(metrics.communicationScore)),
          technical_score: Number(Math.round(metrics.technicalScore)),
          confidence_score: Number(Math.round(metrics.avgScore)),
          coach_advice: String(normalizedAnswers[0]?.displayFeedback || ""),
          ai_verdict: String(metrics.readiness),
          full_results: normalizedAnswers.map(a => ({
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
            roleSpecificScore: Number(a.reasonScore)
          })),
        };

        const { error } = await supabase.from("interview_history").insert([safePayload]);
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
          <Brain size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 animate-pulse" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl font-black tracking-tighter uppercase italic">Analyzing Performance</div>
          <div className="text-xs font-bold text-slate-500 tracking-[0.3em] uppercase">Intelligence Layer Initializing</div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return <div className="text-center text-white py-20 italic opacity-50">Intelligence report unavailable for this session.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      
      {/* 1. CINEMATIC SESSION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden premium-glass rounded-[2.5rem] border border-white/10 p-8 sm:p-12"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles size={120} className="text-emerald-500" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Session Intelligence
              </div>
              {sessionDate && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Calendar size={12} />
                  {new Date(sessionDate).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-white italic tracking-tighter leading-tight">
              {role}
            </h1>
            
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Readiness</div>
                  <div className="text-sm font-black text-white">{metrics.readiness}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 border border-white/10">
                  <Target size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Efficiency</div>
                  <div className="text-sm font-black text-white">{Math.round((metrics.avgScore || 0) * 10)}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="text-[120px] sm:text-[160px] font-black text-white/5 leading-none absolute -top-12 -right-8 select-none italic">
              {Math.round((metrics.avgScore || 0) * 10)}
            </div>
            <div className="flex flex-col items-end">
              <div className="text-7xl sm:text-8xl font-black text-emerald-500 italic leading-none">
                {Math.round((metrics.avgScore || 0) * 10)}<span className="text-3xl sm:text-4xl">%</span>
              </div>
              <div className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.4em] mt-2 mr-2">
                Recruiter Score
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
            <h3 className="text-sm font-black text-white uppercase tracking-widest">Dimension Analytics</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Technical depth', score: metrics.technicalScore, color: 'emerald' },
              { label: 'Communication', score: metrics.communicationScore, color: 'cyan' },
              { label: 'Reasoning', score: metrics.roleSpecificScore, color: 'violet' }
            ].map((dim, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{dim.label}</span>
                  <span className={`text-lg font-black ${dim.color === 'emerald' ? 'text-emerald-400' : dim.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'}`}>
                    {Math.round((dim.score || 0) * 10)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((dim.score || 0) * 10)}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className={`h-full rounded-full ${dim.color === 'emerald' ? 'bg-emerald-500' : dim.color === 'cyan' ? 'bg-cyan-500' : 'bg-violet-500'}`}
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
            "{metrics.avgScore >= 8 ? "This candidate demonstrates exceptional technical maturity and is ready for high-stakes leadership roles." : 
              metrics.avgScore >= 6 ? "Strong performance with clear technical foundations. Ready for professional environments with minor coaching." :
              "Developing professional. Focused reinforcement on core Salesforce architectural concepts is recommended."}"
          </p>
        </motion.div>
      </div>

      {/* 3. QUESTION REVIEW TIMELINE */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-emerald-500" size={24} />
          <h3 className="text-2xl font-black text-white italic">Intelligence Breakdown</h3>
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
                className={`premium-glass rounded-[2rem] border transition-all duration-500 ${isExpanded ? 'border-emerald-500/30 ring-1 ring-emerald-500/10' : 'border-white/5 hover:border-white/10'}`}
              >
                {/* Header Strip */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors ${answer.displayScore >= 8 ? 'bg-emerald-500/10 text-emerald-400' : answer.displayScore >= 6 ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-500/10 text-slate-400'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                        {answer.displayTopic}
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        Score: {Math.round(answer.displayScore * 10)}%
                      </div>
                      <h4 className="text-lg font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                        {answer.displayQuestion}
                      </h4>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-slate-500 transition-all ${isExpanded ? 'rotate-180 bg-white/5 text-white' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
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
                            <div className={`p-6 rounded-2xl border text-sm leading-relaxed ${answer.displayAnswer.length < 20 ? 'italic text-slate-500' : 'text-white'} ${answer.displayScore >= 7 ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-white/[0.03] border-white/5'}`}>
                              {answer.displayAnswer}
                            </div>
                          </div>
                        </div>

                        {/* Ideal Answer Section */}
                        {answer.displayIdeal && (
                          <div className="space-y-4 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl p-6 sm:p-8">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Trophy className="text-emerald-400" size={18} />
                                <h5 className="text-sm font-black text-white uppercase tracking-widest italic">Recruiter's Ideal Response</h5>
                              </div>
                              <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                                Best Practice
                              </div>
                            </div>
                            <div className="text-sm text-slate-300 leading-relaxed font-medium">
                              {answer.displayIdeal}
                            </div>
                            {answer.displayExpectation && (
                              <div className="pt-4 mt-4 border-t border-emerald-500/10">
                                <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest block mb-2">Technical Rationale</span>
                                <p className="text-xs text-slate-400 leading-relaxed">{answer.displayExpectation}</p>
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
                              {answer.displayStrengths.length > 0 ? answer.displayStrengths.map((s, si) => (
                                <div key={si} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                                  <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                  {s}
                                </div>
                              )) : (
                                <div className="text-xs text-slate-600 italic">No significant strengths noted.</div>
                              )}
                            </div>
                          </div>

                          <div className="premium-glass rounded-2xl border border-white/5 p-6 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black text-rose-400 uppercase tracking-widest">
                              <XCircle size={14} /> Performance Gaps
                            </div>
                            <div className="space-y-2">
                              {answer.displayWeaknesses.length > 0 ? answer.displayWeaknesses.map((w, wi) => (
                                <div key={wi} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                                  <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                  {w}
                                </div>
                              )) : (
                                <div className="text-xs text-slate-600 italic">No major performance gaps detected.</div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Guidance & Coaching */}
                        {(answer.displayGuidance || answer.displayComms || answer.displayConfidence) && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                            {answer.displayGuidance && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                                  <Lightbulb size={12} /> Improvement
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">{answer.displayGuidance}</p>
                              </div>
                            )}
                            {answer.displayComms && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-violet-400 uppercase tracking-widest">
                                  <MessageSquare size={12} /> Delivery
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">{answer.displayComms}</p>
                              </div>
                            )}
                            {answer.displayConfidence && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-amber-400 uppercase tracking-widest">
                                  <Zap size={12} /> Confidence
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">{answer.displayConfidence}</p>
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
          <RotateCcw size={16} className="group-hover:rotate-[-45deg] transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">{isHistory ? 'Return to Archives' : 'Restart Interview'}</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
