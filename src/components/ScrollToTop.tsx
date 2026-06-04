import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useIsomorphicLayoutEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      } else {
        // Fallback for cases where element might not be in DOM yet (lazy loading)
        const timer = setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView();
        }, 0);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;