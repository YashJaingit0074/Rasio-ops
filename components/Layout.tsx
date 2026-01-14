
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Inventory Hub', icon: 'fa-box-open' },
    { id: 'vision', label: 'Vision Input', icon: 'fa-camera' },
    { id: 'rag', label: 'RAG Meal Planner', icon: 'fa-utensils' },
    { id: 'analytics', label: 'Sustainability Audit', icon: 'fa-chart-line' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-2xl z-10">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-leaf text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">RasoiOps</h1>
            <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest">Sustainability Engine</p>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <div className="px-4 mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</span>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 p-4 rounded-xl text-center border border-slate-700/50">
            <div className="flex justify-center mb-2">
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/20">Demo Mode Active</span>
            </div>
            <p className="text-xs text-slate-400 mb-1">Weekly Waste Redux</p>
            <p className="text-2xl font-bold text-emerald-400">-34.2%</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
            <p className="text-slate-500 text-sm italic">Engineered for Zero-Waste Household Operations</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">System Health</span>
              <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                AI Core Optimized
              </span>
            </div>
            <button className="bg-white p-2.5 rounded-xl shadow-sm text-slate-500 hover:text-emerald-600 transition-all border border-slate-100">
              <i className="fas fa-bell"></i>
            </button>
            <div className="flex items-center gap-3 bg-white pl-1.5 pr-4 py-1.5 rounded-xl shadow-sm border border-slate-100">
              <div className="w-9 h-9 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center text-slate-600 font-black shadow-inner">RA</div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 leading-none mb-0.5">Admin User</span>
                <span className="text-[10px] text-slate-400 font-medium">Small Restaurant Tier</span>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
