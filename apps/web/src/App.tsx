import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Shield, Lock, Eye, AlertCircle, FileText, Settings, LayoutDashboard, Globe, Network } from 'lucide-react';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
        {/* Navigation Sidebar */}
        <aside className="w-72 bg-slate-900/40 backdrop-blur-3xl border-r border-slate-800 flex flex-col p-8 fixed h-full shadow-2xl">
          <div className="flex items-center gap-4 mb-12 group cursor-pointer">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl shadow-emerald-900/20 text-white group-hover:scale-110 transition duration-500">
               <Shield size={28} />
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent">Firewall X</span>
          </div>
          
          <nav className="flex-1 space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Security Overview" active />
            <NavItem to="/policies" icon={<Lock size={20} />} label="Policy Manager" />
            <NavItem to="/threats" icon={<AlertCircle size={20} />} label="Threat Intelligence" />
            <NavItem to="/analytics" icon={<Eye size={20} />} label="Traffic Analytics" />
            <NavItem to="/compliance" icon={<FileText size={20} />} label="Compliance Center" />
            <NavItem to="/network" icon={<Network size={20} />} label="Topology Map" />
            <NavItem to="/global" icon={<Globe size={20} />} label="Cloud Edge" />
          </nav>

          <div className="pt-6 border-t border-slate-800">
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-72">
          <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-widest">
              <span>Security Hub</span>
              <span>/</span>
              <span className="text-white font-bold">Policy Governance</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-white">Chief Security Officer</p>
                <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-black">Strategic Admin</p>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-slate-300 shadow-lg">CS</div>
            </div>
          </header>

          <div className="p-10 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

const NavItem = ({ to, icon, label, active }: any) => (
  <Link 
    to={to} 
    className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${active ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/10 shadow-lg shadow-emerald-950/40' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <span className={`${active ? 'text-emerald-400' : 'group-hover:text-emerald-400 transition transform group-hover:rotate-12'}`}>{icon}</span>
    <span className="font-bold text-sm tracking-tight">{label}</span>
  </Link>
);

export default App;
