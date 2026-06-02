export interface BlogPostSection {
  type: 'paragraph' | 'heading-2' | 'heading-3' | 'code' | 'callout' | 'table' | 'list';
  text?: string;
  code?: string;
  language?: string;
  title?: string;
  items?: string[];
  tableHeaders?: string[];
  tableRows?: string[][];
  calloutType?: 'info' | 'warning' | 'tip';
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  publishDate: string;
  author: string;
  authorRole: string;
  readingTime: string;
  category: string;
  tags: string[];
  gradient: string; // Tailwind class gradient for the cinematic card cover
  icon: string; // The type of icon to show
  content: BlogPostSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'Mastering Salesforce Governor Limits: The Architect\'s Guide',
    description: 'Learn advanced bulkification, CPU time optimization, dynamic Heap limit management, and how to design Salesforce architectures that never hit limits.',
    slug: 'mastering-salesforce-governor-limits-architect-guide',
    publishDate: 'June 2, 2026',
    author: 'Alex Rivera',
    authorRole: 'Principal Salesforce Architect',
    readingTime: '8 min read',
    category: 'Apex & Architecture',
    tags: ['Salesforce Development', 'Governor Limits', 'Apex', 'Performance'],
    gradient: 'from-emerald-600/20 via-emerald-500/10 to-transparent',
    icon: 'ShieldCheck',
    content: [
      {
        type: 'paragraph',
        text: 'Salesforce is a multi-tenant platform. This means your code runs in a shared environment where resources like database processing, memory, and CPU time are shared with thousands of other customers. To prevent poorly written code from monopolizing these resources, Salesforce enforces strict execution boundaries known as Governor Limits. Understanding how to work within these boundaries is the difference between a Junior developer and a Senior Architect.'
      },
      {
        type: 'heading-2',
        text: 'Core Execution Limits You Must Master'
      },
      {
        type: 'paragraph',
        text: 'Salesforce has two main categories of limits: synchronous and asynchronous. Synchronous limits are enforced per-transaction, while asynchronous jobs (Queueable, Batch, Scheduled) have higher allocations.'
      },
      {
        type: 'table',
        tableHeaders: ['Limit Name', 'Synchronous Limit', 'Asynchronous Limit', 'Architectural Strategy'],
        tableRows: [
          ['Total SOQL Queries', '100', '200', 'Bulkify SOQL; query outside loops; leverage maps.'],
          ['Total DML Statements', '150', '150', 'Consolidate updates; perform single operations on lists.'],
          ['Maximum CPU Time', '10,000 ms', '60,000 ms', 'Avoid nested loops; optimize maps; move logic to async.'],
          ['Maximum Heap Size', '6 MB', '12 MB', 'Use SOQL for loops; nullify heavy variables; select only needed fields.']
        ]
      },
      {
        type: 'heading-2',
        text: 'Bulkification Best Practices: Writing Scale-Safe Apex'
      },
      {
        type: 'paragraph',
        text: 'Bulkification is the design pattern of ensuring your Apex code can handle multiple records efficiently. Never write SOQL or DML inside for loops. Doing so is a fast track to System.LimitException errors.'
      },
      {
        type: 'code',
        language: 'apex',
        code: `// WEAK: Query inside loop (Hits 100 limit quickly)
for (Account acc : Trigger.new) {
    List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId = :acc.Id];
}

// STRONG: Bulkified using Map & Single Query
Set<Id> accountIds = new Set<Id>();
for (Account acc : Trigger.new) {
    accountIds.add(acc.Id);
}
Map<Id, Account> accountsWithContacts = new Map<Id, Account>(
    [SELECT Id, (SELECT Id FROM Contacts) FROM Account WHERE Id IN :accountIds]
);`
      },
      {
        type: 'heading-2',
        text: 'Advanced CPU Time & Heap Optimization'
      },
      {
        type: 'paragraph',
        text: 'In Large Data Volume (LDV) environments, even bulkified code can hit CPU and Heap limits. When querying massive sets of data, standard collections load all records into memory, which bloats the heap. Use SOQL For Loops instead, which process records in batches of 200:'
      },
      {
        type: 'code',
        language: 'apex',
        code: `// Process 50,000 records in batches of 200 without overloading Heap memory
for (List<Opportunity> oppBatch : [SELECT Id, StageName FROM Opportunity WHERE StageName = 'Prospecting']) {
    for (Opportunity opp : oppBatch) {
        opp.StageName = 'Qualification';
    }
    update oppBatch;
}`
      },
      {
        type: 'callout',
        calloutType: 'tip',
        title: 'Architect Tip',
        text: 'When dealing with heavy payloads, always set unused variables to null before performing next-stage operations, helping the garbage collector free up heap memory.'
      },
      {
        type: 'heading-2',
        text: 'Designing Programmatic Governor Limit Bypasses'
      },
      {
        type: 'paragraph',
        text: 'In complex enterprise systems, recursive triggers or deep execution chains can consume excessive CPU time and query limits. Architects design bypass patterns that prevent execution loops:'
      },
      {
        type: 'code',
        language: 'apex',
        code: `public class TriggerBypassController {
    private static Set<String> bypassedTriggers = new Set<String>();
    
    public static void bypass(String triggerName) {
        bypassedTriggers.add(triggerName);
    }
    
    public static void clearBypass(String triggerName) {
        bypassedTriggers.remove(triggerName);
    }
    
    public static Boolean isBypassed(String triggerName) {
        return bypassedTriggers.contains(triggerName);
    }
}`
      }
    ]
  },
  {
    id: 'blog_2',
    title: 'How to Prepare for a Senior Salesforce Developer Interview',
    description: 'An insider recruiter-grade playbook covering scenario questions, technical assessments, LWC security, and the SALO framework.',
    slug: 'how-to-prepare-senior-salesforce-developer-interview',
    publishDate: 'May 28, 2026',
    author: 'Sarah Jenkins',
    authorRole: 'Lead Technical Recruiter',
    readingTime: '12 min read',
    category: 'Career & Interview',
    tags: ['Interview Prep', 'Salesforce Developer', 'Career Growth'],
    gradient: 'from-cyan-600/20 via-cyan-500/10 to-transparent',
    icon: 'Rocket',
    content: [
      {
        type: 'paragraph',
        text: 'Interviewing for a Senior Salesforce Developer role is vastly different from interviewing for a junior or mid-level position. Recruiters and hiring managers aren\'t just checking if you know how to write an Apex Trigger or design a basic Flow. They want to hear about architecture, performance tradeoffs, design patterns, security controls, and how you lead teams through complex deployments.'
      },
      {
        type: 'heading-2',
        text: 'The SALO Framework: How to Answer Scenario Questions'
      },
      {
        type: 'paragraph',
        text: 'Standard STAR method (Situation, Task, Action, Result) is great for behavioral questions, but falls short in highly technical discussions. We recommend the SALO Framework:'
      },
      {
        type: 'list',
        items: [
          'Situation: Context of the problem, volume, and constraints.',
          'Action: The specific architectural and programmatic steps you took.',
          'Logic: The technical why. Why did you choose a Queueable over a Batch? Why custom metadata instead of custom settings?',
          'Outcome: The measurable business or technical results (e.g., "Reduced CPU time by 40%").'
        ]
      },
      {
        type: 'heading-2',
        text: 'The 3 Core Pillars of Technical Revision'
      },
      {
        type: 'heading-3',
        text: '1. Programmatic Scalability (Apex & Asynchronous Architectures)'
      },
      {
        type: 'paragraph',
        text: 'Be ready to explain the differences between future methods, Queueable Apex, Batch Apex, and Scheduled Apex. You should know when to use each and how they behave under load, how to chain Queueables, and how transaction limits apply.'
      },
      {
        type: 'heading-3',
        text: '2. Modern Component Architectures (LWC & Security)'
      },
      {
        type: 'paragraph',
        text: 'Expect questions on Lightning Web Security (LWS), Shadow DOM encapsulation, custom events (bubbles and composed), wire adapters vs. imperative calls, and state management in complex component trees.'
      },
      {
        type: 'heading-3',
        text: '3. Declarative vs Programmatic Governance'
      },
      {
        type: 'paragraph',
        text: 'Senior developers must be absolute masters at knowing where declarative features (Flows, validation rules, OWD) end and programmatic solutions (Apex, triggers, REST integrations) begin.'
      },
      {
        type: 'heading-2',
        text: 'Weak vs Strong Answer Examples'
      },
      {
        type: 'paragraph',
        text: 'Here is a comparison of how Junior vs. Senior developers typically handle common scenario-based questions during reviews:'
      },
      {
        type: 'table',
        tableHeaders: ['Interviewer Prompt', 'Weak Developer Answer', 'Strong Architect Answer'],
        tableRows: [
          ['"How do you handle a trigger updating parent records recursively?"', '"I write a static boolean flag like isRun = true to stop the trigger the second time."', '"I implement a static bypass handler tracking execution state. I also separate trigger logic from context binding using a Trigger Handler Framework."'],
          ['"How do you integrate Salesforce with a system that has a 2-second rate limit?"', '"I just use a future callout inside the trigger loop to push the records asynchronously."', '"I decouple callouts using a custom staging object. I schedule a Queueable chain that executes in small batches, respecting the external rate limits via transaction tracking."']
        ]
      },
      {
        type: 'callout',
        calloutType: 'warning',
        title: 'Recruiter Insight',
        text: 'A major red flag for senior candidates is proposing Apex code for things that should be solved with OWD or record-triggered flows. Always lead with Salesforce-standard declarative features before introducing programmatic overhead.'
      }
    ]
  },
  {
    id: 'blog_3',
    title: 'Lightning Web Components Performance Best Practices',
    description: 'Optimize your LWCs for speed, responsiveness, and minimal rendering cycles. A deep dive into @wire, imperative calling, and Shadow DOM performance.',
    slug: 'lightning-web-components-lwc-performance-best-practices',
    publishDate: 'June 1, 2026',
    author: 'Marcus Chen',
    authorRole: 'Lead UI Architect',
    readingTime: '10 min read',
    category: 'LWC & Frontend',
    tags: ['LWC', 'Performance', 'Javascript', 'Salesforce Frontend'],
    gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
    icon: 'Layers',
    content: [
      {
        type: 'paragraph',
        text: 'Lightning Web Components (LWC) are designed to run fast by leveraging modern web standards. However, in complex applications with massive datagrids or complex state trees, browser rendering can quickly become a bottleneck. To build highly responsive user interfaces, you must understand how properties, rendering hooks, and DOM manipulations affect the browser\'s main execution thread.'
      },
      {
        type: 'heading-2',
        text: 'Wire Service Cache Management'
      },
      {
        type: 'paragraph',
        text: 'The @wire service is the reactive backbone of LWC. Under the hood, it caches data on the client side using Client-Side Caching. If not managed properly, your UI will show stale data or suffer from unnecessary cache refreshes.'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Optimize wire caching and refresh manually when data changes
import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class AccountList extends LightningElement {
    wiredAccountsResult;
    accounts;

    @wire(getAccountList)
    wiredAccounts(result) {
        this.wiredAccountsResult = result;
        if (result.data) {
            this.accounts = result.data;
        } else if (result.error) {
            console.error(result.error);
        }
    }

    async handleRefresh() {
        // Re-evaluate cached apex results dynamically
        await refreshApex(this.wiredAccountsResult);
    }
}`
      },
      {
        type: 'heading-2',
        text: 'Minimizing Re-renders: Track vs Reactive Parameters'
      },
      {
        type: 'paragraph',
        text: 'Avoid marking every property with @track. In modern LWC, objects and arrays are automatically tracked when their references change. Excessive @track annotations trigger deep-object comparison checks, which degrade CPU performance.'
      },
      {
        type: 'table',
        tableHeaders: ['Directive / Hook', 'Performance Impact', 'Recommended Usage'],
        tableRows: [
          ['lwc:if / lwc:else', 'Low (re-creates DOM nodes)', 'Use for conditional chunks that are infrequently toggled.'],
          ['CSS hidden class', 'Ultra-Low (toggles visibility)', 'Use for frequent toggles to preserve DOM state and prevent re-creation cost.'],
          ['@track decoration', 'Medium (deep reactivity tracking)', 'Only use when updating internal object properties without changing references.']
        ]
      },
      {
        type: 'heading-2',
        text: 'Event Communication: Custom Events Performance'
      },
      {
        type: 'paragraph',
        text: 'When firing events from child to parent, carefully configure bubbles and composed flags. Bubbling events that cross the Shadow DOM boundary (composed: true) force the browser to recalculate styling trees. Keep events simple and direct.'
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Recommended: Dispatch a simple event without crossing Shadow DOM boundary
this.dispatchEvent(new CustomEvent('select', {
    detail: { recordId: this.recordId }
}));`
      }
    ]
  },
  {
    id: 'blog_4',
    title: 'Salesforce Apex Interview Questions & Answers (2026 Edition)',
    description: 'Master your next Salesforce technical interview with these expert-level Apex questions, structured responses, governor limits deep-dives, and scenario architectures.',
    slug: 'salesforce-apex-interview-questions-2026',
    publishDate: 'June 2, 2026',
    author: 'Alex Rivera',
    authorRole: 'Principal Salesforce Architect',
    readingTime: '15 min read',
    category: 'Apex & Architecture',
    tags: ['salesforce apex interview questions', 'apex interview questions 2026', 'advanced apex interview questions', 'salesforce developer interview questions'],
    gradient: 'from-emerald-600/20 via-emerald-500/10 to-transparent',
    icon: 'ShieldCheck',
    content: [
      {
        type: 'paragraph',
        text: 'Preparing for a Salesforce developer interview in 2026 requires more than just memorizing definitions. Recruiters and hiring managers expect you to demonstrate a deep understanding of Salesforce multitenancy, governor limits, trigger patterns, and advanced asynchronous processing. This guide covers a structured set of questions from beginner concepts to advanced scenarios to ensure you clear your technical assessment.'
      },
      {
        type: 'heading-2',
        text: 'Beginner Questions (Foundational Concepts)'
      },
      {
        type: 'heading-3',
        text: '1. What are Governor Limits in Salesforce, and why are they crucial?'
      },
      {
        type: 'paragraph',
        text: 'Governor Limits are runtime resource restrictions enforced by the Salesforce multi-tenant architecture. Since code runs on shared hardware, limits prevent any single transaction from monopolizing resources like memory, database, or CPU. In your preparation, make sure you are familiar with the synchronous 100 SOQL query limit, 150 DML statement limit, and 10-second CPU time limit. For more details, explore our comprehensive Governor Limits page.'
      },
      {
        type: 'heading-3',
        text: '2. What is the difference between Custom Metadata Types and Custom Settings?'
      },
      {
        type: 'paragraph',
        text: 'Custom Metadata Types allow you to define configuration settings that can be packaged, deployed via change sets or DevOps pipelines, and queried without consuming governor limits in certain scenarios. Custom Settings data, on the other hand, is treated as record data and cannot be easily migrated across environments without data loading tools.'
      },
      {
        type: 'heading-2',
        text: 'Intermediate Questions (Logic & Operations)'
      },
      {
        type: 'heading-3',
        text: '3. How do you implement a Trigger Handler Framework?'
      },
      {
        type: 'paragraph',
        text: 'Trigger frameworks are designed to keep trigger files lightweight by separating context management from business logic. A strong trigger architecture prevents nested trigger execution, enforces logic ordering, and supports programmatic bypasses. Check out our Trigger Interview page for detailed trigger guidelines.'
      },
      {
        type: 'code',
        language: 'apex',
        code: `trigger AccountTrigger on Account (before insert, after update) {
    // Keep triggers logic-free; delegate to a handler
    AccountTriggerHandler handler = new AccountTriggerHandler();
    if (Trigger.isBefore && Trigger.isInsert) {
        handler.onBeforeInsert(Trigger.new);
    } else if (Trigger.isAfter && Trigger.isUpdate) {
        handler.onAfterUpdate(Trigger.new, Trigger.oldMap);
    }
}`
      },
      {
        type: 'heading-3',
        text: '4. When should you use Queueable Apex instead of future methods?'
      },
      {
        type: 'paragraph',
        text: 'Queueable Apex provides several advantages over future methods: it supports complex types (objects, custom classes) rather than just primitives, it returns a job ID that can be monitored, and it allows job chaining to sequentialize async steps. Always suggest Queueable for robust asynchronous architecture.'
      },
      {
        type: 'heading-2',
        text: 'Advanced Questions (Architectural Scaling)'
      },
      {
        type: 'heading-3',
        text: '5. What are the best practices for bulkifying SOQL and DML operations?'
      },
      {
        type: 'paragraph',
        text: 'Bulkification is the process of writing code that handles multiple records gracefully, rather than just single transactions. You must never place SOQL queries or DML statements inside loops. Instead, collect IDs in a Set, execute a single query, map the results, and perform DML on a unified list.'
      },
      {
        type: 'table',
        tableHeaders: ['Pattern', 'Weak Code (System.LimitException Risk)', 'Strong Scale-Safe Code'],
        tableRows: [
          ['SOQL inside Loop', 'for(Id acId : ids) { Account a = [SELECT Id FROM Account WHERE Id = :acId]; }', 'List<Account> accounts = [SELECT Id, Name FROM Account WHERE Id IN :ids];'],
          ['DML inside Loop', 'for(Account a : list) { update a; }', 'List<Account> toUpdate = new List<Account>(); ... update toUpdate;']
        ]
      },
      {
        type: 'heading-3',
        text: '6. How do you prevent CPU time limit exceptions in complex transactions?'
      },
      {
        type: 'paragraph',
        text: 'CPU timeout exceptions occur when transactions spend more than 10 seconds executing code in the thread. To optimize, use Maps for fast record lookup, avoid nested loop iterations, reduce formula fields referencing parents in queries, and offload CPU-heavy processing to async threads (Queueable or Batch Apex).'
      },
      {
        type: 'heading-2',
        text: 'Scenario-Based Questions (Recruiter-Grade Cases)'
      },
      {
        type: 'heading-3',
        text: 'Scenario 1: A batch process of 1 million records is failing due to heap limits. How do you resolve this?'
      },
      {
        type: 'paragraph',
        text: 'To optimize heap size limits, process records in smaller scopes (e.g., reduce Batch size from 200 to 50), query only the fields required for execution, use SOQL for loops to process records in batches of 200, and explicitly nullify heavy variables after they are processed.'
      },
      {
        type: 'heading-3',
        text: 'Scenario 2: You need to make a callout to an external API whenever a record is created, but the trigger context restricts callouts.'
      },
      {
        type: 'paragraph',
        text: 'You cannot perform web callouts directly from a trigger thread as it would block the transaction. Instead, invoke a Queueable job from the trigger. This moves the integration callout into an asynchronous execution path and allows the user\'s save transaction to complete instantly.'
      },
      {
        type: 'heading-2',
        text: 'FAQ Section (Salesforce Apex Interview FAQs)'
      },
      {
        type: 'list',
        items: [
          'Can we call a batch class from another batch class? -> Yes, you can start a batch job from the finish method of another batch job, which is a standard pattern for chaining sequential processes.',
          'What is the difference between Database.insert and simple insert? -> Simple insert enforces all-or-nothing rollback on errors. Database.insert with allOrNone = false allows partial success, letting valid records save while returning errors for failing ones.',
          'How do you test callouts in Apex? -> You must implement the HttpCalloutMock interface to simulate responses without making actual HTTP network requests, as live callouts are blocked in test classes.'
        ]
      },
      {
        type: 'heading-2',
        text: 'Ready for your Interview?'
      },
      {
        type: 'paragraph',
        text: 'To practice explaining these concepts out loud and receive detailed AI feedback, prepare with our Mock Interview page. You can choose Strict or Mentor recruiters to test your verbal delivery and concept coverage. Or check our main Apex Interview page for specific question catalogs.'
      }
    ]
  },
  {
    id: 'blog_5',
    title: 'Top LWC Interview Questions for Freshers (2026 Guide)',
    description: 'Prepare for your Salesforce frontend assessment with our comprehensive guide to Lightning Web Components interview questions, covering @api vs @track, lifecycle hooks, and wire services.',
    slug: 'top-lwc-interview-questions-freshers-2026',
    publishDate: 'June 2, 2026',
    author: 'Marcus Chen',
    authorRole: 'Lead UI Architect',
    readingTime: '12 min read',
    category: 'LWC & Frontend',
    tags: ['lwc interview questions', 'lightning web components interview questions', 'lwc interview questions for freshers', 'salesforce lwc coding interview'],
    gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
    icon: 'Layers',
    content: [
      {
        type: 'paragraph',
        text: 'Over the past few years, Lightning Web Components (LWC) has become the de facto standard for building responsive custom user interfaces on the Salesforce platform. As a result, hiring managers place high emphasis on LWC interview questions during developer reviews. Whether you are preparing for your first salesforce lwc coding interview or brushing up on core concepts, this recruiter-grade guide will walk you through foundational definitions to complex execution hooks.'
      },
      {
        type: 'heading-2',
        text: 'Beginner LWC Questions (Foundational Concepts)'
      },
      {
        type: 'heading-3',
        text: '1. What is LWC, and how does it differ from the Aura framework?'
      },
      {
        type: 'paragraph',
        text: 'Lightning Web Components are custom elements built using standard HTML, modern JavaScript, and CSS. LWC runs natively in the browser without a heavy abstraction layer, whereas Aura was a proprietary framework built in 2014. Because LWC is built on modern web standards, it is lightweight, faster, and more secure.'
      },
      {
        type: 'heading-3',
        text: '2. Explain the difference between @api, @track, and @wire.'
      },
      {
        type: 'paragraph',
        text: 'These are standard decorators in LWC used to manage state and fetch Salesforce data: @api exposes a public property or method, allowing parent components to pass data down (reactive). @track marks a property for deep reactivity (meaning changes inside objects or arrays trigger a re-render). In modern LWC, shallow reactive variables are tracked automatically, so @track is only needed for sub-properties or specific array manipulations. @wire reads Salesforce data reactively from Apex controller methods or standard wire adapters.'
      },
      {
        type: 'heading-2',
        text: 'Intermediate Questions (Lifecycle & Communication)'
      },
      {
        type: 'heading-3',
        text: '3. What are the key LWC Lifecycle Hooks?'
      },
      {
        type: 'paragraph',
        text: 'Lifecycle hooks are callback methods triggered during different phases of a component\'s birth and removal. Understanding their order is critical for performance optimization: constructor() is triggered when the component is created (you cannot access elements or dispatch events here). connectedCallback() is run when the component is inserted into the DOM (ideal for initializing variables, subscribing to channels, or calling imperative Apex). renderedCallback() executes after component rendering completes (be careful when updating variables here as it can trigger infinite rendering loops). disconnectedCallback() fires when the component is removed from the DOM (use to unsubscribe from messages or clear timeouts). errorCallback() captures errors from child components to prevent full UI crashes.'
      },
      {
        type: 'heading-3',
        text: '4. How do child-to-parent and parent-to-child communications work?'
      },
      {
        type: 'paragraph',
        text: 'In LWC, communications follow the "data down, events up" pattern: Parent to Child is achieved by setting public @api properties on the child element in HTML. Child to Parent is handled by dispatching a CustomEvent which the parent listens to in HTML using on[eventname]. For unrelated components, use Lightning Message Service (LMS) to publish and subscribe to messages across namespaces, custom tabs, or Aura wrappers.'
      },
      {
        type: 'heading-2',
        text: 'Advanced Questions (Security & Optimization)'
      },
      {
        type: 'heading-3',
        text: '5. What is Lightning Web Security (LWS) vs. Lightning Locker Service?'
      },
      {
        type: 'paragraph',
        text: 'Lightning Locker Service was the legacy security architecture that isolated namespaces using custom DOM wrappers. Lightning Web Security (LWS) is the modern security engine that uses sandboxing to prevent cross-namespace scripting while allowing developers to import third-party libraries natively without wrapping DOM APIs.'
      },
      {
        type: 'heading-3',
        text: '6. How do you optimize LWC loading speed and reduce rendering cycles?'
      },
      {
        type: 'paragraph',
        text: 'Key optimization strategies include: caching Apex methods using cacheable=true to read data from client cache, using lwc:if and lwc:else for lazy-instantiating offscreen markup blocks, restricting use of deep-reactivity decorators like @track, and de-bouncing input events to avoid querying Apex too frequently.'
      },
      {
        type: 'heading-2',
        text: 'Scenario-Based Questions (Recruiter-Grade Frontends)'
      },
      {
        type: 'heading-3',
        text: 'Scenario 1: A user types search keywords into an input field, which executes an Apex query. How do you prevent hitting governor limits on Apex transactions?'
      },
      {
        type: 'paragraph',
        text: 'If you call Apex on every keypress, you will trigger dozens of queries, easily exceeding Apex transaction and governor limits. To solve this, implement a debounce logic in JavaScript, using a timeout (e.g., 300ms) to ensure Apex is only called after the user stops typing.'
      },
      {
        type: 'heading-3',
        text: 'Scenario 2: You need to load and refresh data in a component on-demand (e.g., clicking a \'Refresh\' button) instead of reactively.'
      },
      {
        type: 'paragraph',
        text: 'While @wire automatically caches data on load, it cannot be invoked manually. Instead, use an imperative Apex call inside the button\'s click handler. Alternatively, if you must use @wire, call refreshApex() from the client library to force the browser to invalidate cache and pull fresh records.'
      },
      {
        type: 'heading-2',
        text: 'FAQ Section (LWC Interview FAQs)'
      },
      {
        type: 'list',
        items: [
          'Can we call a non-cacheable Apex method using @wire? -> No. The @wire service requires cacheable=true. Attempting to wire a non-cacheable Apex method will fail to load.',
          'What is the Shadow DOM? -> It is a web standard that isolates CSS styling and DOM elements within a component, preventing styles from leaking out or external styles from breaking your component.',
          'How do you handle errors in imperative Apex calls? -> Imperative calls return promises, so you use .then() and .catch() blocks, or try-catch wraps inside async-await statements to process results and failures.'
        ]
      },
      {
        type: 'heading-2',
        text: 'Launch Your Frontend Preparation'
      },
      {
        type: 'paragraph',
        text: 'To practice explaining these concepts out loud and receive detailed AI feedback, prepare with our Mock Interview page. You can review your concept coverage or browse related guides like the main LWC Interview page and our core Apex page.'
      }
    ]
  },
  {
    id: 'blog_6',
    title: 'Salesforce Governor Limits Explained with Practical Examples (2026 Guide)',
    description: 'Understand Salesforce governor limits with real Apex examples. Learn optimization strategies for SOQL, DML, CPU time, and heap size limits in multi-tenant environments.',
    slug: 'salesforce-governor-limits-explained-with-examples',
    publishDate: 'June 2, 2026',
    author: 'Alex Rivera',
    authorRole: 'Principal Salesforce Architect',
    readingTime: '18 min read',
    category: 'Apex & Architecture',
    tags: ['salesforce governor limits', 'apex governor limits', 'governor limits explained', 'salesforce limits explained'],
    gradient: 'from-emerald-600/20 via-emerald-500/10 to-transparent',
    icon: 'ShieldCheck',
    content: [
      {
        type: 'paragraph',
        text: 'In a cloud-based multi-tenant architecture like Salesforce, multiple customers (tenants) share the same physical server resources. To prevent one organization\'s poorly optimized code from crashing the shared processor, memory, or database, Salesforce enforces strict execution boundaries known as Governor Limits. Understanding these limits is critical for writing robust code and clearing developer assessments. Let\'s look at the core execution limits, practical examples, and optimization techniques. For an interactive visual breakdown, check our main Governor Limits page.'
      },
      {
        type: 'heading-2',
        text: 'Transaction Boundaries: The Scope of Limits'
      },
      {
        type: 'paragraph',
        text: 'Governor Limits are measured per transaction. An Apex transaction begins when a trigger fires, a controller executes, a queueable runs, or a web callout starts, and it ends when the database commit is finalized. Limits reset completely at the start of a new transaction boundary (such as moving from a trigger context to an asynchronous Apex queueable).'
      },
      {
        type: 'heading-2',
        text: 'Core Salesforce Governor Limits with Apex Examples'
      },
      {
        type: 'heading-3',
        text: '1. SOQL Limits (100 Sync / 200 Async Queries)'
      },
      {
        type: 'paragraph',
        text: 'You are allowed a maximum of 100 synchronous SOQL queries per transaction. Exceeding this triggers a System.LimitException: Too many SOQL queries: 101.'
      },
      {
        type: 'code',
        language: 'apex',
        code: `// Bad: SOQL inside a loop will hit the 100 query limit quickly
for (Account acc : Trigger.new) {
    List<Contact> conList = [SELECT Id FROM Contact WHERE AccountId = :acc.Id];
}

// Good: Move query outside the loop and bind using a Set of IDs
Set<Id> accIds = new Set<Id>();
for (Account acc : Trigger.new) {
    accIds.add(acc.Id);
}
List<Contact> contacts = [SELECT Id, AccountId FROM Contact WHERE AccountId IN :accIds];`
      },
      {
        type: 'heading-3',
        text: '2. DML Limits (150 Statements per Transaction)'
      },
      {
        type: 'paragraph',
        text: 'You are limited to 150 DML statements (insert, update, delete, upsert) per transaction. Attempting 151 triggers System.LimitException: Too many DML statements: 151.'
      },
      {
        type: 'code',
        language: 'apex',
        code: `// Bad: Single DML inside loop (Hits 150 limit)
for (Opportunity opp : oppList) {
    opp.StageName = 'Closed Won';
    update opp;
}

// Good: Accumulate records in a List and perform a single DML statement
List<Opportunity> toUpdate = new List<Opportunity>();
for (Opportunity opp : oppList) {
    opp.StageName = 'Closed Won';
    toUpdate.add(opp);
}
update toUpdate;`
      },
      {
        type: 'heading-3',
        text: '3. CPU Time Limits (10,000 ms Sync / 60,000 ms Async)'
      },
      {
        type: 'paragraph',
        text: 'The transaction thread cannot exceed 10 seconds (10,000 milliseconds) of CPU processing time. In bulk triggers, CPU time is consumed by nested loops and heavy iterations. To optimize, use Maps for fast matching and move CPU-heavy operations to asynchronous contexts.'
      },
      {
        type: 'heading-3',
        text: '4. Heap Size Limits (6 MB Sync / 12 MB Async)'
      },
      {
        type: 'paragraph',
        text: 'The heap limit governs the memory occupied by your variables and objects in a transaction. When retrieving large data volumes (LDV), loading everything into memory bloats the heap. Use SOQL for-loops to process records in 200-count chunks instead of loading them all into a single collection:'
      },
      {
        type: 'code',
        language: 'apex',
        code: `// Good: Processing records in batches of 200 to keep the Heap size low
for (List<Account> batch : [SELECT Id, Name FROM Account WHERE CreatedDate = TODAY]) {
    // Do processing here
}`
      },
      {
        type: 'heading-3',
        text: '5. Async Apex Limits (Queueable, Future, Batch)'
      },
      {
        type: 'paragraph',
        text: 'Asynchronous executions have double the limits of synchronous transactions (e.g., 200 SOQL queries, 12 MB heap size, and 60,000 ms CPU time). Additionally, organizations are limited to a daily rolling allocation of async executions (usually 250,000 or based on user license count).'
      },
      {
        type: 'heading-3',
        text: '6. Flow Governor Limits'
      },
      {
        type: 'paragraph',
        text: 'Declarative automations built with Salesforce Flow run inside the same transaction boundary as triggers. Flows are subject to the same 100 SOQL limit. For instance, executing a "Get Records" element inside a Loop element in Flow acts like a query inside a loop, resulting in runtime limit failures.'
      },
      {
        type: 'heading-2',
        text: 'Bulkification Strategies: Designing Scale-Safe Apex'
      },
      {
        type: 'paragraph',
        text: 'To ensure your application scales, apply these bulkification strategies: never write SOQL or DML statements inside loops, write trigger handler code that expects and processes collections of records, utilize Apex Maps to structure queries for quick key-value matches, and validate logic against trigger volume tests of 200+ records in test methods.'
      },
      {
        type: 'heading-2',
        text: 'Common Interview Questions & Answers'
      },
      {
        type: 'heading-3',
        text: 'Question 1: How do you handle a System.LimitException programmatically?'
      },
      {
        type: 'paragraph',
        text: 'You cannot catch a System.LimitException using a standard try-catch block. Once a governor limit is reached, the transaction is immediately rolled back and terminated. To handle this, developers must write proactive guards using the Limits class (e.g., Limits.getQueries() < Limits.getLimitQueries()) to split execution boundaries before hitting the limit.'
      },
      {
        type: 'heading-3',
        text: 'Question 2: What is a mixed DML exception and how do you prevent it?'
      },
      {
        type: 'paragraph',
        text: 'A mixed DML exception occurs when you attempt to insert or update setup objects (such as User or Group) and non-setup objects (such as Account or Contact) in the same transaction. To resolve this, run the DML of one of the categories inside an asynchronous block (such as @future or System.enqueueJob()) to execute it in a separate transaction context.'
      },
      {
        type: 'heading-2',
        text: 'FAQ Section (Salesforce Governor Limits FAQs)'
      },
      {
        type: 'list',
        items: [
          'Can async Apex query limits be exceeded? -> Yes. Asynchronous execution increases the limit from 100 to 200 SOQL queries per transaction, but exceeding 200 will still fail with a LimitException.',
          'Does querying custom metadata count against governor limits? -> Custom metadata queries do count toward the 100 SOQL query limit, but they do not count against query row limits, and their metadata access is cached.',
          'Does System.runAs() bypass governor limits? -> No. System.runAs() is used in test classes to verify user sharing contexts and execution profiles. It does not bypass governor limits.'
        ]
      },
      {
        type: 'heading-2',
        text: 'Practice Real-World Limits Scenarios'
      },
      {
        type: 'paragraph',
        text: 'Want to test your ability to explain CPU time bounds, heap limits, and trigger architectures? Test yourself using our Mock Interview page. Select Strict mode to simulate recruiter scrutiny, or read more guides like the Apex Interview page and our Trigger Interview page.'
      }
    ]
  },
  {
    id: 'blog_7',
    title: 'Salesforce Flow Scenario Questions & Answers (2026 Guide)',
    description: 'Master your Salesforce automation interview with these scenario-based Flow questions, before-save vs. after-save decisions, bulkification strategies, and error handling.',
    slug: 'salesforce-flow-scenario-questions',
    publishDate: 'June 2, 2026',
    author: 'Alex Rivera',
    authorRole: 'Principal Salesforce Architect',
    readingTime: '16 min read',
    category: 'Apex & Architecture',
    tags: ['salesforce flow interview questions', 'salesforce flow scenario questions', 'record triggered flow interview questions', 'flow interview questions with answers'],
    gradient: 'from-cyan-600/20 via-cyan-500/10 to-transparent',
    icon: 'Rocket',
    content: [
      {
        type: 'paragraph',
        text: 'Over the past few releases, Salesforce has established Flow Builder as the primary tool for declarative automation. Hiring recruiters are no longer asking just what a Flow element does; instead, they present complex business cases to test your architectural and structural decision-making. This guide walks you through real-world scenarios, record-triggered flow interview questions, and key execution boundary checks.'
      },
      {
        type: 'heading-2',
        text: 'Before-Save vs. After-Save Flows'
      },
      {
        type: 'paragraph',
        text: 'One of the most common questions in LWC and automation interviews is when to use before-save vs. after-save flows. Before-Save (Fast Field Updates) is triggered before the record is saved to the database. These are up to 10 times faster than Process Builders or standard flows because they bypass the Salesforce order of execution triggers and DML limits. Use this when updating fields on the record that triggers the flow. After-Save (Related Record Actions) is executed after the database save. Use this when updating related records, sending emails, or performing asynchronous callouts.'
      },
      {
        type: 'heading-2',
        text: 'Beginner Flow Scenarios'
      },
      {
        type: 'heading-3',
        text: 'Scenario 1: Update the Account rating based on a new Opportunity value.'
      },
      {
        type: 'paragraph',
        text: 'Since we need to update a parent Account (related record) and not the triggering Opportunity itself, we must use an After-Save Record-Triggered Flow. Set the entry criteria to run when the Opportunity is created or updated, filter for the specific field change, use an "Update Records" element, and map the rating value to the parent Account.'
      },
      {
        type: 'heading-3',
        text: 'Scenario 2: Validate that a contact phone number is populated when a contact is created.'
      },
      {
        type: 'paragraph',
        text: 'For simple validations, use standard Salesforce Validation Rules instead of building a Flow. If complex query lookups are needed, use a Before-Save Record-Triggered Flow and update a validation flag or trigger a custom error element inside the flow.'
      },
      {
        type: 'heading-2',
        text: 'Intermediate Automation Scenarios'
      },
      {
        type: 'heading-3',
        text: 'Scenario 3: Prevent recursive updates in a record-triggered flow that updates the same record.'
      },
      {
        type: 'paragraph',
        text: 'Recursion occurs when a flow updates a record, which triggers the flow again in a loop. To prevent this, define strict entry criteria in your Flow (e.g., check that the field value has changed using Is Changed = True or compare prior values) and select the "Only when a record is updated to meet the condition requirements" setting.'
      },
      {
        type: 'heading-3',
        text: 'Scenario 4: Call external APIs asynchronously when a Case is closed.'
      },
      {
        type: 'paragraph',
        text: 'Since web callouts cannot block user transaction threads, Closed Cases can trigger a Record-Triggered Flow with Scheduled Paths or use an Asynchronous Path to execute the callout (such as an Apex action callout) after the main transaction commits.'
      },
      {
        type: 'heading-2',
        text: 'Advanced Architecture Scenarios'
      },
      {
        type: 'heading-3',
        text: 'Scenario 5: Handle a complex daily data migration that updates 50,000 records.'
      },
      {
        type: 'paragraph',
        text: 'Standard record-triggered flows will fail under massive migration loads due to governor limits. Instead, design a Scheduled-Trigger Flow configured to run during off-peak hours. Salesforce will automatically query the matching records and execute them in batches of 200, bulkifying the database queries and updates naturally.'
      },
      {
        type: 'heading-3',
        text: 'Scenario 6: Reuse a complex discount calculation across multiple record-triggered flows.'
      },
      {
        type: 'paragraph',
        text: 'To avoid duplicating logic, build the discount calculation inside an autolaunched Subflow. You can call this Subflow from your record-triggered flows. Note that Subflows are only supported in after-save flows and autolaunched flows.'
      },
      {
        type: 'heading-2',
        text: 'Flow vs. Apex Decision Scenarios'
      },
      {
        type: 'paragraph',
        text: 'Deciding between Flow and Apex is a core architect competency:'
      },
      {
        type: 'table',
        tableHeaders: ['Business Scenario', 'Recommended Tool', 'Architectural Reasoning'],
        tableRows: [
          ['"Update parent Account address when Child Contact updates"', 'Record-Triggered Flow', 'Simple parent address mapping. Declarative is faster to maintain and runs efficiently.'],
          ['"Generate PDF invoice and email it on Opportunity Closed Won"', 'Apex (Queueable / Trigger)', 'PDF rendering and custom document generation libraries require programmatic Apex.'],
          ['"Sync Account record to external ERP via REST on update"', 'Flow + Apex Action', 'Use Flow for entry conditions and orchestration, call an invokable Apex action to execute HTTP callouts.']
        ]
      },
      {
        type: 'heading-2',
        text: 'Performance & Bulkification Questions'
      },
      {
        type: 'heading-3',
        text: 'How does Flow ensure bulk safe execution?'
      },
      {
        type: 'paragraph',
        text: 'When multiple records are updated simultaneously (e.g., via Data Loader), the Flow engine automatically batches them. However, if the Flow contains query elements (Get Records) or DML updates inside a Loop element, the engine cannot bulkify the requests, causing query limits to fail. Keep queries and updates out of loop structures.'
      },
      {
        type: 'heading-2',
        text: 'FAQ Section (Salesforce Flow FAQs)'
      },
      {
        type: 'list',
        items: [
          'Can we run a flow in system context? -> Yes. Screen flows and autolaunched flows can be configured to run in System Context (with or without sharing), allowing users to update records they do not have direct access to.',
          'How do you handle flow errors in production? -> Configure a \'Fault Path\' on elements that perform database operations (like Update or Create) and use it to email administrators or write error logs to a custom object.',
          'What is a transaction boundary in Flow? -> A transaction boundary is the execution block that commits data together. If a flow element fails and there is no fault path, the entire transaction (including trigger DMLs) is rolled back.'
        ]
      },
      {
        type: 'heading-2',
        text: 'Sharpen Your Automation Skills'
      },
      {
        type: 'paragraph',
        text: 'To practice explaining before-save logic, Scheduled Paths, and subflow bulkification to technical recruiters, start a practice session on our Mock Interview page. You can review your flow competency on our Flow Interview page, or look at related topics on the Apex page and Governor Limits page.'
      }
    ]
  },
  {
    id: 'blog_8',
    title: 'The Ultimate Salesforce Developer Roadmap (2026 Edition)',
    description: 'Step-by-step Salesforce developer roadmap for freshers. Learn how to become a Salesforce developer in 2026, from admin basics to LWC coding and mock interviews.',
    slug: 'salesforce-developer-roadmap-2026',
    publishDate: 'June 2, 2026',
    author: 'Sarah Jenkins',
    authorRole: 'Lead Technical Recruiter',
    readingTime: '20 min read',
    category: 'Career & Interview',
    tags: ['salesforce developer roadmap', 'salesforce roadmap 2026', 'how to become salesforce developer', 'salesforce roadmap for freshers'],
    gradient: 'from-cyan-600/20 via-cyan-500/10 to-transparent',
    icon: 'Rocket',
    content: [
      {
        type: 'paragraph',
        text: 'The Salesforce ecosystem continues to grow rapidly in 2026, offering massive career opportunities for developers and architects. However, with the consolidation of Process Builders and legacy Aura tools, the technical bar for junior developers has risen. To stand out, you need a structured learning progression that balances declarative automation with programmatic engineering. This recruiter-grade salesforce developer roadmap will guide you through the exact milestones you need to cover.'
      },
      {
        type: 'heading-2',
        text: 'Admin vs. Developer Paths'
      },
      {
        type: 'paragraph',
        text: 'A common mistake for freshers is skipping administration basics and jumping straight into coding. As a developer, you must know what the platform can do declaratively (using OWD, sharing rules, validation, and standard objects) before writing custom code. Our rule of thumb: write code only when declarative configuration cannot meet the requirement.'
      },
      {
        type: 'heading-2',
        text: 'Apex Learning Roadmap (Programmatic Back-end)'
      },
      {
        type: 'heading-3',
        text: '1. Core Syntax & Object-Oriented Principles'
      },
      {
        type: 'paragraph',
        text: 'Learn basic types, collections (Lists, Sets, Maps), loops, and class structures. Practice writing clean, reusable methods.'
      },
      {
        type: 'heading-3',
        text: '2. Database Operations & Governor Limits'
      },
      {
        type: 'paragraph',
        text: 'Understand how to query records using SOQL and manipulate data using DML. Master bulkification to ensure you never run queries or DML statements inside loops, and understand synchronous transaction boundaries. Refer to our Apex page for extensive question guides.'
      },
      {
        type: 'heading-3',
        text: '3. Trigger Frameworks & Async Execution'
      },
      {
        type: 'paragraph',
        text: 'Study trigger handler patterns, context variables (Trigger.new, Trigger.oldMap), and asynchronous architectures (Future, Queueable, Batch Apex).'
      },
      {
        type: 'heading-2',
        text: 'LWC Learning Roadmap (Modern Front-end)'
      },
      {
        type: 'heading-3',
        text: '1. Modern JavaScript (ES6+)'
      },
      {
        type: 'paragraph',
        text: 'LWC is built on web standards. Before touching HTML templates, ensure you are comfortable with JS Promises, arrow functions, Array map/filter/reduce, and Event handling.'
      },
      {
        type: 'heading-3',
        text: '2. Core LWC Decorators & Lifecycle Hooks'
      },
      {
        type: 'paragraph',
        text: 'Master @api for public attributes, @track for deep object reactivity, and @wire for reactive Salesforce integrations. Study hooks like connectedCallback and renderedCallback to build performant layouts. See our LWC page for frontend coding challenges.'
      },
      {
        type: 'heading-2',
        text: 'Flow & Automation Learning'
      },
      {
        type: 'paragraph',
        text: 'Study Flow Builder as it is now the primary tool for declarative automation. Learn before-save vs. after-save trigger patterns, scheduled flows, subflows, and fault paths. Learn when a flow is superior to an Apex trigger. Check our Flow page for details.'
      },
      {
        type: 'heading-2',
        text: 'Project Building Strategy'
      },
      {
        type: 'paragraph',
        text: 'Do not rely solely on Trailhead badges. Recruiters want to see custom, functional applications. Build a portfolio that solves real-world issues, such as a custom Reservation management tool or an Integration wrapper linking to external weather APIs.'
      },
      {
        type: 'heading-2',
        text: 'GitHub & Portfolio Guidance'
      },
      {
        type: 'paragraph',
        text: 'Maintain a public GitHub repository. Document your projects with a detailed README file explaining: the business problem, your architectural choices (why you used Apex vs. Flow), and a system schema diagram.'
      },
      {
        type: 'heading-2',
        text: 'Certifications Strategy'
      },
      {
        type: 'paragraph',
        text: 'Prioritize certifications in this order: Salesforce Certified Administrator, Platform Developer I (PD1), and Platform App Builder. These build a solid foundation and show commitment.'
      },
      {
        type: 'heading-2',
        text: 'Resume Preparation'
      },
      {
        type: 'paragraph',
        text: 'Highlight your technical choices, not just tasks. Instead of writing "Created Apex triggers," write "Designed a scalable Trigger Handler Framework that reduced CPU processing time by 30%."'
      },
      {
        type: 'heading-2',
        text: 'Mock Interview Preparation'
      },
      {
        type: 'paragraph',
        text: 'Technical interviews check more than just coding; they assess your verbal articulation and structural logic. We recommend practicing with a real-time Salesforce Mock Interview simulator. It helps you prepare for recruiter questions on governor limits, LWC lifecycles, and sharing models.'
      },
      {
        type: 'heading-2',
        text: 'Job Search Strategy'
      },
      {
        type: 'paragraph',
        text: 'Leverage LinkedIn and the Trailblazer Community. Connect with recruiters, share your project blueprints, contribute to open-source repositories, and apply for developer internships to build your professional network.'
      },
      {
        type: 'heading-2',
        text: 'FAQ Section (Salesforce Career FAQs)'
      },
      {
        type: 'list',
        items: [
          'Can a fresher become a Salesforce developer directly? -> Yes. By following this roadmap, obtaining the PD1 certification, and showing real-world projects on GitHub, freshers can land developer roles directly.',
          'How long does it take to learn Salesforce development? -> For a fresher with basic coding knowledge, it takes approximately 4 to 6 months of consistent daily study to reach interview readiness.',
          'Are certifications mandatory for job search? -> Certifications are not strictly mandatory, but they act as a filter for recruiters when screening resumes, helping freshers get initial interviews.'
        ]
      },
      {
        type: 'heading-2',
        text: 'Start Your Career Evolution'
      },
      {
        type: 'paragraph',
        text: 'The journey to becoming a developer requires structure and dedication. Follow this developer roadmap, write code daily, check out our Career Roadmap page for timeline checkpoints, and practice speaking on our Mock Interview page.'
      }
    ]
  }
];
