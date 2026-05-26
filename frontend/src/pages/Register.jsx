import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import '../styles/animations.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await registerUser({ name, email, password })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Left content section */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  F
                </div>
                <span className="text-xl font-bold text-white">Forex Insight</span>
              </div>
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent leading-tight">
                Join the Revolution
              </h1>
              <p className="text-lg text-blue-100 max-w-md leading-relaxed">
                Get started with forex transparency today. Access real-time bank comparisons, smart analytics, and AI-powered guidance.
              </p>
            </div>

            {/* Why join cards */}
            <div className="space-y-3">
              <div className="group relative overflow-hidden rounded-xl bg-blue-600/20 p-4 backdrop-blur border border-blue-400/30 hover:border-blue-300/80 transition transform hover:translate-x-1 cursor-pointer animate-fade-in-delayed-1">
                <div className="relative z-10 flex gap-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="font-bold text-white">Instant Comparisons</p>
                    <p className="text-sm text-blue-100">Compare bank fees in seconds</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-cyan-600/20 p-4 backdrop-blur border border-cyan-400/30 hover:border-cyan-300/80 transition transform hover:translate-x-1 cursor-pointer animate-fade-in-delayed-2">
                <div className="relative z-10 flex gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-bold text-white">Smart Analytics</p>
                    <p className="text-sm text-cyan-100">Deep insights into your transfers</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl bg-teal-600/20 p-4 backdrop-blur border border-teal-400/30 hover:border-teal-300/80 transition transform hover:translate-x-1 cursor-pointer animate-fade-in-delayed-1">
                <div className="relative z-10 flex gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className="font-bold text-white">AI Assistant</p>
                    <p className="text-sm text-teal-100">24/7 forex guidance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-blue-500/20">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-300">500+</p>
                <p className="text-xs text-blue-200">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-300">24/7</p>
                <p className="text-xs text-blue-200">Support</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-300">99.9%</p>
                <p className="text-xs text-blue-200">Uptime</p>
              </div>
            </div>
          </div>

          {/* Right form section */}
          <form onSubmit={handleSubmit} className="relative animate-fade-in-delayed-3">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl bg-slate-800/60 backdrop-blur-2xl border border-blue-500/30 p-8 shadow-2xl space-y-6">
              {/* Form header */}
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-white">Create Account</h2>
                <p className="text-sm text-blue-200">Start your forex journey today</p>
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-200 backdrop-blur-sm animate-pulse">
                  <p className="font-semibold">⚠️ {error}</p>
                </div>
              )}

              {/* Form fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-blue-100">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition blur" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="John Doe"
                      className="relative w-full rounded-lg bg-slate-700/50 border border-blue-500/30 px-4 py-3 text-white placeholder-blue-300/50 outline-none transition focus:border-blue-400/80 focus:ring-2 focus:ring-blue-500/30 hover:border-blue-400/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-blue-100">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition blur" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="relative w-full rounded-lg bg-slate-700/50 border border-blue-500/30 px-4 py-3 text-white placeholder-blue-300/50 outline-none transition focus:border-blue-400/80 focus:ring-2 focus:ring-blue-500/30 hover:border-blue-400/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-blue-100">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition blur" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="relative w-full rounded-lg bg-slate-700/50 border border-blue-500/30 px-4 py-3 text-white placeholder-blue-300/50 outline-none transition focus:border-blue-400/80 focus:ring-2 focus:ring-blue-500/30 hover:border-blue-400/50"
                    />
                  </div>
                </div>

                <p className="text-xs text-blue-300 pt-2">
                  ✓ Strong password recommended (8+ characters)
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-6 py-3 font-bold uppercase tracking-wider text-white transition transform hover:scale-105 hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-blue-500/20" />
                <span className="text-xs text-blue-300">Already a member?</span>
                <div className="flex-1 h-px bg-blue-500/20" />
              </div>

              {/* Login link */}
              <Link
                to="/login"
                className="block w-full text-center rounded-lg border-2 border-blue-400/50 px-6 py-3 font-bold text-blue-100 transition hover:bg-blue-500/20 hover:border-blue-300 hover:text-white"
              >
                Sign In
              </Link>

              {/* Footer text */}
              <p className="text-center text-xs text-blue-300">
                🔒 Your data is encrypted • Privacy policy applies
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
