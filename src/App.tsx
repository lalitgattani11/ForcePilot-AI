import AuthButton from "./components/AuthButton";
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SetupScreen from "./components/SetupScreen";
import ChatInterface from "./components/ChatInterface";
import ResultsScreen from "./components/ResultsScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import type { InterviewConfig, Answer } from "./types";
import { useAuth } from "./context/AuthContext";
import UserMenu from "./components/UserMenu";
import logo from "./assets/logo.png";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import "./App.css";

const ApexInterviewQuestions = lazy(() => import("./components/ApexInterviewQuestions"));
const LwcInterviewGuide = lazy(() => import("./components/LwcInterviewGuide"));
const GovernorLimitsExplained = lazy(() => import("./components/GovernorLimitsExplained"));
const SalesforceMockInterview = lazy(() => import("./components/SalesforceMockInterview"));
const SalesforceAdminInterview = lazy(() => import("./components/SalesforceAdminInterview"));
const SalesforceFlowInterviewQuestions = lazy(() => import("./components/SalesforceFlowInterviewQuestions"));
const ApexTriggerInterviewQuestions = lazy(() => import("./components/ApexTriggerInterviewQuestions"));
const LwcCodingInterview = lazy(() => import("./components/LwcCodingInterview"));
const ScenarioBasedSalesforceInterview = lazy(() => import("./components/ScenarioBasedSalesforceInterview"));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
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
    return () => window.removeEventListener("scroll", handleScroll);
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
    navigate("/interview");
  };

  const completeInterview = (finalAnswers: Answer[]) => {
    setAnswers(finalAnswers || []);
    navigate("/results");
  };

  const resetInterview = () => {
    setConfig(null);
    setAnswers([]);
    navigate("/");
  };

  const getSessionSlug = (role: string, id: string) => {
    const cleanRole = role
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `${cleanRole}--${id}`;
  };

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
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer group"
            >
              <div className="flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] sm:shadow-[0_0_30px_rgba(34,211,238,0.18)] transition-transform sm:group-hover:scale-105 duration-500 will-change-transform">
                <img
                  src={logo}
                  alt="ForcePilot AI"
                  className="w-full h-full object-cover"
                />
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
            <Routes>
              <Route
                path="/"
                element={
                  <SetupScreen
                    onStart={startInterview}
                    onViewHistoryDetail={(record) =>
                      navigate(
                        `/session/${getSessionSlug(record.role, record.id)}`,
                      )
                    }
                  />
                }
              />

              <Route
                path="/interview"
                element={
                  config ? (
                    <ChatInterface
                      config={config}
                      onComplete={completeInterview}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />

              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    {answers.length > 0 && config ? (
                      <ResultsScreen
                        answers={answers}
                        role={config.role}
                        onReset={resetInterview}
                      />
                    ) : (
                      <Navigate to="/" replace />
                    )}
                  </ProtectedRoute>
                }
              />

              <Route
                path="/session/:id"
                element={
                  <ProtectedRoute>
                    <ResultsScreen
                      answers={[]}
                      role="Salesforce Admin" // Fallback, will be updated by internal fetch
                      onReset={() => navigate("/")}
                    />
                  </ProtectedRoute>
                }
              />

              <Route 
                path="/apex-interview-questions" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                    </div>
                  }>
                    <ApexInterviewQuestions />
                  </Suspense>
                } 
              />

              <Route 
                path="/lwc-interview-guide" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                    </div>
                  }>
                    <LwcInterviewGuide />
                  </Suspense>
                } 
              />

              <Route 
                path="/governor-limits-explained" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
                    </div>
                  }>
                    <GovernorLimitsExplained />
                  </Suspense>
                } 
              />

              <Route 
                path="/salesforce-mock-interview" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                    </div>
                  }>
                    <SalesforceMockInterview />
                  </Suspense>
                } 
              />

              <Route 
                path="/salesforce-admin-interview" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                    </div>
                  }>
                    <SalesforceAdminInterview />
                  </Suspense>
                } 
              />

              <Route 
                path="/salesforce-flow-interview-questions" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                    </div>
                  }>
                    <SalesforceFlowInterviewQuestions />
                  </Suspense>
                } 
              />

              <Route 
                path="/apex-trigger-interview-questions" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                  }>
                    <ApexTriggerInterviewQuestions />
                  </Suspense>
                } 
              />

              <Route 
                path="/lwc-coding-interview" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                    </div>
                  }>
                    <LwcCodingInterview />
                  </Suspense>
                } 
              />

              <Route 
                path="/scenario-based-salesforce-interview" 
                element={
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
                    </div>
                  }>
                    <ScenarioBasedSalesforceInterview />
                  </Suspense>
                } 
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        {/* Floating Creator Branding */}
        {showCreatorTag ? (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 hidden md:block">
            <div className="rounded-full border border-cyan-400/20 bg-black/80 px-4 py-2 text-xs text-cyan-200/80 backdrop-blur-sm sm:backdrop-blur-xl">
              Engineered by Lalit Gattani
            </div>
          </div>
        ) : null}

        <PWAInstallPrompt />
      </div>
    </ErrorBoundary>
  );
}

export default App;
