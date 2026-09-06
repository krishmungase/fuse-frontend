import { useCallback } from 'react'
import { useNavigate, useOutletContext } from 'react-router'

import { usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'
import MainChat from './components/main-chat'
import { ChatSessionProvider } from './context/chat-session'

const NewChatPage = () => {
  usePageTitle({ title: pageTitle.CHAT_PAGE })

  const navigate = useNavigate()
  const { sidebarCollapsed, openSidebar, expandSidebar } = useOutletContext()

  const send = useCallback(
    (prompt, { model } = {}) =>
      navigate(`/chat/${crypto.randomUUID()}`, {
        state: { pendingPrompt: prompt, model },
      }),
    [navigate]
  )

  return (
    <ChatSessionProvider value={{ send, stop: () => {}, status: 'ready' }}>
      <MainChat
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={openSidebar}
        onExpandSidebar={expandSidebar}
      />
    </ChatSessionProvider>
  )
}

export default NewChatPage
