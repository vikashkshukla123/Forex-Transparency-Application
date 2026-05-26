import { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard', to: '/', icon: '📊' },
  { label: 'Compare', to: '/compare', icon: '⚖️' },
  { label: 'Analytics', to: '/analytics', icon: '📈' },
  { label: 'Chat', to: '/chat', icon: '💬' },
  { label: 'History', to: '/transactions', icon: '📋' }
]

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-40 hidden lg:block h-20 backdrop-blur-xl bg-white/75 border-b border-slate-200/80 px-8">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-11 h-11 rounded-[16px] bg-gradient-to-br from-teal to-teal/80 flex items-center justify-center text-white text-lg font-heading font-bold">
              F
            </div>
            <div className="text-sm uppercase tracking-[0.35em] text-slate-700 font-heading font-bold hidden md:block">
              Forex Insight
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-12">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[13px] uppercase tracking-[0.2em] font-heading font-bold transition ${
                    isActive ? 'text-teal' : 'text-slate-500 hover:text-deep-slate'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="ml-auto flex items-center gap-4 flex-shrink-0">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 rounded-[12px] bg-slate-50">
                  <div className="h-8 w-8 rounded-full bg-teal/10 flex items-center justify-center text-sm font-semibold text-teal">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-deep-slate">{user.name}</p>
                    <p className="text-[10px] text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm uppercase tracking-[0.2em] font-heading font-bold text-slate-600 hover:text-teal transition"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate('/compare')}
                  className="rounded-[12px] bg-deep-slate px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-heading font-bold text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)] transition hover:bg-slate-900"
                >
                  New Simulation
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm uppercase tracking-[0.2em] font-heading font-bold text-slate-600 hover:text-teal transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-[12px] bg-deep-slate px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-heading font-bold text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)] transition hover:bg-slate-900"
                >
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 lg:hidden h-16 backdrop-blur-xl bg-white/75 border-b border-slate-200/80 px-4">
        <div className="mx-auto flex h-full items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-teal to-teal/80 flex items-center justify-center text-white text-lg font-heading font-bold">
              F
            </div>
            <span className="text-xs uppercase tracking-[0.3em] font-heading font-bold text-slate-700">FX</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-auto text-deep-slate hover:text-teal transition"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg">
            <nav className="flex flex-col divide-y divide-slate-200">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm uppercase tracking-[0.2em] font-heading font-bold transition ${
                      isActive ? 'text-teal bg-teal/5' : 'text-slate-600 hover:text-teal'
                    }`
                  }
                >
                  {item.icon} {item.label}
                </NavLink>
              ))}
              <div className="px-4 py-3 space-y-2">
                {user ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="w-full text-sm uppercase tracking-[0.2em] font-heading font-bold text-slate-600 hover:text-teal py-2"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => {
                        navigate('/compare')
                        setMobileMenuOpen(false)
                      }}
                      className="w-full rounded-[12px] bg-deep-slate px-3 py-2 text-xs uppercase tracking-[0.3em] font-heading font-bold text-white"
                    >
                      New Simulation
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center text-sm uppercase tracking-[0.2em] font-heading font-bold text-slate-600 hover:text-teal py-2"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-center rounded-[12px] bg-deep-slate px-3 py-2 text-xs uppercase tracking-[0.3em] font-heading font-bold text-white"
                    >
                      Join
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}