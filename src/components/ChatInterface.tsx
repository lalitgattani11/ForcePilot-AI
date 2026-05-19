/* eslint-disable react-hooks/set-state-in-effect */

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { motion } from "framer-motion";

import {
  Mic,
  Send,
  Cpu,
  UserCheck,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

import { TypewriterText } from "./ConversationalEffects";
import { InterviewThinkingState } from "./InterviewThinkingState";

import type {
  InterviewConfig,
  Answer,
  Message,
  Question,
  EvaluationResult,
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

  const [streamingMessageId, setStreamingMessageId] =
    useState<string | null>(null);

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
          Array.isArray(answersRef.current) ? answersRef.current.map(a => a.questionText || "") : [];
        
        const nextQuestionText =
          await generateQuestion(
            config.role || "Professional Readiness",
            config.difficulty || "Fresher",
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

        // Subtle delay for premium "thinking" feel
        await new Promise(resolve => setTimeout(resolve, 800));

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

        const msgId = `ai-${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
            sender: "interviewer",
            text: aiText,
            timestamp: Date.now(),
          },
        ]);

        setStreamingMessageId(msgId);
        setStatus("AI_SPEAKING");
        await speak(aiText);
        setStreamingMessageId(null);
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
        (userResponse || "").trim() ||
        "No answer provided.";

      const questionTextToLog =
        currentQuestion?.text || "Question";

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
        const prevEvals = answersRef.current
          .map(a => a.evaluation)
          .filter((e): e is EvaluationResult => !!e);

        const evalResult =
          await evaluateAnswer(
            currentQuestion,
            cleanedResponse,
            config.role,
            config.difficulty,
            config.personality,
            prevEvals
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

        // Simulated processing/thinking delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const ackId = `ack-${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          {
            id: ackId,
            sender: "interviewer",
            text: acknowledgment,
            timestamp: Date.now(),
          },
        ]);

        setStreamingMessageId(ackId);
        setStatus("AI_SPEAKING");
        await speak(acknowledgment);

        if (
          answersRef.current.length >=
          TOTAL_QUESTIONS_GOAL
        ) {
          const finalText = "Thank you. This completes our session.";
          const finishId = `complete-${Date.now()}`;
          setMessages((prev) => [
            ...prev,
            {
              id: finishId,
              sender: "interviewer",
              text: finalText,
              timestamp: Date.now(),
            },
          ]);
          setStreamingMessageId(finishId);
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

  const [isInterviewReady, setIsInterviewReady] =
    useState(false);

  useEffect(() => {
    const initializeInterview = async () => {
      // Simulate/wait for necessary initialization
      await Promise.resolve();
      
      // Ensure layout has a chance to settle
      requestAnimationFrame(() => {
        setIsInterviewReady(true);
      });
    };

    initializeInterview();
  }, []);

  useEffect(() => {
    if (status === "INITIALIZING" && isInterviewReady) {
      setStatus("AWAITING_UNLOCK");
    }
  }, [status, isInterviewReady]);

  useEffect(() => {
    if (status === "AWAITING_UNLOCK" && isUnlocked) {
      runInterviewCycle();
    }
  }, [isUnlocked, status, runInterviewCycle]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [stopSpeech]);

  const handleTypewriterComplete = useCallback((id: string) => {
    setStreamingMessageId(prev => prev === id ? null : prev);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, streamingMessageId]); // Also scroll when streaming updates height

  const getPersonaIcon = () => {
    if (config.personality === "Strict") return <ShieldCheck className="text-amber-400" size={14} />;
    if (config.personality === "Mentor") return <HeartHandshake className="text-cyan-400" size={14} />;
    return <UserCheck className="text-emerald-400" size={14} />;
  };

  if (!isInterviewReady) {
    return (
      <div className="flex h-[calc(100dvh-theme(spacing.20))] sm:h-[calc(100vh-theme(spacing.28))] items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-12 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
          <p className="text-xs font-bold tracking-[0.2em] text-cyan-400/60 uppercase">Initializing Simulator</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-80px)] sm:h-[calc(100vh-theme(spacing.28)-theme(spacing.2))] flex flex-col bg-[#050816] sm:bg-transparent overflow-hidden fixed top-20 inset-x-0 bottom-0 z-40 sm:static sm:z-auto w-full lg:min-w-[1400px] max-w-[1600px] mx-auto sm:premium-glass sm:rounded-3xl sm:border sm:border-white/10 sm:mb-0">
      
      {/* Handshake Mask */}
      {status === "AWAITING_UNLOCK" && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm sm:backdrop-blur-xl flex items-center justify-center p-6">
          <div className="max-w-xs w-full text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-white">Start Session</h2>
              <p className="text-xs text-slate-400 font-medium">Please enable audio to begin the interview.</p>
            </div>

            <button
              onClick={() => unlock()}
              className="cta-button w-full"
            >
              Enable Audio
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="shrink-0 border-b border-white/5 z-50 bg-[#050816]">
        <header className="px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center bg-[#050816] sm:bg-white/[0.02]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white text-slate-950 flex items-center justify-center shadow-sm">
              <Cpu size={18} className="sm:size-[20px]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Interviewer</span>
                <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  {getPersonaIcon()}
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">{config.personality}</span>
                </div>
              </div>
              <h1 className="text-xs sm:text-sm font-semibold text-white truncate max-w-[150px] sm:max-w-none">{config.role}</h1>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 sm:gap-2">
             <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Progress</div>
             <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: TOTAL_QUESTIONS_GOAL }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2.5 sm:w-4 h-1 rounded-full transition-all ${
                      i < answers.length ? 'bg-emerald-500' : 
                      i === answers.length ? 'bg-white/20 animate-pulse' : 'bg-white/5'
                    }`} 
                  />
                ))}
             </div>
          </div>
        </header>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide bg-[#050816] sm:bg-[#050816]/30">
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 scroll-smooth 
          sm:scrollbar-thin sm:scrollbar-thumb-emerald-500/20 sm:scrollbar-track-transparent sm:hover:scrollbar-thumb-emerald-500/40 
          sm:[&::-webkit-scrollbar]:w-1.5
          sm:[&::-webkit-scrollbar-track]:bg-transparent
          sm:[&::-webkit-scrollbar-thumb]:bg-emerald-500/10
          sm:[&::-webkit-scrollbar-thumb]:rounded-full
          sm:[&::-webkit-scrollbar-thumb]:border-transparent
          sm:hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/30
          sm:[&::-webkit-scrollbar-thumb]:shadow-[0_0_10px_rgba(16,185,129,0.1)]">
          {messages.map((msg) => {
            return (
              <motion.div
                key={msg.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === "candidate" ? "justify-end" : "justify-start"}`}
              >
                <div className={`w-full ${msg.sender === "candidate" ? "text-right" : "text-left"}`}>
                  <div className={`flex items-center gap-2 mb-1.5 sm:mb-2 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider ${msg.sender === "candidate" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "candidate" ? "You" : "AI Interviewer"}
                  </div>
                  <div className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "candidate" 
                    ? "bg-emerald-500/10 text-white border border-emerald-500/20" 
                    : "bg-white/[0.03] text-slate-200 border border-white/[0.05] min-h-[60px] md:min-h-0 flex items-center"
                  }`}>
                    {msg.sender === "interviewer" ? (
                      <TypewriterText 
                        text={msg.text} 
                        isStreaming={msg.id === streamingMessageId}
                        onComplete={() => handleTypewriterComplete(msg.id)}
                      />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          <InterviewThinkingState 
            phase={
              status === "ANALYZING" ? "analyzing" : 
              (status === "TRANSITIONING" || (status === "AWAITING_UNLOCK" && messages.length === 0)) ? "generating" : 
              "idle"
            } 
          />
          <div ref={chatEndRef} />
        </main>
      </div>

      {/* INPUT */}
      <div className="shrink-0 border-t border-white/5 bg-[#050816]">
        <footer className="p-4 sm:p-8 bg-[#050816] sm:bg-white/[0.01]">
          <div className="flex gap-3 sm:gap-4 items-end w-full mx-auto relative">
            <label htmlFor="manualInput" className="sr-only">Type your answer</label>
            <textarea
              id="manualInput"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isManualMode ? "Type your answer..." : "Listening..."}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white text-sm outline-none resize-none transition-all focus:border-white/20 focus:bg-white/[0.05]"
              rows={1}
              style={{ minHeight: '50px', maxHeight: '150px' }}
            />
            
            <div className="flex gap-2 shrink-0 sm:absolute sm:right-4 sm:bottom-4">
              <button
                onClick={handleMicClick}
                aria-label={speechState === "LISTENING" ? "Stop listening" : "Start voice input"}
                className={`hidden sm:flex w-10 h-10 sm:w-8 sm:h-8 rounded-lg items-center justify-center transition-all ${
                  speechState === "LISTENING" ? 'bg-rose-500 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Mic size={16} className={`${speechState === "LISTENING" ? 'animate-pulse' : ''} sm:size-[14px]`} />
              </button>
              <button
                disabled={!manualInput.trim()}
                onClick={handleManualSubmit}
                aria-label="Send message"
                className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center transition-all hover:scale-105 disabled:opacity-20 disabled:scale-100"
              >
                <Send size={16} className="sm:size-[14px]" />
              </button>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
};

export default ChatInterface;
