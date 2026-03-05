import { Link } from 'react-router-dom'
import { Wrench } from 'lucide-react'
import { categories } from '../data/tools'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#0f0f0f]">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* ── Brand ──────────────────────────────────────────────────────── */}
          <div>
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/30 transition-all group-hover:bg-indigo-500/20 group-hover:ring-indigo-500/50">
                <Wrench size={13} className="text-indigo-400" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">AllFix</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Every tool you need, one place.
            </p>
            <p className="mt-5 text-xs text-zinc-700">
              © {year} AllFix. All rights reserved.
            </p>
          </div>

          {/* ── Tools ──────────────────────────────────────────────────────── */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">Tools</p>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/${cat.slug}`}
                    className="text-sm text-zinc-500 transition-colors hover:text-indigo-400"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal ──────────────────────────────────────────────────────── */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">Legal</p>
            <ul className="space-y-3">
              {[
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms',   label: 'Terms of Service' },
                { to: '/cookies', label: 'Cookie Policy' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-zinc-500 transition-colors hover:text-indigo-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </footer>
  )
}
