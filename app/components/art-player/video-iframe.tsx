import { useEffect, useRef } from 'react'
import { extractYoutubeId } from '~/lib/utils'

export default function VideoIframe({ videoUrl }: { videoUrl: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${extractYoutubeId(videoUrl)}`
    }
  }, [videoUrl])
  return (
    <iframe
      ref={iframeRef}
      className='w-full h-full'
      title='YouTube video player'
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      referrerPolicy='strict-origin-when-cross-origin'
      allowFullScreen
    />
  )
}
