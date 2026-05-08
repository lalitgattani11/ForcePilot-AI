import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

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
    Fresher: "Concepts: OWD, Profiles, Permission Sets, Validation Rules, Standard Objects. NO complex automation.",
    Intermediate: "Focus: Troubleshooting, feature comparisons, realistic mid-sized scenarios. NO enterprise architecture, NO multi-org, NO 1M+ record strategies.",
    Advanced: "Focus: Architecture, Scalability, Governance, LDV, Multi-org, Enterprise Security Design.",
  },
  "Salesforce Apex Developer": {
    Fresher: "Concepts: Collections, SOQL basics, Simple Triggers, DML. NO Async Apex.",
    Intermediate: "Focus: Bulkification, Trigger patterns, Future/Queueable vs Batch, Debugging. NO enterprise framework design.",
    Advanced: "Focus: Integration Architecture, Design Patterns, Enterprise Frameworks, Performance Profiling.",
  },
  "Salesforce LWC Developer": {
    Fresher: "Concepts: @api, @track, Template syntax, Composition. NO LMS/PubSub.",
    Intermediate: "Focus: wire vs imperative, Lifecycle hooks, Parent-Child events, LMS. NO complex state management.",
    Advanced: "Focus: Performance Engineering, Security (LWS), Complex State, Jest Testing Architecture.",
  },
  "Professional Readiness": {
    Fresher: "Focus: Basic self-intro, internship, goals.",
    Intermediate: "Focus: Teamwork, problem-solving, workplace conflict.",
    Advanced: "Focus: Leadership, strategic influence, stakeholder management.",
  }
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
    "What happens when a user tries to delete a record that has a Master-Detail relationship?"
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
    "How do you use the Database.insert method with the allOrNone parameter set to false?"
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
    "How do you handle errors from a wire adapter or an imperative call?"
  ],

  "Professional Readiness": [
    "Tell me about a time you had to collaborate with a difficult team member.",
    "How do you prioritize your tasks when you have multiple competing deadlines?",
    "Describe a workplace challenge you faced and how you resolved it.",
    "What is your approach to learning new technologies or features in Salesforce?",
    "How do you handle receiving critical feedback from a manager or peer?"
  ]
};

/* ==================================================
   HELPERS
================================================== */

function normalizeText(text = "") {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .trim();
}

/**
 * 🔍 Similarity Check Logic (HARD filtering)
 * Rejects questions that share too many significant words with history.
 */
function calculateSimilarity(q1, q2) {
  const clean = (text) => text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3);
    
  const words1 = new Set(clean(q1));
  const words2 = clean(q2);
  
  if (words1.size === 0 || words2.length === 0) return 0;
  
  const intersection = words2.filter(w => words1.has(w));
  return intersection.length / Math.max(words1.size, words2.length);
}

