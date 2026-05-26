import { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import BankCard from '../components/BankCard'

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD']

// Mock bank data
const mockBanks = [
  {
    name: 'Global Transfer',
    markup: 1.2,
    fee: 12.5,
    atmFee: 3.0,
    rating: 4.5,
    totalCost: 87.50,
    processingTime: '24hrs'
  },
  {
    name: 'Nexus Financial',
    markup: 0.9,
    fee: 8.0,
    atmFee: 2.0,
    rating: 4.8,
    totalCost: 72.30,
    processingTime: '12hrs'
  },
  {
    name: 'International Pay',
    markup: 1.5,
    fee: 15.0,
    atmFee: 4.5,
    rating: 4.2,
    totalCost: 105.00,
    processingTime: '48hrs'
  },
  {
    name: 'Swift Exchange',
    markup: 1.0,
    fee: 10.0,
    atmFee: 2.5,
    rating: 4.6,
    totalCost: 75.20,
    processingTime: '18hrs'
  }
]

export default function CompareBanks() {
  const [amount, setAmount] = useState(1200)
  const [currency, setCurrency] = useState('USD')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedBank, setSelectedBank] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const bestBank = mockBanks.reduce((prev, current) =>
        current.totalCost < prev.totalCost ? current : prev
      )

      setResult({
        amount,
        currency,
        bestOption: {
          ...bestBank,
          savings: (mockBanks[2].totalCost - bestBank.totalCost).toFixed(2),
          reason: `Lowest total cost with excellent ${bestBank.rating}★ rating`
        },
        allOptions: mockBanks.map(bank => ({
          ...bank,
          total: bank.totalCost
        }))
      })
      setLoading(false)
    }, 800)
  }

  return (
    <DashboardLayout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 grid gap-8 rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.2)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.35em] text-orange font-heading font-bold">Bank comparison</p>
          <h1 className="text-4xl font-heading font-bold text-deep-slate">Simulate transaction costs</h1>
          <p className="max-w-xl text-sm leading-7 text-slate-600">Enter an amount and currency to compare markup fees, fixed charges, ATM costs, and recommendation scores in real time.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-[#f8fafc] p-5 border border-slate-200">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-heading font-bold">Why compare</p>
              <p className="mt-3 text-sm font-heading font-bold text-deep-slate">Find the lowest total cost instantly.</p>
            </div>
            <div className="rounded-[24px] bg-[#f8fafc] p-5 border border-slate-200">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 font-heading font-bold">Pro tip</p>
              <p className="mt-3 text-sm font-heading font-bold text-deep-slate">Bank rating & fees are weighted in recommendations.</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5 rounded-[24px] bg-deep-slate p-8 text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]">
          <div className="text-sm uppercase tracking-[0.35em] text-teal/80 font-heading font-bold">Start comparison</div>
          <div className="space-y-4">
            <label className="block text-sm text-slate-200 font-heading font-bold">
              Transfer amount
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
                className="mt-2 w-full rounded-[18px] border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none transition focus:border-teal"
              />
            </label>
            <label className="block text-sm text-slate-200 font-heading font-bold">
              Currency
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-2 w-full rounded-[18px] border border-slate-700 bg-slate-950/90 px-4 py-3 text-sm text-white outline-none"
              >
                {currencies.map((code) => (
                  <option key={code} value={code} className="bg-deep-slate">{code}</option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[14px] bg-teal px-5 py-3 text-sm font-heading font-bold uppercase tracking-[0.3em] text-white transition hover:bg-[#0b7f74] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Comparing...' : 'Compare now'}
          </button>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-8">
          {/* Best Option Highlight */}
          <div className="rounded-[32px] border-2 border-teal bg-gradient-to-br from-teal/5 to-teal/10 p-8 shadow-[0_32px_64px_-16px_rgba(13,148,136,0.15)]">
            <p className="text-xs uppercase tracking-[0.3em] text-teal font-heading font-bold">Best option</p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-heading font-bold text-deep-slate">{result.bestOption.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{result.bestOption.reason}</p>
              </div>
              <div className="rounded-[20px] bg-teal px-6 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.28em] text-white/80 font-heading font-bold">Save</p>
                <p className="mt-2 text-3xl font-heading font-bold text-white">${result.bestOption.savings}</p>
              </div>
            </div>
          </div>

          {/* All Options Grid */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-slate-500 font-heading font-bold">All options</p>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {result.allOptions.map((bank) => (
                <BankCard
                  key={bank.name}
                  bank={bank}
                  isRecommended={bank.name === result.bestOption.name}
                  onSelect={() => setSelectedBank(bank)}
                />
              ))}
            </div>
          </div>

          {/* Detailed Analysis */}
          {selectedBank && (
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-heading font-bold">Detailed analysis</p>
                <h3 className="mt-3 text-2xl font-heading font-bold text-deep-slate">{selectedBank.name}</h3>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-[24px] bg-slate-50 p-6 border border-slate-200">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-heading font-bold">Fee breakdown</p>
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Markup ({selectedBank.markup}%)</span>
                        <span className="font-heading font-bold">${(amount * selectedBank.markup / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Fixed charge</span>
                        <span className="font-heading font-bold">${selectedBank.fee.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">ATM fee</span>
                        <span className="font-heading font-bold">${selectedBank.atmFee.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-3 flex items-center justify-between font-heading font-bold text-deep-slate">
                        <span>Total</span>
                        <span className="text-lg">${selectedBank.totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[24px] bg-gradient-to-br from-teal/10 to-teal/5 p-6 border border-teal/20">
                    <p className="text-xs uppercase tracking-[0.3em] text-teal font-heading font-bold">Performance metrics</p>
                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Customer rating</span>
                          <span className="text-sm font-heading font-bold">{selectedBank.rating}/5</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal to-teal/60"
                            style={{ width: `${(selectedBank.rating / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="rounded-[14px] bg-white/50 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold">Processing time</p>
                        <p className="mt-2 text-lg font-heading font-bold text-teal">{selectedBank.processingTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
    </DashboardLayout>
  )
}