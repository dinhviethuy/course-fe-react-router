import { useEffect, useRef } from 'react'
import { useTheme } from '~/components/theme-provider'
import envConfig from '~/lib/config'

export default function Comment({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    while (el.firstChild) {
      el.removeChild(el.firstChild)
    }
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', envConfig.VITE_GITHUB_REPO)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('label', '💬 Bình luận')
    script.setAttribute('theme', theme === 'dark' ? 'github-dark' : 'github-light')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true
    ref.current?.appendChild(script)
  }, [theme])
  return (
    <div className={className}>
      <div ref={ref} />
    </div>
  )
}
