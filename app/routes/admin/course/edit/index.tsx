import type { Route } from '.react-router/types/app/routes/admin/course/edit/+types'
import { useSearchParams } from 'react-router'
import UpdateCourse from '~/components/course/update-course'
import DragCourse from '~/components/drag-course/drag-course'
import NotFound from '~/components/error-page/error-page'
import AdminGuard from '~/components/guard/admin-guard'
import CreateLesson from '~/components/lesson/create-lesson'
import UpdateLesson from '~/components/lesson/update-lesson'
import { CourseType } from '~/constants/course.constant'
import { ADMIN_PERMISSIONS } from '~/constants/permission.constant'
import { useCourseDetailForAdminQuery } from '~/hooks/useCourse'
import { CheckAccess, getLessonIdAndChapterId } from '~/lib/utils'
import { useAuthStore } from '~/stores/useAuthStore'

export function meta() {
  return [
    {
      title: 'Sửa khóa học',
      description: 'Sửa khóa học'
    }
  ]
}


function UpdateCourseComponent({ params }: {
  params: {
    courseId: string
  }
}) {
  const getCourseDetailMutation = useCourseDetailForAdminQuery({ courseId: Number(params.courseId) })
  const { permissions } = useAuthStore()
  const [searchParams] = useSearchParams()
  const lessonId = Number(searchParams.get('lessonId'))
  const chapterId = Number(searchParams.get('chapterId'))

  const isUpdateLesson = CheckAccess({
    method: ADMIN_PERMISSIONS.MANAGE_LESSONS.PUT_MANAGE_LESSONS_LESSONID.method,
    path: ADMIN_PERMISSIONS.MANAGE_LESSONS.PUT_MANAGE_LESSONS_LESSONID.path,
    permissions
  })

  if (getCourseDetailMutation.isLoading) {
    return null
  } else if (getCourseDetailMutation.isError || !getCourseDetailMutation.data?.data) {
    return <NotFound statusCode={404} message='Không tìm thấy khóa học' />
  }

  const { data: course } = getCourseDetailMutation.data.data

  const { lessonIdQuery, chapterIdQuery, lessonIdPrev, lessonIdNext, chapterIdCreateLesson } = getLessonIdAndChapterId(course.chapters, lessonId, chapterId)

  return (
    <div>
      <UpdateCourse data={course} courseId={Number(params.courseId)} refetch={getCourseDetailMutation.refetch} />
      {course.courseType !== CourseType.COMBO && (
        <div className='grid grid-cols-8 py-4 gap-4'>
          <div className='col-span-8 xl:col-span-3 max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-900'>
            <DragCourse course={course} openedLessonId={lessonIdQuery} openedChapterId={chapterIdCreateLesson} />
          </div>
          <AdminGuard path={ADMIN_PERMISSIONS.MANAGE_LESSONS.GET_MANAGE_LESSONS_LESSONID.path} method={ADMIN_PERMISSIONS.MANAGE_LESSONS.GET_MANAGE_LESSONS_LESSONID.method}>
            {lessonIdQuery && chapterIdQuery && !chapterIdCreateLesson && (
              <div className='flex justify-center col-span-8 xl:col-span-5'>
                <UpdateLesson courseId={course.id} lessonIdQuery={lessonIdQuery} lessonIdPrev={lessonIdPrev} lessonIdNext={lessonIdNext} chapterIdQuery={chapterIdQuery} disabled={!isUpdateLesson} />
              </div>
            )}
          </AdminGuard>
          <AdminGuard path={ADMIN_PERMISSIONS.MANAGE_LESSONS.POST_MANAGE_LESSONS.path} method={ADMIN_PERMISSIONS.MANAGE_LESSONS.POST_MANAGE_LESSONS.method}>
            {chapterIdCreateLesson && (
              <div className='flex justify-center col-span-8 xl:col-span-5'>
                <CreateLesson courseId={course.id} chapterIdQuery={chapterIdCreateLesson} />
              </div>
            )}
          </AdminGuard>
        </div>
      )}
    </div>
  )
}

export default function UpdateCoursePage({ params }: Route.ActionArgs) {
  return (
    <AdminGuard path={ADMIN_PERMISSIONS.MANAGE_COURSES.GET_MANAGE_COURSES_COURSEID.path} method={ADMIN_PERMISSIONS.MANAGE_COURSES.GET_MANAGE_COURSES_COURSEID.method} isPage>
      <AdminGuard path={ADMIN_PERMISSIONS.MANAGE_COURSES.PUT_MANAGE_COURSES_COURSEID.path} method={ADMIN_PERMISSIONS.MANAGE_COURSES.PUT_MANAGE_COURSES_COURSEID.method} isPage>
        <UpdateCourseComponent params={params} />
      </AdminGuard>
    </AdminGuard>
  )
} 