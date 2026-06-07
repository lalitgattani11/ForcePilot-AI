const fs = require('fs');
const content = fs.readFileSync('src/components/AnalyticsDashboard.tsx', 'utf8');

const startStr = '      {/* 3. Technical Trajectory: V3 Refinement */}';
const startIndex = content.indexOf(startStr);

if (startIndex === -1) {
  console.log('Start string not found.');
  process.exit(1);
}

const beforeContent = content.substring(0, startIndex);

const newBlock = `      {/* 3. Technical Trajectory: V4 Refinement */}
      <section className="relative mt-8 space-y-6">
        {/* ROW 1: Premium Analytics Strip */}
        <div className="premium-glass rounded-2xl p-4 sm:p-5 border border-white/5 bg-slate-950/40 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
               <TrendingUp size={14} />
             </div>
             <div>
               <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Intelligence Module</div>
               <div className="text-sm font-black text-white uppercase tracking-wider">Technical Trajectory</div>
             </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <Activity size={12} className="text-slate-600"/>
              <div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Latest</div>
                <div className="text-base font-black text-white">{stats.timelineData.length > 0 ? \`\${stats.timelineData[stats.timelineData.length - 1].score}%\` : 'N/A'}</div>
              </div>
            </div>
            <div className="w-px h-6 bg-white/5 hidden sm:block" />
            <div className="flex items-center gap-3">
              <Target size={12} className="text-slate-600"/>
              <div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Best</div>
                <div className="text-base font-black text-emerald-400">{stats.timelineData.length > 0 ? \`\${Math.max(...stats.timelineData.map(d => d.score))}%\` : 'N/A'}</div>
              </div>
            </div>
            <div className="w-px h-6 bg-white/5 hidden sm:block" />
            <div className="flex items-center gap-3">
              <ShieldCheck size={12} className="text-slate-600"/>
              <div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Sessions</div>
                <div className="text-base font-black text-white">{stats.totalInterviews}</div>
              </div>
            </div>
            <div className="w-px h-6 bg-white/5 hidden sm:block" />
            <div className="flex items-center gap-3">
              <Lock size={12} className="text-slate-600"/>
              <div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Remaining</div>
                <div className="text-base font-black text-rose-400">{Math.max(5 - stats.totalInterviews, 0)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN HERO COMPONENT */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left: Progression Centerpiece */}
          <div className="xl:col-span-8 premium-glass rounded-3xl p-6 sm:p-10 border border-white/5 bg-slate-950/20 relative flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/[0.03] blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/[0.02] blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-start gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-black text-cyan-400 uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                <Brain size={12} /> ForcePilot AI
              </div>
              <div className="space-y-1 max-w-lg">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-snug">
                  Your intelligence profile is evolving.
                </h2>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  ForcePilot is actively calibrating your unique performance signature. Complete the required simulations to establish verified recruiter-grade analytics.
                </p>
              </div>
            </div>

            {/* UNLOCK JOURNEY TIMELINE */}
            <div className="relative z-10 w-full mt-2">
              {/* Progress Summary directly above the roadmap */}
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-2xl font-black text-white tracking-tighter leading-none mb-1">
                    {Math.min(Math.round((stats.totalInterviews / 5) * 100), 100)}% Complete
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span>{stats.totalInterviews} / 5 Interviews Completed</span>
                    {stats.totalInterviews < 5 && (
                      <React.Fragment>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span className="text-rose-400">{Math.max(5 - stats.totalInterviews, 0)} Remaining</span>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full relative py-4">
                {/* Connecting Line */}
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1.5 bg-slate-900/80 rounded-full overflow-hidden border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: \`\${Math.min((stats.totalInterviews / 5) * 100, 100)}%\` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  />
                </div>

                {/* Milestones */}
                <div className="relative flex justify-between items-center px-4">
                  {[
                    { label: "Baseline", req: 1 },
                    { label: "Accuracy", req: 2 },
                    { label: "Growth", req: 3 },
                    { label: "Benchmark", req: 4 },
                    { label: "Forecast", req: 5 }
                  ].map((m, i) => {
                    const isDone = stats.totalInterviews >= m.req;
                    const isCurrent = stats.totalInterviews === m.req - 1;
                    
                    return (
                      <div key={i} className="flex flex-col items-center relative group w-0">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.15 }}
                          className={\`w-10 h-10 rounded-full flex items-center justify-center border-[3px] relative z-10 transition-all duration-500 bg-slate-950 \${
                            isDone 
                              ? 'border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                              : isCurrent 
                                ? 'border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-110' 
                                : 'border-slate-800 text-slate-700'
                          }\`}
                        >
                          {isDone ? <Check size={16} strokeWidth={3} /> : isCurrent ? <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" /> : <div className="w-2 h-2 rounded-full bg-slate-800" />}
                        </motion.div>
                        <div className="absolute top-14 w-16 sm:w-20 text-center -ml-8 sm:-ml-10">
                          <div className={\`text-[9px] font-black uppercase tracking-widest leading-tight transition-colors duration-500 \${
                            isDone ? 'text-emerald-400' : isCurrent ? 'text-cyan-400' : 'text-slate-600'
                          }\`}>
                            {m.label}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Next Milestone & Vault */}
          <div className="xl:col-span-4 flex flex-col gap-4 sm:gap-6">
            
            {/* Motivational Next Milestone */}
            {stats.totalInterviews < 5 && (
              <div className="premium-glass rounded-2xl p-5 sm:p-6 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent relative group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Target size={12} className="text-cyan-400" />
                    <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Next Milestone</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[9px] font-black text-rose-400 uppercase tracking-widest">
                     {Math.max(5 - stats.totalInterviews, 0)} Remaining
                  </div>
                </div>
                <div className="text-lg font-black text-white tracking-tight mb-1">
                  {stats.totalInterviews === 0 ? "Performance Baseline" : stats.totalInterviews === 1 ? "Accuracy Tracking" : stats.totalInterviews === 2 ? "Growth Intelligence" : stats.totalInterviews === 3 ? "Recruiter Benchmarking" : "Predictive Forecasting"}
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  Complete your next interview to unlock continuous learning paths and verified trajectory mapping.
                </p>
              </div>
            )}

            {/* Locked Intelligence Panel (Vault) */}
            <div className="premium-glass rounded-2xl p-5 sm:p-6 border border-white/5 bg-[#020617] relative flex flex-col justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] flex-1">
              {stats.totalInterviews < 5 ? (
                <React.Fragment>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32 bg-cyan-500/[0.04] blur-[40px] animate-pulse rounded-full" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                       <div>
                         <div className="text-sm font-black text-white tracking-tighter leading-none mb-1">INTELLIGENCE VAULT</div>
                         <div className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Unlocks at 5 Interviews</div>
                       </div>
                       <div className="w-8 h-8 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500 shadow-[0_0_10px_rgba(0,0,0,0.5)] shrink-0">
                         <Lock size={14} />
                       </div>
                    </div>
                    
                    <div className="mt-auto space-y-3">
                       <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Includes:</div>
                       <ul className="space-y-2 text-[10px] font-bold text-slate-400">
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" /> Growth Forecasting</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" /> Recruiter Benchmarking</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" /> Pattern Recognition</li>
                         <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" /> Trajectory Analysis</li>
                       </ul>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full bg-emerald-500/[0.04] blur-[40px]" />
                  </div>
                  <div className="relative z-10 w-full h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Vault Active</span>
                      </div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Trajectory</span>
                    </div>
                    <div className="flex-1 w-full -ml-3 min-h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.timelineData}>
                          <defs>
                            <linearGradient id="vaultScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', fontSize: '9px', fontWeight: '700', padding: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ stroke: 'rgba(16, 185, 129, 0.2)', strokeWidth: 2 }}
                          />
                          <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} fill="url(#vaultScore)" animationDuration={1500} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsDashboard;
`;

fs.writeFileSync('src/components/AnalyticsDashboard.tsx', beforeContent + newBlock);
console.log('Done.');