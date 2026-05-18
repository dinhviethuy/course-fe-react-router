import type { Route } from '.react-router/types/app/routes/client/learn/+types'
import { useQueryClient } from '@tanstack/react-query'
import { BookOpenCheck, CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, Lock, Loader2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import ArtPlayer from '~/components/art-player/art-player'
import { default as Forbidden, default as NotFound } from '~/components/error-page/error-page'
import Wrapper from '~/components/layouts/client/wrapper/wrapper'
import MarkdownPreview from '~/components/markdown-preview/markdown-preview'
import AccordionCustom from '~/components/ui-custom/accordion-custom'
import { Accordion } from '~/components/ui/accordion'
import { Button } from '~/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import { LessonType } from '~/constants/lesson.constant'
import { useCanAccessCourseMutation, useGetCourseDetailBySlugQuery } from '~/hooks/useCourse'
import { useCompleteLessonMutation, useGetLessonDetailQuery } from '~/hooks/useLesson'
import envConfig from '~/lib/config'
import { getLessonIdAndChapterId } from '~/lib/utils'
import type { GetCourseDetailResType } from '~/types/course.type'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Khu vực học tập' }, { name: 'description', content: 'Khu vực học tập' }]
}

function MenuLesson({
  chapters,
  lessonId,
  courseSlug,
  titleChapter
}: {
  chapters: GetCourseDetailResType['chapters']
  lessonId?: number
  chapterId?: number
  courseSlug: string
  titleChapter: string
}) {
  const [openAccordion, setOpenAccordion] = useState<string[]>([titleChapter])

  useEffect(() => {
    setOpenAccordion([titleChapter])
  }, [titleChapter])

  // lesson is locked if any previous lesson is not completed
  const lockedLessonIds = useMemo(() => {
    const allLessons = chapters.flatMap((c) => c.lessons)
    const locked = new Set<number>()
    let foundIncomplete = false
    for (const lesson of allLessons) {
      if (foundIncomplete) {
        locked.add(lesson.id)
      } else if (!lesson.isCompleted) {
        foundIncomplete = true
      }
    }
    return locked
  }, [chapters])

  return (
    <Accordion type='multiple' className='w-full' value={openAccordion} onValueChange={setOpenAccordion}>
      {chapters.map((chapter) => (
        <AccordionCustom
          chapter={chapter}
          isLearn={true}
          lessonId={lessonId}
          courseSlug={courseSlug}
          key={chapter.id}
          lockedLessonIds={lockedLessonIds}
        />
      ))}
    </Accordion>
  )
}

