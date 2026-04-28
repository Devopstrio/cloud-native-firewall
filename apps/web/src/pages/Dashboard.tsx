import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Shield, AlertTriangle, Activity, Lock, ExternalLink, RefreshCcw } from 'lucide-react';

const threatData = [
  { name: '00:00', blocked: 4500 },
  { name: '04:00', blocked: 3200 },
  { name: '08:00', blocked: 12000 },
  { name: '12:00', blocked: 8500 },
  { name: '16:00', blocked: 15000 },
  { name: '20:00', blocked: 11000 },
  { name: '23:59', blocked: 9000 },
];

const policyHealth = [
  { name: 'Azure', rules: 850, drift: 0, color: '#0ea5e9' },
  { name: 'AWS', rules: 420, drift: 2, color: '#f59e0b' },
  { name: 'GCP', rules: 310, drift: 0, color: '#10b981' },
  { name: 'K8s', rules: 1240, drift: 0, color: '#6366f1' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Perimeter Integrity</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl">Unified multi-cloud network security and automated policy orchestration.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition flex items-center gap-2">
             <RefreshCcw size={18} /> Resync Policies
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-emerald-900/40 flex items-center gap-2">
             <Lock size={18} /> Create Rule
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Threats Blocked (24h)" value="45.2k" change="+12%" icon={<Shield className="text-emerald-400" />} />
        <StatCard title="Active Drift Finds" value="2" change="Action Required" icon={<AlertTriangle className="text-rose-400" />} />
        <StatCard title="Avg Policy Risk" value="14/100" change="Low" icon={<Lock className="text-sky-400" />} />
        <StatCard title="Global Sync Status" value="99.9%" change="Optimal" icon={<Activity className="text-yellow-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Threat Trend */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
              Real-time Threat Blockage
            </h2>
            <div className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.2em] bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-800/50">Live Analytics</div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatData}>
                <defs>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '20px' }}
                />
                <Area type="monotone" dataKey="blocked" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorBlocked)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Policy Health per Platform */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-sky-500 rounded-full"></span>
            Policy Distribution
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={policyHealth} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={60} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Bar dataKey="rules" radius={[0, 10, 10, 0]} barSize={35}>
                  {policyHealth.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4">
             <AlertItem title="Drift Detected: AWS us-east-1" description="Unauthorized rule found on VPC-1234" severity="high" />
             <AlertItem title="Policy Sync Pending" description="Global-Egress update not applied to GKE-Cluster-1" severity="medium" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-emerald-500/30 transition-all group overflow-hidden relative shadow-2xl">
    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-1000 rotate-12">
       {React.cloneElement(icon, { size: 160 })}
    </div>
    <div className="relative z-10">
      <div className="p-4 bg-slate-950 rounded-2xl w-fit mb-6 border border-slate-800/50 shadow-inner group-hover:scale-110 transition duration-500">{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change === 'High' || change.startsWith('+') ? 'text-rose-400' : 'text-emerald-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const AlertItem = ({ title, description, severity }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-2xl hover:bg-slate-800/50 transition cursor-pointer group">
    <div className="flex gap-4">
      <div className={`w-1 h-10 rounded-full ${severity === 'high' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-yellow-500'}`}></div>
      <div>
        <p className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
    <ExternalLink size={16} className="text-slate-700 group-hover:text-white transition" />
  </div>
);

export default Dashboard;
