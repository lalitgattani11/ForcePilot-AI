/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

/* ==================================================
   🚀 ADVANCED SALESFORCE TECHNICAL LANGUAGE ENGINE
================================================== */

export type SalesforceDomain =
  | "ADMIN"
  | "APEX"
  | "LWC"
  | "INTEGRATION"
  | "GENERAL";

interface CorrectionRule {
  wrong: string | RegExp;
  right: string;
  domain?: SalesforceDomain;
  phonetic?: boolean;
}

/* ==================================================
   TECHNICAL RULES
================================================== */

const TECHNICAL_RULES: CorrectionRule[] = [

  /* ---------- APEX ---------- */

  {
    wrong:
      /\b(goal winner limits|go inner limits|governer limits|governor limit)\b/gi,

    right:
      "governor limits",

    domain: "APEX",
  },

  {
    wrong:
      /\b(so cool|so q l|s o q l|circle query)\b/gi,

    right:
      "SOQL",

    domain: "APEX",
  },

  {
    wrong:
      /\b(sos cell|s o s l)\b/gi,

    right:
      "SOSL",

    domain: "APEX",
  },

  {
    wrong:
      /\b(cue able apex|queue able apex|cable apex)\b/gi,

    right:
      "Queueable Apex",

    domain: "APEX",
  },

  {
    wrong:
      /\b(batch a peps|patch apex)\b/gi,

    right:
      "Batch Apex",

    domain: "APEX",
  },

  {
    wrong:
      /\b(trigger old|trigger dot old)\b/gi,

    right:
      "Trigger.old",

    domain: "APEX",
  },

  {
    wrong:
      /\b(trigger new|trigger dot new)\b/gi,

    right:
      "Trigger.new",

    domain: "APEX",
  },

  {
    wrong:
      /\b(test setup|at test setup)\b/gi,

    right:
      "@testSetup",

    domain: "APEX",
  },

  {
    wrong:
      /\b(at future|future method)\b/gi,

    right:
      "@future method",

    domain: "APEX",
  },

  /* ---------- LWC ---------- */

  {
    wrong:
      /\b(lightning web components|lwc|l w c)\b/gi,

    right:
      "LWC",

    domain: "LWC",
  },

  {
    wrong:
      /\b(wire method|wire me thud|at wire)\b/gi,

    right:
      "@wire",

    domain: "LWC",
  },

  {
    wrong:
      /\b(at api)\b/gi,

    right:
      "@api",

    domain: "LWC",
  },

  {
    wrong:
      /\b(at track)\b/gi,

    right:
      "@track",

    domain: "LWC",
  },

  {
    wrong:
      /\b(lightning message service|lms|l m s)\b/gi,

    right:
      "Lightning Message Service",

    domain: "LWC",
  },

  {
    wrong:
      /\b(pop sub|pub sub)\b/gi,

    right:
      "pub-sub",

    domain: "LWC",
  },

  {
    wrong:
      /\b(connected callback)\b/gi,

    right:
      "connectedCallback",

    domain: "LWC",
  },

  {
    wrong:
      /\b(rendered callback)\b/gi,

    right:
      "renderedCallback",

    domain: "LWC",
  },

  /* ---------- ADMIN ---------- */

  {
    wrong:
      /\b(owd|o w d|organization wide defaults)\b/gi,

    right:
      "OWD",

    domain: "ADMIN",
  },

  {
    wrong:
      /\b(field level security|f l s|fls)\b/gi,

    right:
      "FLS",

    domain: "ADMIN",
  },

  {
    wrong:
      /\b(create read update delete|crud|c r u d)\b/gi,

    right:
      "CRUD",

    domain: "ADMIN",
  },

  {
    wrong:
      /\b(validation ruler|validation rolls)\b/gi,

    right:
      "validation rules",

    domain: "ADMIN",
  },

  {
    wrong:
      /\b(role high archy|rule hierarchy)\b/gi,

    right:
      "role hierarchy",

    domain: "ADMIN",
  },

  {
    wrong:
      /\b(master detailed|master detail)\b/gi,

    right:
      "master-detail",

    domain: "ADMIN",
  },

  {
    wrong:
      /\b(permission seat|permission said)\b/gi,

    right:
      "permission set",

    domain: "ADMIN",
  },

  /* ---------- GENERAL ---------- */

  {
    wrong:
      /\b(cell phones|sales force|s f d c)\b/gi,

    right:
      "Salesforce",

    domain: "GENERAL",
  },

  {
    wrong:
      /\b(rest api|rest a p i)\b/gi,

    right:
      "REST API",

    domain: "GENERAL",
  },

  {
    wrong:
      /\b(soap api|soap a p i)\b/gi,

    right:
      "SOAP API",

    domain: "GENERAL",
  },
];

/* ==================================================
   FILLERS
================================================== */

