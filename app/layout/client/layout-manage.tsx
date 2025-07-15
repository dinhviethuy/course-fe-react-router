import { NavLink, Outlet } from "react-router"
import Wrapper from "~/components/layouts/client/wrapper/wrapper"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"

const menu = [
  {
    label: "Tài khoản",
    to: "/manage/profile"
  },
  {
    label: "Đổi mật khẩu",
    to: "/manage/change-password"
  },
  {
    label: "Giỏ hàng",
    to: "/manage/cart"
  },
  {
    label: "Đơn hàng",
    to: "/manage/orders"
  }
]

export default function LayoutManage() {
  return (
    <Wrapper>
      <div>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Quản lý</h2>
          <p className="text-muted-foreground">Quản lý tài khoản và đơn hàng</p>
        </div>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6" />
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-1">
            <div className="flex flex-col gap-2">
              {menu.map((item) => (
                <NavLink to={item.to} key={item.label} className={({ isActive }) => cn("w-full justify-start cursor-pointer", {
                  "bg-accent hover:text-accent-foreground dark:bg-accent/50 rounded-md": isActive
                })}>
                  <Button variant="ghost" className="w-full justify-start cursor-pointer">
                    {item.label}
                  </Button>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="col-span-5 px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}