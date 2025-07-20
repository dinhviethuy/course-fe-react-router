import { ChevronDown, ChevronUp, TvMinimalPlay } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { cn, formatDuration } from '~/lib/utils'
import type { GetCourseDetailResType } from '~/types/course.type'

interface CollapsibleCustomProps {
  isOpenInit?: boolean
  chapter: GetCourseDetailResType['chapters'][number]
  isLearn?: boolean
  lessonId?: number,
  courseSlug: string
}

export default function CollapsibleCustom({ isOpenInit, chapter, isLearn, lessonId, courseSlug }: CollapsibleCustomProps) {
  const [isOpen, setIsOpen] = useState(isOpenInit || false)
  const { title, duration, lessons } = chapter
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='border-b-[1px] border-gray-200 dark:border-gray-700 py-4'
    >
      <CollapsibleTrigger className='w-full cursor-pointer flex justify-between'>
        <div className='flex gap-2 items-center justify-start hover:underline'>
          <span className='text-sm xl:text-base font-semibold text-left'>{title}</span>
          <span className='text-[12px] xl:text-base font-semibold text-left'>{formatDuration(duration)}</span>
        </div>
        <div className='flex gap-2 items-center'>
          {isOpen ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className='mt-3 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
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
      </CollapsibleContent>
    </Collapsible>
  )
}
