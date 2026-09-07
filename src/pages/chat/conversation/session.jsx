import { useCallback, useEffect, useRef } from 'react'

import useChatStream from '../hooks/use-chat-stream'
import { ChatSessionProvider } from '../context/chat-session'
import ChatConversation from './components/chat-conversation'

const ConversationSession = ({
  id,
  history,
  pendingPrompt,
  pendingModel,
  sidebarCollapsed,
  onOpenSidebar,
  onExpandSidebar,
}) => {
  const { messages, sendMessage, status, stop } = useChatStream({
    id,
    initialMessages: history,
  })

  const send = useCallback(
    (prompt, { model } = {}) =>
      sendMessage({ text: prompt }, { body: { model } }),
    [sendMessage]
  )

  const sentRef = useRef(false)

  useEffect(() => {
    if (!pendingPrompt || sentRef.current) return

    sentRef.current = true
    send(pendingPrompt, { model: pendingModel })
    window.history.replaceState({}, '')
  }, [pendingPrompt, pendingModel, send])

  return (
    <ChatSessionProvider value={{ send, stop, status }}>
      <ChatConversation
        messages={messages}
        status={status}
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={onOpenSidebar}
        onExpandSidebar={onExpandSidebar}
      />
    </ChatSessionProvider>
  )
}

export default ConversationSession
