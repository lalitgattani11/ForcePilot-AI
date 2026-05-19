import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import { sendWelcomeEmail } from "./emailService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

/* ==================================================
   PERSONALITIES
================================================== */

const PERSONALITIES = {
  Professional: {
    style: "Professional recruiter. Neutral and direct.",
    strictness: 0.5,
  },

  Strict: {
    style: "Technical Lead. Serious and blunt.",
    strictness: 0.9,
  },

  Mentor: {
    style: "Architect. Professional and technical.",
    strictness: 0.3,
  },
};

/* ==================================================
   ROLE TOPICS (Calibrated by Difficulty)
================================================== */

const ROLE_TOPICS = {
  "Professional Readiness": {
    Fresher: [
      "Self Introduction",
      "Career Goals",
      "Internship Experience",
      "Strengths and Weaknesses",
      "Learning Approach",
    ],
    Intermediate: [
      "Team Collaboration",
      "Communication Skills",
      "Time Management",
      "Workplace Challenges",
      "Problem Solving",
    ],
    Advanced: [
      "Conflict Resolution",
      "Leadership Situations",
      "Strategic Planning",
      "Mentorship Experience",
      "Complex Stakeholder Management",
    ],
  },

  "Salesforce Admin": {
    Fresher: [
      "What is OWD",
      "What is a Profile",
      "What is a Permission Set",
      "What is a Validation Rule",
      "What is a Flow",
      "What is a Record Type",
      "Formula Fields basics",
      "Page Layouts basics",
      "Standard Objects",
      "Custom Objects",
    ],
    Intermediate: [
      "Profiles vs Permission Sets",
      "OWD vs Role Hierarchy",
      "Sharing Rules practical usage",
      "Summary vs Matrix Reports",
      "Manual Sharing vs Sharing Rules",
      "Scheduled vs Autolaunched Flow",
      "Approval Processes",
      "Data Loader vs Import Wizard",
      "Lookup vs Master Detail",
      "Debugging a Flow",
      "Record Types usage",
      "Validation Rule failures",
    ],
    Advanced: [
      // Upgraded Fundamentals & Reasoning (65%)
      "Why are OWD and Role Hierarchy critical in real projects?",
      "Common Flow performance issues",
      "When to avoid Process Builder/Workflows",
      "Validation Rule best practices in complex orgs",
      "Tradeoffs in Data Migration strategies",
      "Security review of manual sharing",
      "Record Type optimization",
      // Practical Scenarios (25%)
      "Troubleshooting complex Flow failures",
      "Handling Data Loader errors at scale",
      "Security audit for custom objects",
      // Architecture (10%)
      "Enterprise Security Architecture",
      "Multi-Org Strategy",
      "Large Data Volumes (LDV) management",
    ],
  },

  "Salesforce Apex Developer": {
    Fresher: [
      "Apex Collections (List, Set, Map)",
      "What is SOQL",
      "What is a Trigger",
      "Exception Handling basics",
      "DML Operations",
      "Data Types in Apex",
    ],
    Intermediate: [
      "Trigger.new vs Trigger.old",
      "Future vs Queueable Apex",
      "Batch vs Schedulable Apex",
      "SOSL vs SOQL",
      "Apex Bulkification",
      "Test Classes and Code Coverage",
      "Database methods (allOrNone)",
      "Governor Limits overview",
      "Debugging Apex",
      "Standard Controller vs Custom Controller",
    ],
    Advanced: [
      // Upgraded Fundamentals & Reasoning (65%)
      "Why are governor limits important in real-world large projects?",
      "Practical usage: Queueable vs Batch Apex",
      "Optimizing slow SOQL queries",
      "Preventing and handling recursive triggers",
      "Apex unit testing strategies for complex logic",
      "Best practices for Exception Handling frameworks",
      // Practical Scenarios (25%)
      "Debugging failing REST integrations",
      "Performance profiling of Apex code",
      "Bulkification in multi-trigger environments",
      // Architecture (10%)
      "Async Apex Architecture design",
      "Integration Architecture for external systems",
      "Enterprise Apex Design Patterns",
    ],
  },

  "Salesforce LWC Developer": {
    Fresher: [
      "What is @api",
      "What is @track",
      "Template Directives (if, for:each)",
      "LWC Component Composition",
      "HTML and CSS in LWC",
    ],
    Intermediate: [
      "wire vs Imperative Apex",
      "LWC Lifecycle Hooks",
      "Parent-Child Communication (Custom Events)",
      "Lightning Message Service (LMS)",
      "PubSub in LWC",
      "SLDS advanced usage",
      "NavigationMixin",
      "LWC Component debugging",
    ],
    Advanced: [
      // Upgraded Fundamentals & Reasoning (65%)
      "Why use Lightning Message Service over Pub-Sub?",
      "LWC Performance issues and rendering optimization",
      "Security considerations for LWC (Locker/LWS)",
      "State management strategies for complex UIs",
      "Effective use of wire adapters vs imperative calls",
      // Practical Scenarios (25%)
      "Debugging component communication in nested structures",
      "Unit testing LWC components with Jest",
      "Handling complex data binding",
      // Architecture (10%)
      "DOM Performance Optimization at scale",
      "Component Architecture for global enterprise apps",
    ],
  },
};

