// LazyLoadImage.tsx
import { lazy, Suspense } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'

const Component = lazy(() =>
  import('react-lazy-load-image-component').then((module) => ({
    default: module.LazyLoadImage
  }))
)


export default function LazyLoadImage({
  src,
  alt,
  className,
  width,
  height
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}) {
  return (
    <Suspense fallback={
      <div className={cn(className, 'w-full h-full')}>
        <Skeleton />
      </div>
    }>
      <Component
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
      />
    </Suspense>
  )
}
