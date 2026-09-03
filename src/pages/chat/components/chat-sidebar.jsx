import { useState } from 'react'

import { cn } from '@/lib/utils'
import RecentChats from './recent-chats'
import SidebarBrand from './sidebar-brand'
import UserProfile from './user-profile'
import SidebarNavigation from './sidebar-navigation'
import { useAuth } from '@/hooks'

const ChatSidebar = ({ onCollapse, onNavigate, className }) => {
  const [activeNavId, setActiveNavId] = useState(null)
  const { user } = useAuth()

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col bg-chat-sidebar tracking-normal',
        className
      )}
    >
      <div className="flex flex-col gap-3 px-3 pt-2">
        <SidebarBrand onCollapse={onCollapse} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pt-4">
        <SidebarNavigation
          activeId={activeNavId}
          onSelect={setActiveNavId}
          onNavigate={onNavigate}
        />
        <RecentChats onNavigate={onNavigate} />
      </div>

      <div className="px-2 pb-2">
        <UserProfile name={user.name} />
      </div>
    </div>
  )
}

export default ChatSidebar
