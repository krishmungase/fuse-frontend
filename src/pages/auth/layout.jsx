import { Outlet } from 'react-router'

/**
 * Auth shell: the same fixed dark surface and subtle bloom as the chat canvas.
 * Page content decides its own arrangement inside the centred container.
 */
const AuthLayout = () => {
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
