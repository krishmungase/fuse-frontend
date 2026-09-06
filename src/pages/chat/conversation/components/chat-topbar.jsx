import { LayoutGridIcon, MenuIcon, PanelLeftOpenIcon } from 'lucide-animated'

import { cn } from '@/lib/utils'
import { IconButton } from '@/components'

const ChatTopbar = ({ sidebarCollapsed, onOpenSidebar, onExpandSidebar }) => {
  return (
    <div className="relative z-10 flex h-14 shrink-0 items-center justify-between px-3">
      <div className="flex items-center gap-1">
        <IconButton
          icon={MenuIcon}
          animated
          label="Open sidebar"
          onClick={onOpenSidebar}
          className="lg:hidden"
        />
        <IconButton
          icon={PanelLeftOpenIcon}
          animated
          label="Expand sidebar"
          onClick={onExpandSidebar}
          className={cn('hidden', sidebarCollapsed && 'lg:inline-flex')}
        />
      </div>

      <IconButton icon={LayoutGridIcon} animated label="Google apps" />
    </div>
  )
}

export default ChatTopbar
