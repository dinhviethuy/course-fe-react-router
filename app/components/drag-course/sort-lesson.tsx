import {
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import type { GetCourseDetailResTypeForAdmin } from "~/types/course.type";


export default function SortableLesson({ lesson }: { lesson: GetCourseDetailResTypeForAdmin['chapters'][number]['lessons'][number] }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `lesson-${lesson.id}`,
    data: {
      type: 'lesson',
      lesson: lesson,
    }
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 2000 : 'auto',
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="p-2 border flex justify-between gap-2 border-gray-200 dark:border-gray-600 rounded-md bg-background transition-all duration-300"
    >
      <div className="flex gap-2 items-center">
        <span className="cursor-move" {...attributes} {...listeners}>
          <GripVertical size={16} />
        </span>
        <span>{lesson.title}</span>
      </div>
      <div className="flex gap-1">
        <div className="flex items-center gap-2">
          <span>Nháp</span>
          <Switch className="cursor-pointer" checked={lesson.isDraft} />
        </div>
        <div>
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='ghost' className='cursor-pointer p-0 h-10 w-10'>
                <Trash className='w-6 h-6' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn thực hiện hành động này?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn đang thực hiện xóa chương <span className="font-bold text-accent-foreground">{lesson.title}</span>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='cursor-pointer h-10 w-auto'>Thoát</AlertDialogCancel>
                <AlertDialogAction className='cursor-pointer h-10 w-auto' >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </li>
  );
}