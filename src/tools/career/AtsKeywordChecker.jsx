import { useState } from 'react'
import { removeStopwords, eng } from 'stopword'

const JOB_FILLER = [
  'candidate', 'candidates', 'applicant', 'applicants', 'position',
  'company', 'looking', 'seeking', 'hiring', 'join', 'help', 'ensure',
  'support', 'opportunity', 'responsibilities', 'requirements',
  'qualifications', 'minimum', 'preferred', 'bonus', 'year', 'years',
  'plus', 'please', 'note', 'role', 'ideal', 'ideally', 'ability',
  'strong', 'knowledge', 'experience', 'familiarity', 'understanding',
  'excellent', 'demonstrated', 'proven', 'background', 'work', 'working',
  'ability', 'skills', 'skill', 'ability', 'include', 'including',
]

function extractKeywords(text) {
  // Detect words that appear capitalised mid-sentence (proper nouns / tech terms)
  // e.g. "React", "TypeScript", "AWS" — not the first word of a sentence
  const capitalised = new Set()
  for (const sentence of text.split(/[.\n!?]/)) {
    const words = sentence.trim().split(/\s+/)
    for (let i = 1; i < words.length; i++) {
      const clean = words[i].replace(/[^a-zA-Z0-9#+]/g, '')
      if (clean.length > 3 && /^[A-Z]/.test(clean)) {
        capitalised.add(clean.toLowerCase())
      }
    }
  }

  // Tokenise to lowercase, remove stopwords + job filler
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s#+]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3)

  const cleaned = removeStopwords(tokens, [...eng, ...JOB_FILLER])

  // Count frequency
  const freq = {}
  for (const w of cleaned) {
    freq[w] = (freq[w] || 0) + 1
  }

  // Keep only: capitalised mid-sentence words (tech/proper nouns)
  //        OR: words that appear 2+ times (repeated = important requirement)
  const keywords = {}
  for (const [word, count] of Object.entries(freq)) {
    if (capitalised.has(word) || count >= 2) {
      keywords[word] = count
    }
  }
  return keywords
}

const SAMPLE_JD = `We are looking for a Frontend Developer with experience in React and TypeScript.
The ideal candidate will have strong knowledge of JavaScript, CSS, and HTML.
Experience with REST APIs, Git, and Agile development methodologies is required.
Familiarity with testing frameworks like Jest and performance optimization is a plus.
Strong communication and problem-solving skills are essential.`

const SAMPLE_RESUME = `Frontend Developer with 3 years of experience building web applications using React and JavaScript.
Proficient in HTML, CSS, and responsive design. Worked with REST APIs and integrated third-party services.
Familiar with Git version control and collaborative development workflows.
Strong communication skills with a track record of delivering projects on time.`

export default function AtsKeywordChecker() {
  const [jobDesc, setJobDesc]   = useState('')
  const [resume, setResume]     = useState('')
  const [result, setResult]     = useState(null)

  function handleCheck() {
    if (!jobDesc.trim() || !resume.trim()) return

    const jdFreq     = extractKeywords(jobDesc)
    const resumeFreq = extractKeywords(resume)

    const jdKeywords = Object.keys(jdFreq).sort((a, b) => jdFreq[b] - jdFreq[a])

    const matched = []
    const missing = []

    for (const kw of jdKeywords) {
      if (resumeFreq[kw]) {
        matched.push(kw)
      } else {
        missing.push(kw)
      }
    }

    const score = jdKeywords.length > 0
      ? Math.round((matched.length / jdKeywords.length) * 100)
      : 0

    setResult({ matched, missing, score, total: jdKeywords.length })
  }

  function handleSample() {
    setJobDesc(SAMPLE_JD)
    setResume(SAMPLE_RESUME)
    setResult(null)
  }

  function handleClear() {
    setJobDesc('')
    setResume('')
    setResult(null)
  }

  const scoreColor =
    !result ? ''
    : result.score >= 70 ? 'text-emerald-400'
    : result.score >= 40 ? 'text-amber-400'
    : 'text-red-400'

  return (
    <div className="flex flex-col gap-6">

      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-600">Paste a job description and your resume text to see keyword matches.</p>
        <div className="flex gap-3">
          <button onClick={handleSample} className="text-xs text-zinc-600 transition-colors hover:text-indigo-400">
            Load sample
          </button>
          <button onClick={handleClear} className="text-xs text-zinc-600 transition-colors hover:text-red-400">
            Clear
          </button>
        </div>
      </div>

      {/* Two input panels */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Job Description
          </label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the job description here…"
            spellCheck={false}
            className="h-56 w-full resize-none rounded-xl border border-[#2a2a2a] bg-[#141414] p-4 text-sm text-zinc-200 placeholder:text-zinc-700 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Your Resume
          </label>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume text here…"
            spellCheck={false}
            className="h-56 w-full resize-none rounded-xl border border-[#2a2a2a] bg-[#141414] p-4 text-sm text-zinc-200 placeholder:text-zinc-700 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
          />
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={!jobDesc.trim() || !resume.trim()}
        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Check Keywords
      </button>

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-4">

          {/* Score */}
          <div className="flex items-center gap-4 rounded-xl border border-[#2a2a2a] bg-[#141414] p-5">
            <div className="flex flex-col items-center">
              <span className={`text-4xl font-bold ${scoreColor}`}>{result.score}%</span>
              <span className="mt-1 text-xs text-zinc-600">match score</span>
            </div>
            <div className="h-12 w-px bg-[#2a2a2a]" />
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-emerald-400 font-semibold">{result.matched.length}</span>
                <span className="ml-1.5 text-zinc-600">matched</span>
              </div>
              <div>
                <span className="text-red-400 font-semibold">{result.missing.length}</span>
                <span className="ml-1.5 text-zinc-600">missing</span>
              </div>
              <div>
                <span className="text-zinc-300 font-semibold">{result.total}</span>
                <span className="ml-1.5 text-zinc-600">total keywords</span>
              </div>
            </div>
          </div>

          {/* Score bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#1e1e1e]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                result.score >= 70 ? 'bg-emerald-500' : result.score >= 40 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${result.score}%` }}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Missing keywords */}
            {result.missing.length > 0 && (
              <div className="rounded-xl border border-red-500/20 bg-[#141414] p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-400">
                  Missing Keywords ({result.missing.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missing.map((kw) => (
                    <span key={kw} className="rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Matched keywords */}
            {result.matched.length > 0 && (
              <div className="rounded-xl border border-emerald-500/20 bg-[#141414] p-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  Matched Keywords ({result.matched.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matched.map((kw) => (
                    <span key={kw} className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-zinc-700">
            Tip: aim for 70%+ match. Add missing keywords naturally into your resume where relevant.
          </p>
        </div>
      )}
    </div>
  )
}
