import React, { useState } from 'react'

export default function AnalyticsChart({ data }) {
  const [timeframe, setTimeframe] = useState('7d')

  const mockData = {
    '7d': [
      { date: 'Mon', transactions: 12, savings: 245 },
      { date: 'Tue', transactions: 15, savings: 380 },
      { date: 'Wed', transactions: 10, savings: 190 },
      { date: 'Thu', transactions: 18, savings: 520 },
      { date: 'Fri', transactions: 22, savings: 680 },
      { date: 'Sat', transactions: 8, savings: 120 },
      { date: 'Sun', transactions: 14, savings: 410 }
    ],
    '30d': [
      { date: 'Week 1', transactions: 72, savings: 1815 },
      { date: 'Week 2', transactions: 85, savings: 2140 },
      { date: 'Week 3', transactions: 68, savings: 1650 },
      { date: 'Week 4', transactions: 92, savings: 2380 }
    ],
    '90d': [
      { date: 'Jan', transactions: 312, savings: 7840 },
      { date: 'Feb', transactions: 348, savings: 8920 },
      { date: 'Mar', transactions: 285, savings: 6750 }
    ]
  }

  const chartData = mockData[timeframe]
  const maxTransactions = Math.max(...chartData.map(d => d.transactions))
  const maxSavings = Math.max(...chartData.map(d => d.savings))

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Performance metrics</p>
          <h3 className="mt-2 text-2xl font-heading font-bold text-deep-slate">Transaction trends</h3>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`rounded-[12px] px-4 py-2 text-xs uppercase tracking-[0.25em] font-semibold transition ${
                timeframe === period
                  ? 'bg-deep-slate text-white'
                  : 'border border-slate-200 text-slate-600 hover:border-teal hover:text-teal'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Transactions</p>
            <p className="text-2xl font-heading font-bold text-deep-slate">
              {chartData.reduce((acc, d) => acc + d.transactions, 0)}
            </p>
          </div>
          <div className="flex items-end gap-2 h-32">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-[8px] bg-gradient-to-t from-teal to-teal/60 transition hover:from-teal hover:to-teal/80"
                  style={{ height: `${(item.transactions / maxTransactions) * 100}%` }}
                />
                <p className="text-xs text-slate-500 text-center">{item.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Savings generated</p>
            <p className="text-2xl font-heading font-bold text-orange">
              ${chartData.reduce((acc, d) => acc + d.savings, 0)}
            </p>
          </div>
          <div className="flex items-end gap-2 h-32">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-[8px] bg-gradient-to-t from-orange to-orange/60 transition hover:from-orange hover:to-orange/80"
                  style={{ height: `${(item.savings / maxSavings) * 100}%` }}
                />
                <p className="text-xs text-slate-500 text-center">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[20px] bg-slate-50 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Avg transaction cost</p>
          <p className="mt-3 text-3xl font-heading font-bold text-deep-slate">
            $
            {(
              chartData.reduce((acc, d) => acc + d.savings, 0) /
              chartData.reduce((acc, d) => acc + d.transactions, 0)
            ).toFixed(2)}
          </p>
        </div>
        <div className="rounded-[20px] bg-teal/5 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Total savings</p>
          <p className="mt-3 text-3xl font-heading font-bold text-teal">
            $
            {chartData.reduce((acc, d) => acc + d.savings, 0)}
          </p>
        </div>
      </div>
    </div>
  )
}