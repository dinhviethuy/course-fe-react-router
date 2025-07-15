import { MenuIcon } from "lucide-react";
import { Link } from "react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

export default function MobileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer flex items-center justify-center">
        <MenuIcon className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span>Dương Nguyễn</span>
            <span>duongnguyen@gmail.com</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/">Trang chủ</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/login">Đăng nhập</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/register">Đăng ký</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/profile">Trang quản trị</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/billing">Tài khoản</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/bought-courses">Khoá học đã mua</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/team">Giỏ hàng</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/subscription">Đơn hàng</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/logout">Đăng xuất</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
