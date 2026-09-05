import { useLocation, useOutletContext, useParams } from 'react-router'

import { useChat } from '@/apis'
import { usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'
import ChatNotFound from '../components/chat-not-found'
import ChatTopbar from './components/chat-topbar'
import ConversationSession from './session'

/**
 * One conversation, keyed by the `:id` route param.
 *
 * This layer only resolves the stored transcript. Arriving from the new chat
 * screen carries the first prompt in route state and nothing is stored yet, so
 * the fetch is skipped entirely. The session below is mounted only once that
 * history is settled, because the streaming hook seeds itself from it once.
 */
const ChatPage = () => {
  const { id } = useParams()
  const { state } = useLocation()
  const { sidebarCollapsed, openSidebar, expandSidebar } = useOutletContext()

  const pendingPrompt = state?.pendingPrompt

  const { chat, messages, isLoading, isNotFound } = useChat({
    id,
    enabled: !pendingPrompt,
  })

  usePageTitle({
    title:
      chat?.title ??
      (isNotFound ? pageTitle.CHAT_NOT_FOUND_PAGE : pageTitle.CHAT_PAGE),
  })

  if (isNotFound) {
    return (
      <ChatNotFound
        id={id}
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={openSidebar}
        onExpandSidebar={expandSidebar}
      />
    )
  }

  if (isLoading) {
    return (
      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-chat-background">
        <ChatTopbar
          sidebarCollapsed={sidebarCollapsed}
          onOpenSidebar={openSidebar}
          onExpandSidebar={expandSidebar}
        />
      </main>
    )
  }

  return (
    <ConversationSession
      key={id}
      id={id}
      history={messages}
      pendingPrompt={pendingPrompt}
      pendingModel={state?.model}
      sidebarCollapsed={sidebarCollapsed}
      onOpenSidebar={openSidebar}
      onExpandSidebar={expandSidebar}
    />
  )
}

export default ChatPage