/* ==================================================
   DIFFICULTY CONSTRAINTS (Hard Isolation)
================================================== */

const ROLE_CONSTRAINTS = {
  "Salesforce Admin": {
    Fresher:
      "Concepts: OWD, Profiles, Permission Sets, Validation Rules, Standard Objects. NO complex automation.",
    Intermediate:
      "Focus: Troubleshooting, feature comparisons, realistic mid-sized scenarios. NO enterprise architecture, NO multi-org, NO 1M+ record strategies.",
    Advanced:
      "Focus: Architecture, Scalability, Governance, LDV, Multi-org, Enterprise Security Design.",
  },
  "Salesforce Apex Developer": {
    Fresher:
      "Concepts: Collections, SOQL basics, Simple Triggers, DML. NO Async Apex.",
    Intermediate:
      "Focus: Bulkification, Trigger patterns, Future/Queueable vs Batch, Debugging. NO enterprise framework design.",
    Advanced:
      "Focus: Integration Architecture, Design Patterns, Enterprise Frameworks, Performance Profiling.",
  },
  "Salesforce LWC Developer": {
    Fresher:
      "Concepts: @api, @track, Template syntax, Composition. NO LMS/PubSub.",
    Intermediate:
      "Focus: wire vs imperative, Lifecycle hooks, Parent-Child events, LMS. NO complex state management.",
    Advanced:
      "Focus: Performance Engineering, Security (LWS), Complex State, Jest Testing Architecture.",
  },
  "Professional Readiness": {
    Fresher: "Focus: Basic self-intro, internship, goals.",
    Intermediate: "Focus: Teamwork, problem-solving, workplace conflict.",
    Advanced: "Focus: Leadership, strategic influence, stakeholder management.",
  },
};

/* ==================================================
   INTERMEDIATE HARDCODED QUESTION BANK
================================================== */

const INTERMEDIATE_QUESTION_BANK = {
  "Salesforce Admin": [
    "What is the difference between Organization-Wide Defaults (OWD) and Role Hierarchy?",
    "When would you choose to use Manual Sharing over a Sharing Rule?",
    "Why would you use Record Types in a Salesforce implementation?",
    "What is the difference between a Summary Report and a Matrix Report?",
    "How does a Decision element work in a Salesforce Flow?",
    "What is the difference between a Scheduled Flow and an Autolaunched Flow?",
    "What are the tradeoffs between a Lookup relationship and a Master-Detail relationship?",
    "How do you debug a Flow that is failing in production?",
    "Why would you use a Validation Rule instead of a Workflow or Flow?",
    "What happens when a user tries to delete a record that has a Master-Detail relationship?",
  ],

  "Salesforce Apex Developer": [
    "What is the difference between Future methods and Queueable Apex?",
    "Why is bulkification important in Apex triggers and how do you implement it?",
    "What is the difference between Trigger.new and Trigger.old?",
    "When would you use SOQL versus SOSL in an Apex class?",
    "What happens if a governor limit is exceeded during an Apex transaction?",
    "What is the difference between a Standard Controller and a Custom Controller?",
    "How do you implement exception handling in an Apex Trigger?",
    "Why is code coverage important in Salesforce, and what are the requirements for deployment?",
    "What is the difference between a public and a private class in Apex?",
    "How do you use the Database.insert method with the allOrNone parameter set to false?",
  ],

  "Salesforce LWC Developer": [
    "What is the difference between @wire and imperative Apex calls in LWC?",
    "How do you implement Parent-to-Child versus Child-to-Parent communication in LWC?",
    "Why would you use Lightning Message Service (LMS) in your LWC components?",
    "What is the difference between the renderedCallback and connectedCallback lifecycle hooks?",
    "How do you handle custom events in a Lightning Web Component?",
    "When should you use @track versus @api in a component?",
    "How do you use the NavigationMixin to navigate to a record page?",
    "What is the purpose of the Shadow DOM in Lightning Web Components?",
    "How do you apply SLDS classes to style a custom LWC?",
    "How do you handle errors from a wire adapter or an imperative call?",
  ],

  "Professional Readiness": [
    "Tell me about a time you had to collaborate with a difficult team member.",
    "How do you prioritize your tasks when you have multiple competing deadlines?",
    "Describe a workplace challenge you faced and how you resolved it.",
    "What is your approach to learning new technologies or features in Salesforce?",
    "How do you handle receiving critical feedback from a manager or peer?",
  ],
};

