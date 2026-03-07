import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Wrench, Search, Github } from '../lib/icons'
import { allTools } from '../data/tools'
import SearchModal from './SearchModal'

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)

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
      <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between py-3.5">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-500/10 ring-1 ring-green-500/30 transition-all group-hover:bg-green-500/20 group-hover:ring-green-500/50">
                <Wrench size={15} className="text-green-400" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Quick<span className="text-green-400">Kit</span>
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-zinc-700 sm:block">{allTools.length} free tools</span>

              {/* GitHub link */}
              <a
                href="https://github.com/anoopkumar-dev/allfix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#141414] text-zinc-500 transition-colors hover:border-[#3a3a3a] hover:text-zinc-300"
                aria-label="GitHub"
              >
                <Github size={14} />
              </a>

              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#141414] px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-green-500/40 hover:text-green-400"
              >
                <Search size={12} />
                <span className="hidden sm:block">Search</span>
                <kbd className="hidden rounded border border-[#3a3a3a] bg-[#111] px-1 py-0.5 text-xs text-zinc-700 sm:block">⌘K</kbd>
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
