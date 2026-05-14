import type { Question, Role, Difficulty } from './types';

export const ALL_QUESTIONS: Question[] = [
  // ==================================================
  // 1. SALESFORCE ADMIN
  // ==================================================
  
  // FRESHER (0-1 YEAR)
  { id: 'adm_f_1', text: 'What is the difference between a Profile and a Permission Set?', category: 'Security', idealAnswer: 'Profile is base access, Permission Set extends it.', difficulty: 'Fresher', concepts: [] },
  { id: 'adm_f_2', text: 'Explain the difference between a Lookup and a Master-Detail relationship.', category: 'Data Modeling', idealAnswer: 'Master-Detail is tight coupling, Lookup is loose coupling.', difficulty: 'Fresher', concepts: [] },
  { id: 'adm_f_3', text: 'What is Organization-Wide Defaults (OWD)?', category: 'Security', idealAnswer: 'Baseline level of access for the most restricted user.', difficulty: 'Fresher', concepts: [] },
  { id: 'adm_f_4', text: 'What are Validation Rules?', category: 'Automation', idealAnswer: 'Enforce data quality by checking criteria before save.', difficulty: 'Fresher', concepts: [] },
  { id: 'adm_f_5', text: 'What is a Roll-up Summary field?', category: 'Objects & Fields', idealAnswer: 'Aggregates child data on a parent in a master-detail relationship.', difficulty: 'Fresher', concepts: [] },
  { id: 'adm_f_6', text: 'Explain Record Types.', category: 'UI & Layouts', idealAnswer: 'Allows different business processes and picklist values for different users.', difficulty: 'Fresher', concepts: [] },
  { id: 'adm_f_7', text: 'What is the purpose of the Recycle Bin in Salesforce?', category: 'Data Management', idealAnswer: 'Stores deleted records for 15 days.', difficulty: 'Fresher', concepts: [] },
  { id: 'adm_f_8', text: 'What is a Junction Object?', category: 'Data Modeling', idealAnswer: 'A custom object with two master-detail relationships to create many-to-many.', difficulty: 'Fresher', concepts: [] },

  // INTERMEDIATE (1-3 YEARS)
  { id: 'adm_i_1', text: 'Scenario: A user can see a record but cannot edit a specific field. What layers would you troubleshoot?', category: 'Security', idealAnswer: 'Check FLS, Page Layout, and Validation Rules.', difficulty: 'Intermediate', concepts: [] },
  { id: 'adm_i_2', text: 'How do Record-Triggered Flows differ from Apex Triggers?', category: 'Automation', idealAnswer: 'Flows are declarative and handled by Flow Engine; Apex is programmatic.', difficulty: 'Intermediate', concepts: [] },
  { id: 'adm_i_3', text: 'What are Permission Set Groups and Muting Permission Sets?', category: 'Security', idealAnswer: 'Groups bundle sets; Muting disables specific permissions within a bundle.', difficulty: 'Intermediate', concepts: [] },
  { id: 'adm_i_4', text: 'Explain the difference between Import Wizard and Data Loader.', category: 'Data Management', idealAnswer: 'Wizard is browser-based (<50k); Data Loader is client-based (up to 5M).', difficulty: 'Intermediate', concepts: [] },
  { id: 'adm_i_5', text: 'What is the purpose of Custom Metadata Types over Custom Settings?', category: 'Architecture', idealAnswer: 'Metadata can be deployed with records and used in formulas/flows.', difficulty: 'Intermediate', concepts: [] },
  { id: 'adm_i_6', text: 'How do you set up an automated Approval Process?', category: 'Automation', idealAnswer: 'Define entry criteria, approvers, and sequence of steps.', difficulty: 'Intermediate', concepts: [] },

  // ADVANCED (3+ YEARS)
  { id: 'adm_a_1', text: 'Design a sharing architecture for a private org with 500k+ records and complex territory logic.', category: 'Architecture', idealAnswer: 'Use Territory Management and optimized Sharing Rules.', difficulty: 'Advanced', concepts: [] },
  { id: 'adm_a_2', text: 'Strategy for migrating legacy Process Builders to a high-performance Flow architecture.', category: 'Governance', idealAnswer: 'Consolidate into single Before/After flows using subflows.', difficulty: 'Advanced', concepts: [] },
  { id: 'adm_a_3', text: 'How do you handle Large Data Volume (LDV) in reporting and dashboard performance?', category: 'Performance', idealAnswer: 'Use skinny tables, indexed fields, and reporting snapshots.', difficulty: 'Advanced', concepts: [] },
  { id: 'adm_a_4', text: 'Explain External ID use cases in multi-org integration scenarios.', category: 'Integrations', idealAnswer: 'Matching records from external systems without needing Salesforce IDs.', difficulty: 'Advanced', concepts: [] },

  // ==================================================
  // 2. SALESFORCE APEX DEVELOPER
  // ==================================================

  // FRESHER (0-1 YEAR)
  { id: 'apex_f_1', text: 'What is a "Governor Limit" and why are they necessary?', category: 'Core Apex', idealAnswer: 'Limits on resources to ensure multi-tenant stability.', difficulty: 'Fresher', concepts: [] },
  { id: 'apex_f_2', text: 'Difference between Trigger.new and Trigger.old?', category: 'Triggers', idealAnswer: 'New has upcoming state, Old has database state.', difficulty: 'Fresher', concepts: [] },
  { id: 'apex_f_3', text: 'What are the main collection types in Apex?', category: 'Core Apex', idealAnswer: 'List, Set, and Map.', difficulty: 'Fresher', concepts: [] },
  { id: 'apex_f_4', text: 'How do you write a SOQL query in Apex?', category: 'SOQL', idealAnswer: 'Using bracket syntax: [SELECT Id FROM Account].', difficulty: 'Fresher', concepts: [] },
  { id: 'apex_f_5', text: 'What is the purpose of @isTest in Apex?', category: 'Testing', idealAnswer: 'Marks a class as a test class, doesn\'t count toward org limits.', difficulty: 'Fresher', concepts: [] },
  { id: 'apex_f_6', text: 'Explain the Database.insert() method vs simple insert.', category: 'DML', idealAnswer: 'Database methods allow partial success.', difficulty: 'Fresher', concepts: [] },
  { id: 'apex_f_7', text: 'What is an Apex Trigger handler pattern?', category: 'Triggers', idealAnswer: 'Removing logic from triggers into a separate utility class.', difficulty: 'Fresher', concepts: [] },
  { id: 'apex_f_8', text: 'How do you handle exceptions in Apex?', category: 'Core Apex', idealAnswer: 'Using try-catch-finally blocks.', difficulty: 'Fresher', concepts: [] },

  // INTERMEDIATE (1-3 YEARS)
  { id: 'apex_i_1', text: 'How do you prevent Trigger Recursion in Apex?', category: 'Triggers', idealAnswer: 'Use a static Boolean variable in a handler class.', difficulty: 'Intermediate', concepts: [] },
  { id: 'apex_i_2', text: 'When should you use Queueable Apex instead of @future methods?', category: 'Async Apex', idealAnswer: 'Support for complex types and job chaining.', difficulty: 'Intermediate', concepts: [] },
  { id: 'apex_i_3', text: 'Explain "Bulkification" and SOQL-in-loops consequences.', category: 'Performance', idealAnswer: 'Avoiding query limits by handling collections.', difficulty: 'Intermediate', concepts: [] },
  { id: 'apex_i_4', text: 'What is the purpose of @testSetup?', category: 'Testing', idealAnswer: 'Create test data once for all methods in a class.', difficulty: 'Intermediate', concepts: [] },
  { id: 'apex_i_5', text: 'Explain "with sharing" vs "without sharing" keywords.', category: 'Security', idealAnswer: 'Enforcing or bypassing OWD and sharing rules.', difficulty: 'Intermediate', concepts: [] },
  { id: 'apex_i_6', text: 'How do you perform a REST callout from Apex?', category: 'Integrations', idealAnswer: 'Using Http and HttpRequest classes.', difficulty: 'Intermediate', concepts: [] },

  // ADVANCED (3+ YEARS)
  { id: 'apex_a_1', text: 'Explain a Scalable Trigger Framework design.', category: 'Architecture', idealAnswer: 'Dispatcher-Handler pattern with bypass capabilities.', difficulty: 'Advanced', concepts: [] },
  { id: 'apex_a_2', text: 'SOQL optimization for Large Data Volumes (LDV).', category: 'Optimization', idealAnswer: 'Selective queries on indexed fields.', difficulty: 'Advanced', concepts: [] },
  { id: 'apex_a_3', text: 'Transaction Control and Savepoints in complex logic.', category: 'Integrations', idealAnswer: 'Ensuring atomicity via Database.setSavepoint().', difficulty: 'Advanced', concepts: [] },
  { id: 'apex_a_4', text: 'Explain the use of Schema.getGlobalDescribe() and its performance cost.', category: 'Dynamic Apex', idealAnswer: 'Accessing metadata dynamically; high heap/time cost.', difficulty: 'Advanced', concepts: [] },
  { id: 'apex_a_5', text: 'How would you implement a custom Apex log framework?', category: 'Governance', idealAnswer: 'Using platform events or custom objects for persistence.', difficulty: 'Advanced', concepts: [] },

  // ==================================================
  // 3. SALESFORCE LWC DEVELOPER
  // ==================================================

  // FRESHER (0-1 YEAR)
  { id: 'lwc_f_1', text: 'Core files in an LWC component folder?', category: 'LWC Core', idealAnswer: 'HTML, JS, and XML metadata.', difficulty: 'Fresher', concepts: [] },
  { id: 'lwc_f_2', text: 'How to pass data from Parent to Child?', category: 'Communication', idealAnswer: 'Using @api properties.', difficulty: 'Fresher', concepts: [] },
  { id: 'lwc_f_3', text: 'What is the @wire service?', category: 'Data Integration', idealAnswer: 'Reactive service to read Salesforce data.', difficulty: 'Fresher', concepts: [] },
  { id: 'lwc_f_4', text: 'How to handle user clicks in LWC?', category: 'LWC Core', idealAnswer: 'onclick attribute mapping to a JS function.', difficulty: 'Fresher', concepts: [] },
  { id: 'lwc_f_5', text: 'Purpose of the meta.xml file?', category: 'LWC Core', idealAnswer: 'Defines metadata like targets and API version.', difficulty: 'Fresher', concepts: [] },
  { id: 'lwc_f_6', text: 'How to perform conditional rendering?', category: 'LWC Core', idealAnswer: 'Using lwc:if directives.', difficulty: 'Fresher', concepts: [] },
  { id: 'lwc_f_7', text: 'What is SLDS?', category: 'UI Features', idealAnswer: 'Salesforce Lightning Design System for styling.', difficulty: 'Fresher', concepts: [] },
  { id: 'lwc_f_8', text: 'Difference between LWC and Aura?', category: 'Core', idealAnswer: 'LWC is built on web standards; Aura is proprietary.', difficulty: 'Fresher', concepts: [] },

  // INTERMEDIATE (1-3 YEARS)
  { id: 'lwc_i_1', text: '@wire vs Imperative Apex calls?', category: 'Data Integration', idealAnswer: 'Wire is reactive; Imperative is on-demand.', difficulty: 'Intermediate', concepts: [] },
  { id: 'lwc_i_2', text: 'Communication between unrelated components?', category: 'LMS', idealAnswer: 'Using Lightning Message Service.', difficulty: 'Intermediate', concepts: [] },
  { id: 'lwc_i_3', text: 'Explain lifecycle hooks in LWC.', category: 'Lifecycle', idealAnswer: 'connectedCallback, renderedCallback, etc.', difficulty: 'Intermediate', concepts: [] },
  { id: 'lwc_i_4', text: 'How to use NavigationMixin?', category: 'UI Features', idealAnswer: 'To navigate to records, pages, or external URLs.', difficulty: 'Intermediate', concepts: [] },
  { id: 'lwc_i_5', text: 'What is Jest and why use it?', category: 'Testing', idealAnswer: 'Unit testing framework for LWC JavaScript.', difficulty: 'Intermediate', concepts: [] },
  { id: 'lwc_i_6', text: 'How do you handle errors in wire methods?', category: 'LWC Core', idealAnswer: 'By checking {data, error} in the wire function.', difficulty: 'Intermediate', concepts: [] },

  // ADVANCED (3+ YEARS)
  { id: 'lwc_a_1', text: 'Shadow DOM polyfill and LWS implications.', category: 'Architecture', idealAnswer: 'Encapsulation and security across browsers.', difficulty: 'Advanced', concepts: [] },
  { id: 'lwc_a_2', text: 'Performance optimization for complex LWC grids.', category: 'Performance', idealAnswer: 'Lazy loading and limited re-rendering.', difficulty: 'Advanced', concepts: [] },
  { id: 'lwc_a_3', text: 'Customizing standard Lightning Data Table behaviors.', category: 'UI Features', idealAnswer: 'Extending the base class for custom cell types.', difficulty: 'Advanced', concepts: [] },
  { id: 'lwc_a_4', text: 'State Management strategies in large LWC apps.', category: 'Architecture', idealAnswer: 'Using singleton services or LMS for global state.', difficulty: 'Advanced', concepts: [] },
  { id: 'lwc_a_5', text: 'Explain the security model of LWS (Lightning Web Security).', category: 'Security', idealAnswer: 'Namespace-level isolation and improved performance over Locker.', difficulty: 'Advanced', concepts: [] },

  // ==================================================
  // 4. UNIVERSAL / SCENARIO / HR
  // ==================================================
  { id: 'gen_f_1', text: 'Project challenge you faced and resolved.', category: 'Experience', idealAnswer: 'Logic, troubleshooting, and results.', difficulty: 'Fresher', concepts: [] },
  { id: 'gen_f_2', text: 'Why Salesforce as a career?', category: 'Career', idealAnswer: 'Passion for the ecosystem.', difficulty: 'Fresher', concepts: [] },
  { id: 'gen_i_1', text: 'Experience with CI/CD and Git.', category: 'DevOps', idealAnswer: 'Branching and automated deployments.', difficulty: 'Intermediate', concepts: [] },
  { id: 'gen_a_1', text: 'System design for a multi-org enterprise.', category: 'Architecture', idealAnswer: 'Governance, hub-and-spoke models.', difficulty: 'Advanced', concepts: [] }
];

