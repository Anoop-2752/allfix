import { useEffect } from 'react'

const BASE = 'AllFix — Developer Tools & Utilities'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — AllFix` : BASE
    return () => { document.title = BASE }
  }, [title])
}
