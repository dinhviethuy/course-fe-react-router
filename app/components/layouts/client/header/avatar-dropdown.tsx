import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

export default function AvatarDropdown() {
  return (
    <Avatar>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" className="w-10 h-10 object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[224px] sm:block hidden" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span>Dương Nguyễn</span>
              <span>duongnguyen@gmail.com</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem >
            <Link to="/" className="w-full">Trang chủ</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/login" className="w-full">Đăng nhập</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/register" className="w-full">Đăng ký</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/admin/dashboard" className="w-full">Trang quản trị</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/manage/profile" className="w-full">Tài khoản</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/bought-courses" className="w-full">Khóa học đã mua</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/manage/cart" className="w-full">Giỏ hàng</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/manage/orders" className="w-full">Đơn hàng</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/logout" className="w-full">Đăng xuất</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Avatar>
  )
}
