import { BookOpenCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import ArtPlayer from "~/components/art-player/art-player";
import Comment from "~/components/comment/comment";
import Wrapper from "~/components/layouts/client/wrapper/wrapper";
import MarkdownPreview from "~/components/markdown-preview/markdown-preview";
import CollapsibleCustom from "~/components/ui-custom/collapsible-custom";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

function MenuLesson() {
  return (
    <>
      {
        Array.from({ length: 20 }).map((_, index) =>
          <div className="flex flex-col gap-4" key={index}>
            <CollapsibleCustom isOpenInit={index === 0} />
          </div>
        )
      }
    </>
  )
}

const url = 'http://localhost:3000/media/static/videos/293e2050-6d4f-4f82-9579-53c40ac4187d.mp4'

export default function Learn() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const isMinLg = useMediaQuery({
    query: '(min-width: 1024px)'
  })
  return (
    <Wrapper>
      <div className="py-6">
        <div className="flex flex-col gap-12">
          <div>
            <h1 className="text-2xl font-bold">Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online</h1>
          </div>
          <div className="grid grid-cols-12">
            <div className="lg:col-span-9 col-span-12 flex flex-col gap-4 relative lg:mt-0 mt-6">
              <div className="lg:hidden absolute -top-12 right-4">
                <Sheet open={isOpenMenu && !isMinLg} onOpenChange={setIsOpenMenu}>
                  <SheetTrigger>
                    <BookOpenCheck className="w-6 h-6 cursor-pointer" />
                  </SheetTrigger>
                  <SheetContent className="z-[9999]">
                    <div className="pl-4 mt-8 pr-2 flex sticky top-16 flex-col max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
                      <MenuLesson />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="pr-2">
                <ArtPlayer
                  option={{
                    url
                  }}
                  className="w-full h-[220px] sm:h-[400px] md:h-[500px] xl:h-[600px] 2xl:h-[700px]"
                />
              </div>
              <div>
                <div className="flex justify-between items-center pr-2">
                  <div className="flex items-center gap-6">
                    <Button variant="outline" className="flex items-center gap-1 cursor-pointer w-[120px] h-[40px]">
                      <ChevronLeft className="w-8 h-8" />
                      Bài trước
                    </Button>
                    <div className="lg:flex hidden flex-col gap-1">
                      <h3 className="text-lg font-bold">Bài 3: Chạy code TypeScript trên Bun, Deno và Node.js</h3>
                      <h4 className="text-sm text-gray-500">Chương 2: Ôn tập JS và TS</h4>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" className="flex items-center gap-1 cursor-pointer w-[120px] h-[40px]">
                      Bài tiếp
                      <ChevronRight className="w-8 h-8" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-1 lg:hidden mt-4 pr-2">
                  <h3 className="text-lg font-bold">Bài 3: Chạy code TypeScript trên Bun, Deno và Node.js</h3>
                  <h4 className="text-sm text-gray-500">Chương 2: Ôn tập JS và TS</h4>
                </div>
                <div className="mt-6 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
                  <MarkdownPreview />
                </div>
                <Comment className="pr-2" />
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-3 col-span-12">
              <div className="pl-4 pr-2 flex sticky top-16 flex-col max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
                <MenuLesson />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}