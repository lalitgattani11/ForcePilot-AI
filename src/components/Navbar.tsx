import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Terminal,
  Layers,
  ShieldCheck,
  Workflow,
  Search,
  Code2,
  LineChart,
  BrainCircuit,
  Target,
  Rocket,
  Settings,
  Zap
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import UserMenu from "./UserMenu";
import AuthButton from "./AuthButton";
import logo from "../assets/logo.png";
import { FcGoogle } from 'react-icons/fc';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signInWithGoogle, signOut } = useAuth();

  const guideLinks = [
    { name: "Apex Questions", href: "/apex-interview-questions", icon: Terminal, color: "emerald" },
    { name: "Apex Triggers", href: "/apex-trigger-interview-questions", icon: Code2, color: "blue" },
    { name: "LWC Coding", href: "/lwc-coding-interview", icon: Layers, color: "cyan" },
    { name: "Governor Limits", href: "/governor-limits-explained", icon: ShieldCheck, color: "rose" },
    { name: "Salesforce Admin", href: "/salesforce-admin-interview", icon: Settings, color: "emerald" },
    { name: "Salesforce Flow", href: "/salesforce-flow-interview-questions", icon: Workflow, color: "cyan" },
    { name: "Scenario Based", href: "/scenario-based-salesforce-interview", icon: Search, color: "rose" },
  ];

  const resourceLinks = [
    { name: "Salesforce Career Roadmap", href: "/career-roadmap", icon: Target, color: "emerald" },
    { name: "AI Interview Insights", href: "/ai-interview-insights", icon: BrainCircuit, color: "amber" },
    { name: "Interview Preparation Tips", href: "/interview-preparation-tips", icon: Rocket, color: "cyan" },
  ];

  // Logic-based active states
  const isHomeActive = location.pathname === "/" && activeSection === "hero";
  const isPlatformActive = location.pathname === "/platform";
  const isAnalyticsActive = location.pathname === "/analytics" || (location.pathname === "/" && activeSection === "analytics");
  const isInterviewActive = ["/salesforce-mock-interview", "/interview", "/results"].includes(location.pathname);
  const isGuidesActive = guideLinks.some(link => location.pathname === link.href);
  const isResourcesActive = resourceLinks.some(link => location.pathname === link.href);

  const handleAnalyticsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("analytics")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#analytics");
      // Small timeout to allow navigation before scrolling
      setTimeout(() => {
        document.getElementById("analytics")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setActiveDropdown(null);
    setIsOpen(false);
  };

  // Scroll handler for navbar background transparency & scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      if (location.pathname === "/") {
        const analyticsSection = document.getElementById("analytics");
        if (analyticsSection) {
          const rect = analyticsSection.getBoundingClientRect();
          // If analytics section is in view (top is above the middle of viewport)
          if (rect.top < 400 && rect.bottom > 200) {
            setActiveSection("analytics");
          } else {
            setActiveSection("hero");
          }
        } else {
          setActiveSection("hero");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Close dropdowns/mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 border-b ${
        scrolled 
          ? "bg-slate-950/80 backdrop-blur-xl border-white/5 py-3 shadow-2xl" 
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LEFT: LOGO */}
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 cursor-pointer relative z-[110]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-lg group-hover:bg-cyan-500/30 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl overflow-hidden border border-cyan-400/20 shadow-lg transition-transform sm:group-hover:scale-105 duration-500">
                <img src={logo} alt="FP" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black text-white tracking-tight leading-none">FORCE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">PILOT AI</span></span>
              <span className="hidden sm:block text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-none mt-1">Technical Intelligence</span>
            </div>
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink 
              to="/" 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                isHomeActive ? "text-emerald-400 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </NavLink>

            <NavLink 
              to="/platform" 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                isPlatformActive ? "text-emerald-400 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Platform
            </NavLink>
            
            <NavLink 
              to="/salesforce-mock-interview" 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                isInterviewActive ? "text-emerald-400 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Mock Interview
            </NavLink>

            {/* Dropdown: Interview Guides */}
            <div className="relative" ref={activeDropdown === 'guides' ? dropdownRef : null}>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'guides' ? null : 'guides')}
                onMouseEnter={() => setActiveDropdown('guides')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  (activeDropdown === 'guides' || isGuidesActive) ? "text-emerald-400 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Interview Guides
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'guides' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'guides' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-[-4px] w-[480px] bg-slate-950/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] p-1 overflow-hidden z-[110]"
                  >
                    <div className="grid grid-cols-2 gap-0.5">
                      {guideLinks.map((guide) => (
                        <NavLink 
                          key={guide.href}
                          to={guide.href}
                          className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300 group/item ${
                            isActive ? "bg-emerald-500/10 text-emerald-400" : "hover:bg-white/5 text-slate-400 hover:text-white"
                          }`}
                        >
                          <div className={`shrink-0 p-1.5 rounded-lg bg-${guide.color}-500/10 text-${guide.color}-400 group-hover/item:scale-110 transition-transform`}>
                            <guide.icon size={13} />
                          </div>
                          <span className="text-[11.5px] font-bold truncate tracking-tight">{guide.name}</span>
                          <ChevronRight size={10} className="ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={handleAnalyticsClick}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                isAnalyticsActive 
                  ? "text-emerald-400 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Analytics
            </button>

            {/* Dropdown: Resources */}
            <div className="relative" ref={activeDropdown === 'resources' ? dropdownRef : null}>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                onMouseEnter={() => setActiveDropdown('resources')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  (activeDropdown === 'resources' || isResourcesActive) ? "text-emerald-400 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Resources
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-[-4px] w-[280px] bg-slate-950/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] p-1 overflow-hidden z-[110]"
                  >
                    <div className="grid grid-cols-1 gap-0.5">
                      {resourceLinks.map((res) => (
                        <NavLink 
                          key={res.name}
                          to={res.href}
                          className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300 group/item ${
                            isActive ? "bg-emerald-500/10 text-emerald-400" : "hover:bg-white/5 text-slate-400 hover:text-white"
                          }`}
                        >
                          <div className={`shrink-0 p-1.5 rounded-lg bg-${res.color}-500/10 text-${res.color}-400 group-hover/item:scale-110 transition-transform`}>
                            <res.icon size={13} />
                          </div>
                          <span className="text-[11.5px] font-bold truncate tracking-tight">{res.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: AUTH */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? <UserMenu /> : <AuthButton />}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex items-center lg:hidden relative z-[110]">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white transition-all active:scale-90 pointer-events-auto"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          </div>
          </div>

      {/* MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-0 bg-slate-950/40 backdrop-blur-md z-[9998] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 h-[100dvh] w-[88vw] max-w-[400px] bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-[9999] lg:hidden overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header: Logo & Close */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg overflow-hidden border border-cyan-400/20">
                      <img src={logo} alt="FP" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[14px] font-black text-white tracking-tight">FORCE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">PILOT</span></span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors relative z-[10000]"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="px-6 py-4 flex-1 flex flex-col justify-center gap-4 overflow-hidden">
                  {!user ? (
                    <div className="space-y-3">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] px-3">Identity Center</p>
                      <button 
                        onClick={() => signInWithGoogle()}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-bold text-[13px] transition-all hover:bg-white/[0.06] hover:border-white/20 active:scale-[0.98] shadow-lg group"
                      >
                        <FcGoogle size={20} className="group-hover:scale-110 transition-transform" />
                        <span>Sign in with Google</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <div className="relative">
                        <img 
                          src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || 'U')}&background=0D1117&color=22D3EE`} 
                          alt="U" 
                          className="h-9 w-9 rounded-xl object-cover border border-white/10" 
                        />
                        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[12px] font-bold text-white truncate">{user.user_metadata?.full_name || 'Candidate'}</span>
                        <span className="text-[9px] text-slate-500 truncate">{user.email}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] px-3">Intelligence</p>
                    <div className="grid gap-0.5">
                      <NavLink 
                        to="/" 
                        className={`flex items-center gap-3 p-2.5 rounded-2xl text-[12px] font-bold transition-all ${
                          isHomeActive ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Rocket size={16} className={isHomeActive ? "text-emerald-400" : "text-slate-500"} />
                        Home
                      </NavLink>
                      <NavLink 
                        to="/platform" 
                        className={`flex items-center gap-3 p-2.5 rounded-2xl text-[12px] font-bold transition-all ${
                          isPlatformActive ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Layers size={16} className={isPlatformActive ? "text-emerald-400" : "text-slate-500"} />
                        Platform
                      </NavLink>
                      <NavLink 
                        to="/salesforce-mock-interview" 
                        className={`flex items-center gap-3 p-2.5 rounded-2xl text-[12px] font-bold transition-all ${
                          isInterviewActive ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Zap size={16} className={isInterviewActive ? "text-emerald-400" : "text-slate-500"} />
                        Mock Interview
                      </NavLink>
                      <button 
                        onClick={handleAnalyticsClick}
                        className={`flex items-center gap-3 p-2.5 rounded-2xl text-[12px] font-bold transition-all w-full text-left ${
                          isAnalyticsActive ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <LineChart size={16} className={isAnalyticsActive ? "text-emerald-400" : "text-slate-500"} />
                        Analytics
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] px-3">Technical Tracks</p>
                    <div className="grid grid-cols-1 gap-0.5">
                      {guideLinks.map((guide) => (
                        <NavLink 
                          key={guide.href} 
                          to={guide.href} 
                          className={({ isActive }) => `flex items-center gap-3 p-2 rounded-xl text-[12px] font-bold transition-all group/m-item ${
                            isActive ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {({ isActive }) => (
                            <>
                              <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-cyan-400/10 text-cyan-400" : "bg-white/5 text-slate-500 group-hover/m-item:text-white"}`}>
                                <guide.icon size={12} />
                              </div>
                              {guide.name}
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] px-3">Intelligence Resources</p>
                    <div className="grid grid-cols-1 gap-0.5">
                      {resourceLinks.map((res) => (
                        <NavLink 
                          key={res.href} 
                          to={res.href} 
                          className={({ isActive }) => `flex items-center gap-3 p-2 rounded-xl text-[12px] font-bold transition-all group/m-item ${
                            isActive ? "bg-amber-500/10 text-amber-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {({ isActive }) => (
                            <>
                              <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-amber-400/10 text-amber-400" : "bg-white/5 text-slate-500 group-hover/m-item:text-white"}`}>
                                <res.icon size={12} />
                              </div>
                              {res.name}
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Logout (If user exists) */}
                {user && (
                  <div className="p-6 border-t border-white/5 shrink-0">
                    <button 
                      onClick={async () => {
                        await signOut();
                        setIsOpen(false);
                        navigate("/");
                      }}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/5 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:bg-rose-500/10 hover:text-rose-400 transition-all border border-white/5"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