/* ==================================================
   HELPERS
================================================== */

function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .trim();
}

/**
 * 🔍 Similarity Check Logic (HARD filtering)
 * Rejects questions that share too many significant words with history.
 */
function calculateSimilarity(q1, q2) {
  const clean = (text) =>
    (text || "")
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3);

  const words1 = clean(q1);
  const words2 = clean(q2);

  const intersection = words1.filter((word) => words2.includes(word));

  return intersection.length / Math.max(words1.length, 1);
}
function isDuplicateQuestion(newQuestion, askedQuestions = []) {
  if (!askedQuestions || askedQuestions.length === 0) return false;

  const normalizedNew = normalizeText(newQuestion);

  for (const oldQ of askedQuestions) {
    const similarity = calculateSimilarity(newQuestion, oldQ);
    if (similarity > 0.45) { // Lowered threshold for stricter duplicate prevention
      return true;
    }

    // Direct normalized comparison as safety
    if (normalizedNew === normalizeText(oldQ)) {
      return true;
    }
  }
  return false;
}

/**
 * 🚧 HARD DIFFICULTY GATE
 * Strictly forbids Advanced concepts from leaking into Intermediate questions.
 */
function isAdvancedLeakage(question = "", difficulty = "") {
  if (difficulty !== "Intermediate") return false;

  const lowerQ = question.toLowerCase();
  const forbidden = [
    "architecture",
    "scalable",
    "optimization",
    "enterprise",
    "multinational",
    "large organization",
    "strategy",
    "performance tuning",
    "integration design",
    "high-volume",
    "millions of records",
    "consultant",
    "security model design",
  ];

  const matched = forbidden.filter((word) => lowerQ.includes(word));
  if (matched.length > 0) {
    console.log(
      `[DIFFICULTY_TRACE] [LEAKAGE_DETECTED] Match: ${matched.join(", ")}`,
    );
    return true;
  }
  return false;
}

/**
 * 🚧 ROLE DOMAIN GATE
 * Rejects questions that leak from other Salesforce domains.
 */
function isDomainLeakage(question = "", role = "") {
  const lowerQ = question.toLowerCase();
  
  const rules = {
    "Salesforce Admin": {
      forbidden: ["apex", "trigger", "soql", "sosl", "lwc", "javascript", "lightning web component", "code", "class", "method", "@api", "@track", "@wire"],
      reason: "technical code/development leaked into Admin"
    },
    "Salesforce Apex Developer": {
      forbidden: ["page layout", "introduction", "strength", "weakness", "career goal", "tell me about yourself"],
      reason: "Admin/HR leaked into Apex"
    },
    "Salesforce LWC Developer": {
      forbidden: ["trigger", "batch", "schedulable", "soql", "profile", "permission set", "sharing rule"],
      reason: "Admin/Apex leaked into LWC"
    },
    "Professional Readiness": {
      forbidden: ["apex", "soql", "lwc", "trigger", "validation rule", "flow", "permission set"],
      reason: "Technical leaked into HR"
    }
  };

  const config = rules[role];
  if (!config) return false;

  const matched = config.forbidden.filter(word => lowerQ.includes(word));
  if (matched.length > 0) {
    console.log(`[DOMAIN_TRACE] [LEAKAGE_DETECTED] Match: ${matched.join(", ")} | Reason: ${config.reason}`);
    return true;
  }
  return false;
}

/* ==================================================
   DIFFICULTY GUIDELINES (Calibrated)
================================================== */

const DIFFICULTY_GUIDELINES = {
  Fresher:
    "STRICT: ONLY direct definitions, single concepts, and beginner fundamentals. NO comparisons (A vs B), NO tradeoffs, NO reasoning-heavy questions. One concept only. Keep it very short and direct. Example: 'What is OWD?'",
  Intermediate:
    "TARGET: 1-3 years experience. Focus on practical application, moderate troubleshooting, feature comparisons (A vs B), and small real-world cases. STRICTLY FORBIDDEN: Enterprise architecture, scalability strategies, optimization for millions of records, multinational org design, performance tuning strategy. Keep scenarios localized and practical. Example: 'When would you use Queueable Apex over a Future method?'",
  Advanced:
    "TARGET: Senior Developer/Lead/Architect. Focus on high-level reasoning, technical lead practical decisions, optimization, and occasionally enterprise architecture. Mix styles: upgraded fundamentals, reasoning, practical scenarios, and architecture. Example: 'Why are governor limits critical in large projects?' or 'How would you optimize a slow SOQL query?'",
};

