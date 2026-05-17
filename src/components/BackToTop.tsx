import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        // Trigger when at least 10% of the footer is visible
        threshold: 0.1 
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] h-10 w-10 flex items-center justify-center rounded-full border border-white/5 bg-slate-900/40 backdrop-blur-md text-slate-500 hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-slate-900/60 transition-all duration-500 group"
          aria-label="Back to top"
        >
          <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform duration-500 ease-out" />
          
          {/* Subtle Ambient Glow on Hover */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/5 blur-xl transition-all duration-500" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
