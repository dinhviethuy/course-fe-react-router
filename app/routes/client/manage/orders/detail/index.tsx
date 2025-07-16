import { CheckIcon } from "lucide-react"
import { useParams } from "react-router"
import { Badge } from "~/components/ui/badge"
import { formatCurrency } from "~/lib/utils"

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>()
  return (
    <div>
      <div>
        <h2 className="text-lg font-medium">Thông tin đơn hàng (Mã đơn hàng: {orderId})</h2>
        <p className="text-sm text-muted-foreground">Sau khi chuyển khoản thành công, hệ thống sẽ tự động xác nhận đơn hàng sau vài giây</p>
        <p className="text-sm text-muted-foreground">Nếu có bất cứ vấn đề gì về chuyển khoản, hãy nhắn tin cho page Được Dev để được hỗ trợ</p>
      </div>
      <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6" />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h3 className="text-2xl font-medium">Thông tin chuyển khoản</h3>
          <div className="flex flex-col gap-4 py-6">
            <ul className="flex flex-col gap-4">
              <li className="grid grid-cols-3 gap-4">
                <span className="text-base">Tình trạng đơn hàng</span>
                <Badge className="font-bold h-8">
                  <CheckIcon className="w-6 h-6 text-green-500" />
                  Đã thanh toán
                </Badge>
              </li>
              <li className="grid grid-cols-3 gap-4">
                <span>Ngày tạo đơn hàng</span>
                <Badge className="font-bold h-8">16/07/2025 10:00</Badge>
              </li>
              <li className="grid grid-cols-3 gap-4">
                <span>Ngày cập nhật</span>
                <Badge className="font-bold h-8">16/07/2025 10:00</Badge>
              </li>
            </ul>
            <div>
              <p className="text-base py-4">Vui lòng chuyển khoản với thông tin sau</p>
              <ul className="flex flex-col gap-4 py-4">
                <li className="grid grid-cols-2 gap-4">
                  <span className="grid-cols-1 text-base ">Ngân hàng</span>
                  <span className="grid-cols-1 text-base">OCB - Ngân hàng TMCP Phương Đông</span>
                </li>
                <li className="grid grid-cols-2 gap-4">
                  <span className="grid-cols-1 text-base ">Số tài khoản (đây là STK dạng chữ, hoặc các bạn có thể quét QR dưới)</span>
                  <Badge className="h-8 font-bold">SEPDUOCEDU</Badge>
                </li>
                <li className="grid grid-cols-2 gap-4">
                  <span className="grid-cols-1 text-base ">Chủ tài khoản</span>
                  <Badge className="h-8 font-bold">DU THANH DUOC</Badge>
                </li>
                <li className="grid grid-cols-2 gap-4">
                  <span className="grid-cols-1 text-base ">Nội dung</span>
                  <Badge className="h-8 font-bold">DH2434</Badge>
                </li>
                <li className="grid grid-cols-2 gap-4">
                  <span className="grid-cols-1 text-base ">Số tiền</span>
                  <Badge className="h-8 font-bold">{formatCurrency(1090000)}</Badge>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-base py-4">Hoặc quét mã QR sau (khuyến khích quét bằng các App ngân hàng, một số ví điện tử (VNPAY, ShopeePay) đôi khi sẽ không nhận diện được QR này)</p>
              <div>
                <img src="https://github.com/shadcn.png" alt="QR Code" width={320} height={320} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-medium">Thông tin hóa đơn</h3>
          <ul className="flex flex-col gap-6 py-6">
            <li className="space-x-2">
              <span className="text-base">Người mua:</span>
              <span className="text-base font-bold">Đinh Viết Huy | dinhviethuywww@gmail.com</span>
            </li>
            <li className="grid grid-cols-3 gap-4">
              <div className="col-span-2 text-base flex items-center gap-4">
                <img src="https://github.com/shadcn.png" alt="QR Code" className="w-12 h-12" />
                <span className="text-base font-bold">Nest.js Super | Dự án Ecommerce API tích hợp thanh toán online 1</span>
              </div>
              <div className="col-span-1 text-base flex flex-col gap-1">
                <span className="font-bold">{formatCurrency(1090000)}</span>
                <span className="text-muted-foreground line-through text-sm">{formatCurrency(1090000)}</span>
              </div>
            </li>
            <li className="grid grid-cols-3 gap-4">
              <span className="col-span-2 text-base">HOCVIENSUPER</span>
              <span className="col-span-1 text-base font-bold">-{formatCurrency(100000)}</span>
            </li>
            <li className="grid grid-cols-3 gap-4">
              <span className="col-span-2 text-xl font-bold">Tổng tiền hóa đơn</span>
              <span className="col-span-1 text-xl font-bold ">{formatCurrency(1090000)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}