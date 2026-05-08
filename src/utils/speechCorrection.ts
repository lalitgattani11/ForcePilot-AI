/**
 * 🚀 Advanced Salesforce Technical Language Engine (ASTLE)
 * Multi-layer correction engine for technical voice recognition
 */

export type SalesforceDomain = 'ADMIN' | 'APEX' | 'LWC' | 'INTEGRATION' | 'GENERAL';

interface CorrectionRule {
  wrong: string | RegExp;
  right: string;
  domain?: SalesforceDomain;
  phonetic?: boolean;
}

// 📚 LAYER 2 & 3: TECHNICAL & PHONETIC DICTIONARY
const TECHNICAL_RULES: CorrectionRule[] = [
  // --- APEX CORE & LOGIC ---
  { wrong: /\b(trick is block|trick is|try catch|try and catch)\b/gi, right: "try-catch block", domain: 'APEX', phonetic: true },
  { wrong: /\b(goal winner limits|go inner limits|goal winner|governer limits|governor limit)\b/gi, right: "governor limits", domain: 'APEX', phonetic: true },
  { wrong: /\b(so cool query|so cool|circle query|so call|s o q l|socl)\b/gi, right: "SOQL", domain: 'APEX', phonetic: true },
  { wrong: /\b(sos cell|s o s l|sauce el|sauce ul)\b/gi, right: "SOSL", domain: 'APEX', phonetic: true },
  { wrong: /\b(dml operations|demel|d m l)\b/gi, right: "DML operations", domain: 'APEX', phonetic: true },
  { wrong: /\b(cue able apex|cable apex|cubal apex)\b/gi, right: "Queueable Apex", domain: 'APEX', phonetic: true },
  { wrong: /\b(batch a peps|batch of x|patch apex)\b/gi, right: "Batch Apex", domain: 'APEX', phonetic: true },
  { wrong: /\b(future method|at future)\b/gi, right: "@future method", domain: 'APEX' },
  { wrong: /\b(test setup|at test setup)\b/gi, right: "@testSetup", domain: 'APEX' },
  { wrong: /\b(wrapper class|rapper class)\b/gi, right: "wrapper class", domain: 'APEX', phonetic: true },
  { wrong: /\b(bulkification|bulkify|bulk fine)\b/gi, right: "bulkification", domain: 'APEX', phonetic: true },
  { wrong: /\b(save point|safe point)\b/gi, right: "savepoint", domain: 'APEX', phonetic: true },
  { wrong: /\b(roll back|rule back)\b/gi, right: "rollback", domain: 'APEX', phonetic: true },
  { wrong: /\b(json serialize|json dot serialize|jason serialize)\b/gi, right: "JSON.serialize", domain: 'APEX' },
  { wrong: /\b(trigger old|trigger dot old)\b/gi, right: "Trigger.old", domain: 'APEX' },
  { wrong: /\b(trigger new|trigger dot new)\b/gi, right: "Trigger.new", domain: 'APEX' },
  { wrong: /\b(database insert|database dot insert)\b/gi, right: "Database.insert", domain: 'APEX' },

  // --- LWC & FRONTEND ---
  { wrong: /\b(lightning web components|lwcs)\b/gi, right: "Lightning Web Components", domain: 'LWC' },
  { wrong: /\b(wire method|wire me thud|at wire)\b/gi, right: "@wire method", domain: 'LWC', phonetic: true },
  { wrong: /\b(track|at track)\b/gi, right: "@track", domain: 'LWC' },
  { wrong: /\b(api decorator|at api)\b/gi, right: "@api decorator", domain: 'LWC' },
  { wrong: /\b(imperative apex|imperative a peps)\b/gi, right: "imperative Apex", domain: 'LWC', phonetic: true },
  { wrong: /\b(lightning message service|lms|l m s)\b/gi, right: "Lightning Message Service", domain: 'LWC' },
  { wrong: /\b(pub sub|pop sub|pub some)\b/gi, right: "pub-sub", domain: 'LWC', phonetic: true },
  { wrong: /\b(shadow dom|shadow down)\b/gi, right: "Shadow DOM", domain: 'LWC', phonetic: true },
  { wrong: /\b(connected callback|connected call back)\b/gi, right: "connectedCallback", domain: 'LWC' },
  { wrong: /\b(rendered callback|rendered call back)\b/gi, right: "renderedCallback", domain: 'LWC' },
  { wrong: /\b(navigation mixin|navigation mix in)\b/gi, right: "NavigationMixin", domain: 'LWC' },
  { wrong: /\b(get record|get records)\b/gi, right: "getRecord", domain: 'LWC' },

  // --- ADMIN & SECURITY ---
  { wrong: /\b(role hierarchy|rule hierarchy)\b/gi, right: "role hierarchy", domain: 'ADMIN', phonetic: true },
  { wrong: /\b(sharing rules|sharing tools)\b/gi, right: "sharing rules", domain: 'ADMIN', phonetic: true },
  { wrong: /\b(owd|o w d|org wide defaults|organization wide defaults)\b/gi, right: "OWD", domain: 'ADMIN' },
  { wrong: /\b(fls|f l s|field level security)\b/gi, right: "FLS", domain: 'ADMIN' },
  { wrong: /\b(crud|c r u d|create read update delete)\b/gi, right: "CRUD", domain: 'ADMIN' },
  { wrong: /\b(validation rules|validation rolls)\b/gi, right: "validation rules", domain: 'ADMIN', phonetic: true },
  { wrong: /\b(master detailed|master detail|master retail)\b/gi, right: "master-detail", domain: 'ADMIN', phonetic: true },
  { wrong: /\b(lookup relationship|look up relationship)\b/gi, right: "lookup relationship", domain: 'ADMIN' },
  { wrong: /\b(junction object|conjunction object)\b/gi, right: "junction object", domain: 'ADMIN', phonetic: true },
  { wrong: /\b(permission set|permission sets|permission seat)\b/gi, right: "permission set", domain: 'ADMIN', phonetic: true },
  { wrong: /\b(custom metadata|custom meta data)\b/gi, right: "custom metadata", domain: 'ADMIN' },
  { wrong: /\b(record triggered flow|record trigger flow)\b/gi, right: "record-triggered flow", domain: 'ADMIN' },

  // --- GENERAL & INFRA ---
  { wrong: /\b(sfdc|sales force|s f d c)\b/gi, right: "Salesforce", domain: 'GENERAL' },
  { wrong: /\b(ci cd|c i c d|sea i see d)\b/gi, right: "CI/CD", domain: 'GENERAL', phonetic: true },
  { wrong: /\b(rest api|rest a p i)\b/gi, right: "REST API", domain: 'GENERAL' },
  { wrong: /\b(soap api|soap a p i)\b/gi, right: "SOAP API", domain: 'GENERAL' },
  { wrong: /\b(sandbox|sand box)\b/gi, right: "sandbox", domain: 'GENERAL' },
];

