import type { Difficulty, Role, Question, EvaluationResult } from "../types";

/* ==================================================
   FALLBACK QUESTIONS
================================================== */

const FALLBACK_QUESTIONS: Record<string, string> = {
  "Professional Readiness": "Tell me about yourself.",

  "Salesforce Admin":
    "What is the difference between Profiles and Permission Sets?",

  "Salesforce Apex Developer": "What are governor limits in Apex?",

  "Salesforce LWC Developer":
    "What is the difference between wire and imperative Apex calls?",
};
/* ==================================================
   GENERATE QUESTION
================================================== */

export const generateQuestion = async (
  role: Role,
  difficulty: Difficulty,
  askedQuestions: string[] = [],
): Promise<string> => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/generate-question`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        role,
        difficulty,
        askedQuestions,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    const question = data?.text?.trim();

    if (!question) {
      throw new Error("Empty question response");
    }

    return question;
  } catch (error) {
    console.error("❌ Question Generation Error:", error);

    return FALLBACK_QUESTIONS[role] || "What is Salesforce?";
  }
};

/* ==================================================
   EVALUATE ANSWER
================================================== */

export const evaluateAnswer = async (
  question: Question,
  userAnswer: string,
  role: string,
  difficulty: Difficulty,
  personality: string,
): Promise<
  EvaluationResult & {
    acknowledgment?: string;
  }
> => {
  try {
    const response = await fetch("fetch(`${API_URL}/evaluate`)", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        question: question.text,
        answer: userAnswer,
        role,
        difficulty,
        personality,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    const score = data.score ?? 0;

    const understanding_level =
      score >= 8
        ? "strong"
        : score >= 6
          ? "good"
          : score >= 4
            ? "partial"
            : "none";

    return {
      score,

      technicalScore: data.technicalScore ?? score,

      communicationScore: data.communicationScore ?? score,

      practicalReasoningScore: data.practicalReasoningScore ?? score,

      roleSpecificScore: data.roleSpecificScore ?? score,

      conceptCoverageScore: data.conceptCoverageScore ?? score,

      topic: data.topic ?? "General",

      feedback: data.feedback ?? "No feedback provided.",

      acknowledgment: data.acknowledgment ?? "Alright.",

      missingPoints: data.missingPoints ?? [],

      strengths: data.strengths ?? [],

      followUpQuestion: null,

      understanding_level,
    };
  } catch (error) {
    console.error("❌ Evaluation API Error:", error);

    return {
      score: 5,

      technicalScore: 5,

      communicationScore: 5,

      practicalReasoningScore: 5,

      roleSpecificScore: 5,

      conceptCoverageScore: 5,

      topic: "General",

      feedback: "Evaluation service unavailable.",

      acknowledgment: "Alright.",

      missingPoints: [],

      strengths: [],

      followUpQuestion: null,

      understanding_level: "partial",
    };
  }
};
