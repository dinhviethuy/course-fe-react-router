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
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import * as React from "react";
import { useRef, useState } from "react";
import CreateChapter from "~/components/create-chapter/create-chapter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import type { GetCourseDetailResTypeForAdmin } from "~/types/course.type";
// Đảm bảo đường dẫn này đúng với project của bạn


function getOrder(chapters: GetCourseDetailResTypeForAdmin['chapters']) {
  const body = chapters.map((chapter, index) => {
    const lesson = chapter.lessons.map((lesson, index) => {
      return {
        id: lesson.id,
        order: index
      }
    })
    return {
      id: chapter.id,
      order: index,
      lessons: lesson
    }
  })
  return {
    chapters: body
  }
}

// --- Component SortableLesson ---
function SortableLesson({ lesson }: { lesson: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `lesson-${lesson.id}`,
    data: { // Lưu trữ thêm data để dễ dàng truy cập trong DragOverlay hoặc DragOver
      type: 'lesson',
      lesson: lesson,
    }
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 2000 : 'auto', // Đảm bảo lesson đang kéo nằm trên cùng
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="p-2 border border-gray-200 dark:border-gray-600 rounded-md bg-background transition-all duration-300"
    >
      <div className="flex gap-2 items-center">
        <span className="cursor-move" {...attributes} {...listeners}>
          <GripVertical size={16} />
        </span>
        <span>{lesson.title}</span>
      </div>
    </li>
  );
}

