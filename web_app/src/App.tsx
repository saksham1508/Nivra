import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Zap, 
  PieChart, 
  History,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', spend: 400 },
  { name: 'Tue', spend: 300 },
  { name: 'Wed', spend: 800 },
  { name: 'Thu', spend: 200 },
  { name: 'Fri', spend: 500 },
  { name: 'Sat', spend: 900 },
  { name: 'Sun', spend: 600 },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50">
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-8 bg-slate-900 border-r border-slate-800 space-y-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">N</div>
        <div className="flex flex-col space-y-6 pt-10">
          <Wallet className="w-6 h-6 text-indigo-500" />
          <PieChart className="w-6 h-6 text-slate-500" />
          <History className="w-6 h-6 text-slate-500" />
          <Smartphone className="w-6 h-6 text-slate-500" />
        </div>
      </nav>

      <main className="pl-20 p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Financial Dashboard</h1>
            <p className="text-slate-400">Welcome back, Saksham. Here's your AI summary.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">RBI Compliant</span>
            </div>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Saksham" alt="Avatar" className="w-10 h-10 rounded-full bg-slate-800" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <Wallet className="w-6 h-6 text-indigo-500" />
              </div>
              <span className="text-xs text-emerald-500 font-medium bg-emerald-500/10 px-2 py-1 rounded">+2.5%</span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Total Aggregated Balance</h3>
            <p className="text-2xl font-bold mt-1">₹ 1,24,500.00</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-rose-500/10 rounded-xl">
                <ArrowUpRight className="w-6 h-6 text-rose-500" />
              </div>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Monthly Expenses</h3>
            <p className="text-2xl font-bold mt-1">₹ 42,320.00</p>
          </div>

          <div className="bg-indigo-600 p-6 rounded-2xl shadow-xl shadow-indigo-500/20 relative overflow-hidden">
            <Zap className="absolute right-[-10px] top-[-10px] w-32 h-32 text-white/10 rotate-12" />
            <h3 className="text-indigo-100 text-sm font-medium mb-1">Financial Health Score</h3>
            <p className="text-4xl font-black mb-2">782</p>
            <div className="w-full bg-indigo-900/50 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full" style={{ width: '78%' }}></div>
            </div>
            <p className="text-xs text-indigo-100 mt-2 font-medium">TIER: EXCELLENT</p>
          </div>
        </div>

        {/* AI Insight Bar */}
        <div className="bg-gradient-to-r from-indigo-900/40 to-slate-900 p-4 rounded-xl border border-indigo-500/20 mb-8 flex items-center space-x-4">
          <Zap className="w-5 h-5 text-indigo-400 animate-pulse" />
          <p className="text-sm">
            <span className="font-bold text-indigo-400">Nivra AI:</span> Your spending on <span className="underline decoration-indigo-500">Food & Dining</span> is up by 15% this week. Switch to Nivra Autopay to save ₹500 on bill payments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart Section */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="font-bold mb-6">Spending Analysis</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="spend" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Recent Transactions</h3>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Zomato', cat: 'Food & Dining', amt: '-₹450.00', icon: <ArrowUpRight className="w-4 h-4 text-rose-500" />, bg: 'bg-rose-500/10' },
                { name: 'Salary Credit', cat: 'Income', amt: '+₹85,000.00', icon: <ArrowDownLeft className="w-4 h-4 text-emerald-500" />, bg: 'bg-emerald-500/10' },
                { name: 'Amazon India', cat: 'Shopping', amt: '-₹2,300.00', icon: <ArrowUpRight className="w-4 h-4 text-rose-500" />, bg: 'bg-rose-500/10' },
                { name: 'HDFC Bank', cat: 'EMI', amt: '-₹12,400.00', icon: <ArrowUpRight className="w-4 h-4 text-rose-500" />, bg: 'bg-rose-500/10' },
              ].map((txn, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 ${txn.bg} rounded-lg`}>{txn.icon}</div>
                    <div>
                      <p className="text-sm font-semibold">{txn.name}</p>
                      <p className="text-xs text-slate-500">{txn.cat}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${txn.amt.startsWith('+') ? 'text-emerald-500' : 'text-slate-200'}`}>{txn.amt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
