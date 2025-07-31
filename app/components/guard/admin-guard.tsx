import Forbiden from '~/components/error-page/error-page';
import { CheckAccess } from '~/lib/utils';
import { useAuthStore } from "~/stores/useAuthStore";

export default function AdminGuard({ children, path, method, isPage }: { children: React.ReactNode, path: string, method: string, isPage?: boolean }) {
  const permissions = useAuthStore((s) => s.permissions)
  const hasPermission = CheckAccess({
    method,
    path,
    permissions
  })

  if (!hasPermission) {
    if (isPage) return <Forbiden statusCode={403} message="Bạn không có quyền truy cập trang này" />
    return null
  }

  return children
}