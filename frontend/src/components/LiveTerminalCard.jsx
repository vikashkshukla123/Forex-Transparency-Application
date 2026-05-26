import React from 'react'

const sample = [
  { id: 1, initials: 'EU', asset: 'EUR/USD', price: '1.0842', change: '+0.12', up: true },
  { id: 2, initials: 'US', asset: 'USD/JPY', price: '154.12', change: '-0.05', up: false },
  { id: 3, initials: 'GB', asset: 'GBP/USD', price: '1.2541', change: '+0.04', up: true }
]

export default function LiveTerminalCard() {
  return (
    <div className="w-full max-w-md rounded-[32px] bg-white p-5 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.12)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-3 w-3 rounded-full bg-teal animate-pulse" />
          <h2 className="text-sm font-semibold text-deep-slate">Live Terminal</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-500">Realtime</span>
      </div>

      <div className="space-y-3">
        {sample.map((row) => (
          <div key={row.id} className="terminal-row flex items-center gap-3 rounded-[22px] border border-slate-200/80 bg-slate-50 px-4 py-3 transition hover:bg-white hover:border-teal">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">{row.initials}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-deep-slate">{row.asset}</p>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">FOREX PAIR</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-heading font-bold text-deep-slate">{row.price}</p>
              <p className={`text-xs ${row.up ? 'text-teal' : 'text-rose-500'}`}>{row.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
