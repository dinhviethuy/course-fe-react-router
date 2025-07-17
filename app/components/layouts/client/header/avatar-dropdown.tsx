import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { useLogoutMutation } from "~/hooks/useAuth";
import { useGetProfileQuery } from "~/hooks/useUser";
import { cn, handleError } from "~/lib/utils";
import { useAuthStore } from "~/stores/useAuthStore";

export default function AvatarDropdown() {
  const { isAuthenticated, setIsAuthenticated, setIsLogout } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: profile } = useGetProfileQuery()
  const user = profile?.data?.data
  const logoutMutation = useLogoutMutation()
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync({})
      setIsAuthenticated(false)
      setIsLogout(true)
      queryClient.removeQueries({ predicate: (query) => query.queryKey[0] === "profile" })
      navigate("/")
    } catch (error) {
      handleError({
        error,
        setError: () => { }
      })
    }
  }

  return (
    <Avatar>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn('cursor-pointer', {
          "hidden": !isAuthenticated || !user
        })} >
          <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[224px] sm:block hidden" align="end">
          <DropdownMenuLabel className={cn({
            "hidden": !isAuthenticated || !user
          })}>
            <div className="flex flex-col gap-1">
              <span>{user?.fullName}</span>
              <span>{user?.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className={cn({
            "hidden": !isAuthenticated || !user
          })} />
          <DropdownMenuItem >
            <Link to="/" className="w-full">Trang chủ</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn({
            "hidden": isAuthenticated
          })}>
            <Link to="/login" className="w-full">Đăng nhập</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn({
            "hidden": isAuthenticated
          })}>
            <Link to="/register" className="w-full">Đăng ký</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn({
            "hidden": !isAuthenticated
          })}>
            <Link to="/admin/dashboard" className="w-full">Trang quản trị</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn({
            "hidden": !isAuthenticated
          })}>
            <Link to="/manage/profile" className="w-full">Tài khoản</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn({
            "hidden": !isAuthenticated
          })}>
            <Link to="/bought-courses" className="w-full">Khóa học đã mua</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn({
            "hidden": !isAuthenticated
          })}>
            <Link to="/manage/cart" className="w-full">Giỏ hàng</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn({
            "hidden": !isAuthenticated
          })}>
            <Link to="/manage/orders" className="w-full">Đơn hàng</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className={cn({
            "hidden": !isAuthenticated || !user
          })} />
          <DropdownMenuItem className={cn({
            "hidden": !isAuthenticated
          })}>
            <span className="w-full cursor-pointer" onClick={handleLogout}>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Avatar>
  )
}
