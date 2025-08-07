import { Link } from 'react-router'
import LazyLoadImage from '~/components/ui-custom/lazy-image'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card'
import { formatCurrency } from '~/lib/utils'
import type { ListCoursesResType } from '~/types/course.type'

interface CardCourseProps {
  course: ListCoursesResType['courses'][number]
  isBought?: boolean
}

export default function CardCourse({ course, isBought = false }: CardCourseProps) {
  return (
    <Link to={`/courses/${course.slug}`} className='w-full'>
      <Card className='pt-0 hover:border-primary transition-colors duration-300 cursor-pointer h-[288px] max-w-[350px] sm:w-full sm:h-full mx-auto'>
        <CardHeader className='overflow-hidden p-0 grid grid-rows-1 h-[200px] w-full relative'>
          <CardDescription className='w-full h-full p-0 overflow-hidden'>
            {isBought && (
              <Badge variant='default' className='absolute top-1 right-1'>
                <p className='text-xs font-medium'>Đã mua</p>
              </Badge>
            )}
            <LazyLoadImage src={course.image} alt='logo' className='w-full h-full object-cover rounded-t-xl rounded-b-none' />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col justify-between flex-1'>
            <div>
              <h3 className='m-0 text-base leading-5 tracking-tighter font-bold'>{course.title}</h3>
            </div>
            <div className='flex gap-3 mt-3'>
              {course.discount > 0 && course.price !== 0 && (
                <p className='tracking-tighter line-through text-muted-foreground'>{formatCurrency(course.price)}</p>
              )}
              <p className='tracking-tighter font-semibold'>
                {course.price === 0 ? 'Miễn phí' : formatCurrency(course.price * (1 - course.discount / 100))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
