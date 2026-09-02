import { SettingsIcon } from 'lucide-animated'

import { cn } from '@/lib/utils'
import { IconButton } from '@/components'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

/** Pinned account row at the foot of the sidebar. */
const UserProfile = ({ name, plan, avatarUrl, onOpenSettings, className }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-full px-2 py-2 transition-colors duration-150 hover:bg-chat-hover',
        className
      )}
    >
      <Avatar className="size-8 shrink-0">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-chat-elevated text-[12px] font-medium text-chat-foreground">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[13px] leading-tight text-chat-foreground">
          {name}
        </span>
        <span className="truncate text-[11px] leading-tight text-chat-muted">
          {plan}
        </span>
      </div>

      <div className="relative shrink-0">
        <IconButton
          icon={SettingsIcon}
          animated
          iconSize={20}
          label="Settings"
          onClick={onOpenSettings}
          className="h-9 w-9"
        />
        <span className="pointer-events-none absolute top-1.5 right-1.5 size-1.5 rounded-full bg-chat-status" />
      </div>
    </div>
  )
}

export default UserProfile
