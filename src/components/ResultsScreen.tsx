import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  RotateCcw, 
  ChevronDown,
  Star, 
  MessageSquare,
  Zap,
  Brain,
  Cpu,
  BarChart2,
  ShieldAlert
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell
} from 'recharts';
import type { Answer, Role } from '../types';

interface ResultsScreenProps {
  answers: Answer[];
  role: Role;
  onReset: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ answers = [], role, onReset }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Analyzing Interview Data...");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const safeAnswers = useMemo(() => Array.isArray(answers) ? answers : [], [answers]);
  
  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingText("Generating AI Insights..."), 1200);
    const timer2 = setTimeout(() => setLoadingText("Calculating Metrics..."), 2400);
    const timer3 = setTimeout(() => setIsLoading(false), 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const metrics = useMemo(() => {
    if (safeAnswers.length === 0) return null;
    
    let totalOverall = 0;
    let totalTech = 0;
    let totalComm = 0;
    let totalPractical = 0;
    let totalRole = 0;
    let totalConcept = 0;

    const topicMap: Record<string, { total: number, count: number }> = {};

    safeAnswers.forEach(ans => {
      const evalData = ans.evaluation;
      if (!evalData) return;

      totalOverall += evalData.score || 0;
      totalTech += evalData.technicalScore || evalData.score || 0;
      totalComm += evalData.communicationScore || evalData.score || 0;
      totalPractical += evalData.practicalReasoningScore || evalData.score || 0;
      totalRole += evalData.roleSpecificScore || evalData.score || 0;
      totalConcept += evalData.conceptCoverageScore || evalData.score || 0;

      const topic = evalData.topic || 'General';
      if (!topicMap[topic]) topicMap[topic] = { total: 0, count: 0 };
      topicMap[topic].total += (evalData.score || 0);
      topicMap[topic].count += 1;
    });

    const len = safeAnswers.length;
    
    const radarData = [
      { subject: 'Technical', A: (totalTech / len) * 10, fullMark: 100 },
      { subject: 'Communication', A: (totalComm / len) * 10, fullMark: 100 },
      { subject: 'Practicality', A: (totalPractical / len) * 10, fullMark: 100 },
      { subject: 'Role Specific', A: (totalRole / len) * 10, fullMark: 100 },
      { subject: 'Concept Coverage', A: (totalConcept / len) * 10, fullMark: 100 },
    ];

    const topicData = Object.entries(topicMap).map(([key, val]) => ({
      name: key,
      score: Math.round((val.total / val.count) * 10)
    })).sort((a, b) => b.score - a.score);

    const avgScore = totalOverall / len;
    
    let readiness = "Needs More Practice";
    if (avgScore >= 9) readiness = `Ready for Senior ${role.replace('Salesforce ', '')}`;
    else if (avgScore >= 7.5) readiness = `Strong Intermediate Candidate`;
    else if (avgScore >= 6) readiness = `Ready for Junior ${role.replace('Salesforce ', '')}`;

    return {
      avgScore: Math.round(avgScore * 10) / 10,
      percentage: Math.round((totalOverall / len) * 10),
      radarData,
      topicData,
      readiness,
      techScore: Math.round((totalTech / len) * 10),
      commScore: Math.round((totalComm / len) * 10),
      practicalScore: Math.round((totalPractical / len) * 10),
      roleScore: Math.round((totalRole / len) * 10),
    };
  }, [safeAnswers, role]);

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-emerald-500';
    if (score >= 6) return 'text-cyan-500';
    if (score >= 4) return 'text-amber-500';
    return 'text-rose-500';
  };
  
  const getStrokeColor = (score: number) => {
    if (score >= 8.5) return '#10b981';
    if (score >= 6) return '#06b6d4';
    if (score >= 4) return '#f59e0b';
    return '#f43f5e';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 font-sans space-y-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
           <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin"></div>
           <Brain size={24} className="text-emerald-500 animate-pulse" />
        </div>
        <motion.div 
          key={loadingText}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-slate-400"
        >
          {loadingText}
        </motion.div>
      </div>
    );
  }

  if (!metrics || safeAnswers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 space-y-6">
        <div className="text-lg font-medium">No assessment data found.</div>
        <button onClick={onReset} className="px-6 py-2 bg-white text-slate-950 rounded-xl text-sm font-bold">Return to Base</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      
      {/* Assessment Header */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12"
      >
        <motion.div variants={itemVariants} className="lg:col-span-7 premium-glass rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10 bg-white/[0.01] border-white/10">
          <div className="relative shrink-0">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
              <motion.circle
                cx="80" cy="80" r="72" stroke={getStrokeColor(metrics.avgScore)} strokeWidth="5" fill="transparent"
                strokeDasharray={452}
                initial={{ strokeDashoffset: 452 }}
                animate={{ strokeDashoffset: 452 - (452 * metrics.percentage) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${getScoreColor(metrics.avgScore)} tracking-tight`}>{metrics.avgScore}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Score</span>
            </div>
          </div>

          <div className="flex-grow text-center md:text-left space-y-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Assessment <span className="text-emerald-500">Summary</span>
              </h1>
              <p className="text-slate-400 font-medium text-xs">
                {role}
              </p>
            </div>
            
            <div className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.05]">
              <div className={`text-sm font-bold ${getScoreColor(metrics.avgScore)} uppercase tracking-wide mb-1`}>{metrics.readiness}</div>
              <p className="text-[10px] text-slate-500 font-medium">Performance Insight</p>
            </div>

            <button onClick={onReset} className="cta-button flex items-center gap-2 text-xs">
              <span>Restart Interview</span>
              <RotateCcw size={12} />
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-5 premium-glass rounded-2xl p-8 flex flex-col items-center justify-center bg-white/[0.01] border-white/10">
          <div className="w-full flex justify-center mb-6">
             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
               <Target size={12} className="text-cyan-500" /> Skill Breakdown
             </div>
          </div>
          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metrics.radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 8, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Candidate" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Analytics Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12"
      >
        <motion.div variants={itemVariants} className="lg:col-span-7 premium-glass rounded-2xl p-10 bg-white/[0.01] border-white/10">
           <h3 className="text-[11px] font-bold text-white mb-8 uppercase tracking-widest flex items-center gap-3">
             <Cpu size={14} className="text-emerald-500" /> Competency Metrics
           </h3>
           <div className="space-y-8">
             <MetricBar label="Technical Proficiency" score={metrics.techScore} color="bg-emerald-500" />
             <MetricBar label="Communication Skill" score={metrics.commScore} color="bg-cyan-500" />
             <MetricBar label="Practical Reasoning" score={metrics.practicalScore} color="bg-purple-500" />
             <MetricBar label="Role Knowledge" score={metrics.roleScore} color="bg-amber-500" />
           </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-5 premium-glass rounded-2xl p-10 bg-white/[0.01] border-white/10">
           <h3 className="text-[11px] font-bold text-white mb-8 uppercase tracking-widest flex items-center gap-3">
             <BarChart2 size={14} className="text-amber-500" /> Topic Analysis
           </h3>
           <div className="w-full h-[220px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={metrics.topicData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.02)" />
                 <XAxis type="number" domain={[0, 100]} hide />
                 <YAxis dataKey="name" type="category" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} width={80} axisLine={false} tickLine={false} />
                 <RechartsTooltip 
                   cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                 />
                 <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={8}>
                    {metrics.topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getStrokeColor(entry.score / 10)} fillOpacity={0.6} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </motion.div>
      </motion.div>

      {/* AI Feedback */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="premium-glass rounded-2xl p-10 mb-16 bg-white/[0.01] border-white/10"
      >
        <div className="flex items-start gap-8">
          <div className="shrink-0 p-4 rounded-xl bg-emerald-500/5 text-emerald-500">
            <Brain size={32} />
          </div>
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest">Expert Evaluation</h3>
            <p className="text-white text-xl leading-relaxed font-medium tracking-tight">
              Analysis indicates a {metrics.avgScore >= 7 ? 'strong' : metrics.avgScore >= 5 ? 'solid' : 'developing'} command of {role} concepts. 
              {metrics.techScore > metrics.commScore 
                ? " Technical expertise is a clear strength, though communication could be refined." 
                : " Communication is excellent, effectively complementing your technical background."}
              {metrics.practicalScore >= 7 
                ? " You demonstrate readiness for enterprise-scale challenges." 
                : " We recommend further focus on complex architectural patterns."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Detailed Trace */}
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">Feedback Detail</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Question by question analysis</p>
          </div>
          <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-4 py-2 rounded-lg border border-white/5">
            {safeAnswers.length} Questions Evaluated
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {safeAnswers.map((answer, index) => (
            <motion.div 
              key={answer.questionId || index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`premium-card rounded-2xl overflow-hidden ${expandedQuestion === answer.questionId ? 'border-emerald-500/20 bg-white/[0.02]' : 'border-white/5 bg-white/[0.01]'}`}
            >
              <div 
                className="p-8 flex items-center justify-between cursor-pointer select-none transition-all duration-300"
                onClick={() => setExpandedQuestion(expandedQuestion === answer.questionId ? null : answer.questionId)}
              >
                <div className="flex items-center gap-8 flex-grow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                    (answer.evaluation?.score || 0) >= 8 ? 'bg-emerald-500/10 text-emerald-500' :
                    (answer.evaluation?.score || 0) >= 5 ? 'bg-amber-500/10 text-amber-500' :
                    'bg-rose-500/10 text-rose-500'
                  }`}>
                    {answer.evaluation?.score || 0}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Question {index + 1}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-800"></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{answer.evaluation?.topic || 'General'}</span>
                    </div>
                    <h3 className="text-base text-white font-semibold tracking-tight line-clamp-1">
                      {answer.questionText}
                    </h3>
                  </div>
                </div>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300 ${expandedQuestion === answer.questionId ? 'rotate-180 text-emerald-500' : 'text-slate-600'}`}>
                  <ChevronDown size={16} />
                </div>
              </div>

              <AnimatePresence>
                {expandedQuestion === answer.questionId && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-10 pb-10 space-y-8 border-t border-white/[0.05] pt-10">
                      <div className="space-y-4">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-3">
                          <MessageSquare size={12} className="text-emerald-500" /> Your Response
                        </div>
                        <div className="bg-white/[0.02] rounded-xl p-6 text-sm text-slate-300 border-l-2 border-emerald-500 italic">
                          "{answer.userAnswer}"
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-3">
                            <Star size={12} /> Key Strengths
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {answer.evaluation?.strengths?.map((s, i) => (
                              <span key={i} className="px-3 py-1.5 bg-emerald-500/5 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/5">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-3">
                            <ShieldAlert size={12} /> Improvement Areas
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {answer.evaluation?.missingPoints?.map((m, i) => (
                              <span key={i} className="px-3 py-1.5 bg-amber-500/5 text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/5">
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/[0.03] rounded-xl p-6 text-sm text-white font-medium border border-white/5">
                        <span className="text-emerald-500 font-bold uppercase tracking-widest mr-4 text-[10px]">AI Feedback:</span>
                        {answer.evaluation?.feedback || 'Feedback telemetry unavailable.'}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricBar = ({ label, score, color }: { label: string, score: number, color: string }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
      <span>{label}</span>
      <span className="text-white">{score}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${score}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className={`h-full ${color}`}
      />
    </div>
  </div>
);

export default ResultsScreen;
