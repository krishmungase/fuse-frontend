import { useEffect, useRef } from 'react'

import ChatMessage from './chat-message'
import ChatTopbar from './chat-topbar'
import ThinkingIndicator from './thinking-indicator'
import PromptInput from '../../components/prompt-input'

const STICK_THRESHOLD_PX = 120

const ChatConversation = ({
  messages,
  status,
  sidebarCollapsed,
  onOpenSidebar,
  onExpandSidebar,
}) => {
  const scrollRef = useRef(null)
  const stickToBottomRef = useRef(true)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || !stickToBottomRef.current) return

    container.scrollTop = container.scrollHeight
  }, [messages, status])

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    stickToBottomRef.current =
      scrollHeight - scrollTop - clientHeight < STICK_THRESHOLD_PX
  }

  const lastMessage = messages[messages.length - 1]

  const isThinking =
    status === 'submitted' ||
    (status === 'streaming' &&
      lastMessage?.role === 'assistant' &&
      !lastMessage.parts?.some((part) => part.type === 'text' && part.text))

  return (
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-chat-background">
      <ChatTopbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={onOpenSidebar}
        onExpandSidebar={onExpandSidebar}
      />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-extra-thin min-h-0 flex-1 overflow-y-auto"
      >
        <div className="mx-auto flex w-full max-w-[740px] flex-col gap-10 px-4 pt-6 pb-10 sm:px-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              parts={message.parts}
            />
          ))}

          {isThinking && <ThinkingIndicator />}
        </div>
      </div>

      <div className="flex w-full min-w-0 shrink-0 flex-col items-center px-4 pb-4 sm:px-6">
        <PromptInput />
        <p className="pt-3 text-[12px] text-chat-muted">
          FuseAI is AI and can make mistakes.
        </p>
      </div>
    </main>
  )
}

export default ChatConversation
