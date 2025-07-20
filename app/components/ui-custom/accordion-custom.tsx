import { AccordionItem } from '@radix-ui/react-accordion'
import { TvMinimalPlay } from 'lucide-react'
import { Link } from 'react-router'
import { AccordionContent, AccordionTrigger } from '~/components/ui/accordion'
import { cn, formatDuration } from '~/lib/utils'
import type { GetCourseDetailResType } from '~/types/course.type'

interface AccordionCustomProps {
  chapter: GetCourseDetailResType['chapters'][number]
  isLearn?: boolean
  lessonId?: number,
  courseSlug?: string
}

export default function AccordioneCustom({ chapter, isLearn, lessonId, courseSlug }: AccordionCustomProps) {
  const { title, duration, lessons } = chapter
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className='cursor-pointer'>
        <div className='flex gap-2 items-center justify-start hover:underline'>
          <span className='text-sm xl:text-md font-semibold text-left'>{title}</span>
          <span className='text-sm xl:text-md font-semibold text-left'>{formatDuration(duration)}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <ul className='flex flex-col pt-2 gap-y-3'>
          {lessons.map((lesson) => (
            <li key={lesson.id} className='flex gap-2 items-center'>
              {isLearn ? (
                <>
                  <Link
                    to={`/learn/${courseSlug}?lessonId=${lesson.id}`}
                    className={cn('flex gap-2 items-center cursor-pointer hover:text-primary', {
                      underline: lesson.id === lessonId
                    })}
                  >
                    <TvMinimalPlay className='w-4 h-4 flex-shrink-0' />
                    <span
                      className={cn('text-sm', {
                        underline: lesson.id === lessonId
                      })}
                    >
                      {lesson.title}
                    </span>
                    <span className='text-sm ml-auto'>{formatDuration(lesson.duration)}</span>
                  </Link>
                </>
              ) : (
                <>
                  <TvMinimalPlay className='w-4 h-4 flex-shrink-0' />
                  <span className='text-sm'>{lesson.title}</span>
                  <span className='text-sm ml-auto'>{formatDuration(lesson.duration)}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
