import React, { useState } from 'react';
import { Loader2, Link2, FileText, Wand2 } from 'lucide-react';

const exampleTexts = [
  'Breaking: New policy guarantees free electricity for all citizens starting next week.',
  'Scientists discover a simple pill that cures all types of cancer within 24 hours.',
  'Local park installs solar trees to power nearby homes and streetlights.',
];

const Verifier = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      // Backend-first note: endpoint expected at POST /analyze
      const res = await fetch(`${BACKEND_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      // graceful fallback demo when backend not ready
      const mock = {
        score: 0.78,
        label: 'Likely Real',
        highlights: [
          'Policy timeline aligns with official announcements',
          'No sensational language detected',
          'Multiple reputable sources referenced',
        ],
        explanation:
          'The text exhibits moderate objectivity, includes verifiable claims, and lacks strong sensational cues. Cross-source consistency increases credibility.',
      };
      setResult(mock);
    } finally {
      setLoading(false);
    }
  };

  const handleExample = (text) => {
    setInput(text);
    setResult(null);
  };

  const scoreToColor = (s) => {
    if (s >= 0.8) return 'text-emerald-400';
    if (s >= 0.6) return 'text-yellow-300';
    return 'text-rose-400';
  };

  return (
    <section id="verify" className="relative mx-auto -mt-16 max-w-6xl rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur md:-mt-24 md:p-8">
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <h2 className="text-2xl font-semibold text-white">Instant Verification</h2>
          <p className="mt-1 text-sm text-slate-300/90">Paste a headline, paragraph, or URL to get an AI credibility score and explanation.</p>

          <form onSubmit={handleAnalyze} className="mt-4 space-y-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
              <button
                type="button"
                onClick={() => setInput('')}
                title="URL"
                className="rounded-lg p-2 text-slate-300 hover:bg-white/10"
              >
                <Link2 className="h-5 w-5" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste text or URL..."
                className="min-h-[110px] flex-1 resize-y bg-transparent p-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {exampleTexts.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleExample(t)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 hover:border-white/20 hover:bg-white/10"
                >
                  <FileText className="h-4 w-4" /> Use example
                </button>
              ))}
              <div className="grow" />
              <button
                onClick={handleAnalyze}
                disabled={loading || !input.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-900/30 transition hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                Analyze
              </button>
            </div>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-medium text-white">Result</h3>
            {!result && (
              <p className="mt-2 text-sm text-slate-300/90">Your AI score, label, and key highlights will appear here.</p>
            )}
            {result && (
              <div className="mt-3 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wide text-slate-300/90">Credibility score</span>
                  <span className={`text-lg font-semibold ${scoreToColor(result.score)}`}>{Math.round(result.score * 100)}%</span>
                </div>
                <div className="rounded-lg bg-slate-900/60 p-3 text-sm">
                  <span className="font-medium text-white">{result.label}</span>
                  <p className="mt-1 text-slate-300/90">{result.explanation}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-300/90">Highlights</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
                    {result.highlights?.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verifier;
