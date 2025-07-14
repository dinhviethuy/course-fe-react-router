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
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span>Dương Nguyễn</span>
              <span>duongnguyen@gmail.com</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/profile">Trang quản trị</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/billing">Tài khoản</Link>
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
    </Avatar>
  )
}
