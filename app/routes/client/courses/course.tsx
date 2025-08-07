import { Accordion } from '@radix-ui/react-accordion'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { BrainCircuit, CheckIcon, ListVideo } from 'lucide-react'
import { useState } from 'react'
import { Link, useLoaderData, useNavigate, type LoaderFunctionArgs, type MetaFunction } from 'react-router'
import { toast } from 'sonner'
import courseApi from '~/apis/course.api'
import VideoIframe from '~/components/art-player/video-iframe'
import NotFound from '~/components/error-page/error-page'
import Wrapper from '~/components/layouts/client/wrapper/wrapper'
import Loading from '~/components/loading/loading'
import AccordionCustom from '~/components/ui-custom/accordion-custom'
import CardCourse from '~/components/ui-custom/card-course'
import LazyLoadImage from '~/components/ui-custom/lazy-image'
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
import { Input } from '~/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { OrderStatus } from '~/constants/order.constant'
import { useAddToCartMutation, useGetListCart } from '~/hooks/useCart'
import { useValidateCouponMutation } from '~/hooks/useCoupon'
import { useBoughtCoursesQuery, useGetCourseDetailBySlugQuery, useListCourseQuery } from '~/hooks/useCourse'
import { useCreateOrderMutation, useGetOrder } from '~/hooks/useOrder'
import { cn, formatCurrency, formatDate, handleError } from '~/lib/utils'
import { useAuthStore } from '~/stores/useAuthStore'
import type { GetListCartResType } from '~/types/cart.type'
import type { GetValidateCouponResType } from '~/types/coupon.type'
import type { GetCourseDetailResType } from '~/types/course.type'
import type { CreateOrderBodyType } from '~/types/order.type'
import type { SuccessResponse } from '~/types/success.type'

export async function loader({ params }: LoaderFunctionArgs) {
  const courseSlug = params.courseSlug as string
  const queryClient = new QueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: ['course', courseSlug],
      queryFn: () => courseApi.getCourseDetailBySlug({ slug: courseSlug })
    })

    const courseData = queryClient.getQueryData<AxiosResponse<SuccessResponse<GetCourseDetailResType>>>([
      'course',
      courseSlug
    ])

    return {
      courseSlug,
      title: courseData?.data.data.title || 'Không tìm thấy khóa học'
    }
  } catch {
    throw new Response('Not Found', { status: 404 })
  }
}
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: 'Không tìm thấy khóa học 111' }]

  return [
    { title: data.title },
    { name: 'description', content: data.title }
  ]
}

