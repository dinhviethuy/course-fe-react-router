import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useQueryClient } from '@tanstack/react-query'
import { GripVertical, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Switch } from '~/components/ui/switch'
import { useDeleteLessonMutation, useUpdateLessonMutation } from '~/hooks/useLesson'
import { cn, formatDuration, handleError } from '~/lib/utils'
import type { GetCourseDetailResTypeForAdmin } from '~/types/course.type'
import type { UpdateLessonBodyType } from '~/types/lesson.type'

export default function SortableLesson({
  lesson,
  courseId,
  openedLessonId
}: {
  lesson: GetCourseDetailResTypeForAdmin['chapters'][number]['lessons'][number],
  courseId: number
  openedLessonId?: number
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const updateLessonMutation = useUpdateLessonMutation()
  const deleteLessonMutaion = useDeleteLessonMutation()
  const queryClient = useQueryClient()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `lesson-${lesson.id}`,
    data: {
      type: 'lesson',
      lesson: lesson
    }
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 2000 : 'auto'
  }

  const handleUpdateLesson = async (body: UpdateLessonBodyType) => {
    try {
      await updateLessonMutation.mutateAsync({
        param: {
          lessonId: lesson.id
        },
        body
      })
      queryClient.refetchQueries({ queryKey: ['lesson-detail-admin', { lessonId: lesson.id }] })
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', courseId] })
      toast.success('Cập nhật bài học thành công')
    } catch (error) {
      handleError({ error })
    }
  }

  const handleDeleteLesson = async () => {
    try {
      await deleteLessonMutaion.mutateAsync({
        lessonId: lesson.id
      })
      queryClient.refetchQueries({ queryKey: ['lesson-detail-admin', { lessonId: lesson.id }] })
      queryClient.refetchQueries({ queryKey: ['course-detail-admin', courseId] })
      toast.success('Xóa bài học thành công')
    } catch (error) {
      handleError({ error })
    }
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className='p-2 border flex justify-between gap-2 border-gray-200 dark:border-gray-600 rounded-md bg-background transition-all duration-300'
    >
      <div className='flex items-center gap-2'>
        <span className='cursor-move' {...attributes} {...listeners}>
          <GripVertical size={16} />
        </span>
        <Link to={`?lessonId=${lesson.id}`} preventScrollReset className={cn('hover:underline', {
          'underline': lesson.id === openedLessonId
        })}>
          {lesson.title}
        </Link>
        <span className='text-sm text-muted-foreground'>{formatDuration(lesson.duration!)}</span>
      </div>

      <div className='flex items-center gap-1'>
        <div className='flex items-center gap-2'>
          <span>Nháp</span>
          <Switch className='cursor-pointer' checked={lesson.isDraft} onCheckedChange={() => handleUpdateLesson({
            chapterId: lesson.chapterId,
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            videoUrl: lesson.videoUrl,
            isDraft: !lesson.isDraft,
          })} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <MoreVertical className='h-4 w-4' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Link to={`?lessonId=${lesson.id}`} className='w-full' preventScrollReset>
                Sửa
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-600 cursor-pointer'
              onSelect={(e) => {
                e.preventDefault()
                setOpenDeleteDialog(true)
              }}
            >
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Dialog xóa */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn thực hiện hành động này?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn đang thực hiện xóa chương <span className='font-bold text-accent-foreground'>{lesson.title}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='cursor-pointer'>Thoát</AlertDialogCancel>
            <AlertDialogAction className='cursor-pointer' onClick={handleDeleteLesson}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>

  )
}
