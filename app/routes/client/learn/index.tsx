import type { Route } from ".react-router/types/app/routes/client/learn/+types";
import { BookOpenCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { Link, useSearchParams } from "react-router";
import ArtPlayer from "~/components/art-player/art-player";
import Comment from "~/components/comment/comment";
import { default as Forbidden, default as NotFound } from "~/components/error-page/error-page";
import Wrapper from "~/components/layouts/client/wrapper/wrapper";
import MarkdownPreview from "~/components/markdown-preview/markdown-preview";
import CollapsibleCustom from "~/components/ui-custom/collapsible-custom";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { useCanAccessCourseMutation, useGetCourseDetailBySlugQuery } from "~/hooks/useCourse";
import { useGetLessonDetailQuery } from "~/hooks/useLesson";
import { cn, getLessonIdAndChapterId } from "~/lib/utils";
import type { GetCourseDetailResType } from "~/types/course.type";

function MenuLesson({
  chapters,
  lessonId,
  chapterId
}: {
  chapters: {
    id: number,
    title: string,
    order: number,
    duration: number,
    lessons: {
      id: number,
      title: string,
      duration: number
    }[]
  }[],
  lessonId?: number,
  chapterId?: number
}) {
  return (
    <>
      {
        chapters.map((chapter, index) =>
          <div className="flex flex-col gap-4" key={index}>
            <CollapsibleCustom isOpenInit={chapterId === chapter.id} chapter={chapter} isLearn={true} lessonId={lessonId} />
          </div>
        )
      }
    </>
  )
}

function RenderLesson({ lessonId, chapters, courseSlug, lessonIdPrev, lessonIdNext }:
  {
    lessonId: number,
    chapters: GetCourseDetailResType['chapters'],
    courseSlug: string,
    lessonIdPrev?: number,
    lessonIdNext?: number
  }) {
  const { data: lessonDetail, isPending } = useGetLessonDetailQuery({ lessonId })
  if (isPending) return null
  if (!lessonDetail) return <NotFound statusCode={404} message="Không tìm thấy bài học" />
  return (
    <>
      <div className="pr-2">
        <ArtPlayer
          option={{
            url: lessonDetail?.data.data.videoUrl ?? ''
          }}
          className={cn("w-full h-[220px] sm:h-[400px] md:h-[500px] xl:h-[600px] 2xl:h-[700px]", {
            "hidden": !lessonDetail?.data.data.videoUrl
          })}
        />
      </div>
      <div>
        <div className="flex justify-between items-center pr-2">
          <div className="flex items-center gap-6">
            {
              lessonIdPrev && <Link to={`/learn/${courseSlug}?lessonId=${lessonIdPrev}`}>
                <Button variant="outline" className="flex items-center gap-1 cursor-pointer w-[120px] h-[40px]">
                  <ChevronLeft className="w-8 h-8" />
                  Bài trước
                </Button>
              </Link>
            }
            <div className="lg:flex hidden flex-col gap-1">
              <h3 className="text-lg font-bold">{lessonDetail?.data.data.title}</h3>
              <h4 className="text-sm text-gray-500">{chapters.find(chapter => chapter.id === lessonDetail?.data.data.chapterId)?.title}</h4>
            </div>
          </div>
          <div>
            {
              lessonIdNext && <Link to={`/learn/${courseSlug}?lessonId=${lessonIdNext}`}>
                <Button variant="outline" className="flex items-center gap-1 cursor-pointer w-[120px] h-[40px]">
                  Bài tiếp
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </Link>
            }
          </div>
        </div>
        <div className="flex flex-col gap-1 lg:hidden mt-4 pr-2">
          <h3 className="text-lg font-bold">{lessonDetail?.data.data.title}</h3>
          <h4 className="text-sm text-gray-500">{chapters.find(chapter => chapter.id === lessonDetail?.data.data.chapterId)?.title}</h4>
        </div>
        <div className="mt-6 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
          <MarkdownPreview content={lessonDetail?.data.data.description ?? ''} />
        </div>
        <Comment className="pr-2" />
      </div>
    </>
  )
}

function Lesson({ lessonId, chapters, courseSlug }: { lessonId: number, chapters: GetCourseDetailResType['chapters'], courseSlug: string }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const isMinLg = useMediaQuery({ query: '(min-width: 1024px)' })
  const { lessonIdQuery, chapterIdQuery, lessonIdPrev, lessonIdNext } = getLessonIdAndChapterId(chapters, lessonId)
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="lg:col-span-9 col-span-12 flex flex-col gap-4 relative lg:mt-0 mt-6">
          <div className="lg:hidden absolute -top-12 right-4">
            <Sheet open={isOpenMenu && !isMinLg} onOpenChange={setIsOpenMenu}>
              <SheetTrigger onClick={() => setIsOpenMenu(true)}>
                <BookOpenCheck className="w-6 h-6 cursor-pointer" />
              </SheetTrigger>
              <SheetContent className="z-[9999]">
                <div className="pl-4 mt-8 pr-2 flex sticky top-16 flex-col max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
                  <MenuLesson chapters={chapters} lessonId={lessonIdQuery} chapterId={chapterIdQuery} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {lessonIdQuery && <RenderLesson lessonId={lessonIdQuery} chapters={chapters} courseSlug={courseSlug} lessonIdPrev={lessonIdPrev} lessonIdNext={lessonIdNext} />}
        </div>
        <div className="hidden lg:block lg:col-span-3 col-span-12">
          <div className="pl-4 pr-2 flex sticky top-16 flex-col max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900">
            <MenuLesson chapters={chapters} lessonId={lessonIdQuery} chapterId={chapterIdQuery} />
          </div>
        </div>
      </div>
    </>
  )
}

function Course({ lessonId, courseSlug }: { lessonId: number, courseSlug: string }) {
  const { data: courseDetail, isPending } = useGetCourseDetailBySlugQuery({ slug: courseSlug })
  if (isPending) return null
  if (!courseDetail) return <NotFound statusCode={404} message="Không tìm thấy khóa học" />

  return (
    <div className="py-6">
      <div className="flex flex-col gap-12">
        <div>
          <h1 className="text-2xl font-bold">{courseDetail.data.data.title}</h1>
        </div>
        <Lesson lessonId={lessonId} chapters={courseDetail.data.data.chapters} courseSlug={courseSlug} />
      </div>
    </div>
  )
}

function CanAccessCourse({ courseSlug, children }: { courseSlug: string, children: React.ReactNode }) {
  const [status, setStatus] = useState<"pending" | "access" | "not-access">("pending")
  const { mutateAsync } = useCanAccessCourseMutation()

  useEffect(() => {
    const checkAccessCourse = async () => {
      try {
        await mutateAsync({ slug: courseSlug })
        setStatus("access")
      } catch {
        setStatus("not-access")
      }
    }

    checkAccessCourse()
  }, [mutateAsync, courseSlug])

  if (status === "not-access") return <Forbidden statusCode={403} message="Bạn không có quyền truy cập khóa học này" />
  else if (status === "pending") return null
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}


export default function Learn({ params }: Route.ComponentProps) {
  const { courseSlug } = params
  const [searchParams] = useSearchParams()
  const lessonId = Number(searchParams.get("lessonId")) || 0

  return (
    <CanAccessCourse courseSlug={courseSlug} >
      <Course lessonId={lessonId} courseSlug={courseSlug} />
    </CanAccessCourse>
  )
}