import CreateCourse from '~/components/course/create-course'

export function meta() {
  return [
    {
      title: 'Tạo khóa học mới',
      description: 'Tạo khóa học mới'
    }
  ]
}


export default function NewCourse() {
  return <CreateCourse />
}
