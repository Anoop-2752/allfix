import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { categories, allTools, getCategoryBySlug } from '../data/tools'
import { Search } from '../lib/icons'
import { usePageTitle } from '../hooks/usePageTitle'
import SEO from '../components/SEO'
import CategoryCard from '../components/CategoryCard'
import ToolCard from '../components/ToolCard'

const STRUCTURED_DATA = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AllFix',
  url: 'https://allfix.dev',
  description: 'Free online tools for developers, HR professionals, finance, career, and more.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://allfix.dev/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
})

const POPULAR_TOOLS = [
  { id: 'emi-calculator',        category: 'finance', name: 'EMI Calculator',        desc: 'Loan EMI with amortization table' },
  { id: 'gst-calculator',        category: 'finance', name: 'GST Calculator',         desc: 'Add/remove GST with CGST/SGST split' },
  { id: 'income-tax-calculator', category: 'finance', name: 'Income Tax Calculator',  desc: 'Old vs New regime comparison' },
  { id: 'salary-slip-generator', category: 'hr',      name: 'Salary Slip Generator',  desc: 'Professional salary slip instantly' },
  { id: 'pdf-merger',            category: 'pdf',     name: 'PDF Merger',             desc: 'Combine PDFs in your browser' },
  { id: 'ats-keyword-checker',   category: 'career',  name: 'ATS Keyword Checker',    desc: 'Match resume keywords to job description' },
]

export default function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  usePageTitle(null)

  const trimmed = query.trim().toLowerCase()
  const isSearching = trimmed.length > 0
  const results = isSearching
    ? allTools.filter(
        (t) =>
          t.name.toLowerCase().includes(trimmed) ||
          t.description.toLowerCase().includes(trimmed)
      )
    : []

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <SEO
        title="Free Online Tools — Developer, HR, Finance, PDF & More"
        description="AllFix — 37+ free online tools for developers, HR managers, job seekers, and finance. EMI calculator, GST, salary slip, PDF merger, ATS checker and more. No signup, runs in your browser."
        keywords="free online tools, EMI calculator, GST calculator, salary slip generator, PDF merger, ATS keyword checker, income tax calculator, HR tools, developer tools"
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">{STRUCTURED_DATA}</script>
      </Helmet>

      {/* Hero */}
      <section className="pb-10 pt-14 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[360px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/5 blur-3xl"
        />

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          <span className="text-xs font-medium text-indigo-300">Free &amp; open — no sign-up needed</span>
        </div>

        <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
          Every Tool You Need,{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            One Place
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
          Free tools for developers, HR teams, job seekers, and finance — all running in your browser. No signup, no ads, no cost.
        </p>

        {/* Category pills */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/${cat.slug}`)}
              className="rounded-full border border-[#2a2a2a] bg-[#141414] px-3 py-1 text-xs text-zinc-500 transition-colors hover:border-[#3a3a3a] hover:text-zinc-300"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="mx-auto mt-7 max-w-md">
          <div className="relative">
            <Search
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools… JSON, Base64, UUID…"
              className="w-full rounded-xl border border-[#2a2a2a] bg-[#141414] py-2.5 pl-9 pr-9 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-600 hover:text-zinc-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Search results */}
      {isSearching ? (
        <section>
          <div className="mb-5 flex items-center gap-3">
            <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-600">
              {results.length > 0
                ? `${results.length} result${results.length === 1 ? '' : 's'} for "${query.trim()}"`
                : `No results for "${query.trim()}"`}
            </h2>
            <div className="h-px flex-1 bg-[#1e1e1e]" />
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((tool) => {
                const cat = getCategoryBySlug(tool.category)
                return (
                  <ToolCard key={tool.id} tool={tool} categoryColor={cat?.color} />
                )
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#2a2a2a] py-14 text-center">
              <p className="text-sm text-zinc-600">
                Try "EMI", "GST", "Salary Slip", or "PDF".
              </p>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Popular tools */}
          <section className="mb-10">
            <div className="mb-5 flex items-center gap-3">
              <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-600">Popular Tools</h2>
              <div className="h-px flex-1 bg-[#1e1e1e]" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {POPULAR_TOOLS.map((tool) => {
                const cat = getCategoryBySlug(tool.category)
                return (
                  <ToolCard
                    key={tool.id}
                    tool={{ ...tool, icon: allTools.find((t) => t.id === tool.id)?.icon }}
                    categoryColor={cat?.color}
                  />
                )
              })}
            </div>
          </section>

          {/* Categories */}
          <section>
            <div className="mb-5 flex items-center gap-3">
              <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-600">All Categories</h2>
              <div className="h-px flex-1 bg-[#1e1e1e]" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
