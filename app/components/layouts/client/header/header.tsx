import { Link, NavLink } from 'react-router'
import AvatarDropdown from '~/components/layouts/client/header/avatar-dropdown'
import MobileDropdown from '~/components/layouts/client/header/mobile-dropdown'
import { ModeToggle } from '~/components/mode-toggle'
import LazyLoadImage from '~/components/ui-custom/lazy-image'
import { Button } from '~/components/ui/button'
import { useGetListCart } from '~/hooks/useCart'
import { cn } from '~/lib/utils'

const navItems = [
  {
    label: 'Trang chủ',
    href: '/',
    isAuth: false
  },
  {
    label: 'Khóa học đã mua',
    href: '/bought-courses',
    isAuth: true
  }
]

export default function Header({ isAuth, isHeaderAbsolute = false }: { isAuth: boolean; isHeaderAbsolute?: boolean }) {
  const { data: listCartData } = useGetListCart({
    getAll: true
  }, isAuth)
  const totalCart = listCartData?.data?.data?.totalItems || 0
  return (
    <>
      <header
        className={cn({
          'sticky top-0 left-0 right-0 z-[100] bg-background h-16 px-4 sm:px-4 xl:px-4 border-b': !isHeaderAbsolute,
          'absolute top-0 left-0 right-0 z-[100] bg-transparent h-16 px-4 sm:px-4 xl:px-4': isHeaderAbsolute
        })}
      >
        <div className='flex items-center justify-between h-full w-full mx-auto md:container'>
          <div className='flex items-center gap-8'>
            <div>
              <Link to='/'>
                <LazyLoadImage src='https://github.com/shadcn.png' alt='logo' className='w-10 h-10 rounded-full' />
              </Link>
            </div>
            <div>
              <ul className='items-center gap-4 hidden sm:flex'>
                {navItems.map((item) => (
                  <li
                    key={item.href}
                    className={cn('text-sm font-medium', {
                      hidden: item.isAuth && !isAuth
                    })}
                  >
                    <NavLink
                      to={item.href}
                      className={({ isActive }) => (isActive ? 'text-primary' : 'text-muted-foreground')}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <div>
              <ModeToggle />
            </div>
            <div className='hidden sm:flex'>
              <Link
                to='/login'
                className={cn({
                  hidden: isAuth
                })}
              >
                <Button
                  variant='ghost'
                  className='cursor-pointer text-muted-foreground hover:text-primary hover:bg-transparent dark:hover:bg-transparent px-2'
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link
                to='/register'
                className={cn({
                  hidden: isAuth
                })}
              >
                <Button
                  variant='ghost'
                  className='cursor-pointer text-muted-foreground hover:text-primary hover:bg-transparent dark:hover:bg-transparent px-2'
                >
                  Đăng ký
                </Button>
              </Link>
            </div>
            <div className='hidden sm:block'>
              <AvatarDropdown totalCart={totalCart} />
            </div>
            <div className='sm:hidden'>
              <MobileDropdown totalCart={totalCart} />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
