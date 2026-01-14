
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell, PieChart, Pie
} from 'recharts';
import { SUSTAINABILITY_METRICS } from '../constants';

const AnalyticsDashboard: React.FC = () => {
  const pieData = [
    { name: 'Used', value: 65, color: '#10b981' },
    { name: 'Expired', value: 15, color: '#ef4444' },
    { name: 'Donated', value: 20, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'CO2 Offset', val: '12.4 kg', icon: 'fa-leaf', color: 'emerald' },
          { label: 'Savings Est.', val: '$145.20', icon: 'fa-wallet', color: 'blue' },
          { label: 'Waste Redux', val: '28%', icon: 'fa-arrow-trend-down', color: 'rose' },
          { label: 'Shelf-Life Gain', val: '+2.4 Days', icon: 'fa-calendar-check', color: 'amber' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className={`text-${card.color}-500 mb-2`}>
              <i className={`fas ${card.icon}`}></i>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
            <p className="text-2xl font-black text-slate-800">{card.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Consumption Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800">Resource Optimization Flow</h3>
            <select className="text-xs font-bold bg-slate-50 border-none outline-none text-slate-500 rounded-lg p-2">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SUSTAINABILITY_METRICS}>
                <defs>
                  <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWasted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                />
                <Area type="monotone" dataKey="saved" stroke="#10b981" fillOpacity={1} fill="url(#colorSaved)" strokeWidth={3} name="Assets Saved (kg)" />
                <Area type="monotone" dataKey="wasted" stroke="#ef4444" fillOpacity={1} fill="url(#colorWasted)" strokeWidth={3} name="Wasted (kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Efficiency Pie */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-8">Efficiency Allocation</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-800">82%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Insights Row */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 items-center">
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0">
          <i className="fas fa-microchip text-2xl"></i>
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold mb-2">AI-Powered Optimization Insight</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Based on current consumption velocity, increasing milk procurement by <span className="text-emerald-400 font-bold">12%</span> and reducing tomato inventory by <span className="text-rose-400 font-bold">18%</span> would maximize yield. High variance detected in "Leafy Greens" category - consider vacuum sealing to extend shelf-life by <span className="text-emerald-400 font-bold">4.5 days</span>.
          </p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold transition-all whitespace-nowrap">
          Implement Recommendation
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
