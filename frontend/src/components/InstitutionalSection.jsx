import React from 'react'

const partners = [
  {
    name: 'GlobalPay',
    stats: ['Fees 0.12%', 'Latency 34ms', 'Coverage Global']
  },
  {
    name: 'Nexus FX',
    stats: ['Fees 0.09%', 'Latency 28ms', 'Coverage 72 countries']
  },
  {
    name: 'BridgeBank',
    stats: ['Fees 0.15%', 'Latency 40ms', 'Coverage Corporate']
  }
]

export default function InstitutionalSection() {
  return (
    <section className="w-full bg-deep-slate text-white py-14 px-6 lg:px-8" style={{ backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-teal/70">Institutional network</p>
            <h2 className="mt-3 text-4xl font-heading font-extrabold">Trusted partner banks and routes</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-300">Compare partner performance across fees, coverage, and realtime settlement signals to choose the cleanest route.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {partners.map((partner) => (
            <div key={partner.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="rounded-3xl bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200">Main Partner</div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-teal">Live</div>
              </div>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-2xl text-white">{partner.name.charAt(0)}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{partner.name}</h3>
                  <p className="text-sm text-slate-300">Institutional settlement team</p>
                </div>
              </div>
              <ul className="mb-6 space-y-3 text-xs uppercase tracking-[0.24em] text-slate-300">
                {partner.stats.map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-teal" />
                    {line}
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-[16px] bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-deep-slate transition hover:bg-teal hover:text-white">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
