import { Link, useLocation } from 'react-router-dom'
import { Diamond, Search, Clock, Menu, X, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home', icon: Diamond },
    { to: '/vault', label: 'The Vault', icon: Search },
    { to: '/chronology', label: 'Cast Chronology', icon: Clock },
    { to: '/database', label: 'Database', icon: AlertTriangle },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <Diamond className="w-6 h-6 text-gold" />
            <span className="font-display text-lg sm:text-xl font-semibold text-obsidian tracking-tight">
              Housewife Heritage
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const CurrentIcon = link.icon
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all no-underline ${
                    isActive(link.to)
                      ? 'bg-gold/10 text-gold-dark'
                      : 'text-obsidian/60 hover:text-obsidian hover:bg-marble/50'
                  }`}
                >
                  <CurrentIcon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-obsidian/60 hover:bg-marble/50 bg-transparent border-none cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gold/10">
            {links.map((link) => {
              const CurrentIcon = link.icon
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium no-underline ${
                    isActive(link.to)
                      ? 'text-gold-dark bg-gold/5'
                      : 'text-obsidian/60'
                  }`}
                >
                  <CurrentIcon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
