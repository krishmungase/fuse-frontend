import ChatMessage from './chat-message'
import ChatTopbar from './chat-topbar'
import PromptInput from '../../components/prompt-input'

/** Canvas for a single `/chat/:id` conversation. */
const ChatConversation = ({
  chat,
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

      <div className="scrollbar-extra-thin min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[740px] flex-col gap-10 px-4 pt-6 pb-10 sm:px-6">
          {chat.messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
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
