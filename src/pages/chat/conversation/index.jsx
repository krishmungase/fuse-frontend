import { useOutletContext, useParams } from 'react-router'

import { usePageTitle } from '@/hooks'
import { pageTitle, RECENT_CHATS } from '@/constants'
import ChatNotFound from '../components/chat-not-found'
import ChatConversation from './components/chat-conversation'

/**
 * One conversation, keyed by the `:id` route param. The same component serves
 * every chat, so a refresh on `/chat/1` renders straight from the URL.
 */
const ChatPage = () => {
  const { id } = useParams()
  const { sidebarCollapsed, openSidebar, expandSidebar } = useOutletContext()

  const chat = RECENT_CHATS.find((item) => item.id === id)

  usePageTitle({
    title: chat ? chat.title : pageTitle.CHAT_NOT_FOUND_PAGE,
  })

  if (!chat) {
    return (
      <ChatNotFound
        id={id}
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={openSidebar}
        onExpandSidebar={expandSidebar}
      />
    )
  }

  return (
    <ChatConversation
      chat={chat}
      sidebarCollapsed={sidebarCollapsed}
      onOpenSidebar={openSidebar}
      onExpandSidebar={expandSidebar}
    />
  )
}

export default ChatPage
