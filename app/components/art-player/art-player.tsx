import Artplayer from 'artplayer'
import { useEffect, useRef } from 'react'

interface PlayerProps {
  option: any
  getInstance?: (instance: Artplayer) => void
  className?: string
}

export default function ArtPlayer({ option, getInstance, className }: PlayerProps) {
  const artRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current,
      autoPlay: true,
      setting: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      screenshot: true,
      pip: true,
      fastForward: true
    })

    if (getInstance && typeof getInstance === 'function') {
      getInstance(art)
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false)
      }
    }
  }, [getInstance, option])

  return <div ref={artRef} className={className}></div>
}