// --- Component SortableChapter ---
function SortableChapter({ chapter, children, isExpanded, isAnyChapterDragging }: {
  chapter: any;
  children: React.ReactNode;
  isExpanded: boolean;
  isAnyChapterDragging: boolean; // Prop mới để biết có chapter nào đang kéo không
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `chapter-${chapter.id}`,
    data: { // Lưu trữ thêm data
      type: 'chapter',
      chapter: chapter,
    }
  });

  const chapterStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto', // Đảm bảo chapter đang kéo nằm trên cùng
  };

  // Điều kiện để áp dụng class ẩn nội dung:
  // 1. Chapter này đang được kéo (isDragging) HOẶC
  // 2. Bất kỳ chapter nào đang được kéo (isAnyChapterDragging) VÀ chapter này đang mở (isExpanded)
  const shouldCollapseContent = isDragging || (isAnyChapterDragging && isExpanded);

  return (
    <AccordionItem
      value={`chapter-${chapter.id}`}
      key={chapter.id}
      ref={setNodeRef}
      style={chapterStyle}
      className="bg-background border rounded-md px-4 py-1 transition-all duration-300"
    >
      <AccordionTrigger className="py-2 text-[15px] leading-6 flex items-center gap-2">
        <div className="flex gap-2 items-center">
          <span className="cursor-move" {...attributes} {...listeners}>
            <GripVertical size={16} />
          </span>
          <span>{chapter.title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent
        className={`pt-2 ${shouldCollapseContent ? "dnd-kit-chapter-content-collapsed" : ""}`}
      >
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

// --- Main Component DragCourse ---
export default function DragCourse({ course }: { course: GetCourseDetailResTypeForAdmin }) {
  const [chapters, setChapters] = useState<GetCourseDetailResTypeForAdmin['chapters']>(course.chapters);
  const [activeItem, setActiveItem] = useState<any>(null); // Lưu trữ item đang kéo
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]); // Các chapter đang mở
  const [isClient, setIsClient] = useState(false)

  React.useEffect(() => {
    setIsClient(true);
  }, [])
  // Ref để lưu trạng thái expandedChapters trước khi kéo chapter (để khôi phục)
  const prevExpandedChaptersRef = useRef<string[]>([]);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  // Xác định xem có phải một chapter đang được kéo không
  const isDraggingChapter = activeItem?.id.toString().startsWith("chapter-");

  // --- Drag Event Handlers ---
  function handleDragStart(event: DragStartEvent) {
    setActiveItem(event.active);

    // Nếu đang kéo một chapter, tạm thời đóng tất cả các chapter khác
    if (event.active.id.toString().startsWith("chapter-")) {
      prevExpandedChaptersRef.current = expandedChapters; // Lưu trạng thái hiện tại
      setExpandedChapters([]); // Đóng tất cả các chapter
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    // Chỉ xử lý logic kéo/thả lesson ở đây
    if (!active.id.toString().startsWith("lesson-")) return;

    const activeLessonId = Number(active.id.toString().replace("lesson-", ""));
    const overIdString = over.id.toString();

    setChapters((prevChapters) => {
      // Deep copy chapters để đảm bảo immutability
      const newChapters = prevChapters.map((chapter) => ({
        ...chapter,
        lessons: [...chapter.lessons],
      }));

      let activeLesson: any = null;
      let activeLessonChapterIndex = -1;
      let activeLessonIndex = -1;

      // 1. Tìm và TẠM THỜI gán activeLesson, tìm vị trí nguồn của nó
      for (let i = 0; i < newChapters.length; i++) {
        const lessonIdx = newChapters[i].lessons.findIndex((l) => l.id === activeLessonId);
        if (lessonIdx !== -1) {
          activeLesson = { ...newChapters[i].lessons[lessonIdx] }; // Sao chép lesson để tránh reference
          activeLessonChapterIndex = i;
          activeLessonIndex = lessonIdx;
          break;
        }
      }

      if (!activeLesson) return prevChapters; // Nếu không tìm thấy lesson đang kéo, không làm gì

      let overChapterIndex = -1;
      let overLessonIndex = -1; // Vị trí chèn cuối cùng

      // 2. Xác định vị trí đích (overChapterIndex, overLessonIndex)
      if (overIdString.startsWith("lesson-")) {
        const overLessonId = Number(overIdString.replace("lesson-", ""));
        for (let i = 0; i < newChapters.length; i++) {
          const lessonIdx = newChapters[i].lessons.findIndex((l) => l.id === overLessonId);
          if (lessonIdx !== -1) {
            overChapterIndex = i;
            overLessonIndex = lessonIdx;
            break;
          }
        }
      } else if (overIdString.startsWith("chapter-")) {
        // Kéo vào một chapter (không vào lesson cụ thể)
        const overChapterId = Number(overIdString.replace("chapter-", ""));
        overChapterIndex = newChapters.findIndex((c) => c.id === overChapterId);
        if (overChapterIndex !== -1) {
          // Chèn vào cuối danh sách lessons của chapter đó
          overLessonIndex = newChapters[overChapterIndex].lessons.length;
        }
      }

      // Trường hợp kéo ra ngoài các vùng droppable hợp lệ
      // Hoặc nếu không tìm thấy 'over' hợp lệ, đưa lesson về chapter nguồn của nó
      if (overChapterIndex === -1) {
        overChapterIndex = activeLessonChapterIndex;
        // Chèn vào cuối chapter nguồn
        overLessonIndex = newChapters[activeLessonChapterIndex].lessons.length;
      }

      // 3. Thực hiện di chuyển lesson
      // Nếu di chuyển trong cùng một chapter
      if (activeLessonChapterIndex === overChapterIndex) {
        // Chỉ sắp xếp lại mảng lessons trong chapter đó
        newChapters[activeLessonChapterIndex].lessons = arrayMove(
          newChapters[activeLessonChapterIndex].lessons,
          activeLessonIndex,
          overLessonIndex
        );
      }
      // Nếu di chuyển sang chapter khác
      else {
        // Xóa lesson khỏi chapter nguồn
        newChapters[activeLessonChapterIndex].lessons.splice(activeLessonIndex, 1);

        // Chèn lesson vào chapter đích
        // Đảm bảo chapter đích có mảng lessons
        if (!newChapters[overChapterIndex].lessons) {
          newChapters[overChapterIndex].lessons = [];
        }
        newChapters[overChapterIndex].lessons.splice(overLessonIndex, 0, activeLesson);
      }

      return newChapters;
    });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveItem(null); // Reset active item

    const activeId = active.id.toString();
    const isChapter = activeId.startsWith("chapter-");
    const isLesson = activeId.startsWith("lesson-");

    // Khôi phục trạng thái expandedChapters nếu là chapter đang kéo,
    // ngay cả khi không có sự thay đổi vị trí hoặc kéo không thành công.
    if (isChapter) {
      setExpandedChapters(prevExpandedChaptersRef.current);
    }

    // Nếu không có 'over' hoặc kéo thả vào chính nó, không làm gì thêm
    if (!over || over.id === active.id) {
      return;
    }

    const overId = over.id.toString();

    // Logic xử lý khi kết thúc kéo chapter
    if (isChapter) {
      const oldIndex = chapters.findIndex((chapter) => `chapter-${chapter.id}` === activeId);
      const newIndex = chapters.findIndex((chapter) => `chapter-${chapter.id}` === overId);

      if (oldIndex === -1 || newIndex === -1) return; // Không tìm thấy chapter

      const newChapters = arrayMove(chapters, oldIndex, newIndex);
      console.log(getOrder(newChapters))
      setChapters(newChapters);
    }
    else if (isLesson) {
      const lessonId = Number(activeId.replace("lesson-", ""))
      let fromChapterIndex = -1
      let fromLessonIndex = -1
      chapters.forEach((chapter, cIndex) => {
        const lIndex = chapter.lessons.findIndex(l => l.id === lessonId)
        if (lIndex !== -1) {
          fromChapterIndex = cIndex
          fromLessonIndex = lIndex
        }
      })
      if (fromChapterIndex === -1) return

      let toChapterIndex = -1
      let toLessonIndex = -1

      if (overId.startsWith("lesson-")) {
        const overLessonId = Number(overId.replace("lesson-", ""))
        chapters.forEach((chapter, cIndex) => {
          const lIndex = chapter.lessons.findIndex(l => l.id === overLessonId)
          if (lIndex !== -1) {
            toChapterIndex = cIndex
            toLessonIndex = lIndex
          }
        })
      } else if (overId.startsWith("chapter-")) {
        toChapterIndex = chapters.findIndex(c => `chapter-${c.id}` === overId)
        toLessonIndex = chapters[toChapterIndex]?.lessons?.length || 0
      }

      if (toChapterIndex === -1 || toLessonIndex === -1) return
      const updated = [...chapters]
      const [movedLesson] = updated[fromChapterIndex].lessons.splice(fromLessonIndex, 1)
      updated[toChapterIndex].lessons.splice(toLessonIndex, 0, movedLesson)
      console.log(getOrder(updated))
      setChapters(updated)
    }
  }

  if (!isClient) return null

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-end">
          <CreateChapter />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <DndContext
              onDragStart={handleDragStart}
              collisionDetection={closestCorners}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
              sensors={sensors}
            >
              <Accordion
                type="multiple"
                className="w-full space-y-2"
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
                    >
                      <SortableContext
                        items={chapter.lessons.map((lesson: any) => `lesson-${lesson.id}`)}
                        strategy={verticalListSortingStrategy}
                      >
                        <ul className="space-y-2 min-h-[40px] bg-background p-2 rounded-md">
                          {/* min-h giúp chương trống vẫn có vùng để thả vào */}
                          {chapter.lessons.map((lesson: any) => (
                            <SortableLesson key={lesson.id} lesson={lesson} />
                          ))}
                        </ul>
                      </SortableContext>
                    </SortableChapter>
                  ))}
                </SortableContext>
              </Accordion>

              <DragOverlay wrapperElement="ul">
                {activeItem?.id?.startsWith("lesson-") && activeItem.data.current?.lesson && (
                  <div className="p-2 border border-gray-400 dark:border-gray-800 rounded-md bg-background shadow-md">
                    {activeItem.data.current.lesson.title}
                  </div>
                )}
                {activeItem?.id?.startsWith("chapter-") && activeItem.data.current?.chapter && (
                  <div className="p-2 border border-gray-500 dark:border-gray-800  rounded-md bg-background shadow-md">
                    {activeItem.data.current.chapter.title}
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}