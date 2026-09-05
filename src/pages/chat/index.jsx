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

  /**
   * The id is minted here rather than by the server so the URL can change
   * before a single token exists. The conversation screen picks the prompt up
   * from route state and sends it on mount, which means the whole stream runs
   * on one mounted component instead of being cut in half by the redirect.
   */
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
