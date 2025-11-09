import React from 'react';
import Hero from './components/Hero';
import Verifier from './components/Verifier';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReportForm';
import { ShieldCheck } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold tracking-wide">VerifiAI</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#verify" className="hover:text-white">Verify</a>
            <a href="#analytics" className="hover:text-white">Analytics</a>
            <a href="#report" className="hover:text-white">Report</a>
          </nav>
        </div>
      </header>

      <main className="pt-14">
        <Hero />
        <div className="px-6">
          <Verifier />
          <Dashboard />
          <div id="report">
            <ReportForm />
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 text-sm text-slate-400">
          <p>
            Built for transparency and trust. This UI showcases a fake news detection concept with AI scoring, trend analytics, and a community reporting flow.
          </p>
          <p className="mt-2">Note: Connect your backend URL via VITE_BACKEND_URL for live analysis.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
