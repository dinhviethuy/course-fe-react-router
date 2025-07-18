import { Navigate, Outlet } from 'react-router'
import bannerLogin from '~/assets/images/banner-login.webp'
import Header from '~/components/layouts/client/header/header'
import { useAuthStore } from '~/stores/useAuthStore'

export default function ClientLayout() {
  const { isAuthenticated } = useAuthStore()
  if (isAuthenticated) return <Navigate to='/' />
  return (
    <div className='flex flex-col min-h-screen'>
      <Header isAuth={false} isHeaderAbsolute />
      <main className='flex-1 flex flex-col'>
        <div className='grid lg:grid-cols-2 h-screen'>
          <div className='relative hidden lg:flex h-full flex-col text-white p-10'>
            <div className='absolute inset-0'>
              <img src={bannerLogin} alt='banner' className='w-full h-full object-cover' />
              <div className='absolute inset-0 bg-black/50' />
            </div>
            <div className='relative z-20 mt-auto'>
              <blockquote className='space-y-2'>
                <p className='text-lg'>“Đầu tư vào kiến thức…”</p>
                <footer className='text-sm'>Benjamin Franklin</footer>
              </blockquote>
            </div>
          </div>

          <div className='flex items-center justify-center h-full lg:p-10'>
            <div className='mx-auto w-full max-w-sm space-y-6'>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