function isProjectQuestion(question = "") {
  const lower = question.toLowerCase();
  // Removed "project" as it's too common in technical Salesforce contexts
  const projectKeywords = [
    "internship",
    "tell me about yourself",
    "introduce yourself",
    "strength",
    "weakness",
    "career goal",
    "why should we hire",
    "tell me about a time",
  ];
  return projectKeywords.some((keyword) => lower.includes(keyword));
}

function getRandomTopic(role, difficulty, askedQuestions = []) {
  // CRITICAL: Strict role-based pool isolation
  const rolePool = ROLE_TOPICS[role];
  
  if (!rolePool) {
    console.error(`[CRITICAL_ERROR] Invalid role requested: ${role}`);
    return "General Salesforce Overview";
  }

  // Map difficulty to correct bucket
  const difficultyMap = {
    "Fresher": "Fresher",
    "Beginner": "Fresher", // Safety for possible frontend mismatch
    "Intermediate": "Intermediate",
    "Advanced": "Advanced"
  };

  const targetDifficulty = difficultyMap[difficulty] || "Intermediate";
  const topics = rolePool[targetDifficulty];

  if (!topics || topics.length === 0) {
    console.error(`[CRITICAL_ERROR] No topics found for role: ${role} | difficulty: ${targetDifficulty}`);
    return role === "Professional Readiness" ? "Career Background" : "Platform Fundamentals";
  }

  // Filter out used topics to ensure variety within the role bank
  const historyText = (askedQuestions || []).join(" ").toLowerCase();
  const unusedTopics = topics.filter(
    (topic) => !historyText.includes(topic.toLowerCase()),
  );

  const finalPool = unusedTopics.length > 0 ? unusedTopics : topics;
  const selected = finalPool[Math.floor(Math.random() * finalPool.length)];

  console.log(
    `[ISOLATION_TRACE] Role: ${role} | Difficulty: ${targetDifficulty} | Source: ROLE_TOPICS["${role}"]["${targetDifficulty}"] | Selected: ${selected}`,
  );
  
  return selected;
}

/* ==================================================
   GENERATE QUESTION
================================================== */

