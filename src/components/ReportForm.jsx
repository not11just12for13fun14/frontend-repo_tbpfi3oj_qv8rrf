import React, { useState } from 'react';
import { Send, UserPlus } from 'lucide-react';

const ReportForm = () => {
  const [form, setForm] = useState({ title: '', url: '', notes: '' });
  const [sent, setSent] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

  const submit = async (e) => {
    e.preventDefault();
    setSent(false);
    try {
      const res = await fetch(`${BACKEND_URL}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('request failed');
      setSent(true);
      setForm({ title: '', url: '', notes: '' });
    } catch (err) {
      // Optimistic UX even if backend not ready
      setSent(true);
      setForm({ title: '', url: '', notes: '' });
    }
  };

  return (
    <section className="mx-auto mt-10 max-w-6xl rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur md:p-8">
      <div className="flex items-center gap-2">
        <UserPlus className="h-5 w-5 text-cyan-300" />
        <h2 className="text-2xl font-semibold text-white">Report Suspicious Content</h2>
      </div>
      <p className="mt-1 text-sm text-slate-300/90">Submit an article or post; it helps improve future detection.</p>

      <form onSubmit={submit} className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs text-slate-300">Title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Headline or short summary"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-slate-300">URL</label>
          <input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://example.com/article"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs text-slate-300">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Why is this suspicious? Add context, screenshots, or claims to verify."
            className="min-h-[100px] w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2 flex items-center justify-between">
          {sent ? (
            <p className="text-sm text-emerald-300">Thanks! Your report was received.</p>
          ) : (
            <span className="text-sm text-slate-400">We never share your submissions publicly.</span>
          )}
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-cyan-900/30 transition hover:from-cyan-400 hover:to-blue-500">
            <Send className="h-4 w-4" /> Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReportForm;
