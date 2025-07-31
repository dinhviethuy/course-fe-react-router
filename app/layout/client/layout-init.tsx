import { useEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import userApi from '~/apis/user.api'
import { useAuthStore } from '~/stores/useAuthStore'

export async function clientLoader() {
  try {
    const res = await userApi.getProfile()
    return {
      isAuthenticated: true,
      isLoading: false,
      permissions: res.data.data.role.permissions
    }
  } catch {
    return {
      isAuthenticated: false,
      isLoading: false,
      permissions: []
    }
  }
}

export default function LayoutInit() {
  const { isAuthenticated, isLoading, permissions } = useLoaderData<typeof clientLoader>()
  const { setIsAuthenticated, setIsLoading, isLoading: isLoadingAuthStore, setPermissions } = useAuthStore()
  useEffect(() => {
    setIsAuthenticated(isAuthenticated)
    setIsLoading(isLoading)
    setPermissions(permissions)
  }, [isAuthenticated, isLoading, setIsAuthenticated, setIsLoading, permissions, setPermissions])
  if (isLoadingAuthStore)
    return (
      <div className='flex justify-center items-center min-h-screen bg-accent-foreground dark:bg-background'>
        <span className='loader'></span>
      </div>
    )
  return <Outlet />
}
