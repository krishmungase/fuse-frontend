import { Link } from 'react-router'

import { NEW_CHAT_PATH } from '@/constants'
import ChatTopbar from '../conversation/components/chat-topbar'

/** Shown when `/chat/:id` points at a conversation that does not exist. */
const ChatNotFound = ({
  id,
  sidebarCollapsed,
  onOpenSidebar,
  onExpandSidebar,
}) => {
  return (
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-chat-background">
      <ChatTopbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={onOpenSidebar}
        onExpandSidebar={onExpandSidebar}
      />

      <div className="flex w-full min-w-0 flex-1 flex-col items-center justify-center px-4 pb-14 text-center sm:px-6">
        <h1 className="max-w-full text-[26px] leading-tight font-light tracking-tight text-balance text-chat-foreground sm:text-[34px]">
          Chat not found
        </h1>
        <p className="pt-3 text-[14px] text-chat-secondary">
          There is no conversation with the id "{id}".
        </p>

        <Link
          to={NEW_CHAT_PATH}
          className="mt-8 flex h-10 items-center rounded-full bg-chat-active px-5 text-[14px] text-chat-foreground transition-colors duration-150 hover:bg-chat-hover"
        >
          Start a new chat
        </Link>
      </div>
    </main>
  )
}

export default ChatNotFound
