import { cn } from "~/lib/utils";

export default function Wrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("max-w-[1440px] mx-auto flex flex-col min-h-screen px-4 py-8 xl:px-4 xl:py-8", className)}>
      {children}
    </div>
  )
}