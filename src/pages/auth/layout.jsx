import { useAuth } from '@/hooks'
import { Navigate, Outlet } from 'react-router'

const AuthLayout = () => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/chat" replace />
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-y-auto bg-chat-background px-4 py-12 tracking-normal">
      <div className="chat-glow pointer-events-none absolute inset-0" />

      <div className="relative z-10 w-full max-w-[1120px]">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
