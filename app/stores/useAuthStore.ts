import { create } from 'zustand'

export interface PermissionStoreType {
  id: number
  name: string
  method: string
  path: string
  module: string
}

type AuthStoreType = {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  isLogout: boolean
  setIsLogout: (isLogout: boolean) => void
  permissions: PermissionStoreType[]
  setPermissions: (permissions: PermissionStoreType[]) => void
  isAdmin: boolean
  setIsAdmin: (isAdmin: boolean) => void
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isLogout: false,
  setIsLogout: (isLogout: boolean) => set({ isLogout }),
  permissions: [],
  setPermissions: (permissions: PermissionStoreType[]) => set({ permissions }),
  isAdmin: false,
  setIsAdmin: (isAdmin: boolean) => set({ isAdmin })
}))
