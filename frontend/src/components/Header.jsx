import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Compare', to: '/compare' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Chat', to: '/assistant' },
  { label: 'History', to: '/transactions' }
]

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 h-20 backdrop-blur-xl bg-white/75 border-b border-slate-200/80 px-6 lg:px-12">
      <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal flex items-center justify-center text-white text-lg font-semibold">F</div>
          <div className="hidden md:block text-sm uppercase tracking-[0.35em] text-slate-700 font-semibold">Forex Insight</div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[13px] uppercase tracking-[0.2em] font-semibold ${
                  isActive ? 'text-deep-slate' : 'text-slate-500 hover:text-deep-slate'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="text-sm uppercase tracking-[0.2em] text-slate-600 hover:text-deep-slate"
              >
                Logout
              </button>
              <button
                onClick={() => navigate('/compare')}
                className="rounded-[12px] bg-deep-slate px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white shadow-[0_18px_40px_-24px_rgba(13,148,136,0.9)]"
              >
                New Simulation
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm uppercase tracking-[0.2em] text-slate-600 hover:text-deep-slate"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-[12px] bg-deep-slate px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white shadow-[0_18px_40px_-24px_rgba(13,148,136,0.9)]"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
