import { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import AnalyticsChart from '../components/AnalyticsChart'
import { getAnalytics } from '../services/transactionService'

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAnalytics()
        setAnalytics(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <DashboardLayout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.2)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-orange font-heading font-bold">Transaction analytics</p>
              <h1 className="mt-4 text-4xl font-heading font-bold text-deep-slate">Understand your forex flows</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Live analytics based on your transaction history, bank routes, and cost breakdowns.</p>
            </div>
            <div className="rounded-[20px] bg-slate-900 px-5 py-4 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-teal/80 font-heading font-bold">As of now</p>
              <p className="mt-2 text-2xl font-heading font-bold">{loading ? '––' : new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {['Total transactions', 'Total spent', 'Average transaction'].map((label, index) => {
              const value = loading
                ? '—'
                : index === 0
                ? analytics?.totalTransactions
                : index === 1
                ? `$${analytics?.totalSpent?.toFixed(2)}`
                : `$${analytics?.averageTransaction?.toFixed(2)}`
              return (
                <div key={label} className="rounded-[24px] bg-slate-950 px-6 py-7 text-white shadow-[0_32px_64px_-24px_rgba(0,0,0,0.25)]">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-teal/80 font-heading font-bold">{label}</p>
                  <p className="mt-4 text-4xl font-heading font-bold tracking-tight">{value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="space-y-8">
        <AnalyticsChart data={analytics} />

        {/* Insights Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] bg-[#f8fafc] border border-slate-200 p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-heading font-bold">Insight</p>
            <h2 className="mt-4 text-2xl font-heading font-bold text-deep-slate">Optimize your FX routes</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">The platform recommends the cheapest bank route based on markup, ATM fees, and rating — then visualizes savings over time.</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-teal" />
                <span className="text-sm text-slate-600">Compare 12+ bank networks</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-teal" />
                <span className="text-sm text-slate-600">Real-time fee analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-teal" />
                <span className="text-sm text-slate-600">Automated recommendations</span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500 font-heading font-bold">Most used bank</p>
                <p className="mt-3 text-3xl font-heading font-bold text-deep-slate">{loading ? '…' : analytics?.mostUsedBank ?? 'None'}</p>
              </div>
              <div className="rounded-full bg-teal/10 px-4 py-2 text-[11px] uppercase tracking-[0.33em] text-teal font-heading font-bold">Active</div>
            </div>
            <div className="mt-8 grid gap-4">
              <div className="rounded-[24px] bg-slate-50 p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-heading font-bold">Exchange pressure</p>
                <p className="mt-2 text-lg font-heading font-bold text-deep-slate">Stable</p>
              </div>
              <div className="rounded-[24px] bg-slate-50 p-5">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-heading font-bold">Fee trend</p>
                <p className="mt-2 text-lg font-heading font-bold text-deep-slate">Moderate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </DashboardLayout>
  )
}