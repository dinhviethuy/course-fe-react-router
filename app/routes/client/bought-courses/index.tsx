import type { Route } from '.react-router/types/app/routes/client/bought-courses/+types'
import Wrapper from '~/components/layouts/client/wrapper/wrapper'
import CardCourse from '~/components/ui-custom/card-course'
import { useListCourseQuery } from '~/hooks/useCourse'

export function meta({ }: Route.MetaArgs) {
  return [{ title: 'Khóa học đã mua' }, { name: 'description', content: 'Khóa học đã mua' }]
}

export default function BoughtCourses() {
  const { data: listCourse } = useListCourseQuery({
    isBought: true
  })
  const data = listCourse?.data
  return (
    <Wrapper>
      <div className='flex flex-col gap-8'>
        <div className='md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 gap-6 flex flex-wrap justify-center '>
          {data && data.data.courses.length > 0 ? (
            data.data.courses.map((course) => <CardCourse key={course.id} course={course} isBought />)
          ) : (
            <div className='flex justify-center items-center h-full col-span-4'>
              <h3 className='text-xl font-semibold'>Bạn chưa mua khóa học nào</h3>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
