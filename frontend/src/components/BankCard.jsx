import React from 'react'
import { Check } from 'lucide-react'

export default function BankCard({ bank, isRecommended, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`rounded-[24px] border-2 p-6 transition cursor-pointer ${
        isRecommended
          ? 'border-teal bg-gradient-to-br from-teal/5 to-teal/10 shadow-[0_24px_64px_-16px_rgba(13,148,136,0.2)]'
          : 'border-slate-200 bg-white hover:border-teal hover:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* Header with recommended badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-heading font-bold text-deep-slate">{bank.name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-semibold text-slate-600">★ {bank.rating}</span>
            <span className="text-xs text-slate-500">{bank.processingTime}</span>
          </div>
        </div>
        {isRecommended && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal text-white">
            <Check size={16} />
          </div>
        )}
      </div>

      {/* Fee breakdown */}
      <div className="mb-5 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Markup</span>
          <span className="font-semibold text-slate-800">{bank.markup}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Fixed fee</span>
          <span className="font-semibold text-slate-800">${bank.fee.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">ATM fee</span>
          <span className="font-semibold text-slate-800">${bank.atmFee.toFixed(2)}</span>
        </div>
      </div>

      {/* Total cost */}
      <div className={`rounded-[16px] p-4 ${isRecommended ? 'bg-teal/10' : 'bg-slate-50'}`}>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">Total cost</p>
        <p className={`text-2xl font-heading font-bold mt-2 ${isRecommended ? 'text-teal' : 'text-deep-slate'}`}>
          ${bank.totalCost.toFixed(2)}
        </p>
      </div>

      {/* Recommendation label */}
      {isRecommended && (
        <div className="mt-4 rounded-[12px] bg-teal/20 px-3 py-2 text-center">
          <p className="text-xs uppercase tracking-[0.25em] font-heading font-bold text-teal">Recommended</p>
        </div>
      )}
    </div>
  )
}
