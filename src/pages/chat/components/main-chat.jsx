import PromptInput from './prompt-input'
import ChatTopbar from '../conversation/components/chat-topbar'

const MainChat = ({
  sidebarCollapsed,
  onOpenSidebar,
  onExpandSidebar,
}) => {
  return (
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-chat-background">
      <div className="chat-glow pointer-events-none absolute inset-0" />

      <ChatTopbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={onOpenSidebar}
        onExpandSidebar={onExpandSidebar}
      />

      <div className="relative z-10 flex w-full min-w-0 flex-1 flex-col items-center justify-center px-4 pb-14 sm:px-6">
        <h1 className="mb-9 max-w-full text-center text-[26px] leading-tight font-light tracking-tight text-balance text-chat-foreground sm:text-[34px] md:text-[42px]">
          Any new ideas to explore?
        </h1>

        <PromptInput />
      </div>
    </main>
  )
}

export default MainChat
