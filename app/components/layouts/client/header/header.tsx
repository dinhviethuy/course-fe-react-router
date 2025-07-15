import { Link, NavLink } from "react-router";
import AvatarDropdown from "~/components/layouts/client/header/avatar-dropdown";
import MobileDropdown from "~/components/layouts/client/header/mobile-dropdown";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const navItems = [
  {
    label: "Trang chủ",
    href: "/",
  },
  {
    label: "Khóa học đã mua",
    href: "/bought-courses",
  }
]

export default function Header({ isAuth }: { isAuth?: boolean }) {
  return (
    <>
      <header className={cn({
        "sticky top-0 left-0 right-0 z-[9999] bg-background h-16 px-4 sm:px-4 xl:px-4 border-b": !isAuth,
        "absolute top-0 left-0 right-0 z-10 bg-transparent h-16 px-4 sm:px-4 xl:px-4": isAuth
      })}>
        <div className="flex items-center justify-between h-full w-full mx-auto max-w-[1440px]">
          <div className="flex items-center gap-8">
            <div>
              <Link to="/">
                <img src="https://github.com/shadcn.png" alt="logo" className="w-10 h-10 rounded-full" />
              </Link>
            </div>
            <div>
              <ul className="items-center gap-4 hidden sm:flex">
                {navItems.map((item) => (
                  <li key={item.href} className="text-sm font-medium">
                    <NavLink to={item.href} className={({ isActive }) => isActive ? "text-primary" : "text-muted-foreground"}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <ModeToggle />
            </div>
            <div className="hidden sm:flex">
              <Link to="/login">
                <Button variant="ghost" className="cursor-pointer text-muted-foreground hover:text-primary hover:bg-transparent dark:hover:bg-transparent px-2">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="ghost" className="cursor-pointer text-muted-foreground hover:text-primary hover:bg-transparent dark:hover:bg-transparent px-2">
                  Đăng ký
                </Button>
              </Link>
            </div>
            <div className="hidden sm:block">
              <AvatarDropdown />
            </div>
            <div className="sm:hidden">
              <MobileDropdown />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}