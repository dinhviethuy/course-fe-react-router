import { Link, useNavigate } from 'react-router'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
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

export default function AvatarDropdown({ totalCart }: { totalCart: number }) {
  const { isAuthenticated, setIsAuthenticated, setIsLogout, isAdmin } = useAuthStore()
  const navigate = useNavigate()
  const { data: profile } = useGetProfileQuery(isAuthenticated)
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
      <DropdownMenuTrigger
        className={cn('cursor-pointer', {
          hidden: !isAuthenticated || !user
        })}
      >
        <div className='relative'>
          <Avatar>
            <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
          {totalCart > 0 && (
            <Badge className='border-background absolute -top-1.5 left-full min-w-5 -translate-x-3.5 px-1'>
              {totalCart}
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[224px] sm:block hidden z-[1000]' align='end'>
        <DropdownMenuLabel
          className={cn({
            hidden: !isAuthenticated || !user
          })}
        >
          <div className='flex flex-col gap-1'>
            <span className='wrap-break-word'>{user?.fullName}</span>
            <span className='wrap-break-word'>{user?.email}</span>
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
            hidden: !isAuthenticated || !isAdmin
          })}
        >
          <Link to='/admin/dashboard' className='w-full'>
            Trang quản trị
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: !isAuthenticated
          })}
        >
          <Link to='/manage/profile' className='w-full'>
            Tài khoản
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: !isAuthenticated
          })}
        >
          <Link to='/bought-courses' className='w-full'>
            Khóa học đã mua
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: !isAuthenticated
          })}
        >
          <Link to='/manage/cart' className='w-full'>
            <span>Giỏ hàng</span>
            {totalCart > 0 && (
              <Badge variant='default' className='ml-2'>
                {totalCart}
              </Badge>
            )}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn({
            hidden: !isAuthenticated
          })}
        >
          <Link to='/manage/orders' className='w-full'>
            Đơn hàng
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator
          className={cn({
            hidden: !isAuthenticated || !user
          })}
        />
        <DropdownMenuItem
          className={cn({
            hidden: !isAuthenticated
          })}
        >
          <span className='w-full cursor-pointer' onClick={handleLogout}>
            Đăng xuất
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
