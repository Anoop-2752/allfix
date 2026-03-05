import { useNavigate } from 'react-router-dom'
import { ArrowRight, getIcon } from '../lib/icons'
import { getColors } from '../lib/colors'

function ToolIcon({ name, className }) {
  const Icon = getIcon(name)
  if (!Icon) return null
  return <Icon className={className} size={16} />
}

export default function ToolCard({ tool, categoryColor = 'blue' }) {
  const navigate = useNavigate()
  const colors = getColors(categoryColor)

  return (
    <button
      onClick={() => navigate(`/${tool.category}/${tool.slug}`)}
      className={[
        'group w-full text-left rounded-xl bg-[#141414] p-4',
        'border border-[#252525] border-t-[#2e2e2e]',
        'transition-all duration-300 cursor-pointer',
        colors.hoverBorder,
        colors.hoverGlowSm,
      ].join(' ')}
    >
      {/* Icon */}
      <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${colors.iconBg}`}>
        <ToolIcon
          name={tool.icon}
          className={`transition-colors duration-300 ${colors.iconColor} ${colors.hoverIcon}`}
        />
      </div>

      {/* Name */}
      <h3 className="mb-1 text-sm font-semibold text-white">{tool.name}</h3>

      {/* Description */}
      <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600">{tool.description}</p>

      {/* Hover arrow */}
      <div className="mt-3 flex items-center gap-1 text-xs text-zinc-700 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-indigo-400">
        <span>Open</span>
        <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </button>
  )
}
