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
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-12 sm:py-20 w-full"
        >
          {/* Premium Orb Animation */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-emerald-500/10 border-t-emerald-500/40"
            />
            
            {/* Inner Pulsing Orb */}
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-8 h-8 rounded-full bg-emerald-500/20 blur-md"
            />
            
            {/* Center Core */}
            <motion.div
              animate={{ 
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            />

            {/* Orbiting Particles */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                className="absolute inset-0"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <motion.div 
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-emerald-400 mt-2 ml-1/2" 
                />
              </motion.div>
            ))}
          </div>

          {/* Loading Typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/70">
              Processing
            </span>
            <h3 className="text-sm font-bold text-slate-200 tracking-tight">
              {getLoadingText()}
            </h3>
            <div className="flex gap-1 mt-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 h-1 rounded-full bg-emerald-500/40"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
