import React, { useState, useEffect, useRef } from 'react';

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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync displayedText with text if not streaming or if text changes
  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
    }
  }, [isStreaming, text]);

  // Handle typewriter effect
  useEffect(() => {
    if (!isStreaming) return;

    if (currentIndex < text.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } else {
      if (onComplete) {
        // Use a small delay to ensure the last character is rendered before calling onComplete
        const t = setTimeout(onComplete, 50);
        return () => clearTimeout(t);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, text, speed, onComplete, isStreaming]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
};
