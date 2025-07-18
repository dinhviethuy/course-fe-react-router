import { useEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import userApi from '~/apis/user.api'
import { useAuthStore } from '~/stores/useAuthStore'

export async function clientLoader() {
  try {
    await userApi.getProfile()
    return {
      isAuthenticated: true,
      isLoading: false
    }
  } catch {
    return {
      isAuthenticated: false,
      isLoading: false
    }
  }
}

export default function LayoutInit() {
  const { isAuthenticated, isLoading } = useLoaderData<typeof clientLoader>()
  const { setIsAuthenticated, setIsLoading, isLoading: isLoadingAuthStore } = useAuthStore()
  useEffect(() => {
    setIsAuthenticated(isAuthenticated)
    setIsLoading(isLoading)
  }, [isAuthenticated, isLoading, setIsAuthenticated, setIsLoading])
  if (isLoadingAuthStore)
    return (
      <div className='flex justify-center items-center min-h-screen bg-accent-foreground dark:bg-background'>
        <span className='loader'></span>
      </div>
    )
  return <Outlet />
}
