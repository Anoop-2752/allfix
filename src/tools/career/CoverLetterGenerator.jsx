import { useState } from 'react'

const TONES = [
  { value: 'professional', label: 'Professional', desc: 'Formal and polished' },
  { value: 'enthusiastic', label: 'Enthusiastic', desc: 'Warm and energetic' },
  { value: 'concise',      label: 'Concise',      desc: 'Short and direct' },
]

function buildLetter({ fullName, email, phone, jobTitle, companyName, hiringManager, currentRole, yearsExp, skills, achievement, whyCompany, tone }) {
  const manager    = hiringManager.trim() || 'Hiring Manager'
  const today      = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  const skillList  = skills.split('\n').map(s => s.trim()).filter(Boolean)
  const skillStr   = skillList.length === 0
    ? 'relevant skills'
    : skillList.length === 1
      ? skillList[0]
      : skillList.slice(0, -1).join(', ') + ' and ' + skillList[skillList.length - 1]
  const expPhrase  = yearsExp ? `${yearsExp} year${Number(yearsExp) !== 1 ? 's' : ''} of` : 'extensive'
  const role       = currentRole.trim() || jobTitle

  const openers = {
    professional: `I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. Having spent ${expPhrase} experience as a ${role}, I am confident my background and skills make me an excellent fit for your team.`,
    enthusiastic: `I was genuinely excited to come across the ${jobTitle} opening at ${companyName}! With ${expPhrase} experience as a ${role}, I believe I can make a meaningful impact at your organisation from day one.`,
    concise:      `I am applying for the ${jobTitle} role at ${companyName}. With ${expPhrase} experience as a ${role}, I bring the skills and focus your team needs.`,
  }

  const body2 = {
    professional: `Throughout my career, I have built strong expertise in ${skillStr}. I am known for delivering high-quality work with attention to detail and a collaborative approach that helps teams move faster and smarter.`,
    enthusiastic: `I have honed my expertise in ${skillStr} and truly love what I do. I thrive in fast-paced environments and enjoy solving complex problems with creative, practical solutions.`,
    concise:      `My expertise spans ${skillStr}. I focus on delivering results efficiently and work well both independently and in teams.`,
  }

  const achievementPara = achievement.trim()
    ? `\nA recent achievement I am proud of: ${achievement.trim()}\n`
    : ''

  const whyPara = whyCompany.trim()
    ? `\nWhat excites me most about ${companyName} is ${whyCompany.trim()}. I am eager to contribute to your mission and grow alongside such a strong team.\n`
    : ''

  const closers = {
    professional: `I would welcome the opportunity to discuss how my experience aligns with your team's goals. Thank you for your time and consideration — I look forward to hearing from you.`,
    enthusiastic: `I would love the chance to chat about how I can contribute to ${companyName}. Thank you so much for considering my application — I can't wait to connect!`,
    concise:      `I am happy to discuss my background further at your convenience. Thank you for your consideration.`,
  }

  const contact = [email.trim(), phone.trim()].filter(Boolean).join('  |  ')

  return `${today}

Dear ${manager},

${openers[tone]}

${body2[tone]}
${achievementPara}${whyPara}
${closers[tone]}

Sincerely,
${fullName}${contact ? `\n${contact}` : ''}`
}

function Field({ label, required, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-1">
        <label className="text-xs text-zinc-400">
          {label}{required && <span className="ml-0.5 text-rose-400">*</span>}
        </label>
        {hint && <span className="text-xs text-zinc-600">— {hint}</span>}
      </div>
      {children}
    </div>
  )
}

const inputCls = 'rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-green-500/50 transition-colors'

