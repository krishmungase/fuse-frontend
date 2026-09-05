import { useCallback, useEffect, useRef } from 'react'

import useChatStream from '../hooks/use-chat-stream'
import { ChatSessionProvider } from '../context/chat-session'
import ChatConversation from './components/chat-conversation'

/**
 * The live half of a conversation: owns the stream and hands the prompt input
 * a `send` through context, so the input never takes chat props.
 *
 * Mounted only once the stored transcript is in hand -- `useChatStream` seeds
 * itself from `history` on first render and ignores it afterwards, since from
 * that point the stream is the source of truth.
 */
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

  // The opening prompt arrives as route state, which survives a refresh, so it
  // is fired once per mount and then cleared out of history.
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
