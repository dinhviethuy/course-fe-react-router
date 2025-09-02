import { Link, useSearchParams } from 'react-router'
import NotFound from '~/components/error-page/error-page'
import Wrapper from '~/components/layouts/client/wrapper/wrapper'
import CardCourse from '~/components/ui-custom/card-course'
import CardCourseSkeleton from '~/components/ui-custom/card-course-skeleton'
import PaginationCustom from '~/components/ui-custom/pagination-custom'
import { PAGE_LIMIT } from '~/constants/other.constant'
import { useListCourseQuery } from '~/hooks/useCourse'
import envConfig from '~/lib/config'
import type { Route } from './+types/index'

export function meta({ }: Route.MetaArgs) {
  return [{ title: 'Trang chủ' }, { name: 'description', content: 'Trang chủ' }]
}

export default function Home() {
  const [params] = useSearchParams()
  let page = Number(params.get('page') || 1)
  if (isNaN(page)) page = 1
  const { data: listCourse, isPending } = useListCourseQuery({
    limit: PAGE_LIMIT + 2,
    page: page
  })
  const data = listCourse?.data
  if (data && page > 1 && page > data.data.totalPages) {
    return <NotFound statusCode={404} message='Không tìm thấy trang' />
  }
  return (
    <Wrapper className='flex-1'>
      <div className='flex flex-col justify-between flex-1'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col items-center justify-center gap-2'>
            <h1 className='text-[20px] font-bold'>Mua càng nhiều, giá sẽ càng rẻ</h1>
            <p className='text-[16px] text-muted-foreground text-center'>
              Nhắn tin cho <Link to={envConfig.VITE_PAGE_URL} className='font-bold'>Page</Link> để có giá tốt nếu combo bạn muốn mua không có sẵn
            </p>
          </div>
          <div className='sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 gap-6 flex flex-wrap justify-center'>
            {isPending && (
              <>
                <CardCourseSkeleton />
                <CardCourseSkeleton />
                <CardCourseSkeleton />
                <CardCourseSkeleton />
              </>
            )}
            {data?.data.courses.map((course) => (
              <CardCourse key={course.id} course={course} />
            ))}
          </div>
        </div>
        {data?.data && data.data.totalPages > 1 && (
          <PaginationCustom currentPage={page} totalPages={data?.data.totalPages || 0} />
        )}
      </div>
    </Wrapper>
  )
}
