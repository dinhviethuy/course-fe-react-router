import type { Route } from '.react-router/types/app/routes/client/manage/orders/detail/+types'
import { CheckIcon, Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner'
import NotFound from '~/components/error-page/error-page'
import Loading from '~/components/loading/loading'
import { Badge } from '~/components/ui/badge'
import { OrderStatus } from '~/constants/order.constant'
import { useGetOrderDetail } from '~/hooks/useOrder'
import envConfig from '~/lib/config'
import { paymentSocket } from '~/lib/socket'
import { cn, formatCurrency, formatDate, getOrderStatus, getTotalPrice } from '~/lib/utils'

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Chi tiết đơn hàng #${params.orderId}` }, { name: 'description', content: `Chi tiết đơn hàng` }]
}

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>()
  const getOrderDetail = useGetOrderDetail({ orderId: Number(orderId) })
  const data = getOrderDetail?.data?.data
  useEffect(() => {
    paymentSocket.on('payment', () => {
      toast.success('Đơn hàng đã được thanh toán thành công')
      getOrderDetail.refetch()
    })
  }, [getOrderDetail])
  if (getOrderDetail.isPending) return <Loading />
  if (!data) return <NotFound statusCode={404} message='Đơn hàng không tồn tại' isShowButton={false} />
  const order = data.data
  const { totalPrice, price, discountFixed, priceAfterDiscount } = getTotalPrice({
    coursePrice: order.snapshots[0].coursePrice,
    courseDiscount: order.snapshots[0].courseDiscount,
    couponDiscount: order.snapshots[0].couponDiscount,
    couponType: order.snapshots[0].couponType
  })

  return (
    <div>
      <div>
        <h2 className='text-lg font-medium'>Thông tin đơn hàng (Mã đơn hàng: {orderId})</h2>
        <p className='text-sm text-muted-foreground'>
          Sau khi chuyển khoản thành công, hệ thống sẽ tự động xác nhận đơn hàng sau vài giây
        </p>
        <p className='text-sm text-muted-foreground'>
          Nếu có bất cứ vấn đề gì về chuyển khoản, hãy nhắn tin cho page Đinh Viết Huy để được hỗ trợ
        </p>
      </div>
      <div data-orientation='horizontal' role='none' className='shrink-0 bg-border h-[1px] w-full my-6' />
      <div className='grid grid-cols-2 gap-4'>
        <div className='lg:col-span-1 col-span-2'>
          <h3 className='text-2xl font-medium'>Thông tin chuyển khoản</h3>
          <div className='flex flex-col gap-4 py-6'>
            <ul className='flex flex-col gap-4'>
              <li className='grid grid-cols-3 gap-4'>
                <span className='text-base'>Tình trạng đơn hàng</span>
                <Badge className='font-bold h-8'>
                  <CheckIcon
                    className={cn('w-6 h-6 text-green-500', {
                      hidden: order.status !== OrderStatus.PAID
                    })}
                  />
                  <Loader2Icon
                    className={cn('w-6 h-6 animate-spin text-yellow-500', {
                      hidden: order.status !== OrderStatus.PENDING
                    })}
                  />
                  {getOrderStatus(order.status)}
                </Badge>
              </li>
              <li className='grid grid-cols-3 gap-4'>
                <span>Ngày tạo đơn hàng</span>
                <Badge className='font-bold h-8'>{formatDate(order.createdAt, 'dd/MM/yyyy HH:mm:ss')}</Badge>
              </li>
              <li className='grid grid-cols-3 gap-4'>
                <span>Ngày cập nhật</span>
                <Badge className='font-bold h-8'>{formatDate(order.updatedAt, 'dd/MM/yyyy HH:mm:ss')}</Badge>
              </li>
            </ul>
            <div>
              <p className='text-base py-4'>Vui lòng chuyển khoản với thông tin sau</p>
              <ul className='flex flex-col gap-4 py-4'>
                <li className='grid grid-cols-2 gap-4'>
                  <span className='grid-cols-1 text-base '>Ngân hàng</span>
                  <span className='grid-cols-1 text-base'>{envConfig.VITE_BANK_NAME}</span>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <span className='grid-cols-1 text-base '>
                    Số tài khoản (đây là STK dạng chữ, hoặc các bạn có thể quét QR dưới)
                  </span>
                  <Badge className='h-8 font-bold'>{envConfig.VITE_BANK_ACCOUNT}</Badge>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <span className='grid-cols-1 text-base '>Chủ tài khoản</span>
                  <Badge className='h-8 font-bold'>{envConfig.VITE_BANK_ACCOUNT_NAME}</Badge>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <span className='grid-cols-1 text-base '>Nội dung</span>
                  <Badge className='h-8 font-bold'>DH{data?.data.id}</Badge>
                </li>
                <li className='grid grid-cols-2 gap-4'>
                  <span className='grid-cols-1 text-base '>Số tiền</span>
                  <Badge className='h-8 font-bold'>{formatCurrency(totalPrice)}</Badge>
                </li>
              </ul>
            </div>
            <div>
              <p className='text-base py-4'>
                Hoặc quét mã QR sau (khuyến khích quét bằng các App ngân hàng, một số ví điện tử (VNPAY, ShopeePay) đôi
                khi sẽ không nhận diện được QR này)
              </p>
              <div>
                <img
                  src={`${envConfig.VITE_BANK_QR_BASE_URL}?acc=${envConfig.VITE_BANK_ACCOUNT_NUMBER}&bank=${envConfig.VITE_BANK_CODE}&amount=${totalPrice}&des=DH${order.id}`}
                  alt='QR Code'
                  width={320}
                  height={320}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='lg:col-span-1 col-span-2  '>
          <h3 className='text-2xl font-medium'>Thông tin hóa đơn</h3>
          <ul className='flex flex-col gap-6 py-6'>
            <li className='space-x-2'>
              <span className='text-base'>Người mua:</span>
              <span className='text-base font-bold'>
                {order.user.fullName} | {order.user.email}
              </span>
            </li>
            <li className='grid grid-cols-3 gap-4'>
              <div className='col-span-2 text-base flex items-center flex-wrap md:flex-nowrap gap-4'>
                <img
                  src={order.snapshots[0].courseImage || ''}
                  alt={order.snapshots[0].courseTitle || ''}
                  className='w-12 h-12'
                />
                <span className='text-base font-bold'>{order.snapshots[0].courseTitle}</span>
              </div>
              <div className='col-span-1 text-base flex flex-col gap-1'>
                <span className='font-bold'>{formatCurrency(priceAfterDiscount)}</span>
                {price !== priceAfterDiscount && (
                  <span className='text-muted-foreground line-through text-sm'>{formatCurrency(price)}</span>
                )}
              </div>
            </li>
            <li
              className={cn('grid grid-cols-3 gap-4', {
                hidden: !order.snapshots[0].couponCode
              })}
            >
              <span className='col-span-2 text-base'>{order.snapshots[0].couponCode}</span>
              <span className='col-span-1 text-base font-bold'>-{formatCurrency(discountFixed)}</span>
            </li>
            <li className='grid grid-cols-3 gap-4'>
              <span className='col-span-2 text-xl font-bold'>Tổng tiền hóa đơn</span>
              <span className='col-span-1 text-xl font-bold '>{formatCurrency(totalPrice)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
