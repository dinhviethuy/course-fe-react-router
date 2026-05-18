import Artplayer from 'artplayer'
import { memo, useCallback, useEffect, useRef } from 'react'

interface PlayerProps {
  option: any
  getInstance?: (instance: Artplayer) => void
  className?: string
  canSkip?: boolean
  maxAllowedTime?: number
}

const ArtPlayer = memo(({ option, getInstance, className, canSkip, maxAllowedTime }: PlayerProps) => {
  const artRef = useRef<HTMLDivElement>(null)
  const artInstanceRef = useRef<Artplayer | null>(null)
  const watchedTimeRef = useRef(0)
  const wasPlayingBeforeHiddenRef = useRef(false)

  const memoizedGetInstance = useCallback(
    (instance: Artplayer) => {
      if (getInstance && typeof getInstance === 'function') {
        getInstance(instance)
      }
    },
    [getInstance]
  )

  useEffect(() => {
    if (!artInstanceRef.current || artInstanceRef.current.url !== option.url) {
      if (artInstanceRef.current) {
        artInstanceRef.current.destroy(false)
      }

      watchedTimeRef.current = maxAllowedTime || 0

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
        fastForward: canSkip ?? false
      })

      artInstanceRef.current = art
      memoizedGetInstance(art)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          wasPlayingBeforeHiddenRef.current = !art.video.paused

          art.pause()
        } else {
          if (wasPlayingBeforeHiddenRef.current) {
            art.play()
          }
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      art.on('video:timeupdate', () => {
        if (!canSkip) {
          const current = art.currentTime

          if (current > watchedTimeRef.current) {
            watchedTimeRef.current = current
          }
        }
      })

      art.on('video:seeking', () => {
        if (canSkip) {
          return
        }
        const current = art.currentTime
        const allowed = Math.max(watchedTimeRef.current, maxAllowedTime ?? 0)
        if (current <= allowed + 2) {
          return
        }
        art.currentTime = allowed
        art.pause()
        art.notice.show = 'Bạn không thể tua vượt quá thời gian đã xem'
      })

      art.on('destroy', () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      })
    }

    return () => {
      if (artInstanceRef.current && artInstanceRef.current.destroy) {
        artInstanceRef.current.destroy(false)
        artInstanceRef.current = null
      }
    }
  }, [option, memoizedGetInstance])

  return <div ref={artRef} className={className} />
})

export default ArtPlayer
