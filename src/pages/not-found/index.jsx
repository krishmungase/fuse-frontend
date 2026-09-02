import { useNavigate } from 'react-router'
import { ArrowLeft, House } from 'lucide-react'

import { usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'

const NotFoundPage = () => {
  const navigate = useNavigate()

  usePageTitle({ title: pageTitle.NOT_FOUND_PAGE })

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-chat-background px-6 text-center tracking-normal">
      <p className="text-[88px] leading-none font-light tracking-tight text-chat-muted sm:text-[120px]">
        404
      </p>

      <h1 className="mt-6 text-[26px] leading-tight font-light tracking-tight text-chat-foreground sm:text-[34px]">
        Page not found
      </h1>

      <p className="mt-3 max-w-md text-[14px] text-chat-secondary">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-chat-active px-5 text-[14px] text-chat-foreground transition-colors duration-150 outline-none hover:bg-chat-hover"
        >
          <House className="size-4" />
          Back to chat
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-chat-border px-5 text-[14px] text-chat-secondary transition-colors duration-150 outline-none hover:bg-chat-hover hover:text-chat-foreground"
        >
          <ArrowLeft className="size-4" />
          Go back
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
