import { Outlet } from 'react-router'
import Footer from '~/components/layouts/client/footer/footer'
import Header from '~/components/layouts/client/header/header'
import { useAuthStore } from '~/stores/useAuthStore'

export default function ClientLayout() {
  const { isAuthenticated } = useAuthStore()
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuth={isAuthenticated} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}