import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { RotateCcw, Brain } from "lucide-react";
import type { Answer, Role } from "../types";

interface ResultsScreenProps {
  answers: Answer[];
  role: Role;
  onReset: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  answers = [],
  role,
  onReset,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const safeAnswers = useMemo(
    () => (Array.isArray(answers) ? answers : []),
    [answers],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const metrics = useMemo(() => {
    if (safeAnswers.length === 0) return null;

    let totalScore = 0;

    safeAnswers.forEach((answer) => {
      totalScore += answer.evaluation?.score || 0;
    });

    const avgScore = totalScore / safeAnswers.length;

    return {
      avgScore: Math.round(avgScore * 10) / 10,
    };
  }, [safeAnswers]);

  useEffect(() => {
    const saveInterview = async () => {
      if (!metrics || safeAnswers.length === 0) return;

      try {
        const transcript = safeAnswers
          .map((a, i) => `Q${i + 1}: ${a.questionText || "Question"}\nA: ${a.userAnswer || ""}`)
          .join("\n\n");

        const feedback = safeAnswers
          .map((a, i) => `Q${i + 1}: ${a.evaluation?.feedback || "No feedback provided."}`)
          .join("\n\n");

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user?.id) {
          console.error("No authenticated user found");
          return;
        }

       const safePayload = {
  user_id: String(user.id),

  role: String(role || "Unknown"),

  difficulty: "Unknown",

  score: Number(
    Math.round(metrics.avgScore || 0),
  ),

  feedback: String(feedback || ""),

  transcript: String(transcript || ""),

  duration: Number(
    safeAnswers.length || 0,
  ),

  communication_score: 0,

  technical_score: 0,

  confidence_score: 0,

  coach_advice: "",

  ai_verdict: "",

  weak_concepts: [],

  skill_matrix: [],

  behavior_analytics: {},

  full_results: safeAnswers.map(
    (a) => ({
      question: String(
        a?.questionText || "",
      ),

      answer: String(
        a?.userAnswer || "",
      ),

      score: Number(
        a?.evaluation?.score || 0,
      ),

      feedback: String(
        a?.evaluation?.feedback || "",
      ),
    }),
  ),
};

const { error } = await supabase
  .from("interview_history")
  .insert([safePayload]);
        if (error) {
          console.error(error);
        } else {
          console.log("Interview saved");
        }
      } catch (err) {
        console.error(err);
      }
    };

    saveInterview();
  }, [metrics, role, safeAnswers]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white gap-6">
        <Brain size={40} className="text-emerald-500 animate-pulse" />

        <div className="text-lg font-semibold">Generating Results...</div>
      </div>
    );
  }

  if (!metrics) {
    return <div className="text-center text-white py-20">No Results Found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Interview Results</h1>

        <p className="text-slate-400 mb-6">{role}</p>

        <div className="text-6xl font-bold text-emerald-500">
          {metrics.avgScore}/10
        </div>
      </motion.div>

      <div className="space-y-6">
        {safeAnswers.map((answer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="text-emerald-400 font-bold mb-2">
              Question {index + 1}
            </div>

            <div className="text-lg font-semibold mb-4">
              {answer.questionText}
            </div>

            <div className="text-slate-300 mb-4">{answer.userAnswer}</div>

            <div className="text-cyan-400 mb-2">
              Score: {answer.evaluation?.score || 0}
            </div>

            <div className="text-slate-400">{answer.evaluation?.feedback}</div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="mt-10 flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl"
      >
        <RotateCcw size={18} />
        Restart Interview
      </button>
    </div>
  );
};

export default ResultsScreen;
