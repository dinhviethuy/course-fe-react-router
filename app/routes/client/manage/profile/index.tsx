import { Loader2Icon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Profile() {
  return (
    <div>
      <div className="space-y-0.5">
        <h3 className="text-lg font-medium">Thông tin tài khoản</h3>
        <p className="text-sm text-muted-foreground">Bạn có thể chỉnh sửa thông tin tài khoản của mình ở đây.</p>
      </div>
      <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6" />
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" htmlFor="name">Họ và tên</label>
          <Input type="text" placeholder="Nhập họ và tên" className="h-10" defaultValue="Nguyễn Văn A" id="name" />
          <p className="text-sm text-muted-foreground">Tên này sẽ được hiển thị trên trang cá nhân của bạn.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" disabled className="h-10" defaultValue="nguyenvana@gmail.com" />
          <p className="text-sm text-muted-foreground">Bạn không thể thay đổi email (nếu muốn thay đổi, vui lòng liên hệ quản trị viên)</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-sm font-medium">Tình trạng tài khoản</span>
            <Badge variant="default">ACTIVE</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Tài khoản của bạn đang hoạt động, bạn có thể sử dụng tài khoản của mình để đặt hàng.</p>
        </div>
        <Button className="w-auto h-[40px] cursor-pointer">
          <Loader2Icon className="animate-spin" />
          Cập nhật tài khoản
        </Button>
      </div>
    </div>
  )
}