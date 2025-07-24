import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import EditChapter from '~/components/drag-course/edit-chapter'
import { AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Switch } from '~/components/ui/switch'
import { formatDuration } from '~/lib/utils'
import { type UpdateChatperBodyType } from '~/types/chapter.type'
import type { GetCourseDetailResTypeForAdmin } from '~/types/course.type'

export default function SortableChapter({
  chapter,
  children,
  isExpanded,
  isAnyChapterDragging,
  handleUpdateChapter,
  handleDeleteChapter,
  isPending
}: {
  chapter: GetCourseDetailResTypeForAdmin['chapters'][number]
  children: React.ReactNode
  isExpanded: boolean
  isAnyChapterDragging: boolean
  handleUpdateChapter: (body: Omit<UpdateChatperBodyType, 'courseId'>, chapterId: number) => void
  handleDeleteChapter: (chapterId: number) => void
  isPending: boolean
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `chapter-${chapter.id}`,
    data: {
      type: 'chapter',
      chapter: chapter
    }
  })

  const chapterStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto'
  }

  const shouldCollapseContent = isDragging || (isAnyChapterDragging && isExpanded)

  return (
    <>
      <AccordionItem
        value={`chapter-${chapter.id}`}
        key={chapter.id}
        ref={setNodeRef}
        style={chapterStyle}
        className='bg-background border rounded-md px-4 py-1 transition-all duration-300'
      >
        <div className='flex justify-between items-center gap-2 md:gap-4'>
          <AccordionTrigger className='py-2 text-[15px] leading-6 flex items-center gap-2 justify-between'>
            <div className='flex gap-2 items-center'>
              <span className='cursor-move' {...attributes} {...listeners}>
                <GripVertical size={16} />
              </span>
              <span>{chapter.title}</span>
              <span className='text-sm text-muted-foreground sm:inline hidden'>{formatDuration(chapter.duration)}</span>
            </div>
          </AccordionTrigger>
          <div className='flex gap-1'>
            <div className='hidden sm:flex items-center gap-2'>
              <span>Nháp</span>
              <Switch
                className='cursor-pointer'
                checked={chapter.isDraft}
                onCheckedChange={() =>
                  handleUpdateChapter(
                    {
                      description: chapter.description,
                      isDraft: !chapter.isDraft,
                      title: chapter.title
                    },
                    chapter.id
                  )
                }
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <MoreVertical className='h-4 w-4' />
                  <span className='sr-only'>Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <EditChapter chapter={chapter} isPending={isPending} handleUpdateChapter={handleUpdateChapter}>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Sửa</DropdownMenuItem>
                </EditChapter>

                <DropdownMenuItem
                  className='text-red-600'
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
        </div>
        <AccordionContent className={`pt-2 ${shouldCollapseContent ? 'dnd-kit-chapter-content-collapsed' : ''}`}>
          {children}
        </AccordionContent>
      </AccordionItem>
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn thực hiện hành động này?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn đang thực hiện xóa chương <span className='font-bold text-accent-foreground'>{chapter.title}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Thoát</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteChapter(chapter.id)}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
