import React from "react";
import { motion } from "framer-motion";

export type LoadingPhase = "analyzing" | "generating" | "idle";

interface InterviewThinkingStateProps {
  phase: LoadingPhase;
}

export const InterviewThinkingState: React.FC<InterviewThinkingStateProps> = ({
  phase,
}) => {
  return (
    <div
      className={`flex justify-start will-change-transform w-full transition-all duration-500 ease-in-out ${
        phase === "idle"
          ? "opacity-0 pointer-events-none invisible"
          : "opacity-100 mb-6"
      }`}
    >
      <div className="w-full text-left">
        {/* EXACT structural twin of AI message label in ChatInterface.tsx */}
        <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider justify-start">
          AI Interviewer
        </div>

        {/* EXACT structural twin of AI message bubble in ChatInterface.tsx */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm leading-relaxed bg-white/[0.03] text-slate-200 border border-white/[0.05] min-h-[60px] md:min-h-0 flex items-center relative overflow-hidden">
          {/* Lightweight static gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/[0.03] to-transparent opacity-40" />

          <div className="flex items-center gap-4 relative z-10 w-full">
            {/* Optimized thinking indicator */}
            <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
              {/* Soft opacity pulse only */}
              <motion.div
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 0.45 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="absolute w-full h-full rounded-full bg-emerald-500/10"
              />
              {/* Static center dot */}
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-md" />
            </div>

            <div className="flex flex-col flex-1">
              {/* Subtle progress indicator */}
              {phase !== "idle" && (
                <div className="w-48 h-0.5 bg-white/[0.03] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    key={phase}
                    transition={{ duration: 2.5, ease: "linear" }}
                    className="h-full bg-emerald-500/40"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
