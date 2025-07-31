import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent
} from '@dnd-kit/core'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { UseFormSetError } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import CreateChapter from '~/components/chapter/create-chapter'
import SortableChapter from '~/components/drag-course/sortable-chapter'
import SortableLesson from '~/components/drag-course/sortable-lesson'
import AdminGuard from '~/components/guard/admin-guard'
import { Accordion } from '~/components/ui/accordion'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { CourseType } from '~/constants/course.constant'
import { ADMIN_PERMISSIONS } from '~/constants/permission.constant'
import { useDeleteChapterMutation, useUpdateChapterMutation } from '~/hooks/useChapter'
import { useReorderChaptersAndLessonsMutation } from '~/hooks/useCourse'
import { getOrder, handleError } from '~/lib/utils'
import { type UpdateChatperBodyType } from '~/types/chapter.type'
import type { GetCourseDetailResTypeForAdmin, ReorderChaptersAndLessonsBodyType } from '~/types/course.type'

export default function DragCourse({ course, openedLessonId, openedChapterId, disabled }: { course: GetCourseDetailResTypeForAdmin, openedLessonId?: number, openedChapterId?: number, disabled?: boolean }) {
  const [chapters, setChapters] = useState<GetCourseDetailResTypeForAdmin['chapters']>(course.chapters)
  const [activeItem, setActiveItem] = useState<any>(null)
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)
  const reorderChaptersAndLessonsMutation = useReorderChaptersAndLessonsMutation()
  const updateChapterMutation = useUpdateChapterMutation()
  const deleteChapterMutation = useDeleteChapterMutation()
  const queryClient = useQueryClient()

  useEffect(() => {
    setChapters(course.chapters)
  }, [course.chapters])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const prevExpandedChaptersRef = useRef<string[]>([])
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))
  const isDraggingChapter = activeItem?.id.toString().startsWith('chapter-')

  function handleDragStart(event: DragStartEvent) {
    setActiveItem(event.active)

    if (event.active.id.toString().startsWith('chapter-')) {
      prevExpandedChaptersRef.current = expandedChapters
      setExpandedChapters([])
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!active || !over || active.id === over.id) return
    if (!active.id.toString().startsWith('lesson-')) return

    const activeLessonId = Number(active.id.toString().replace('lesson-', ''))
    const overIdString = over.id.toString()

    setChapters((prevChapters) => {
      const newChapters = prevChapters.map((chapter) => ({
        ...chapter,
        lessons: [...chapter.lessons]
      }))

      let activeLesson: any = null
      let activeLessonChapterIndex = -1
      let activeLessonIndex = -1

      for (let i = 0; i < newChapters.length; i++) {
        const lessonIdx = newChapters[i].lessons.findIndex((l) => l.id === activeLessonId)
        if (lessonIdx !== -1) {
          activeLesson = { ...newChapters[i].lessons[lessonIdx] }
          activeLessonChapterIndex = i
          activeLessonIndex = lessonIdx
          break
        }
      }

      if (!activeLesson) return prevChapters

      let overChapterIndex = -1
      let overLessonIndex = -1

      if (overIdString.startsWith('lesson-')) {
        const overLessonId = Number(overIdString.replace('lesson-', ''))
        for (let i = 0; i < newChapters.length; i++) {
          const lessonIdx = newChapters[i].lessons.findIndex((l) => l.id === overLessonId)
          if (lessonIdx !== -1) {
            overChapterIndex = i
            overLessonIndex = lessonIdx
            break
          }
        }
      } else if (overIdString.startsWith('chapter-')) {
        const overChapterId = Number(overIdString.replace('chapter-', ''))
        overChapterIndex = newChapters.findIndex((c) => c.id === overChapterId)
        if (overChapterIndex !== -1) {
          overLessonIndex = newChapters[overChapterIndex].lessons.length
        }
      }
      if (overChapterIndex === -1) {
        overChapterIndex = activeLessonChapterIndex
        overLessonIndex = newChapters[activeLessonChapterIndex].lessons.length
      }

      if (activeLessonChapterIndex === overChapterIndex) {
        newChapters[activeLessonChapterIndex].lessons = arrayMove(
          newChapters[activeLessonChapterIndex].lessons,
          activeLessonIndex,
          overLessonIndex
        )
      } else {
        newChapters[activeLessonChapterIndex].lessons.splice(activeLessonIndex, 1)
        if (!newChapters[overChapterIndex].lessons) {
          newChapters[overChapterIndex].lessons = []
        }
        newChapters[overChapterIndex].lessons.splice(overLessonIndex, 0, activeLesson)
      }
      return newChapters
    })
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveItem(null)

    const activeId = active.id.toString()
    const isChapter = activeId.startsWith('chapter-')
    const isLesson = activeId.startsWith('lesson-')
    if (isChapter) {
      setExpandedChapters(prevExpandedChaptersRef.current)
    }

    if (!over) {
      return
    }

    const overId = over.id.toString()
    let bodyUpdate: ReorderChaptersAndLessonsBodyType | undefined
    if (isChapter) {
      const oldIndex = chapters.findIndex((chapter) => `chapter-${chapter.id}` === activeId)
      const newIndex = chapters.findIndex((chapter) => `chapter-${chapter.id}` === overId)

      if (oldIndex === -1 || newIndex === -1) return

      const newChapters = arrayMove(chapters, oldIndex, newIndex)
      setChapters(newChapters)
      bodyUpdate = getOrder(newChapters)
    } else if (isLesson) {
      const lessonId = Number(activeId.replace('lesson-', ''))
      let fromChapterIndex = -1
      let fromLessonIndex = -1
      chapters.forEach((chapter, cIndex) => {
        const lIndex = chapter.lessons.findIndex((l) => l.id === lessonId)
        if (lIndex !== -1) {
          fromChapterIndex = cIndex
          fromLessonIndex = lIndex
        }
      })
      if (fromChapterIndex === -1) return

      let toChapterIndex = -1
      let toLessonIndex = -1

      if (overId.startsWith('lesson-')) {
        const overLessonId = Number(overId.replace('lesson-', ''))
        chapters.forEach((chapter, cIndex) => {
          const lIndex = chapter.lessons.findIndex((l) => l.id === overLessonId)
          if (lIndex !== -1) {
            toChapterIndex = cIndex
            toLessonIndex = lIndex
          }
        })
      } else if (overId.startsWith('chapter-')) {
        toChapterIndex = chapters.findIndex((c) => `chapter-${c.id}` === overId)
        toLessonIndex = chapters[toChapterIndex]?.lessons?.length || 0
      }
      if (toChapterIndex === -1 || toLessonIndex === -1) return
      const updated = [...chapters]
      const [movedLesson] = updated[fromChapterIndex].lessons.splice(fromLessonIndex, 1)
      updated[toChapterIndex].lessons.splice(toLessonIndex, 0, movedLesson)
      setChapters(updated)
      bodyUpdate = getOrder(updated)
    }
    if (bodyUpdate) {
      try {
        await reorderChaptersAndLessonsMutation.mutateAsync({
          body: bodyUpdate,
          params: { courseId: course.id }
        })

        chapters.forEach((chapter) => {
          chapter.lessons.forEach((lesson) => {
            queryClient.refetchQueries({ queryKey: ['lesson-detail-admin', { lessonId: lesson.id }] })
          })
        })
        queryClient.refetchQueries({ queryKey: ['course-detail-admin', course.id] })
        toast.success('Cập nhật thứ tự chương và bài học thành công')
      } catch (error) {
        handleError({ error })
      }
    }
  }

  const handleUpdateChapter = async (body: Omit<UpdateChatperBodyType, 'courseId'>, chapterId: number, setError?: UseFormSetError<any>) => {
    try {
      await updateChapterMutation.mutateAsync({
        body: {
          ...body,
          courseId: course.id
        },
        param: {
          chapterId
        }
      })
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', course.id] })
      toast.success(`Cập nhật chương thành công`)
    } catch (error) {
      handleError({ error, setError })
      setChapters(course.chapters)
    }
  }

  const handleDeleteChapter = async (chapterId: number) => {
    try {
      await deleteChapterMutation.mutateAsync({
        chapterId
      })
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', course.id] })
      toast.success('Xóa chương thành công')
    } catch (error) {
      handleError({ error })
      setChapters(course.chapters)
    }
  }

  useEffect(() => {
    if (openedLessonId && !openedChapterId) {
      const chapterWithLesson = course.chapters.find((chapter) =>
        chapter.lessons.some((lesson) => lesson.id === openedLessonId)
      )

      if (chapterWithLesson) {
        setExpandedChapters((prev) => [...prev, `chapter-${chapterWithLesson.id}`])
      }
    } else if (openedChapterId) {
      setExpandedChapters((prev) => [...prev, `chapter-${openedChapterId}`])
    }
  }, [openedLessonId, openedChapterId, course.chapters])

  if (!isClient) return null

  return (
    <div>
      <Card>
        <CardHeader className='flex justify-end'>
          <AdminGuard path={ADMIN_PERMISSIONS.CHAPTERS.POST_CHAPTERS.path} method={ADMIN_PERMISSIONS.CHAPTERS.POST_CHAPTERS.method}>
            {!disabled && <CreateChapter courseId={course.id} />}
          </AdminGuard>
        </CardHeader>
        <CardContent>
          {course.courseType !== CourseType.COMBO && course.chapters.length > 0 && (
            <div className='space-y-4'>
              <DndContext
                onDragStart={handleDragStart}
                collisionDetection={closestCorners}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
                sensors={sensors}
              >
                <Accordion
                  type='multiple'
                  className='w-full space-y-2'
                  value={expandedChapters}
                  onValueChange={setExpandedChapters}
                >
                  <SortableContext
                    items={chapters.map((ch) => `chapter-${ch.id}`)}
                    strategy={verticalListSortingStrategy}
                  >
                    {chapters.map((chapter) => (
                      <SortableChapter
                        key={chapter.id}
                        chapter={chapter}
                        isExpanded={expandedChapters.includes(`chapter-${chapter.id}`)}
                        isAnyChapterDragging={isDraggingChapter}
                        handleUpdateChapter={handleUpdateChapter}
                        handleDeleteChapter={handleDeleteChapter}
                        isPending={updateChapterMutation.isPending}
                        disabled={disabled}
                      >
                        <SortableContext
                          items={chapter.lessons.map((lesson: any) => `lesson-${lesson.id}`)}
                          strategy={verticalListSortingStrategy}
                        >
                          <ul className='space-y-2 min-h-[40px] bg-background p-2 rounded-md'>
                            {chapter.lessons.map((lesson: any) => (
                              <SortableLesson key={lesson.id} lesson={lesson} courseId={course.id} openedLessonId={openedChapterId ? undefined : openedLessonId} disabled={disabled} />
                            ))}
                            <AdminGuard path={ADMIN_PERMISSIONS.MANAGE_LESSONS.POST_MANAGE_LESSONS.path} method={ADMIN_PERMISSIONS.MANAGE_LESSONS.POST_MANAGE_LESSONS.method}>
                              {!disabled &&
                                <li>
                                  <Link to={`?chapterId=${chapter.id}`} className='p-2 border flex items-center hover:underline gap-2 border-gray-200 dark:border-gray-600 rounded-md bg-background transition-all duration-300' preventScrollReset>
                                    <Plus />
                                    <span>Thêm bài học</span>
                                  </Link>
                                </li>
                              }
                            </AdminGuard>
                          </ul>
                        </SortableContext>
                      </SortableChapter>
                    ))}
                  </SortableContext>
                </Accordion>
                <DragOverlay wrapperElement='ul'>
                  {activeItem?.id?.startsWith('lesson-') && activeItem.data.current?.lesson && (
                    <div className='p-2 border border-gray-400 dark:border-gray-800 rounded-md bg-background shadow-md'>
                      {activeItem.data.current.lesson.title}
                    </div>
                  )}
                  {activeItem?.id?.startsWith('chapter-') && activeItem.data.current?.chapter && (
                    <div className='p-2 border border-gray-500 dark:border-gray-800  rounded-md bg-background shadow-md'>
                      {activeItem.data.current.chapter.title}
                    </div>
                  )}
                </DragOverlay>
              </DndContext>
            </div>
          )}
          {course.courseType !== CourseType.COMBO && chapters.length === 0 && (
            <div className='text-center'>
              <span>Không có chương nào</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
