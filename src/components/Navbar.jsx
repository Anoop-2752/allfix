import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Wrench, Search } from '../lib/icons'
import { allTools, categories } from '../data/tools'
import SearchModal from './SearchModal'

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const navigate = useNavigate()

  // Ctrl+K / Cmd+K to open search
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0f0f0f]/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          {/* Top row */}
          <div className="flex items-center justify-between py-3">
            <Link to="/" className="group flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/30 transition-all group-hover:bg-indigo-500/20 group-hover:ring-indigo-500/50">
                <Wrench size={13} className="text-indigo-400" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">AllFix</span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-zinc-700 sm:block">{allTools.length} free tools</span>

              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-[#3a3a3a] hover:text-zinc-300"
              >
                <Search size={12} />
                <span className="hidden sm:block">Search</span>
                <kbd className="hidden rounded border border-[#3a3a3a] bg-[#111] px-1 py-0.5 text-xs text-zinc-700 sm:block">⌘K</kbd>
              </button>
            </div>
          </div>

          {/* Category nav row */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/${cat.slug}`)}
                className="shrink-0 rounded-md px-2.5 py-1 text-xs text-zinc-600 transition-colors hover:bg-[#1e1e1e] hover:text-zinc-300"
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