function isDuplicateQuestion(newQuestion, askedQuestions = []) {
  if (!askedQuestions || askedQuestions.length === 0) return false;

  for (const oldQ of askedQuestions) {
    const similarity = calculateSimilarity(newQuestion, oldQ);
    if (similarity > 0.55) { // 55% threshold for concept/paraphrase detection
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
    "security model design"
  ];

  const matched = forbidden.filter(word => lowerQ.includes(word));
  if (matched.length > 0) {
    console.log(`[DIFFICULTY_TRACE] [LEAKAGE_DETECTED] Match: ${matched.join(", ")}`);
    return true;
  }
  return false;
}

/* ==================================================
   DIFFICULTY GUIDELINES (Calibrated)
================================================== */

const DIFFICULTY_GUIDELINES = {
  Fresher: "STRICT: ONLY direct definitions, single concepts, and beginner fundamentals. NO comparisons (A vs B), NO tradeoffs, NO reasoning-heavy questions. One concept only. Keep it very short and direct. Example: 'What is OWD?'",
  Intermediate: "TARGET: 1-3 years experience. Focus on practical application, moderate troubleshooting, feature comparisons (A vs B), and small real-world cases. STRICTLY FORBIDDEN: Enterprise architecture, scalability strategies, optimization for millions of records, multinational org design, performance tuning strategy. Keep scenarios localized and practical. Example: 'When would you use Queueable Apex over a Future method?'",
  Advanced: "TARGET: Senior Developer/Lead/Architect. Focus on high-level reasoning, technical lead practical decisions, optimization, and occasionally enterprise architecture. Mix styles: upgraded fundamentals, reasoning, practical scenarios, and architecture. Example: 'Why are governor limits critical in large projects?' or 'How would you optimize a slow SOQL query?'",
};

function isProjectQuestion(question = "") {
  const lower = question.toLowerCase();
  // Removed "project" as it's too common in technical Salesforce contexts
  const projectKeywords = ["internship", "tell me about yourself", "introduce yourself", "strength", "weakness", "career goal", "why should we hire", "tell me about a time"];
  return projectKeywords.some(keyword => lower.includes(keyword));
}

function getRandomTopic(role, difficulty, askedQuestions = []) {
  const rolePool = ROLE_TOPICS[role] || { 
    Fresher: ["General Concepts"], 
    Intermediate: ["General Concepts"], 
    Advanced: ["General Concepts"] 
  };
  
  const topics = rolePool[difficulty] || rolePool["Intermediate"] || ["General Concepts"];
  
  // Try to find a topic that hasn't been used in recent questions
  const historyText = askedQuestions.join(" ").toLowerCase();
  const unusedTopics = topics.filter(topic => !historyText.includes(topic.toLowerCase()));
  
  const finalPool = unusedTopics.length > 0 ? unusedTopics : topics;
  const selected = finalPool[Math.floor(Math.random() * finalPool.length)];
  
  if (difficulty !== "Fresher") {
    console.log(`[DIFFICULTY_TRACE] [BUCKET_CHECK] Level: ${difficulty} | Bucket: ${difficulty} | Topics Available: ${topics.length} | Unused: ${unusedTopics.length} | Selected: ${selected}`);
  } else {
    console.log(`[TOPIC SELECTION] Role: ${role} | Difficulty: ${difficulty} | Selected: ${selected}`);
  }
  return selected;
}

/* ==================================================
   GENERATE QUESTION
================================================== */

app.post(
  "/generate-question",
  async (req, res) => {

    const {
      role = "Salesforce Admin",
      difficulty = "Beginner",
      askedQuestions = [],
    } = req.body;

    if (difficulty !== "Fresher") {
      console.log(`\n[DIFFICULTY_TRACE] [FLOW_START] Difficulty: ${difficulty} | Role: ${role} | History: ${askedQuestions.length}`);
    } else {
      console.log(`\n[GENERATION START] Role: ${role} | History Size: ${askedQuestions.length}`);
    }

    /* ==================================================
       STRICT INTERMEDIATE GATING
    ================================================== */
    if (difficulty === "Intermediate") {
      console.log(`[DIFFICULTY_TRACE] [INTERMEDIATE_BYPASS] Pulling from hardcoded bank...`);
      const bank = INTERMEDIATE_QUESTION_BANK[role] || ["What is a standard business requirement in Salesforce?"];
      
      // Filter out previously asked questions
      const historySet = new Set(askedQuestions.map(q => q.toLowerCase()));
      const available = bank.filter(q => !historySet.has(q.toLowerCase()));
      
      const pool = available.length > 0 ? available : bank;
      const finalQuestion = pool[Math.floor(Math.random() * pool.length)];
      
      console.log(`[DIFFICULTY_TRACE] [FINAL_SENT] Level: Intermediate | Question: "${finalQuestion}"`);
      return res.json({ text: finalQuestion });
    }

    try {

      let generatedQuestion = "";
      let attempts = 0;
      let selectedTopic = "";

      while (attempts < 3) {
        attempts++;
        selectedTopic = getRandomTopic(role, difficulty, askedQuestions);
        
        if (difficulty !== "Fresher") {
          console.log(`[DIFFICULTY_TRACE] [ATTEMPT_${attempts}] Topic: ${selectedTopic}`);
        } else {
          console.log(`[DIFFICULTY_TRACE] Attempt ${attempts}: Selected Topic = ${selectedTopic}`);
        }

        const currentConstraints = (ROLE_CONSTRAINTS[role] && ROLE_CONSTRAINTS[role][difficulty]) 
          ? ROLE_CONSTRAINTS[role][difficulty] 
          : "Focus on standard role expectations.";

        const prompt = `
You are a senior Salesforce technical interviewer.
TRACK: ${role}
LEVEL: ${difficulty}
CONSTRAINTS: ${currentConstraints}
GUIDELINE: ${DIFFICULTY_GUIDELINES[difficulty] || DIFFICULTY_GUIDELINES.Intermediate}
PRIMARY FOCUS: ${selectedTopic}

==================================================
PREVIOUSLY ASKED (STRICT EXCLUSION):
${askedQuestions.length ? askedQuestions.join("\n") : "None"}
==================================================

CRITICAL RULES:
- Generate ONE fresh question appropriate for a ${difficulty} level.
- ${difficulty === 'Fresher' ? 'Avoid complex scenarios. Direct conceptual or simple usage questions preferred.' : ''}
- ${difficulty === 'Intermediate' ? 'Practical, localized, hands-on scenarios ONLY. NO enterprise-wide architecture.' : ''}
- ${difficulty === 'Advanced' ? 'Mix question styles: 70% direct technical reasoning/optimization (no giant scenario) and 30% complex enterprise architecture scenarios.' : ''}
- NEVER repeat or paraphrase previous questions.
- NEVER repeat same concepts.
- Return ONLY the question.
`;

        console.log(`[DIFFICULTY_TRACE] AI Prompt Construction:\n--- PROMPT START ---\n${prompt}\n--- PROMPT END ---`);

        const response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              temperature: 0.8,
              messages: [
                { role: "system", content: "Senior Salesforce Interviewer. Return ONLY the question." },
                { role: "user", content: prompt },
              ],
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data?.error?.message || "Groq error");

        generatedQuestion = data?.choices?.[0]?.message?.content?.trim();
        
        if (difficulty !== "Fresher") {
          console.log(`[DIFFICULTY_TRACE] [AI_RAW_OUTPUT] Level: ${difficulty} | Raw: "${generatedQuestion.substring(0, 100)}..."`);
        } else {
          console.log(`[DIFFICULTY_TRACE] AI Generated Raw: "${generatedQuestion}"`);
        }

        if (!generatedQuestion) {
          console.log(`[DIFFICULTY_TRACE] [REJECTED] Reason: Empty response.`);
          continue;
        }

        const isDuplicate = isDuplicateQuestion(generatedQuestion, askedQuestions);
        const isInvalidHR = role !== "Professional Readiness" && isProjectQuestion(generatedQuestion);
        const isLeakage = isAdvancedLeakage(generatedQuestion, difficulty);

        if (isDuplicate) console.log(`[DIFFICULTY_TRACE] [REJECTED] Reason: Duplicate detected.`);
        if (isInvalidHR) console.log(`[DIFFICULTY_TRACE] [REJECTED] Reason: HR question in technical role.`);
        if (isLeakage) console.log(`[DIFFICULTY_TRACE] [REJECTED] Reason: Advanced concept leakage (HARD GATE).`);

        if (!isDuplicate && !isInvalidHR && !isLeakage) {
          if (difficulty !== "Fresher") {
            console.log(`[DIFFICULTY_TRACE] [ACCEPTED] Level: ${difficulty} | Topic: ${selectedTopic}`);
          } else {
            console.log(`[DIFFICULTY_TRACE] Generation Accepted! Topic: ${selectedTopic}`);
          }
          break;
        }
      }

      /* Fallback if all attempts fail or are duplicates */
      if (!generatedQuestion || isDuplicateQuestion(generatedQuestion, askedQuestions) || isAdvancedLeakage(generatedQuestion, difficulty)) {
        console.log(`[DIFFICULTY_TRACE] [FALLBACK_TRIGGERED] Reason: All AI attempts rejected for ${difficulty}.`);
        
        // Hardcoded safe fallback based on level
        if (difficulty === "Fresher") {
          generatedQuestion = `Could you explain the basic purpose of ${selectedTopic} in Salesforce?`;
        } else if (difficulty === "Intermediate") {
          generatedQuestion = `When would you typically choose to use ${selectedTopic} in a standard business requirement, and what are its main advantages?`;
        } else {
          generatedQuestion = `Could you discuss the architectural implications and scalability considerations of implementing ${selectedTopic} in a global enterprise environment?`;
        }
      }

      if (difficulty !== "Fresher") {
        console.log(`[DIFFICULTY_TRACE] [FINAL_SENT] Level: ${difficulty} | Question: "${generatedQuestion}"`);
      } else {
        console.log(`[DIFFICULTY_TRACE] Final Question Sent: "${generatedQuestion}"`);
      }
      res.json({ text: generatedQuestion });

    } catch (err) {
      console.error("❌ Generation Error:", err.message);
      res.status(500).json({ error: "Failed to generate question" });
    }
  }
);

