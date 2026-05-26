import { Link } from 'react-router-dom'
import LiveTerminalCard from './LiveTerminalCard'

export default function Hero() {
  return (
    <section className="grid grid-cols-12 gap-8 px-6 pt-10 pb-14 lg:px-8">
      <div className="col-span-12 lg:col-span-7 relative overflow-hidden rounded-[32px] bg-white/90 border border-[#f1f5f9] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.12),_transparent_25%)] pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-orange">Live FX</span>
          <h1 className="mt-8 max-w-3xl text-5xl font-heading font-extrabold tracking-[-0.04em] text-deep-slate md:text-6xl">Institutional-grade forex visibility for modern payment teams</h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600">Simulate fees, compare banks, and expose hidden markup costs across international transactions with live analytics and AI guidance.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/compare"
              className="inline-flex items-center justify-center rounded-[14px] bg-teal px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-white shadow-[0_18px_50px_-26px_rgba(13,148,136,0.9)] transition hover:bg-[#0b7f74]"
            >
              Compare banks
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center justify-center rounded-[14px] border border-slate-300 bg-white px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-deep-slate transition hover:border-teal hover:text-teal"
            >
              Ask the assistant
            </Link>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <div className="relative rounded-[32px] bg-[#0f172a] px-6 py-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.18)]">
          <img src="/assets/candlestick.svg" className="candlestick-watermark right-[-2rem] top-[-1rem] hidden lg:block" alt="watermark" />
          <div className="relative z-10">
            <LiveTerminalCard />
          </div>
        </div>
      </div>
    </section>
  )
}
