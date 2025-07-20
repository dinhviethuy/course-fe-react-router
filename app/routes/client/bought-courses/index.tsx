import type { Route } from '.react-router/types/app/routes/client/bought-courses/+types'
import { useSearchParams } from 'react-router'
import NotFound from '~/components/error-page/error-page'
import Wrapper from '~/components/layouts/client/wrapper/wrapper'
import CardCourse from '~/components/ui-custom/card-course'
import PaginationCustom from '~/components/ui-custom/pagination-custom'
import { PAGE_LIMIT } from '~/constants/other.constant'
import { useBoughtCoursesQuery } from '~/hooks/useCourse'

export function meta({ }: Route.MetaArgs) {
  return [{ title: 'Khóa học đã mua' }, { name: 'description', content: 'Khóa học đã mua' }]
}

export default function BoughtCourses() {
  const [params] = useSearchParams()
  let page = Number(params.get('page') || 1)
  if (isNaN(page)) page = 1
  const { data: listCourse } = useBoughtCoursesQuery({
    limit: PAGE_LIMIT,
    page: page - 1,
  })
  const data = listCourse?.data
  if (data && page > data.data.totalPages) {
    return <NotFound statusCode={404} message='Không tìm thấy trang' />
  }
  return (
    <Wrapper className='flex-1'>
      <div className='flex-1 flex-col justify-between'>
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
      </div>
      {data?.data && data.data.totalPages > 1 && <PaginationCustom currentPage={page} totalPages={data?.data.totalPages || 0} />}
    </Wrapper>
  )
}