function RenderLesson({
  lessonId,
  chapters,
  courseSlug,
  lessonIdPrev,
  lessonIdNext,
  setTitleChapter
}: {
  lessonId: number
  chapters: GetCourseDetailResType['chapters']
  courseSlug: string
  lessonIdPrev?: number
  lessonIdNext?: number
  setTitleChapter: (title: string) => void
}) {
  const queryClient = useQueryClient()
  const { data: lessonDetail, isPending, isError } = useGetLessonDetailQuery({ lessonId })
  const { mutateAsync: completeLesson, isPending: isCompleting } = useCompleteLessonMutation()

  // Tránh trường hợp auto complete khi user chuyển sang bài học khác mà chưa hoàn thành bài hiện tại
  const hasAutoCompletedRef = useRef(false)

  // Reset auto complete nếu lessonId thay đổi (trường hợp người dùng chuyển sang bài học khác mà chưa hoàn thành bài hiện tại)
  useEffect(() => {
    hasAutoCompletedRef.current = false
  }, [lessonId])

  const allLessons = useMemo(() => chapters.flatMap((c) => c.lessons), [chapters])
  const currentLessonMeta = allLessons.find((l) => l.id === lessonId)
  const isCurrentLessonCompleted = currentLessonMeta?.isCompleted ?? false
  const firstIncompleteLesson = allLessons.find((l) => !l.isCompleted)

  const videoUrl = useMemo(() => {
    const raw = lessonDetail?.data.data.videoUrl
    return raw ? `${envConfig.VITE_API_URL}/media/static/videos/${raw}.mp4` : null
  }, [lessonDetail?.data.data.videoUrl])

  const playerOption = useMemo(() => ({ url: videoUrl ?? '' }), [videoUrl])

  useEffect(() => {
    if (lessonDetail) {
      const titleChapter = chapters.find((chapter) => chapter.id === lessonDetail?.data.data.chapterId)?.title || ''
      setTitleChapter(titleChapter)
    }
  }, [lessonDetail, chapters, setTitleChapter])

  const handleComplete = useCallback(async () => {
    try {
      await completeLesson({ lessonId })
      await queryClient.invalidateQueries({ queryKey: ['course-detail', courseSlug] })
      toast.success('Hoàn thành bài học!')
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại')
    }
  }, [lessonId, courseSlug, completeLesson, queryClient])

  // Auto hoàn thành bài học nếu không có video và không phải quiz
  useEffect(() => {
    if (!lessonDetail || isCurrentLessonCompleted || hasAutoCompletedRef.current) return
    const lesson = lessonDetail.data.data
    if (lesson.type === LessonType.QUIZ || lesson.videoUrl) return
    hasAutoCompletedRef.current = true
    handleComplete()
  }, [lessonDetail, isCurrentLessonCompleted, handleComplete])

  // Auto hoàn thành bài học nếu xem 90% video
  const handleGetInstance = useCallback(
    (art: any) => {
      if (isCurrentLessonCompleted) return
      const watchedTime = { max: 0 }
      art.on('video:timeupdate', () => {
        const current = art.currentTime
        if (current > watchedTime.max) watchedTime.max = current
        if (!hasAutoCompletedRef.current && art.duration > 0 && watchedTime.max / art.duration >= 0.9) {
          hasAutoCompletedRef.current = true
          handleComplete()
        }
      })
    },
    [isCurrentLessonCompleted, handleComplete]
  )

  if (isPending) return null

  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-20 pr-2'>
        <Lock className='w-14 h-14 text-muted-foreground' />
        <h3 className='text-xl font-semibold'>Bài học bị khóa</h3>
        <p className='text-muted-foreground text-center'>Vui lòng hoàn thành tất cả bài học trước đó</p>
        {firstIncompleteLesson && (
          <Link to={`/learn/${courseSlug}?lessonId=${firstIncompleteLesson.id}`}>
            <Button>Quay lại bài chưa hoàn thành</Button>
          </Link>
        )}
      </div>
    )
  }

  if (!lessonDetail) return <NotFound statusCode={404} message='Không tìm thấy bài học' />

  const lesson = lessonDetail.data.data
  const titleChapter = chapters.find((chapter) => chapter.id === lesson.chapterId)?.title || ''
  const isQuiz = lesson.type === LessonType.QUIZ

  const CompletionStatus = isCurrentLessonCompleted ? (
    <div className='flex items-center gap-2 text-green-600 font-medium'>
      <CheckCircle2 className='w-5 h-5' />
      Đã hoàn thành
    </div>
  ) : isCompleting ? (
    <div className='flex items-center gap-2 text-muted-foreground'>
      <Loader2 className='w-4 h-4 animate-spin' />
      Đang ghi nhận...
    </div>
  ) : null

  const NavBar = (
    <div className='flex justify-between items-center pr-2'>
      <div className='flex items-center gap-6'>
        {lessonIdPrev && (
          <Link to={`/learn/${courseSlug}?lessonId=${lessonIdPrev}`}>
            <Button variant='outline' className='flex items-center gap-1 cursor-pointer w-[120px] h-[40px]'>
              <ChevronLeft className='w-8 h-8' />
              Bài trước
            </Button>
          </Link>
        )}
        <div className='lg:flex hidden flex-col gap-1'>
          <h3 className='text-lg font-bold'>{lesson.title}</h3>
          <h4 className='text-sm text-gray-500'>{titleChapter}</h4>
        </div>
      </div>
      <div>
        {lessonIdNext && isCurrentLessonCompleted && (
          <Link to={`/learn/${courseSlug}?lessonId=${lessonIdNext}`}>
            <Button variant='outline' className='flex items-center gap-1 cursor-pointer w-[120px] h-[40px]'>
              Bài tiếp
              <ChevronRight className='w-8 h-8' />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )

  const MobileTitleBlock = (
    <div className='flex flex-col gap-1 lg:hidden mt-4 pr-2'>
      <h3 className='text-lg font-bold'>{lesson.title}</h3>
      <h4 className='text-sm text-gray-500'>{titleChapter}</h4>
    </div>
  )

  if (isQuiz) {
    return (
      <>
        {NavBar}
        {MobileTitleBlock}
        <div className='flex flex-col items-center justify-center gap-6 py-12 pr-2'>
          <ClipboardList className='w-16 h-16 text-primary opacity-80' />
          <h2 className='text-2xl font-bold text-center'>{lesson.title}</h2>
          {lesson.description && (
            <div className='max-w-2xl w-full'>
              <MarkdownPreview content={lesson.description} />
            </div>
          )}
          <Button
            size='lg'
            onClick={handleComplete}
            disabled={isCurrentLessonCompleted || isCompleting}
            className='w-[200px]'
          >
            {isCurrentLessonCompleted ? (
              <>
                <CheckCircle2 className='w-4 h-4' />
                Đã hoàn thành
              </>
            ) : isCompleting ? (
              <>
                <Loader2 className='w-4 h-4 animate-spin' />
                Đang xử lý...
              </>
            ) : (
              'DONE'
            )}
          </Button>
        </div>
      </>
    )
  }

  // CONTENT type
  return (
    <>
      <div className='pr-2'>
        {videoUrl && (
          <ArtPlayer
            option={playerOption}
            getInstance={handleGetInstance}
            className='w-full h-[220px] sm:h-[400px] md:h-[500px] xl:h-[600px] 2xl:h-[700px]'
          />
        )}
      </div>
      <div>
        {NavBar}
        {MobileTitleBlock}
        <div className='mt-6 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900'>
          <MarkdownPreview content={lesson.description ?? ''} />
        </div>
        {videoUrl && (
          <div className='flex justify-center mt-6 pr-2'>
            {isCurrentLessonCompleted || isCompleting ? (
              CompletionStatus
            ) : (
              <p className='text-sm text-muted-foreground'>Xem ít nhất 90% video để hoàn thành bài học</p>
            )}
          </div>
        )}
        {!videoUrl && CompletionStatus && <div className='flex justify-center mt-6 pr-2'>{CompletionStatus}</div>}
      </div>
    </>
  )
}

function RenderSheet({
  chapters,
  courseSlug,
  lessonIdQuery,
  titleChapter,
  chapterIdQuery
}: {
  chapters: GetCourseDetailResType['chapters']
  lessonIdQuery?: number
  courseSlug: string
  titleChapter: string
  chapterIdQuery?: number
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const isMinLg = useMediaQuery({ query: '(min-width: 1024px)' })

  return (
    <Sheet open={isOpenMenu && !isMinLg} onOpenChange={setIsOpenMenu}>
      <SheetTrigger onClick={() => setIsOpenMenu(true)}>
        <BookOpenCheck className='w-6 h-6 cursor-pointer' />
      </SheetTrigger>
      <SheetContent className='z-[9999]'>
        <div className='pl-4 mt-8 pr-2 flex sticky top-16 flex-col max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900'>
          <MenuLesson
            chapters={chapters}
            lessonId={lessonIdQuery}
            chapterId={chapterIdQuery}
            courseSlug={courseSlug}
            titleChapter={titleChapter}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

function Lesson({
  lessonId,
  chapters,
  courseSlug
}: {
  lessonId: number
  chapters: GetCourseDetailResType['chapters']
  courseSlug: string
}) {
  const [titleChapter, setTitleChapter] = useState(chapters.length > 0 ? chapters[0].title! : '')
  const { lessonIdQuery, chapterIdQuery, lessonIdPrev, lessonIdNext } = getLessonIdAndChapterId(chapters, lessonId)
  return (
    <div className='grid grid-cols-12'>
      <div className='lg:col-span-9 col-span-12 flex flex-col gap-4 relative lg:mt-0 mt-6'>
        <div className='lg:hidden absolute -top-12 right-4'>
          <RenderSheet
            chapters={chapters}
            courseSlug={courseSlug}
            lessonIdQuery={lessonIdQuery}
            titleChapter={titleChapter}
            chapterIdQuery={chapterIdQuery}
          />
        </div>
        {lessonIdQuery && (
          <RenderLesson
            lessonId={lessonIdQuery}
            chapters={chapters}
            courseSlug={courseSlug}
            lessonIdPrev={lessonIdPrev}
            lessonIdNext={lessonIdNext}
            setTitleChapter={setTitleChapter}
          />
        )}
      </div>
      <div className='hidden lg:block lg:col-span-3 col-span-12'>
        <div className='pl-4 pr-2 flex sticky top-16 flex-col max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900'>
          <MenuLesson
            chapters={chapters}
            lessonId={lessonIdQuery}
            chapterId={chapterIdQuery}
            courseSlug={courseSlug}
            titleChapter={titleChapter}
          />
        </div>
      </div>
    </div>
  )
}

function Course({ lessonId, courseSlug }: { lessonId: number; courseSlug: string }) {
  const { data: courseDetail, isPending } = useGetCourseDetailBySlugQuery({ slug: courseSlug })
  if (isPending) return null
  if (!courseDetail) return <NotFound statusCode={404} message='Không tìm thấy khóa học' />

  return (
    <div className='py-6'>
      <div className='flex flex-col gap-12'>
        <div>
          <h1 className='text-2xl font-bold'>{courseDetail.data.data.title}</h1>
        </div>
        <Lesson lessonId={lessonId} chapters={courseDetail.data.data.chapters} courseSlug={courseSlug} />
      </div>
    </div>
  )
}

function CanAccessCourse({ courseSlug, children }: { courseSlug: string; children: React.ReactNode }) {
  const [status, setStatus] = useState<'pending' | 'access' | 'not-access'>('pending')
  const { mutateAsync } = useCanAccessCourseMutation()

  useEffect(() => {
    const checkAccessCourse = async () => {
      try {
        await mutateAsync({ slug: courseSlug })
        setStatus('access')
      } catch {
        setStatus('not-access')
      }
    }

    checkAccessCourse()
  }, [mutateAsync, courseSlug])

  if (status === 'not-access') return <Forbidden statusCode={403} message='Bạn không có quyền truy cập khóa học này' />
  else if (status === 'pending') return null
  return <Wrapper>{children}</Wrapper>
}

export default function Learn({ params }: Route.ComponentProps) {
  const { courseSlug } = params
  const [searchParams] = useSearchParams()
  const lessonId = Number(searchParams.get('lessonId')) || 0

  return (
    <CanAccessCourse courseSlug={courseSlug}>
      <Course lessonId={lessonId} courseSlug={courseSlug} />
    </CanAccessCourse>
  )
}
