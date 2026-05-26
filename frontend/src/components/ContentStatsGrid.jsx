import React from 'react'

export default function ContentStatsGrid({ analytics }) {
  return (
    <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 py-12 px-8">
      <div className="lg:col-span-8 space-y-6">
        {['Market reports', 'Borderless fees', 'Smart route planning'].map((title, index) => (
          <article key={title} className="rounded-[24px] bg-white p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-teal/10 text-teal text-lg font-bold">{index + 1}</div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Briefing</p>
                <h3 className="mt-2 text-2xl font-heading font-bold text-deep-slate">{title}</h3>
              </div>
            </div>
            <p className="text-sm leading-7 text-slate-600">{index === 0
                ? 'Weekly insights on bank markup trends and transaction glassfloor analytics.'
                : index === 1
                ? 'Visualize hidden fees and compare costs across payment networks in a clean, data-rich layout.'
                : 'Rank banks by total cost, rating, and fee transparency for smarter cross-border decisions.'}
            </p>
          </article>
        ))}
      </div>

      <aside className="lg:col-span-4 space-y-6">
        <div className="rounded-[24px] bg-teal px-6 py-7 text-white shadow-[0_32px_64px_-24px_rgba(13,148,136,0.8)]">
          <p className="text-xs uppercase tracking-[0.3em] text-teal/90">Saved insights</p>
          <p className="mt-4 text-4xl font-heading font-extrabold">{analytics?.totalTransactions ?? '—'}</p>
          <p className="mt-2 text-sm text-teal/90">Transactions analyzed</p>
        </div>
        <div className="rounded-[24px] bg-white p-6 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Platform signal</p>
          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-5xl font-heading font-extrabold text-deep-slate">{analytics ? `$${analytics.totalSpent.toFixed(0)}` : '—'}</p>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">Total spent</span>
          </div>
        </div>
      </aside>
    </section>
  )
}
