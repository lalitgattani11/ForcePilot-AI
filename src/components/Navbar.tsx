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
  Settings
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signInWithGoogle, signOut } = useAuth();

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

  // Scroll handler for navbar background transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Salesforce Career Roadmap", href: "/salesforce-admin-interview", icon: Target, color: "emerald" },
    { name: "Interview Preparation Tips", href: "/salesforce-mock-interview", icon: Rocket, color: "cyan" },
    { name: "Salesforce Developer Guide", href: "/apex-interview-questions", icon: Terminal, color: "blue" },
    { name: "Salesforce Admin Guide", href: "/salesforce-admin-interview", icon: Settings, color: "rose" },
    { name: "AI Interview Insights", href: "/scenario-based-salesforce-interview", icon: BrainCircuit, color: "amber" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
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
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 cursor-pointer"
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
              className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive ? "text-white bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/salesforce-mock-interview" 
              className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive ? "text-emerald-400 bg-emerald-500/5" : "text-slate-400 hover:text-white hover:bg-white/5"
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
                  activeDropdown === 'guides' ? "text-white bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Interview Guides
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'guides' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'guides' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[520px] bg-slate-950/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] p-1.5 overflow-hidden z-[110]"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {guideLinks.map((guide) => (
                        <NavLink 
                          key={guide.href}
                          to={guide.href}
                          className={({ isActive }) => `flex items-center gap-2.5 p-1.5 rounded-xl transition-all duration-300 group/item ${
                            isActive ? "bg-emerald-500/10 text-emerald-400" : "hover:bg-white/5 text-slate-400 hover:text-white"
                          }`}
                        >
                          <div className={`shrink-0 p-1.5 rounded-lg bg-${guide.color}-500/10 text-${guide.color}-400 group-hover/item:scale-110 transition-transform`}>
                            <guide.icon size={14} />
                          </div>
                          <span className="text-[12px] font-bold truncate">{guide.name}</span>
                          <ChevronRight size={10} className="ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all shrink-0" />
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
                location.pathname === "/" && location.hash === "#analytics" ? "text-white bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"
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
                  activeDropdown === 'resources' ? "text-white bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Resources
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[520px] bg-slate-950/98 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] p-1.5 overflow-hidden z-[110]"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {resourceLinks.map((res) => (
                        <NavLink 
                          key={res.name}
                          to={res.href}
                          className="flex items-center gap-2.5 p-2 rounded-xl transition-all duration-300 group/item hover:bg-white/5 text-slate-400 hover:text-white"
                        >
                          <div className={`shrink-0 p-1.5 rounded-lg bg-${res.color}-500/10 text-${res.color}-400 group-hover/item:scale-110 transition-transform`}>
                            <res.icon size={14} />
                          </div>
                          <span className="text-[12px] font-bold truncate">{res.name}</span>
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
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white transition-all active:scale-90"
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
              className="fixed inset-0 top-0 bg-slate-950/40 backdrop-blur-md z-[90] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[82vw] max-w-[380px] bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-[100] lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header: Logo & Close */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg overflow-hidden border border-cyan-400/20">
                      <img src={logo} alt="FP" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-black text-white tracking-tight">FORCE<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">PILOT</span></span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-8 flex-1">
                  {!user ? (
                    <div className="space-y-4">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] px-4">Account</p>
                      <button 
                        onClick={() => signInWithGoogle()}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-bold text-sm transition-all hover:bg-white/[0.06] hover:border-white/20 active:scale-[0.98] shadow-lg group"
                      >
                        <FcGoogle size={22} className="group-hover:scale-110 transition-transform" />
                        <span>Sign in with Google</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                      <div className="relative">
                        <img 
                          src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || 'U')}&background=0D1117&color=22D3EE`} 
                          alt="U" 
                          className="h-11 w-11 rounded-xl object-cover border border-white/10" 
                        />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-bold text-white truncate">{user.user_metadata?.full_name || 'Candidate'}</span>
                        <span className="text-[10px] text-slate-500 truncate">{user.email}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] px-4">Navigation</p>
                    <div className="grid gap-1">
                      <NavLink 
                        to="/" 
                        className={({ isActive }) => `flex items-center gap-3 p-3.5 rounded-2xl text-[13px] font-bold transition-all ${
                          isActive ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {({ isActive }) => (
                          <>
                            <Rocket size={18} className={isActive ? "text-emerald-400" : "text-slate-500"} />
                            Home
                          </>
                        )}
                      </NavLink>
                      <button 
                        onClick={handleAnalyticsClick}
                        className="flex items-center gap-3 p-3.5 rounded-2xl text-[13px] font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all w-full text-left"
                      >
                        <LineChart size={18} className="text-slate-500" />
                        Analytics
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] px-4">Technical Tracks</p>
                    <div className="grid grid-cols-1 gap-1">
                      {guideLinks.map((guide) => (
                        <NavLink 
                          key={guide.href} 
                          to={guide.href} 
                          className={({ isActive }) => `flex items-center gap-3 p-3.5 rounded-2xl text-[13px] font-bold transition-all group/m-item ${
                            isActive ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {({ isActive }) => (
                            <>
                              <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-cyan-400/10 text-cyan-400" : "bg-white/5 text-slate-500 group-hover/m-item:text-white"}`}>
                                <guide.icon size={14} />
                              </div>
                              {guide.name}
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Logout (If user exists) */}
                {user && (
                  <div className="p-6 border-t border-white/5">
                    <button 
                      onClick={async () => {
                        await signOut();
                        setIsOpen(false);
                        navigate("/");
                      }}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/5 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-rose-500/10 hover:text-rose-400 transition-all border border-white/5"
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
