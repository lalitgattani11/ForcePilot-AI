import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate, Navigate, Link, useLocation } from "react-router-dom";
import SetupScreen from "./components/SetupScreen";
const ChatInterface = lazy(() => import("./components/ChatInterface"));
const ResultsScreen = lazy(() => import("./components/ResultsScreen"));
import ErrorBoundary from "./components/ErrorBoundary";
import type { InterviewConfig, Answer } from "./types";
import logo from "./assets/logo.png";
import Navbar from "./components/Navbar";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import BackToTop from "./components/BackToTop";
import "./App.css";

const ApexInterviewQuestions = lazy(
  () => import("./components/ApexInterviewQuestions"),
);
const LwcInterviewGuide = lazy(() => import("./components/LwcInterviewGuide"));
const GovernorLimitsExplained = lazy(
  () => import("./components/GovernorLimitsExplained"),
);
const SalesforceMockInterview = lazy(
  () => import("./components/SalesforceMockInterview"),
);
const SalesforceAdminInterview = lazy(
  () => import("./components/SalesforceAdminInterview"),
);
const SalesforceFlowInterviewQuestions = lazy(
  () => import("./components/SalesforceFlowInterviewQuestions"),
);
const ApexTriggerInterviewQuestions = lazy(
  () => import("./components/ApexTriggerInterviewQuestions"),
);
const LwcCodingInterview = lazy(
  () => import("./components/LwcCodingInterview"),
);
const ScenarioBasedSalesforceInterview = lazy(
  () => import("./components/ScenarioBasedSalesforceInterview"),
);
const CareerRoadmap = lazy(() => import("./components/CareerRoadmap"));
const AIInsights = lazy(() => import("./components/AIInsights"));
const PrepTips = lazy(() => import("./components/PrepTips"));
const Platform = lazy(() => import("./components/Platform"));

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isInterviewPage = location.pathname === "/interview";

  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

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
    navigate("/#setup");
  };

  const onViewHistoryDetail = (record: any) => {
    setAnswers(record.full_results || []);
    navigate("/results");
  };

  return (
    <ErrorBoundary>
      <div className="relative flex flex-col min-h-screen bg-[#02040a] text-slate-300 font-sans selection:bg-emerald-500/20 antialiased overflow-x-hidden">
        {/* Cinematic Premium Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-aurora opacity-[0.08] sm:opacity-[0.25] sm:animate-aurora"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/10 to-[#02040a]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.05)_0%,transparent_50%)]"></div>
        </div>

        <Navbar />

        {/* Main Content */}
        <main className={`relative flex-grow pt-20 sm:pt-28 ${isInterviewPage ? 'pb-0' : 'pb-8 sm:pb-10'} overflow-visible`}>
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-5 lg:px-8">
            <Routes>
              <Route
                path="/"
                element={
                  <SetupScreen
                    onStart={startInterview}
                    onViewHistoryDetail={onViewHistoryDetail}
                  />
                }
              />
              <Route
                path="/interview"
                element={
                  config ? (
                    <Suspense
                      fallback={
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                        </div>
                      }
                    >
                      <ChatInterface
                        config={config}
                        onComplete={completeInterview}
                      />
                    </Suspense>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/results"
                element={
                  answers.length > 0 ? (
                    <Suspense
                      fallback={
                        <div className="min-h-screen flex items-center justify-center">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                        </div>
                      }
                    >
                      <ResultsScreen
                        answers={answers}
                        onReset={resetInterview}
                      />
                    </Suspense>
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />

              <Route
                path="/apex-interview-questions"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <ApexInterviewQuestions />
                  </Suspense>
                }
              />

              <Route
                path="/lwc-interview-guide"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <LwcInterviewGuide />
                  </Suspense>
                }
              />

              <Route
                path="/governor-limits-explained"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <GovernorLimitsExplained />
                  </Suspense>
                }
              />

              <Route
                path="/salesforce-mock-interview"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <SalesforceMockInterview />
                  </Suspense>
                }
              />

              <Route
                path="/salesforce-admin-interview"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <SalesforceAdminInterview />
                  </Suspense>
                }
              />

              <Route
                path="/salesforce-flow-interview-questions"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <SalesforceFlowInterviewQuestions />
                  </Suspense>
                }
              />

              <Route
                path="/apex-trigger-interview-questions"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <ApexTriggerInterviewQuestions />
                  </Suspense>
                }
              />

              <Route
                path="/lwc-coding-interview"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <LwcCodingInterview />
                  </Suspense>
                }
              />

              <Route
                path="/scenario-based-salesforce-interview"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <ScenarioBasedSalesforceInterview />
                  </Suspense>
                }
              />

              <Route
                path="/career-roadmap"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <CareerRoadmap />
                  </Suspense>
                }
              />

              <Route
                path="/ai-interview-insights"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <AIInsights />
                  </Suspense>
                }
              />

              <Route
                path="/interview-preparation-tips"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <PrepTips />
                  </Suspense>
                }
              />

              <Route
                path="/platform"
                element={
                  <Suspense
                    fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
                      </div>
                    }
                  >
                    <Platform />
                  </Suspense>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        {/* Footer Branding - Cinematic Enterprise SaaS Footer */}
        {!isInterviewPage && (
          <footer
            id="site-footer"
            className="w-full border-t border-white/5 bg-[#02040a] mt-auto relative z-10 overflow-hidden"
          >
          {/* Ambient Depth Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24">
            {/* Top: Brand & Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-12 lg:gap-16 mb-12 md:mb-16">
              {/* Brand Intelligence Unit */}
              <div className="md:col-span-6 flex flex-col items-center md:items-start space-y-5 md:space-y-6">
                <div
                  onClick={() => navigate("/")}
                  className="flex items-center justify-center md:justify-start gap-3 group shrink-0 cursor-pointer relative"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-lg group-hover:bg-cyan-500/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    <div className="relative h-8 w-8 rounded-xl overflow-hidden border border-cyan-400/20 shadow-lg transition-transform group-hover:scale-105 duration-500">
                      <img
                        src={logo}
                        alt="FP"
                        className="w-full h-full object-cover"
                        width="32"
                        height="32"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] sm:text-[15px] font-black text-white tracking-tight leading-none uppercase">
                      FORCE
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                        PILOT AI
                      </span>
                    </span>
                    <span className="text-[7px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-none mt-1">
                      Technical Intelligence
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-[12px] sm:text-[13px] leading-relaxed max-w-[280px] font-medium tracking-tight text-center md:text-left">
                  AI-powered Salesforce interview intelligence for modern
                  engineering teams.
                </p>
              </div>

              {/* Navigation Intelligence Grid */}
              <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-10 justify-items-center md:justify-items-end">
                <div className="space-y-4 md:space-y-5 text-center md:text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                    Platform
                  </h4>
                  <ul className="space-y-3 md:space-y-3.5">
                    <li>
                      <Link
                        to="/platform"
                        className="text-[12px] font-semibold text-slate-400 hover:text-cyan-400 transition-all duration-300"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/salesforce-mock-interview"
                        className="text-[12px] font-semibold text-slate-400 hover:text-cyan-400 transition-all duration-300"
                      >
                        Mock Interviews
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/analytics"
                        className="text-[12px] font-semibold text-slate-400 hover:text-cyan-400 transition-all duration-300"
                      >
                        Platform Overview
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4 md:space-y-5 text-center md:text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                    Resources
                  </h4>
                  <ul className="space-y-3 md:space-y-3.5">
                    <li>
                      <Link
                        to="/career-roadmap"
                        className="text-[12px] font-semibold text-slate-400 hover:text-cyan-400 transition-all duration-300"
                      >
                        Roadmap
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ai-interview-insights"
                        className="text-[12px] font-semibold text-slate-400 hover:text-cyan-400 transition-all duration-300"
                      >
                        Insights
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="hidden sm:block space-y-4 md:space-y-5 text-center md:text-left">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                    Ecosystem
                  </h4>
                  <ul className="space-y-3 md:space-y-3.5">
                    <li>
                      <Link
                        to="/interview-preparation-tips"
                        className="text-[12px] font-semibold text-slate-400 hover:text-cyan-400 transition-all duration-300"
                      >
                        Prep Tips
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/governor-limits-explained"
                        className="text-[12px] font-semibold text-slate-400 hover:text-cyan-400 transition-all duration-300"
                      >
                        Limits Guide
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Row: Refined SaaS Legal Strip */}
            <div className="pt-8 md:pt-10 border-t border-white/[0.03] flex flex-col items-center justify-center gap-4 md:gap-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500 md:text-slate-600 text-center">
                AI-Powered Salesforce Intelligence
              </div>
              <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400 md:text-slate-500 tracking-tight">
                <span>&copy; {new Date().getFullYear()} ForcePilot AI.</span>
                <span className="h-1 w-1 rounded-full bg-slate-900"></span>
                <span>All rights reserved.</span>
              </div>
            </div>
          </div>
        </footer>
        )}

        <PWAInstallPrompt />
        {!isInterviewPage && <BackToTop />}
      </div>
    </ErrorBoundary>
  );
}

export default App;
