export type Role = 
  | 'Professional Readiness'
  | 'Salesforce Admin' 
  | 'Salesforce Apex Developer' 
  | 'Salesforce LWC Developer';

export type Difficulty = 'Fresher' | 'Intermediate' | 'Advanced';

export type InterviewerPersonality = 'Professional' | 'Strict' | 'Mentor';

export interface InterviewConfig {
  candidateName: string;
  role: Role;
  difficulty: Difficulty;
  personality: InterviewerPersonality;
  timeLimit: number; // in seconds per question
  voiceEnabled: boolean;
  speechSpeed: number;
}

export interface ConceptGroup {
  name: string;
  keywords: string[]; // Synonyms and related terms
  weight: number; // Importance (e.g. 1-3)
  isCore?: boolean; // If true, matching this concept grants a minimum score
}

export interface Question {
  id: string;
  text: string;
  category: string;
  concepts: ConceptGroup[];
  idealAnswer: string;
  difficulty: Difficulty;
}

export interface EvaluationResult {
  score: number;
  feedback: string;
  missingPoints: string[];
  strengths: string[];
  
  // New Analytics Metrics (Out of 10)
  technicalScore?: number;
  communicationScore?: number;
  practicalReasoningScore?: number;
  roleSpecificScore?: number;
  conceptCoverageScore?: number;
  
  // The topic this question primarily tested
  topic?: string;

  followUpQuestion?: string | null;

  understanding_level?: 'none' | 'partial' | 'good' | 'strong';
}

export interface Answer {
  questionId: string;
  questionText: string;
  userAnswer: string;
  timeTaken: number;
  evaluation?: EvaluationResult;
}

export interface Message {
  id: string;
  sender: 'interviewer' | 'candidate';
  text: string;
  timestamp: number;
}
