import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-3 overflow-hidden z-[110]"
                  >
                    <div className="grid gap-1">
                      {guideLinks.map((guide) => (
                        <NavLink 
                          key={guide.href}
                          to={guide.href}
                          className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group/item ${
                            isActive ? "bg-emerald-500/10 text-emerald-400" : "hover:bg-white/5 text-slate-400 hover:text-white"
                          }`}
                        >
                          <div className={`p-2 rounded-lg bg-${guide.color}-500/10 text-${guide.color}-400 group-hover/item:scale-110 transition-transform`}>
                            <guide.icon size={16} />
                          </div>
                          <span className="text-[13px] font-bold">{guide.name}</span>
                          <ChevronRight size={12} className="ml-auto opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-3 overflow-hidden z-[110]"
                  >
                    <div className="grid gap-1">
                      {resourceLinks.map((res) => (
                        <NavLink 
                          key={res.name}
                          to={res.href}
                          className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group/item hover:bg-white/5 text-slate-400 hover:text-white"
                        >
                          <div className={`p-2 rounded-lg bg-${res.color}-500/10 text-${res.color}-400 group-hover/item:scale-110 transition-transform`}>
                            <res.icon size={16} />
                          </div>
                          <span className="text-[13px] font-bold">{res.name}</span>
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

          {/* MOBILE TOGGLE & AUTH */}
          <div className="flex items-center gap-3 lg:hidden">
            {!user && <AuthButton />}
            {user && (
              <div className="h-9 w-9 rounded-full overflow-hidden border border-white/10">
                <img 
                  src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || 'U')}&background=0D1117&color=22D3EE`} 
                  alt="U" 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white transition-all active:scale-90"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
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
              className="fixed inset-0 top-[72px] bg-slate-950/60 backdrop-blur-sm z-[90] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-[72px] right-0 bottom-0 w-[300px] bg-slate-900 border-l border-white/5 shadow-2xl z-[100] lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-8">
                {user && (
                  <div className="flex items-center gap-4 p-4 rounded-[2rem] bg-white/5 border border-white/5">
                    <img 
                      src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || 'U')}&background=0D1117&color=22D3EE`} 
                      alt="U" 
                      className="h-12 w-12 rounded-2xl object-cover" 
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-white truncate">{user.user_metadata?.full_name || 'Candidate'}</span>
                      <span className="text-[10px] text-slate-500 truncate">{user.email}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">Navigation</p>
                  <div className="grid gap-1">
                    <button 
                      onClick={handleAnalyticsClick}
                      className="flex items-center gap-3 p-4 rounded-2xl text-slate-300 font-bold hover:bg-white/5 transition-all w-full text-left"
                    >
                      <LineChart size={18} className="text-violet-400" />
                      Analytics
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-4">Technical Tracks</p>
                  <div className="grid grid-cols-1 gap-1">
                    {guideLinks.map((guide) => (
                      <NavLink key={guide.href} to={guide.href} className="flex items-center gap-3 p-3.5 rounded-2xl text-slate-400 text-[13px] font-bold hover:bg-white/5 transition-all">
                        <div className={`p-1.5 rounded-lg bg-${guide.color}-500/10 text-${guide.color}-400`}>
                          <guide.icon size={14} />
                        </div>
                        {guide.name}
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <Link 
                    to="/salesforce-mock-interview" 
                    className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-black uppercase tracking-widest text-center block shadow-lg shadow-emerald-500/10"
                  >
                    Start Technical Practice
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
