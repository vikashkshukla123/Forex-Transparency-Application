import React, { useEffect, useRef } from 'react'

export default function ChatBot({ messages, loading, onSend }) {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex h-[500px] flex-col rounded-[28px] border border-slate-200 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
      {/* Chat Header */}
      <div className="border-b border-slate-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-lg">
            🤖
          </div>
          <div>
            <p className="text-sm font-heading font-bold text-deep-slate">Forex Assistant</p>
            <p className="text-xs text-slate-500">AI-powered financial guidance</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="space-y-3 text-center">
              <div className="flex gap-2 justify-center">
                <div className="h-3 w-3 rounded-full bg-teal/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-3 w-3 rounded-full bg-teal/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-3 w-3 rounded-full bg-teal/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-sm text-slate-500">Loading chat history...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="max-w-xs text-center">
              <div className="mb-4 text-4xl">💬</div>
              <p className="text-sm font-semibold text-slate-700">Start a conversation</p>
              <p className="mt-2 text-xs text-slate-500">Ask about forex fees, bank recommendations, or international transfers</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-[20px] px-4 py-3 ${
                    msg.from === 'user'
                      ? 'bg-teal/10 text-slate-900'
                      : 'bg-slate-50 border border-slate-200 text-slate-900'
                  }`}
                >
                  <p className="text-sm leading-6">{msg.message || msg.reply || msg.text}</p>
                  <p className={`mt-2 text-xs ${msg.from === 'user' ? 'text-teal/70' : 'text-slate-400'}`}>
                    {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 px-6 py-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask about fees, banks, or transfers..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                onSend?.(e.target.value)
                e.target.value = ''
              }
            }}
            className="flex-1 rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal focus:bg-white"
          />
          <button
            onClick={() => {
              const input = document.querySelector('input')
              if (input?.value.trim()) {
                onSend?.(input.value)
                input.value = ''
              }
            }}
            className="rounded-[14px] bg-deep-slate px-4 py-3 text-xs uppercase tracking-[0.25em] font-semibold text-white transition hover:bg-slate-900"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}