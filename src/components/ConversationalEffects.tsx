import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Thinking State for the AI Recruiter
 */
export const ThinkingState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex justify-start mb-6"
    >
      <div className="w-full text-left">
        <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          AI Interviewer is thinking
        </div>
        <div className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] inline-flex items-center gap-2">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
          />
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, times: [0, 0.5, 1] }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
          />
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, times: [0, 0.5, 1] }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
          />
          <span className="ml-2 text-xs text-slate-500 italic font-medium">Analyzing response...</span>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Typewriter effect for AI messages
 */
interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  isStreaming?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 15, 
  onComplete,
  isStreaming = false
}) => {
  const [displayedText, setDisplayedText] = useState(isStreaming ? '' : text);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isStreaming) return;

    if (currentIndex < text.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } else {
      if (onComplete) onComplete();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, text, speed, onComplete, isStreaming]);

  return <span>{displayedText}</span>;
};
