import { MenuIcon } from "lucide-react";
import { Link } from "react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

export default function MobileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex items-center justify-center">
        <MenuIcon className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 sm:hidden block">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span>Dương Nguyễn</span>
            <span>duongnguyen@gmail.com</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/" className="w-full">Trang chủ</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/login" className="w-full">Đăng nhập</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/register" className="w-full">Đăng ký</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/manage/profile" className="w-full">Trang quản trị</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/manage/billing" className="w-full">Tài khoản</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/bought-courses" className="w-full">Khoá học đã mua</Link>
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
  )
}