const FILLERS = [
  "umm",
  "um",
  "uh",
  "ah",
  "actually",
  "basically",
  "like",
  "you know",
];

/* ==================================================
   CLEANUP
================================================== */

const cleanupRawTranscript = (
  text: string
): string => {

  let cleaned = text;

  FILLERS.forEach((filler) => {

    const regex =
      new RegExp(
        `\\b${filler}\\b`,
        "gi"
      );

    cleaned =
      cleaned.replace(regex, " ");
  });

  cleaned =
    cleaned.replace(
      /\b(\w+)\s+\1\b/gi,
      "$1"
    );

  return cleaned
    .replace(/\s+/g, " ")
    .trim();
};

/* ==================================================
   APPLY TECHNICAL RULES
================================================== */

const applyTechnicalRules = (
  text: string,
  domain: SalesforceDomain
): string => {

  let processed = text;

  const sortedRules =
    [...TECHNICAL_RULES].sort(
      (a, b) => {

        if (
          a.domain === domain &&
          b.domain !== domain
        ) {
          return -1;
        }

        if (
          b.domain === domain &&
          a.domain !== domain
        ) {
          return 1;
        }

        return 0;
      }
    );

  sortedRules.forEach((rule) => {

    processed =
      processed.replace(
        rule.wrong,
        rule.right
      );
  });

  return processed;
};

/* ==================================================
   POLISH
================================================== */

const polishGrammar = (
  text: string
): string => {

  if (!text) return "";

  let polished = text;

  const CAPS = [
    "LWC",
    "SOQL",
    "SOSL",
    "DML",
    "CRUD",
    "FLS",
    "OWD",
    "REST",
    "SOAP",
    "API",
  ];

  CAPS.forEach((word) => {

    const regex =
      new RegExp(
        `\\b${word}\\b`,
        "gi"
      );

    polished =
      polished.replace(
        regex,
        word
      );
  });

  polished =
    polished.charAt(0).toUpperCase() +
    polished.slice(1);

  if (
    polished.length > 15 &&
    !/[.!?]$/.test(polished)
  ) {
    polished += ".";
  }

  return polished;
};

/* ==================================================
   MAIN ENGINE
================================================== */

export const interpretTranscript = (
  raw: string,
  domain: SalesforceDomain =
    "GENERAL"
): string => {

  if (!raw) return "";

  let processed =
    cleanupRawTranscript(raw);

  processed =
    applyTechnicalRules(
      processed,
      domain
    );

  processed =
    polishGrammar(processed);

  return processed;
};

/* ==================================================
   SPEECH TYPES
================================================== */

export type SpeechState =
  | "IDLE"
  | "SPEAKING"
  | "LISTENING"
  | "PROCESSING"
  | "ERROR";

const IS_MOBILE_DEVICE =
  typeof navigator !==
    "undefined" &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

/* ==================================================
   HOOK
================================================== */

