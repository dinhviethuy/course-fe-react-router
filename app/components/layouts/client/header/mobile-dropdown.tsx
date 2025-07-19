import { MenuIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { useLogoutMutation } from '~/hooks/useAuth'
import { useGetProfileQuery } from '~/hooks/useUser'
import { cn, handleError } from '~/lib/utils'
import { useAuthStore } from '~/stores/useAuthStore'

export default function MobileDropdown() {
  const { isAuthenticated, setIsAuthenticated, setIsLogout } = useAuthStore()
  const navigate = useNavigate()
  const { data: profile } = useGetProfileQuery()
  const user = profile?.data?.data
  const logoutMutation = useLogoutMutation()
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync({})
      setIsAuthenticated(false)
      setIsLogout(true)
      navigate('/')
    } catch (error) {
      handleError({
        error,
        setError: () => { }
      })
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer flex items-center justify-center'>
        <MenuIcon className='w-6 h-6' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-52 sm:hidden block z-[1000]'>
        <DropdownMenuLabel>
          <div className='flex flex-col gap-1'>
            <span>{user?.fullName}</span>
            <span>{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator
          className={cn({
            hidden: !isAuthenticated || !user
          })}
        />
        <DropdownMenuItem>
          <Link to='/' className='w-full'>
            Trang chủ
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: isAuthenticated
          })}
        >
          <Link to='/login' className='w-full'>
            Đăng nhập
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: isAuthenticated
          })}
        >
          <Link to='/register' className='w-full'>
            Đăng ký
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: !isAuthenticated || !user
          })}
        >
          <Link to='/manage/profile' className='w-full'>
            Trang quản trị
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: !isAuthenticated || !user
          })}
        >
          <Link to='/manage/profile' className='w-full'>
            Tài khoản
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: !isAuthenticated || !user
          })}
        >
          <Link to='/bought-courses' className='w-full'>
            Khoá học đã mua
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: !isAuthenticated || !user
          })}
        >
          <Link to='/manage/cart' className='w-full'>
            Giỏ hàng
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to='/manage/orders' className='w-full'>
            Đơn hàng
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator
          className={cn({
            hidden: !isAuthenticated || !user
          })}
        />
        {isAuthenticated && user && (
          <DropdownMenuItem>
            <div className='w-full cursor-pointer' onClick={handleLogout}>
              Đăng xuất
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
