import CreateCourse from '~/components/course/create-course'
import AdminGuard from '~/components/guard/admin-guard'
import { ADMIN_PERMISSIONS } from '~/constants/permission.constant'

export function meta() {
  return [
    {
      title: 'Tạo khóa học mới',
      description: 'Tạo khóa học mới'
    }
  ]
}


export default function NewCourse() {
  return (
    <AdminGuard path={ADMIN_PERMISSIONS.MANAGE_COURSES.POST_MANAGE_COURSES.path} method={ADMIN_PERMISSIONS.MANAGE_COURSES.POST_MANAGE_COURSES.method} isPage>
      <CreateCourse />
    </AdminGuard>
  )
}
