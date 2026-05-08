/* eslint-disable react-hooks/set-state-in-effect */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Mic,
  Send,
  Cpu,
  User,
  UserCheck,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

import type {
  InterviewConfig,
  Answer,
  Message,
  Question,
} from "../types";

import {
  generateQuestion,
  evaluateAnswer,
} from "../utils/evaluation";

import { useSpeech } from "../hooks/useSpeech";

interface ChatInterfaceProps {
  config: InterviewConfig;
  onComplete: (answers: Answer[]) => void;
}

type InterviewStatus =
  | "INITIALIZING"
  | "AWAITING_UNLOCK"
  | "AI_SPEAKING"
  | "WAITING_FOR_ANSWER"
  | "LISTENING"
  | "ANALYZING"
  | "TRANSITIONING"
  | "COMPLETED";

const TOTAL_QUESTIONS_GOAL = 10;

const fallbackReplies = [
  "Alright.",
  "Okay.",
  "Understood.",
  "Got it.",
  "Hmm.",
];

const getRandomFallback = () =>
  fallbackReplies[
    Math.floor(Math.random() * fallbackReplies.length)
  ];

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  config,
  onComplete,
}) => {

  const [status, setStatus] =
    useState<InterviewStatus>("INITIALIZING");

  const [answers, setAnswers] =
    useState<Answer[]>([]);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [manualInput, setManualInput] =
    useState("");

  const [isManualMode, setIsManualMode] =
    useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState<Question | null>(null);

  const chatEndRef =
    useRef<HTMLDivElement>(null);

  const answersRef =
    useRef<Answer[]>([]);

  const askedQuestionsRef =
    useRef<string[]>([]);

  const isRunningRef =
    useRef(false);

  const isProcessingRef =
    useRef(false);

  const {
    speechState,
    isSupported,
    isUnlocked,
    isMobile,
    transcript,
    speak,
    listen,
    unlock,
    stopSpeech,
  } = useSpeech();

  useEffect(() => {
    if (
      speechState === "LISTENING" &&
      transcript
    ) {
      setManualInput(transcript);
    }
  }, [transcript, speechState]);

  useEffect(() => {
    if (isMobile || !isSupported) {
      setIsManualMode(true);
    }
  }, [isMobile, isSupported]);

  const runInterviewCycle =
    useCallback(async () => {

      if (
        isRunningRef.current ||
        status === "COMPLETED" ||
        answersRef.current.length >=
          TOTAL_QUESTIONS_GOAL
      ) {
        return;
      }

      isRunningRef.current = true;
      setStatus("TRANSITIONING");

      try {
        const askedTexts =
          answersRef.current.map(a => a.questionText);
        
        const nextQuestionText =
          await generateQuestion(
            config.role,
            config.difficulty,
            askedTexts
          );
        
        const nextQuestion: Question = {
          id: `gen-${Date.now()}`,
          text: nextQuestionText,
          category: "Generated",
          idealAnswer: "",
          difficulty: config.difficulty,
          concepts: [],
        };

        setCurrentQuestion(nextQuestion);

        const isFirstQuestion =
          answersRef.current.length === 0;

        let aiText =
          nextQuestion.text;

        if (isFirstQuestion) {
          aiText =
            `Greetings, ${config.candidateName}. ` +
            `I am your ${config.personality} evaluator. ` +
            `We will now begin the ${config.role} assessment. ` +
            `${nextQuestion.text}`;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: "interviewer",
            text: aiText,
            timestamp: Date.now(),
          },
        ]);

        setStatus("AI_SPEAKING");
        await speak(aiText);
        setStatus("WAITING_FOR_ANSWER");

      } catch (err) {
        console.error("Question Generation Error:", err);
        setStatus("WAITING_FOR_ANSWER");
      } finally {
        isRunningRef.current = false;
      }

    }, [config, speak, status]);

  const processUserResponse =
    useCallback(async (
      userResponse: string
    ) => {

      if (
        isProcessingRef.current ||
        status === "COMPLETED" ||
        !currentQuestion
      ) {
        return;
      }

      isProcessingRef.current = true;

      const cleanedResponse =
        userResponse.trim() ||
        "No answer provided.";

      const questionTextToLog =
        currentQuestion.text;

      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          sender: "candidate",
          text: cleanedResponse,
          timestamp: Date.now(),
        },
      ]);

      setStatus("ANALYZING");

      try {
        const evalResult =
          await evaluateAnswer(
            currentQuestion,
            cleanedResponse,
            config.role,
            config.difficulty,
            config.personality
          );

        const newAnswer: Answer = {
          questionId: currentQuestion.id,
          questionText:
            questionTextToLog,
          userAnswer:
            cleanedResponse,
          timeTaken: 0,
          evaluation: evalResult,
        };

        answersRef.current = [
          ...answersRef.current,
          newAnswer,
        ];

        askedQuestionsRef.current = [
          ...askedQuestionsRef.current,
          questionTextToLog,
        ];

        setAnswers([
          ...answersRef.current,
        ]);

        const acknowledgment =
          evalResult.acknowledgment ||
          getRandomFallback();

        setMessages((prev) => [
          ...prev,
          {
            id: `ack-${Date.now()}`,
            sender: "interviewer",
            text: acknowledgment,
            timestamp: Date.now(),
          },
        ]);

        setStatus("AI_SPEAKING");
        await speak(acknowledgment);

        if (
          answersRef.current.length >=
          TOTAL_QUESTIONS_GOAL
        ) {
          const finalText = "Thank you. This completes our session.";
          setMessages((prev) => [
            ...prev,
            {
              id: `complete-${Date.now()}`,
              sender: "interviewer",
              text: finalText,
              timestamp: Date.now(),
            },
          ]);
          await speak(finalText);
          setStatus("COMPLETED");
          onComplete(answersRef.current);
          return;
        }

        setTimeout(() => {
          runInterviewCycle();
        }, 600);

      } catch (err) {
        console.error("Evaluation Error:", err);
        setStatus("WAITING_FOR_ANSWER");
      } finally {
        isProcessingRef.current = false;
      }

    }, [currentQuestion, config, speak, onComplete, status, runInterviewCycle]);

  const triggerAutoListen =
    useCallback(async () => {

      if (
        status !== "WAITING_FOR_ANSWER" ||
        isManualMode ||
        speechState !== "IDLE" ||
        isProcessingRef.current ||
        isRunningRef.current
      ) {
        return;
      }

      const result =
        await listen(4000);

      if (
        result &&
        result.trim().length > 0
      ) {
        setManualInput("");
        await processUserResponse(result);
      } else {
        if (
          status === "WAITING_FOR_ANSWER" &&
          !isManualMode &&
          !isProcessingRef.current
        ) {
          await processUserResponse("Candidate remained silent.");
        }
      }

    }, [status, isManualMode, speechState, listen, processUserResponse]);

  useEffect(() => {
    if (
      !isMobile &&
      !isManualMode &&
      status === "WAITING_FOR_ANSWER" &&
      speechState === "IDLE" &&
      !isRunningRef.current &&
      !isProcessingRef.current
    ) {
      triggerAutoListen();
    }
  }, [status, isManualMode, isMobile, speechState, triggerAutoListen]);

  const handleManualSubmit =
    async () => {
      if (isProcessingRef.current || status === "AI_SPEAKING") return;
      if (!manualInput.trim()) return;
      const input = manualInput;
      setManualInput("");
      stopSpeech();
      await processUserResponse(input);
    };

  const handleMicClick =
    async () => {
      if (speechState === "LISTENING") {
        stopSpeech();
      } else {
        setIsManualMode(false);
        triggerAutoListen();
      }
    };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleManualSubmit();
    }
  };

  useEffect(() => {
    if (status === "INITIALIZING") {
      setStatus("AWAITING_UNLOCK");
    }
  }, [status]);

  useEffect(() => {
    if (status === "AWAITING_UNLOCK" && isUnlocked) {
      runInterviewCycle();
    }
  }, [isUnlocked, status, runInterviewCycle]);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [stopSpeech]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const getPersonaIcon = () => {
    if (config.personality === "Strict") return <ShieldCheck className="text-amber-400" size={14} />;
    if (config.personality === "Mentor") return <HeartHandshake className="text-cyan-400" size={14} />;
    return <UserCheck className="text-emerald-400" size={14} />;
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-16rem)]">
      
      {/* Handshake Mask */}
      {status === "AWAITING_UNLOCK" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <div className="max-w-xs w-full text-center space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Start Session</h3>
              <p className="text-xs text-slate-500 font-medium">Please enable audio to begin the interview.</p>
            </div>

            <button
              onClick={() => unlock()}
              className="cta-button w-full"
            >
              Enable Audio
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Interface */}
      <div className="h-full flex flex-col premium-glass rounded-2xl overflow-hidden border border-white/10">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center shadow-sm">
              <Cpu size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Interviewer</span>
                <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                <div className="flex items-center gap-1.5">
                  {getPersonaIcon()}
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{config.personality}</span>
                </div>
              </div>
              <h2 className="text-sm font-semibold text-white">{config.role}</h2>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-2">
             <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Progress</div>
             <div className="flex gap-1">
                {Array.from({ length: TOTAL_QUESTIONS_GOAL }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-4 h-1 rounded-full transition-all ${
                      i < answers.length ? 'bg-emerald-500' : 
                      i === answers.length ? 'bg-white/20 animate-pulse' : 'bg-white/5'
                    }`} 
                  />
                ))}
             </div>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8 scrollbar-hide">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === "candidate" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] ${msg.sender === "candidate" ? "text-right" : "text-left"}`}>
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider justify-end">
                    {msg.sender === "candidate" ? "You" : "AI Interviewer"}
                  </div>
                  <div className={`px-6 py-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "candidate" 
                    ? "bg-emerald-500/10 text-white border border-emerald-500/20" 
                    : "bg-white/[0.03] text-slate-200 border border-white/[0.05]"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-white/[0.05] bg-white/[0.01]">
          <div className="flex gap-4 items-end max-w-3xl mx-auto relative">
            <textarea
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isManualMode ? "Type your answer..." : "Listening..."}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-6 py-4 text-white text-sm outline-none resize-none transition-all focus:border-white/20 focus:bg-white/[0.05]"
              rows={1}
              style={{ minHeight: '60px', maxHeight: '150px' }}
            />
            {!isMobile && (
              <div className="flex gap-2 absolute right-4 bottom-4">
                <button
                  onClick={handleMicClick}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    speechState === "LISTENING" ? 'bg-rose-500 text-white' : 'bg-white/5 text-slate-500 hover:text-white'
                  }`}
                >
                  <Mic size={14} className={speechState === "LISTENING" ? 'animate-pulse' : ''} />
                </button>
                <button
                  disabled={!manualInput.trim()}
                  onClick={handleManualSubmit}
                  className="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center transition-all hover:scale-105 disabled:opacity-20 disabled:scale-100"
                >
                  <Send size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatInterface);
