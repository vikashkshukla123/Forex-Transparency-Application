import { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import ChatBot from '../components/ChatBot'

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'assistant',
      message: 'Hello! I\'m your Forex Insight AI Assistant. I can help you understand forex fees, compare banks, and optimize your international transfers. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = async (messageText) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      from: 'user',
      message: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        fee: 'Bank fees vary significantly. Most charge between 0.5% - 2% markup plus fixed charges ($8-15) and ATM fees ($2-5). Our analysis shows you can save 30-50% by switching to optimized routes.',
        bank: 'For USD transfers under $1500, Nexus Financial offers the best rates. For larger amounts, Swift Exchange becomes more competitive. I recommend comparing specific amounts for your use case.',
        save: 'Based on your transaction history, you\'ve already saved $1,240 this month by using recommended banks. That\'s about 0.28% average cost vs 0.75% industry average!',
        transfer: 'International transfers typically take 12-48 hours depending on the bank. Our platform shows real-time processing times for each option.',
        default: 'Great question! Here\'s what you should know: Currency conversion rates are live, fees include markup + fixed charges + ATM fees. Always compare multiple banks before transferring.'
      }

      let response = responses.default

      if (messageText.toLowerCase().includes('fee')) response = responses.fee
      if (messageText.toLowerCase().includes('bank')) response = responses.bank
      if (messageText.toLowerCase().includes('save')) response = responses.save
      if (messageText.toLowerCase().includes('transfer')) response = responses.transfer

      const assistantMessage = {
        id: Date.now() + 1,
        from: 'assistant',
        message: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setLoading(false)
    }, 1200)
  }

  return (
    <DashboardLayout>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_32px_80px_-40px_rgba(15,23,42,0.2)]">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-orange font-heading font-bold">AI assistant</p>
            <h1 className="mt-4 text-4xl font-heading font-bold text-deep-slate">Ask about forex fees and bank routes</h1>
          </div>
          <div className="rounded-[24px] bg-slate-950 px-5 py-4 text-white">
            <p className="text-[11px] uppercase tracking-[0.3em] text-teal/80 font-heading font-bold">Response mode</p>
            <p className="mt-2 text-lg font-heading font-bold">AI + rules</p>
          </div>
        </div>

        <ChatBot
          messages={messages}
          loading={loading}
          onSend={handleSend}
        />
      </div>

      {/* Quick Tips */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Ask about fees',
            desc: 'Get instant insights on forex markups, fixed charges, and ATM fees'
          },
          {
            title: 'Bank recommendations',
            desc: 'Discover which banks offer the best rates for your transfer amount'
          },
          {
            title: 'Savings analysis',
            desc: 'See how much you could save by switching to optimized routes'
          }
        ].map((tip, idx) => (
          <div
            key={idx}
            className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.08)] hover:border-teal transition"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-lg">
              {idx === 0 ? '💰' : idx === 1 ? '🏦' : '📊'}
            </div>
            <h3 className="text-lg font-heading font-bold text-deep-slate">{tip.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
    </DashboardLayout>
  )
}