import { useState } from 'react'
import { Outlet } from 'react-router'

import { cn } from '@/lib/utils'
import ChatSidebar from './components/chat-sidebar'

const SIDEBAR_USER = {
  name: 'Krishna Mungase',
  plan: 'Pro',
  avatarUrl: '',
}

const DESKTOP_QUERY = '(min-width: 1024px)'

/**
 * Chat shell: fixed dark surface with a pinned sidebar beside the routed
 * canvas. Below `lg` the sidebar slides in as a drawer instead.
 */
const ChatLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // The one control in the sidebar header collapses on desktop and closes the
  // drawer on smaller screens.
  const handleCollapse = () => {
    if (window.matchMedia(DESKTOP_QUERY).matches) setCollapsed(true)
    else setDrawerOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-chat-background font-sans tracking-normal text-chat-foreground">
      <div
        aria-hidden
        onClick={() => setDrawerOpen(false)}
        className={cn(
          'fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 lg:hidden',
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 h-full shrink-0 overflow-hidden transition-all duration-200 ease-out lg:static',
          drawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          collapsed ? 'w-[272px] lg:w-0' : 'w-[272px]'
        )}
      >
        <div className="h-full w-[272px]">
          <ChatSidebar
            user={SIDEBAR_USER}
            onCollapse={handleCollapse}
            onNavigate={() => setDrawerOpen(false)}
          />
        </div>
      </aside>

      <Outlet
        context={{
          sidebarCollapsed: collapsed,
          openSidebar: () => setDrawerOpen(true),
          expandSidebar: () => setCollapsed(false),
        }}
      />
    </div>
  )
}

export default ChatLayout
