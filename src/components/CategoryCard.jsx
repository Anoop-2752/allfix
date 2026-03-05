import { useNavigate } from 'react-router-dom'
import { ArrowRight, getIcon } from '../lib/icons'
import { getColors } from '../lib/colors'

function CategoryIcon({ name, className }) {
  const Icon = getIcon(name)
  if (!Icon) return null
  return <Icon className={className} size={20} />
}

export default function CategoryCard({ category }) {
  const navigate = useNavigate()
  const colors = getColors(category.color)

  return (
    <button
      onClick={() => navigate(`/${category.slug}`)}
      className={[
        'group w-full text-left rounded-2xl bg-[#141414] p-5',
        'border border-[#252525] border-t-[#2e2e2e]',
        'transition-all duration-300 cursor-pointer',
        colors.hoverBorder,
        colors.hoverGlow,
      ].join(' ')}
    >
      {/* Top row: icon + badge */}
      <div className="mb-4 flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.iconBg}`}>
          <CategoryIcon
            name={category.icon}
            className={`transition-colors duration-300 ${colors.iconColor} ${colors.hoverIcon}`}
          />
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
          {category.tools.length} tools
        </span>
      </div>

      {/* Name */}
      <h2 className="mb-1.5 text-base font-semibold text-white">{category.name}</h2>

      {/* Description — clamped to 2 lines */}
      <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-zinc-500">{category.description}</p>

      {/* Footer */}
      <div className="flex items-center gap-1 text-xs font-medium text-zinc-600 transition-colors duration-300 group-hover:text-zinc-300">
        <span>Explore tools</span>
        <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </button>
  )
}
