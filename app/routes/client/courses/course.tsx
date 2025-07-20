import type { Route } from '.react-router/types/app/routes/client/courses/+types/course'
import { useQueryClient } from '@tanstack/react-query'
import { BrainCircuit, CheckIcon, ListVideo } from 'lucide-react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import VideoIframe from '~/components/art-player/video-iframe'
import NotFound from '~/components/error-page/error-page'
import Wrapper from '~/components/layouts/client/wrapper/wrapper'
import Loading from '~/components/loading/loading'
import CardCourse from '~/components/ui-custom/card-course'
import CollapsibleCustom from '~/components/ui-custom/collapsible-custom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardDescription } from '~/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { useAddToCartMutation, useGetListCart } from '~/hooks/useCart'
import { useBoughtCoursesQuery, useGetCourseDetailBySlugQuery, useListCourseQuery } from '~/hooks/useCourse'
import { cn, formatCurrency, formatDate, handleError } from '~/lib/utils'
import { useAuthStore } from '~/stores/useAuthStore'

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.courseSlug}` }, { name: 'description', content: `${params.courseSlug}` }]
}

export default function Course({ params }: Route.ComponentProps) {
  const { isAuthenticated } = useAuthStore()
  const { courseSlug } = params
  const { data: courseDetail, isPending, isError } = useGetCourseDetailBySlugQuery({ slug: courseSlug })
  const courseDetailData = courseDetail?.data
  const { data: listCourse } = useListCourseQuery()
  const { data: listCourseBought } = useBoughtCoursesQuery()
  const addToCartMutation = useAddToCartMutation()
  const queryClient = useQueryClient()
  const { data: listCart } = useGetListCart({
    getAll: true
  })
  const listCartData = listCart?.data
  const listCourseBoughtData = listCourseBought?.data
  const data = listCourse?.data
  if (isPending) return <Loading />
  if (!courseDetailData || isError) return <NotFound statusCode={404} message='Không tìm thấy trang' />
  const {
    price,
    discount,
    title,
    createdBy: author,
    benefits,
    chapters,
    updatedAt,
    video,
    description
  } = courseDetailData.data
  const handleAddToCart = async () => {
    try {
      await addToCartMutation.mutateAsync({
        courseId: courseDetailData.data.id
      })
      queryClient.refetchQueries({ queryKey: ['cart'] })
      toast.success('Thêm vào giỏ hàng thành công')
    } catch (error) {
      handleError({ error })
    }
  }
  return (
    <Wrapper>
      <div className='flex flex-col xl:gap-12 gap-6 xl:py-0 py-8'>
        <div className='flex flex-col gap-8'>
          <h1 className='text-3xl font-bold tracking-tighter'>{title}</h1>
          <div className='flex gap-8'>
            <span className='text-base'>Bởi: {author?.fullName}</span>
            <span className='text-base'>Cập nhật: {formatDate(updatedAt)}</span>
          </div>
        </div>
        <div className='grid grid-cols-12 gap-8'>
          <div className='col-span-12 xl:col-span-8 lg:col-span-7 h-[550px]'>
            {video && <VideoIframe videoUrl={video} />}
          </div>
          <div className='col-span-12 xl:col-span-4 lg:col-span-5 h-[550px]'>
            <Card className='w-full p-6'>
              <CardDescription className='flex flex-col gap-3'>
                <div className='flex flex-col gap-2'>
                  <span
                    className={cn('text-xl font-semibold line-through', {
                      hidden: discount === 0 || price == 0
                    })}
                  >
                    {formatCurrency(price)}
                  </span>
                  <div className='flex gap-8 items-center'>
                    <span className='text-2xl font-semibold dark:text-white text-black'>
                      {price === 0 ? 'Miễn phí' : formatCurrency(price * (1 - discount / 100))}
                    </span>
                    <Badge
                      variant='default'
                      className={cn('text-xs h-10', {
                        hidden: discount === 0 || price === 0
                      })}
                    >
                      <span className='text-base'>Tiết kiệm {discount}%</span>
                    </Badge>
                  </div>
                </div>
                <ul className='flex flex-col gap-2 text-base dark:text-white text-black my-4'>
                  <li className='flex gap-2 items-center'>
                    <CheckIcon className='w-4 h-4' />
                    <span>Mua 1 lần, học trọn đời</span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <CheckIcon className='w-4 h-4' />
                    <span>Cập nhật khóa học liên tục</span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <CheckIcon className='w-4 h-4' />
                    <span>Video chất lượng 1080p, 1440p</span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <CheckIcon className='w-4 h-4' />
                    <span>Học trên mọi thiết bị</span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <CheckIcon className='w-4 h-4' />
                    <span>Group hỏi đáp với mentor</span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <CheckIcon className='w-4 h-4' />
                    <span>Hỗ trợ fix bug khi học</span>
                  </li>
                  <li className='flex gap-2 items-center'>
                    <CheckIcon className='w-4 h-4' />
                    <span>Cung cấp doc, source code Github tập đầy đủ</span>
                  </li>
                </ul>
                <div className='flex flex-col gap-4'>
                  {
                    listCourseBoughtData?.data.courses.find((course) => course.slug === courseSlug) ? (
                      <Link to={`/learn/${courseSlug}`}>
                        <Button className='w-full h-10 cursor-pointer'>
                          <span className='text-base font-semibold'>Tham gia học</span>
                        </Button>
                      </Link>
                    ) : (
                      <>
                        {listCartData?.data.cartItems.find((cart) => cart.course.slug === courseSlug) ? (
                          <Link to={`/manage/cart`}>
                            <Button className='w-full h-10 cursor-pointer'>
                              <span className='text-base font-semibold'>Tiến hành thanh toán</span>
                            </Button>
                          </Link>
                        ) : (
                          <>
                            {isAuthenticated && (
                              <>
                                <Button className='w-full h-10 cursor-pointer'>
                                  <span className='text-base font-semibold'>Mua ngay</span>
                                </Button>
                                <Button variant='outline' className='w-full h-10 cursor-pointer' onClick={handleAddToCart}>
                                  <span className='text-base text-primary font-semibold'>Thêm vào giỏ hàng</span>
                                </Button>
                              </>
                            )}
                            {!isAuthenticated && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button className='w-full h-10 cursor-pointer'>
                                    <span className='text-base font-semibold'>Mua ngay</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogTrigger>
                                  <Button variant='outline' className='w-full h-10 cursor-pointer'>
                                    <span className='text-base text-primary font-semibold'>Thêm vào giỏ hàng</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className='max-w-sm'>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Bạn cần đăng nhập để truy cập trang này</AlertDialogTitle>
                                    <AlertDialogDescription>Vui lòng đăng nhập để tiếp tục</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel asChild>
                                      <span className='cursor-pointer'>Đóng</span>
                                    </AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                      <Link to='/login' className='cursor-pointer'>
                                        Đăng nhập
                                      </Link>
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </>
                        )}
                      </>
                    )
                  }
                </div>
              </CardDescription>
            </Card>
          </div>
        </div>
        <div className='grid xl:grid-cols-16 lg:grid-cols-16 md:grid-cols-16 grid-cols-1 gap-8 md:gap-0'>
          <div className='xl:col-span-14 lg:col-span-14 md:col-span-12 col-span-1'>
            <p className='xl:text-2xl text-xl'>{description}</p>
          </div>
          <div className='xl:col-span-2 lg:col-span-2 md:col-span-4 col-span-1'>
            <div className='flex flex-col gap-4 items-center xl:items-end'>
              <Avatar className='w-25 h-25'>
                <AvatarImage src='https://github.com/shadcn.png' className='object-cover' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className='text-lg font-semibold'>{author?.fullName}</span>
            </div>
          </div>
        </div>
        <div>
          <Tabs defaultValue='learning' orientation='horizontal'>
            <TabsList className='w-full h-10 md:justify-center md:flex hidden'>
              <TabsTrigger value='learning' className='cursor-pointer dark:data-[state=active]:bg-black'>
                Nội dung học tập
              </TabsTrigger>
              <TabsTrigger value='author' className='cursor-pointer dark:data-[state=active]:bg-black'>
                Về tác giả
              </TabsTrigger>
              <TabsTrigger value='related' className='cursor-pointer dark:data-[state=active]:bg-black'>
                Khóa học liên quan
              </TabsTrigger>
            </TabsList>
            <TabsList className='h-10 w-full md:hidden'>
              <TabsTrigger value='learning' className='cursor-pointer dark:data-[state=active]:bg-black'>
                Nội dung học tập
              </TabsTrigger>
            </TabsList>
            <TabsList className='h-10 w-full md:hidden'>
              <TabsTrigger value='author' className='cursor-pointer dark:data-[state=active]:bg-black'>
                Về tác giả
              </TabsTrigger>
            </TabsList>
            <TabsList className='h-10 w-full md:hidden '>
              <TabsTrigger value='related' className='cursor-pointer dark:data-[state=active]:bg-black'>
                Khóa học liên quan
              </TabsTrigger>
            </TabsList>
            <TabsContent value='learning' className='mt-4 flex flex-col gap-8'>
              <div className='flex flex-col gap-8'>
                <div className='flex gap-2 items-center'>
                  <BrainCircuit className='w-6 h-6' />
                  <h3 className='text-xl font-semibold'>Bạn sẽ nhận được</h3>
                </div>
                <ul className='grid grid-cols-2 gap-6'>
                  {benefits.map((benefit, index) => (
                    <li key={index} className='col-span-1 flex gap-2 items-center'>
                      <CheckIcon className='w-4 h-4' />
                      <span className='text-base'>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex flex-col gap-8'>
                <div className='flex gap-2 items-center'>
                  <ListVideo className='w-6 h-6' />
                  <h3 className='text-xl font-semibold'>Nội dung học tập</h3>
                </div>
                <div className='flex flex-col'>
                  {chapters.map((chapter, index) => (
                    <div className='flex flex-col gap-2' key={index}>
                      <CollapsibleCustom chapter={chapter} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value='author' className='mt-4'>
              <p className='text-xl'>
                Mình sẽ giúp bạn level up skill 🚀 lên nhanh nhất có thể Đinh Viết Huy hiện là một Front-End developer
                với hơn 4 năm kinh nghiệm làm việc thực tế. Năm 20 tuổi, mình đã viết một ứng dụng đầu tiên trong 4 giờ
                và nhanh chóng giúp mình kiệm được 1000$ chỉ trong 3 ngày sau đó.
              </p>
            </TabsContent>
            <TabsContent value='related' className='mt-4'>
              <div className='sm:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-6 flex flex-wrap justify-center'>
                {data && data.data.courses.length > 0 ? (
                  data.data.courses.map((course) => {
                    if (course.slug !== courseSlug) {
                      return <CardCourse key={course.id} course={course} />
                    }
                  })
                ) : (
                  <div className='flex justify-center items-center h-full col-span-4'>
                    <h3 className='text-xl font-semibold'>Không có khóa học liên quan</h3>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Wrapper>
  )
}