export const useSpeech = () => {

  const [
    speechState,
    setSpeechState,
  ] = useState<SpeechState>(
    "IDLE"
  );

  const [
    transcript,
    setTranscript,
  ] = useState("");

  const [
    isSupported,
    setIsSupported,
  ] = useState(
    !IS_MOBILE_DEVICE
  );

  const [
    isUnlocked,
    setIsUnlocked,
  ] = useState(false);

  const recognitionRef =
    useRef<any>(null);

  const silenceTimerRef =
    useRef<any>(null);

  const isFinalizingRef =
    useRef(false);

  const isListeningRef =
    useRef(false);

  /* =========================================
     INIT
  ========================================= */

  useEffect(() => {

    if (!IS_MOBILE_DEVICE) {

      const SpeechRecognition =
        (window as any)
          .SpeechRecognition ||

        (window as any)
          .webkitSpeechRecognition;

      if (SpeechRecognition) {

        const recognition =
          new SpeechRecognition();

        recognition.continuous =
          true;

        recognition.interimResults =
          true;

        recognition.lang =
          "en-IN";

        recognitionRef.current =
          recognition;

        setTimeout(
          () =>
            setIsSupported(true),
          0
        );

      } else {

        setTimeout(
          () =>
            setIsSupported(false),
          0
        );
      }
    }

  }, []);

  /* =========================================
     SPEAK
  ========================================= */

  const speak =
    useCallback(
      (
        text: string
      ): Promise<void> => {

        return new Promise(
          (resolve) => {

            if (
              !(
                "speechSynthesis" in
                window
              )
            ) {
              return resolve();
            }

            window.speechSynthesis.cancel();

            const utterance =
              new SpeechSynthesisUtterance(
                text
              );

            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            const voices =
              window.speechSynthesis.getVoices();

            const englishVoice =
              voices.find(
                (v) =>
                  v.lang ===
                    "en-IN" ||

                  v.lang ===
                    "en-US" ||

                  v.lang ===
                    "en-GB"
              );

            if (englishVoice) {
              utterance.voice =
                englishVoice;
            }

            utterance.onstart =
              () =>
                setSpeechState(
                  "SPEAKING"
                );

            utterance.onend =
              () => {

                setSpeechState(
                  "IDLE"
                );

                resolve();
              };

            utterance.onerror =
              () => {

                setSpeechState(
                  "IDLE"
                );

                resolve();
              };

            window.speechSynthesis.speak(
              utterance
            );
          }
        );
      },
      []
    );

  /* =========================================
     LISTEN
  ========================================= */

  const listen =
    useCallback(
      (
        silenceThresholdMs: number = 4000
      ): Promise<string> => {

        return new Promise(
          (resolve) => {

            if (
              !recognitionRef.current ||
              isListeningRef.current
            ) {
              return resolve("");
            }

            isListeningRef.current =
              true;

            setTranscript("");

            setSpeechState(
              "LISTENING"
            );

            let finalTranscript =
              "";

            isFinalizingRef.current =
              false;

            const stopAndFinalize =
              () => {

                if (
                  isFinalizingRef.current
                ) {
                  return;
                }

                isFinalizingRef.current =
                  true;

                clearTimeout(
                  silenceTimerRef.current
                );

                try {

                  if (
                    recognitionRef.current
                  ) {
                    recognitionRef.current.stop();
                  }

                } catch (e) {

                  console.error(
                    "[MIC] Stop Error:",
                    e
                  );
                }
              };

            recognitionRef.current.onresult =
              (event: any) => {

                clearTimeout(
                  silenceTimerRef.current
                );

                let interim =
                  "";

                for (
                  let i =
                    event.resultIndex;
                  i <
                  event.results.length;
                  i++
                ) {

                  if (
                    event.results[i]
                      .isFinal
                  ) {

                    finalTranscript +=
                      event.results[i][0]
                        .transcript + " ";

                  } else {

                    interim +=
                      event.results[i][0]
                        .transcript;
                  }
                }

                const raw =
                  finalTranscript +
                  interim;

                const corrected =
                  interpretTranscript(
                    raw,
                    "GENERAL"
                  );

                console.log(
                  "[RAW]:",
                  raw
                );

                console.log(
                  "[CORRECTED]:",
                  corrected
                );

                setTranscript(
                  corrected
                );

                if (
                  raw.trim().length >
                  0
                ) {

                  silenceTimerRef.current =
                    setTimeout(
                      () => {

                        console.log(
                          "[MIC] Silence detected"
                        );

                        stopAndFinalize();

                      },
                      silenceThresholdMs
                    );
                }
              };

            recognitionRef.current.onend =
              () => {

                clearTimeout(
                  silenceTimerRef.current
                );

                setSpeechState(
                  "IDLE"
                );

                isListeningRef.current =
                  false;

                const finalCorrected =
                  interpretTranscript(
                    finalTranscript,
                    "GENERAL"
                  );

                resolve(
                  finalCorrected.trim()
                );
              };

            recognitionRef.current.onerror =
              (
                event: any
              ) => {

                console.error(
                  "[MIC] Error:",
                  event.error
                );

                clearTimeout(
                  silenceTimerRef.current
                );

                setSpeechState(
                  "IDLE"
                );

                isListeningRef.current =
                  false;

                resolve("");
              };

            try {

              recognitionRef.current.start();

              silenceTimerRef.current =
                setTimeout(
                  () => {

                    console.log(
                      "[MIC] Initial silence timeout"
                    );

                    stopAndFinalize();

                  },
                  6000
                );

            } catch (e) {

              console.error(
                "[MIC] Start Error:",
                e
              );

              setSpeechState(
                "IDLE"
              );

              isListeningRef.current =
                false;

              resolve("");
            }
          }
        );
      },
      []
    );

  /* =========================================
     UNLOCK
  ========================================= */

  const unlock =
    useCallback(
      async () => {

        window.speechSynthesis.cancel();

        const silent =
          new SpeechSynthesisUtterance(
            ""
          );

        silent.volume = 0;

        window.speechSynthesis.speak(
          silent
        );

        setIsUnlocked(true);

        return true;
      },
      []
    );

  /* =========================================
     STOP
  ========================================= */

  const stopSpeech =
    useCallback(() => {

      window.speechSynthesis.cancel();

      clearTimeout(
        silenceTimerRef.current
      );

      if (
        recognitionRef.current
      ) {

        try {

          recognitionRef.current.stop();

        } catch (e) {

          console.error(
            "[MIC] Stop Error:",
            e
          );
        }
      }

      setSpeechState("IDLE");

      isListeningRef.current =
        false;

    }, []);

  return {
    speechState,
    isSupported,
    isUnlocked,
    isMobile:
      IS_MOBILE_DEVICE,
    transcript,
    speak,
    listen,
    unlock,
    stopSpeech,
  };
};