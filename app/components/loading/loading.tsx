import { cn } from '~/lib/utils'

interface LoadingProps {
  className?: string
}

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('flex justify-center items-center flex-1 bg-background dark:bg-background', className)}>
      <span className='loader'></span>
    </div>
  )
}