app.post("/generate-question", async (req, res) => {
  const {
    role = "Salesforce Admin",
    difficulty = "Beginner",
    askedQuestions = [],
  } = req.body;

  if (difficulty !== "Fresher") {
    console.log(
      `\n[DIFFICULTY_TRACE] [FLOW_START] Difficulty: ${difficulty} | Role: ${role} | History: ${askedQuestions.length}`,
    );
  } else {
    console.log(
      `\n[GENERATION START] Role: ${role} | History Size: ${askedQuestions.length}`,
    );
  }

  /* ==================================================
       STRICT INTERMEDIATE GATING
    ================================================== */
  if (difficulty === "Intermediate") {
    console.log(
      `[ISOLATION_TRACE] [INTERMEDIATE_BYPASS] Entering bypass for role: ${role}`,
    );
    
    // Explicitly lock to the specific role's bank
    const roleBank = INTERMEDIATE_QUESTION_BANK[role];
    
    if (!roleBank) {
      console.error(`[CRITICAL_ERROR] No intermediate bank for role: ${role}`);
      return res.json({ text: "Could you describe your typical day-to-day responsibilities in a Salesforce environment?" });
    }

    // Filter out previously asked questions using similarity check
    const available = roleBank.filter((q) => !isDuplicateQuestion(q, askedQuestions));

    // If bank is exhausted, use the first available that's not exactly the last one
    const pool = available.length > 0 ? available : roleBank;
    const finalQuestion = pool[Math.floor(Math.random() * pool.length)];

    console.log(
      `[ISOLATION_TRACE] [FINAL_SENT] Track: ${role} | Question Source: INTERMEDIATE_QUESTION_BANK["${role}"]`,
    );
    return res.json({ text: finalQuestion });
  }

  try {
    if (!GROQ_API_KEY || GROQ_API_KEY === "gsk_dummy") {
      throw new Error("Invalid or missing GROQ_API_KEY. Please configure your environment variables.");
    }

    let generatedQuestion = "";
    let attempts = 0;
    let selectedTopic = "";

    while (attempts < 3) {
      attempts++;
      selectedTopic = getRandomTopic(role, difficulty, askedQuestions);

      if (difficulty !== "Fresher") {
        console.log(
          `[DIFFICULTY_TRACE] [ATTEMPT_${attempts}] Topic: ${selectedTopic}`,
        );
      } else {
        console.log(
          `[DIFFICULTY_TRACE] Attempt ${attempts}: Selected Topic = ${selectedTopic}`,
        );
      }

      const currentConstraints =
        ROLE_CONSTRAINTS[role] && ROLE_CONSTRAINTS[role][difficulty]
          ? ROLE_CONSTRAINTS[role][difficulty]
          : "Focus on standard role expectations.";

      const prompt = `
You are a senior Salesforce technical interviewer. 
YOUR MISSION: Conduct a specialized technical interview for the role of ${role}.

STRICT DOMAIN BOUNDARY:
- ONLY ask questions related to ${role}.
- NEVER ask questions from other tracks (e.g., if Admin, NO Apex; if Apex, NO Admin security; if HR, NO Technical).

TRACK: ${role}
LEVEL: ${difficulty}
CONSTRAINTS: ${currentConstraints}
GUIDELINE: ${DIFFICULTY_GUIDELINES[difficulty] || DIFFICULTY_GUIDELINES.Intermediate}
PRIMARY FOCUS TOPIC: ${selectedTopic}

==================================================
PREVIOUSLY ASKED (STRICT EXCLUSION):
${askedQuestions.length ? askedQuestions.join("\n") : "None"}
==================================================

CRITICAL RULES:
- Generate ONE fresh question appropriate for a ${difficulty} level.
- ${difficulty === "Fresher" ? "Avoid complex scenarios. Direct conceptual or simple usage questions preferred." : ""}
- ${difficulty === "Intermediate" ? "Practical, localized, hands-on scenarios ONLY. NO enterprise-wide architecture." : ""}
- ${difficulty === "Advanced" ? "Mix question styles: 70% direct technical reasoning/optimization (no giant scenario) and 30% complex enterprise architecture scenarios." : ""}
- NEVER repeat or paraphrase previous questions.
- NEVER repeat same concepts.
- Return ONLY the question.
`;

      console.log(
        `[DIFFICULTY_TRACE] AI Prompt Construction:\n--- PROMPT START ---\n${prompt}\n--- PROMPT END ---`,
      );

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            temperature: 0.8,
            messages: [
              {
                role: "system",
                content:
                  `Senior Salesforce Interviewer. You are an expert in ${role}. You NEVER deviate from this role. Return ONLY the question.`,
              },
              { role: "user", content: prompt },
            ],
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error?.message || "Groq error");

      generatedQuestion = data?.choices?.[0]?.message?.content?.trim();

      if (difficulty !== "Fresher") {
        console.log(
          `[DIFFICULTY_TRACE] [AI_RAW_OUTPUT] Level: ${difficulty} | Raw: "${generatedQuestion.substring(0, 100)}..."`,
        );
      } else {
        console.log(
          `[DIFFICULTY_TRACE] AI Generated Raw: "${generatedQuestion}"`,
        );
      }

      if (!generatedQuestion) {
        console.log(`[DIFFICULTY_TRACE] [REJECTED] Reason: Empty response.`);
        continue;
      }

      const isDuplicate = isDuplicateQuestion(
        generatedQuestion,
        askedQuestions,
      );
      const isInvalidHR =
        role !== "Professional Readiness" &&
        isProjectQuestion(generatedQuestion);
      const isLeakage = isAdvancedLeakage(generatedQuestion, difficulty);
      const isRoleLeakage = isDomainLeakage(generatedQuestion, role);

      if (isDuplicate)
        console.log(
          `[DIFFICULTY_TRACE] [REJECTED] Reason: Duplicate detected.`,
        );
      if (isInvalidHR)
        console.log(
          `[DIFFICULTY_TRACE] [REJECTED] Reason: HR question in technical role.`,
        );
      if (isLeakage)
        console.log(
          `[DIFFICULTY_TRACE] [REJECTED] Reason: Advanced concept leakage (HARD GATE).`,
        );
      if (isRoleLeakage)
        console.log(
          `[DIFFICULTY_TRACE] [REJECTED] Reason: Role domain leakage detected.`,
        );

      if (!isDuplicate && !isInvalidHR && !isLeakage && !isRoleLeakage) {
        if (difficulty !== "Fresher") {
          console.log(
            `[DIFFICULTY_TRACE] [ACCEPTED] Level: ${difficulty} | Topic: ${selectedTopic}`,
          );
        } else {
          console.log(
            `[DIFFICULTY_TRACE] Generation Accepted! Topic: ${selectedTopic}`,
          );
        }
        break;
      }
    }

    /* Fallback if all attempts fail or are duplicates */
    if (
      !generatedQuestion ||
      isDuplicateQuestion(generatedQuestion, askedQuestions) ||
      isAdvancedLeakage(generatedQuestion, difficulty) ||
      isDomainLeakage(generatedQuestion, role)
    ) {
      console.log(
        `[ISOLATION_TRACE] [FALLBACK_TRIGGERED] Final safety for role: ${role}`,
      );

      // Hardcoded safe fallback based on level - strictly role-locked via selectedTopic
      let fallbackText = "";
      if (difficulty === "Fresher") {
        fallbackText = `Could you explain how ${selectedTopic} works within the context of ${role}?`;
      } else if (difficulty === "Intermediate") {
        fallbackText = `In a standard ${role} scenario, when would you typically use ${selectedTopic}, and what are the main benefits?`;
      } else {
        fallbackText = `Considering your expertise in ${role}, could you discuss the architectural implications and scalability of implementing ${selectedTopic}?`;
      }

      // Final uniqueness check for the fallback itself
      if (isDuplicateQuestion(fallbackText, askedQuestions)) {
        // Ultimate emergency fallback - still role-locked
        generatedQuestion = `Based on your specific experience in ${role}, could you describe a complex technical challenge you've recently solved?`;
      } else {
        generatedQuestion = fallbackText;
      }
    }

    if (difficulty !== "Fresher") {
      console.log(
        `[DIFFICULTY_TRACE] [FINAL_SENT] Level: ${difficulty} | Question: "${generatedQuestion}"`,
      );
    } else {
      console.log(
        `[DIFFICULTY_TRACE] Final Question Sent: "${generatedQuestion}"`,
      );
    }
    res.json({ text: generatedQuestion });
  } catch (err) {
    console.error("❌ Generation Error:", err.message);
    res.status(500).json({ error: "Failed to generate question" });
  }
});

