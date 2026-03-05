import { Link } from 'react-router-dom'
import { Wrench } from 'lucide-react'
import { allTools } from '../data/tools'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-[#0f0f0f]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/30 transition-all group-hover:bg-indigo-500/20 group-hover:ring-indigo-500/50">
            <Wrench size={13} className="text-indigo-400" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white">AllFix</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-zinc-600 sm:block">
            {allTools.length} free tools
          </span>
          <Link
            to="/"
            className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-[#3a3a3a] hover:text-white"
          >
            Browse all
          </Link>
        </div>
      </div>
    </header>
  )
}
