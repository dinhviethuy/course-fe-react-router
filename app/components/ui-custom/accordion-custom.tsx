import { AccordionItem } from '@radix-ui/react-accordion'
import { CheckCircle2, ClipboardList, Lock, TvMinimalPlay } from 'lucide-react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { AccordionContent, AccordionTrigger } from '~/components/ui/accordion'
import { Badge } from '~/components/ui/badge'
import { LessonType } from '~/constants/lesson.constant'
import { cn, formatDuration } from '~/lib/utils'
import type { GetCourseDetailResType } from '~/types/course.type'

interface AccordionCustomProps {
  chapter: GetCourseDetailResType['chapters'][number]
  isLearn?: boolean
  lessonId?: number
  courseSlug?: string
  lockedLessonIds?: Set<number>
}

export default function AccordionCustom({ chapter, isLearn, lessonId, courseSlug, lockedLessonIds }: AccordionCustomProps) {
  const { title, duration, lessons } = chapter
  const allCompleted = isLearn && lessons.length > 0 && lessons.every((l) => l.isCompleted)

  return (
    <AccordionItem value={title}>
      <AccordionTrigger className='cursor-pointer'>
        <div className='flex gap-2 items-center justify-start hover:underline'>
          <span className='text-sm xl:text-md font-semibold text-left'>{title}</span>
          <span className='text-sm font-normal text-muted-foreground'>{formatDuration(duration)}</span>
          {allCompleted && <CheckCircle2 className='w-4 h-4 text-green-500 shrink-0' />}
        </div>
      </AccordionTrigger>
      <AccordionContent className='flex flex-col gap-4 text-balance'>
        <ul className='flex flex-col pt-2 gap-y-3'>
          {lessons.map((lesson) => {
            const isLocked = isLearn && (lockedLessonIds?.has(lesson.id) ?? false)
            const isCurrent = lesson.id === lessonId
            const isQuiz = lesson.type === LessonType.QUIZ
            const isCompleted = isLearn && lesson.isCompleted

            const icon = isCompleted ? (
              <CheckCircle2 className='w-4 h-4 shrink-0 text-green-500' />
            ) : isLocked ? (
              <Lock className='w-4 h-4 shrink-0 text-muted-foreground' />
            ) : isQuiz ? (
              <ClipboardList className='w-4 h-4 shrink-0' />
            ) : (
              <TvMinimalPlay className='w-4 h-4 shrink-0' />
            )

            const innerContent = (
              <div
                className={cn('flex gap-2 items-center w-full', {
                  'opacity-50': isLearn && !isCompleted && !isCurrent,
                  'opacity-40': isLocked
                })}
              >
                {icon}
                <span
                  className={cn('text-sm flex-1 text-left', {
                    'font-semibold text-primary': isCurrent
                  })}
                >
                  {lesson.title}
                </span>
                {isLearn && isQuiz && (
                  <Badge variant='secondary' className='text-xs px-1.5 h-5 shrink-0'>
                    QUIZ
                  </Badge>
                )}
                <span className='text-xs text-muted-foreground shrink-0'>{formatDuration(lesson.duration)}</span>
              </div>
            )

            return (
              <li key={lesson.id}>
                {isLearn ? (
                  isLocked ? (
                    <button
                      type='button'
                      className='flex w-full items-center cursor-not-allowed'
                      onClick={() => toast.warning('Vui lòng hoàn thành bài học trước')}
                    >
                      {innerContent}
                    </button>
                  ) : (
                    <Link
                      to={`/learn/${courseSlug}?lessonId=${lesson.id}`}
                      className='flex w-full items-center hover:text-primary'
                    >
                      {innerContent}
                    </Link>
                  )
                ) : (
                  <div className='flex gap-2 items-center'>
                    <TvMinimalPlay className='w-4 h-4 shrink-0' />
                    <span className='text-sm'>{lesson.title}</span>
                    <span className='text-sm ml-auto'>{formatDuration(lesson.duration)}</span>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
