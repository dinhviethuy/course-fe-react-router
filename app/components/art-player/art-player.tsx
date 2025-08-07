import Artplayer from 'artplayer'
import { memo, useCallback, useEffect, useRef } from 'react'

interface PlayerProps {
  option: any
  getInstance?: (instance: Artplayer) => void
  className?: string
}

const ArtPlayer = memo(({ option, getInstance, className }: PlayerProps) => {
  const artRef = useRef<HTMLDivElement>(null)
  const artInstanceRef = useRef<Artplayer | null>(null)

  const memoizedGetInstance = useCallback((instance: Artplayer) => {
    if (getInstance && typeof getInstance === 'function') {
      getInstance(instance)
    }
  }, [getInstance])

  useEffect(() => {
    if (!artInstanceRef.current || artInstanceRef.current.url !== option.url) {
      if (artInstanceRef.current) {
        artInstanceRef.current.destroy(false)
      }

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

      artInstanceRef.current = art
      memoizedGetInstance(art)
    }

    return () => {
      if (artInstanceRef.current && artInstanceRef.current.destroy) {
        artInstanceRef.current.destroy(false)
        artInstanceRef.current = null
      }
    }
  }, [option, memoizedGetInstance])

  return (
    <div
      ref={artRef}
      className={className}
    />
  )
})

export default ArtPlayer
