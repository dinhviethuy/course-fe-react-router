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
        <DropdownMenuContent className="w-[224px]" align="end">
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
            <Link to="/admin/dashboard">Trang quản trị</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/profile">Tài khoản</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/bought-courses">Khóa học đã mua</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/cart">Giỏ hàng</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/billing">Đơn hàng</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/logout">Đăng xuất</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Avatar>
  )
}
