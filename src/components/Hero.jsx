import React from 'react';
import Spline from '@splinetool/react-spline';
import { ShieldCheck, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline 
          scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient glow layered above but not blocking Spline interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/50 to-slate-950/80" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-28 text-center md:pt-36">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          <span className="text-xs tracking-wide text-cyan-200/90">AI-Powered Credibility Intelligence</span>
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          Verifi<span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">AI</span>
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-base text-slate-200/90 sm:text-lg">
          Detect misinformation instantly. Analyze headlines, articles, and sources with explainable AI and real-time trend insights.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#verify" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-medium shadow-lg shadow-cyan-900/30 transition hover:from-cyan-400 hover:to-blue-500">
            <ShieldCheck className="h-5 w-5" />
            Verify a claim
          </a>
          <a href="#analytics" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium backdrop-blur transition hover:border-white/20 hover:bg-white/10">
            Explore analytics
          </a>
        </div>

        <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Articles Scanned', value: '120K+' },
            { label: 'Avg. Accuracy', value: '94.2%' },
            { label: 'Sources Tracked', value: '8,500+' },
            { label: 'Languages', value: '25+' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur">
              <div className="text-xs uppercase tracking-wide text-slate-300/80">{item.label}</div>
              <div className="mt-1 text-xl font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
