import { Outlet } from 'react-router'
import Footer from '~/components/layouts/client/footer/footer'
import Header from '~/components/layouts/client/header/header'

export default function ClientLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}