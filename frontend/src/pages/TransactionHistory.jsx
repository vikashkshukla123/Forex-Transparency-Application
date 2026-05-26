import { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import TransactionCard from '../components/TransactionCard'

// Mock transaction data
const mockTransactions = [
  {
    _id: '1',
    currency: 'USD',
    amount: 1200,
    finalAmount: 1150.40,
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000),
    bankId: { name: 'Nexus Financial' },
    exchangeRate: 1.0842,
    savings: 35.60
  },
  {
    _id: '2',
    currency: 'EUR',
    amount: 800,
    finalAmount: 765.20,
    status: 'completed',
    createdAt: new Date(Date.now() - 172800000),
    bankId: { name: 'Swift Exchange' },
    exchangeRate: 0.9156,
    savings: 24.80
  },
  {
    _id: '3',
    currency: 'GBP',
    amount: 950,
    finalAmount: 912.50,
    status: 'pending',
    createdAt: new Date(Date.now() - 259200000),
    bankId: { name: 'Global Transfer' },
    exchangeRate: 1.2541,
    savings: null
  },
  {
    _id: '4',
    currency: 'JPY',
    amount: 150000,
    finalAmount: 142800,
    status: 'completed',
    createdAt: new Date(Date.now() - 345600000),
    bankId: { name: 'Nexus Financial' },
    exchangeRate: 0.0069,
    savings: 4800
  },
  {
    _id: '5',
    currency: 'AUD',
    amount: 500,
    finalAmount: 472.50,
    status: 'completed',
    createdAt: new Date(Date.now() - 432000000),
    bankId: { name: 'Swift Exchange' },
    exchangeRate: 0.6632,
    savings: 18.75
  }
]

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [viewMode, setViewMode] = useState('table')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const filteredTransactions = filterStatus === 'all'
    ? transactions
    : transactions.filter(t => t.status === filterStatus)

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === 'amount') return b.amount - a.amount
    if (sortBy === 'savings') return (b.savings || 0) - (a.savings || 0)
    return 0
  })

  return (
    <DashboardLayout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Header */}
      <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.2)] mb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-orange font-heading font-bold">Transaction history</p>
            <h1 className="mt-4 text-4xl font-heading font-bold text-deep-slate">Your FX activity</h1>
          </div>
          <p className="text-sm text-slate-500">Latest transactions, fees and currency flow.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-wrap">
          {['table', 'cards'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`rounded-[12px] px-4 py-2 text-xs uppercase tracking-[0.25em] font-heading font-bold transition ${
                viewMode === mode
                  ? 'bg-deep-slate text-white'
                  : 'border border-slate-200 text-slate-600 hover:border-teal hover:text-teal'
              }`}
            >
              {mode === 'table' ? '📊 Table' : '📇 Cards'}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-[12px] border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] font-heading font-bold outline-none focus:border-teal"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-[12px] border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] font-heading font-bold outline-none focus:border-teal"
          >
            <option value="date">Sort: Date</option>
            <option value="amount">Sort: Amount</option>
            <option value="savings">Sort: Savings</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Total transactions', value: sortedTransactions.length, color: 'teal' },
          { label: 'Total spent', value: `$${sortedTransactions.reduce((acc, t) => acc + t.amount, 0).toFixed(2)}`, color: 'orange' },
          { label: 'Total saved', value: `$${sortedTransactions.reduce((acc, t) => acc + (t.savings || 0), 0).toFixed(2)}`, color: 'teal' },
          { label: 'Avg fee', value: `$${(sortedTransactions.reduce((acc, t) => acc + (t.amount - t.finalAmount), 0) / sortedTransactions.length).toFixed(2)}`, color: 'slate' }
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-[20px] border border-${stat.color === 'teal' ? 'teal/20' : stat.color === 'orange' ? 'orange/20' : 'slate-200'} bg-${stat.color === 'teal' ? 'teal/5' : stat.color === 'orange' ? 'orange/5' : 'slate-50'} p-4`}
          >
            <p className={`text-xs uppercase tracking-[0.25em] font-heading font-bold text-${stat.color}`}>{stat.label}</p>
            <p className="mt-2 text-2xl font-heading font-bold text-deep-slate">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Content */}
      {viewMode === 'table' ? (
        <div className="rounded-[32px] border border-slate-200 bg-white/90 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-6 py-4 text-xs uppercase tracking-[0.3em] font-heading font-bold">Date</th>
                <th className="px-6 py-4 text-xs uppercase tracking-[0.3em] font-heading font-bold">Currency</th>
                <th className="px-6 py-4 text-xs uppercase tracking-[0.3em] font-heading font-bold">Amount</th>
                <th className="px-6 py-4 text-xs uppercase tracking-[0.3em] font-heading font-bold">Bank</th>
                <th className="px-6 py-4 text-xs uppercase tracking-[0.3em] font-heading font-bold">Savings</th>
                <th className="px-6 py-4 text-xs uppercase tracking-[0.3em] font-heading font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {sortedTransactions.map((txn) => (
                <tr key={txn._id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-5 text-sm text-slate-600">{new Date(txn.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-5 text-sm font-heading font-bold text-deep-slate">{txn.currency}</td>
                  <td className="px-6 py-5 text-sm font-heading font-bold text-deep-slate">${txn.amount.toFixed(2)}</td>
                  <td className="px-6 py-5 text-sm text-slate-600">{txn.bankId?.name || 'Unknown'}</td>
                  <td className="px-6 py-5">
                    {txn.savings ? (
                      <span className="text-sm font-heading font-bold text-teal">${txn.savings.toFixed(2)}</span>
                    ) : (
                      <span className="text-sm text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] font-heading font-bold ${
                      txn.status === 'completed'
                        ? 'bg-teal/10 text-teal'
                        : txn.status === 'pending'
                        ? 'bg-orange/10 text-orange'
                        : 'bg-rose-100 text-rose-600'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {sortedTransactions.map((txn) => (
            <TransactionCard key={txn._id} transaction={txn} />
          ))}
        </div>
      )}
    </section>
    </DashboardLayout>
  )
}