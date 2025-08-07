import { cn } from "~/lib/utils"

interface LoadingProps {
  className?: string
}

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('flex justify-center items-center min-h-screen bg-background', className)}>
      <span className='loader'></span>
    </div>
  )
}
