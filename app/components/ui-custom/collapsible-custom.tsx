import { ChevronDown, ChevronUp, TvMinimalPlay } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { cn } from "~/lib/utils";

export default function CollapsibleCustom({ isOpenInit }: { isOpenInit?: boolean }) {
  const [isOpen, setIsOpen] = useState(isOpenInit || false);

  return (
    // Dùng onOpenChange để đồng bộ state của component với state của chúng ta
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen} // <-- Đây là cách làm đúng
      className="border-b-[1px] border-gray-200 dark:border-gray-700 py-4"
    >
      {/* Không cần onClick ở đây nữa */}
      <CollapsibleTrigger className="w-full cursor-pointer flex justify-between">
        <div className="flex gap-2 items-center justify-start hover:underline">
          <span className="text-sm xl:text-base font-semibold text-left">Chương 1: Introduction</span>
          <span className="text-[12px] xl:text-base font-semibold text-left">(13:20:23)</span>
        </div>
        <div className="flex gap-2 items-center">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-3 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <ul className="flex flex-col pt-2 gap-y-3">
          <li className="flex gap-2 items-center cursor-pointer hover:text-primary">
            <TvMinimalPlay className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">Bài 1: Introduction</span>
            <span className="text-sm ml-auto">13:20:23</span>
          </li>
          <li className="flex gap-2 items-center cursor-pointer hover:text-primary">
            <TvMinimalPlay className="w-4 h-4 flex-shrink-0" />
            <span className={cn("text-sm", {
              "underline font-semibold": isOpenInit
            })}>Bài 2: Getting Started with the Project</span>
            <span className="text-sm ml-auto">10:05</span>
          </li>
          <li className="flex gap-2 items-center cursor-pointer hover:text-primary">
            <TvMinimalPlay className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">Bài 3: Core Concepts</span>
            <span className="text-sm ml-auto">25:11</span>
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}