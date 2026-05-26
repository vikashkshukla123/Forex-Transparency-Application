import { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard', to: '/', icon: '📊' },
  { label: 'Compare', to: '/compare', icon: '⚖️' },
  { label: 'Analytics', to: '/analytics', icon: '📈' },
  { label: 'Chat', to: '/assistant', icon: '💬' },
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
        <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between gap-6">
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
    </>
  )
}