export default function CoverLetterGenerator() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    jobTitle: '', companyName: '', hiringManager: '',
    currentRole: '', yearsExp: '',
    skills: '', achievement: '', whyCompany: '',
    tone: 'professional',
  })
  const [letter, setLetter]   = useState('')
  const [copied, setCopied]   = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleGenerate() {
    if (!form.fullName.trim() || !form.jobTitle.trim() || !form.companyName.trim()) return
    setLetter(buildLetter(form))
    setShowPreview(true)
  }

  function handleReset() {
    setShowPreview(false)
    setLetter('')
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function fileName() {
    return `cover-letter-${form.companyName.replace(/\s+/g, '-').toLowerCase() || 'draft'}`
  }

  async function handleDownloadPdf() {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const margin = 20
    const pageW = doc.internal.pageSize.getWidth()
    const maxW  = pageW - margin * 2
    const lineH = 7

    // Header — name
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text(form.fullName || 'Cover Letter', margin, margin + 4)

    // Contact line
    const contact = [form.email, form.phone].filter(Boolean).join('   |   ')
    if (contact) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(100)
      doc.text(contact, margin, margin + 10)
    }

    // Divider
    doc.setDrawColor(200)
    doc.line(margin, margin + 14, pageW - margin, margin + 14)

    // Letter body
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(30)
    let y = margin + 22

    const lines = doc.splitTextToSize(letter, maxW)
    lines.forEach((line) => {
      if (y > 277) { doc.addPage(); y = margin }
      doc.text(line, margin, y)
      y += lineH
    })

    doc.save(`${fileName()}.pdf`)
  }

  async function handleDownloadDocx() {
    const { Document, Packer, Paragraph, TextRun, AlignmentType } = await import('docx')
    const paragraphs = letter.split('\n').map((line) =>
      new Paragraph({
        children: [new TextRun({ text: line, size: 24, font: 'Calibri' })],
        alignment: AlignmentType.LEFT,
        spacing: { after: line.trim() === '' ? 0 : 160 },
      })
    )

    // Name header
    const header = new Paragraph({
      children: [new TextRun({ text: form.fullName || 'Cover Letter', bold: true, size: 32, font: 'Calibri' })],
      spacing: { after: 80 },
    })

    const contactLine = [form.email, form.phone].filter(Boolean).join('   |   ')
    const contactPara = contactLine
      ? new Paragraph({
          children: [new TextRun({ text: contactLine, size: 20, color: '555555', font: 'Calibri' })],
          spacing: { after: 240 },
        })
      : null

    const doc = new Document({
      sections: [{
        properties: {},
        children: [header, ...(contactPara ? [contactPara] : []), ...paragraphs],
      }],
    })

    const blob = await Packer.toBlob(doc)
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${fileName()}.docx`
    a.click()
  }

  const canGenerate = form.fullName.trim() && form.jobTitle.trim() && form.companyName.trim()
  const filledCount = [form.fullName, form.email, form.jobTitle, form.companyName, form.currentRole, form.skills, form.achievement, form.whyCompany].filter(v => v.trim()).length
  const totalFields = 8

  if (showPreview && letter) {
    return (
      <div className="flex flex-col gap-4">
        {/* Header bar */}
        <div className="flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-green-400">Cover letter ready</p>
            <p className="text-xs text-zinc-500">{form.jobTitle} at {form.companyName} · {TONES.find(t => t.value === form.tone)?.label} tone</p>
          </div>
          <button onClick={handleReset} className="text-xs text-zinc-500 underline hover:text-zinc-300">
            Edit & Regenerate
          </button>
        </div>

        {/* Letter preview */}
        <div className="rounded-xl border border-[#2a2a2a] bg-[#141414]">
          <div className="border-b border-[#1e1e1e] px-5 py-3">
            <p className="text-xs text-zinc-500">Preview — you can edit directly below</p>
          </div>
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            rows={22}
            className="w-full resize-none bg-transparent p-5 text-sm leading-7 text-zinc-200 outline-none"
          />
        </div>

        {/* Word count */}
        <p className="text-xs text-zinc-600">
          {letter.trim().split(/\s+/).filter(Boolean).length} words · {letter.length} characters
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-500"
          >
            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
          </button>
          <button
            onClick={handleDownloadPdf}
            className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-rose-500/40 hover:text-rose-400"
          >
            Download PDF
          </button>
          <button
            onClick={handleDownloadDocx}
            className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-blue-500/40 hover:text-blue-400"
          >
            Download Word
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress hint */}
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1a1a1a]">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-300"
            style={{ width: `${(filledCount / totalFields) * 100}%` }}
          />
        </div>
        <span className="text-xs text-zinc-600">{filledCount}/{totalFields} fields</span>
      </div>

      {/* Personal info */}
      <div className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-600">Your Details</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Full Name" required>
            <input className={inputCls} placeholder="John Williams" value={form.fullName} onChange={set('fullName')} />
          </Field>
          <Field label="Email">
            <input className={inputCls} placeholder="john@example.com" value={form.email} onChange={set('email')} />
          </Field>
          <Field label="Phone">
            <input className={inputCls} placeholder="+1 555 000 1234" value={form.phone} onChange={set('phone')} />
          </Field>
        </div>
      </div>

      {/* Job info */}
      <div className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-600">Job Details</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Job Title Applying For" required>
            <input className={inputCls} placeholder="Frontend Developer" value={form.jobTitle} onChange={set('jobTitle')} />
          </Field>
          <Field label="Company Name" required>
            <input className={inputCls} placeholder="Acme Corp" value={form.companyName} onChange={set('companyName')} />
          </Field>
          <Field label="Hiring Manager Name" hint="leave blank for 'Hiring Manager'">
            <input className={inputCls} placeholder="Ms. Sarah Chen" value={form.hiringManager} onChange={set('hiringManager')} />
          </Field>
          <Field label="Your Current / Last Role">
            <input className={inputCls} placeholder="Software Engineer" value={form.currentRole} onChange={set('currentRole')} />
          </Field>
        </div>
        <div className="mt-4 w-32">
          <Field label="Years of Experience">
            <input className={inputCls} type="number" min={0} placeholder="3" value={form.yearsExp} onChange={set('yearsExp')} />
          </Field>
        </div>
      </div>

      {/* Highlights */}
      <div className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-600">Highlights</p>
        <div className="flex flex-col gap-4">
          <Field label="Key Skills" hint="one per line">
            <textarea
              className={`${inputCls} resize-none`}
              rows={4}
              placeholder={"React & TypeScript\nREST API integration\nAgile / Scrum"}
              value={form.skills}
              onChange={set('skills')}
            />
          </Field>
          <Field label="One Key Achievement" hint="optional — numbers make it stronger">
            <input
              className={inputCls}
              placeholder="Reduced deployment time by 60% by introducing CI/CD pipelines."
              value={form.achievement}
              onChange={set('achievement')}
            />
          </Field>
          <Field label="Why This Company?" hint="optional — personalises the letter">
            <input
              className={inputCls}
              placeholder="your commitment to developer experience and open-source culture"
              value={form.whyCompany}
              onChange={set('whyCompany')}
            />
          </Field>
        </div>
      </div>

      {/* Tone */}
      <div className="rounded-xl border border-[#2a2a2a] bg-[#141414] p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">Tone</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {TONES.map((t) => (
            <button
              key={t.value}
              onClick={() => setForm((f) => ({ ...f, tone: t.value }))}
              className={`rounded-lg border p-3 text-left transition-colors ${
                form.tone === t.value
                  ? 'border-green-500/40 bg-green-500/10'
                  : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]'
              }`}
            >
              <p className={`text-sm font-medium ${form.tone === t.value ? 'text-green-400' : 'text-zinc-300'}`}>{t.label}</p>
              <p className="mt-0.5 text-xs text-zinc-600">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Generate */}
      <button
        onClick={handleGenerate}
        disabled={!canGenerate}
        className="w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {canGenerate ? 'Generate Cover Letter →' : 'Fill in Name, Job Title & Company to generate'}
      </button>
    </div>
  )
}