/* ==================================================
   EVALUATE ANSWER
================================================== */

app.post("/evaluate", async (req, res) => {

  const {
    question,
    answer,
    role,
    difficulty,
    personality,
  } = req.body;

  const persona =
    PERSONALITIES[personality] ||
    PERSONALITIES["Professional"];

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

    const normalizedAnswer =
      normalizeText(answer);

    const isSkipAnswer =
      skipPatterns.some((pattern) =>
        normalizedAnswer.includes(
          normalizeText(pattern)
        )
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
        feedback:
          "Candidate skipped the question.",
        acknowledgment:
          "Alright.",
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

- Evaluate technically
- No coaching tone
- No teaching tone
- No motivational tone
- Keep acknowledgment neutral

ALLOWED ACKNOWLEDGMENTS:
- "Alright."
- "Okay."
- "Understood."
- "Got it."
- "Hmm."

==================================================

RETURN ONLY JSON:

{
  "score": number,
  "technicalScore": number,
  "communicationScore": number,
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

    const response =
      await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            model:
              "llama-3.3-70b-versatile",

            temperature: 0.1,

            messages: [
              {
                role: "system",

                content:
                  "Return ONLY valid JSON.",
              },

              {
                role: "user",

                content: prompt,
              },
            ],
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error?.message ||
          "Groq API error"
      );
    }

    let text =
      data?.choices?.[0]?.message
        ?.content || "";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed =
      JSON.parse(text);

    res.json(parsed);

  } catch (err) {

    console.error(
      "❌ Evaluation Error:",
      err.message
    );

    res.json({
      score: 5,
      technicalScore: 5,
      communicationScore: 5,
      practicalReasoningScore: 5,
      roleSpecificScore: 5,
      conceptCoverageScore: 5,
      topic: "General",
      feedback:
        "Standard evaluation applied.",
      acknowledgment:
        "Alright.",
      missingPoints: [],
      strengths: [],
      followUpQuestion: null,
    });
  }
});

/* ==================================================
   START SERVER
================================================== */

app.listen(PORT, () => {

  console.log(
    `🚀 SFDC Interview AI running on port ${PORT}`
  );
});