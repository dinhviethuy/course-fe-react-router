import { Link, Outlet } from 'react-router';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog';
import { useAuthStore } from "~/stores/useAuthStore";

export default function PrivateRoute() {
  const { isAuthenticated, isLogout } = useAuthStore()
  if (!isAuthenticated) {
    if (isLogout) return null
    return (
      <AlertDialog open={true}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn cần đăng nhập để truy cập trang này</AlertDialogTitle>
            <AlertDialogDescription>
              Vui lòng đăng nhập để tiếp tục
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Link to="/">Đóng</Link>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link to="/login">Đăng nhập</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  return <Outlet />
}