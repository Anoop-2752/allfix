// Shared category color tokens used across CategoryCard, ToolCard, CategoryPage, ToolPage.
// All class strings are written out fully so Tailwind's scanner picks them up.
export const colorMap = {
  blue: {
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    badge: 'bg-blue-500/10 text-blue-400',
    hoverBorder: 'hover:border-blue-500/40',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.07)]',
    hoverGlowSm: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.07)]',
    hoverIcon: 'group-hover:text-blue-300',
  },
  purple: {
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    badge: 'bg-purple-500/10 text-purple-400',
    hoverBorder: 'hover:border-purple-500/40',
    hoverGlow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.07)]',
    hoverGlowSm: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.07)]',
    hoverIcon: 'group-hover:text-purple-300',
  },
}

export function getColors(color) {
  return colorMap[color] ?? colorMap.blue
}
