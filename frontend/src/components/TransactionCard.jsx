import React from 'react'

export default function TransactionCard({ transaction, variant = 'default' }) {
  const statusColors = {
    completed: { bg: 'bg-teal/10', text: 'text-teal', label: 'Completed' },
    pending: { bg: 'bg-orange/10', text: 'text-orange', label: 'Pending' },
    failed: { bg: 'bg-rose-100', text: 'text-rose-600', label: 'Failed' }
  }

  const status = statusColors[transaction.status] || statusColors.completed

  if (variant === 'compact') {
    return (
      <div className="rounded-[20px] border border-slate-200/70 bg-slate-50 p-4 transition hover:bg-white hover:border-teal">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-deep-slate">{transaction.currency}</p>
            <p className="text-xs text-slate-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-deep-slate">${transaction.finalAmount.toFixed(2)}</p>
            <p className={`text-xs uppercase tracking-[0.2em] font-semibold ${status.text}`}>{status.label}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-2xl font-heading font-bold text-teal">
            {transaction.currency.substring(0, 2)}
          </div>
          <div>
            <p className="text-lg font-heading font-bold text-deep-slate">{transaction.currency}</p>
            <p className="text-sm text-slate-500">{transaction.bankId?.name || 'Unknown Bank'}</p>
          </div>
        </div>
        <div className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] font-semibold ${status.bg} ${status.text}`}>
          {status.label}
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-[18px] bg-slate-50 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Amount</p>
          <p className="mt-2 text-2xl font-heading font-bold text-deep-slate">${transaction.amount.toFixed(2)}</p>
        </div>
        <div className="rounded-[18px] bg-slate-50 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Final amount</p>
          <p className="mt-2 text-2xl font-heading font-bold text-deep-slate">${transaction.finalAmount.toFixed(2)}</p>
        </div>
        <div className="rounded-[18px] bg-slate-50 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Fees paid</p>
          <p className="mt-2 text-2xl font-heading font-bold text-orange">
            ${(transaction.amount - transaction.finalAmount).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Date</span>
          <span className="text-sm font-semibold text-deep-slate">{new Date(transaction.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Exchange rate</span>
          <span className="text-sm font-semibold text-deep-slate">{transaction.exchangeRate?.toFixed(4) || 'N/A'}</span>
        </div>
        {transaction.savings && (
          <div className="flex items-center justify-between rounded-[12px] bg-teal/5 px-3 py-2">
            <span className="text-sm text-teal font-semibold">Savings</span>
            <span className="text-sm font-heading font-bold text-teal">${transaction.savings.toFixed(2)}</span>
          </div>
        )}
      </div>

      <button className="mt-4 w-full rounded-[14px] border border-slate-200 bg-white px-4 py-3 text-xs uppercase tracking-[0.3em] font-semibold text-deep-slate transition hover:border-teal hover:text-teal">
        View details
      </button>
    </div>
  )
}