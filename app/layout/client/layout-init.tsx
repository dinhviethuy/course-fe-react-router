import { parse } from 'cookie'
import { useEffect } from 'react'
import { Outlet, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import http from '~/lib/http'
import { CheckAdmin, handleError } from '~/lib/utils'
import { useAuthStore, type PermissionStoreType } from '~/stores/useAuthStore'

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie')
  const cookies = parse(cookieHeader || '')
  const res: {
    isAuthenticated: boolean
    isLoading: boolean
    permissions: PermissionStoreType[]
  } = {
    isAuthenticated: false,
    isLoading: true,
    permissions: []
  }
  const sessionToken = cookies.sessionToken
  if (sessionToken) {
    try {
      const resProfile = await http.get('/profile', {
        headers: {
          Cookie: cookieHeader || ''
        }
      })
      res.isAuthenticated = true
      res.permissions = resProfile.data.data.role.permissions
    } catch (error) {
      handleError({ error })
    }
  }
  res.isLoading = false
  return res
}

export default function LayoutInit() {
  const { isAuthenticated, isLoading, permissions } = useLoaderData<typeof loader>()
  const { setIsAuthenticated, setIsLoading, isLoading: isLoadingAuthStore, setPermissions, setIsAdmin } = useAuthStore()
  useEffect(() => {
    setIsAuthenticated(isAuthenticated)
    setIsLoading(isLoading)
    setPermissions(permissions)
    setIsAdmin(CheckAdmin(permissions))
  }, [isAuthenticated, isLoading, setIsAuthenticated, setIsLoading, permissions, setPermissions, setIsAdmin])
  if (isLoadingAuthStore)
    return (
      <div className='flex justify-center items-center min-h-screen bg-accent-foreground dark:bg-background'>
        <span className='loader'></span>
      </div>
    )
  return <Outlet />
}
