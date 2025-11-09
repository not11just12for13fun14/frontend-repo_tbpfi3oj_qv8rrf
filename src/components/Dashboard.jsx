import React from 'react';
import { TrendingUp, Globe, Activity } from 'lucide-react';

const data = {
  topics: [
    { name: 'Politics', value: 36 },
    { name: 'Health', value: 22 },
    { name: 'Finance', value: 18 },
    { name: 'Science', value: 14 },
    { name: 'Entertainment', value: 10 },
  ],
  regions: [
    { name: 'North America', value: 28 },
    { name: 'Europe', value: 24 },
    { name: 'Asia', value: 30 },
    { name: 'South America', value: 10 },
    { name: 'Africa', value: 8 },
  ],
};

const Bar = ({ label, value, max = 40, color = 'from-cyan-500 to-blue-600' }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-300">{label}</span>
      <span className="text-slate-200 font-medium">{value}%</span>
    </div>
    <div className="h-2 w-full rounded-full bg-slate-800">
      <div
        className={`h-2 rounded-full bg-gradient-to-r ${color}`}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <section id="analytics" className="mx-auto mt-10 max-w-6xl rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur md:p-8">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-cyan-300" />
        <h2 className="text-2xl font-semibold text-white">Trend Analytics</h2>
      </div>
      <p className="mt-1 text-sm text-slate-300/90">Visualize categories and regions where misinformation spikes. Data is illustrative.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan-300" />
            <h3 className="text-sm font-medium text-white">By Topic</h3>
          </div>
          <div className="space-y-3">
            {data.topics.map((t, i) => (
              <Bar key={t.name} label={t.name} value={t.value} color={i % 2 ? 'from-fuchsia-500 to-violet-600' : 'from-cyan-500 to-blue-600'} />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-4 w-4 text-cyan-300" />
            <h3 className="text-sm font-medium text-white">By Region</h3>
          </div>
          <div className="space-y-3">
            {data.regions.map((r, i) => (
              <Bar key={r.name} label={r.name} value={r.value} color={i % 2 ? 'from-amber-500 to-orange-600' : 'from-emerald-500 to-teal-600'} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80 p-5">
        <p className="text-sm text-slate-300/90">
          Tip: Connect social and news APIs to stream live items and trigger alerts when topics or regions exceed a threshold.
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