function ShowDialogPay({
  item,
  handleCreateOrder
}: {
  item: GetListCartResType['cartItems'][number]
  handleCreateOrder: (body: CreateOrderBodyType) => void
}) {
  const [open, setOpen] = useState(true)
  const [voucher, setVoucher] = useState('')
  const [resAfterValidate, setResAfterValidate] = useState<GetValidateCouponResType>()
  const validateCouponMutation = useValidateCouponMutation()
  const queryClient = useQueryClient()
  const { course } = item || {}
  const total = course.price * (1 - (course.discount || 0) / 100)
  const [totalPay, setTotalPay] = useState(total)
  const handleAddVoucher = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const resItem = await validateCouponMutation.mutateAsync({
        code: voucher,
        courseId: item.course.id
      })
      // nếu người dùng nhập cái mới thì cập nhật cái cũ
      const total = totalPay - resItem.data.data.discountAmount + (resAfterValidate?.discountAmount || 0)
      setResAfterValidate(resItem.data.data)
      setTotalPay(total)
    } catch (error) {
      handleError({
        error
      })
    } finally {
      setVoucher('')
    }
  }

  const handleCreate = () => {
    let body: CreateOrderBodyType = {
      cartId: item.id
    }
    if (resAfterValidate) {
      body = {
        ...body,
        couponId: resAfterValidate.id
      }
    }
    try {
      handleCreateOrder(body)
      setOpen(false)
    } catch (error) {
      handleError({ error })
    }
  }

  const handleClose = () => {
    queryClient.refetchQueries({ queryKey: ['cart'] })
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className='w-full max-w-[90vw] md:max-w-[792px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận đơn hàng</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className='flex flex-col gap-6'>
              <div className='grid grid-cols-6 gap-4'>
                <div className='flex gap-2 items-center md:col-span-3 col-span-6'>
                  <LazyLoadImage src={course.image} alt={course.title} className='w-12 h-12 rounded-md object-cover' />
                  <span className='text-base font-semibold text-primary'>{course.title}</span>
                </div>
                <div className='flex flex-col gap-2 col-span-1 md:col-span-1'>
                  <span className='text-base font-semibold text-primary'>
                    {course.price === 0 ? 'Miễn phí' : formatCurrency(course.price * (1 - (course.discount || 0) / 100))}
                  </span>
                  {course.discount > 0 && course.price !== 0 && (
                    <span className={cn('text-sm text-muted-foreground line-through')}>
                      {formatCurrency(course.price)}
                    </span>
                  )}
                </div>
                <div className='flex flex-col gap-2 col-span-6 md:col-span-2'>
                  <form onSubmit={handleAddVoucher} className='flex gap-2 items-center'>
                    <Input
                      type='text'
                      className='w-full h-10'
                      placeholder='Voucher'
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                    />
                    <Button className='cursor-pointer h-10 w-auto' type='submit'>
                      Thêm
                    </Button>
                  </form>
                  {resAfterValidate && (
                    <div className='grid grid-cols-2 gap-2'>
                      <span className='text-sm text-muted-foreground col-span-1 max-w-[150px] truncate'>
                        {resAfterValidate.code}
                      </span>
                      <span className='text-sm text-primary col-span-1 max-w-full truncate'>
                        -{formatCurrency(resAfterValidate.discountAmount)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-6 gap-4'>
                <div className='flex gap-2 items-center col-span-3'>
                  <span className='text-base font-semibold text-primary'>Tổng tiền thanh toán</span>
                </div>
                <div className='flex flex-col gap-1 col-span-1'>
                  <span className='text-base font-semibold text-primary'>{formatCurrency(totalPay)}</span>
                  {totalPay < total && (
                    <span className='text-sm text-muted-foreground line-through'>{formatCurrency(total)}</span>
                  )}
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer h-10 w-auto'>Thoát</AlertDialogCancel>
          <AlertDialogAction className='cursor-pointer h-10 w-auto' onClick={handleCreate}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function Course() {
  const { courseSlug } = useLoaderData<typeof loader>()
  const [item, setItem] = useState<GetListCartResType['cartItems'][number] | null>(null)
  const { isAuthenticated } = useAuthStore()
  const { data: courseDetail, isPending, isError } = useGetCourseDetailBySlugQuery({ slug: courseSlug })
  const courseDetailData = courseDetail?.data
  const { data: listCourse } = useListCourseQuery(undefined, Boolean(courseDetailData))
  const { data: listCourseBought } = useBoughtCoursesQuery({
    getAll: true
  }, Boolean(courseDetailData) && Boolean(isAuthenticated))
  const addToCartMutation = useAddToCartMutation()
  const queryClient = useQueryClient()
  const createOrderMutation = useCreateOrderMutation()
  const { data: order } = useGetOrder({
    getAll: true,
    status: OrderStatus.PENDING
  }, isAuthenticated)
  const orderData = order?.data
  const navigate = useNavigate()
  const { data: listCart } = useGetListCart({
    getAll: true
  }, isAuthenticated)
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

  const handleCreateOrder = async (body: CreateOrderBodyType) => {
    try {
      const ressult = await createOrderMutation.mutateAsync(body)
      if (item) {
        setItem(null)
      }
      queryClient.refetchQueries({ queryKey: ['cart'] })
      queryClient.refetchQueries({ queryKey: ['order'] })
      toast.success('Tạo đơn hàng thành công')
      navigate(`/manage/orders/detail/${ressult.data.data.id}`)
    } catch (error) {
      handleError({
        error
      })
    }
  }
  const handleAddToCart = async (isBuyNow?: boolean) => {
    try {
      const res = await addToCartMutation.mutateAsync({
        courseId: courseDetailData.data.id
      })
      if (isBuyNow) {
        setItem({
          ...res.data.data,
          course: courseDetailData.data
        })
      } else {
        queryClient.refetchQueries({ queryKey: ['cart'] })
        toast.success('Thêm vào giỏ hàng thành công')
      }
    } catch (error) {
      handleError({ error })
    }
  }
  const isExistCart = listCartData?.data.cartItems.find((cart) => cart.course.slug === courseSlug)
  const isExistOrderPending =
    orderData?.data.orders.find((order) =>
      order.snapshots.find((snapshot) => snapshot.courseId === courseDetailData.data.id)
    )?.id || null
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
          <div className='col-span-12 xl:col-span-4 lg:col-span-5 max-[550px]'>
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
                  {listCourseBoughtData?.data.courses.find((course) => course.slug === courseSlug) ? (
                    <Link to={`/learn/${courseSlug}`}>
                      <Button className='w-full h-10 cursor-pointer'>
                        <span className='text-base font-semibold'>Tham gia học</span>
                      </Button>
                    </Link>
                  ) : (
                    <>
                      {isExistCart || isExistOrderPending ? (
                        <Link to={isExistCart ? '/manage/cart' : `/manage/orders/detail/${isExistOrderPending}`}>
                          <Button className='w-full h-10 cursor-pointer'>
                            <span className='text-base font-semibold'>Tiến hành thanh toán</span>
                          </Button>
                        </Link>
                      ) : (
                        <>
                          {isAuthenticated && (
                            <>
                              <Button
                                variant='default'
                                className='cursor-pointer w-full h-10'
                                onClick={() => handleAddToCart(true)}
                              >
                                Mua ngay
                              </Button>
                              {item && <ShowDialogPay item={item} handleCreateOrder={handleCreateOrder} />}
                              <Button
                                variant='outline'
                                className='w-full h-10 cursor-pointer'
                                onClick={() => handleAddToCart()}
                              >
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
                  )}
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
                  <Accordion type='single' collapsible className='w-full'>
                    {chapters.map((chapter) => (
                      <AccordionCustom chapter={chapter} key={chapter.id} />
                    ))}
                  </Accordion>
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
