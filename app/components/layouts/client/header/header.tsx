import { Link, NavLink } from "react-router";
import AvatarDropdown from "~/components/layouts/client/header/avatar-dropdown";
import MobileDropdown from "~/components/layouts/client/header/mobile-dropdown";
import { ModeToggle } from "~/components/mode-toggle";

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

export default function Header() {
  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-16 px-4 sm:px-4 xl:px-4 border-b">
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