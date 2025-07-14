import { ChevronDown, ChevronUp, TvMinimalPlay } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";

export default function CollapsibleCustom() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Dùng onOpenChange để đồng bộ state của component với state của chúng ta
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen} // <-- Đây là cách làm đúng
      className="border-b-[1px] border-gray-200 dark:border-gray-700 pb-2"
    >
      {/* Không cần onClick ở đây nữa */}
      <CollapsibleTrigger className="w-full cursor-pointer flex justify-between">
        <div className="flex gap-2 items-center hover:underline">
          <span className="text-base font-semibold">Chương 1: Introduction</span>
          <span className="text-base font-semibold">(13:20:23)</span>
        </div>
        <div className="flex gap-2 items-center">
          {/* State isOpen vẫn được dùng để đổi icon */}
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </CollapsibleTrigger>

      {/* CollapsibleContent sẽ tự động có animation */}
      <CollapsibleContent className="mt-3 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <ul className="flex flex-col pt-2 gap-y-3">
          <li className="flex gap-2 items-center cursor-pointer hover:text-primary">
            <TvMinimalPlay className="w-4 h-4 flex-shrink-0" />
            <span className="text-base">Bài 1: Introduction</span>
            <span className="text-base ml-auto">13:20:23</span>
          </li>
          <li className="flex gap-2 items-center cursor-pointer hover:text-primary">
            <TvMinimalPlay className="w-4 h-4 flex-shrink-0" />
            <span className="text-base">Bài 2: Getting Started with the Project</span>
            <span className="text-base ml-auto">10:05</span>
          </li>
          <li className="flex gap-2 items-center cursor-pointer hover:text-primary">
            <TvMinimalPlay className="w-4 h-4 flex-shrink-0" />
            <span className="text-base">Bài 3: Core Concepts</span>
            <span className="text-base ml-auto">25:11</span>
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}