/* ==================================================
   EMAIL ENDPOINTS
================================================== */

app.post("/api/email/login-email", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required",
      });
    }

    console.log(`[EMAIL_TRACE] Sending welcome email to ${email}`);

    const result = await sendWelcomeEmail(email, name || "Candidate");

    console.log("[EMAIL_TRACE] Result:", result);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("[EMAIL_ERROR]", error);

    return res.status(500).json({
      success: false,
      error: (error && error.message) || "Failed to send email",
    });
  }
});

/* ==================================================
   EVALUATE ANSWER
================================================== */

app.post("/evaluate", async (req, res) => {
  const { question, answer, role, difficulty, personality } = req.body;

  const persona = PERSONALITIES[personality] || PERSONALITIES["Professional"];

  try {
    const skipPatterns = [
      "i don't know",
      "dont know",
      "no idea",
      "skip",
      "not sure",
      "cannot answer",
      "can't answer",
      "next question",
      "i havent",
      "i haven't",
      "remained silent",
      "no answer provided",
    ];

    const normalizedAnswer = normalizeText(answer);

    const isSkipAnswer = skipPatterns.some((pattern) =>
      normalizedAnswer.includes(normalizeText(pattern)),
    );

    if (isSkipAnswer) {
      return res.json({
        score: 0,
        technicalScore: 0,
        communicationScore: 3,
        practicalReasoningScore: 0,
        roleSpecificScore: 0,
        conceptCoverageScore: 0,
        topic: "Skipped",
        feedback: "Candidate skipped the question.",
        acknowledgment: "Alright.",
        missingPoints: [],
        strengths: [],
        followUpQuestion: null,
      });
    }

    const prompt = `
You are a Salesforce interviewer.

ROLE:
${role}

DIFFICULTY:
${difficulty}

PERSONALITY:
${persona.style}

QUESTION:
${question}

CANDIDATE ANSWER:
${answer}

==================================================

RULES:

You are evaluating a REAL Salesforce interview candidate.

PRIMARY EVALUATION PRIORITY:
- Salesforce technical correctness
- Concept understanding
- Relevance to the question
- Practical understanding

DO NOT heavily penalize:
- grammar mistakes
- broken English
- spelling mistakes
- short answers

IMPORTANT:
A candidate with technically correct Salesforce concepts should still receive a fair score even if communication is imperfect.

SCORING PHILOSOPHY:

- incorrect:
Completely wrong, irrelevant, empty, or nonsense answer.

- weak:
Very limited understanding with few correct concepts.

- basic:
Simple but technically correct understanding.

- intermediate:
Good practical understanding with reasonable explanation.

- strong:
Strong technical explanation with accurate concepts.

- advanced:
Deep understanding with practical and architectural clarity.

- expert:
Senior-level explanation with excellent Salesforce depth.

IMPORTANT SCORING BEHAVIOR:
- Avoid repeating identical scores.
- Avoid clustering all scores around 40-60.
- Use the full scoring range naturally.
- Technical accuracy is MORE important than communication quality.
- Correct concepts deserve partial credit.
- Short but correct answers should usually score at least "basic".

NO COACHING TONE.
NO MOTIVATIONAL LANGUAGE.
NO TEACHING STYLE.

Keep feedback recruiter-style and realistic.

ALLOWED ACKNOWLEDGMENTS:
- "Alright, let’s continue."
- "Moving to the next area."
- "Understood."
- "Alright"
- "Hmm"

==================================================

RETURN ONLY JSON:

{
  "answerLevel": "incorrect | weak | basic | intermediate | strong | advanced | expert",
"technicalAccuracy": "low | medium | high",
"depth": "low | medium | high",
"communication": "low | medium | high",
  "practicalReasoningScore": number,
  "roleSpecificScore": number,
  "conceptCoverageScore": number,
  "topic": "Short category",
  "feedback": "Internal technical feedback",
  "acknowledgment": "Neutral acknowledgment only",
  "missingPoints": ["Point"],
  "strengths": ["Point"],
  "followUpQuestion": null
}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "llama-3.1-8b-instant",

          temperature: 0.1,

          messages: [
            {
              role: "system",

              content: "Return ONLY valid JSON.",
            },

            {
              role: "user",

              content: prompt,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "Groq API error");
    }

    let text = data?.choices?.[0]?.message?.content || "";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (jsonError) {
      console.error("JSON Parse Error:", jsonError);

      parsed = {
        answerLevel: "weak",
        technicalAccuracy: "low",
        depth: "low",
        communication: "medium",
        feedback: "Evaluation parsing fallback triggered.",
        strengths: [],
        missingPoints: [],
      };
    }

    const level = String(parsed.answerLevel || "incorrect")
      .toLowerCase()
      .trim();

    const technicalAccuracy = String(parsed.technicalAccuracy || "low")
      .toLowerCase()
      .trim();

    const depth = String(parsed.depth || "low")
      .toLowerCase()
      .trim();

    const communication = String(parsed.communication || "low")
      .toLowerCase()
      .trim();

    const scoreRanges = {
      incorrect: [0, 20],
      weak: [25, 45],
      basic: [50, 68],
      intermediate: [65, 80],
      strong: [78, 90],
      advanced: [88, 96],
      expert: [95, 100],
    };
    const range = scoreRanges[level] || [5, 20];

    let bonus = 0;

    if (technicalAccuracy === "high") bonus += 8;
    else if (technicalAccuracy === "medium") bonus += 4;

    if (depth === "high") bonus += 7;
    else if (depth === "medium") bonus += 3;

    if (communication === "high") bonus += 2;
    else if (communication === "medium") bonus += 1;

    const answerLower = answer.toLowerCase();

    let expectedKeywords = [];

    /* ==================================================
   QUESTION-AWARE KEYWORDS
================================================== */

    if (question.toLowerCase().includes("soql")) {
      expectedKeywords = [
        "query",
        "records",
        "database",
        "select",
        "where",
        "object",
      ];
    }

    if (question.toLowerCase().includes("trigger")) {
      expectedKeywords = [
        "before",
        "after",
        "trigger.new",
        "trigger.old",
        "event",
        "bulkification",
      ];
    }

    if (question.toLowerCase().includes("dml")) {
      expectedKeywords = [
        "insert",
        "update",
        "delete",
        "upsert",
        "database",
        "record",
      ];
    }

    if (question.toLowerCase().includes("@api")) {
      expectedKeywords = [
        "public",
        "parent",
        "child",
        "property",
        "communication",
        "component",
      ];
    }

    if (question.toLowerCase().includes("owd")) {
      expectedKeywords = [
        "sharing",
        "access",
        "security",
        "private",
        "public read only",
        "role hierarchy",
      ];
    }
    const keywordBanks = {
      "Salesforce Apex Developer": {
        fundamentals: [
          "string",
          "integer",
          "boolean",
          "decimal",
          "double",
          "long",
          "date",
          "datetime",
          "list",
          "set",
          "map",
          "soql",
          "sosl",
          "dml",
          "insert",
          "update",
          "delete",
          "upsert",
          "trigger",
          "exception",
        ],

        advanced: [
          "bulkification",
          "governor limit",
          "queueable",
          "future method",
          "batch apex",
          "schedulable",
          "trigger framework",
          "database methods",
          "allornone",
          "asynchronous",
          "test class",
          "code coverage",
        ],
      },

      "Salesforce LWC Developer": {
        fundamentals: [
          "@api",
          "@track",
          "component",
          "template",
          "html",
          "css",
          "shadow dom",
          "event",
          "property",
          "reactive",
        ],

        advanced: [
          "wire",
          "imperative",
          "lightning message service",
          "lms",
          "pubsub",
          "navigationmixin",
          "connectedcallback",
          "renderedcallback",
          "jest",
          "state management",
          "locker",
          "lws",
        ],
      },

      "Salesforce Admin": {
        fundamentals: [
          "owd",
          "profile",
          "permission set",
          "validation rule",
          "flow",
          "record type",
          "page layout",
          "formula field",
          "sharing rule",
          "object",
          "field",
        ],

        advanced: [
          "role hierarchy",
          "manual sharing",
          "master-detail",
          "lookup relationship",
          "approval process",
          "scheduled flow",
          "autolaunched flow",
          "data loader",
          "security",
          "reports",
          "dashboard",
        ],
      },
    };

    const roleKeywords = keywordBanks[role]?.fundamentals || [];

    const advancedKeywords = keywordBanks[role]?.advanced || [];

    const matchedFundamentals = roleKeywords.filter((keyword) =>
      answerLower.includes(keyword.toLowerCase()),
    );

    const matchedAdvanced = advancedKeywords.filter((keyword) =>
      answerLower.includes(keyword.toLowerCase()),
    );
    const matchedExpectedKeywords = expectedKeywords.filter((keyword) =>
      answerLower.includes(keyword.toLowerCase()),
    );

    bonus += Math.min(matchedFundamentals.length * 2, 10);

    bonus += Math.min(matchedAdvanced.length * 3, 12);
    bonus += Math.min(matchedExpectedKeywords.length * 2.5, 10);

    const [min, max] = range;

    const variance =
      matchedFundamentals.length * 1.2 + matchedAdvanced.length * 1.8;

    let finalScore = min + variance + bonus;

    finalScore = Math.max(0, Math.min(100, finalScore));

    finalScore = Number(finalScore.toFixed(1));

    console.log({
      answerLevel: level,
      technicalAccuracy,
      depth,
      communication,
      matchedExpectedKeywords,
      matchedFundamentals,
      matchedAdvanced,
      bonus,
      finalScore,
    });

    res.json({
      ...parsed,

      score: finalScore,

      technicalScore: Math.min(
        100,
        Number(
          (
            finalScore +
            matchedAdvanced.length * 2 +
            matchedFundamentals.length
          ).toFixed(1),
        ),
      ),

      communicationScore:
        communication === "high" ? 85 : communication === "medium" ? 68 : 48,

      practicalReasoningScore:
        depth === "high" ? 88 : depth === "medium" ? 70 : 52,

      roleSpecificScore: Math.min(
        100,
        Number((finalScore + matchedFundamentals.length * 1.5).toFixed(1)),
      ),

      conceptCoverageScore: Math.min(
        100,
        Number(
          (
            matchedFundamentals.length * 8 +
            matchedAdvanced.length * 10
          ).toFixed(1),
        ),
      ),
    });
  } catch (err) {
    console.error("❌ Evaluation Error:", err.message);

    res.json({
      score: 0,
      technicalScore: 0,
      communicationScore: 0,
      practicalReasoningScore: 0,
      roleSpecificScore: 0,
      conceptCoverageScore: 0,

      topic: "Evaluation Failed",

      feedback:
        "The evaluation engine could not reliably analyze this response.",

      acknowledgment: "Alright.",

      missingPoints: [],

      strengths: [],

      followUpQuestion: null,
    });
  }
});
/* ==================================================
   GENERATE CAREER INSIGHT
================================================== */

app.post("/generate-career-insight", async (req, res) => {
  try {
    const { history, role } = req.body;

    if (!history || history.length === 0) {
      return res.json({
        careerInsight:
          "Complete more interviews to unlock AI performance intelligence.",
      });
    }

    const averageScore =
      history.reduce((sum, item) => sum + (item.score || 0), 0) /
      history.length;

    let insight = "";

    if (averageScore >= 80) {
      insight = `Strong progress detected in ${role}. Your interview performance demonstrates high technical readiness and improving communication consistency.`;
    } else if (averageScore >= 60) {
      insight = `You are progressing steadily in ${role}. Focus on improving technical depth, confidence, and real-world scenario explanations.`;
    } else {
      insight = `Foundational gaps still exist in ${role}. More structured practice and concept reinforcement are recommended to improve interview readiness.`;
    }

    res.json({
      careerInsight: insight,
    });
  } catch (err) {
    console.error("❌ Career Insight Error:", err.message);

    res.status(500).json({
      error: "Failed to generate career insight",
    });
  }
});

/* ==================================================
   START SERVER
================================================== */

app.listen(PORT, () => {
  console.log(`🚀 SFDC Interview AI running on port ${PORT}`);
});