// 🚫 LAYER 1: FILLER SOUNDS TO STRIP
const FILLERS = [
  "umm", "um", "ah", "uh", "actually", "basically", "like", "sort of", 
  "kind of", "you know", "i mean", "right", "so yeah", "basically"
];

/**
 * 🧠 LAYER 1: RAW TRANSCRIPT CLEANUP
 */
const cleanupRawTranscript = (text: string): string => {
  let cleaned = text;
  
  // Remove filler words
  FILLERS.forEach(filler => {
    // Matches filler words at the start, end, or middle, ignoring case
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    cleaned = cleaned.replace(regex, " ");
  });

  // Fix duplicated words (e.g. "the the", "is is")
  cleaned = cleaned.replace(/\b(\w+)\s+\1\b/gi, "$1");

  // Normalize whitespace
  return cleaned.replace(/\s+/g, " ").trim();
};

/**
 * 🧠 LAYER 2 & 3: TECHNICAL & PHONETIC NORMALIZATION
 */
const applyTechnicalRules = (text: string, domain: SalesforceDomain): string => {
  let processed = text;

  // Prioritize rules matching the current domain, then fallback to general
  const sortedRules = [...TECHNICAL_RULES].sort((a, b) => {
    if (a.domain === domain && b.domain !== domain) return -1;
    if (b.domain === domain && a.domain !== domain) return 1;
    return 0;
  });

  sortedRules.forEach(rule => {
    processed = processed.replace(rule.wrong, rule.right);
  });

  return processed;
};

/**
 * 🧠 LAYER 4: CONTEXT-AWARE GRAMMAR POLISH
 */
const polishGrammar = (text: string): string => {
  if (!text) return "";
  
  let polished = text;

  // Technical Autocapitalization Standard
  const CAPS = ["LWC", "SOQL", "SOSL", "DML", "CRUD", "FLS", "OWD", "REST", "SOAP", "XML", "JSON", "UAT", "CI/CD", "UI", "DOM", "API", "URL", "HTML", "JS", "CSS"];
  CAPS.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    polished = polished.replace(regex, word); // Ensure correct casing
  });

  // Capitalize first letter
  polished = polished.charAt(0).toUpperCase() + polished.slice(1);

  // Auto-punctuation for complete sentences (heuristic: longer than 15 chars and no ending punctuation)
  if (polished.length > 15 && !/[.!?]$/.test(polished)) {
    polished += ".";
  }

  return polished;
};

/**
 * 🚀 MAIN ENGINE: interpretTranscript
 * Executes the multi-layer pipeline on the raw speech input.
 */
export const interpretTranscript = (raw: string, domain: SalesforceDomain = 'GENERAL', previousContext?: string): string => {
  if (!raw) return "";

  // 1. Clean raw noise
  let processed = cleanupRawTranscript(raw);

  // 2 & 3. Apply technical terminology and phonetic matching
  processed = applyTechnicalRules(processed, domain);

  // Context-aware reconstruction (heuristic based)
  // If the user says "trigger old" and we know they mean Trigger.old, we already handled it in Layer 2.
  // But if there's advanced logic needed based on previousContext, it goes here.
  // (e.g. if context was 'security', bias 'row' -> 'role')
  if (previousContext && previousContext.toLowerCase().includes('security')) {
     processed = processed.replace(/\brow\b/gi, 'role');
  }

  // 4. Grammar polish
  processed = polishGrammar(processed);

  return processed;
};