export const TOTAL_QUESTIONS = 10;

const shuffleAndPick = <T>(array: T[], count: number): T[] => {
  if (count <= 0) return [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  
  // If we don't have enough, return all we have
  if (shuffled.length <= count) return shuffled;
  return shuffled.slice(0, count);
};

export const getQuestionsForInterview = (role: Role, difficulty: Difficulty): Question[] => {
  const rolePool = ALL_QUESTIONS.filter(q => {
    if (role === 'Salesforce Admin') return q.id.startsWith('adm_') || q.id.startsWith('gen_');
    if (role === 'Salesforce Apex Developer') return q.id.startsWith('apex_') || q.id.startsWith('gen_');
    if (role === 'Salesforce LWC Developer') return q.id.startsWith('lwc_') || q.id.startsWith('gen_');
    return false;
  });

  const easy = rolePool.filter(q => q.difficulty === 'Fresher');
  const medium = rolePool.filter(q => q.difficulty === 'Intermediate');
  const hard = rolePool.filter(q => q.difficulty === 'Advanced');
  
  let selected: Question[];
  
  // Weights to ensure exactly 10
  if (difficulty === 'Fresher') {
    selected = [
      ...shuffleAndPick(easy, 8),
      ...shuffleAndPick(medium, 2)
    ];
  } else if (difficulty === 'Intermediate') {
    selected = [
      ...shuffleAndPick(easy, 3),
      ...shuffleAndPick(medium, 6),
      ...shuffleAndPick(hard, 1)
    ];
  } else {
    selected = [
      ...shuffleAndPick(easy, 2),
      ...shuffleAndPick(medium, 3),
      ...shuffleAndPick(hard, 5)
    ];
  }

  // FALLBACK: If total is not 10 due to small pool, fill from rolePool
  if (selected.length < TOTAL_QUESTIONS) {
    const remainingCount = TOTAL_QUESTIONS - selected.length;
    const usedIds = new Set(selected.map(q => q.id));
    const unusedPool = rolePool.filter(q => !usedIds.has(q.id));
    selected = [...selected, ...shuffleAndPick(unusedPool, remainingCount)];
  }

  // FINAL SAFETY: If still not 10 (extremely unlikely with expanded pool), return exactly 10
  return selected.sort(() => 0.5 - Math.random()).slice(0, TOTAL_QUESTIONS);
};

export const generateOverallFeedback = (avgScore: number, difficulty: Difficulty): string => {
  if (avgScore >= 8.5) return `Exceptional performance for a ${difficulty} tier. Systems logic is architectural-grade.`;
  if (avgScore >= 7) return `Strong ${difficulty} performance. Solid technical grasp with minor implementation gaps.`;
  if (avgScore >= 5) return `Moderate ${difficulty} performance. Foundations are clear but require more practical rigor.`;
  return `Needs Improvement. Insufficient technical depth for ${difficulty} requirements. Focused practice on core platform concepts recommended.`;
};
