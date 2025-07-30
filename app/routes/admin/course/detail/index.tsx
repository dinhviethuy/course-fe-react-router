import type { Route } from '.react-router/types/app/routes/admin/courses/detail/+types'
import { useSearchParams } from 'react-router'
import CourseDetail from '~/components/course/course-detail'
import DragCourse from '~/components/drag-course/drag-course'
import NotFound from '~/components/error-page/error-page'
import UpdateLesson from '~/components/lesson/update-lesson'
import { CourseType } from '~/constants/course.constant'
import { useCourseDetailForAdminQuery } from '~/hooks/useCourse'
import { getLessonIdAndChapterId } from '~/lib/utils'

export function meta() {
  return [
    {
      title: 'Chi tiết khóa học',
      description: 'Chi tiết khóa học'
    }
  ]
}


export default function CourseDetailPage({ params }: Route.ActionArgs) {
  const getCourseDetailMutation = useCourseDetailForAdminQuery({ courseId: Number(params.courseId) })

  const [searchParams] = useSearchParams()
  const lessonId = Number(searchParams.get('lessonId'))
  const chapterId = Number(searchParams.get('chapterId'))

  if (getCourseDetailMutation.isLoading) {
    return null
  } else if (getCourseDetailMutation.isError || !getCourseDetailMutation.data?.data) {
    return <NotFound statusCode={404} message='Không tìm thấy khóa học' />
  }

  const { data: course } = getCourseDetailMutation.data.data

  const { lessonIdQuery, chapterIdQuery, lessonIdPrev, lessonIdNext } = getLessonIdAndChapterId(course.chapters, lessonId, chapterId)

  return (
    <div>
      <CourseDetail data={course} courseId={Number(params.courseId)} refetch={getCourseDetailMutation.refetch} />
      {course.courseType !== CourseType.COMBO && (
        <div className='grid grid-cols-8 py-4 gap-4'>
          <div className='col-span-8 xl:col-span-3 max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900'>
            <DragCourse course={course} openedLessonId={lessonIdQuery} disabled={true} />
          </div>
          {lessonIdQuery && chapterIdQuery && (
            <div className='flex justify-center col-span-8 xl:col-span-5'>
              <UpdateLesson disabled={true} courseId={course.id} lessonIdQuery={lessonIdQuery} lessonIdPrev={lessonIdPrev} lessonIdNext={lessonIdNext} chapterIdQuery={chapterIdQuery} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
