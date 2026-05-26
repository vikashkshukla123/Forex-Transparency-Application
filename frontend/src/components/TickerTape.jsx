import React from 'react'

const items = [
  { pair: 'EUR/USD', price: '1.0842', dir: '▲' },
  { pair: 'GBP/USD', price: '1.2541', dir: '▲' },
  { pair: 'USD/JPY', price: '154.12', dir: '▼' },
  { pair: 'AUD/USD', price: '0.6632', dir: '▲' },
  { pair: 'NZD/USD', price: '0.5981', dir: '▼' }
]

export default function TickerTape() {
  return (
    <div className="mx-auto mt-6 w-full max-w-[1300px] overflow-hidden rounded-[24px] border border-slate-200 bg-white/90 px-4 py-3 shadow-[0_24px_64px_-28px_rgba(0,0,0,0.12)]">
      <div className="flex animate-[ticker-scroll_40s_linear_infinite] gap-16 text-sm font-semibold text-slate-700">
        {items.concat(items).map((item, index) => (
          <div key={`${item.pair}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
            <span className="text-slate-400 uppercase tracking-[0.15em]">{item.pair}</span>
            <span className={item.dir === '▲' ? 'text-teal' : 'text-rose-500'}>{item.price}</span>
            <span className={item.dir === '▲' ? 'text-teal' : 'text-rose-500'}>{item.dir}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
