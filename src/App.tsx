import AuthButton from "./components/AuthButton";
import { useState, useEffect } from "react";
import SetupScreen from "./components/SetupScreen";
import ChatInterface from "./components/ChatInterface";
import ResultsScreen from "./components/ResultsScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import type { InterviewConfig, Answer } from "./types";
import { useAuth } from "./context/AuthContext";
import UserMenu from "./components/UserMenu";
import "./App.css";

type Phase = "setup" | "interview" | "results";

function App() {
  const { user } = useAuth();
  const [phase, setPhase] = useState<Phase>("setup");
  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedHistory, setSelectedHistory] =
  useState<any>(null);

const [showHistoryDetail, setShowHistoryDetail] =
  useState(false);

  const [showCreatorTag, setShowCreatorTag] = useState(false);

  useEffect(() => {
    // Always dark mode for the premium experience
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowCreatorTag(true);
      } else {
        setShowCreatorTag(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const stopSpeech = () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
    window.addEventListener("beforeunload", stopSpeech);

    return () => {
      window.removeEventListener("beforeunload", stopSpeech);
      stopSpeech();
    };
  }, []);

  const startInterview = (config: InterviewConfig) => {
    setConfig(config);
    setPhase("interview");
  };

  const completeInterview = (finalAnswers: Answer[]) => {
    setAnswers(finalAnswers || []);
    setPhase("results");
  };

  const resetInterview = () => {
    setPhase("setup");
    setConfig(null);
    setAnswers([]);
  };
  if (
  showHistoryDetail &&
  selectedHistory
) {
  return (
    <ErrorBoundary>
      <ResultsScreen
        answers={
          selectedHistory.full_results || []
        }
        role={selectedHistory.role}
        onReset={() => {
          setShowHistoryDetail(false);
          setSelectedHistory(null);
        }}
      />
    </ErrorBoundary>
  );
}

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-[#02040a] text-slate-300 font-sans selection:bg-emerald-500/20 overflow-x-hidden antialiased">
        {/* Cinematic Premium Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-aurora opacity-[0.15] sm:opacity-[0.25] sm:animate-aurora"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/10 to-[#02040a]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.05)_0%,transparent_50%)]"></div>
        </div>

        {/* New Premium Neon Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/10 bg-black/70 backdrop-blur-md sm:backdrop-blur-2xl">
          <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
            {/* Left Side Branding */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 rounded-xl sm:rounded-2xl bg-cyan-500/10 border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] sm:shadow-[0_0_30px_rgba(34,211,238,0.18)] transition-transform sm:hover:scale-105 duration-500 will-change-transform">
                <span className="font-bold text-base sm:text-lg tracking-tighter text-cyan-400">
                  F
                </span>
              </div>

              <div className="flex flex-col justify-center items-start text-left min-w-0">
                <h1 className="text-[13px] sm:text-base font-semibold tracking-wide text-white leading-none truncate">
                  ForcePilot AI
                </h1>
              </div>
            </div>

            {/* Right Side Auth */}
            <div className="flex items-center justify-end flex-shrink-0">
              {user ? (
                <UserMenu />
              ) : (
                <div className="flex justify-end min-w-0">
                  <AuthButton />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 pt-20 sm:pt-28 pb-4 min-h-[86vh] overflow-x-hidden">
          <div className="w-full lg:min-w-[1400px] max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-8 min-h-[86vh]">
            {phase === "setup" && (
              <SetupScreen
  onStart={startInterview}
  onViewHistoryDetail={(record) => {
    setSelectedHistory(record);
    setShowHistoryDetail(true);
  }}
/>
            )}

            {phase === "interview" && config && (
              <ChatInterface config={config} onComplete={completeInterview} />
            )}

            {phase === "results" && config && (
              <ResultsScreen
                answers={answers}
                role={config.role}
                onReset={resetInterview}
              />
            )}

            {!["setup", "interview", "results"].includes(phase) && (
              <div className="flex items-center justify-center min-h-[40vh] text-slate-500 text-xs font-medium">
                Error: Invalid phase detected.
              </div>
            )}
          </div>
        </main>

        {/* Floating Creator Branding */}
        {showCreatorTag ? (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50">
            <div className="rounded-full border border-cyan-400/20 bg-black/80 px-4 py-2 text-xs text-cyan-200/80 backdrop-blur-sm sm:backdrop-blur-xl">
              Engineered by Lalit Gattani
            </div>
          </div>
        ) : null}
      </div>
    </ErrorBoundary>
  );
}

export default App;
