import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type LoadingPhase = "analyzing" | "generating" | "initial" | "idle";

interface InterviewThinkingStateProps {
  phase: LoadingPhase;
}

export const InterviewThinkingState: React.FC<InterviewThinkingStateProps> = ({
  phase,
}) => {
  const getLoadingText = () => {
    switch (phase) {
      case "analyzing":
        return "Loading Technical Evaluation";
      case "generating":
        return "Preparing Question";
      case "initial":
        return "Initializing Interview Session";
      default:
        return "Preparing Assessment";
    }
  };

  return (
    <AnimatePresence mode="wait">
      {phase !== "idle" && (
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center py-12 w-full"
        >
          {/* Ultra-Minimal Activity Indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-1 h-1 rounded-full bg-emerald-500/50"
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.4em] ml-[0.4em]">
              {getLoadingText()}
            </h3>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
